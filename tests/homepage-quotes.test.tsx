import assert from 'node:assert/strict';
import {test} from 'node:test';
import {homepageQuotes,randomQuoteIndex} from '../lib/homepage-quotes';
test('exact collection and Easter eggs',()=>{assert.equal(homepageQuotes.length,100);assert.equal(new Set(homepageQuotes).size,100);for(const q of homepageQuotes){assert.ok(q.length);assert.equal(q,q.trim());assert.ok(!/[<>]/.test(q));}assert.equal(homepageQuotes[0],'A little corner of the internet for strange ideas, interactive experiments, and things that probably don’t need to exist.');assert.equal(homepageQuotes[3],'A little nod to neal.fun, where curiosity made being useless an art form.');assert.equal(homepageQuotes[66],'67676767676767676767');});
test('all entries equally eligible with no previous value',()=>{for(let i=0;i<100;i++)assert.equal(randomQuoteIndex(100,null,()=>(i+.5)/100),i);});
test('every previous index excludes itself and admits every other index once',()=>{for(let previous=0;previous<100;previous++){const selected=Array.from({length:99},(_,i)=>randomQuoteIndex(100,previous,()=>(i+.5)/99));assert.equal(new Set(selected).size,99);assert.ok(!selected.includes(previous));}});
test('invalid stored indices and tiny collections',()=>{for(const p of [-1,100,NaN,1.5])assert.equal(randomQuoteIndex(100,p,()=>.5),50);assert.equal(randomQuoteIndex(1,0),0);assert.equal(randomQuoteIndex(0,null),0);});
