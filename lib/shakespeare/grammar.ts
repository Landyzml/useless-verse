import type { Token, Change, Address } from "./types";
import { lower, replace } from "./tokenizer";
import { auxiliaries, finite, isFinite, third, dramaticThird } from "./verbs";
const adverb=/^(not|never|always|often|sometimes|usually|still|really|truly|certainly|already|also|ever|only|now|soon|just|yet|perhaps|indeed|so|very|quickly|slowly)$/;
const prep=/^(to|for|with|at|from|of|by|on|upon|in|into|without|against|beside|behind|between|before|after|through|than|as)$/;
const clause=/^(that|if|when|because|although|though|unless|while|whether|but|and|or|since)$/;
const complement=/^(think|know|hope|believe|wish|said|say|thought|knew|sure)$/;
/** A bounded local analyzer; does not pretend to be a full dependency parser. */
export function grammar(tokens:Token[], address:Address, dramatic:boolean, changes:Change[]) {
 const significant=tokens.map((t,i)=>({t,i})).filter(x=>x.t.kind!=="space");
 const sentenceStart=(n:number)=>{while(n>0&&!/[.!?;]/.test(significant[n-1].t.text)&&!tokens.slice(significant[n-1].i,significant[n].i).some(t=>t.text.includes("\n")))n--;return n;};
 const sentenceEnd=(n:number)=>{while(n<significant.length-1&&!/[.!?;]/.test(significant[n].t.text))n++;return n;};
 const original=significant.map(x=>lower(x.t));
 const word=(n:number)=>original[n]??"";
 const nextVerb=(n:number)=>{let j=n+1;while(adverb.test(word(j)))j++;return j;};
 for(let n=0;n<significant.length;n++){
  const {t}=significant[n];const w=word(n);if(t.kind!=="word")continue;
  const span=original.slice(sentenceStart(n),sentenceEnd(n)+1).join(" ");
  const plural=/\byou (?:all|both|two|three|and)\b|\byourselves\b/.test(span);
  const familiar=address==="familiar"&&!plural;
  if(familiar&&w==="your")replace(t,/^(eyes|ears|own|honou?r|hours?)$/.test(word(n+1))?"thine":"thy","Familiar possessive determiner; conservative thine allowlist.",changes);
  if(familiar&&w==="yours")replace(t,"thine","Independent familiar possessive.",changes);
  if(familiar&&w==="yourself")replace(t,"thyself","Familiar reflexive pronoun.",changes);
  if(w==="you"&&familiar){
   const j=nextVerb(n),v=word(j),previous=word(n-1);
   const inversion=Boolean(auxiliaries[previous]) && (n-1===sentenceStart(n)||/^(why|where|when|how|what|who|which|not)$/.test(word(n-2))||word(n-2)===","||word(n-2)==="?");
   const boundary=n===sentenceStart(n)||clause.test(previous)||complement.test(previous)||/^[,:;“"(]$/.test(previous);
   const priorSubject=original.slice(sentenceStart(n),n).some(x=>/^(i|he|she|we|they|it)$/.test(x));
   const object=(isFinite(previous)&&!auxiliaries[previous]&&(!complement.test(previous)||!finite(v)))||prep.test(previous)||(!inversion&&priorSubject&&(!complement.test(previous)||!finite(v)))||v==="to";
   if(object){replace(t,"thee","Object of a verb or preposition in familiar singular address.",changes);continue;}
   // Preserve coordinated/plural subjects and unknown predicates rather than invent agreement.
   if(inversion||boundary&&Boolean(finite(v))){
    replace(t,"thou","Recognized familiar singular subject.",changes);
    const target=inversion?n-1:j;const verb=word(target);let value=finite(verb);
    if(verb==="were"&&/\b(if|wish)\b/.test(span))value="wert";
    if(value)replace(significant[target].t,value,"Finite verb agrees with thou; dependent verbs remain unchanged.",changes);
    // Conjoined bare finite verbs sharing this subject, without inflecting after auxiliaries.
    if(!auxiliaries[verb]){for(let k=j+1;k<significant.length&&k<sentenceEnd(n);k++){if(clause.test(word(k))&&!/^(and|or|but)$/.test(word(k)))break;if(/^(and|or|but)$/.test(word(k))){const q=nextVerb(k);if(finite(word(q))&&!/^(you|i|he|she|we|they|it)$/.test(word(k+1)))replace(significant[q].t,finite(word(q))!,"Coordinated finite verb shares the familiar subject.",changes);break;}}}
   }
  }
  if(/^(he|she|it)$/.test(w)){
   const j=nextVerb(n),value=third[word(j)]??(dramatic?dramaticThird[word(j)]:undefined);
   if(value)replace(significant[j].t,value,"Selective third-person singular ending; -s and -eth historically coexist.",changes);
   if(third[word(n-1)])replace(significant[n-1].t,third[word(n-1)],"Third-person auxiliary in an inverted question.",changes);
  }
 }
 // Narrow first-person present negative; no tense or modal rewriting.
 for(let n=0;n<significant.length-3;n++){
  if(word(n)==="i"&&word(n+1)==="do"&&word(n+2)==="not"&&/^(know|tell|understand|believe|remember)$/.test(word(n+3))){
   const from=tokens.slice(significant[n+1].i,significant[n+3].i+1).map(t=>t.text).join("");
   significant[n+1].t.text="";significant[n+2].t.text="";
   for(let k=significant[n+1].i+1;k<significant[n+3].i;k++)if(tokens[k].kind==="space")tokens[k].text="";
   significant[n+3].t.text+=" not";changes.push({from,to:significant[n+3].t.text,reason:"Limited first-person present negative: lexical verb followed by not."});
  }
 }
}
