import test from "node:test";
import assert from "node:assert/strict";
import { fallingPoint, cosmicDestination, type SkyPoint } from "../components/cosmic/use-cosmic-transformation";
test("collapse preserves each source point and converges exactly on the clicked object",()=>{
 const point:SkyPoint={x:30,y:200,radius:1.2,color:"#e9edff",opacity:.6},target={x:700,y:2100};
 assert.deepEqual(fallingPoint(point,target,0),{x:30,y:200});
 assert.deepEqual(fallingPoint(point,target,1),target);
 assert.deepEqual(fallingPoint(point,target,2),target);
 assert.deepEqual(point,{x:30,y:200,radius:1.2,color:"#e9edff",opacity:.6});
});
test("the curved pull moves monotonically inward without overshooting",()=>{
 const point:SkyPoint={x:1200,y:50,radius:1,color:"white",opacity:1},target={x:600,y:2000};let previous=Infinity;
 for(let i=0;i<=100;i++){
  const p=fallingPoint(point,target,i/100),distance=Math.hypot(p.x-target.x,p.y-target.y);
  assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));assert.ok(distance<=previous+1e-8);previous=distance;
 }
});

test("both stable universes activate, while every transitional phase is locked",()=>{
 assert.equal(cosmicDestination("dark"),"light");assert.equal(cosmicDestination("light"),"dark");
 for(const phase of ["collapsing","revealing","charging","expanding"] as const)assert.equal(cosmicDestination(phase),null);
});
