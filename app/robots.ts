import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = `https://${process.env.NEXT_PUBLIC_SITE_URL ?? "compassionitconsulting.com"}`;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
