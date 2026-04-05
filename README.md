# EVENANA Brochure Website (Corinthia-Inspired)

Route-based brochure website built from `Treatment Brochure.docx` content and styled to mirror the visual direction of Corinthia London's Biome spa page.

## Stack

- Vite + React
- Tailwind CSS (via `@tailwindcss/vite`)
- React Router
- Theme tokens for light and dark mode
- Brochure text parser with service category routes

## Run locally

```bash
npm install
npm run dev
```

## Routes

- `/` overview page with all brochure service categories
- `/services/:slug` service detail pages (menu + aftercare)
- `/not-found` fallback page

## Content source

Brochure content is stored in:

- `src/data/brochure/brochure.txt`
- `src/data/brochure/serviceConfigs.js`
- `src/lib/brochureParser.js`

You can update `serviceConfigs.js` to add/remove brochure categories or route slugs.
