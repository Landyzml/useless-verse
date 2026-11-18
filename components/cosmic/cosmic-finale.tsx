"use client";
import { useEffect, useRef, useState } from "react";
import { cosmicDestination } from "./use-cosmic-transformation";
export type CosmicPhase = "dark" | "collapsing" | "revealing" | "light" | "charging" | "expanding";
export function CosmicFinale({phase,onActivate}:{phase:CosmicPhase;onActivate:()=>void}) {
 const section=useRef<HTMLElement>(null);
 const [inView,setInView]=useState(false);
 const reborn=phase==="revealing"||phase==="light"||phase==="charging";
 const busy=cosmicDestination(phase)===null;
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting));
  if(section.current)observer.observe(section.current);
  return()=>observer.disconnect();
 },[]);
 return <section ref={section} className={`cosmic-finale ${inView?"is-in-view":""}`} aria-labelledby="finale-title" aria-busy={busy}>
  <div className="finale-copy"><h2 id="finale-title">{reborn?"Something from nothing.":"Every universe has an ending."}</h2><p>{reborn?"A quieter universe. Ready to begin again.":"Some endings are worth a little curiosity."}</p></div>
  <button className="singularity" type="button" onClick={onActivate} disabled={busy} aria-label={reborn?"Activate the white dwarf to recreate the dark universe":"Enter the black hole and transform this universe"} aria-describedby="finale-caption">
   <span className="gravity-center" data-gravity-center aria-hidden="true"/>
   <svg className="black-hole" viewBox="0 0 800 460" fill="none" aria-hidden="true">
    <defs>
     <linearGradient id="accretion-light" x1="105" y1="230" x2="700" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#82604a"/><stop offset=".23" stopColor="#d5a875"/><stop offset=".52" stopColor="#fff1cd"/><stop offset=".72" stopColor="#efd1a0"/><stop offset="1" stopColor="#977152"/></linearGradient>
     <radialGradient id="event-glow"><stop offset=".45" stopColor="#f0c38b" stopOpacity="0"/><stop offset=".65" stopColor="#d3a269" stopOpacity=".1"/><stop offset="1" stopColor="#d3a269" stopOpacity="0"/></radialGradient>
     <filter id="ring-soft" x="-25%" y="-70%" width="150%" height="240%"><feGaussianBlur stdDeviation="5"/></filter>
     <filter id="core-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2"/></filter>
    </defs>
    <ellipse cx="400" cy="230" rx="310" ry="190" fill="url(#event-glow)"/>
    <g transform="rotate(-12 400 230)">
     <ellipse cx="400" cy="230" rx="293" ry="73" stroke="url(#accretion-light)" strokeWidth="12" opacity=".35" filter="url(#ring-soft)"/>
     <ellipse cx="400" cy="230" rx="293" ry="73" stroke="url(#accretion-light)" strokeWidth="3.5"/>
     <ellipse cx="400" cy="230" rx="280" ry="66" stroke="url(#accretion-light)" strokeWidth="1" opacity=".5"/>
     <circle cx="400" cy="230" r="93" stroke="#e2bf8d" strokeWidth="5" opacity=".4" filter="url(#core-soft)"/>
     <circle cx="400" cy="230" r="91" fill="#03060b"/>
     <circle cx="400" cy="230" r="91" stroke="url(#accretion-light)" strokeWidth="1.8"/>
     <path d="M107 230C135 327 665 327 693 230" stroke="url(#accretion-light)" strokeWidth="8" opacity=".5" filter="url(#ring-soft)"/>
     <path d="M107 230C135 327 665 327 693 230" stroke="url(#accretion-light)" strokeWidth="4"/>
     <path d="M120 232C170 310 630 310 680 232" stroke="#fff0cd" strokeWidth="1" opacity=".55"/>
     <ellipse className="accretion-glint" cx="400" cy="230" rx="293" ry="73" stroke="#fff6e1" strokeWidth="1.3" strokeDasharray="70 1190" opacity=".55"/>
    </g>
   </svg>
   <span className="white-dwarf" aria-hidden="true"><span/></span>
  </button>
  <p id="finale-caption" className="finale-caption">{phase==="dark"?"Touch the event horizon":phase==="collapsing"?"Letting the universe go…":phase==="charging"?"A universe waiting to happen…":phase==="expanding"?"Let there be a universe…":phase==="revealing"?"A new beginning…":"Touch the white dwarf"}</p>
  <p className="finale-footnote">A little cosmic fiction.</p>
  <p className="finale-status" role="status" aria-live="polite">{phase==="light"?"The universe has transformed. The homepage is now in its light theme. Activate the white dwarf to recreate the same night sky.":phase==="dark"?"The dark universe is ready. Activate the black hole to begin the cycle.":""}</p>
  <noscript><p className="finale-noscript">Enable JavaScript to wake this little universe.</p></noscript>
 </section>;
}
