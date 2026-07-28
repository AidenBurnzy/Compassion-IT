import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CompassionIT Consulting for expert IT support and consulting services. Free assessments available. Call 616.422.0228 or email us today.",
};

export default async function ContactPage() {
  const content = await getNgfContent();

  const heading = content["contactPage.heading"] || "Let's Talk About Your IT";
  const description = content["contactPage.description"] || "Share what you're facing. We'll respond with clear, practical next steps—no pressure.";
  const reachOutTitle = content["contactPage.reachOutTitle"] || "Reach Out";
  const reachOutBody = content["contactPage.reachOutBody"] || "Tell us what's not working or where you need guidance. We respond within one business day.";
  const email = content["contactPage.email"] || "info@CompassionITConsulting.com";
  const phone = content["contactPage.phone"] || "616.422.0228";
  const servicesLine = content["contactPage.servicesLine"] || "Strategy, audits, cloud, security, break/fix.";

  return (
    <section className="section-shell">
      <div className="mx-auto max-w-3xl text-center">
        <h1 data-ngf-field="contactPage.heading" data-ngf-label="Heading" data-ngf-type="text" data-ngf-section="ContactPage" className="text-3xl font-bold text-brand sm:text-4xl">
          {heading}
        </h1>
        <p data-ngf-field="contactPage.description" data-ngf-label="Description" data-ngf-type="textarea" data-ngf-section="ContactPage" className="mt-4 text-white/80">
          {description}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
        <div className="card-soft">
          <h2 data-ngf-field="contactPage.reachOutTitle" data-ngf-label="Reach Out Title" data-ngf-type="text" data-ngf-section="ContactPage" className="text-xl font-semibold text-brand">
            {reachOutTitle}
          </h2>
          <p data-ngf-field="contactPage.reachOutBody" data-ngf-label="Reach Out Body" data-ngf-type="textarea" data-ngf-section="ContactPage" className="mt-3 text-white/80">
            {reachOutBody}
          </p>
          <ul className="mt-5 space-y-2 text-white/90">
            <li>
              <span className="font-semibold text-white">Email:</span>{" "}
              <a href={`mailto:${email}`} className="text-brand hover:underline">
                <span data-ngf-field="contactPage.email" data-ngf-label="Email" data-ngf-type="text" data-ngf-section="ContactPage">
                  {email}
                </span>
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">Phone:</span>{" "}
              <a href={`tel:+1${phone.replace(/\D/g, "")}`} className="text-brand hover:underline">
                <span data-ngf-field="contactPage.phone" data-ngf-label="Phone" data-ngf-type="text" data-ngf-section="ContactPage">
                  {phone}
                </span>
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">Services:</span>{" "}
              <span data-ngf-field="contactPage.servicesLine" data-ngf-label="Services Line" data-ngf-type="text" data-ngf-section="ContactPage">
                {servicesLine}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-brand">Send a Message</h2>
          <ContactForm content={content} />
        </div>
      </div>
    </section>
  );
}
