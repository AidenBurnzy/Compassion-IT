import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Business Continuity Planning & Disaster Recovery | Grand Rapids, MI",
  description:
    "Enterprise-tested business continuity planning for small businesses in Grand Rapids, Allendale, and West Michigan. Protect your operations with practical, affordable disaster recovery plans.",
};

export default async function BusinessContinuityPage() {
  const content = await getNgfContent();
  return (
    <ServicePage
      content={content}
      sectionKey="svcContinuity"
      slug="business-continuity"
      defaults={{
        heroHeadline: "Business Continuity Planning",
        heroDescription: "Enterprise-tested continuity strategies, scaled for your business.",
        intro:
          "When unexpected events happen—cyber incidents, power outages, system failures, vendor disruptions, or even weather emergencies—the businesses that recover fastest are the ones that planned before the crisis.",
        body:
          "I've led business continuity planning across more than 60 locations, working with leadership teams, operational staff, and IT stakeholders to conduct tabletop exercises, identify critical systems, and build practical, executable continuity plans that actually work in the real world. These weren't \"check-the-box\" documents; they were living plans refined through continuous improvement.\n\nBusiness Continuity Planning ensures your organization can continue operating, protect revenue, safeguard customer trust, and recover quickly when disruption occurs. It clarifies roles, decision paths, communication plans, and recovery priorities so that when stress is high, confusion is low.\n\nFor small and mid-sized businesses, this level of planning is often overlooked—not because it's unimportant, but because it feels overwhelming or \"too enterprise.\" My approach removes that barrier. I translate proven enterprise continuity strategies into clear, affordable, and right-sized plans tailored to your business, your risks, and your budget.",
        closing: "Business continuity isn't about fear—it's about confidence. Knowing you're prepared allows you to operate boldly, grow responsibly, and sleep better at night.",
        ctaText: "Schedule Your Free Assessment",
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Server racks with network cables, representing resilient IT infrastructure",
      }}
    />
  );
}
