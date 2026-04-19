import React from "react";
import { Link } from "react-router-dom";

const AdminNotFoundPage: React.FC = () => {
  return (
    <section className="min-h-[65vh] bg-slate-100 py-16 dark:bg-slate-950 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900/75 md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-600 dark:text-secondary-400">
            Admin Area
          </p>
          <h1 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">404 - Admin Page Not Found</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            The admin URL you entered does not exist.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
            >
              Go to Admin Login
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminNotFoundPage;
