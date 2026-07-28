export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CompassionIT Consulting",
    description:
      "Expert IT support, cybersecurity, business continuity planning, and strategic IT leadership for small and mid-sized businesses in Grand Rapids, MI.",
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
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 42.9634, longitude: -85.6681 },
      geoRadius: 50000,
    },
    serviceType: [
      "IT Support",
      "Computer Help",
      "Managed IT Services",
      "Cybersecurity",
      "Business Continuity Planning",
      "IT Consulting",
      "vCIO Services",
      "Network Support",
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
