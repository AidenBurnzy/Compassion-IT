import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        // Vercel Blob — uploaded images from the NGF portal editor
        protocol: "https",
        hostname: "public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      // Old static-site pages → new Next.js routes
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/business-continuity.html", destination: "/services/business-continuity", permanent: true },
      { source: "/vcio-leadership.html", destination: "/services/vcio-leadership", permanent: true },
      { source: "/vendor-project-management.html", destination: "/services/vendor-project-management", permanent: true },
      { source: "/remote-monitoring.html", destination: "/services/remote-monitoring", permanent: true },
      { source: "/cybersecurity-assessment.html", destination: "/services/cybersecurity-assessment", permanent: true },
      { source: "/breakfix.html", destination: "/breakfix", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://cdnjs.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://app.ngfsystems.com",
              "frame-src 'self'",
              "frame-ancestors 'self' https://app.ngfsystems.com https://*.vercel.app",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
