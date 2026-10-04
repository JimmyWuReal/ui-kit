---
name: ui-kit
description: Design and implement minimal websites using Jimmy Wu's UI kit. Use when a site should use this kit's dark surfaces, depth buttons, flat controls, grayscale charts, and typography, or when adapting its existing components.
---

# UI Kit

Use this kit to compose a minimal site around the user's content and actions. Choose the content first, then read only the element, background, and text references needed for it. The tables below are a menu of available styles, not a checklist of things to include.

This skill works in Claude Code and Codex. Resolve relative file links from this file's real directory, following the installed skill symlink, rather than from the project you are designing. The installation keeps this repository's `skill/` and `src/` together.

## Design rules

- Use lit depth for primary and AI actions; keep other controls flat, with hairlines only where they define a control or state. Keep the page canvas and content surfaces flat by default.
- Start with a near-black page, gray surfaces, white emphasis, and quieter secondary text. Reserve red for destructive actions. Change colors when requested, preserving readable text and clear states.
- Use Inter for reading and controls, and DM Mono for useful labels and values. Load Inter 400/500/600 and DM Mono 400; keep system fallbacks. Georgia is an optional style for a quote when the content calls for one.
- Compose an actual page for the task. Gallery cells, expand buttons, surface pickers, type specimens, and demo copy belong to the showcase.
- Adapt labels, content, widths, and heights to the task. Retain the component's material, hierarchy, state behavior, and proportions. A primary action should be visually clear; use outline actions for supporting choices.
- Preserve keyboard operation, visible focus, accessible names, and disabled states. Critical instructions must be readable; brighten muted text when needed.

## Minimal composition

Minimalism applies to the whole page: its sections, words, controls, and decoration. Include an element when it helps the visitor understand the content or complete an intended action. If removing it loses no useful information or capability, leave it out. Do not fill space merely to make a page look finished.

- Separate sections with spacing, alignment, and type hierarchy. Omit decorative horizontal rules, header/footer borders, short accent lines, and routine dividers between cards or profile rows. Keep functional lines such as control outlines, focus indicators, chart marks, and necessary chart guides.
- Use a direct heading and only the supporting copy it needs. Omit default eyebrows, uppercase role/location tags, numbered section labels, badges, slogans, and repeated captions. Put each fact in one useful place. Do not shrink unnecessary copy into tiny mono text to justify keeping it.
- End the page when the requested content is complete. Do not append a quote, philosophy/principles block, testimonial, FAQ, or closing call to action without a content or task reason. A type style or component being available is not a reason to use it. Never invent a quote to decorate the page.
- Choose the fewest components that support the task. Add charts, stat cards, meters, tabs, filters, exports, or data tables only for a real need or an explicit request. A plain text block or link may be enough; not every group needs a card, icon, description, or button.
- Keep useful field labels, units, errors, and accessible names. For sample content, disclose that it is demo data once near the relevant content; repeat only where a separately viewed section would otherwise mislead. Minimal copy must still explain the interface honestly.
- Treat patterned backgrounds as an intentional optional choice. Do not add dots, grids, nested panels, monograms, or ornamental icons just to fill empty space.

For a personal introduction, use direct headings, a concise introduction, and flat panels where grouping helps. Include profile details, projects, and activity charts when requested. Omit the redundant `Developer · Taiwan` eyebrow when the profile already gives those facts, and omit the trailing quote and principles section unless requested. The showcase does not set a target section count or component inventory.

## Motion rule

**Only chart data marks may have appearing animations.** Every other element and text must be visible immediately on initial render, navigation, mounting, opening, or content reveal. This includes menus, dialogs, accordion bodies, tab panels, tooltips, digits, and updated counts. Do not add page fades, scroll reveals, staggered cards, or animated headings. Chart titles, axes, legends, and surrounding cards also appear immediately.

Hover, press, selection movement, and ongoing status feedback are allowed as described in the relevant element reference. These are local interactions, not permission to animate an element into view. A spinner may rotate while loading; a progress bar may track real progress. Initialize controls at their actual value without a startup sweep.

The showcase includes some non-chart entrance effects. **These instructions override those effects.** When reusing its stylesheet, place this compatibility block after it. When recreating a component, omit the corresponding entrance code entirely:

