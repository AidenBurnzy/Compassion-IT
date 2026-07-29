// Live GA4 / Microsoft Clarity IDs, provided by Nick. These are public
// tracking identifiers (they're visible in every page's rendered HTML
// regardless), so hardcoding them as the default is fine — no secret here.
// NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID in Vercel still override these
// if the accounts ever change. Actual script injection only happens after a
// visitor accepts the cookie banner — see components/analytics/Analytics.tsx.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-4R97WDC9S8"
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "xtmieip28j"

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function pageview(url: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}
