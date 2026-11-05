---
name: ui-kit
description: Design, implement, review, and refine user interfaces with Jimmy Wu's UI kit. Use automatically for UI and frontend work, including pages, layouts, components, styling, animation, responsive behavior, and visual polish, even when the user does not mention the kit. Respect existing project design systems and the user's explicit design choices.
---

# UI Kit

Use this kit to compose a minimal site around the user's content and actions. Choose the content first, then read only the element, background, and text references needed for it. The tables below are a menu of available styles, not a checklist of things to include.

This skill works in Claude Code and Codex. Resolve relative file links from this file's real directory, following the installed skill symlink, rather than from the project you are designing. A linked install keeps this repository's `skill/` and `src/` together; a copied install may have `skill/` alone, and the references are complete without `src/`.

## Design rules

- Default to the flat `outline-button` for regular actions, including primary, submit, and AI / generate actions. Keep other controls flat, with hairlines only where they define a control or state. Keep the page canvas and content surfaces flat by default.
- Reserve the gradient `primary-button` and `depth-button` for CTAs in the homepage hero section only, and use them only when the user requests a homepage hero section. **Use at most two gradient buttons across the entire website, counting both variants together.** Use outline buttons everywhere else; do not add a hero section just to use gradients.
- Start with a near-black page, gray surfaces, white emphasis, and quieter secondary text. Reserve red for destructive actions. Change colors when requested, preserving readable text and clear states.
- Use Inter for reading and controls, and DM Mono for useful labels and values. Load Inter 400/500/600 and DM Mono 400; keep system fallbacks. Georgia is an optional style for a quote when the content calls for one.
- Compose an actual page for the task. Gallery cells, expand buttons, surface pickers, type specimens, and demo copy belong to the showcase; use them only when the task is itself a gallery, design system, or preview tool.
- Adapt labels, content, widths, and heights to the task. Retain the component's material, hierarchy, state behavior, and proportions. Make the primary action clear through its label and placement.
- Preserve keyboard operation, visible focus, accessible names, and disabled states.
- Keep text at 4.5:1 or better on the surface it lands on. `--dim` and `--sub` clear that on every kit surface, up to the raised `#1c1c1c`. Check any gray you add.
- Give touch screens 44px targets, sharing the width only where a row cannot fit them, and hide nothing behind hover on them; see [touch.md](touch.md).

## Minimal composition

Minimalism applies to the whole page: its sections, words, controls, and decoration. Include an element when it helps the visitor understand the content or complete an intended action. If removing it loses no useful information or capability, leave it out. Do not fill space merely to make a page look finished.

- Separate sections with spacing, alignment, and type hierarchy. Omit decorative horizontal rules, header/footer borders, short accent lines, and routine dividers between cards or profile rows. Keep functional lines such as control outlines, focus indicators, chart marks, and necessary chart guides.
- Use a direct heading and only the supporting copy it needs. Omit default eyebrows, uppercase role/location tags, numbered section labels, badges, slogans, and repeated captions. Put each fact in one useful place. Do not shrink unnecessary copy into tiny mono text to justify keeping it.
- End the page when the requested content is complete. Do not append a quote, philosophy/principles block, testimonial, FAQ, or closing call to action without a content or task reason. A type style or component being available is not a reason to use it. Never invent a quote to decorate the page.
- Choose the fewest components that support the task. Add charts, stat cards, meters, tabs, filters, exports, or data tables only for a real need or an explicit request. A plain text block or link may be enough; not every group needs a card, icon, description, or button.
- Keep useful field labels, units, errors, and accessible names. For sample content, disclose that it is demo data once near the relevant content; repeat only where a separately viewed section would otherwise mislead. Minimal copy must still explain the interface honestly.
- Treat patterned backgrounds as an intentional optional choice. Do not add dots, grids, nested panels, monograms, or ornamental icons just to fill empty space.

