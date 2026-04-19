import React, { useCallback, useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseClient";

type ActionTypeFilter = "all" | "standard" | "advanced";
type ContactedFilter = "all" | "contacted" | "pending";

type LeadAction = {
  id: string;
  lead_id: string;
  action_type: "standard" | "advanced";
  business_name: string;
  score: number;
  timestamp: string;
  contacted: boolean;
  contacted_timestamp: string;
};

type LeadActionResponse = {
  lead_actions: LeadAction[];
};

const buildApiUrl = (base: string, path: string) => {
  const cleanedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanedPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanedBase}${cleanedPath}`;
};

const escapeCsvValue = (value: string | number | boolean) => {
  const text = String(value ?? "");
  if (/[,"\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

const sessionTimeoutMinutes = Number(import.meta.env.VITE_ADMIN_SESSION_TIMEOUT_MINUTES ?? "30");
const tokenRefreshMinutes = Number(import.meta.env.VITE_ADMIN_TOKEN_REFRESH_MINUTES ?? "10");
const safeSessionTimeoutSeconds = Math.max(300, Math.round((Number.isFinite(sessionTimeoutMinutes) ? sessionTimeoutMinutes : 30) * 60));
const safeTokenRefreshMs = Math.max(60_000, Math.round((Number.isFinite(tokenRefreshMinutes) ? tokenRefreshMinutes : 10) * 60_000));

const formatRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const AdminLeadsPage: React.FC = () => {
  const navigate = useNavigate();
  const apiBaseUrl = useMemo(() => {
    const configured = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
    if (!configured) return "/api";

    const browserHost = window.location.hostname;
    const isLocalBrowserHost = browserHost === "localhost" || browserHost === "127.0.0.1";
    const pointsToLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configured);

    if (pointsToLocalhost && !isLocalBrowserHost) return "/api";
    return configured;
  }, []);

  const [filter, setFilter] = useState<ActionTypeFilter>("all");
  const [contactedFilter, setContactedFilter] = useState<ContactedFilter>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingActionId, setUpdatingActionId] = useState("");
  const [actions, setActions] = useState<LeadAction[]>([]);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(safeSessionTimeoutSeconds);
  const [lastRefreshAt, setLastRefreshAt] = useState<string>("");

  const performSignOut = useCallback(async (reason?: string) => {
    if (!auth) return;

    await signOut(auth);
    const target = reason ? `/admin?reason=${encodeURIComponent(reason)}` : "/admin";
    navigate(target, { replace: true });
  }, [navigate]);

  const handleSignOut = async () => {
    await performSignOut();
  };

  const getAdminAuthHeader = async () => {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    const token = await currentUser.getIdToken();
    return { Authorization: `Bearer ${token}` };
  };

  const loadActions = async (actionType: ActionTypeFilter, contactedType: ContactedFilter, fromDate: string, toDate: string) => {
    setLoading(true);
    setError("");

    try {
      const authHeader = await getAdminAuthHeader();
      const queryParams = new URLSearchParams();
      if (actionType !== "all") queryParams.set("action_type", actionType);
      if (contactedType === "contacted") queryParams.set("contacted", "true");
      if (contactedType === "pending") queryParams.set("contacted", "false");
      if (fromDate) queryParams.set("start_date", fromDate);
      if (toDate) queryParams.set("end_date", toDate);

      const query = queryParams.toString();
      const response = await fetch(buildApiUrl(apiBaseUrl, `/lead-actions${query ? `?${query}` : ""}`), {
        headers: authHeader,
      });
      const payload = (await response.json()) as LeadActionResponse;

      if (!response.ok) {
        throw new Error((payload as { detail?: string }).detail ?? "Unable to fetch lead actions.");
      }

      setActions(payload.lead_actions ?? []);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Unexpected error loading lead actions.";
      setError(message);
      if (message.toLowerCase().includes("too many failed admin authentication attempts")) {
        await performSignOut("locked-out");
        return;
      }
      setActions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActions(filter, contactedFilter, startDate, endDate);
  }, [filter, contactedFilter, startDate, endDate]);

  const updateContactedStatus = async (action: LeadAction, contacted: boolean) => {
    setUpdatingActionId(action.id);
    setError("");

    try {
      const authHeader = await getAdminAuthHeader();
      const response = await fetch(buildApiUrl(apiBaseUrl, `/lead-actions/${action.id}/contacted`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({ contacted }),
      });

      const payload = (await response.json()) as { detail?: string };
      if (!response.ok) {
        throw new Error(payload.detail ?? "Unable to update contacted status.");
      }

      setActions((current) =>
        current.map((item) =>
          item.id === action.id
            ? {
                ...item,
                contacted,
                contacted_timestamp: contacted ? new Date().toISOString() : "",
              }
            : item
        )
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Unexpected error updating contacted status.";
      setError(message);
      if (message.toLowerCase().includes("too many failed admin authentication attempts")) {
        await performSignOut("locked-out");
        return;
      }
    } finally {
      setUpdatingActionId("");
    }
  };

  useEffect(() => {
    if (!auth?.currentUser) {
      return;
    }

    const resetCountdown = () => {
      setSessionSecondsLeft(safeSessionTimeoutSeconds);
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetCountdown, { passive: true });
    });

    const timerId = window.setInterval(() => {
      setSessionSecondsLeft((prev) => {
        if (prev <= 1) {
          void performSignOut("session-expired");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetCountdown);
      });
    };
  }, [performSignOut]);

  useEffect(() => {
    if (!auth?.currentUser) {
      return;
    }

    const refreshToken = async () => {
      try {
        await auth.currentUser?.getIdToken(true);
        setLastRefreshAt(new Date().toLocaleTimeString());
      } catch {
        await performSignOut("session-refresh-failed");
      }
    };

    void refreshToken();
    const intervalId = window.setInterval(() => {
      void refreshToken();
    }, safeTokenRefreshMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [performSignOut]);

  const exportDisplayedActions = () => {
    if (actions.length === 0) {
      setError("No rows to export for the selected filters.");
      return;
    }

    const headers = ["business_name", "intent", "score", "lead_id", "contacted", "contacted_timestamp", "timestamp"];
    const rows = actions.map((action) => [
      action.business_name,
      action.action_type,
      action.score,
      action.lead_id,
      action.contacted,
      action.contacted_timestamp,
      action.timestamp,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((value) => escapeCsvValue(value)).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const dateStamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.setAttribute("download", `lead-actions-${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const advancedCount = actions.filter((item) => item.action_type === "advanced").length;
  const standardCount = actions.filter((item) => item.action_type === "standard").length;
  const contactedCount = actions.filter((item) => item.contacted).length;

  return (
    <div className="min-h-screen bg-slate-100 py-14 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900/70 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary-600 dark:text-secondary-400">Admin Dashboard</p>
              <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Lead Intent Tracker</h1>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Track lead intent, filter by date range, mark contacted leads, and export the active view.</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Session remaining: {formatRemaining(sessionSecondsLeft)}
                {lastRefreshAt ? ` • Last token refresh: ${lastRefreshAt}` : ""}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Sign Out
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-5">
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as ActionTypeFilter)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">All intents</option>
              <option value="standard">Standard only</option>
              <option value="advanced">Advanced only</option>
            </select>

            <select
              value={contactedFilter}
              onChange={(event) => setContactedFilter(event.target.value as ContactedFilter)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">All statuses</option>
              <option value="contacted">Contacted</option>
              <option value="pending">Not contacted</option>
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />

            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />

            <button
              type="button"
              onClick={exportDisplayedActions}
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
            >
              Export CSV
            </button>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Displayed actions</div>
              <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{actions.length}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Advanced intent</div>
              <div className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-300">{advancedCount}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Standard intent</div>
              <div className="mt-1 text-2xl font-black text-blue-700 dark:text-blue-300">{standardCount}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Contacted</div>
              <div className="mt-1 text-2xl font-black text-amber-700 dark:text-amber-300">{contactedCount}</div>
            </div>
          </div>

          <div className="mt-7 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            {loading ? (
              <div className="px-5 py-8 text-sm text-slate-600 dark:text-slate-300">Loading lead actions...</div>
            ) : error ? (
              <div className="px-5 py-8 text-sm text-red-600 dark:text-red-300">{error}</div>
            ) : actions.length === 0 ? (
              <div className="px-5 py-8 text-sm text-slate-600 dark:text-slate-300">No lead actions recorded for this filter yet.</div>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Business</th>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Intent</th>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Score</th>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Lead ID</th>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Status</th>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Timestamp</th>
                    <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map((action) => (
                    <tr key={action.id} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-3 text-slate-800 dark:text-slate-100">{action.business_name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                            action.action_type === "advanced"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                          }`}
                        >
                          {action.action_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{action.score}/10</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{action.lead_id}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                            action.contacted
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                          }`}
                        >
                          {action.contacted ? "contacted" : "pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{new Date(action.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          disabled={updatingActionId === action.id}
                          onClick={() => updateContactedStatus(action, !action.contacted)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
                        >
                          {updatingActionId === action.id
                            ? "Updating..."
                            : action.contacted
                              ? "Mark Pending"
                              : "Mark Contacted"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeadsPage;
