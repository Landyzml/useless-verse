import Link from "next/link";
import { SiteLogo } from "./site-logo";
export function SiteHeader({ current }: { current?: "home" | "about" }) {
 return <header className="site-header wrap"><Link href="/" aria-label="Useless Verse home" className="logo-link"><SiteLogo/></Link><nav aria-label="Main navigation"><Link href="/" aria-current={current === "home" ? "page" : undefined}>Home</Link><Link href="/about/" aria-current={current === "about" ? "page" : undefined}>About</Link></nav></header>;
}
