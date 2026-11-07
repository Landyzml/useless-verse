export function OrbitMark({ className = "" }: { className?: string }) {
  return <svg className={className} width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="currentColor"/><path d="M18 18v8a6 6 0 0 0 12 0v-8" stroke="var(--paper)" strokeWidth="3.5"/><ellipse cx="24" cy="24" rx="24" ry="8" transform="rotate(-28 24 24)" stroke="currentColor" strokeWidth="2"/></svg>;
}
export function SiteLogo() {
 return <span className="site-logo"><OrbitMark/><span>useless verse<span className="logo-period">.</span></span></span>;
}
