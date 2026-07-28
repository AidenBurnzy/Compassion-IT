import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveGlobe } from "@/components/sections/InteractiveGlobe";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "IT Support & Consulting Services | CompassionIT - Grand Rapids, MI",
  description:
    "Expert IT support, cybersecurity, business continuity planning, and strategic IT leadership for small and mid-sized businesses in Grand Rapids, MI.",
};

export default async function Home() {
  const content = await getNgfContent();

  const heroHeadline = content["hero.headline"] || "Welcome to CompassionIT Consulting";
  const heroDescription = content["hero.description"] || "Guiding IT with Heart — compassionate, expert solutions that drive your business forward.";
  const heroCta = content["hero.cta"] || "Find Solutions";

  const aboutTitle = content["about.title"] || "About CompassionIT Consulting";
  const aboutIntro = content["about.intro"] || "Technology should support people, not overwhelm them.";
  const aboutBody1 =
    content["about.body1"] ||
    "I'm the founder of CompassionIT Consulting, and my career has been built at the intersection of enterprise-level IT leadership and real-world business needs. Over the years, I've led IT operations through multiple mergers and acquisitions, supported dozens of locations, standardized systems under pressure, and helped organizations grow without losing stability or security.\n\nOne lesson became clear very quickly: small and mid-sized businesses face the same risks and technology challenges as large enterprises, but without the same budgets or internal resources. Too often, they're forced to choose between overspending on technology or flying blind without strategic guidance.";
  const aboutEmphasis = content["about.emphasis"] || "That's why CompassionIT exists.";
  const aboutBody2 =
    content["about.body2"] ||
    "My passion is translating enterprise-proven strategies, such as business continuity planning, cybersecurity, vendor management, and strategic IT leadership, into right-sized, affordable solutions that actually make sense for growing organizations. No fear tactics. No unnecessary tools. Just honest guidance, clear priorities, and a partner who genuinely cares about your success.\n\nI believe technology should create confidence, not stress. And every business, regardless of size, deserves access to thoughtful, strategic IT leadership at a price that makes sense.";
  const aboutCta = content["about.cta"] || "Let's start with a conversation. I offer free assessments and affordable plans of action so you can understand your options before making any commitments.";
  const aboutButtonText = content["about.buttonText"] || "Schedule Your Free Assessment";

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[70vh] items-center justify-center border-b-2 border-brand/30 bg-black text-center text-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1
            data-ngf-field="hero.headline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            {heroHeadline}
          </h1>
          <p
            data-ngf-field="hero.description"
            data-ngf-label="Description"
            data-ngf-type="textarea"
            data-ngf-section="Hero"
            className="mt-4 text-lg text-white/85"
          >
            {heroDescription}
          </p>
          <Link
            href="/contact"
            data-ngf-field="hero.cta"
            data-ngf-label="Button Text"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="btn-brand mt-8 inline-flex"
          >
            {heroCta}
          </Link>
        </div>
      </section>

      {/* Interactive globe / services teaser */}
      <div id="services">
        <InteractiveGlobe content={content} />
      </div>

      {/* About */}
      <section id="about" className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            data-ngf-field="about.title"
            data-ngf-label="Section Title"
            data-ngf-type="text"
            data-ngf-section="About"
            className="text-2xl font-bold text-brand sm:text-3xl"
          >
            {aboutTitle}
          </h2>
          <p
            data-ngf-field="about.intro"
            data-ngf-label="Intro Line"
            data-ngf-type="text"
            data-ngf-section="About"
            className="mt-4 text-lg font-medium text-white"
          >
            {aboutIntro}
          </p>
          <p
            data-ngf-field="about.body1"
            data-ngf-label="First Body Paragraphs"
            data-ngf-type="textarea"
            data-ngf-section="About"
            className="mt-4 whitespace-pre-line text-white/80"
          >
            {aboutBody1}
          </p>
          <p
            data-ngf-field="about.emphasis"
            data-ngf-label="Emphasis Line"
            data-ngf-type="text"
            data-ngf-section="About"
            className="mt-4 text-lg font-semibold text-brand"
          >
            {aboutEmphasis}
          </p>
          <p
            data-ngf-field="about.body2"
            data-ngf-label="Second Body Paragraphs"
            data-ngf-type="textarea"
            data-ngf-section="About"
            className="mt-4 whitespace-pre-line text-white/80"
          >
            {aboutBody2}
          </p>
          <p
            data-ngf-field="about.cta"
            data-ngf-label="Closing CTA Line"
            data-ngf-type="textarea"
            data-ngf-section="About"
            className="mt-4 text-white/80"
          >
            {aboutCta}
          </p>
          <Link
            href="/contact"
            data-ngf-field="about.buttonText"
            data-ngf-label="Button Text"
            data-ngf-type="text"
            data-ngf-section="About"
            className="btn-brand mt-6 inline-flex"
          >
            {aboutButtonText}
          </Link>
        </div>
      </section>

      {/* Hidden brand anchors for portal editor */}
      <span data-ngf-field="brand.businessName" data-ngf-label="Business Name" data-ngf-type="text" data-ngf-section="Brand" aria-hidden="true" className="sr-only">
        {content["brand.businessName"] || "CompassionIT Consulting"}
      </span>
    </>
  );
}
