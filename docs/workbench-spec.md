# John Alwin Pamintuan — spatial workbench specification

**Status: unimplemented alternate concept.** This document describes a future local prototype. The current delivery is the project-index homepage; no workbench page, route, or demo has been built or published.

## Purpose and content

A personal navigation surface collecting existing projects and destinations. It opens on the links themselves, without an introduction, hero, promotional narrative, invitation, simulated telemetry, or prose addressing a visitor.

Use the typed project list and separate `professionalHub` entry from `src/data/projects.ts` as the content source. Résumé is an unnumbered professional destination, not an indexed project. GitHub is a footer profile link rather than a scene module or project. Preserve ordinary anchor navigation and the exact destinations:

| Section | Module | Description | Destination |
| --- | --- | --- | --- |
| Projects | IO | Peripheral testing | https://alwinpamintuan.github.io/io/ |
| Projects | Raffler | Raffle draws | https://alwinpamintuan.github.io/raffler/ |
| Professional | Résumé | Professional hub | https://alwinpamintuan.github.io/resume/ |
| Footer | GitHub | Profile link | https://github.com/alwinpamintuan |

Use **John Alwin Pamintuan** for the header, central origin, title, and metadata. Email remains an understated footer link to `mailto:alwinpamintuan@gmail.com`.

## Spec sheet: composition

- Desktop: a drawing canvas occupies approximately two-thirds of the content width, with a compact ordinary text index in the remaining third. Maximum content width is 1080px.
- Place the indexed project modules IO in the upper-left quadrant and Raffler in the upper-right. Place an unnumbered Résumé module below the center in a distinct **Professional** area. Join the modules to a central origin labeled John Alwin Pamintuan, keeping the professional connection visually separate from the project branches. GitHub remains an ordinary footer link outside the scene.
- The modules are abstract geometric frames, rather than illustrations of a physical desk or devices. Fine connections form a readable relationship diagram.
- Each module shows its name immediately. Reserve space for its factual description; revealing it does not move neighboring elements or the module label.
- Keep all three destinations and the text index visible on a typical desktop viewport. Permit ordinary document scrolling at small heights and increased text sizes.
- At 800px and below, put the text index and separate Professional section first, then replace the large spatial arrangement with a simplified vertical drawing below them. Do not shrink text to retain the desktop composition.
- No navigation action requires dragging, panning, zooming, hover, or interpreting the diagram. Do not include placeholder modules for imaginary projects.

## Design language

| Element | Specification |
| --- | --- |
| Surface | Warm paper, `#f3f2ec` |
| Primary ink | `#111` |
| Secondary text | `#62625c`; maintain 4.5:1 contrast for ordinary text |
| Rules | `#d4d3ca`, 1px |
| Drawing guides | `#e5e4dc`; decorative only |
| Typeface | System monospace: ui-monospace, SFMono-Regular, Consolas, Liberation Mono |
| Body and descriptions | 16px desktop; never below 14px for meaningful labels |
| Secondary annotations | 12px minimum; never required to navigate |
| Spacing | 8px base rhythm, with 24–48px between major groups |
| Module shape | Hairline corner frames, square corners, understated selection ring |
| Connections | Single-pixel curves with consistent curvature and aligned endpoints |
| Focus | Solid ink outline, 2px, with enough offset to separate it from the frame |
| Depth | At most 4px interactive lift; no heavy shadows, gloss, or perspective that harms legibility |

Use the same shared tokens as the main homepage. Grid fragments and registration marks support alignment; they never obscure text. Motion belongs to frames, connection lines, and signals, rather than labels. Avoid artificial coordinates, counters, status lights, availability claims, or uptime readouts.

## Motion storyboard

| Moment | State and motion | Timing |
| --- | --- | --- |
| Initial render | Every name, ordinary link, and text index is immediately visible and actionable. The layout is already complete. | 0–200ms |
| Connection entrance | Fine paths extend from the origin toward the three modules. Labels remain stationary. | 200–800ms |
| Frame settling | Corner frames settle from at most a 6px offset. No scale bounce or opacity gate blocks access. | 800–1400ms |
| Idle | A low-contrast signal moves along a connection. Stagger the three signals; avoid synchronized pulsing. | One cycle every 8–12s |
| Hover or keyboard focus | Selected module frame rises at most 4px, its connection darkens, and its description appears in reserved space. The text-index entry and scene module share selection state. | 250ms |
| Release | Frame and connection return softly. Keyboard focus takes priority over pointer hover when both exist. | 300ms |
| Activation | Follow the ordinary anchor immediately. No exit transition delays navigation. | Immediate |
| Reduced motion | All connections and frames are static; selection outline changes immediately. Disable entrance, ambient signals, pointer response, lift, and smooth scrolling. | Immediate |

Use `cubic-bezier(.22, 1, .36, 1)` for settling and interaction; use linear timing for traveling signals. Fine-pointer response may offset the diagram by at most 3px, without changing hit targets or label positions. Coarse pointers receive no pointer response.

## Interaction and accessibility

- The ordinary index is the authoritative navigation. Names and descriptions are available in the accessible link text without hovering.
- Scene modules are ordinary anchors with the same names and destinations as the text index. They have logical focus order, visible focus outlines, and synchronized selection state with the index. Selecting a module opens its destination immediately. Only the decorative connection lines and drawing guides are `aria-hidden`.
- Keep module targets at least 44px high. Touch activates destinations directly; it never requires a first tap merely to reveal a label.
- Apply selection styling to keyboard focus as well as hover. Do not move or steal focus. Focus must never be hidden by the scene.
- With JavaScript disabled, the text index and contact link work and the drawing is static.
- Provide a clearly labeled motion button using `aria-pressed`. The setting applies for the current page session. The operating-system reduced-motion preference takes priority and disables the button with a readable explanation available to assistive technology.
- Pause active animation when the document is hidden or the drawing is offscreen. Resume without replaying the entrance. Offscreen pausing must never hide labels or navigation.
- Stop ambient signals when motion is turned off. Retain selection styling for navigation. Reduced motion also removes all lift and pointer effects.
- Keep the prototype local until a later request explicitly includes it in publication. It is not part of the current deployment artifact.

## Future acceptance checklist

- [ ] Header, title, origin, and metadata use John Alwin Pamintuan.
- [ ] All content is factual labels; there is no introduction or visitor-directed copy.
- [ ] Scene and index destinations match the shared typed data.
- [ ] Résumé belongs to the separate Professional section, with no project number or contribution to the project count.
- [ ] GitHub appears only as an external profile link in the footer, outside the numbered index and scene.
- [ ] Desktop layout follows the three-module arrangement; mobile puts the index first.
- [ ] 320px-wide screens and 200% zoom have readable labels, usable controls, and no unintended horizontal overflow.
- [ ] Every destination works with keyboard, touch, and JavaScript disabled.
- [ ] Descriptions are accessible without hover and their reveal causes no layout shift.
- [ ] Keyboard focus has priority over pointer hover and remains visibly indicated.
- [ ] Entrance, idle, hover/focus, release, and activation match the storyboard timings.
- [ ] Reduced motion disables all movement while retaining immediate selection feedback.
- [ ] Motion control, document visibility, and offscreen suspension work without replaying entrance animation.
- [ ] No drag, pan, or zoom is necessary, and pointer effects are absent on coarse pointers.
- [ ] No console errors, external font dependencies, or runtime API requests occur.
- [ ] A subagent reviews the actual future prototype, and all findings are resolved before claiming completion.
