# John Alwin Pamintuan — Projects

Personal projects and experiments, built with Astro and TypeScript. Published at [alwinpamintuan.github.io](https://alwinpamintuan.github.io/), with the companion [résumé](https://alwinpamintuan.github.io/resume/) maintained in `../work`.

## Development and checks

Use Node.js 24 and npm.

```sh
npm ci
npx playwright install chromium
npm run dev
```

```sh
npm run build
npm run test:e2e
```

The build runs Astro type checks and writes static output to `dist/`. Browser tests use port 4323 and cover native project/contact destinations, loaded previews, keyboard access, theme persistence/migration, JavaScript-disabled use, responsive usability, and accessibility. Screenshots are captured only on failure; diagnostics stay under `.verification/`.

Every test must identify a concrete production failure it prevents. Use real builds and browser interactions, functional integration tests, and independent expected results. Do not add unit tests, mocked responses/browser APIs, cosmetic CSS assertions, DOM-fabricated scenarios, copy snapshots, or screenshots without an assertion. External URLs are native-link contracts; third-party availability is outside CI.

## Review both sites locally

Build the companion résumé and this site, then start the combined production preview:

```sh
npm --prefix ../work run build
npm run build
npm run preview:both
```

Open [Projects](http://127.0.0.1:4323/) or [Résumé](http://127.0.0.1:4323/resume/). `COMPANION_DIST` overrides the default `../work/dist` directory. Rebuild after changes and refresh. Stop the preview before running browser tests.

For live editing, use separate Astro dev servers on ports 4321 and 4322. Run the required combined-build journey separately (PowerShell):

```powershell
$env:COMPANION_DIST = (Resolve-Path ../work/dist).Path
npm run test:integration
```

This command requires complete builds of both sites and fails if the companion path is missing. It verifies navigation, downloads, and theme persistence across both builds. The preview maps the production home URL locally; each site's own suite independently checks its original production link URLs.

## Updating projects

Edit `src/data/projects.ts`. Keep IDs unique and stable. Projects appear in catalog order and pack automatically between the intro and résumé.

Screenshots live in `public/previews/`. Preserve original colors, intrinsic dimensions, and accurate alternative text. An optional `position` controls the desktop crop. Compact screens show the entire image. The first image loads eagerly and others load lazily.

The same data file contains the introduction, résumé destination, social profiles, and email. Career details and document exports belong in the companion repository. The apps themselves are maintained separately.

## Shared interface

- Use self-hosted Inter for prose and IBM Plex Mono for navigation and metadata, solid paper/charcoal surfaces, and cobalt links and focus rings. Font licenses are in `public/fonts/`.
- Mirror `src/styles/site-tokens.css`, `site-chrome.css`, `site-transitions.css`, `src/scripts/site-navigation.ts`, and `src/components/SiteFooter.astro` with the résumé repository. Keep page-specific layout styles separate.
- The sticky header links the owner's name home. The résumé adds current-page section navigation; cross-site discovery stays in page content. The shared contact footer contains GitHub, LinkedIn, Email, and Back to top.
- Preserve the `personal-site:theme` preference and migration from `project-index:theme`. Without a saved choice, follow system changes. Blocked storage still permits a choice for the current page; without JavaScript, CSS follows the system theme.
- Keep native links, visible focus, 44px minimum control targets, fine-pointer hover feedback, and immediate reduced-motion behavior. The introduction uses three explicit heading lines.

## Deployment

The `main` branch publishes to GitHub Pages through `.github/workflows/deploy.yml`. Pull requests build the candidate hub and the résumé repository's `main`, record both commit IDs, run the hub suite and combined journey, and gate deployment on those checks. Pushes to `main` and manual runs on `main` deploy only the hub's `dist/` artifact. GitHub Pages must use GitHub Actions as its source.

The site uses the origin root. The résumé remains a separate deployment under `/resume/`, and project destinations retain their existing paths.
