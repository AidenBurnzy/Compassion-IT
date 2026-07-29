import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "IT Vendor & Project Management Services | Grand Rapids, MI",
  description:
    "Expert IT vendor and project management for businesses in Grand Rapids, Allendale, and West Michigan. Professional oversight for IT implementations and migrations.",
};

export default async function VendorProjectManagementPage() {
  const content = await getNgfContent();
  return (
    <ServicePage
      content={content}
      sectionKey="svcVendor"
      slug="vendor-project-management"
      defaults={{
        heroHeadline: "Vendor and Project Management",
        heroDescription: "Expert oversight that keeps IT projects on track and on budget.",
        intro: "Technology projects fail most often not because of bad tools, but because of poor coordination.",
        body:
          "I act as the quarterback for your IT projects, managing vendors, timelines, budgets, and expectations so nothing falls through the cracks. Having worked extensively with MSPs, software vendors, security providers, and infrastructure partners, I know how to hold vendors accountable while keeping projects moving forward.\n\nVendor and project management ensures you're not oversold, under-informed, or left translating technical jargon. I advocate on your behalf, verify deliverables, and make sure projects align with your operational needs, not just vendor agendas.",
        closing:
          "Whether it's a system migration, security rollout, cloud transition, or operational improvement initiative, my role is to ensure clarity, efficiency, and results—so your team stays focused on the business instead of managing vendors.",
        ctaText: "Schedule Your Free Assessment",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Team planning a project timeline together",
      }}
    />
  );
}
