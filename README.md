# Vivace 2026 — SMU CCA Fair Website

The official website for Vivace 2026, SMU's annual CCA fair. The theme is a supermarket — CCAs are shelved by school umbrella, students fill a basket, and the whole experience leans into that grocery metaphor throughout the design and copy.

---

## Getting started

```bash
npm install
npm run dev     # development, auto-restarts on file changes (nodemon)
npm start       # production
```

The server runs on **http://localhost:3000** by default. Set a `PORT` environment variable to use a different port.

---

## Project structure

```
vivace-2026/
├── server.js              # Entry point — Express setup, middleware, view engine
├── routes/
│   └── index.js           # URL routing table (no business logic here)
├── controllers/
│   ├── homeController.js  # Home page
│   ├── exploreController.js # /explore and /explore/:school
│   └── pageController.js  # All other pages + CCA detail
├── models/
│   ├── schools.js         # The seven school umbrellas (ACF, SICS, ICON, …)
│   ├── cca-catalogue.js   # Full list of ~120 CCAs, auto-generated from groups
│   ├── events.js          # The three headline events (Opening, Try-outs, Finale)
│   ├── partners.js        # Sponsor tiers + deals board
│   └── faq.js             # Accordion Q&A pairs
├── views/
│   ├── partials/          # Shared EJS components (nav, hero, footer, etc.)
│   └── *.ejs              # One template per page
└── public/
    ├── css/               # One stylesheet per section/page
    └── js/                # Client-side scripts (filter, animation, nav, etc.)
```

The app follows MVC conventions: **models** hold the data, **views** handle the markup, **controllers** sit in between and pass the right data to the right template. The router just maps URLs to controller methods — no logic lives there.

---

## Pages

| Route | What it does |
|---|---|
| `/` | Home — basket hero, school fruit grid, marquee |
| `/explore` | CCA shelf — all clubs, filterable by school |
| `/explore/:school` | Same page, pre-filtered to one umbrella |
| `/cca/:id` | Individual CCA detail page |
| `/about` | About Vivace — receipt print animation, team slider |
| `/faq` | Accordion of common questions |
| `/partners` | Sponsor shelf + deals board |
| `/events` | Event calendar cards |
| `/map` | Venue map with zoom/pan |
| `/programmes` | Day-by-day schedule |

---

## Data

All site content comes from the files in `/models`. To update most things you only need to touch those files — the controllers and views pick up changes automatically.

**Adding a new CCA** — find the matching `groups` entry in `cca-catalogue.js` and add the name to its `names` array. Booth number, slug, colour, and all other fields are derived automatically.

**Adding a sponsor** — find the right tier in `partners.js` and add a `{ name, logo }` entry to its `sponsors` array. Drop the logo file in `public/assets/sponsors/`.

---

## Styles

Each page or section has its own CSS file in `public/css/`. Cache-busting is handled with `?v=N` query strings on the `<link>` tags in `views/partials/head.ejs` — increment the version number whenever you change a file so browsers pick up the new version.

CSS custom properties for brand colours are defined in the root stylesheet and referenced throughout as `var(--red)`, `var(--blue)`, etc.

---

## Deployment

The project is set up for Vercel (see `vercel.json`). Pushing to the connected branch triggers a deploy automatically. For local testing before pushing, `npm run dev` is all you need.

---

## Tech stack

- **Node.js + Express** — server and routing
- **EJS** — server-side HTML templating
- **Vanilla CSS** — no framework, all custom
- **Vanilla JS** — no build step, files are served directly from `/public/js/`
- **compression** — gzip middleware to keep payload sizes small
