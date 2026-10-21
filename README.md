# The Bougainvillea Retreat — showcase website

Showcase homepage for **[The Bougainvillea Retreat](https://www.google.com/maps/place/?q=place_id:ChIJszFhFZHXCDkRW85IANosYic)**, a private pool villa in Bhagwant Pur, Dehradun (Uttarakhand, India) — mountain views, candlelit dinners and rooftop dining at the Terrace of Doon. Rated 4.7/5 from 506+ Google reviews.

- Book / enquire: [Direct Booking Engine (DigiBooking)](https://digibooking.in/H433) · WhatsApp [+91 92584 97632](https://wa.me/919258497632) · [Booking.com listing](https://www.booking.com/hotel/in/the-bougainvillea-riverside.html)
- Business profile: [the-bougainvillea-villa.grexa.site](https://the-bougainvillea-villa.grexa.site/)

Built with React 19 + Vite, statically prerendered so search engines and social previews receive the full page HTML.

## Develop

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # client build → SSR build → prerender into dist/
npm run preview   # serve dist/ at the production base path
```

## How it fits together

| Path | Purpose |
| --- | --- |
| `src/data/site.js` | Single source of truth for property facts, reels, gallery, reviews and outbound links |
| `src/seo.js` | JSON-LD (`LodgingBusiness`, `WebSite`, `WebPage`, `VideoObject`), sitemap and robots |
| `src/components/Botanical.jsx` | Bougainvillea motif: SVG sprite, bloom mark, flowering spray, falling bracts, wave edges |
| `scripts/prerender.mjs` | Injects server-rendered markup + JSON-LD into `dist/index.html`, writes `sitemap.xml`, `robots.txt` |
| `public/assets/` | Optimised photos (`*-sm.jpg` = 800w, others 1600w+) and 720×1280 H.264 reels |

### Canonical URL

`VITE_SITE_URL` in `.env.production` sets the canonical URL, Open Graph URLs, sitemap and JSON-LD, and the build's base path is derived from it. It currently points at the Vercel deployment (`https://bougainvillea-three.vercel.app`, served from the domain root). For a sub-path host such as GitHub Pages, use the full sub-path URL (e.g. `https://devgit-innspire.github.io/Bougainvillea`). When a custom domain is connected, change that one value and rebuild.

### Deploying

Vercel builds from `main` automatically (framework preset: Vite, build command `npm run build`, output `dist`).

#### GitHub Pages (alternative)

A ready workflow lives at `deploy/github-pages-workflow.yml`. Move it to `.github/workflows/deploy.yml` (pushing workflow files needs a token with the `workflow` scope), set **Settings → Pages → Source** to *GitHub Actions*, then run it from the Actions tab.

### SEO checklist after go-live

- Submit `sitemap.xml` in Google Search Console (it includes image and video entries).
- Add the live URL as the **website** on the Google Business Profile, the Booking.com property page and the grexa site — those are the backlinks that matter most for local search.

## Booking behaviour

Direct booking CTAs ("Book now", "Book this stay") link directly to the official DigiBooking engine (`https://digibooking.in/H433?utm_source=website`). WhatsApp concierge is linked for direct communication, and Booking.com is linked as a secondary OTA option.

## Media sources

- Reels: client Google Drive — `the-villa` (four raw iOS clips), `poolside` (`IMG_6193/6194/6196`), `date-nights` (`TOD EDITED VIDEOS/B2.mp4`).
- Photos and review quotes: the property's Google Business Profile (reviewer names shortened).
- Room photos (`public/assets/img/rooms/`): client Drive folder `drive-download-20250706T134128Z-1-001`, matched by filename (Tara Villa, Valley View, Rustic Cottage, Swimming Pool).

## Rooms

7 rooms across 4 stay types, defined in `ROOMS` in `src/data/site.js`: Tara Villa (1 BHK), Valley View Rooms (2), Private Pool Villa (2), Rustic Cottages (2). The Stays section, the enquiry form's *Stay* menu, JSON-LD `numberOfRooms`/`containsPlace` and the sitemap's image entries all read from it.
