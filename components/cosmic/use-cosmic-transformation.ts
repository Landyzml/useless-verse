"use client";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import type { CosmicPhase } from "./cosmic-finale";
export interface SkyPoint {x:number;y:number;radius:number;color:string;opacity:number}
/** A fictional event only; resting astronomical coordinates are never modified. */
export function fallingPoint(point:SkyPoint,target:{x:number;y:number},progress:number) {
 const t=Math.min(1,Math.max(0,progress)),pull=t**2.4,turn=Math.sin(t*Math.PI)*.2;
 const dx=point.x-target.x,dy=point.y-target.y;
 return {x:target.x+(dx*Math.cos(turn)-dy*Math.sin(turn))*(1-pull),y:target.y+(dx*Math.sin(turn)+dy*Math.cos(turn))*(1-pull)};
}
export function cosmicDestination(phase:CosmicPhase):"dark"|"light"|null {
 return phase==="dark"?"light":phase==="light"?"dark":null;
}
export function useCosmicTransformation(root:RefObject<HTMLDivElement|null>,canvas:RefObject<HTMLCanvasElement|null>,points:RefObject<SkyPoint[]>,onStart:()=>void,onRestore:()=>void) {
 const [phase,setPhase]=useState<CosmicPhase>("dark");
 const phaseRef=useRef<CosmicPhase>("dark");
 const alive=useRef(true),frame=useRef(0),transition=useRef<ViewTransition|null>(null),animations=useRef<Animation[]>([]);
 useEffect(()=>{alive.current=true;const running=animations.current;return()=>{alive.current=false;cancelAnimationFrame(frame.current);transition.current?.skipTransition();running.forEach(a=>a.cancel());delete document.documentElement.dataset.cosmicTransition;};},[]);
 const activate=useCallback(()=>{
  const container=root.current,element=canvas.current,destination=cosmicDestination(phaseRef.current);if(!container||!element||!destination)return;
  const restoring=destination==="dark";
  const returnFocus=document.activeElement===container.querySelector(".singularity");
  const anchor=container.querySelector<HTMLElement>("[data-gravity-center]")?.getBoundingClientRect();if(!anchor)return;
  const bounds=container.getBoundingClientRect();
  const target={x:anchor.left+anchor.width/2-bounds.left,y:anchor.top+anchor.height/2-bounds.top};
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  phaseRef.current=restoring?"charging":"collapsing";onStart();setPhase(phaseRef.current);
  container.style.setProperty("--gravity-x",`${target.x}px`);container.style.setProperty("--gravity-y",`${target.y}px`);
  const begin=performance.now(),duration=restoring?(reduced?250:450):(reduced?450:1050);
  const ctx=element.getContext("2d");
  const finish=()=>{
   if(!alive.current)return;
   animations.current.splice(0).forEach(a=>a.cancel());transition.current=null;
   phaseRef.current=destination;flushSync(()=>setPhase(destination));
   if(returnFocus)container.querySelector<HTMLButtonElement>(".singularity")?.focus({preventScroll:true});
   delete container.dataset.finaleFallback;delete container.dataset.cosmicWave;delete document.documentElement.dataset.cosmicTransition;
  };
  const playWave=(radius:number,duration:number,easing:string)=>{
   const circle=container.querySelector<SVGCircleElement>(".cosmic-shockwave circle");if(!circle||reduced)return;
   const current=container.querySelector<HTMLElement>("[data-gravity-center]")!.getBoundingClientRect();
   circle.setAttribute("cx",String(current.left+current.width/2));circle.setAttribute("cy",String(current.top+current.height/2));
   const wave=circle.animate([{r:"0px",opacity:.9},{r:`${radius}px`,opacity:.15}],{duration,easing});animations.current.push(wave);
  };
  const expand=async()=>{
   if(!alive.current)return;
   phaseRef.current=restoring?"expanding":"revealing";
   const update=()=>{
    if(!alive.current)return;
    flushSync(()=>setPhase(phaseRef.current));
    if(restoring){container.dataset.cosmicWave="true";onRestore();}
   };
   const fallback=async()=>{
    container.dataset.finaleFallback="true";update();
    const a=container.animate([{opacity:.65},{opacity:1}],{duration:reduced?650:850,easing:"ease-out"});animations.current.push(a);
    playWave(Math.hypot(innerWidth,innerHeight),850,"ease-out");
    await a.finished.catch(()=>{});finish();
   };
   if(!document.startViewTransition){await fallback();return;}
   document.documentElement.dataset.cosmicTransition="true";
   const view=document.startViewTransition(update);transition.current=view;
   try{
    await view.ready;if(!alive.current)return;
    const current=container.querySelector<HTMLElement>("[data-gravity-center]")!.getBoundingClientRect();
    const x=current.left+current.width/2,y=current.top+current.height/2;
    const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+40;
    const a=document.documentElement.animate(reduced?[{opacity:0},{opacity:1}]:[{clipPath:`circle(0px at ${x}px ${y}px)`},{clipPath:`circle(${radius}px at ${x}px ${y}px)`}],{duration:reduced?650:1250,easing:"cubic-bezier(.22,.65,.25,1)",fill:"both",pseudoElement:"::view-transition-new(root)"});
    animations.current.push(a);if(restoring)playWave(radius,1250,"cubic-bezier(.22,.65,.25,1)");await a.finished.catch(()=>{});await view.finished.catch(()=>{});finish();
   }catch{if(alive.current){view.skipTransition();await fallback();}}
  };
  const collapse=(now:number)=>{
   if(!alive.current)return;
   const t=Math.min(1,(now-begin)/duration);
   if(ctx){
    ctx.clearRect(0,0,bounds.width,bounds.height);
    for(const point of points.current){
     const p=reduced?point:fallingPoint(point,target,t),tail=reduced?p:fallingPoint(point,target,Math.max(0,t-.035));
     ctx.fillStyle=point.color;ctx.strokeStyle=point.color;ctx.globalAlpha=point.opacity*(1-t)*.55;ctx.lineWidth=Math.max(.5,point.radius*.55);
     if(!reduced){ctx.beginPath();ctx.moveTo(tail.x,tail.y);ctx.lineTo(p.x,p.y);ctx.stroke();}
     ctx.globalAlpha=point.opacity*(1-t*.8);ctx.beginPath();ctx.arc(p.x,p.y,point.radius*(1-t*.6),0,Math.PI*2);ctx.fill();
    }
   }
   if(t<1)frame.current=requestAnimationFrame(collapse);else{ctx?.clearRect(0,0,bounds.width,bounds.height);void expand();}
  };
  if(restoring){
   const charge=(now:number)=>{
    if(!alive.current)return;
    if(now-begin<duration)frame.current=requestAnimationFrame(charge);else void expand();
   };
   frame.current=requestAnimationFrame(charge);
  }else frame.current=requestAnimationFrame(collapse);
 },[root,canvas,points,onStart,onRestore]);
 return {phase,phaseRef,activate};
}
