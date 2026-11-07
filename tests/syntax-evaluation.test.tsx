/** Held-out evaluation authored after the rule set and regression tests were frozen. */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { translate } from '../lib/shakespeare/translator';
const heldOut:[string,string][]=[
 ['Our journey was long.','Long was our journey.'],
 ['Her promise is true.','True is her promise.'],
 ['We shall visit tomorrow.','Tomorrow shall we visit.'],
 ['They had never heard the news.','Never had they heard the news.'],
 ['I could remember those distant voices.','Those distant voices I could remember.'],
 ['Did we keep the promise?','Kept we the promise?'],
 ['Do you understand this warning?','Understandest thou this warning?'],
 ['Why did they leave the house?','Wherefore left they the house?'],
 ['She did not hear us.','She heard not us.'],
 ['Do not open the gate.','Open not the gate.'],
 ['We sent him those letters.','Those letters we sent him.'],
 ['I will wait because she is afraid.','Because she is afraid, I will wait.'],
 ['We shall return when the king comes.','When the king comes, we shall return.'],
 ['If we were rich, we could help them.','Were we rich, we could help them.'],
 ['If she had heard, she would have returned.','Had she heard, she would have returned.'],
 ['The servant who saw Alice returned yesterday.','The servant who saw Alice returned yesterday.'],
 ['Alice sent Bob 19 messages.','Alice sent Bob 19 messages.'],
 ['The bridge was built by them.','The bridge was built by them.'],
];
for(const [input,expected] of heldOut)test('held-out: '+input,()=>assert.equal(translate(input).text,expected));
