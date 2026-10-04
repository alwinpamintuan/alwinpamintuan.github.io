# John Alwin Pamintuan — project index

A personal static project hub built with Astro and strict TypeScript. The HTML index is available without JavaScript; the client script only enhances highlighting and motion.

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

Edit `src/data/projects.ts`. Each project entry has a stable ID, label, kind, factual description, and absolute URL. The project index and SVG connections are generated from that same list at build time. IDs must be unique. The schematic expands vertically when entries are added.

The separate `professionalHub` entry renders the unnumbered Résumé link in the **Professional** section. It is not counted, numbered, or drawn as a project; it leads to the existing tailored professional hub.

GitHub is an external profile link in the footer, also outside the project index and schematic. The indexed projects are IO and Raffler.

Keep page copy as factual labels. The hub has no introduction or promotional copy. The light monochrome palette, type, spacing, and motion are defined in `src/styles/global.css`.

## GitHub Pages

The deployment origin is `https://alwinpamintuan.github.io`, with the default root base path. The repository must be named `alwinpamintuan.github.io` to publish at this address.

1. Connect these files to that repository, preserving any existing remote work. The initial workspace was empty and had no Git remote.
2. In repository **Settings → Pages**, select **GitHub Actions** as the publishing source.
3. Push to `main`, or run **Deploy project index** from the Actions tab. Adjust the workflow branch if the repository uses another default branch.
4. Confirm the workflow completes and the homepage renders at the configured origin.

The workflow installs from the lockfile, runs type checks and the build, and uploads only `dist/`. The existing résumé and IO are absolute links to separate sites; their source is not included here.

## Motion and accessibility

The motion toggle applies for the current page session. Reduced-motion preferences take priority and disable the toggle. Ambient animation pauses when the drawing is outside the viewport or the document is hidden. Without JavaScript, the toggle is hidden and the schematic is static. Project links have visible keyboard focus and standard same-tab navigation.

## Alternate workbench

`docs/workbench-spec.md` is a specification for a future alternate design, including its design language, storyboard, and acceptance criteria. No workbench route or executable demo is included. Documentation is excluded from the production output.
