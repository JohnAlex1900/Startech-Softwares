import json
import os
from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore

load_dotenv()


def _init_firestore() -> firestore.Client:
    if not firebase_admin._apps:
        service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")
        service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")

        if service_account_json:
            cert_data = json.loads(service_account_json)
            cred = credentials.Certificate(cert_data)
        elif service_account_path:
            cred = credentials.Certificate(service_account_path)
        else:
            raise RuntimeError(
                "Firestore is not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH."
            )

        firebase_admin.initialize_app(cred)

    return firestore.client()


def _serialize_timestamp(value: Any) -> str:
    if value is None:
        return ""
    if hasattr(value, "isoformat"):
        return value.isoformat()
    return str(value)


def save_lead(lead: dict[str, Any]) -> dict[str, Any]:
    db = _init_firestore()
    lead_id = lead.get("id") or str(uuid4())

    lead_doc = {
        "id": lead_id,
        "name": lead["name"],
        "phone": lead["phone"],
        "business_name": lead["business_name"],
        "input_type": lead["input_type"],
        "input_value": lead["input_value"],
        "timestamp": datetime.now(timezone.utc),
    }

    db.collection("leads").document(lead_id).set(lead_doc)
    return {
        **lead_doc,
        "timestamp": _serialize_timestamp(lead_doc["timestamp"]),
    }


def save_lead_action(action: dict[str, Any]) -> dict[str, Any]:
    db = _init_firestore()
    action_id = str(uuid4())
    timestamp = datetime.now(timezone.utc)

    action_doc = {
        "id": action_id,
        "lead_id": action["lead_id"],
        "action_type": action["action_type"],
        "business_name": action["business_name"],
        "score": action["score"],
        "contacted": False,
        "contacted_timestamp": None,
        "timestamp": timestamp,
    }

    db.collection("lead_actions").document(action_id).set(action_doc)
    db.collection("leads").document(action["lead_id"]).set(
        {
            "last_action_type": action["action_type"],
            "last_action_timestamp": timestamp,
        },
        merge=True,
    )

    return {
        **action_doc,
        "timestamp": _serialize_timestamp(action_doc["timestamp"]),
        "contacted_timestamp": _serialize_timestamp(action_doc["contacted_timestamp"]),
    }


def get_all_leads() -> list[dict[str, Any]]:
    db = _init_firestore()
    docs = db.collection("leads").order_by("timestamp", direction=firestore.Query.DESCENDING).stream()

    results: list[dict[str, Any]] = []
    for doc in docs:
        data = doc.to_dict() or {}
        results.append(
            {
                "name": data.get("name", ""),
                "phone": data.get("phone", ""),
                "business_name": data.get("business_name", ""),
                "input_value": data.get("input_value", ""),
                "timestamp": _serialize_timestamp(data.get("timestamp", "")),
            }
        )

    return results


def get_lead_actions(
    action_type: str | None = None,
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    contacted: bool | None = None,
) -> list[dict[str, Any]]:
    db = _init_firestore()
    query = db.collection("lead_actions")

    if action_type:
        query = query.where("action_type", "==", action_type)

    if contacted is not None:
        query = query.where("contacted", "==", contacted)

    if start_date is not None:
        query = query.where("timestamp", ">=", start_date)

    if end_date is not None:
        query = query.where("timestamp", "<=", end_date)

    docs = query.order_by("timestamp", direction=firestore.Query.DESCENDING).stream()

    results: list[dict[str, Any]] = []
    for doc in docs:
        data = doc.to_dict() or {}
        results.append(
            {
                "id": data.get("id", ""),
                "lead_id": data.get("lead_id", ""),
                "action_type": data.get("action_type", ""),
                "business_name": data.get("business_name", ""),
                "score": data.get("score", 0),
                "contacted": data.get("contacted", False),
                "contacted_timestamp": _serialize_timestamp(data.get("contacted_timestamp")),
                "timestamp": _serialize_timestamp(data.get("timestamp", "")),
            }
        )

    return results


def update_lead_action_contacted(action_id: str, contacted: bool) -> dict[str, Any]:
    db = _init_firestore()
    action_ref = db.collection("lead_actions").document(action_id)
    snapshot = action_ref.get()

    if not snapshot.exists:
        raise ValueError("Lead action not found")

    contacted_timestamp = datetime.now(timezone.utc) if contacted else None
    action_ref.set(
        {
            "contacted": contacted,
            "contacted_timestamp": contacted_timestamp,
        },
        merge=True,
    )

    updated = action_ref.get().to_dict() or {}
    return {
        "id": updated.get("id", action_id),
        "lead_id": updated.get("lead_id", ""),
        "action_type": updated.get("action_type", ""),
        "business_name": updated.get("business_name", ""),
        "score": updated.get("score", 0),
        "contacted": updated.get("contacted", False),
        "contacted_timestamp": _serialize_timestamp(updated.get("contacted_timestamp")),
        "timestamp": _serialize_timestamp(updated.get("timestamp", "")),
    }
