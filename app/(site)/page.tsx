import { SiteShell } from "@/components/site-shell";
import { ProjectGrid } from "@/components/project-grid";
import { getPublishedProjects } from "@/lib/projects";
export default function Home() {
 return <SiteShell current="home"><main id="main" className="wrap"><section className="intro" aria-labelledby="welcome"><h1 id="welcome">useless verse.</h1><div className="intro-bottom"><p className="tagline">A universe of beautifully<br className="desktop-break"/> useless things.</p><p className="intro-copy">A little corner of the internet for strange ideas,<br className="desktop-break"/> interactive experiments, and things that<br className="desktop-break"/> probably don’t need to exist.</p></div></section><section className="gallery" aria-labelledby="experiments"><h2 id="experiments">The experiments</h2><ProjectGrid projects={getPublishedProjects()}/></section></main></SiteShell>;
}
