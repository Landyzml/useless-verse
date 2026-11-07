import { MAX_LENGTH, type Options, type Translation } from "./types";
import { tokenize, expandContractions } from "./tokenizer";
import { grammar } from "./grammar";
import { vocabulary } from "./vocabulary";
export function translate(input:string, options:Options={}):Translation {
 if(Array.from(input).length>MAX_LENGTH)throw new RangeError(`Please use ${MAX_LENGTH.toLocaleString("en")} characters or fewer.`);
 if(!input.trim())return {text:"",changes:[]};
 const changes:Translation["changes"]=[];
 const tokens=expandContractions(tokenize(input),changes);
 grammar(tokens,options.address??"familiar",options.style==="dramatic",changes);
 vocabulary(tokens,options.style??"classic",options.address??"familiar",changes);
 return {text:tokens.map(t=>t.text).join(""),changes};
}
