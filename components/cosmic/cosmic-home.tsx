"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { stars } from "@/data/stars";
import { featuredStars } from "@/data/featured-stars";
import { PANORAMA_HEIGHT, MAX_START, SCROLL_TRAVEL, cardPosition, chooseStart, chooseStartInWindows, project, skyOffset, starAppearance, type Star } from "@/lib/astronomy/sky";
import { publicAsset } from "@/lib/paths";
type Point = {star: Star; x: number; y: number};
const storageKey = "useless-verse:previous-sky-start";
export function CosmicHome({children}: {children: ReactNode}) {
 const canvas = useRef<HTMLCanvasElement>(null);
 const root = useRef<HTMLDivElement>(null);
 const card = useRef<HTMLElement>(null);
 const buttons = useRef(new Map<number, HTMLButtonElement>());
 const initialized = useRef(false);
 const suppressFocus = useRef(false);
 const start = useRef(0);
 const pinned = useRef<number | null>(null);
 const activeRef = useRef<number | null>(null);
 const hoveredCard = useRef(false);
 const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const points = useRef<Point[]>([]);
 const [visible, setVisible] = useState<Point[]>([]);
 const [active, setActive] = useState<number | null>(null);
 const [isPinned, setPinned] = useState(false);
 const [ready, setReady] = useState(false);
 const [position, setPosition] = useState({left:12,top:12});
 const close = useCallback(() => { hoveredCard.current=false;pinned.current=null; activeRef.current=null; setActive(null); setPinned(false); }, []);
 const closeAndFocus = useCallback((id:number) => {
  suppressFocus.current=true;close();buttons.current.get(id)?.focus();queueMicrotask(()=>{suppressFocus.current=false;});
 }, [close]);
 const open = (id:number, pin=false) => {
  if(closeTimer.current) clearTimeout(closeTimer.current);
  if(pinned.current!==null && !pin) return;
  if(pin) {pinned.current=id;setPinned(true);}
  activeRef.current=id;setActive(id);
 };
 const leave = () => {closeTimer.current=setTimeout(()=>{if(pinned.current===null&&!hoveredCard.current&&!card.current?.contains(document.activeElement)){activeRef.current=null;setActive(null);}},180);};
 useEffect(()=>{
  if(!initialized.current){
   initialized.current=true;
   window.scrollTo({top:0,behavior:"instant"});
   let previous:number|null=null;
   try {const value=sessionStorage.getItem(storageKey);if(value!==null && value.trim()!=="")previous=Number(value);}catch{}
   const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
   const maximum=reduced?PANORAMA_HEIGHT-1:MAX_START;
   const lookout=root.current?.querySelector(".sky-lookout")?.getBoundingClientRect();
   if(innerWidth<=599 && lookout){
    // Choose a catalogue crop whose featured star can be reached in the mobile viewing area.
    const scrollEnd=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    const lower=(lookout.top+scrollY+125-scrollEnd)/innerHeight;
    const upper=(lookout.bottom+scrollY-28-scrollEnd)/innerHeight;
    const windows=stars.filter(star=>star.id in featuredStars).map(star=>{
     const y=project(star,innerWidth,innerHeight,0).y/innerHeight-(reduced?0:SCROLL_TRAVEL);
     return [y-upper,y-lower] as [number,number];
    });
    start.current=chooseStartInWindows(previous,windows,Math.random,maximum);
   } else {
    // Keep at least one featured star discoverable in the first desktop/tablet view.
    const obstacles=Array.from(root.current?.querySelectorAll<HTMLElement>("[data-sky-obstacle], .site-header, .project-card, .gallery-heading, .sky-note, .sky-credit, .site-footer")??[]).map(el=>el.getBoundingClientRect());
    const windows=stars.filter(star=>star.id in featuredStars).flatMap(star=>{
     const point=project(star,innerWidth,innerHeight,0);
     let intervals:[number,number][]=[[Math.min(425,innerHeight-100),innerHeight-32]];
     for(const rect of obstacles){
      if(point.x<rect.left-24||point.x>rect.right+24)continue;
      intervals=intervals.flatMap(([a,b])=>[[a,Math.min(b,rect.top-26)],[Math.max(a,rect.bottom+26),b]] as [number,number][]).filter(([a,b])=>b>a);
     }
     return intervals.map(([a,b])=>[(point.y-b)/innerHeight,(point.y-a)/innerHeight] as [number,number]);
    });
    start.current=windows.length?chooseStartInWindows(previous,windows,Math.random,maximum):chooseStart(previous,Math.random,maximum);
   }
   try{sessionStorage.setItem(storageKey,String(start.current));}catch{}
  }
  const previousRestoration=history.scrollRestoration;
  history.scrollRestoration="manual";
  const motion=matchMedia("(prefers-reduced-motion: reduce)");
  let frame=0;
  let lastSignature="";
  const paint=()=>{
   frame=0;
   const element=canvas.current, container=root.current;
   if(!element||!container)return;
   const width=innerWidth,height=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
   if(element.width!==Math.round(width*dpr)||element.height!==Math.round(height*dpr)){
    element.width=Math.round(width*dpr);element.height=Math.round(height*dpr);
   }
   const ctx=element.getContext("2d");if(!ctx)return;
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
   const progress=scrollY / Math.max(1,document.documentElement.scrollHeight-height);
   const offset=skyOffset(start.current,progress,motion.matches);
   container.dataset.skyStart=String(start.current);container.dataset.skyOffset=String(offset);
   // Keep foreground words, navigation and artwork calm; crop, never move, stars behind them.
   const obstacles=Array.from(container.querySelectorAll<HTMLElement>("[data-sky-obstacle], .site-header, .project-card, .gallery-heading, .sky-note, .sky-credit, .site-footer"))
    .map(el=>el.getBoundingClientRect());
   const blocked=(x:number,y:number)=>obstacles.some(r=>x>r.left-22&&x<r.right+22&&y>r.top-22&&y<r.bottom+22);
   const next:Point[]=[];
   for(const star of stars){
    const {x,y}=project(star,width,height,offset);
    if(x<12||x>width-12||y<0||y>height)continue;
    const fade=Math.min(1,Math.max(0,(y+scrollY-300)/350));
    if(fade<=.03||blocked(x,y))continue;
    const feature=star.id in featuredStars;
    const a=starAppearance(star.magnitude,star.spectral);
    if(feature && fade>.35 && x>=24 && x<=width-24 && y>=24 && y<=height-24){
     // Resolve hit-area collisions by keeping the brighter target; coordinates remain unchanged.
     const collision=next.findIndex(p=>Math.hypot(p.x-x,p.y-y)<48);
     if(collision<0) next.push({star,x,y});
     else if(next[collision].star.magnitude>star.magnitude){
      const old=next[collision];const oldA=starAppearance(old.star.magnitude,old.star.spectral);
      ctx.fillStyle=oldA.color;ctx.globalAlpha=oldA.opacity*fade;ctx.beginPath();ctx.arc(old.x,old.y,oldA.radius,0,Math.PI*2);ctx.fill();
      next[collision]={star,x,y};
     } else {ctx.fillStyle=a.color;ctx.globalAlpha=a.opacity*fade;ctx.beginPath();ctx.arc(x,y,a.radius,0,Math.PI*2);ctx.fill();}
    }else{
     ctx.fillStyle=a.color;ctx.globalAlpha=a.opacity*fade;ctx.beginPath();ctx.arc(x,y,a.radius,0,Math.PI*2);ctx.fill();
    }
   }
   points.current=next;
   const signature=next.map(p=>p.star.id).join(",");
   if(signature!==lastSignature){lastSignature=signature;setVisible(next);}
   for(const p of next){const button=buttons.current.get(p.star.id);if(button){button.style.left=`${p.x}px`;button.style.top=`${p.y}px`;}}
   const selected=next.find(p=>p.star.id===activeRef.current);
   if(selected){
    const size=card.current?.getBoundingClientRect();
    const pos=cardPosition(selected.x,selected.y,width,height,size?.width??340,size?.height??520);
    setPosition(old=>old.left===pos.left&&old.top===pos.top?old:pos);
   }else if(activeRef.current!==null){
    // Dismiss when its anchor leaves the visible sky, rather than detach a pinned card.
    pinned.current=null;activeRef.current=null;setActive(null);setPinned(false);
   }
   setReady(true);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  const outside=(event:PointerEvent)=>{if(!(event.target as Element).closest(".star-card,.featured-star"))close();};
  const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){
   const id=activeRef.current;if(id!==null)closeAndFocus(id);
  }};
  const resizeObserver=new ResizeObserver(schedule);
  if(root.current)resizeObserver.observe(root.current);
  window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);motion.addEventListener("change",schedule);
  document.addEventListener("pointerdown",outside);document.addEventListener("keydown",escape);
  schedule();
  return()=>{history.scrollRestoration=previousRestoration;cancelAnimationFrame(frame);resizeObserver.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);motion.removeEventListener("change",schedule);document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",escape);if(closeTimer.current)clearTimeout(closeTimer.current);};
 },[close,closeAndFocus]);
 useEffect(()=>{
  if(active===null)return;
  const p=points.current.find(p=>p.star.id===active);if(!p)return;
  const rect=card.current?.getBoundingClientRect();
  const frame=requestAnimationFrame(()=>setPosition(cardPosition(p.x,p.y,innerWidth,innerHeight,rect?.width??340,rect?.height??520)));
  return ()=>cancelAnimationFrame(frame);
 },[active]);
 const selected=stars.find(star=>star.id===active);
 const detail=selected?featuredStars[selected.id]:null;
 return <div className="cosmic-home" ref={root}>
  <div className={`cosmic-sky ${ready?"is-ready":""}`} aria-label="Artistic celestial panorama">
   <canvas ref={canvas} aria-hidden="true"/>
   {visible.map(({star,x,y})=>{const a=starAppearance(star.magnitude,star.spectral);return <button key={star.id} type="button" className={`featured-star ${active===star.id?"is-active":""}`} ref={el=>{if(el)buttons.current.set(star.id,el);else buttons.current.delete(star.id);}} style={{left:x,top:y,"--star-color":a.color,"--star-delay":`${star.id%9}s`} as CSSProperties} aria-label={`Explore ${star.name}`} aria-expanded={active===star.id} aria-controls={active===star.id?"star-information":undefined} onPointerEnter={e=>{if(e.pointerType!=="touch")open(star.id);}} onPointerLeave={leave} onPointerUp={e=>{if(e.pointerType==="touch")open(star.id,true);}} onFocus={()=>{if(!suppressFocus.current)open(star.id);}} onBlur={leave} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(star.id,true);}}} onClick={()=>open(star.id,true)}><span className="star-halo"/><span className="star-core"/><span className="star-name">{star.name}</span></button>;})}
  </div>
  <div className="cosmic-foreground">{children}</div>
  {selected&&detail&&<aside id="star-information" className="star-card" ref={card} style={position} aria-label={`${selected.name} star information`} onPointerEnter={()=>{hoveredCard.current=true;if(closeTimer.current)clearTimeout(closeTimer.current);}} onPointerLeave={()=>{hoveredCard.current=false;leave();}} onFocus={()=>{if(closeTimer.current)clearTimeout(closeTimer.current);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))leave();}}>
   <header><div><h2>{selected.name}</h2><p>{detail.designation}</p></div><button type="button" aria-label="Close star information" onClick={()=>closeAndFocus(selected.id)}>×</button></header>
   <figure><Image src={publicAsset(detail.image??`/stars/${selected.id}.svg`)} alt={detail.image?detail.imageAlt??selected.name:`Catalogue illustration showing ${selected.name} and its real neighbouring stars`} width={640} height={280} unoptimized/><figcaption>{detail.image?"Observation · ":"Catalogue illustration · "}<a href={detail.imageSource??"https://github.com/astronexus/HYG-Database"} target="_blank" rel="noreferrer">{detail.credit??"Useless Verse / HYG · CC BY-SA 4.0"}</a></figcaption></figure>
   <dl><div><dt>Distance</dt><dd>{detail.distanceLabel??(selected.distance?`≈ ${selected.distance<100?selected.distance.toFixed(1):Math.round(selected.distance/10)*10} light-years`:"Uncertain")}</dd></div><div><dt>Constellation</dt><dd>{detail.constellation}</dd></div><div><dt>Spectral type</dt><dd>{selected.spectral||"Not listed"}</dd></div><div><dt>Apparent magnitude</dt><dd>{selected.magnitude.toFixed(2)}</dd></div></dl>
   <p className="star-description">{detail.description}</p>
   <p className="star-catalogue-note">Catalogue values; distances approximate. Spectra and brightness may describe unresolved systems.</p>
   <div className="star-card-bottom"><a href={detail.source} target="_blank" rel="noreferrer">Astronomical source ↗</a><span>{isPinned?"Pinned":"Click star to pin"}</span></div>
  </aside>}
 </div>;
}
