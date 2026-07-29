"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import type { NgfSiteContent } from "@/lib/ngf";
import { CONSENT_EVENT, getStoredConsent, storeConsent, type ConsentValue } from "@/lib/cookie-consent";

type AnalyticsProps = {
  gaId: string;
  clarityId: string;
  content: NgfSiteContent;
};

// Mounted once in app/layout.tsx. Renders nothing on the server; on the
// client it checks the consent cookie and only injects the GA4/Clarity
// scripts once a visitor has explicitly accepted. Until then (or if they
// decline) neither script ever loads. This also listens for the
// "ngf-consent-changed" event so accepting/declining takes effect
// immediately, and so the "Cookie Preferences" link in the footer can
// reopen the banner without a page reload.
export function Analytics({ gaId, clarityId, content }: AnalyticsProps) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setReady(true);

    function onChange(event: Event) {
      setConsent((event as CustomEvent<ConsentValue | null>).detail ?? null);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const scriptsAllowed = consent === "accepted";
  const showBanner = ready && consent === null;

  const message =
    content["cookieBanner.message"] ||
    "We use cookies for analytics (Google Analytics & Microsoft Clarity) to see how visitors use this site. We won't turn these on until you say it's okay.";
  const acceptText = content["cookieBanner.acceptText"] || "Accept";
  const declineText = content["cookieBanner.declineText"] || "Decline";
  const linkText = content["cookieBanner.linkText"] || "Privacy Policy";

  return (
    <>
      {scriptsAllowed && gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      {scriptsAllowed && clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}

      {showBanner ? (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brand/30 bg-black/95 px-4 py-5 backdrop-blur-sm sm:px-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              data-ngf-field="cookieBanner.message"
              data-ngf-label="Banner Message"
              data-ngf-type="textarea"
              data-ngf-section="CookieBanner"
              className="text-sm text-white/85"
            >
              {message}{" "}
              <Link href="/privacy-policy" className="text-brand underline hover:no-underline">
                {linkText}
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => storeConsent("declined")}
                data-ngf-field="cookieBanner.declineText"
                data-ngf-label="Decline Button Text"
                data-ngf-type="text"
                data-ngf-section="CookieBanner"
                className="btn-outline px-5 py-2 text-sm"
              >
                {declineText}
              </button>
              <button
                type="button"
                onClick={() => storeConsent("accepted")}
                data-ngf-field="cookieBanner.acceptText"
                data-ngf-label="Accept Button Text"
                data-ngf-type="text"
                data-ngf-section="CookieBanner"
                className="btn-brand px-5 py-2 text-sm"
              >
                {acceptText}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
