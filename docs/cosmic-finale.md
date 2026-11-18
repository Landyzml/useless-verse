# The impossible ending

The homepage ends with an original SVG black hole and warm accretion ring. It is a fictional interaction, separate from the HYG catalogue and its real star exhibits. A black-hole-to-white-dwarf transformation is an artistic story, not a claimed astrophysical process. No reference image was included in the attached brief; the supplied silhouette description guided the drawing.

`CosmicFinale` owns the accessible object and section copy; `useCosmicTransformation` owns a single-use `dark → collapsing → expanding → light` sequence. The phase ref locks synchronously before React commits, so repeated clicks cannot stack animations. There is no saved theme or reset control: fresh homepage initialization restores the night sky.

During the approximately 1.05-second collapse, the renderer reuses the current catalogue point snapshot and curves those points into the clicked object. The normal document positions and catalogue data remain untouched. The charcoal atmosphere contracts toward the same origin while content stays readable and stationary. Only this short event uses a canvas animation loop; normal scrolling remains native 1:1 without redraws.

The next approximately 1.25 seconds use a same-document View Transition with an expanding circular reveal from the object's viewport centre. Its old/new snapshots each contain the matching background and foreground palette, preserving text contrast at the advancing edge. The SVG black hole compresses before the reveal, and a small blue-white dwarf fades into its place. The project artwork is never inverted or recoloured. The final homepage has near-black text on a soft white ground, with no remaining interactive catalogue-star targets or background stars.

Reduced motion replaces travel and expansion with a gentle star fade and an approximately 650ms snapshot crossfade. Browsers without View Transitions receive a controlled fade, an outward SVG ring (unless reduced motion is requested), and the same final light state. No heavy animation or rendering dependency is added.

Timers are avoided: one requestAnimationFrame loop measures elapsed time. It is cancelled on unmount, as are Web Animations; an active View Transition is skipped during navigation. Finished events cannot update an unmounted page. Idle ring animation pauses off screen and after activation. View-transition overlays are pointer-transparent; project links and navigation remain usable.

The additional section extends the current document-sized canvas while keeping the existing 580vh virtual catalogue projection and single random starting crop. The original charcoal-to-navy gradient retains the foreground's previous height, then continues with the same deep-space colour into the finale. Featured-star eligibility includes the finale's copy and object, so nearby stars remain faint catalogue points rather than competing halos. No new readability masks are used during normal browsing.

Implementation: `components/cosmic/cosmic-finale.tsx`, `use-cosmic-transformation.ts`, the existing `cosmic-home.tsx`, and scoped `cosmic.css`. The View Transitions approach follows [Chrome's same-document documentation](https://developer.chrome.com/docs/web-platform/view-transitions/same-document).
