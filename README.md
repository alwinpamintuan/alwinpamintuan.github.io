# John Alwin Pamintuan — project index

A personal static project hub built with Astro and strict TypeScript. The HTML index and expandable project previews are available without JavaScript; the client script enhances theme selection, highlighting, and motion.

## Local development

Use Node.js 24 or later and npm.

```sh
npm ci
npm run dev
```

Astro prints the local development URL. To verify and preview the production output:

```sh
npm run build
npm run preview
```

`build` runs `astro check` before creating the static `dist/` output. `npm run check` runs the type checks independently.

## Updating the index

Edit `src/data/projects.ts`. Each project entry has a stable ID, label, kind, factual description, absolute URL, and typed `preview` content: an overview, exactly three highlights, and a screenshot with `src`, `alt`, `width`, and `height`. The project index and SVG connections are generated from that same list at build time. IDs must be unique. The schematic expands vertically when entries are added.

Project rows are native disclosures. Each opens an inline preview with an explicit **Open project** link; multiple previews can stay open. All previews start collapsed on a fresh load. JavaScript enhances opening and closing with a 340ms height transition that reverses on repeated activation. Reduced motion makes it immediate. Without JavaScript, disclosures retain native operation and a short CSS reveal. The destination links use standard same-tab navigation. Expanding a project does not load or embed its application.

Screenshots live in `public/previews/` as optimized 1200 × 630 WebP images. IO uses a workstation capture; Raffler shows a local production preview with fictional participants. To replace a screenshot, capture the actual project UI with no personal data, export at the same dimensions and path, and update its alternative text when the visible content changes. CSS presents the unmodified assets as monochrome interface plates, blending them into the light or dark paper with grid margins, registration marks, a figure label, and a scale line. Images use intrinsic dimensions and lazy loading.

The separate `professionalHub` entry supplies the header's Résumé link. It is not counted, numbered, or drawn as a project. The homepage has no separate Professional section.

GitHub is an external profile link in the footer, also outside the project index and schematic. The indexed projects are IO and Raffler.

Keep page copy factual. The hub has no introduction or promotional copy. The light and dark palettes, type, spacing, and motion are defined in `src/styles/global.css`.

## Theme

The header's **Dark mode** button uses a sun/moon selector, matching the résumé site's header. Its selected icon and pressed state show the current theme; the tooltip describes the next action. The palettes and monospace typography also match the résumé site. A new visitor follows the system theme, including changes while the page is open. Choosing light or dark saves an explicit preference under `project-index:theme` in local storage, separate from other projects on this origin. That preference applies before first paint and overrides subsequent system changes. If storage is unavailable, the choice still works for the current page. To restore system following, remove that storage entry and reload.

The browser theme color and native control color scheme match the selected theme. Without JavaScript, CSS follows the system theme and the button stays hidden.

## GitHub Pages

The deployment origin is `https://alwinpamintuan.github.io`, with the default root base path. The repository must be named `alwinpamintuan.github.io` to publish at this address.

1. Connect these files to that repository, preserving any existing remote work. The initial workspace was empty and had no Git remote.
2. In repository **Settings → Pages**, select **GitHub Actions** as the publishing source.
3. Push to `main`, or run **Deploy project index** from the Actions tab. Adjust the workflow branch if the repository uses another default branch.
4. Confirm the workflow completes and the homepage renders at the configured origin.

The workflow installs from the lockfile, runs type checks and the build, and uploads only `dist/`. The existing résumé and IO are absolute links to separate sites; their source is not included here.

## Motion and accessibility

The motion toggle applies for the current page session. Reduced-motion preferences take priority and disable the toggle. Ambient animation pauses when the drawing is outside the viewport or the document is hidden. Without JavaScript, the toggle is hidden and the schematic is static. Project summaries toggle with Enter or Space and expose their expanded state natively. Summaries and links have visible keyboard focus; focus within a preview highlights its matching schematic branch and takes priority over pointer hover.

## Alternate workbench

`docs/workbench-spec.md` is a specification for a future alternate design, including its design language, storyboard, and acceptance criteria. No workbench route or executable demo is included. Documentation is excluded from the production output.
