import { HomepageQuote } from "@/components/homepage-quote";
import { SiteShell } from "@/components/site-shell";
import { ProjectGrid } from "@/components/project-grid";
import { getPublishedProjects } from "@/lib/projects";
export default function Home() {
 return <SiteShell current="home"><main id="main" className="wrap"><section className="intro" aria-labelledby="welcome"><h1 id="welcome">useless verse.</h1><div className="intro-bottom"><p className="tagline">A universe of beautifully<br className="desktop-break"/> useless things.</p><HomepageQuote/></div></section><section className="gallery" aria-labelledby="experiments"><h2 id="experiments">The experiments</h2><ProjectGrid projects={getPublishedProjects()}/></section></main></SiteShell>;
}