```css
.popup-backdrop, .popup, .tab-panel.is-entering, .code-digit,
.roll-up, .roll-down, .expand-overlay, .expand-content, .surface-picker {
  animation: none !important;
}
.select-menu, .accordion-panel, .accordion-panel p,
.tooltip, .tooltip-label, .chart-tip.is-above {
  transition: none !important;
}
.search-clear { transition-property: background-color, color; transform: none; }
.progress-end .icon-button { transition-property: color, background-color, box-shadow; }
.tooltip-anchor .icon-button > svg { transition: none; }
.expand-button { transition-property: color, background; }
/* Functional motion and chart entrances also respect reduced motion. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

## Shared foundation

Use plain CSS as the reference format. Tailwind or another styling system is fine if it preserves these values; use custom CSS for the button's inset lighting and chart geometry.

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Inter:wght@400;500;600&display=swap');

:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-synthesis: none;
  color: #fff;
  background: #090909;
  --rule: #262626;
  --line: rgba(255, 255, 255, .18);
  --line-hover: rgba(255, 255, 255, .34);
  --line-live: rgba(255, 255, 255, .72);
  --dim: #6f6f6f;
  --sub: #7d7d7d;
  --mono: 400 9px/1 'DM Mono', ui-monospace, monospace;
  --track: .14em;
}
* { box-sizing: border-box; }
body { margin: 0; background: #090909; }
button, input, textarea, select { font: inherit; }
button { color: inherit; }
.control-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.field-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.mono-label { font: var(--mono); letter-spacing: var(--track); color: var(--dim); text-transform: uppercase; }
.mono-value { font: 400 11px/1 'DM Mono', ui-monospace, monospace; color: #d6d6d6; font-variant-numeric: tabular-nums; }
button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid rgba(255, 255, 255, .8);
  outline-offset: 3px;
}
```

Keep backgrounds, spacing, and type consistent across a page. The showcase's useful layout defaults are a 1120px maximum page width, 20px grid gaps, and a 404px maximum single-control measure. These are starting points, not a required layout. At 680px and below, its grid becomes one column, gaps become 16px, and side gutters become 16px. Give wider charts enough space and avoid page overflow at 320px.

The foundation's border tokens and mono classes support functional controls and data. Their presence does not call for page dividers or extra labels.

## Elements

| Element | Place | Description | Use case |
| --- | --- | --- | --- |
| Primary / AI button | [button.md](elements/button.md) | Light or dark lit action | Create, submit, generate |
| Outline button | [button.md](elements/button.md) | Transparent hairline action | Export, cancel, supporting action |
| Icon button | [icon-button.md](elements/icon-button.md) | Compact hairline action | Copy, previous/next, replay |
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

The recipes work as design references on their own. Their short CSS examples emphasize construction values; references identify the complete source rules and dependencies to reuse for a working implementation. In this repository, reuse the React components and corresponding CSS rather than rebuilding their state logic:

| Source | Find |
| --- | --- |
| [src/controls.jsx](../src/controls.jsx) | Exported controls and their props / keyboard behavior |
| [src/charts.jsx](../src/charts.jsx) | Exported charts, SVG helpers, and demo data |
| [src/main.jsx](../src/main.jsx) | Button, checkbox, toggle, card markup; `SURFACES`, `typeScale` |
| [src/styles.css](../src/styles.css) | Complete class rules; search the selectors named in each reference |

Usage snippets assume the control is imported and its state variable / setter are defined in the destination component. In a different project, copy the chosen component, its helper/import dependencies, and relevant class rules. Avoid importing the entire showcase stylesheet: it includes gallery layout and decoration unrelated to the new page. The named exports in `controls.jsx` and `charts.jsx` can be imported; the demo functions in `main.jsx` cannot. Extract only the needed markup without copying the gallery, its surrounding labels, or its `createRoot` call. The source uses React and `lucide-react`; charts use SVG without a chart library. Charts currently contain sample data rather than data props: adapt the data and accessible summaries together.

Before finishing, make a subtraction pass over the whole page: remove redundant words, decorative lines, unnecessary wrappers and controls, and sections added only to showcase the kit. Then check it on a narrow screen, operate its controls with a keyboard, and verify the motion rule on both first render and revealed content. Keep shared decisions here and element-specific behavior in the references. When updating kit values, update the matching reference too.
