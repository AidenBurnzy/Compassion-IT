import Link from "next/link";
import type { NgfSiteContent } from "@/lib/ngf";

type ServicePageProps = {
  content: NgfSiteContent;
  sectionKey: string;
  /** Service slug (matches lib/services-data.ts) used to pre-fill the contact form's topic dropdown. */
  slug: string;
  defaults: {
    heroHeadline: string;
    heroDescription: string;
    intro: string;
    body: string;
    closing: string;
    ctaText: string;
    image: string;
    imageAlt: string;
  };
};

// Shared layout for the five dedicated /services/[slug] pages — each page.tsx
// just supplies its own metadata + sectionKey + default copy (ported from the
// original static HTML pages) and this renders the annotated markup.
export function ServicePage({ content, sectionKey, slug, defaults }: ServicePageProps) {
  const heroHeadline = content[`${sectionKey}.heroHeadline`] || defaults.heroHeadline;
  const heroDescription = content[`${sectionKey}.heroDescription`] || defaults.heroDescription;
  const intro = content[`${sectionKey}.intro`] || defaults.intro;
  const body = content[`${sectionKey}.body`] || defaults.body;
  const closing = content[`${sectionKey}.closing`] || defaults.closing;
  const ctaText = content[`${sectionKey}.ctaText`] || defaults.ctaText;
  const image = content[`${sectionKey}.image`] || defaults.image;
  const imageAlt = content[`${sectionKey}.imageAlt`] || defaults.imageAlt;

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-black text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- plain img required by NGF standards for editable image fields (never next/image with fill) */}
        <img
          src={image}
          alt={imageAlt}
          data-ngf-field={`${sectionKey}.image`}
          data-ngf-label="Background Image"
          data-ngf-type="image"
          data-ngf-section="ServicePage"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-14">
          <span className="eyebrow animate-fade-in-up">Service</span>
          <h1
            data-ngf-field={`${sectionKey}.heroHeadline`}
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="ServicePage"
            className="animate-fade-in-up mt-4 text-3xl font-bold text-balance sm:text-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            {heroHeadline}
          </h1>
          <p
            data-ngf-field={`${sectionKey}.heroDescription`}
            data-ngf-label="Description"
            data-ngf-type="text"
            data-ngf-section="ServicePage"
            className="animate-fade-in-up mt-4 text-lg text-white/85"
            style={{ animationDelay: "0.2s" }}
          >
            {heroDescription}
          </p>
        </div>
      </section>

      <section className="section-shell relative overflow-hidden">
        <div className="glow-orb left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-30" aria-hidden="true" />
        <div className="card-soft relative z-10 mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-12">
          <p
            data-ngf-field={`${sectionKey}.intro`}
            data-ngf-label="Intro Line"
            data-ngf-type="text"
            data-ngf-section="ServicePage"
            className="border-l-2 border-brand pl-4 text-lg font-medium text-white"
          >
            {intro}
          </p>
          <p
            data-ngf-field={`${sectionKey}.body`}
            data-ngf-label="Body Paragraphs"
            data-ngf-type="textarea"
            data-ngf-section="ServicePage"
            className="mt-4 whitespace-pre-line text-white/80"
          >
            {body}
          </p>
          <p
            data-ngf-field={`${sectionKey}.closing`}
            data-ngf-label="Closing Statement"
            data-ngf-type="textarea"
            data-ngf-section="ServicePage"
            className="mt-4 text-lg font-medium text-white"
          >
            {closing}
          </p>
          <div className="mt-10 text-center">
            <Link
              href={`/contact?topic=${slug}`}
              data-ngf-field={`${sectionKey}.ctaText`}
              data-ngf-label="Button Text"
              data-ngf-type="text"
              data-ngf-section="ServicePage"
              className="btn-brand"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
