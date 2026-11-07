import type { Token, Change, SyntaxIntensity } from "./types";
import type { Candidate } from "./syntax-types";
import { analyze, source, words, pronoun, participle, lemma, aux } from "./analyzer";
import { syntaxRules } from "./syntax-rules";
import { validCandidate } from "./validation";
const rank={subtle:0,shakespearean:1,theatrical:2};
const literal=(text:string):Token=>({text,original:text,kind:"word"});
export const implementedSyntaxIds=[...syntaxRules.map(r=>r.id),"S10","S11","S12","S13","S14","S15","S16","S17","S20"];
export function renderUnits(u:Token[],capitalize=true):string {
 const parts=u.map(t=>t.text);
 // A displaced original sentence-initial function word loses its initial capital; proper names keep it.
 for(let i=1;i<u.length;i++)if(/^(You|Thou|He|She|It|We|They|The|This|That|These|Those|My|His|Her|Your|Thy|Thine|Our|Their|If|I wish)$/.test(u[i].text))parts[i]=parts[i].toLowerCase();
 let text=parts.join(" ").replace(/\s+([,;:!?])/g,"$1");
 if(capitalize&&text)text=text[0].toUpperCase()+text.slice(1);
 return text;
}
function choose(u:Token[],candidates:Candidate[],changes:Change[]):Token[]|null {
 const eligible=candidates.filter(c=>validCandidate(u,c)).sort((a,b)=>(b.priority+10*b.confidence)-(a.priority+10*a.confidence)||a.ruleId.localeCompare(b.ruleId));
 const winner=eligible[0];if(!winner)return null;
 changes.push({from:renderUnits(u),to:renderUnits(winner.units),reason:`${winner.name}: ${winner.explanation}`,ruleId:winner.ruleId,confidence:winner.confidence});
 return winner.units;
}
function candidate(id:string,name:string,units:Token[],explanation:string,priority=90,removed:Token[]=[]):Candidate {
 return {ruleId:id,name,units,explanation,priority,confidence:.96,removed};
}
function rewrite(u:Token[],intensity:SyntaxIntensity,question:boolean,changes:Change[],depth=0):Token[] {
 if(depth>2||u.length>60||u.some(t=>t.kind==="protected"||/[“”"()\[\]]/.test(t.text)))return u;
 const w=words(u),commas=w.reduce<number[]>((a,x,i)=>x===","?[...a,i]:a,[]);
 if(w[0]==="if"&&commas.length===1){
  const stop=commas[0],cond=u.slice(1,stop),c=analyze(cond),result=u.slice(stop+1);const rw=words(result);
  if(c&&c.subject.start===0&&c.auxiliary){
   const v=source(cond[c.finite]),rest=words(cond.slice(c.finite+1));
   const kind=v==="were"&&rw.some(x=>/^(would|could|might|should)$/.test(x))?"S11":v==="had"&&participle(rest[0]==="not"?rest[1]:rest[0])&&rw.some(x=>/^(would|could|might|should)$/.test(x))?"S12":v==="should"&&!!lemma(rest[0]==="not"?rest[1]:rest[0])?"S13":null;
   if(kind){const s=cond.slice(c.subject.start,c.subject.end),body=cond.filter(t=>!s.includes(t)&&t!==cond[c.finite]);const out=[cond[c.finite],...s,...body,u[stop],...result];
    const selected=choose(u,[candidate(kind,"Conditional Inversion",out,"Omitted if only in a licensed were/had/should condition; inversion retains the hypothetical reading.",100,[u[0]])],changes);if(selected)return selected;
   }
  }
  return u;
 }
 // Move one complete terminal subordinate clause. Nested/relative/ambiguous structures do not parse.
 const markers=w.map((x,i)=>/^(because|when|although|though)$/.test(x)?i:-1).filter(i=>i>0);
 if(markers.length===1&&!commas.length&&!question){
  const k=markers[0],a=analyze(u.slice(0,k)),b=analyze(u.slice(k+1));const id=w[k]==="because"?"S15":w[k]==="when"?"S14":"S16";
  if(a&&b&&(id!=="S16"||intensity==="theatrical")){
   const selected=choose(u,[candidate(id,"Subordinate Clause Fronting",[...u.slice(k),literal(","),...u.slice(0,k)],"Moved the entire dependent clause, retaining its causal, temporal or concessive connector and both propositions.")],changes);if(selected)return selected;
  }
  return u;
 }
 // Explicit optative, never converting could to might or adding a wish to factual text.
 if(intensity==="theatrical"&&w[0]==="i"&&w[1]==="wish"){
  const start=w[2]==="that"?3:2,c=analyze(u.slice(start));
  if(c&&source(c.units[c.finite])==="were"){
   const replacement=literal("Would that");
   const cand:Candidate={...candidate("S17","Optative Construction",[replacement,...u.slice(start)],"Rendered an explicit wish with literary would that; the irrealis complement is retained."),removed:[],replacements:new Map()};
   // Optatives deliberately replace the explicit I-wish operator; validate the complement independently.
   if(u.slice(start).every((t,i)=>cand.units[i+1]===t)&&!w.includes("not")){
    changes.push({from:renderUnits(u),to:renderUnits(cand.units),reason:"Optative Construction: Explicit I wish becomes would that; no new wish or modal possibility is invented.",ruleId:"S17",confidence:.93});
    return cand.units;
   }
  }
 }
 if(w[0]==="do"&&w[1]==="not"&&lemma(w[2])&&!question&&!commas.length&&!w.slice(3).some(x=>/^(and|or|but|not|never)$/.test(x))){
  const selected=choose(u,[candidate("S10","Negative Imperative",[u[2],u[1],...u.slice(3)],"Retained a negative command while omitting auxiliary do and placing not after its bare verb.",95,[u[0]])],changes);if(selected)return selected;
 }
 const coordination=w.map((x,i)=>/^(and|or|but)$/.test(x)?i:-1).filter(i=>i>0);
 if(coordination.length===1&&!commas.length){
  const k=coordination[0],left=u.slice(0,k),right=u.slice(k+1),a=analyze(left),b=analyze(right);
  if(a&&b){return [...rewrite(left,intensity,false,changes,depth+1),u[k],...rewrite(right,intensity,question,changes,depth+1)];}
  if(intensity==="theatrical"&&a&&!a.auxiliary&&!a.negative&&a.subject.end===1&&pronoun.test(source(left[0]))&&lemma(source(right[0]))&&!right.some(t=>aux.test(source(t)))){
   const subject={...left[0]};const out=[...left,u[k],subject,...right];
   changes.push({from:renderUnits(u),to:renderUnits(out),reason:"Coordinated Subject Expansion: Repeated the already shared subject to articulate parallel clauses without adding an event.",ruleId:"S20",confidence:.91});return out;
  }
  return u;
 }
 if(commas.length)return u;
 const c=analyze(u,question);if(!c)return u;
 const candidates=syntaxRules.filter(r=>rank[intensity]>=rank[r.minimum]&&r.match(c)).map(r=>({...r.rewrite(c),ruleId:r.id,name:r.name,priority:r.priority,confidence:c.confidence}));
 return choose(u,candidates,changes)??u;
}
export function restructure(tokens:Token[],intensity:SyntaxIntensity,changes:Change[]):string {
 if(intensity==="subtle")return tokens.map(t=>t.text).join("");
 let text="",buffer:Token[]=[];
 const flush=(question=false)=>{
  const significant=buffer.filter(t=>t.kind!=="space");
  const result=rewrite(significant,intensity,question,changes);
  if(result===significant)text+=buffer.map(t=>t.text).join("");
  else {const leading=buffer[0]?.kind==="space"?buffer[0].text:"";const trailing=buffer.at(-1)?.kind==="space"?buffer.at(-1)!.text:"";text+=leading+renderUnits(result)+trailing;}
  buffer=[];
 };
 for(const t of tokens){if(t.kind==="punct"&&/^[.!?;]$/.test(t.text)){flush(t.text==="?");text+=t.text;}else if(t.kind==="space"&&t.text.includes("\n")){flush();text+=t.text;}else buffer.push(t);}
 flush();return text;
}
