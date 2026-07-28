import Link from "next/link";
import type { NgfSiteContent } from "@/lib/ngf";

type ServicePageProps = {
  content: NgfSiteContent;
  sectionKey: string;
  defaults: {
    heroHeadline: string;
    heroDescription: string;
    intro: string;
    body: string;
    closing: string;
    ctaText: string;
  };
};

// Shared layout for the five dedicated /services/[slug] pages — each page.tsx
// just supplies its own metadata + sectionKey + default copy (ported from the
// original static HTML pages) and this renders the annotated markup.
export function ServicePage({ content, sectionKey, defaults }: ServicePageProps) {
  const heroHeadline = content[`${sectionKey}.heroHeadline`] || defaults.heroHeadline;
  const heroDescription = content[`${sectionKey}.heroDescription`] || defaults.heroDescription;
  const intro = content[`${sectionKey}.intro`] || defaults.intro;
  const body = content[`${sectionKey}.body`] || defaults.body;
  const closing = content[`${sectionKey}.closing`] || defaults.closing;
  const ctaText = content[`${sectionKey}.ctaText`] || defaults.ctaText;

  return (
    <>
      <section className="flex min-h-[40vh] items-center justify-center border-b-2 border-brand/30 bg-black text-center text-white">
        <div className="mx-auto max-w-2xl px-6 py-14">
          <h1
            data-ngf-field={`${sectionKey}.heroHeadline`}
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="ServicePage"
            className="text-3xl font-bold sm:text-4xl"
          >
            {heroHeadline}
          </h1>
          <p
            data-ngf-field={`${sectionKey}.heroDescription`}
            data-ngf-label="Description"
            data-ngf-type="text"
            data-ngf-section="ServicePage"
            className="mt-4 text-lg text-white/85"
          >
            {heroDescription}
          </p>
        </div>
      </section>

      <section className="section-shell mx-auto max-w-3xl">
        <p
          data-ngf-field={`${sectionKey}.intro`}
          data-ngf-label="Intro Line"
          data-ngf-type="text"
          data-ngf-section="ServicePage"
          className="text-lg font-medium text-white"
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
            href="/contact"
            data-ngf-field={`${sectionKey}.ctaText`}
            data-ngf-label="Button Text"
            data-ngf-type="text"
            data-ngf-section="ServicePage"
            className="btn-brand"
          >
            {ctaText}
          </Link>
        </div>
      </section>
    </>
  );
}
