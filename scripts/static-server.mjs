import { createServer } from 'node:http';
import { access, readFile } from 'node:fs/promises';
import { resolve, extname, sep, join } from 'node:path';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.avif': 'image/avif', '.woff': 'font/woff', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain', '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export async function serveBuilds({ root = 'dist', companion, port = 4323 } = {}) {
  const hubRoot = resolve(root);
  const resumeRoot = companion ? resolve(companion) : undefined;
  for (const [label, directory] of [['Projects', hubRoot], ['Résumé', resumeRoot]]) {
    if (!directory) continue;
    try {
      await access(join(directory, 'index.html'));
      await access(join(directory, '_astro'));
    } catch {
      throw new Error(label + ' build is missing or incomplete at ' + directory + '. Run npm run build in that repository before starting the preview.');
    }
  }
  const server = createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    try {
      let path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (resumeRoot && path === '/resume') { response.writeHead(302, { Location: '/resume/' }).end(); return; }
      const isResume = Boolean(resumeRoot && path.startsWith('/resume/'));
      const directory = isResume ? resumeRoot : hubRoot;
      if (isResume) path = path.slice('/resume'.length);
      if (path.endsWith('/')) path += 'index.html';
      const file = resolve(directory, '.' + path);
      if (!file.startsWith(directory + sep)) { response.writeHead(403).end(); return; }
      const content = await readFile(file);
      response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
      // The deployed home URL becomes local only in this review server.
      const body = extname(file) === '.html'
        ? content.toString('utf8').replaceAll('href="https://alwinpamintuan.github.io/"', 'href="/"')
        : content;
      response.end(body);
    } catch { response.writeHead(404).end('Not found'); }
  });
  await new Promise((done, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', done);
  });
  return server;
}
