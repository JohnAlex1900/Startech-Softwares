import os
import time
from datetime import datetime, timedelta, timezone
from functools import lru_cache

from fastapi import Depends, FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import auth as firebase_auth

from analysis import analyze_instagram, analyze_website, generate_report_text
from database import (
    _init_firestore,
    get_all_leads,
    get_lead_actions,
    save_lead,
    save_lead_action,
    update_lead_action_contacted,
)
from models import AnalyzeRequest, LeadActionContactUpdateRequest, LeadActionRequest

app = FastAPI(title="Startech Business Analyzer API", version="1.0.0")

# Configure CORS for frontend origin
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def rewrite_api_prefix(request: Request, call_next):
    """Allow both /api/* and /* route formats for split deployments."""
    scope_path = request.scope.get("path", "")
    if scope_path.startswith("/api/"):
        request.scope["path"] = scope_path[4:]
    elif scope_path == "/api":
        request.scope["path"] = "/"

    return await call_next(request)

_ADMIN_AUTH_WINDOW_SECONDS = int(os.getenv("ADMIN_AUTH_WINDOW_SECONDS", "600"))
_ADMIN_AUTH_MAX_FAILURES = int(os.getenv("ADMIN_AUTH_MAX_FAILURES", "6"))
_ADMIN_AUTH_LOCK_SECONDS = int(os.getenv("ADMIN_AUTH_LOCK_SECONDS", "900"))
_ADMIN_REQUIRE_EMAIL_VERIFIED = os.getenv("ADMIN_REQUIRE_EMAIL_VERIFIED", "false").strip().lower() in {
    "1",
    "true",
    "yes",
    "on",
}
_admin_auth_attempts: dict[str, dict[str, float | list[float]]] = {}


def _client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "").strip()
    if forwarded_for:
        return forwarded_for.split(",", 1)[0].strip()

    if request.client and request.client.host:
        return request.client.host

    return "unknown"


def _get_lock_remaining_seconds(client_ip: str, now: float) -> int:
    state = _admin_auth_attempts.get(client_ip)
    if not state:
        return 0

    lock_until = float(state.get("lock_until", 0.0))
    if now < lock_until:
        return int(lock_until - now) + 1

    if lock_until:
        _admin_auth_attempts.pop(client_ip, None)

    return 0


def _register_failed_attempt(client_ip: str, now: float) -> None:
    state = _admin_auth_attempts.setdefault(client_ip, {"attempts": [], "lock_until": 0.0})
    attempts = [
        attempt
        for attempt in state.get("attempts", [])
        if now - float(attempt) <= _ADMIN_AUTH_WINDOW_SECONDS
    ]
    attempts.append(now)

    state["attempts"] = attempts
    if len(attempts) >= _ADMIN_AUTH_MAX_FAILURES:
        state["lock_until"] = now + _ADMIN_AUTH_LOCK_SECONDS
        state["attempts"] = []


def _clear_failed_attempts(client_ip: str) -> None:
    _admin_auth_attempts.pop(client_ip, None)


