import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocalBusinessSchema } from "@/app/local-business-schema";
import { PageChrome } from "@/components/layout/PageChrome";
import { GA_MEASUREMENT_ID, CLARITY_PROJECT_ID } from "@/lib/analytics";
import NgfEditBridge from "@/components/NgfEditBridge";
import { getNgfContent } from "@/lib/ngf";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_SITE_URL ?? "compassionitconsulting.com"}`),
  other: {
    "ngf-public-api": "https://app.ngfsystems.com/api/public/content",
  },
  title: {
    default: "IT Support & Tech Support in Grand Rapids & Allendale, MI | CompassionIT",
    template: "%s | CompassionIT Consulting",
  },
  description:
    "Expert IT support, tech support, cybersecurity, business continuity planning, and strategic IT leadership for small and mid-sized businesses in Grand Rapids, Allendale, and the greater West Michigan area. Affordable enterprise-level IT consulting.",
  keywords: [
    "IT support Grand Rapids",
    "IT support Allendale MI",
    "tech support Grand Rapids",
    "tech support West Michigan",
    "computer help",
    "IT consulting",
    "managed IT services",
    "cybersecurity",
    "business continuity",
    "vCIO",
    "IT help Grand Rapids",
    "computer repair Grand Rapids",
    "network support",
    "IT solutions West Michigan",
  ],
  authors: [{ name: "CompassionIT Consulting" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CompassionIT Consulting",
    title: "IT Support & Tech Support in Grand Rapids & Allendale, MI | CompassionIT",
    description:
      "Expert IT support and consulting for small and mid-sized businesses in Grand Rapids, Allendale, and West Michigan. Enterprise-tested strategies at affordable prices.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "CompassionIT Consulting — IT Support & Consulting, Grand Rapids MI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Support & Tech Support in Grand Rapids & Allendale, MI | CompassionIT",
    description: "Expert IT support and consulting for small and mid-sized businesses in Grand Rapids, Allendale, and West Michigan.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getNgfContent();

  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} antialiased`}>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        {CLARITY_PROJECT_ID ? (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
          </Script>
        ) : null}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <NgfEditBridge />
        <LocalBusinessSchema />
        <PageChrome content={content}>{children}</PageChrome>
      </body>
    </html>
  );
}
