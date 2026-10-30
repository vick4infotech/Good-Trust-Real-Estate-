# Good Trust Real Estate

An elegant, responsive, 3-page React website for Good Trust Real Estate, with a custom branded loading experience, animated sections, property browsing, an executive profile, and direct WhatsApp enquiries.

## Pages

- `/` Home: cinematic hero, property showcase, services, CEO introduction, enquiry form.
- `/listings` Current Listings: search, category filters, property detail popups, WhatsApp enquiries.
- `/about` About Us: company story, principles, CEO portrait, investor message, FAQs.

## Technology

React 18, Vite 6, React Router 6, Framer Motion 11, Lucide React, custom CSS. The site works without a custom backend. The enquiry form prepares a WhatsApp message for the visitor to send.

## Run locally

Install Node.js 20 or higher. In this folder, run:

```bash
npm install
npm run dev
```

Open the address printed in your terminal, typically `http://localhost:5173`.

Build for production:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Unzip this project.
2. Upload it to a GitHub repository.
3. In Vercel, choose **Add New Project** and import that repository.
4. Vercel should detect **Vite**. Build command: `npm run build`. Output directory: `dist`.
5. Click **Deploy**. The supplied `vercel.json` enables direct linking to `/listings` and `/about`.

Alternatively, use the Vercel CLI from the project folder: `npx vercel`.

**Important:** Upload the project root that contains `package.json` and `vercel.json`, not a parent folder or only the `src` folder.

## Update brand and contact details

All contact information is in `src/data.js` under `SITE`. You can edit the office address, email, phone, WhatsApp, Instagram, and Linktree in one place. The current information is based on the provided brand brief.

The visible brand is `Good Trust Real Estate`. The logo art also includes the name `Good Trust Estate Management Ltd.` from the client-supplied logo. Confirm the preferred registered and public-facing legal names before final launch.

## Edit listings

In `src/data.js`, edit the `properties` array to change titles, descriptions, categories, and images. Categories can be `Residential`, `Commercial`, or `Design Concepts`.

Images live in `public/assets/`:

- `grand-residence.webp` photographed multi-level home
- `commercial-plaza.webp` yellow and white commercial complex
- `modern-duplex-concept.webp` computer-generated concept, not a building photo
- `bungalow-residence.webp` bungalow with paved courtyard
- `commercial-station.webp` commercial forecourt
- `peter-suleiman.webp` CEO portrait
- `brand-full.webp` supplied brand logo crop for animated loader
- `brand-mark.png` extracted brand icon for navigation and favicon
- `official-logo.webp` full original logo image
- `community-graphic.webp` supplied promotional material, intentionally not used on the website to avoid implying an unverified government partnership

**Listing verification needed:** No sale prices, precise addresses, inventory status, floor areas, bedroom counts, land title documents, or proof of ownership were provided. Property titles are working descriptive titles, not verified official project names. The site intentionally treats these assets as a showcase and does not falsely state they are available for purchase. Confirm each listing before advertising it as active. You can add verified values to `src/data.js` and display them in the cards/dialogue as needed.

## CEO message

The investor welcome letter in `src/App.jsx`, inside `AboutPage`, is editorial copy drafted for the website. Have CEO Peter Suleiman review and approve it before publication.

## Practical notes

- This is a frontend-only React SPA. It does not need SMTP, API keys, environment variables, or a database.
- The enquiry form opens WhatsApp with a prefilled message, and the user must manually press send.
- Fonts are Cormorant Garamond and Manrope, loaded from Google Fonts. The design includes fallback fonts.
- Animations respect `prefers-reduced-motion`.
- The site has page titles, meta descriptions, Open Graph tags, semantic headings, alt text, a crawlable robots file, and RealEstateAgent structured data based on supplied contact details.
- Browser-based routing is supported by `vercel.json`.
- Use HTTPS automatically provided by Vercel on a deployed domain.

## Before launch

Confirm the legal company name, CEO-approved message, property descriptions, listing ownership/availability, and the actual web domain. Replace the generic Open Graph image if you commission a dedicated social preview. If you plan to take online payments or store enquiry data, add a secure backend and privacy policy before enabling those features.
