# Website

The public website for The Savio Project, generated from the Markdown in this repository's `content/` and `docs/` directories. The site holds no copies of any content — it reads the canonical files directly at build time via Astro content collections (see `src/content.config.ts`).

**Content contributors can ignore this folder entirely.** Edit the Markdown at the repository root; the site rebuilds from it automatically on merge.

## Stack

- [Astro](https://astro.build) 7, fully static output (no server, no adapter)
- Tailwind CSS 4 + typography plugin (`src/styles/global.css` holds the design tokens)
- Fonts: Cormorant Garamond (display), Source Serif 4 (body), Source Sans 3 (UI), self-hosted via Fontsource

## How it fits together

- `src/lib/registry.ts` — the route registry: maps site routes to repository documents. **Add a page here when a new document lands in the repo.**
- `src/lib/markdown-plugins.mjs` — Sätteri mdast plugins: strips each document's own H1 (the layout supplies the title) and rewrites relative `.md` links into site routes (GitHub for files without a page). Its route map mirrors the registry — keep both in sync.
- `src/pages/[...slug].astro` — renders every registered document.
- `src/pages/index.astro`, `src/pages/library.astro` — the landing page and the full document index.

## Develop & build

```
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
```

`VITE_CACHE_DIR`, `ASTRO_OUT_DIR`, and `ASTRO_CACHE_DIR` env vars can relocate caches/output (useful in restricted sandboxes); unset, everything is default.

## Deploy (Cloudflare Workers, static assets)

`wrangler.jsonc` declares this a static-assets-only Worker serving `dist/` (with `404.html` for unknown routes). In the Cloudflare Workers build configuration:

- Path (root directory): `/website`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (default)
- Non-production deploy command: `npx wrangler versions upload` (default — gives every branch/PR build a preview URL)

Custom domains (`savioproject.org`, `www`) are attached on the Worker under Settings → Domains & Routes.

## License

The website's **code** (this folder) is licensed under the MIT License — see [LICENSE](LICENSE). The **content** it renders is licensed separately under CC BY-NC-SA 4.0 — see the repository's [LICENSE.md](../LICENSE.md).
