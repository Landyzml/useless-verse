import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { OrbitMark } from "@/components/site-logo";
export const metadata: Metadata = { title: "About", description: "Strange ideas, interactive experiments, and things that probably don’t need to exist. That’s the idea." };
export default function About() {
 return <SiteShell current="about"><main id="main" className="wrap about"><h1>About this<br/>little universe.</h1><div className="about-body"><div className="about-art" aria-hidden="true"><OrbitMark/></div><div className="about-copy"><h2>Room for the pointless.</h2><p>Useless Verse is a collection of strange ideas, interactive experiments, and things that probably don’t need to exist.</p><p>Some might be funny. Some might be interesting. Some might make absolutely no sense.</p><p>That’s the idea.</p><p>This universe is still taking shape. Its first experiment is yet to arrive.</p><Link className="text-link" href="/">Back to Useless Verse <span aria-hidden="true">↗</span></Link></div></div></main></SiteShell>;
}
