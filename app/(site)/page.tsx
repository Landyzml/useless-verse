import "@/components/cosmic/cosmic.css";
import { HomepageQuote } from "@/components/homepage-quote";
import { SiteShell } from "@/components/site-shell";
import { ProjectGrid } from "@/components/project-grid";
import { CosmicHome } from "@/components/cosmic/cosmic-home";
import { getPublishedProjects } from "@/lib/projects";
export default function Home() {
 return <CosmicHome><SiteShell current="home"><main id="main" className="wrap"><section className="intro" aria-labelledby="welcome"><h1 id="welcome" data-sky-obstacle>useless verse.</h1><div className="intro-bottom"><p className="tagline" data-sky-obstacle>A universe of beautifully<br className="desktop-break"/> useless things.</p><div data-sky-obstacle><HomepageQuote/></div></div></section><section className="gallery" aria-labelledby="experiments"><div className="gallery-heading"><h2 id="experiments">The experiments</h2><span>Little diversions. Endless curiosity.</span></div><ProjectGrid projects={getPublishedProjects()}/><aside className="sky-lookout" aria-label="A quiet place to explore the stars"><p className="sky-note">Some things are worth looking closer at.<br/><span>Hover or tap a bright star to explore.</span></p></aside></section></main><div className="sky-credit wrap"><span>A fixed sky. A fresh perspective.</span><small>J2000 celestial panorama · <a href="https://github.com/astronexus/HYG-Database" target="_blank" rel="noreferrer">HYG 4.1 / David Nash</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a><br/>Artistic projection, not your live local sky.</small></div></SiteShell></CosmicHome>;
}
