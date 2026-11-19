# Project covers

Every registered project must supply a designed **dark** and **light** cover. Keep drafts hidden until both artwork and the experience are ready.

- Use **720 × 540 (4:3)** artwork. Keep important motifs and titles inside a 48 px inset; check at 320 px wide. The card reserves this ratio, so neither variant may change its layout.
- Store each pair in `public/covers/<slug>/dark.svg` and `light.svg`, or equivalent optimized WebP/AVIF files. Use self-contained assets without scripts, remote images, or external fonts.
- Dark: use deep grounds, readable light ink, and restrained luminous accents. Light: use an airy ground, crisp darker ink, and deliberate material/contrast changes. Do not invert the dark artwork or place it unchanged on a light rectangle.
- Give each module its own motif. Keep that motif, title, framing, and identity recognizable across the pair while adapting the scene and composition to its theme.
- Avoid small text and crowded details. The card title outside the artwork remains the accessible name; the two cover images are decorative, with empty alt text. Never put essential instructions only in the image.

Register both paths in `lib/projects.ts`:

```ts
{
  id: "your-slug", slug: "your-slug", title: "Your project",
  covers: {
    dark: "/covers/your-slug/dark.svg",
    light: "/covers/your-slug/light.svg",
  },
  status: "draft",
}
```

`Project.covers: ProjectCoverSet` requires both keys. `ProjectCard` delegates to `ProjectCover`, the reusable renderer for every listing. It layers both images inside one fixed slot, preserving hover zoom, links, and keyboard focus. Both assets load when the slot approaches the viewport, avoiding a second theme-dependent request.

The default is dark. The existing cosmic light selector sets the inherited CSS variable `--project-cover-light: 1` during `revealing`, `light`, and `charging`; `expanding` and `dark` use the dark cover. The root View Transition reveals the new artwork with the whole page. There is no separate delayed crossfade, theme store, or color inversion. For a light listing outside the homepage, set the same variable to `1` on its wrapper; use `0` for a dark listing. Reuse `ProjectCover` rather than reimplementing selection.

`resolveProjectCovers` uses the available path for both themes if incomplete development data bypasses TypeScript. If neither path exists, it leaves a stable empty slot rather than emitting a broken URL. This does not handle an incorrect URL: production export checks verify local asset paths, and published modules must always provide both real files.

Before publishing, inspect both themes on desktop, tablet, and mobile; activate both cosmic transformations, confirm identical card bounds and no broken images, and test the card link. Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, the production build, and `scripts/verify-export.mjs` with the Pages base path.
