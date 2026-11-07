# useless verse.

A universe of beautifully useless things. Phase 1 builds the home for future original web experiments. There are no games, fictional projects, accounts, databases, or external API requirements.

## Local development

Use Node.js 22+ and pnpm 11. Install pnpm with Corepack if necessary.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the printed localhost URL. Fonts are self-hosted with Fontsource; the running website makes no Google Fonts requests.

```sh
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

The build exports static pages to `out/`. Run `pnpm start` to preview this production output on http://127.0.0.1:3000. The included static server serves `404.html` with HTTP 404 for unknown paths. `next start` does not support static exports.

## Structure

- `app/layout.tsx`: minimal root, fonts, global tokens, SEO and viewport. It deliberately contains no site header or footer.
- `app/(site)/`: homepage and About page. They use `SiteShell` for shared navigation/footer, with explicit current-page state and no client JavaScript for navigation highlighting.
- `app/not-found.tsx`: custom 404, including a working home link.
- `scripts/generate-social.tsx`, `app/icon.svg`, `app/robots.ts`: original code-generated sharing art, favicon, crawler rules.
- `components/`: logo, header, footer, shell, project cards, grid, and empty state.
- `lib/projects.ts`: single ordered, typed project registry. Initially empty.
- `lib/site.ts`: editable site copy and optional real origin.
- `public/branding/`: original reusable brand asset.
- `public/thumbnails/`: future real project thumbnails; initially empty.
- `tests/`: test-only registry/card fixtures, never part of production data.

## Add an experience

1. Create `app/(experiences)/your-slug/page.tsx`. Route groups do not affect URLs, so this becomes `/your-slug/`. Do not put it inside `(site)`. Do not wrap it in `SiteShell` unless you want the site navigation.
2. Give that experience its own layout, fonts, scoped styles/CSS modules, colors and metadata. The root stylesheet provides a light baseline; override it within the experience wrapper. Avoid unscoped selectors that affect other routes. Full-screen experiences can set their wrapper to `min-height: 100svh`.
3. Add a real optimized image to `public/thumbnails/your-slug.webp`, ideally 720×540 (4:3).
4. Add one record to `projects` in `lib/projects.ts`. Keep `id` unique and `slug` as one URL segment without slashes. `status` must be `draft` until the experience and route are ready.

```ts
{
  id: "your-slug",
  slug: "your-slug",
  title: "Your experience",
  description: "An optional short description.",
  thumbnail: "/thumbnails/your-slug.webp",
  status: "draft",
  // publishedAt: "2026-11-07", // optional ISO date, interpreted in UTC
  // featured: true,           // optional metadata, no special rendering yet
  // tags: ["curiosity"],      // optional metadata, no filtering UI
}
```

5. Verify the route, image and keyboard interaction. Change `status` to `published` and rebuild to add it to the homepage. The empty state disappears automatically. Array order is gallery order; move records to reorder them. Publication dates are display metadata, not a scheduler. No catch-all placeholder route is installed, so unimplemented URLs remain 404s. Draft homepage metadata does not restrict direct access to a route; do not deploy confidential drafts.

Phase 1 is statically exported. Future client-side experiences work naturally. If an experience requires server features, remove `output: "export"` and `images.unoptimized` from `next.config.ts` and use Vercel's Next.js runtime instead of static hosting.

## Deploy to Vercel

Import this repository into Vercel, select the Next.js preset, and use `pnpm build`. Vercel supports this static export; the generated `out/` contains the website. No environment variables or paid services are required.

Once you own a production URL, set `NEXT_PUBLIC_SITE_URL=https://your-real-domain` and rebuild. This enables absolute Open Graph image URLs. When unset, image metadata is omitted; the prepared image remains in `public/branding/social.png`. Regenerate it with `node --import tsx scripts/generate-social.tsx`. No canonical URL or domain is fabricated when the variable is unset. Page-specific canonical URLs may be added after the final domain is selected.

This checkout is also configured for private Sites static hosting in `.openai/hosting.json`. The Site identity belongs to this deployment; remove that file before reusing the source as a different Site.

## Design and accessibility

Warm white, near-black and lime, a lowercase wordmark, and an original orbital u. The empty-state illustration is brand artwork, not a playable experience. Semantic landmarks, visible keyboard focus, a skip link, current-page navigation and reduced-motion support are included. All content is readable without client-side scripting. No external images or invented social links are used.
