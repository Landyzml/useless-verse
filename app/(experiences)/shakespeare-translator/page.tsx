import type { Metadata } from "next";
import { Translator } from "./translator-ui";
export const metadata:Metadata={title:"The Bard’s Tongue — Shakespearean Translator",description:"Turn ordinary English into historically informed Shakespearean-style prose. A private, local experiment from Useless Verse."};
export default function Page(){return <Translator/>;}
