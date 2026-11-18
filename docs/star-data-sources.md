# Useless Verse celestial panorama

This is an artistic, fixed celestial atlas, not a live observer-location sky simulation.

## Catalogue, attribution, and reproducibility

The local subset derives from **HYG 4.1**, compiled by David Nash / Astronexus from Hipparcos, Yale Bright Star Catalogue and Gliese sources. [Version, field definitions and provenance](https://github.com/astronexus/HYG-Database/blob/main/hyg/README.md). The archived GitHub release is used deliberately as an immutable development source; newer HYG releases are maintained on Codeberg.

- Source: `hyg/CURRENT/hygdata_v41.csv`, Git blob `ba2dec4eb0f6768914c7fc1051258100214ddf84`.
- Source SHA256: `d9f69fd86bbf90a4e4d52b4c5c53eacfa6dfc0bfdef85bfd94f095e0bebe4ebd`.
- Epoch and equinox: **J2000.0**, RA in hours, declination in degrees.
- Subset: non-Sun catalogue entries with apparent V magnitude ≤ 3.5: **291 stars**.
- **24 featured stars** identified by HYG ID; metadata joins to the same coordinate records.
- Licence: [Creative Commons Attribution–ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The adapted subset and derived catalogue SVGs are distributed under the same licence. Changes: filtering, field selection, light-year conversion, rounded display values, finding-chart drawings, and the Capella correction below. This does not change licensing of unrelated application code.
- Regenerate: download the source CSV during development, then `python3 scripts/prepare-stars.py /path/to/hygdata_v41.csv`. No download occurs at build or browser runtime.

`data/star-provenance.json` records the source identity and counts. `data/stars.ts` contains the subset; `data/featured-stars.ts` holds editorial material without duplicating coordinates. Approximate distances use parsecs × 3.26156. HYG's ≥100000 pc missing-distance sentinel becomes null.

## Verification and limits

All 291 positions, IDs, magnitudes, and catalogue classifications originate in the source CSV, not randomly generated particles. Bayer designations and constellation names expand HYG's abbreviated fields. Descriptions explain catalogue properties, coordinate location, and spectral classes without inventing measurements or cultural lore. [UCL's stellar spectral classification guide](https://www.star.ucl.ac.uk/~pac/spectral_classification.html) explains luminosity classes and composite spectra.

HYG is a historical compiled catalogue, not a promise of the newest literature values. Variable stars have a representative magnitude rather than a light curve. Stellar system brightness may be unresolved. Spectral strings retain catalogue notation, such as `var`, `SB`, uncertainty colons, and composite classes. Distances are approximate, particularly for supergiants; they should not be interpreted as precision measurements of every component.

Corrections/qualifiers:

- **Capella**: HYG's `M1: comp` entry is replaced with `G8III + G0III` for the bright giant pair, following [Torres, Claret & Young (2009), ApJ 700, 1349](https://doi.org/10.1088/0004-637x/700/2/1349). This correction is used consistently for colour and card text. Classifications differ slightly across studies.
- **Betelgeuse**: the card explicitly labels the distance as uncertain, approximately 650 ly, following the [ESA/Hubble image record](https://esahubble.org/images/opo9604b/), rather than implying the historical HYG parallax gives a precise distance. Original HYG coordinates remain unchanged.
- **Deneb**: distance is labelled uncertain, with the HYG estimate identified explicitly; it is not presented as a settled modern distance.
- **Antares**: the composite spectrum describes a red supergiant and hot companion, not one star with two surface temperatures.

## Projection and movement

A globally consistent **90°-rotated equirectangular projection** maps declination left-to-right and right ascension top-to-bottom:

```
x = 32 + ((90 − dec) / 180) × (viewportWidth − 64)
y = (0.8 + (raHours / 24) × 5 − skyOffset) × viewportHeight
```

The 32 px side inset is applied to the whole projection to keep polar targets reachable. It does not move any star independently. The full virtual panorama is 5.8 viewport heights (five for the sky plus 0.8 leading space), regardless of document length. Equirectangular projection distorts angular scale near the poles; viewport aspect ratio changes its global scale. It is not a conformal map. Finding-chart illustrations use separate, documented local crops (below), not the page's rotated orientation.

A start is sampled once after mounting from a range that reserves the current document’s full physical height inside the panorama: `maximumStart = max(0, 5.8 − documentHeight / initialViewportHeight)`. The previous start is stored separately from the quote in sessionStorage. Sampling across eligible catalogue intervals excludes ±0.65 units around that start where practical. Desktop/tablet intervals expose a featured star in the opening view; mobile intervals expose one in the existing viewing area after the gallery. None of these sampling choices remove or relocate individual stars.

**Native 1:1 scrolling:** the canvas and featured buttons occupy one absolutely positioned layer inside the document-sized homepage. `project()` returns a local document position using the fixed start. The browser performs `screenY = worldY + rootDocumentTop − scrollY` for both sky and foreground. There is no scroll-progress multiplier, scrolling transform, interpolation, or scroll-dependent sky offset. The canvas is painted for the actual document height on initialization and layout/size changes, rather than redrawn on each scroll event. The long virtual catalogue is cropped to this document; the webpage is not lengthened to traverse it all. The initial range reserves enough sky to reach the normal document’s bottom without clamping the stars’ movement or introducing a repeated seam.

The projection’s reference viewport height is fixed for the visit. Mobile address-bar height changes therefore cannot rescale or reposition the stars during scrolling. Width changes rescale the full horizontal projection without choosing a new region. Reduced motion still uses native 1:1 document scrolling while disabling twinkling and decorative transitions. No optional parallax remains.

**Title fade only:** a smooth per-star opacity ramp runs from the title heading’s bottom to the intro section’s bottom. All stars at or below the gallery have full catalogue-derived opacity. There are no content bounding-box exclusions, paragraph masks, gallery masks, footer masks, or invisible readability panels. Actual foreground pixels and intentionally visible project/card surfaces cover the background naturally. Ordinary foreground text containers have transparent backgrounds and do not intercept star input; real links and buttons remain interactive.

Canvas and DOM targets share `project()` and the same local document offset. Closely overlapping featured hit targets are resolved in favour of the brighter star, leaving the other as a canvas point at its true coordinates. Open information cards anchor to the button’s actual viewport rectangle; only an open card needs a coalesced scroll update. It closes if its anchor leaves the visible viewport. Listeners, observers and animation frames clean up on unmount.

## Appearance and performance

Magnitude scales intensity nonlinearly: `10^(−0.16 × (magnitude + 1.46))`, clamped to 0.12–1, then mapped to restrained radius/opacity. This is an artistic compression of the magnitude range, not calibrated photometry. Smaller magnitude remains brighter. Approximate, desaturated colours follow O/B/A/F/G/K/M spectral classes; unknown classes are neutral. CSS glow is illustrative, not a measured stellar angular size. Atmospheric twinkle is a slow decorative effect on featured stars only, not variable-star photometry.

Canvas resolution caps device pixel ratio at 2. Painting covers the actual document, not the entire virtual panorama; it is coalesced after initialization or layout/resize. Scrolling does not repaint the sky or rerender its React controls. There is no continuous canvas animation loop. Featured stars use 48 px native buttons; faint stars are not focusable. Both rendering layers and all listeners/frames/observers clean up on unmount.

## Images and credits

1. **Betelgeuse observation**: locally bundled `public/stars/betelgeuse-observation.jpg`, from [The Atmosphere of Betelgeuse, ESA/Hubble, opo9604b](https://esahubble.org/images/opo9604b/). Full visible credit: **Andrea Dupree (Harvard-Smithsonian CfA), Ronald Gilliland (STScI), NASA and ESA**. [ESA/Hubble usage policy](https://esahubble.org/copyright/): CC BY 4.0 with full credit. Original image rescaled and fitted, no recolouring. It is a low-resolution ultraviolet observation, not an optical surface photograph.
2. **Other 23 cards**: original Useless Verse **catalogue illustrations**, not photographs, under CC BY-SA 4.0 with HYG attribution linked in each caption. Each locally bundled SVG marks the actual selected star at the centre and draws only real HYG neighbours with magnitude ≤6 in a local crop. North is up, east left, using `x = 320 − wrappedΔRAdegrees × cos(decCentre) × 16`, `y = 140 − Δdec × 16`. Scale 16 px/degree; pole distortion remains a limitation. Radius compresses magnitude. No stellar surface detail, binary components or nebulosity is fabricated. These consistent lightweight finding charts avoid substituting unrelated telescope pictures for individual stars.

No third-party hotlinked images, astronomy APIs, live location requests or massive catalogue downloads occur when visitors use the page.
