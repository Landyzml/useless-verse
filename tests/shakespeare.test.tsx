import assert from 'node:assert/strict';
import { test } from 'node:test';
import { translate } from '../lib/shakespeare/translator';
import type { Options } from '../lib/shakespeare/types';
const pairs = [
 ["Don't you know?","Dost thou not know?"],["Aren't you ready?","Art thou not ready?"],

 ['Alice loves you.','Alice loves thee.'],['The dog saw you.','The dog saw thee.'],['You cannot tell.','Thou canst not tell.'],['I cannot tell.','I cannot tell.'],['You run.','Thou runnest.'],['You stopped.','Thou stoppedst.'],

 ['You are kind.','Thou art kind.'],['I love you.','I love thee.'],['This is your book.','This is thy book.'],['This book is yours.','This book is thine.'],
 ['You have a beautiful voice.','Thou hast a beautiful voice.'],['You can help me.','Thou canst help me.'],['She has a letter.','She hath a letter.'],
 ['Do you know me?','Dost thou know me?'],['Are you ready?','Art thou ready?'],['Will you help me?','Wilt thou help me?'],
 ['I do not know.','I know not.'],['You do not understand me.','Thou dost not understand me.'],['You have forgotten your promise.','Thou hast forgotten thy promise.'],
 ['Why are you looking at me?','Wherefore art thou looking at me?'],['I saw you.','I saw thee.'],['You saw me.','Thou sawest me.'],
 ['You should trust yourself.','Thou shouldst trust thyself.'],["You're kind.",'Thou art kind.'],["You've forgotten.",'Thou hast forgotten.'],
 ["You didn't help me.",'Thou didst not help me.'],['You were waiting.','Thou wast waiting.'],['If you were here.','If thou wert here.'],
 ['You know me; I know you.','Thou knowest me; I know thee.'],['You will always remember me.','Thou wilt always remember me.'],['Can you hear me?','Canst thou hear me?'],
 ['You really love music.','Thou really lovest music.'],['I want you to go.','I want thee to go.'],['I think you know.','I think thou knowest.'],
 ['You all are ready.','You all are ready.'],['You and I are ready.','You and I are ready.'],['You both have your books.','You both have your books.'],
 ['Come here. I am here.','Come hither. I am here.'],['Go there. She is there.','Go thither. She is there.'],['Where are you?','Where art thou?'],
 ['Thou art kind.','Thou art kind.'],['I love thee.','I love thee.'],['You glorp beautifully.','You glorp beautifully.'],
 ['You speak and listen.','Thou speakest and listenest.'],['You are running.','Thou art running.'],['You have been running.','Thou hast been running.'],
 ['YOU ARE KIND!','THOU ART KIND!'],['You love me.\nI love you.','Thou lovest me.\nI love thee.'],
 ['“You are kind,” I said.','“Thou art kind,” I said.'],['You know Alice.','Thou knowest Alice.'],
 ['You have 12 books on 2026-11-07.','Thou hast 12 books on 2026-11-07.'],['You use https://example.com/you?q=why and your_id.','Thou usest https://example.com/you?q=why and your_id.'],
 ['Email you@example.com.','Email you@example.com.'],['Please help me.','Prithee, help me.'],['Do not leave.','Do not leave.'],['You could not know.','Thou couldst not know.'],
 ['You walked home.','Thou walkedst home.'],['This is your hour and your university.','This is thine hour and thy university.'],['You like café music 🎭.','Thou likest café music 🎭.'],
];
for(const [input,expected] of pairs)test(input,()=>assert.equal(translate(input,{syntax:"subtle"}).text,expected));
const modes:[string,Options,string][]=[['You are kind.',{address:'formal'},'You are kind.'],['You are beautiful.',{style:'dramatic'},'Thou art fair.'],['She loves you.',{style:'dramatic'},'She loveth thee.'],['Please help me.',{style:'dramatic',address:'formal'},'I pray you, help me.']];
for(const [input,options,expected] of modes)test(JSON.stringify(options)+input,()=>assert.equal(translate(input,{...options,syntax:"subtle"}).text,expected));
test('empty and whitespace',()=>{assert.equal(translate('').text,'');assert.equal(translate(' \n ').text,'');});
test('length limits count Unicode code points',()=>{assert.throws(()=>translate('x'.repeat(1501)),RangeError);assert.doesNotThrow(()=>translate('🎭'.repeat(1500)));});
test('safe HTML-like input is data',()=>assert.match(translate('<script>alert(1)</script>').text,/<script>/));
test('existing output remains stable',()=>{const a=translate('You have forgotten your promise.').text;assert.equal(translate(a).text,a);});
test('explanations reflect real edits',()=>{const r=translate('You are kind.');assert.ok(r.changes.some(c=>c.from==='You'&&c.to==='Thou'));assert.ok(r.changes.some(c=>c.from==='are'&&c.to==='art'));});
