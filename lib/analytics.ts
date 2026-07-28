// Both IDs are optional. Neither Google Analytics nor Microsoft Clarity are
// wired up to a live account yet — set NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID
// in Vercel once those accounts exist. Until then, GoogleAnalytics/Clarity
// script tags in app/layout.tsx render nothing (see the `if (!id) return null`
// guards there) rather than shipping broken tracking calls.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ""
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || ""

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
