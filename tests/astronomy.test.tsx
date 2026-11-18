import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { stars } from "../data/stars";
import { featuredStars } from "../data/featured-stars";
import { cardPosition, chooseStart, chooseStartInWindows, MAX_START, MIN_SEPARATION, project, maxStartForDocument, titleStarOpacity, starAppearance } from "../lib/astronomy/sky";
test("compact HYG subset has unique catalogue identities and valid real sky coordinates",()=>{
 assert.equal(stars.length,291);
 assert.equal(new Set(stars.map(s=>s.id)).size,291);
 for(const s of stars){assert.ok(s.id>0);assert.ok(s.ra>=0&&s.ra<24);assert.ok(s.dec>=-90&&s.dec<=90);assert.ok(s.magnitude<=3.5);}
 const sirius=stars.find(s=>s.name==="Sirius")!;
 assert.equal(sirius.hip,32349);assert.equal(sirius.ra,6.752481);assert.equal(sirius.dec,-16.716116);
 assert.ok(Math.abs(sirius.distance!-8.6)<.1);
});
test("all 24 featured entries have real identities, sources, and local attributed images",()=>{
 assert.equal(Object.keys(featuredStars).length,24);
 for(const [id,detail]of Object.entries(featuredStars)){
  assert.ok(stars.find(s=>s.id===Number(id))?.name);assert.match(detail.source,/^https:\/\//);
  assert.ok(detail.designation&&detail.constellation&&detail.description);
  assert.ok(existsSync(`public${detail.image??`/stars/${id}.svg`}`));
  if(!detail.image){const svg=readFileSync(`public/stars/${id}.svg`,'utf8');assert.match(svg,/catalogue illustration, not a photograph/);assert.match(svg,/HYG/);}
 }
});
test("random start excludes a meaningful neighbourhood, including both boundaries",()=>{
 for(let i=0;i<=100;i++){
  const previous=MAX_START*i/100;
  for(let j=0;j<100;j++){
   const next=chooseStart(previous,()=>j/100);
   assert.ok(next>=0&&next<=MAX_START);assert.ok(Math.abs(next-previous)>=MIN_SEPARATION-1e-10);
  }
 }
 for(const invalid of [null,NaN,-1,MAX_START+1]) assert.equal(chooseStart(invalid,()=>.5),MAX_START/2);
});
test("projection and scroll preserve coordinate relationships without wrapping or changing star identity",()=>{
 const a=project({ra:0,dec:90},1000,800,0),b=project({ra:24,dec:-90},1000,800,0);
 assert.deepEqual(a,{x:32,y:640});assert.deepEqual(b,{x:968,y:4640});
 const sirius=stars.find(s=>s.name==="Sirius")!;
 const p=project(sirius,1000,800,1),q=project(sirius,1000,800,2);
 assert.equal(p.x,q.x);assert.equal(p.y-q.y,800);

});
test("magnitude mapping is monotonic and clipped; spectral colours differ",()=>{
 assert.ok(starAppearance(-1.44,"A").radius>starAppearance(3.5,"A").radius);
 assert.ok(starAppearance(-100,"A").opacity<=1);assert.ok(starAppearance(100,"M").opacity>0);
 assert.notEqual(starAppearance(1,"B").color,starAppearance(1,"M").color);
});
test("information cards stay within the viewport at all edges and standard widths",()=>{
 for(const width of [768,1280,1440])for(const height of [600,800,900])for(const x of [0,width/2,width])for(const y of [0,height/2,height]){
  const p=cardPosition(x,y,width,height,340,500);
  assert.ok(p.left>=12&&p.top>=12);assert.ok(p.left+340<=width-12);assert.ok(p.top+500<=height-12);
 }
});

test("mobile window sampling stays in real viewing intervals and avoids the previous crop",()=>{
 const windows: [number,number][]=[[.2,.9],[.7,1.2],[2,2.5],[3,3.8]];
 for(let i=0;i<100;i++){
  const next=chooseStartInWindows(.8,windows,()=>i/100);
  assert.ok((next>=2&&next<=2.5)||(next>=3&&next<=3.8));
  assert.ok(Math.abs(next-.8)>=MIN_SEPARATION);
 }
 assert.equal(chooseStartInWindows(null,[],()=>.5),MAX_START/2);
});

test("initial crop reserves the document height without accelerating or freezing scrolling",()=>{
 for(const viewport of [600,844,900])for(const documentHeight of [viewport,viewport*1.5,viewport*2.5]){
  const maximum=maxStartForDocument(viewport,documentHeight);
  assert.ok(maximum>=0);
  assert.ok((5.8-maximum)*viewport>=documentHeight-1e-8);
 }
 assert.equal(maxStartForDocument(800,10000),0);
});
test("title fade is complete before all gallery and footer content",()=>{
 assert.equal(titleStarOpacity(200,300,500),0);
 assert.equal(titleStarOpacity(400,300,500),.5);
 for(const y of [500,550,800,1500])assert.equal(titleStarOpacity(y,300,500),1);
 assert.equal(titleStarOpacity(500,500,500),1);
});
