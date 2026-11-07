export type Style = "classic" | "dramatic";
export type Address = "familiar" | "formal";
export type SyntaxIntensity = "subtle" | "shakespearean" | "theatrical";
export interface Options { style?: Style; address?: Address; syntax?: SyntaxIntensity }
export interface Change { from: string; to: string; reason: string; ruleId?: string; confidence?: number }
export interface Token { text: string; original: string; kind: "word" | "space" | "punct" | "protected" }
export interface Translation { text: string; changes: Change[] }
export const MAX_LENGTH = 1500;
