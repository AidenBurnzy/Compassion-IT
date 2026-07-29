import { services } from "@/lib/services-data";

// Explicit city coverage (in addition to the GeoCircle radius below) so
// Google can match this business directly against "<service> near <city>"
// / "<service> in <city>" queries for the specific West Michigan towns we
// actually serve, not just a fuzzy 50km radius around Grand Rapids.
const SERVICE_AREA_CITIES = [
  "Grand Rapids, MI",
  "Allendale, MI",
  "Grandville, MI",
  "Walker, MI",
  "Wyoming, MI",
  "Kentwood, MI",
  "Hudsonville, MI",
  "Jenison, MI",
  "Standale, MI",
];

const AREA_SERVED = [
  ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
  {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 42.9634, longitude: -85.6681 },
    geoRadius: 50000,
  },
];

const BREAKFIX_SERVICE = { name: "Break/Fix IT Support & Computer Repair" };

export function LocalBusinessSchema() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CompassionIT Consulting",
    description:
      "Expert IT support, cybersecurity, business continuity planning, and strategic IT leadership for small and mid-sized businesses in Grand Rapids, Allendale, and the greater West Michigan area.",
    url: "https://www.compassionitconsulting.com",
    telephone: "+16164220228",
    email: "info@CompassionITConsulting.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Grand Rapids",
      addressRegion: "MI",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.9634,
      longitude: -85.6681,
    },
    areaServed: AREA_SERVED,
    serviceType: [
      "IT Support",
      "Tech Support",
      "Computer Help",
      "Managed IT Services",
      "Cybersecurity",
      "Business Continuity Planning",
      "IT Consulting",
      "vCIO Services",
      "Network Support",
      "Computer Repair",
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
  };

  // Service + OfferCatalog schema (NGF-STANDARDS "Expanding structured
  // data" pattern) -- helps individual service pages surface for
  // "<service> near <city>" queries rather than only the homepage ranking
  // for generic "IT support" terms. Reuses the same canonical service list
  // (lib/services-data.ts) the site's own nav/routes are built from, plus
  // Break/Fix, so this can't drift out of sync with the real pages.
  const serviceCatalog = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "IT Support and Consulting",
    provider: { "@type": "LocalBusiness", name: "CompassionIT Consulting" },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Support & Consulting Services",
      itemListElement: [...services.map((s) => ({ name: s.navLabel })), BREAKFIX_SERVICE].map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalog) }} />
    </>
  );
}
