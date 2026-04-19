import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";

import { isAllowedAdminUser } from "../adminAccess";
import { auth, isFirebaseAuthConfigured } from "../firebaseClient";

const AdminAuthPage: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) {
      setCheckingSession(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingSession(false);
    });

    return unsubscribe;
  }, []);

  const reason = new URLSearchParams(location.search).get("reason");
  const reasonMessage =
    reason === "session-expired"
      ? "Your admin session expired due to inactivity. Please sign in again."
      : reason === "session-refresh-failed"
        ? "Your secure admin session refresh failed. Please sign in again."
        : reason === "locked-out"
          ? "Too many failed admin authentication attempts from your network. Please wait and try again."
          : "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!auth || !isFirebaseAuthConfigured) {
      setError("Firebase auth is not configured for this frontend build.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (!isAllowedAdminUser(credential.user)) {
        await signOut(auth);
        setError("This account is not authorized to access the admin dashboard.");
        return;
      }
    } catch {
      setError("Login failed. Check your admin credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <section className="min-h-[65vh] bg-slate-100 px-6 py-20 dark:bg-slate-950">
        <div className="container mx-auto max-w-md">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            Checking admin session...
          </div>
        </div>
      </section>
    );
  }

  if (user && isAllowedAdminUser(user)) {
    return <Navigate to="/admin/leads" replace />;
  }

  return (
    <section className="min-h-[70vh] bg-slate-100 py-16 dark:bg-slate-950 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900/75 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary-600 dark:text-secondary-400">
            Secure Admin Login
          </p>
          <h1 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">Admin Dashboard Access</h1>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            This dashboard is private. Sign in with your authorized Firebase admin account.
          </p>

          {!isFirebaseAuthConfigured && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-200">
              Firebase web auth environment variables are missing in the frontend.
            </div>
          )}

          {reasonMessage && (
            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-700/40 dark:bg-blue-900/20 dark:text-blue-200">
              {reasonMessage}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-700/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="admin@yourdomain.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isFirebaseAuthConfigured}
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
            >
              {loading ? "Signing in..." : "Sign In to Admin"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAuthPage;
