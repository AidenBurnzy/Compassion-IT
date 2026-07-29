import Link from "next/link";
import type { NgfSiteContent } from "@/lib/ngf";

type FooterProps = { content: NgfSiteContent };

export function Footer({ content }: FooterProps) {
  const tagline = content["footer.tagline"] || "Guiding IT with Heart — compassionate solutions that empower businesses to thrive.";
  const serviceArea =
    content["footer.serviceArea"] ||
    "Proudly serving Grand Rapids, Allendale, Grandville, Walker, Wyoming, and the greater West Michigan area.";
  const quickLinksLabel = content["footer.quickLinksLabel"] || "Quick Links";
  const contactLabel = content["footer.contactLabel"] || "Contact Info";
  const email = content["footer.email"] || "info@CompassionITConsulting.com";
  const phone = content["footer.phone"] || "616.422.0228";
  const copyright = content["footer.copyright"] || `© ${new Date().getFullYear()} CompassionIT Consulting. All rights reserved.`;

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="section-divider" aria-hidden="true" />
      <div className="glow-orb left-1/2 top-0 h-72 w-72 -translate-x-1/2 opacity-20" aria-hidden="true" />
      <div className="section-shell relative grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-brand">CompassionIT Consulting</h3>
          <p data-ngf-field="footer.tagline" data-ngf-label="Tagline" data-ngf-type="textarea" data-ngf-section="Footer" className="mt-3 text-white/80">
            {tagline}
          </p>
          <p data-ngf-field="footer.serviceArea" data-ngf-label="Service Area" data-ngf-type="textarea" data-ngf-section="Footer" className="mt-2 text-sm text-white/60">
            {serviceArea}
          </p>
        </div>

        <div>
          <h3 data-ngf-field="footer.quickLinksLabel" data-ngf-label="Quick Links Heading" data-ngf-type="text" data-ngf-section="Footer" className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {quickLinksLabel}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            <li><Link href="/#services" className="hover:underline">Services</Link></li>
            <li><Link href="/#about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/breakfix" className="hover:underline">Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 data-ngf-field="footer.contactLabel" data-ngf-label="Contact Heading" data-ngf-type="text" data-ngf-section="Footer" className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {contactLabel}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            <li>
              📧{" "}
              <a href={`mailto:${email}`} className="hover:underline">
                <span data-ngf-field="footer.email" data-ngf-label="Email" data-ngf-type="text" data-ngf-section="Footer">
                  {email}
                </span>
              </a>
            </li>
            <li>
              📞{" "}
              <a href={`tel:+1${phone.replace(/\D/g, "")}`} className="hover:underline">
                <span data-ngf-field="footer.phone" data-ngf-label="Phone" data-ngf-type="text" data-ngf-section="Footer">
                  {phone}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-divider opacity-40" aria-hidden="true" />
      <div className="relative py-5 text-center text-sm text-white/60">
        <span data-ngf-field="footer.copyright" data-ngf-label="Copyright" data-ngf-type="text" data-ngf-section="Footer">
          {copyright}
        </span>
      </div>
    </footer>
  );
}
