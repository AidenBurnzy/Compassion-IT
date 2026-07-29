import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Remote Monitoring & Patch Management Services",
  description:
    "Proactive IT monitoring and patch management services. Keep systems secure and stable with automated updates, security patches, and 24/7 system monitoring.",
};

export default async function RemoteMonitoringPage() {
  const content = await getNgfContent();
  return (
    <ServicePage
      content={content}
      sectionKey="svcMonitoring"
      slug="remote-monitoring"
      defaults={{
        heroHeadline: "Remote Monitoring and Patch Management",
        heroDescription: "Proactive protection without unnecessary disruption.",
        intro: "Cyber threats don't wait, and neither should your defenses!",
        body:
          "Remote Monitoring and Patch Management ensures your systems stay secure, stable, and up to date without overwhelming you with noise or unnecessary changes. This isn't about constant disruption; it's about applying the right updates at the right time.\n\nI implement enterprise-proven monitoring practices that identify issues early, apply critical security patches promptly, and reduce the risk of downtime or compromise. Instead of reacting to problems after they impact your business, we address them proactively.\n\nYou won't be flooded with alerts or forced into unnecessary updates. You'll receive clear communication, focused action, and protection aligned to real-world threats, not vendor hype.",
        closing: "This approach minimizes risk while maximizing uptime and operational confidence.",
        ctaText: "Schedule Your Free Assessment",
        image:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Network patch panel with cables, representing monitored infrastructure",
      }}
    />
  );
}
