# useless verse.

**Live website: [useless verse.](https://landyzml.github.io/useless-verse/)**

A universe of beautifully useless things. Phase 1 builds the home for future original web experiments. The first published experience is The Bard’s Tongue, a local Shakespearean-style translator. There are no fictional projects, accounts, databases, or external API requirements.

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
- `lib/projects.ts`: single ordered, typed project registry. The first translator experience is published.
- `lib/site.ts`: editable site copy and optional real origin.
- `public/branding/`: original reusable brand asset.
- `public/thumbnails/`: real project thumbnails, including the translator’s original quill artwork.
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

## The Bard’s Tongue

`app/(experiences)/shakespeare-translator/` provides an independent parchment/burgundy interface. `lib/shakespeare/` contains pure, staged tokenization, contraction expansion, bounded grammatical analysis, pronoun/finite-verb agreement, vocabulary/style transforms and reconstruction. No parser service, API, storage or added dependency is required. `docs/shakespearean-language-guide.md` explains historical sources, practical rules, examples and limitations. `tests/shakespeare.test.tsx` tests grammatical targets and regression cases beyond the clickable prompts. All input remains in the browser. Run `pnpm test`, `pnpm lint`, `pnpm typecheck` and `pnpm build` after changes.

### Advanced syntax engine

The Syntax Intensity selector is independent of Classic/Dramatic diction: Subtle preserves the original ordering policy, Shakespearean selects measured licensed movement, and Theatrical permits stronger candidates. `lib/shakespeare/analyzer.ts`, `syntax-types.ts`, `syntax-rules.ts`, `planner.ts` and `validation.ts` implement bounded clause/phrase analysis, candidate generation, deterministic selection and conservation checks. `docs/shakespearean-syntax-rules.md` catalogs 50 researched constructions and their implemented/disabled status. Tests include legacy Subtle regressions, structural positives, semantic guard cases, planner invariants and a held-out evaluation. Unknown words, passive structures, relative attachment and protected technical spans often retain their original order. No new dependency, external parser service or paid API was added.

## GitHub Pages and automatic publishing

Source repository: https://github.com/Landyzml/useless-verse

The app is a static Next.js export: it has no Server Actions, request-time APIs, middleware/proxy, database or server-dependent image optimization. The translator runs entirely in the visitor’s browser. A Node server is required only during development/build, not on GitHub Pages.

`.github/workflows/deploy.yml` runs on every push to `main` and supports **Actions → Deploy Useless Verse to GitHub Pages → Run workflow**. It installs the exact pnpm lockfile on Node 24, runs type checking/lint/tests, builds `out/`, verifies local asset/link references, uploads only the static artifact, and deploys to the `github-pages` environment. Only the deployment job receives `pages: write` and `id-token: write`; no custom token or repository secret is required for normal deployments. Workflow failures are visible in the Actions tab, and a failed check blocks publication.

`actions/configure-pages` supplies the real `base_path` and `base_url`. The build passes them as `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL`. Next.js `basePath` prefixes Link navigation and framework assets; `lib/paths.ts` prefixes public thumbnails. The metadata URL includes the repository subpath. Leave the base path empty for root hosting. Configure a future custom domain in **Settings → Pages**, then rerun the workflow so the generated path and metadata match that domain.

To enable Pages manually if necessary:

1. Open https://github.com/Landyzml/useless-verse/settings/pages.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open the repository’s **Actions** tab and run or rerun the deployment workflow.
4. Use the deployment job’s returned Pages URL to verify the published website.

### Verify project-path hosting locally

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
NEXT_PUBLIC_BASE_PATH=/useless-verse NEXT_PUBLIC_SITE_URL=https://landyzml.github.io/useless-verse pnpm build
NEXT_PUBLIC_BASE_PATH=/useless-verse node scripts/verify-export.mjs
NEXT_PUBLIC_BASE_PATH=/useless-verse pnpm start
```

Open http://127.0.0.1:3000/useless-verse/. Direct access and refresh also work at `/useless-verse/about/` and `/useless-verse/shakespeare-translator/`. The preview server mounts only the configured path, so accidental root asset links fail visibly. The root `404.html` is exported for GitHub Pages to serve with HTTP 404; project route directories contain their own `index.html`. `.nojekyll` preserves Next’s underscore asset directories when applicable.

### Publish future updates

Develop normally, add a real project route/thumbnail/registry entry, and run the checks above. Commit and push to `main`:

```sh
git add <changed-files>
git commit -m "Describe the change"
git push origin main
```

GitHub Actions builds and publishes automatically. No manual `out/` uploads are needed. Never commit `.env` files, keys, credentials, `node_modules`, `.next` or `out`; `.gitignore` excludes these. `.env.example` contains public configuration placeholders only. The retained `.openai/hosting.json` identifies the older private Sites deployment and is not a credential; it is unused by GitHub Actions and does not change the public Pages deployment.
