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

The build runs Astro type checks and writes static output to `dist/`. Browser tests use port 4323 and cover project launches, keyboard access, themes, reduced motion, JavaScript-disabled use, responsive layouts, and accessibility. Generated screenshots and traces stay under `.verification/`.

## Review both sites locally

Build the companion résumé and this site, then start the combined production preview:

```sh
npm --prefix ../work run build
npm run build
npm run preview:both
```

Open [Projects](http://127.0.0.1:4323/) or [Résumé](http://127.0.0.1:4323/resume/). `COMPANION_DIST` overrides the default `../work/dist` directory. Rebuild after changes and refresh. Stop the preview before running browser tests.

For live editing, use separate Astro dev servers on ports 4321 and 4322. For cross-site browser checks, set `COMPANION_DIST` to the résumé build before running `npm run test:e2e`; these checks are skipped when no companion build is supplied.

## Updating projects

Edit `src/data/projects.ts`. Keep IDs unique and stable. Cards use each entry's label, description, URL, and `preview.screenshot`; the data also retains supporting project facts. The first project is wider on desktop, subsequent cards flow automatically, and the résumé card fills an unpaired final row.

Screenshots live in `public/previews/`. Preserve original colors, intrinsic dimensions, and accurate alternative text. An optional `position` controls the desktop crop. Compact screens show the entire image. The first image loads eagerly; others load lazily. Adding a project requires no header or layout changes.

The same data file contains the introduction, résumé destination, social profiles, and email. Career details and document exports belong in the companion repository. The apps themselves are maintained separately.

## Shared interface

- Use self-hosted Inter for prose and IBM Plex Mono for navigation and metadata, solid paper/charcoal surfaces, and cobalt links and focus rings. Font licenses are in `public/fonts/`.
- Mirror `src/styles/site-tokens.css`, `site-chrome.css`, `site-transitions.css`, `src/scripts/site-navigation.ts`, and `src/components/SiteFooter.astro` with the résumé repository. Keep page-specific layout styles separate.
- The sticky header links the owner's name home. The résumé adds current-page section navigation; cross-site discovery stays in page content. The shared contact footer contains GitHub, LinkedIn, Email, and Back to top.
- Preserve the `personal-site:theme` preference and migration from `project-index:theme`. Without a saved choice, follow system changes. Blocked storage still permits a choice for the current page; without JavaScript, CSS follows the system theme.
- Keep the hub shell at least one screen tall, with a bottom-aligned footer and a centered desktop grid when content fits. Let longer pages grow without stretching cards.
- Keep native links, visible focus, 44px minimum control targets, fine-pointer hover feedback, and immediate reduced-motion behavior. The introduction uses three explicit heading lines.

## Deployment

The `main` branch publishes to GitHub Pages through `.github/workflows/deploy.yml`. Pull requests run the build and browser checks; pushes to `main` and manual runs on `main` deploy the resulting `dist/` artifact. GitHub Pages must use GitHub Actions as its source.

The site uses the origin root. The résumé remains a separate deployment under `/resume/`, and project destinations retain their existing paths.
