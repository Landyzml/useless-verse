import type { Token, Change } from "./types";
export const lower = (t?: Token) => t?.text.toLowerCase() ?? "";
export function tokenize(text: string): Token[] {
 return (text.normalize("NFC").replace(/\r\n?/g, "\n").match(/(?:https?:\/\/|www\.)[^\s<>"“”]+|[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}|[\p{L}\p{N}]+(?:[_-][\p{L}\p{N}]+)+|[\p{L}]+(?:['’][\p{L}]+)*|\d+(?:[./:-]\d+)*|\s+|[^\s]/gu) ?? []).map(text => ({text,original:text,kind: /^(?:https?:|www\.)|@|[_\d]/u.test(text) ? "protected" : /^\s+$/u.test(text) ? "space" : /^\p{L}/u.test(text) ? "word" : "punct"}));
}
export function replace(t: Token, value: string, reason: string, changes: Change[]) {
 if (t.text === value) return;
 const from=t.text;
 const result=from.length>1 && from===from.toUpperCase() ? value.toUpperCase() : /^\p{Lu}/u.test(from) ? value[0].toUpperCase()+value.slice(1) : value;
 if(from!==result){changes.push({from,to:result,reason});t.text=result;}
}
const contractions: Record<string,string> = {"you're":"you are","you've":"you have","you'll":"you will","i'm":"I am","i've":"I have","i'll":"I will","we're":"we are","we've":"we have","we'll":"we will","they're":"they are","they've":"they have","they'll":"they will","he'll":"he will","she'll":"she will","don't":"do not","doesn't":"does not","didn't":"did not","isn't":"is not","aren't":"are not","wasn't":"was not","weren't":"were not","haven't":"have not","hasn't":"has not","hadn't":"had not","won't":"will not","can't":"can not","couldn't":"could not","wouldn't":"would not","shouldn't":"should not","mustn't":"must not","shan't":"shall not"};
export function expandContractions(tokens: Token[], changes: Change[]): Token[] {
 const consumed=new Set<number>();
 return tokens.flatMap((t,i) => {
  if(consumed.has(i))return [];
  if(t.kind!=="word")return [t];
  const key=lower(t).replaceAll("’", "'");let value=contractions[key];
  const next=tokens.slice(i+1).find(x=>x.kind!=="space");
  if(/^(you|i|he|she|we|they)'d$/.test(key)) {
   if(/^(?:been|gone|seen|done|forgotten|known|taken|written|heard|read|made|said|left|lost|found|given|told|bought|brought|.*ed)$/.test(lower(next)))value=key.split("'")[0]+" had";
   else if(/^(?:be|have|go|like|love|help|know|see|say|tell|want|remember|prefer|rather)$/.test(lower(next)))value=key.split("'")[0]+" would";
  }
  if(/^(he|she|it)'s$/.test(key)) {
   if(/^(?:been|gone|done|forgotten|seen)$/.test(lower(next)))value=key.split("'")[0]+" has";
   else if(/^(?:a|an|the|not|very|so|here|there|ready|kind|happy|sad|angry|beautiful|fair|.*ing)$/.test(lower(next)))value=key.split("'")[0]+" is";
  }
  if(!value)return [t];
  if(value.endsWith(" not")&&lower(next)==="you"){
   const nextIndex=tokens.indexOf(next!);value=value.replace(" not"," you not");
   for(let k=i+1;k<=nextIndex;k++)consumed.add(k);
  }
  replace(t,value,"Expanded a supported contraction before grammatical analysis.",changes);return tokenize(t.text);
 });
}
