import type { Metadata } from "next";
import Link from "next/link";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Break/Fix IT Support & Computer Repair",
  description:
    "Fast, reliable break/fix IT support and computer repair services. Pay only when you need help - no contracts required. Expert troubleshooting and repairs.",
};

const problemCards = [
  { title: "Workstations & Devices", description: "Slow laptops, failing drives, blue screens, printer jams, and peripherals that refuse to connect." },
  { title: "Networks & Wi-Fi", description: "Unreliable Wi-Fi, dropped calls, VLAN and guest network tweaks, firewall adjustments, and ISP coordination." },
  { title: "Security & Malware", description: "Virus removal, ransomware triage, patching gaps, account lockouts, and password recoveries." },
  { title: "Microsoft 365 & Apps", description: "Email deliverability, Outlook profile repair, OneDrive sync issues, licensing errors, and app crashes." },
];

const steps = [
  { title: "Quick triage", description: "Share symptoms, urgency, and recent changes so we can prioritize the right fixes." },
  { title: "Transparent estimate", description: "You get options before work begins—remote where possible, onsite when needed." },
  { title: "Focused repair", description: "Targeted remediation to restore service fast, with minimal disruption." },
  { title: "Prevention tips", description: "A short checklist to reduce the odds of a repeat incident." },
];

export default async function BreakFixPage() {
  const content = await getNgfContent();

  const heroHeadline = content["breakfix.heroHeadline"] || "On-Demand Break/Fix IT Support";
  const heroDescription = content["breakfix.heroDescription"] || "Fast, honest troubleshooting without long-term contracts. Get back to work with clear fixes and preventative guidance.";
  const introTitle = content["breakfix.introTitle"] || "Break / Fix IT Support";
  const introBody = content["breakfix.introBody"] || "Expert IT help the moment something breaks—no contracts, no pressure. I diagnose the problem, apply the right fix, and leave you with a simple prevention plan.";
  const highlightTitle = content["breakfix.highlightTitle"] || "Free IT Issue Review";
  const highlightBody = content["breakfix.highlightBody"] || "Not sure if your issue is a one-off or a sign of something bigger? I'll review the situation and provide clear, affordable next steps, even if that means straightforward break/fix work.";
  const problemsTitle = content["breakfix.problemsTitle"] || "Common Problems Fixed Quickly";
  const problemsDescription = content["breakfix.problemsDescription"] || "Practical fixes for the issues that stall your day. If it plugs in, connects, or syncs, we can help.";
  const howTitle = content["breakfix.howTitle"] || "How Break/Fix Works";
  const howDescription = content["breakfix.howDescription"] || "Clear steps so you know what to expect from the first call to the final follow-up.";

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-black text-center text-white">
        <div className="glow-orb -left-10 top-0 h-80 w-80 opacity-40" aria-hidden="true" />
        <div className="glow-orb -right-10 bottom-0 h-72 w-72 opacity-30" aria-hidden="true" style={{ animationDelay: "4s" }} />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-14">
          <span className="eyebrow animate-fade-in-up">Break/Fix</span>
          <h1
            data-ngf-field="breakfix.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="BreakFix"
            className="animate-fade-in-up mt-4 text-3xl font-bold text-balance sm:text-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            {heroHeadline}
          </h1>
          <p
            data-ngf-field="breakfix.heroDescription"
            data-ngf-label="Description"
            data-ngf-type="textarea"
            data-ngf-section="BreakFix"
            className="animate-fade-in-up mt-4 text-lg text-white/85"
            style={{ animationDelay: "0.2s" }}
          >
            {heroDescription}
          </p>
          <div className="animate-fade-in-up mt-8 flex flex-wrap justify-center gap-4" style={{ animationDelay: "0.3s" }}>
            <Link href="/contact?topic=breakfix" className="btn-brand">
              Schedule a Quick Fix
            </Link>
            <Link href="/#services" className="btn-outline">
              Explore Consulting Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell mx-auto max-w-3xl text-center">
        <h2 data-ngf-field="breakfix.introTitle" data-ngf-label="Intro Title" data-ngf-type="text" data-ngf-section="BreakFix" className="text-2xl font-bold text-brand sm:text-3xl">
          {introTitle}
        </h2>
        <p data-ngf-field="breakfix.introBody" data-ngf-label="Intro Body" data-ngf-type="textarea" data-ngf-section="BreakFix" className="mt-4 text-white/80">
          {introBody}
        </p>

        <div className="card-soft mt-8 text-left">
          <h3 data-ngf-field="breakfix.highlightTitle" data-ngf-label="Highlight Title" data-ngf-type="text" data-ngf-section="BreakFix" className="text-lg font-semibold text-brand">
            {highlightTitle}
          </h3>
          <p data-ngf-field="breakfix.highlightBody" data-ngf-label="Highlight Body" data-ngf-type="textarea" data-ngf-section="BreakFix" className="mt-2 text-white/80">
            {highlightBody}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact?topic=breakfix" className="btn-brand">
            Schedule Your Free Assessment
          </Link>
          <Link href="/#about" className="btn-outline">
            Learn About CompassionIT
          </Link>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <h3 data-ngf-field="breakfix.problemsTitle" data-ngf-label="Problems Section Title" data-ngf-type="text" data-ngf-section="BreakFix" className="text-2xl font-bold sm:text-3xl">
            {problemsTitle}
          </h3>
          <p data-ngf-field="breakfix.problemsDescription" data-ngf-label="Problems Section Description" data-ngf-type="textarea" data-ngf-section="BreakFix" className="mt-3 text-white/75">
            {problemsDescription}
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
          {problemCards.map((card) => (
            <div key={card.title} className="card-soft">
              <h4 className="text-lg font-semibold text-brand">{card.title}</h4>
              <p className="mt-2 text-white/80">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h3 data-ngf-field="breakfix.howTitle" data-ngf-label="How It Works Title" data-ngf-type="text" data-ngf-section="BreakFix" className="text-2xl font-bold sm:text-3xl">
            {howTitle}
          </h3>
          <p data-ngf-field="breakfix.howDescription" data-ngf-label="How It Works Description" data-ngf-type="textarea" data-ngf-section="BreakFix" className="mt-3 text-white/75">
            {howDescription}
          </p>
        </div>
        <ol className="mx-auto mt-10 max-w-2xl list-decimal space-y-4 pl-6 text-white/85 marker:font-bold marker:text-brand">
          {steps.map((step) => (
            <li key={step.title}>
              <span className="font-semibold text-white">{step.title}:</span> {step.description}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
