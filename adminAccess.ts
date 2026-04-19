import type { User } from "firebase/auth";

const configuredAdminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
  .split(",")
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);

export const isAllowedAdminEmail = (email?: string | null) => {
  if (configuredAdminEmails.length === 0) {
    return true;
  }

  if (!email) {
    return false;
  }

  return configuredAdminEmails.includes(email.toLowerCase());
};

export const isAllowedAdminUser = (user: User | null) => isAllowedAdminEmail(user?.email);
