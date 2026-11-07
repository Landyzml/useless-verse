"use client";
import { useEffect, useRef, useState } from "react";
import { homepageQuotes, randomQuoteIndex } from "@/lib/homepage-quotes";
const key="useless-verse:previous-homepage-quote";
export function HomepageQuote(){
 const [quote,setQuote]=useState<string|null>(null);
 const initialized=useRef(false);
 useEffect(()=>{
  if(initialized.current)return;
  initialized.current=true;
  let previous:number|null=null;
  try { const saved=sessionStorage.getItem(key); if(saved!==null&&/^\d+$/.test(saved))previous=Number(saved); } catch {}
  const index=randomQuoteIndex(homepageQuotes.length,previous);
  try {sessionStorage.setItem(key,String(index));}catch {}
  // Selection happens only after mount; the server and initial client markup agree.
  setQuote(homepageQuotes[index]);
 },[]);
 return <p className="intro-copy homepage-quote"><span style={quote===null?{visibility:"hidden"}:undefined}>{quote??homepageQuotes[0]}</span><noscript><span className="quote-fallback">{homepageQuotes[0]}</span></noscript></p>;
}
