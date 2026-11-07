import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { OrbitMark } from "@/components/site-logo";
export default function NotFound() {
 return <SiteShell><main id="main" className="wrap not-found"><div className="lost-number" aria-label="404"><span>4</span><OrbitMark/><span>4</span></div><h1>This part of the universe<br/>doesn’t exist.</h1><p>Either you’re lost, or we haven’t invented this page yet.</p><Link className="button" href="/">Back to Useless Verse <span aria-hidden="true">↗</span></Link></main></SiteShell>;
}
