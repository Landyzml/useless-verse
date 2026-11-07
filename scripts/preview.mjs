import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain','.ico':'image/x-icon'};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    let status = 200;
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); await stat(file); }
    catch { file = resolve(root, '404.html'); status = 404; }
    const data = await readFile(file);
    res.writeHead(status, {'content-type':types[extname(file)] || 'application/octet-stream'});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(400).end('Bad request'); }
}).listen(3000, '127.0.0.1', () => console.log('Local: http://127.0.0.1:3000'));
