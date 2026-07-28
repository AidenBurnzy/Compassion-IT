# CompassionIT Consulting

IT support & consulting services site for CompassionIT Consulting (Grand Rapids, MI), built on the NGF stack (Next.js App Router + the `app.ngfsystems.com` portal editor integration).

## Local development

```bash
npm install
npm run dev
```

Opens on http://localhost:3000.

## Content editing

This site's content is editable live from the NGF portal (`app.ngfsystems.com`). See `NGF-STANDARDS.md` in the `NGF-Systems-app` repo for the full editor integration spec — every editable field on this site carries `data-ngf-*` annotations that the portal's scraper reads to build its editing sidebar.

## Environment variables

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Must match this site's `client_configs.site_url` in the NGF database exactly |
| `NGF_APP_URL` | Optional, defaults to `https://app.ngfsystems.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) — GA4 tag is omitted entirely if unset |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID — Clarity tag is omitted entirely if unset |
| `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` | Contact form email delivery (Resend) — form submissions are accepted but silently skip email if unset |

## Deployment

One Vercel project per NGF client site. Set the env vars above in the Vercel project settings, then set the client's `site_url` in NGF admin to match `NEXT_PUBLIC_SITE_URL` exactly.
