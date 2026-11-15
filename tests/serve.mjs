import { serveBuilds } from '../scripts/static-server.mjs';

await serveBuilds({ companion: process.env.COMPANION_DIST });
