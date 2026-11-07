export type Style = "classic" | "dramatic";
export type Address = "familiar" | "formal";
export interface Options { style?: Style; address?: Address }
export interface Change { from: string; to: string; reason: string }
export interface Token { text: string; original: string; kind: "word" | "space" | "punct" | "protected" }
export interface Translation { text: string; changes: Change[] }
export const MAX_LENGTH = 1500;
