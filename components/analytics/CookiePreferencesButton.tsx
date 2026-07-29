"use client";

import type { ReactNode } from "react";
import { clearConsent } from "@/lib/cookie-consent";

type Props = {
  className?: string;
  children: ReactNode;
};

// Lets a visitor reopen the cookie banner and change their earlier choice.
// Lives in the footer on every page. Clearing the consent cookie triggers
// the "ngf-consent-changed" event that Analytics.tsx listens for, so the
// banner reappears immediately without a page reload.
export function CookiePreferencesButton({ className, children }: Props) {
  return (
    <button type="button" onClick={() => clearConsent()} className={className}>
      {children}
    </button>
  );
}
