import type { Metadata } from "next";
import Link from "next/link";
import { getNgfContent } from "@/lib/ngf";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CompassionIT Consulting collects, uses, and protects information, including our use of cookies, Google Analytics, and Microsoft Clarity.",
};

const EFFECTIVE_DATE = "July 29, 2026";

export default async function PrivacyPolicyPage() {
  const content = await getNgfContent();
  const email = content["contactPage.email"] || content["footer.email"] || "info@CompassionITConsulting.com";
  const phone = content["contactPage.phone"] || content["footer.phone"] || "616.422.0228";

  return (
    <section className="section-shell">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-brand sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/60">Effective {EFFECTIVE_DATE}</p>

        <div className="mt-10 space-y-10 text-white/80">
          <div>
            <p>
              CompassionIT Consulting (&ldquo;CompassionIT,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
              This policy explains what information we collect through compassionitconsulting.com (the &ldquo;Site&rdquo;), why we collect
              it, and the choices you have. It is not a substitute for legal advice about your own rights &mdash; if you have questions
              about how a specific law applies to you, please consult an attorney.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
            <p className="mt-3">
              <span className="font-semibold text-white">Information you give us.</span> When you submit our contact form, we collect
              your name, email address, phone number (optional), the topic you select, and any message you write. That submission is
              sent to our team by email so we can respond &mdash; we do not store it in a marketing database or share it with third
              parties for their own use.
            </p>
            <p className="mt-3">
              <span className="font-semibold text-white">Information collected automatically.</span> Like most websites, when you visit
              the Site we (through the tools described below) may automatically collect your approximate location (derived from IP
              address), browser and device type, pages viewed, time on page, and referring website. We use this only in aggregate to
              understand how the Site is used &mdash; not to identify you personally.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Cookies &amp; Tracking Technologies</h2>
            <p className="mt-3">The Site uses a small number of cookies:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-semibold text-white">Necessary.</span> A single cookie (<code className="text-brand">ngf_cookie_consent</code>)
                that remembers whether you accepted or declined analytics cookies. This is required for the Site to function as intended
                and is set regardless of your choice.
              </li>
              <li>
                <span className="font-semibold text-white">Analytics (optional).</span> Google Analytics 4 and Microsoft Clarity, which
                help us understand traffic and improve the Site (for example, which pages are most useful and where visitors run into
                trouble). These are third-party services &mdash; see below for their own privacy policies.
              </li>
            </ul>
            <p className="mt-3">
              Analytics cookies are <span className="font-semibold text-white">off by default</span>. They only load after you click
              &ldquo;Accept&rdquo; on the cookie banner shown on your first visit. You can change your choice at any time using the
              &ldquo;Cookie Preferences&rdquo; link in the footer of every page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">How We Use Information</h2>
            <p className="mt-3">We use the information described above to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to inquiries submitted through the contact form</li>
              <li>Understand how visitors use the Site so we can improve it</li>
              <li>Maintain the security and proper functioning of the Site</li>
            </ul>
            <p className="mt-3">We do not sell your personal information, and we do not use it for third-party advertising.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Third-Party Service Providers</h2>
            <p className="mt-3">We rely on the following third parties to operate the Site. Each processes data under its own privacy policy:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-semibold text-white">Google Analytics</span> (Google LLC) &mdash; site usage analytics, loaded only
                after consent.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline hover:no-underline"
                >
                  Google&rsquo;s Privacy Policy
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Microsoft Clarity</span> (Microsoft Corporation) &mdash; heatmaps and session
                analytics, loaded only after consent.{" "}
                <a
                  href="https://privacy.microsoft.com/en-us/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline hover:no-underline"
                >
                  Microsoft&rsquo;s Privacy Statement
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Resend</span> &mdash; delivers contact form submissions to our team by email.
              </li>
              <li>
                <span className="font-semibold text-white">Vercel</span> &mdash; hosts the Site and processes standard server logs.
              </li>
              <li>
                <span className="font-semibold text-white">NGF Systems</span> &mdash; the content management platform that powers the
                editable content on this Site.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Your Choices &amp; Rights</h2>
            <p className="mt-3">
              You can accept or decline analytics cookies at any time via the &ldquo;Cookie Preferences&rdquo; link in the footer, or
              opt out of Google Analytics site-wide using{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline hover:no-underline"
              >
                Google&rsquo;s browser opt-out add-on
              </a>
              . Most browsers also let you block or delete cookies directly in their settings.
            </p>
            <p className="mt-3">
              <span className="font-semibold text-white">California residents:</span> we do not sell or share personal information as
              defined by the CCPA/CPRA. You may still contact us to ask what information we hold about you or to request its deletion.
            </p>
            <p className="mt-3">
              <span className="font-semibold text-white">EU/UK visitors:</span> where GDPR applies, our lawful basis for analytics
              cookies is your consent, which you may withdraw at any time as described above. Contact us to exercise any other rights
              available to you under applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Data Retention &amp; Security</h2>
            <p className="mt-3">
              We retain contact form submissions only as long as needed to respond to your inquiry and for our own recordkeeping. We use
              reasonable administrative and technical safeguards to protect information, but no method of transmission or storage is
              100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Children&rsquo;s Privacy</h2>
            <p className="mt-3">
              The Site is not directed to children under 13, and we do not knowingly collect personal information from children.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Changes to This Policy</h2>
            <p className="mt-3">
              We may update this policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <p className="mt-3">
              Questions about this policy or your information? Reach us at{" "}
              <a href={`mailto:${email}`} className="text-brand underline hover:no-underline">
                {email}
              </a>{" "}
              or{" "}
              <a href={`tel:+1${phone.replace(/\D/g, "")}`} className="text-brand underline hover:no-underline">
                {phone}
              </a>
              , or via our{" "}
              <Link href="/contact" className="text-brand underline hover:no-underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
