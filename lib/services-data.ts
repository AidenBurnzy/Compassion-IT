// Static service catalog — shared between the homepage teaser cards and the
// dedicated /services/[slug] pages. Titles/descriptions on the homepage cards
// and each page's hero/body copy are separately NGF-annotated (editable);
// this file only drives routing + which fields to render, not the words.
export type ServiceSlug =
  | "business-continuity"
  | "vcio-leadership"
  | "vendor-project-management"
  | "remote-monitoring"
  | "cybersecurity-assessment";

export const services: { slug: ServiceSlug; sectionKey: string; navLabel: string }[] = [
  { slug: "business-continuity", sectionKey: "svcContinuity", navLabel: "Business Continuity Planning" },
  { slug: "vcio-leadership", sectionKey: "svcVcio", navLabel: "vCIO & Strategic IT Leadership" },
  { slug: "vendor-project-management", sectionKey: "svcVendor", navLabel: "Vendor and Project Management" },
  { slug: "remote-monitoring", sectionKey: "svcMonitoring", navLabel: "Remote Monitoring and Patch Management" },
  { slug: "cybersecurity-assessment", sectionKey: "svcSecurity", navLabel: "Cybersecurity Assessment" },
];
