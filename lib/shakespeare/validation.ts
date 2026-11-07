import type { Token } from "./types";
import type { Candidate } from "./syntax-types";
/** Token-identity conservation is a necessary safety check, not a proof of semantic equivalence. */
export function validCandidate(before:Token[],candidate:Candidate):boolean {
 const removed=new Set(candidate.removed??[]),replacements=candidate.replacements??new Map<Token,Token>();
 const expected=before.filter(t=>!removed.has(t)).map(t=>replacements.get(t)??t);
 const actual=candidate.units.filter(t=>!(/^[,]$/.test(t.text)&&!expected.includes(t)));
 if(actual.length!==expected.length||new Set(actual).size!==actual.length)return false;
 if(expected.some(t=>!actual.includes(t)))return false;
 // Closed-list removals are grammatical licensing, never arbitrary content deletion.
 if([...removed].some(t=>!/^(do|does|did|if)$/.test(t.original.toLowerCase())))return false;
 if(candidate.confidence<.9)return false;
 return true;
}
