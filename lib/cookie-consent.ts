// Small helper around a first-party consent cookie so GA4/Microsoft Clarity
// only ever load after a visitor opts in (see components/analytics/Analytics.tsx).
// A cookie (not localStorage) is used so state survives a fresh navigation
// and stays readable the same way on every client component without a
// hydration race.

export const CONSENT_COOKIE_NAME = "ngf_cookie_consent";
export const CONSENT_EVENT = "ngf-consent-changed";

export type ConsentValue = "accepted" | "declined";

export function getStoredConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE_NAME}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === "accepted" || value === "declined" ? value : null;
}

export function storeConsent(value: ConsentValue) {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${oneYear}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent<ConsentValue | null>(CONSENT_EVENT, { detail: value }));
}

// Clears the stored choice so the banner reappears — used by the "Cookie
// Preferences" link in the footer so visitors can change their mind later.
export function clearConsent() {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent<ConsentValue | null>(CONSENT_EVENT, { detail: null }));
}
