import assert from 'node:assert/strict';
import { test } from 'node:test';
import { translate } from '../lib/shakespeare/translator';
import { analyze } from '../lib/shakespeare/analyzer';
import { tokenize } from '../lib/shakespeare/tokenizer';
import { validCandidate } from '../lib/shakespeare/validation';
import type { Options } from '../lib/shakespeare/types';
const positives:[string,string,string,Options?][]=[
 ['My heart is heavy.','Heavy is my heart.','S01'],['The dawn was bright.','Bright was the dawn.','S01'],['Your courage is great.','Great is thy courage.','S01'],['We are ready.','Ready are we.','S01'],['You are very kind.','Very kind art thou.','S01'],
 ['I know this.','This I know.','S02'],['We remember those promises.','Those promises we remember.','S02'],['You will remember these words.','These words thou wilt remember.','S02'],['I cannot accept this fate.','This fate I cannot accept.','S02'],['I have read the old letter.','The old letter I have read.','S02'],
 ['You will remember these words.','These words wilt thou remember.','S03',{syntax:'theatrical'}],['We could hear this song.','This song could we hear.','S03',{syntax:'theatrical'}],
 ['I shall speak tomorrow.','Tomorrow shall I speak.','S04'],['You will return tonight.','Tonight wilt thou return.','S04'],['We would leave today.','Today would we leave.','S04'],
 ['I stood upon the hill.','Upon the hill I stood.','S05'],['We slept under the tree.','Under the tree we slept.','S05'],['She stayed in the house.','In the house she stayed.','S05'],
 ['I will never forget you.','Never will I forget thee.','S06'],['You have never seen this.','Never hast thou seen this.','S06'],['We can rarely hear them.','Rarely can we hear them.','S06'],['They had seldom heard her.','Seldom had they heard her.','S06'],
 ['Do you remember this?','Rememberest thou this?','S07'],['Does he know the answer?','Knows he the answer?','S07'],['Why do you fear me?','Wherefore fearest thou me?','S07'],['Do we trust them?','Trust we them?','S07'],
 ['Did you see him?','Sawest thou him?','S08'],['Did she write this?','Wrote she this?','S08'],['Did they hear me?','Heard they me?','S08'],
 ['I do not trust you.','I trust not thee.','S09'],['He does not believe me.','He believes not me.','S09'],['You did not see him.','Thou sawest not him.','S09'],['We do not fear them.','We fear not them.','S09'],
 ['Do not leave.','Leave not.','S10'],['Do not forget me.','Forget not me.','S10'],
 ['If I were king, I would help you.','Were I king, I would help thee.','S11'],['If she were here, she could help.','Were she here, she could help.','S11'],['If you were not ready, I would wait.','Wert thou not ready, I would wait.','S11'],
 ['If I had known, I would have helped.','Had I known, I would have helped.','S12'],['If we had not left, we might have seen him.','Had we not left, we might have seen him.','S12'],
 ['If you should need help, call me.','Shouldst thou need help, call me.','S13'],
 ['I will return when the sun rises.','When the sun rises, I will return.','S14'],['We will leave when Alice comes.','When Alice comes, we will leave.','S14'],
 ['I am afraid because the night is dark.','Because the night is dark, I am afraid.','S15'],['She will stay because we need her.','Because we need her, she will stay.','S15'],
 ['I will stay although the night is cold.','Although the night is cold, I will stay.','S16',{syntax:'theatrical'}],
 ['I wish I were king.','Would that I were king.','S17',{syntax:'theatrical'}],['I wish she were here.','Would that she were here.','S17',{syntax:'theatrical'}],
 ['I stood upon the hill.','I, upon the hill, stood.','S18',{syntax:'theatrical'}],
 ['I gave you this book.','This book I gave thee.','S19'],['We sent her the letter.','The letter we sent her.','S19'],
 ['I sing and dance.','I sing and I dance.','S20',{syntax:'theatrical'}],
];
for(const [input,expected,id,options] of positives)test(`syntax ${id}: ${input}`,()=>{const r=translate(input,options);assert.equal(r.text,expected);assert.ok(r.changes.some(c=>c.ruleId===id));});
const protectedInputs=[
 'Do you glorp this?', 'I do not glorp.', 'I did not glorp.', 'I do the work.', 'You do this task.',
 'The king killed the soldier.','The dog bites the man.','The man bites the dog.','I love the night, but I do not hate the day.',
 'The letter was written by Alice.','You are being watched.','The man who knows you is kind.','I know the man who saw you.',
 'I know that you have read the book that Mary gave you.','If I have money, I will help.','If I had a book, I read it.',
 'I know where the king is.','I wonder whether you will come.','I might not have seen him.','I saw nobody.',
 'I do not know nothing.','Do you not trust him?','Do not you know?','You glorp this widget.','I put the book on the table.',
 'I will only remember this.','I wish I could see him again.','I do know the answer.','This is a long and complicated unknown phrase.',
 'I know API_v2.','I saw https://example.com/this.','Write to Alice@example.com.','I will remember 42 on 2026-11-07.',
 'I came (because I had to) and she stayed.','“I know this,” Alice said.','I shall return if he says that you are ready.',
];
for(const input of protectedInputs)test(`no risky movement: ${input}`,()=>assert.equal(translate(input).changes.filter(c=>c.ruleId).length,0));
test('coordination composes two independent rules',()=>{const r=translate('I know this and I remember that.');assert.equal(r.text,'This I know and that I remember.');assert.equal(r.changes.filter(c=>c.ruleId==='S02').length,2);});
test('embedded wh subject case is corrected',()=>assert.equal(translate('I do not know why you have forgotten my name.').text,'I know not why thou hast forgotten my name.'));
for(const mode of ['subtle','shakespearean','theatrical'] as const){
 test(`modal force survives ${mode}`,()=>{for(const modal of ['will','shall','can','could','may','might','would','should']){const out=translate(`I ${modal} remember this.`,{syntax:mode}).text.toLowerCase();assert.match(out,new RegExp(`\\b${modal}\\b`));}});
 test(`names and patients survive ${mode}`,()=>{const out=translate('Alice killed Bob.',{syntax:mode}).text;assert.equal(out,'Alice killed Bob.');});
 test(`polarity survives ${mode}`,()=>{const out=translate('I do not trust you.',{syntax:mode}).text;assert.match(out,/\bnot\b/);assert.match(out,/trust/);});
}
test('intensity independent of style',()=>{assert.equal(translate('You are beautiful.',{syntax:'subtle',style:'dramatic'}).text,'Thou art fair.');assert.equal(translate('You are beautiful.',{syntax:'shakespearean',style:'classic'}).text,'Beautiful art thou.');});
test('formal address survives inversion',()=>assert.equal(translate('Do you know this?',{address:'formal'}).text,'Know you this?'));
test('no repeated rewrite of already fronted output',()=>{for(const input of ['I know this.','My heart is heavy.','I will never forget you.']){const first=translate(input).text;assert.equal(translate(first).text,first);}});
test('paragraphs and punctuation remain intact',()=>assert.equal(translate('I know this!\nMy heart is heavy.').text,'This I know!\nHeavy is my heart.'));
test('unknown structural parse reports uncertainty by declining',()=>{assert.equal(analyze(tokenize('the strange glorp thing').filter(t=>t.kind!=='space')),null);});
test('candidate safety rejects deleted content',()=>{const units=tokenize('I know this').filter(t=>t.kind!=='space');assert.equal(validCandidate(units,{units:units.slice(1),ruleId:'invalid',name:'invalid',explanation:'invalid',priority:1,confidence:1}),false);});
test('candidate safety rejects duplicate role tokens',()=>{const units=tokenize('I know this').filter(t=>t.kind!=='space');assert.equal(validCandidate(units,{units:[units[0],units[1],units[0]],ruleId:'invalid',name:'invalid',explanation:'invalid',priority:1,confidence:1}),false);});
