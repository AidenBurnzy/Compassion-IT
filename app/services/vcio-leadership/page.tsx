import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Virtual CIO (vCIO) & Strategic IT Leadership Services",
  description:
    "Fractional CIO and strategic IT leadership without the full-time cost. Get executive-level IT guidance, technology roadmaps, and strategic planning for your business.",
};

export default async function VcioLeadershipPage() {
  const content = await getNgfContent();
  return (
    <ServicePage
      content={content}
      sectionKey="svcVcio"
      slug="vcio-leadership"
      defaults={{
        heroHeadline: "vCIO & Strategic IT Leadership",
        heroDescription: "Executive-level IT guidance without the full-time cost.",
        intro: "Most businesses don't need a full-time CIO—but they do need strategic IT leadership.",
        body:
          "As a fractional vCIO, I provide executive-level IT guidance without the executive-level cost, helping you make smarter technology decisions that support growth, reduce risk, and control expenses. This is the same strategic leadership I've delivered at the enterprise level, applied intentionally to smaller organizations.\n\nvCIO services go far beyond \"IT support.\" This includes technology roadmaps, budgeting and forecasting, security strategy, vendor alignment, and long-term planning—all tied directly to your business goals. Instead of reacting to problems, you gain a proactive partner who helps you plan, prioritize, and invest wisely.\n\nMany organizations overspend on technology simply because no one is quarterbacking decisions at a strategic level. Others underinvest and unknowingly accept risk. A fractional vCIO bridges that gap, ensuring every dollar spent on IT has purpose, value, and alignment.",
        closing: "You gain clarity, confidence, and direction—without adding payroll overhead.",
        ctaText: "Schedule Your Free Assessment",
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Business leaders reviewing strategy and reports together",
      }}
    />
  );
}
