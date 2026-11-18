export interface Star {
 id: number; hip: number | null; name: string; designation: string; ra: number; dec: number;
 magnitude: number; spectral: string; colorIndex: number | null; distance: number | null; constellation: string;
}
export const PANORAMA_HEIGHT = 5.8;
export const SKY_TOP_PADDING = .8;
export const MAX_START = PANORAMA_HEIGHT - 1;
export const MIN_SEPARATION = .65;
/** Uniformly sample the allowed intervals, excluding a neighbourhood of the previous start. */
export function chooseStart(previous: number | null, random = Math.random, maximum = MAX_START): number {
 if (previous === null || !Number.isFinite(previous) || previous < 0 || previous > maximum) return random() * maximum;
 const left = Math.max(0, previous - MIN_SEPARATION);
 const right = Math.min(maximum, previous + MIN_SEPARATION);
 const sample = random() * (left + maximum - right);
 return sample < left ? sample : right + sample - left;
}
/** Reserve the full document's physical height inside the fixed virtual panorama. */
export function maxStartForDocument(projectionHeight: number, documentHeight: number) {
 return Math.max(0,PANORAMA_HEIGHT-Math.max(1,documentHeight/Math.max(1,projectionHeight)));
}
/** The sole atmospheric fade ends at the title section, before the gallery. */
export function titleStarOpacity(worldY: number, start: number, end: number) {
 return end<=start?(worldY>=end?1:0):Math.min(1,Math.max(0,(worldY-start)/(end-start)));
}
/** Rotated equirectangular: declination runs left→right, RA runs top→bottom. */
export function project(star: Pick<Star, 'ra' | 'dec'>, width: number, height: number, offset: number) {
 return { x: 32 + (90 - star.dec) / 180 * (width - 64), y: (SKY_TOP_PADDING + star.ra / 24 * 5 - offset) * height };
}
export interface ContentBounds { left: number; right: number; top: number; bottom: number }
export function starSpacing(width: number) {
 const edge=width<600?24:width<960?32:48;
 return {edge,featuredEdge:Math.max(36,edge),contentGap:width<600?32:width<960?40:48};
}
/** Only the featured treatment is withheld; the same catalogue point remains on canvas. */
export function hasFeaturedStarSpace(x: number,y: number,width: number,content: readonly ContentBounds[]) {
 const {featuredEdge,contentGap}=starSpacing(width);
 return x>=featuredEdge&&x<=width-featuredEdge&&content.every(rect=>
  Math.hypot(Math.max(rect.left-x,0,x-rect.right),Math.max(rect.top-y,0,y-rect.bottom))>=contentGap);
}
export function starAppearance(magnitude: number, spectral: string) {
 const brightness = Math.min(1, Math.max(.12, Math.pow(10, -.16 * (magnitude + 1.46))));
 const colors: Record<string, string> = { O: '#c3d6fa', B: '#d3dffc', A: '#e9edff', F: '#f4f1df', G: '#f3e6c8', K: '#efc9a0', M: '#e9b19b' };
 return { radius: .55 + brightness * 1.6, opacity: .27 + brightness * .64, color: colors[spectral[0]] ?? '#e9edff' };
}
export function cardPosition(x: number, y: number, width: number, height: number, cardWidth: number, cardHeight: number) {
 return { left: Math.max(12, Math.min(width - cardWidth - 12, x + 28 + cardWidth < width ? x + 28 : x - cardWidth - 28)), top: Math.max(12, Math.min(height - cardHeight - 12, y - cardHeight / 2)) };
}

/** Sample merged viewing windows, with the same previous-region exclusion as the full atlas. */
export function chooseStartInWindows(previous: number | null, windows: readonly [number, number][], random = Math.random, maximum = MAX_START): number {
 const merged: [number,number][]=[];
 for(const [a,b] of windows.map(([a,b])=>[Math.max(0,a),Math.min(maximum,b)] as [number,number]).filter(([a,b])=>b>a).sort((a,b)=>a[0]-b[0])){
  const last=merged.at(-1);if(last&&a<=last[1])last[1]=Math.max(last[1],b);else merged.push([a,b]);
 }
 if(!merged.length)return chooseStart(previous,random,maximum);
 let allowed=merged;
 if(previous!==null&&Number.isFinite(previous)&&previous>=0&&previous<=maximum){
  const lower=previous-MIN_SEPARATION,upper=previous+MIN_SEPARATION;
  const separated=merged.flatMap(([a,b])=>[[a,Math.min(b,lower)],[Math.max(a,upper),b]] as [number,number][]).filter(([a,b])=>b>a);
  if(separated.length)allowed=separated;
 }
 let sample=random()*allowed.reduce((total,[a,b])=>total+b-a,0);
 for(const [a,b]of allowed){if(sample<b-a)return a+sample;sample-=b-a;}
 return allowed.at(-1)![1];
}
