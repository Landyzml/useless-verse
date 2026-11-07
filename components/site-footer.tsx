import Link from "next/link";
export function SiteFooter() {
 return <footer className="site-footer wrap"><p>A small corner of a very big internet.</p><Link href="/about/">Made for the curiosity of it <span aria-hidden="true">↗</span></Link></footer>;
}