def _lockout_error(remaining_seconds: int) -> HTTPException:
    remaining_minutes = max(1, (remaining_seconds + 59) // 60)
    return HTTPException(
        status_code=429,
        detail=(
            "Too many failed admin authentication attempts from this network. "
            f"Try again in about {remaining_minutes} minute(s)."
        ),
    )


@lru_cache
def _allowed_admin_emails() -> set[str]:
    configured = os.getenv("ADMIN_EMAILS", "")
    return {value.strip().lower() for value in configured.split(",") if value.strip()}


def _require_admin(
    request: Request,
    authorization: str | None = Header(default=None),
) -> dict:
    now = time.time()
    client_ip = _client_ip(request)

    locked_for = _get_lock_remaining_seconds(client_ip, now)
    if locked_for > 0:
        raise _lockout_error(locked_for)

    if not authorization or not authorization.lower().startswith("bearer "):
        _register_failed_attempt(client_ip, now)
        raise HTTPException(status_code=401, detail="Missing admin authorization token.")

    token = authorization.split(" ", 1)[1].strip()
    if not token:
        _register_failed_attempt(client_ip, now)
        raise HTTPException(status_code=401, detail="Missing admin authorization token.")

    try:
        _init_firestore()
        claims = firebase_auth.verify_id_token(token)
    except Exception as exc:
        _register_failed_attempt(client_ip, now)
        locked_for = _get_lock_remaining_seconds(client_ip, now)
        if locked_for > 0:
            raise _lockout_error(locked_for) from exc
        raise HTTPException(status_code=401, detail="Invalid or expired admin token.") from exc

    email = (claims.get("email") or "").lower()
    if not email:
        _register_failed_attempt(client_ip, now)
        locked_for = _get_lock_remaining_seconds(client_ip, now)
        if locked_for > 0:
            raise _lockout_error(locked_for)
        raise HTTPException(status_code=403, detail="Admin email is required in token claims.")

    if _ADMIN_REQUIRE_EMAIL_VERIFIED and not claims.get("email_verified", False):
        _register_failed_attempt(client_ip, now)
        locked_for = _get_lock_remaining_seconds(client_ip, now)
        if locked_for > 0:
            raise _lockout_error(locked_for)
        raise HTTPException(status_code=403, detail="Verified admin email is required.")

    allowed_emails = _allowed_admin_emails()
    if allowed_emails and email not in allowed_emails:
        _register_failed_attempt(client_ip, now)
        locked_for = _get_lock_remaining_seconds(client_ip, now)
        if locked_for > 0:
            raise _lockout_error(locked_for)
        raise HTTPException(status_code=403, detail="You are not allowed to access admin endpoints.")

    _clear_failed_attempts(client_ip)
    return claims


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Startech Business Analyzer API is running.",
        "docs": "/docs",
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/analyze")
def analyze(payload: AnalyzeRequest) -> dict:
    lead_data = payload.model_dump()

    try:
        saved_lead = save_lead(lead_data)
    except Exception as exc:  # pragma: no cover - external service failure
        raise HTTPException(status_code=500, detail=f"Failed to save lead: {exc}") from exc

    if payload.input_type == "website":
        analysis = analyze_website(payload.input_value)
    elif payload.input_type == "instagram":
        analysis = analyze_instagram(payload.input_value)
    else:
        raise HTTPException(status_code=400, detail="Unsupported input_type")

    report_payload = {
        **analysis,
        "business_name": payload.business_name,
    }

    report_text = generate_report_text(report_payload)

    return {
        "lead": saved_lead,
        "analysis": analysis,
        "report_text": report_text,
        "cta_message": "We can help you fix these issues and grow your business. Contact us on WhatsApp to get started.",
        "urgency_message": "Businesses with similar issues often lose customers daily. Fixing this quickly can significantly improve your growth.",
    }


@app.get("/leads")
def leads(_: dict = Depends(_require_admin)) -> dict:
    try:
        records = get_all_leads()
    except Exception as exc:  # pragma: no cover - external service failure
        raise HTTPException(status_code=500, detail=f"Failed to fetch leads: {exc}") from exc

    return {"leads": records}


@app.post("/lead-action")
def lead_action(payload: LeadActionRequest) -> dict:
    try:
        saved_action = save_lead_action(payload.model_dump())
    except Exception as exc:  # pragma: no cover - external service failure
        raise HTTPException(status_code=500, detail=f"Failed to save lead action: {exc}") from exc

    return {
        "message": "Lead action captured.",
        "action": saved_action,
    }


@app.get("/lead-actions")
def lead_actions(
    action_type: str | None = None,
    start_date: str | None = None,
    end_date: str | None = None,
    contacted: bool | None = None,
    _: dict = Depends(_require_admin),
) -> dict:
    allowed_types = {"standard", "advanced"}
    if action_type and action_type not in allowed_types:
        raise HTTPException(status_code=400, detail="action_type must be 'standard' or 'advanced'")

    def _parse_date(value: str, date_name: str, is_end: bool = False) -> datetime:
        normalized = value.strip().replace("Z", "+00:00")
        try:
            if "T" in normalized:
                parsed = datetime.fromisoformat(normalized)
            else:
                parsed = datetime.fromisoformat(f"{normalized}T00:00:00+00:00")
                if is_end:
                    parsed = parsed + timedelta(days=1) - timedelta(microseconds=1)
        except ValueError as exc:
            raise HTTPException(
                status_code=400,
                detail=f"{date_name} must be a valid ISO date or datetime",
            ) from exc

        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)

        return parsed.astimezone(timezone.utc)

    parsed_start = _parse_date(start_date, "start_date") if start_date else None
    parsed_end = _parse_date(end_date, "end_date", is_end=True) if end_date else None

    if parsed_start and parsed_end and parsed_start > parsed_end:
        raise HTTPException(status_code=400, detail="start_date cannot be after end_date")

    try:
        actions = get_lead_actions(action_type, parsed_start, parsed_end, contacted)
    except Exception as exc:  # pragma: no cover - external service failure
        raise HTTPException(status_code=500, detail=f"Failed to fetch lead actions: {exc}") from exc

    return {"lead_actions": actions}


@app.patch("/lead-actions/{action_id}/contacted")
def mark_lead_action_contacted(
    action_id: str,
    payload: LeadActionContactUpdateRequest,
    _: dict = Depends(_require_admin),
) -> dict:
    try:
        action = update_lead_action_contacted(action_id, payload.contacted)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:  # pragma: no cover - external service failure
        raise HTTPException(status_code=500, detail=f"Failed to update lead action: {exc}") from exc

    return {
        "message": "Lead action updated.",
        "action": action,
    }

