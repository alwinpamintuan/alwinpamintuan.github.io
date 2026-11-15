import { fileURLToPath } from 'node:url';
import { serveBuilds } from './static-server.mjs';

try {
  await serveBuilds({
    root: fileURLToPath(new URL('../dist/', import.meta.url)),
    companion: process.env.COMPANION_DIST || fileURLToPath(new URL('../../work/dist/', import.meta.url)),
  });
  console.log('Projects: http://127.0.0.1:4323/');
  console.log('Résumé:   http://127.0.0.1:4323/resume/');
} catch (error) {
  console.error(error.code === 'EADDRINUSE'
    ? 'Port 4323 is already in use. Stop the existing preview on that port, then run npm run preview:both again.'
    : error.message);
  process.exitCode = 1;
}
