import type { Token, SyntaxIntensity } from "./types";
export interface Span { start:number; end:number }
export interface Clause {
  units:Token[]; subject:Span; finite:number; lexical:number; lemma:string;
  auxiliary:boolean; question:boolean; negative:boolean; passive:boolean;
  object?:Span; indirect?:Span; complement?:Span; adverbial?:Span;
  confidence:number;
}
export interface SyntaxContext { clause:Clause; intensity:SyntaxIntensity }
export interface Candidate { units:Token[]; ruleId:string; name:string; explanation:string; priority:number; confidence:number; removed?:Token[]; replacements?:Map<Token,Token> }
export interface SyntaxRule { id:string; name:string; category:string; minimum:SyntaxIntensity; priority:number; match:(c:Clause)=>boolean; rewrite:(c:Clause)=>Omit<Candidate,"ruleId"|"name"|"priority"|"confidence"> }
