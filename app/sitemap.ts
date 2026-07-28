import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${process.env.NEXT_PUBLIC_SITE_URL ?? "compassionitconsulting.com"}`;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services/business-continuity`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/vcio-leadership`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/vendor-project-management`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/remote-monitoring`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/cybersecurity-assessment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/breakfix`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
