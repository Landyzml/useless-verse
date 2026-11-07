import type { Token, Change, Style, Address } from "./types";
import { lower, replace } from "./tokenizer";
import { present } from "./verbs";
export function vocabulary(tokens:Token[],style:Style,address:Address,changes:Change[]) {
 const words=tokens.filter(t=>t.kind!=="space"&&t.text!=="");
 for(let n=0;n<words.length;n++){
  const t=words[n];if(t.kind!=="word")continue;const w=lower(t),prev=lower(words[n-1]),next=lower(words[n+1]);
  // Interior capitals may be names (Fair, Rose, May): do not rewrite them.
  const initial=n===0||/^[.!?;“"(]$/.test(prev);
  if(!initial&&/^\p{Lu}/u.test(t.original))continue;
  const simple:Record<string,string>={perhaps:"perchance",indeed:"verily"};
  let value=simple[w];
  if(w==="yes"&&initial)value="aye";
  if(w==="why"&&initial&&words.slice(n).some(x=>x.text==="?"))value="wherefore";
  if(w==="please"&&(initial||prev===",")&&present.has(next))value=style==="dramatic"?(address==="formal"?"I pray you,":"I pray thee,"):"prithee,";
  if(w==="here"&&/^(come|comest|came|camest|coming)$/.test(prev))value="hither";
  if(w==="there"&&/^(go|goest|went|wentest|going)$/.test(prev))value="thither";
  if(w==="soon"&&/\b(will|wilt|shall|shalt)\b/.test(words.slice(Math.max(0,n-4),n).map(lower).join(" ")))value="anon";
  if(style==="dramatic"&&/^(am|is|art|are|was|wast|wert|were|so|very)$/.test(prev)){
   if(w==="beautiful")value="fair";if(w==="angry")value="wroth";
  }
  if(value)replace(t,value,"Context-gated "+(style==="dramatic"?"dramatic diction":"Early Modern vocabulary")+"; this is stylistic prose, not a Shakespeare quotation.",changes);
 }
}
