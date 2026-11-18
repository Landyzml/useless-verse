"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { stars } from "@/data/stars";
import { featuredStars } from "@/data/featured-stars";
import { cardPosition, chooseStartInWindows, maxStartForDocument, project, titleStarOpacity, starAppearance, type Star } from "@/lib/astronomy/sky";
import { publicAsset } from "@/lib/paths";
type Point = {star: Star; x: number; y: number; opacity: number};
const storageKey = "useless-verse:previous-sky-start";
export function CosmicHome({children}: {children: ReactNode}) {
 const canvas = useRef<HTMLCanvasElement>(null);
 const root = useRef<HTMLDivElement>(null);
 const card = useRef<HTMLElement>(null);
 const buttons = useRef(new Map<number, HTMLButtonElement>());
 const initialized = useRef(false);
 const suppressFocus = useRef(false);
 const start = useRef(0);
 const projectionHeight = useRef(0);
 const pinned = useRef<number | null>(null);
 const activeRef = useRef<number | null>(null);
 const hoveredCard = useRef(false);
 const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const [visible, setVisible] = useState<Point[]>([]);
 const [active, setActive] = useState<number | null>(null);
 const [isPinned, setPinned] = useState(false);
 const [ready, setReady] = useState(false);
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
 const updateCard = useCallback(()=>{
  const id=activeRef.current;if(id===null)return;
  const button=buttons.current.get(id),panel=card.current;if(!button||!panel)return;
  const anchor=button.getBoundingClientRect();
  const x=anchor.left+anchor.width/2,y=anchor.top+anchor.height/2;
  if(y<24||y>innerHeight-24){close();return;}
  const size=panel.getBoundingClientRect();
  const position=cardPosition(x,y,innerWidth,innerHeight,size.width,size.height);
  panel.style.left=`${position.left}px`;panel.style.top=`${position.top}px`;
 },[close]);
 useEffect(()=>{
  const container=root.current;if(!container)return;
  if(!initialized.current){
   initialized.current=true;
   window.scrollTo({top:0,behavior:"instant"});
   projectionHeight.current=innerHeight;
   let previous:number|null=null;
   try {const value=sessionStorage.getItem(storageKey);if(value!==null && value.trim()!=="")previous=Number(value);}catch{}
   const width=container.clientWidth,height=projectionHeight.current;
   const rootTop=container.getBoundingClientRect().top+scrollY;
   const maximum=maxStartForDocument(height,container.getBoundingClientRect().height);
   const title=container.querySelector(".intro")?.getBoundingClientRect();
   const titleEnd=(title?.bottom??height*.5)+scrollY-rootTop;
   const heading=container.querySelector("h1")?.getBoundingClientRect();
   const titleStart=Math.min(titleEnd,(heading?.bottom??titleEnd*.5)+scrollY-rootTop);
   const lookout=container.querySelector(".sky-lookout")?.getBoundingClientRect();
   const lower=innerWidth<=599&&lookout?lookout.top+scrollY-rootTop+125:titleStart+(titleEnd-titleStart)*.4;
   const upper=innerWidth<=599&&lookout?lookout.bottom+scrollY-rootTop-28:height-48;
   const windows=stars.filter(star=>star.id in featuredStars).map(star=>{
    const point=project(star,width,height,0);
    return [(point.y-upper)/height,(point.y-lower)/height] as [number,number];
   });
   start.current=chooseStartInWindows(previous,windows,Math.random,maximum);
   try{sessionStorage.setItem(storageKey,String(start.current));}catch{}
  }
  const previousRestoration=history.scrollRestoration;
  history.scrollRestoration="manual";
  let frame=0,cardFrame=0;
  const paint=()=>{
   frame=0;
   const element=canvas.current;if(!element)return;
   const width=container.clientWidth,height=projectionHeight.current;
   const documentHeight=container.getBoundingClientRect().height,dpr=Math.min(devicePixelRatio||1,2);
   element.style.width=`${width}px`;element.style.height=`${documentHeight}px`;
   if(element.width!==Math.round(width*dpr)||element.height!==Math.round(documentHeight*dpr)){
    element.width=Math.round(width*dpr);element.height=Math.round(documentHeight*dpr);
   }
   const ctx=element.getContext("2d");if(!ctx)return;
   ctx.setTransform(element.width/width,0,0,element.height/documentHeight,0,0);ctx.clearRect(0,0,width,documentHeight);
   container.dataset.skyStart=String(start.current);container.dataset.skyOffset=String(start.current);
   const rootTop=container.getBoundingClientRect().top;
   const title=container.querySelector(".intro")?.getBoundingClientRect();
   const titleEnd=(title?.bottom??height*.5)-rootTop;
   const heading=container.querySelector("h1")?.getBoundingClientRect();
   const titleStart=Math.min(titleEnd,(heading?.bottom??titleEnd*.5)-rootTop);
   const next:Point[]=[];
   for(const star of stars){
    // Local document coordinates: the browser scrolls the canvas and buttons together.
    const {x,y}=project(star,width,height,start.current);
    if(x<12||x>width-12||y<0||y>documentHeight)continue;
    const fade=titleStarOpacity(y,titleStart,titleEnd);
    if(fade<=.03)continue;
    const feature=star.id in featuredStars;
    const a=starAppearance(star.magnitude,star.spectral);
    if(feature&&fade>.35&&x>=24&&x<=width-24&&y>=24&&y<=documentHeight-48){
     // Overlapping native hit targets retain the brighter star at its true position.
     const collision=next.findIndex(p=>Math.hypot(p.x-x,p.y-y)<48);
     if(collision<0)next.push({star,x,y,opacity:fade});
     else if(next[collision].star.magnitude>star.magnitude){
      const old=next[collision],oldA=starAppearance(old.star.magnitude,old.star.spectral);
      ctx.fillStyle=oldA.color;ctx.globalAlpha=oldA.opacity*old.opacity;ctx.beginPath();ctx.arc(old.x,old.y,oldA.radius,0,Math.PI*2);ctx.fill();
      next[collision]={star,x,y,opacity:fade};
     }else{ctx.fillStyle=a.color;ctx.globalAlpha=a.opacity*fade;ctx.beginPath();ctx.arc(x,y,a.radius,0,Math.PI*2);ctx.fill();}
    }else{
     ctx.fillStyle=a.color;ctx.globalAlpha=a.opacity*fade;ctx.beginPath();ctx.arc(x,y,a.radius,0,Math.PI*2);ctx.fill();
    }
   }
   setVisible(next);
   for(const p of next){const button=buttons.current.get(p.star.id);if(button){button.style.left=`${p.x}px`;button.style.top=`${p.y}px`;button.style.opacity=String(p.opacity);}}
   if(activeRef.current!==null&&!next.some(p=>p.star.id===activeRef.current))close();
   else updateCard();
   setReady(true);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  // Scrolling does not repaint or reposition the sky; only an open viewport card needs updating.
  const onScroll=()=>{if(activeRef.current!==null&&!cardFrame)cardFrame=requestAnimationFrame(()=>{cardFrame=0;updateCard();});};
  const outside=(event:PointerEvent)=>{if(!(event.target as Element).closest(".star-card,.featured-star"))close();};
  const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){
   const id=activeRef.current;if(id!==null)closeAndFocus(id);
  }};
  const resizeObserver=new ResizeObserver(schedule);
  resizeObserver.observe(container);
  const title=container.querySelector(".intro");if(title)resizeObserver.observe(title);
  window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",schedule);
  document.addEventListener("pointerdown",outside);document.addEventListener("keydown",escape);
  schedule();
  return()=>{history.scrollRestoration=previousRestoration;cancelAnimationFrame(frame);cancelAnimationFrame(cardFrame);resizeObserver.disconnect();window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",schedule);document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",escape);if(closeTimer.current)clearTimeout(closeTimer.current);};
 },[close,closeAndFocus,updateCard]);
 useEffect(()=>{
  if(active===null)return;
  const frame=requestAnimationFrame(updateCard);
  return()=>cancelAnimationFrame(frame);
 },[active,updateCard]);
 const selected=stars.find(star=>star.id===active);
 const detail=selected?featuredStars[selected.id]:null;
 return <div className="cosmic-home" ref={root}>
  <div className={`cosmic-sky ${ready?"is-ready":""}`} aria-label="Artistic celestial panorama">
   <canvas ref={canvas} aria-hidden="true"/>
   {visible.map(({star,x,y,opacity})=>{const a=starAppearance(star.magnitude,star.spectral);return <button key={star.id} type="button" className={`featured-star ${active===star.id?"is-active":""}`} ref={el=>{if(el)buttons.current.set(star.id,el);else buttons.current.delete(star.id);}} style={{left:x,top:y,opacity,"--star-color":a.color,"--star-delay":`${star.id%9}s`} as CSSProperties} aria-label={`Explore ${star.name}`} aria-expanded={active===star.id} aria-controls={active===star.id?"star-information":undefined} onPointerEnter={e=>{if(e.pointerType!=="touch")open(star.id);}} onPointerLeave={leave} onPointerUp={e=>{if(e.pointerType==="touch")open(star.id,true);}} onFocus={()=>{if(!suppressFocus.current)open(star.id);}} onBlur={leave} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(star.id,true);}}} onClick={()=>open(star.id,true)}><span className="star-halo"/><span className="star-core"/><span className="star-name">{star.name}</span></button>;})}
  </div>
  <div className="cosmic-foreground">{children}</div>
  {selected&&detail&&<aside id="star-information" className="star-card" ref={card} style={{left:12,top:12}} aria-label={`${selected.name} star information`} onPointerEnter={()=>{hoveredCard.current=true;if(closeTimer.current)clearTimeout(closeTimer.current);}} onPointerLeave={()=>{hoveredCard.current=false;leave();}} onFocus={()=>{if(closeTimer.current)clearTimeout(closeTimer.current);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))leave();}}>
   <header><div><h2>{selected.name}</h2><p>{detail.designation}</p></div><button type="button" aria-label="Close star information" onClick={()=>closeAndFocus(selected.id)}>×</button></header>
   <figure><Image src={publicAsset(detail.image??`/stars/${selected.id}.svg`)} alt={detail.image?detail.imageAlt??selected.name:`Catalogue illustration showing ${selected.name} and its real neighbouring stars`} width={640} height={280} unoptimized/><figcaption>{detail.image?"Observation · ":"Catalogue illustration · "}<a href={detail.imageSource??"https://github.com/astronexus/HYG-Database"} target="_blank" rel="noreferrer">{detail.credit??"Useless Verse / HYG · CC BY-SA 4.0"}</a></figcaption></figure>
   <dl><div><dt>Distance</dt><dd>{detail.distanceLabel??(selected.distance?`≈ ${selected.distance<100?selected.distance.toFixed(1):Math.round(selected.distance/10)*10} light-years`:"Uncertain")}</dd></div><div><dt>Constellation</dt><dd>{detail.constellation}</dd></div><div><dt>Spectral type</dt><dd>{selected.spectral||"Not listed"}</dd></div><div><dt>Apparent magnitude</dt><dd>{selected.magnitude.toFixed(2)}</dd></div></dl>
   <p className="star-description">{detail.description}</p>
   <p className="star-catalogue-note">Catalogue values; distances approximate. Spectra and brightness may describe unresolved systems.</p>
   <div className="star-card-bottom"><a href={detail.source} target="_blank" rel="noreferrer">Astronomical source ↗</a><span>{isPinned?"Pinned":"Click star to pin"}</span></div>
  </aside>}
 </div>;
}
