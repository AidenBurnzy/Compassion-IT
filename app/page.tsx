import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveGlobe } from "@/components/sections/InteractiveGlobe";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "IT Support & Tech Support in Grand Rapids & Allendale, MI | CompassionIT",
  description:
    "Expert IT support, tech support, cybersecurity, business continuity planning, and strategic IT leadership for small and mid-sized businesses in Grand Rapids, Allendale, and the greater West Michigan area.",
};

export default async function Home() {
  const content = await getNgfContent();

  const heroHeadline = content["hero.headline"] || "Welcome to CompassionIT Consulting";
  const heroDescription = content["hero.description"] || "Guiding IT with Heart — compassionate, expert solutions that drive your business forward.";
  const heroCta = content["hero.cta"] || "Find Solutions";
  const heroBackgroundImage =
    content["hero.backgroundImage"] ||
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

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
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- plain img required by NGF standards for editable image fields (never next/image with fill) */}
        <img
          src={heroBackgroundImage}
          alt=""
          data-ngf-field="hero.backgroundImage"
          data-ngf-label="Background Image"
          data-ngf-type="image"
          data-ngf-section="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Layered overlay: a directional gradient (darker at the edges,
            lighter center-stage on the text) instead of a flat tint, plus a
            bottom fade so the hero melts into the next section rather than
            stopping at a hard line. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
        <div className="glow-orb -left-16 top-10 h-72 w-72 sm:h-96 sm:w-96" aria-hidden="true" />
        <div className="glow-orb -right-16 bottom-0 h-64 w-64 opacity-60 sm:h-80 sm:w-80" aria-hidden="true" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
          <span className="eyebrow animate-fade-in-up">IT Support &amp; Consulting · Grand Rapids, MI</span>
          <h1
            data-ngf-field="hero.headline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="animate-fade-in-up mt-5 text-3xl font-bold text-balance sm:text-4xl md:text-5xl"
            style={{ animationDelay: "0.1s" }}
          >
            {heroHeadline}
          </h1>
          <p
            data-ngf-field="hero.description"
            data-ngf-label="Description"
            data-ngf-type="textarea"
            data-ngf-section="Hero"
            className="animate-fade-in-up mt-4 text-lg text-white/85"
            style={{ animationDelay: "0.2s" }}
          >
            {heroDescription}
          </p>
          <Link
            href="/contact"
            data-ngf-field="hero.cta"
            data-ngf-label="Button Text"
            data-ngf-type="text"
            data-ngf-section="Hero"
            className="btn-brand animate-fade-in-up mt-8 inline-flex"
            style={{ animationDelay: "0.3s" }}
          >
            {heroCta}
          </Link>
        </div>
      </section>

      {/* Interactive globe / services teaser */}
      <div id="services" className="relative bg-black">
        <InteractiveGlobe content={content} />
      </div>

      <div className="section-divider" aria-hidden="true" />

      {/* About */}
      <section id="about" className="section-shell relative overflow-hidden">
        <div className="glow-orb left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 opacity-40" aria-hidden="true" />
        <div className="card-soft relative z-10 mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
          <span className="eyebrow">About</span>
          <h2
            data-ngf-field="about.title"
            data-ngf-label="Section Title"
            data-ngf-type="text"
            data-ngf-section="About"
            className="mt-4 text-2xl font-bold text-brand sm:text-3xl"
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
          <div className="section-divider my-6" aria-hidden="true" />
          <p
            data-ngf-field="about.emphasis"
            data-ngf-label="Emphasis Line"
            data-ngf-type="text"
            data-ngf-section="About"
            className="text-lg font-semibold text-brand"
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