For a personal introduction, use direct headings, a concise introduction, and flat panels where grouping helps. Include profile details, projects, and activity charts when requested. Omit the redundant `Developer · Taiwan` eyebrow when the profile already gives those facts, and omit the trailing quote and principles section unless requested. The showcase does not set a target section count or component inventory.

## Minimal charts

Use the referenced chart's visual construction, not an expanded analytics card. Decide what is visible before copying markup. These defaults apply to every chart reference and override extra copy or metrics in older showcase examples.

- Start with one short metric title, the plot, and sparse readable axis ticks. Include units in the title or axis when needed. At most one main number may accompany the plot when it represents the chart's primary metric; it is optional.
- Omit subtitles, corner annotations, summary footers, period recaps, change percentages, averages, streaks, active-day counts, and additional KPI rows unless the user explicitly requests those details. A request for a chart, dashboard, or demo data does not request every statistic you can calculate.
- For a commits chart, `Commits`, an optional primary total such as `674`, and the dated plot are enough. Do not add `Weekly totals`, `78 active days out of 90`, `Latest week`, or `37 commits · 7 days` by default. A tooltip may show that bucket's date and value while inspected; do not repeat it in a permanent footer.
- Preserve the requested data granularity. Do not replace daily observations with weekly totals to make a chart look simpler. Reduce tick-label density instead. If aggregation is requested, make it clear in the existing title or axis rather than adding another explanatory label.
- Use a legend only to identify multiple series or otherwise unnamed categories. A single named series needs no legend. Show point details on hover and keyboard focus, then dismiss them when inspection ends; keep accessible chart descriptions without adding visible summary prose.
- A number that is not the chart's own goes outside the chart. A lifetime total beside a 30-day plot belongs in a [stat row](patterns/stat-row.md) or the page heading above it, not in the chart's title block.
- Put a shared date-range control or demo-data disclosure once near the chart group when needed. Do not repeat its range, day count, or explanation inside each chart. Add export controls or a visible data table only when requested or necessary to complete the user's task.

Before finishing a chart, inspect every text node outside the plot: keep the title, any chosen primary value, and labels necessary to interpret the data. Remove the rest unless it was explicitly requested. Do not replace removed labels with new wording that communicates the same extra statistics.

## Motion

**Motion is part of the kit.** The site's animations are the specification, and every element reference carries them: its transitions, keyframes, and the state logic that triggers them. When you use an element, its motion comes with it. Do not flatten it with `transition: none`, an `!important` override, or a static recreation. Read [motion.md](motion.md) before building or changing anything interactive; it explains the system and lists every timing.

- **The page is complete when it paints.** No page fades, scroll reveals, staggered cards, animated headings, counting numbers, or route transitions.
- **Chart data marks are the one mount animation.** Lines draw, bars grow, slices fade, and the meter reveals. Chart titles, axes, legends, and surrounding cards appear immediately.
- **Everything else answers the user or real state.** Selecting moves a thumb. Menus, popups, accordions, tooltips, and tab panels animate as they open. A stepped number rolls and a typed digit rises. A spinner turns while loading, and a progress bar tracks real progress.
- **Controls mount at rest.** Initialize them at their actual value, without a startup sweep.
- **Transition when a node persists; keyframe when a node is new.** Keep persistent nodes mounted so they ease both ways. Move one thumb or marker rather than fading each option.
- **Use the kit's timing.** Moving things use `cubic-bezier(.22, 1, .36, 1)`, drawn strokes use `cubic-bezier(.65, 0, .35, 1)`, and color and opacity use `ease` or `ease-out`. Most interactions take 140–320ms. Do not invent new curves or add an animation library.
- **Add motion only where the kit has it.** A new element takes the motion of its closest kit element, not a new effect.

**Preserve smooth hover-dot movement on line charts and sparklines.** Keep the marker mounted and glide its `cx`/`cy` to the inspected point over 160ms using the chart reference's easing. This interaction is part of the kit, even on a minimal chart. Do not recreate the marker on each hover. Tooltip text and values update immediately; reduced-motion mode uses immediate marker movement.

