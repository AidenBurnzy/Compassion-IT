import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Cybersecurity Assessment & Security Audits",
  description:
    "Professional cybersecurity assessments and security audits. Identify vulnerabilities, strengthen defenses, and protect your business without fear tactics or jargon.",
};

export default async function CybersecurityAssessmentPage() {
  const content = await getNgfContent();
  return (
    <ServicePage
      content={content}
      sectionKey="svcSecurity"
      defaults={{
        heroHeadline: "Cybersecurity Assessment",
        heroDescription: "Clear, practical security reviews without fear or jargon.",
        intro: "Cybersecurity doesn't have to be complicated, but it does have to be intentional.",
        body:
          "My cybersecurity assessments are designed to validate best practices, uncover gaps, and prioritize improvements without fear-based sales tactics. Drawing from enterprise frameworks and real-world experience, I evaluate your environment through a practical, business-focused lens.\n\nThis includes access controls, system configurations, backups, user protections, vendor risk, and operational processes. The goal isn't perfection—it's risk awareness and smart prioritization.",
        closing:
          "You'll receive clear findings, plain-language explanations, and a prioritized action plan that aligns with your business size, industry, and budget. No scare tactics. No unnecessary tools. Just honest guidance and practical next steps.",
        ctaText: "Schedule Your Free Assessment",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Padlock resting on a keyboard, representing cybersecurity protection",
      }}
    />
  );
}
