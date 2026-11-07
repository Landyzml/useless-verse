import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
export function SiteShell({ children, current }: { children: React.ReactNode; current?: "home" | "about" }) {
 return <div className="site-shell"><a className="skip-link" href="#main">Skip to content</a><SiteHeader current={current}/>{children}<SiteFooter/></div>;
}