## Touch

Read [touch.md](touch.md) for any page used on a phone or tablet. It holds one CSS block that gives controls a 44px target, stretching the target around small controls rather than redrawing them. That block goes **last** in the stylesheet: placed earlier, element rules of equal specificity override it, and nothing looks wrong until you measure.

## Shared foundation

Use plain CSS as the reference format. Tailwind or another styling system is fine if it preserves these values; use custom CSS for the button's inset lighting and chart geometry.

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Inter:wght@400;500;600&display=swap');

:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  color: #fff;
  background: #000;
  font-synthesis: none;

  --rule: #262626;
  --pad: 36px;
  --col: 404px;

  --mono: 400 9px/1 'DM Mono', ui-monospace, monospace;
  --track: .14em;
  --dim: #848484;
  --sub: #8c8c8c;

  /* The flat controls are drawn with a hairline and nothing else. Three
     steps of the same line: at rest, under the cursor, and in use. */
  --line: rgba(255, 255, 255, .18);
  --line-hover: rgba(255, 255, 255, .34);
  --line-live: rgba(255, 255, 255, .72);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #090909;
}
button, input, textarea { font: inherit; }
button { color: inherit; }
.mono-label {
  font: var(--mono);
  letter-spacing: var(--track);
  color: var(--dim);
  text-transform: uppercase;
}
a:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
.control-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.control-row > div:first-child,
.checkbox-row > span:last-child,
.radio-row > span:last-child { display: flex; flex-direction: column; gap: 5px; }
.control-row strong,
.checkbox-row strong,
.radio-row strong { font-size: 13px; font-weight: 500; letter-spacing: -.01em; }
.control-row > div:first-child span,
.checkbox-row small,
.radio-row small { font-size: 11.5px; color: var(--sub); }
.field-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.mono-value { font: 400 11px/1 'DM Mono', ui-monospace, monospace; color: #d6d6d6; font-variant-numeric: tabular-nums; }
button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid rgba(255, 255, 255, .8); outline-offset: 3px; }
```

Every page also gets the site's reduced-motion rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

Keep backgrounds, spacing, and type consistent across a page. The showcase's useful layout defaults are a 1120px maximum page width, 20px grid gaps, and a 404px maximum single-control measure. These are starting points, not a required layout; the [site shell](elements/site-shell.md) has the exact frame. At 680px and below, its grid becomes one column, gaps become 16px, and side gutters become 16px. Give wider charts enough space and avoid page overflow at 320px.

The foundation's border tokens and mono classes support functional controls and data. Their presence does not call for page dividers or extra labels.

## Elements

| Element | Place | Description | Use case |
| --- | --- | --- | --- |
| Outline button (default) | [button.md](elements/button.md) | Flat transparent hairline action | Regular actions, including create, submit, generate, export, cancel |
| Gradient buttons (hero only) | [button.md](elements/button.md) | Light primary or dark depth variant | Requested homepage hero CTAs only; at most two per website combined |
| Icon button | [icon-button.md](elements/icon-button.md) | Compact hairline action, with a quiet variant | Copy, previous/next, replay, actions repeated down a list |
| Card | [card.md](elements/card.md) | Solid gray content block | Project or resource summary |
| Popup | [popup.md](elements/popup.md) | Raised confirmation dialog | Confirm a destructive action |
| Checkbox | [checkbox.md](elements/checkbox.md) | Independent binary choice | Remember device, preferences |
| Toggle | [toggle.md](elements/toggle.md) | Immediate on/off switch | Notifications, enabled settings |
| Text field | [text-field.md](elements/text-field.md) | Labeled single-line field | Email, name, short text |
| Radio group | [radio-group.md](elements/radio-group.md) | One choice with descriptions | Plans or exclusive settings |
| Segmented control | [segmented.md](elements/segmented.md) | White moving selection thumb | View mode or compact navigation |
| Slider | [slider.md](elements/slider.md) | Continuous value on a thin track | Volume, percentage, range |
| Stepper | [stepper.md](elements/stepper.md) | Bounded number with +/- actions | Seats or quantity |
| Select | [select.md](elements/select.md) | Field with a raised option menu | Region or a longer option list |
| Search | [search.md](elements/search.md) | Search field with clear action | Filter or find content |
| Text area | [text-area.md](elements/text-area.md) | Multiline field with a counter | Message or short description |
| Code input | [code-input.md](elements/code-input.md) | One real input drawn as digit boxes | Verification code |
| Chips | [chips.md](elements/chips.md) | Multiple selectable pills | Interests or filters |
| Tabs | [tabs.md](elements/tabs.md) | Underlined section navigation | Related content panels |
| Accordion | [accordion.md](elements/accordion.md) | One open detail section | FAQs or optional details |
| Progress | [progress.md](elements/progress.md) | Thin determinate status bar | Upload or processing progress |
| Tooltip / copy | [tooltip.md](elements/tooltip.md) | Raised hint and copy feedback | Explain an icon or confirm copying |
| Pagination | [pagination.md](elements/pagination.md) | Page numbers with a white thumb | Small paginated result sets |
| Spinner | [spinner.md](elements/spinner.md) | Hairline rotating ring | Ongoing work without a percentage |
| Rating | [rating.md](elements/rating.md) | Five interactive stars | Collect a 1–5 score |
| Line chart | [line-chart.md](elements/line-chart.md) | Smooth grayscale comparison | Trends over time |
| Sparkline | [sparkline.md](elements/sparkline.md) | Headline value with a small trend | Compact metric summary |
| Bar chart | [bar-chart.md](elements/bar-chart.md) | Baseline bars with a bright current bar | Counts by day or category |
| Pie chart | [pie-chart.md](elements/pie-chart.md) | Gapped slices with a labeled key | A few parts of a whole |
| Stacked bar | [stacked-bar.md](elements/stacked-bar.md) | Thin capacity meter with a key | Storage or allocation |

## App patterns

How the elements combine in a product. For an app page, start here and adapt these rather than inventing a row, board, or calendar. On the site they are the **Patterns** page.

| Pattern | Place | Description | Use case |
| --- | --- | --- | --- |
| List row | [list-row.md](patterns/list-row.md) | Checkbox row with hover-revealed quiet actions | Tasks, files, members |
| Toolbar | [toolbar.md](patterns/toolbar.md) | Tabs and an action on one hairline | An action for a whole list or board |
| Empty state | [empty-state.md](patterns/empty-state.md) | What is missing and the action that fills it | First runs, no results, finished lists |
| Stat row | [stat-row.md](patterns/stat-row.md) | Cards with one value each | Page-level figures, numbers that are not a chart's own |
| Board | [board.md](patterns/board.md) | Snapping columns that show the next one | Items moving through stages |
| Calendar | [calendar.md](patterns/calendar.md) | Month of day cells with an agenda | Things arranged by date |

## Showcase patterns

The site's own frame and tools. Reach for these when the task calls for them; a normal page usually needs at most part of the shell.

| Pattern | Place | Description | Use case |
| --- | --- | --- | --- |
| Site shell | [site-shell.md](elements/site-shell.md) | Column, header, brand, nav, footer, section head | A site or small app's frame |
| Gallery | [gallery.md](elements/gallery.md) | Two-column cells and sample cards | Component galleries and previews |
| Expanded view | [expanded-view.md](elements/expanded-view.md) | Full-screen element view with a surface picker | Inspecting one element or preview |
| Type specimens | [specimens.md](texts/specimens.md) | Typeface cards and the type table | Design system pages; a base for data tables |

## Backgrounds

| Background | Place | Description | Use case |
| --- | --- | --- | --- |
| Black | [black.md](backgrounds/black.md) | Near-black #090909 | Default page canvas |
| Card | [card.md](backgrounds/card.md) | Flat #111111 | Group content on the canvas |
| Raised | [raised.md](backgrounds/raised.md) | Flat #1c1c1c | Menus, tooltips, dialogs |
| Dot matrix | [dots.md](backgrounds/dots.md) | 1px dots on a 16px grid | Sparse visual structure |
| Grid | [grid.md](backgrounds/grid.md) | 1px lines every 24px | Alignment or editor canvas |
| Checker | [checker.md](backgrounds/checker.md) | 20px repeating checker tile | Preview transparency |

## Texts

| Text family | Place | Description | Use case |
| --- | --- | --- | --- |
| Reading | [reading.md](texts/reading.md) | Display, title, heading, quote, description, body, caption | Page hierarchy and prose |
| Interface | [interface.md](texts/interface.md) | Button, field, option, panel, and control roles | Controls, navigation, supporting copy |
| Mono | [mono.md](texts/mono.md) | Values, eyebrows, field labels | Numbers, counts, metadata, axes |

## Use the source

Every reference is complete together with the references it links to. Its CSS blocks are the site's rules verbatim, including all motion, and its `Component` block is the site's React code. The shared foundation above and those links are the only other CSS an element needs. Copy these into a project rather than rebuilding their state logic, because that logic is often what triggers the animation.

The components use React and `lucide-react`; add their imports when copying. Charts use SVG without a chart library. Charts contain sample data rather than data props: adapt the data and accessible summaries together, then apply the [minimal chart defaults](#minimal-charts) to the visible content. When combining references, drop repeated rules and keep the first copy, so a shared rule (one naming several elements, such as the field box) stays above each element's own rules. The cascade depends on that order. Usage snippets assume the state variable and setter exist in the destination component. Adapt demo labels, such as the search placeholder, to the task.

When `../src` exists beside this file, you are in the kit's repository or a linked install, and these are the originals:

| Source | Find |
| --- | --- |
| [src/controls.jsx](../src/controls.jsx) | Exported controls and their props / keyboard behavior |
| [src/charts.jsx](../src/charts.jsx) | Exported charts, SVG helpers, and demo data |
| [src/patterns.jsx](../src/patterns.jsx) | Exported app patterns |
| [src/main.jsx](../src/main.jsx) | Button, card, checkbox, toggle, text-field markup; `App`, `ExpandedView`, `Cell`, `TypeTable`, `PatternsPage`; `SURFACES`, `typeScale` |
| [src/styles.css](../src/styles.css) | The complete stylesheet |

Inside this repository, reuse the named exports from `controls.jsx`, `charts.jsx`, and `patterns.jsx`. In another project, copy only the chosen components and rules. Avoid importing the entire showcase stylesheet: it includes gallery layout and decoration unrelated to the new page. The demo functions in `main.jsx` cannot be imported; extract only the needed markup, without the gallery, its surrounding labels, or its `createRoot` call.

## Before finishing

Make a subtraction pass over the whole page: remove redundant words, decorative lines, unnecessary wrappers and controls, and sections added only to showcase the kit.

Then check it in a browser, because these failures look fine in the code:

- **Overrides.** Read the computed style of anything you overrode. An equal-specificity rule later in the file wins silently.
- **Motion.** At first paint only chart marks and real status move, and every control still has its kit motion when used. See [motion.md](motion.md#checking-your-work).
- **Keyboard.** Operate every control, and reach anything shown on hover.
- **Narrow screens.** Load it at 320px, with no sideways page scroll and nothing clipped.
- **Touch.** With touch emulated, measure targets and capture phone screenshots as [touch.md](touch.md#measuring) describes. `fullPage` screenshots lose touch emulation.
- **Contrast.** Measure small gray text against the surface it actually sits on.

Keep shared decisions here, motion rules in [motion.md](motion.md), touch rules in [touch.md](touch.md), and element-specific behavior in the references. When updating kit values or motion, update the matching reference and `motion.md` too.
