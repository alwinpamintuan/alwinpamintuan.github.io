import { serveBuilds } from '../scripts/static-server.mjs';

const combined = process.argv.includes('--combined');
if (combined && !process.env.COMPANION_DIST) {
  throw new Error('test:integration requires COMPANION_DIST pointing to a complete résumé production build.');
}
await serveBuilds({ companion: combined ? process.env.COMPANION_DIST : undefined });
