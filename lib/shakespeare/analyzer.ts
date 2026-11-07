import type { Token } from "./types";
import type { Clause, Span } from "./syntax-types";
import { present } from "./verbs";
export const source=(t?:Token)=>t?.original.toLowerCase()??"";
export const words=(u:Token[])=>u.map(source);
export const pronoun=/^(i|you|thou|he|she|it|we|they)$/;
const determiners=/^(the|a|an|this|that|these|those|my|your|thy|thine|his|her|our|their)$/;
const functional=/^(if|because|although|though|when|while|unless|since|who|whom|which|whose|that|whether|why|how|where|and|or|but|to|of|for|with|in|on|at|by|from|upon|not|never|only)$/;
export const pastForms:Record<string,string>={see:"saw",know:"knew",give:"gave",go:"went",come:"came",stand:"stood",speak:"spoke",tell:"told",say:"said",hear:"heard",take:"took",make:"made",find:"found",keep:"kept",leave:"left",write:"wrote",read:"read",think:"thought",bring:"brought",buy:"bought",send:"sent",show:"showed",feel:"felt",forget:"forgot",run:"ran",sit:"sat",eat:"ate",drink:"drank",sleep:"slept",lose:"lost",win:"won",meet:"met",pay:"paid",hold:"held",get:"got",begin:"began"};
export const regularPast=(v:string)=>v.endsWith("e")?v+"d":/[^aeiou]y$/.test(v)?v.slice(0,-1)+"ied":v==="stop"?"stopped":v+"ed";
export const pastOf=(v:string)=>pastForms[v]??(present.has(v)?regularPast(v):undefined);
const reversePast=new Map(Object.entries(pastForms).map(([k,v])=>[v,k]));
export function lemma(v:string):string|undefined {
 if(present.has(v))return v;
 if(reversePast.has(v))return reversePast.get(v);
 for(const base of present.keys())if(regularPast(base)===v||base+"s"===v||base+"es"===v||base.endsWith("y")&&base.slice(0,-1)+"ies"===v)return base;
 return undefined;
}
export const aux=/^(am|is|are|was|were|be|have|has|had|do|does|did|will|would|shall|should|can|cannot|could|may|might|must)$/;
export const copula=/^(am|is|are|was|were|be)$/;
export const adverb=/^(not|never|rarely|seldom|always|often|sometimes|usually|still|really|truly|certainly|already|also|ever|only|now|soon|just|yet|perhaps|indeed|quickly|slowly)$/;
const predAdj=/^(great|dark|cold|heavy|light|bright|fair|beautiful|kind|ready|afraid|angry|wroth|sad|happy|silent|deep|long|short|true|false|clear|certain|strange|fierce|gentle|brave|rich|poor|glad|weary|sick|well|strong|weak|sweet|bitter)$/;
export const participle=(v:string)=>/^(known|seen|been|gone|done|forgotten|given|taken|written|heard|read|made|said|left|lost|found|told|bought|brought|sent|stood|come|felt|kept|.*ed)$/.test(v);
export function nounPhrase(u:Token[], subject=false):boolean {
 if(!u.length||u.length>7||u.some((t,i)=>t.kind!=="word"||(functional.test(source(t))&&!(i===0&&determiners.test(source(t))))))return false;
 if(u.length===1&&(pronoun.test(source(u[0]))||/^(this|that|these|those)$/.test(source(u[0]))||!subject&&/^(me|thee|him|her|us|them)$/.test(source(u[0]))))return true;
 if(determiners.test(source(u[0]))&&u.length>=2)return !u.slice(1).some(t=>aux.test(source(t))||pronoun.test(source(t))||functional.test(source(t)));
 return subject&&!determiners.test(source(u[0]))&&u.length<=2&&u.every(t=>/^\p{Lu}/u.test(t.original));
}
/** An explicit bounded grammar: uncertain clauses return null, never a guessed SVO. */
export function analyze(u:Token[],question=false):Clause|null {
 if(u.length<2||u.length>28||u.some(t=>t.kind!=="word")||u.some(t=>/^(who|whom|which|whose|because|although|though|when|unless|whether)$/.test(source(t))&&u.indexOf(t)>0))return null;
 const w=words(u);let subject:Span|undefined, f=-1;
 const questionOffset=question&&/^(why|where|when|how)$/.test(w[0])?1:0;
 if(question&&aux.test(w[questionOffset])){
  // Subject NPs in questions are limited to a personal pronoun: no guessed head boundary.
  if(!pronoun.test(w[questionOffset+1]))return null;subject={start:questionOffset+1,end:questionOffset+2};f=questionOffset;
 }else{
  for(let j=1;j<u.length;j++)if((aux.test(w[j])||lemma(w[j]))&&nounPhrase(u.slice(0,j),true)){subject={start:0,end:j};f=j;break;}
 }
 if(!subject||f<0)return null;
 let lex=question?subject.end:f+1;while(adverb.test(w[lex]))lex++;
 const auxiliary=aux.test(w[f]);
 if(!auxiliary)lex=f;
 const lexicalLemma=auxiliary?lemma(w[lex]):lemma(w[f]);
 if(auxiliary&&!copula.test(w[f])&&!lexicalLemma&&!participle(w[lex]??""))return null;
 const negative=w.includes("not")||w.includes("never")||w[f]==="cannot";
 const passive=copula.test(w[f])&&participle(w[lex]??"")&&!predAdj.test(w[lex]??"");
 const c:Clause={units:u,subject,finite:f,lexical:lex,lemma:lexicalLemma??w[f],auxiliary,question,negative,passive,confidence:.96};
 if(copula.test(w[f])&&!question&&!negative){
  const after=w.slice(f+1);if(after.length===1&&predAdj.test(after[0])||after.length===2&&/^(very|so|quite)$/.test(after[0])&&predAdj.test(after[1]))c.complement={start:f+1,end:u.length};
 }
 if(!lexicalLemma||passive)return c;
 let end=u.length;
 if(/^(tomorrow|today|tonight|yesterday|soon)$/.test(w[end-1])){c.adverbial={start:end-1,end};end--;}
 else if(/^(stand|sit|wait|stay|sleep|walk|live|come|go|return)$/.test(lexicalLemma)){
  const prep=w.findIndex((x,i)=>i>lex&&/^(upon|on|in|at|under|beside|behind|before|after|until)$/.test(x));
  if(prep>lex&&nounPhrase(u.slice(prep+1),false)){c.adverbial={start:prep,end};end=prep;}
 }
 let start=lex+1;
 if(/^(give|send|show|tell|bring)$/.test(lexicalLemma)&&/^(me|you|him|her|us|them)$/.test(w[start])&&end-start>1){c.indirect={start,end:start+1};start++;}
 if(start<end&&nounPhrase(u.slice(start,end)))c.object={start,end};
 return c;
}
export function pronounRoles(tokens:Token[]):Map<Token,"subject"|"object"> {
 const roles=new Map<Token,"subject"|"object">();
 // Clausal wh markers create a fresh local subject position without treating the embedded clause as a question.
 const u=tokens.filter(t=>t.kind!=="space");
 for(let i=0;i<u.length;i++)if(source(u[i])==="you"){
  const before=source(u[i-1]);let j=i+1;while(adverb.test(source(u[j])))j++;
  const verb=source(u[j]);
  if(/^(why|how|where|when|that|if|because|although|though|unless|while|whether)$/.test(before)&&(aux.test(verb)||lemma(verb)))roles.set(u[i],"subject");
 }
 return roles;
}
