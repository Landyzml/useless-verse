import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('out');
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const required = ['index.html','about/index.html','shakespeare-translator/index.html','404.html','.nojekyll'];
for (const path of required) assert.ok((await stat(join(root,path))).isFile(), `Missing export: ${path}`);
async function files(dir) { const entries=await readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]))).flat(); }
const htmlFiles=(await files(root)).filter(f=>f.endsWith('.html'));
let checked=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/\b(?:src|href)="([^"#]+)"/g)){
  const url=match[1].replaceAll('&amp;','&');
  if(!url.startsWith('/')||url.startsWith('//'))continue;
  const path=decodeURIComponent(url.split(/[?#]/)[0]);
  assert.ok(!prefix||path===prefix||path.startsWith(prefix+'/'), `Asset/link bypasses ${prefix}: ${url}`);
  const local=resolve(root,'.'+(prefix?path.slice(prefix.length):path));
  assert.ok(local===root||local.startsWith(root+'/'), 'Path outside export');
  let target=local;
  const info=await stat(target).catch(()=>null);
  if(info?.isDirectory())target=join(target,'index.html');
  assert.ok((await stat(target).catch(()=>null))?.isFile(), `Missing linked export: ${url} in ${file}`);
  checked++;
 }
 assert.doesNotMatch(html,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}/,'Credential-shaped content in HTML');
}
console.log(`Static export verified: ${htmlFiles.length} HTML files, ${checked} local asset/link references, base path ${prefix||'/'}.`);
