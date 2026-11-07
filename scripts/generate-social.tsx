import { writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
export const alt = "Useless Verse — A universe of beautifully useless things.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
 return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#f7f7f2", color: "#20221d" }}><div style={{display:"flex", fontSize:112, fontWeight:700, letterSpacing:-7}}>useless verse.</div><div style={{display:"flex", fontSize:34, marginTop:32}}>A universe of beautifully useless things.</div><svg width="160" height="160" viewBox="0 0 48 48" style={{position:"absolute",right:90,bottom:65}}><circle cx="24" cy="24" r="20" fill="#c5ef68"/><path d="M16 15v12a8 8 0 0 0 16 0V15" fill="none" stroke="#20221d" strokeWidth="4"/></svg></div>, size);
}

async function main() { await writeFile("public/branding/social.png", Buffer.from(await Image().arrayBuffer())); }
main().catch(error => { console.error(error); process.exitCode = 1; });
