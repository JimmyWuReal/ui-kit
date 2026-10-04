# Pie chart

Use for a few parts of a whole, with names and percentages in a visible key. Assign brightness in this order: `#ffffff`, `#a3a3a3`, `#5c5c5c`, `#383838`. Keep at most four displayed categories; combine the remainder into Other rather than cycling colors.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts). The category key is needed to identify the slices; it is not permission to add a descriptive subtitle, overall total, change percentage, or summary footer. Keep each category's name and value in one place.

```jsx
<PieChart />
```

Exported from `charts.jsx`. Adapt the `TRAFFIC` `[name, value]` tuples, formatted percentages, and accessible summary, or expose data props. Values must be positive and sum to a positive total. The demo assumes its values already represent percentages.

```css
.pie-chart { display: flex; align-items: center; gap: 32px; }
.pie { width: 132px; height: 132px; flex-shrink: 0; overflow: visible; }
.pie path { animation: slice-enter 400ms ease-out var(--delay,0ms) backwards; transition: opacity 200ms ease; }
.chart-key { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.chart .is-dim { opacity: .25; }
@keyframes slice-enter { from { opacity: 0; } }
```

The SVG uses a 100×100 viewBox, starts at twelve o'clock, and runs clockwise. Gaps are real geometry, leaving the underlying background visible. The source `slice` helper handles slices **smaller than half**; for a share of 50% or more, adapt the SVG arc / gap geometry or choose a bar / stacked bar. Skip zero-size slices.

Only slices may fade into view, with `index * 60ms` stagger. The heading and key appear immediately. Hovering a slice or its key dims the others to .25 over 200ms; labels retain category identity. Narrow-screen pie size is 104px and the gap is 24px. Keep the key's name and value aligned with an 8px square swatch.

Source: [charts.jsx](../../src/charts.jsx), `PieChart`, `slice`, `Key`, `SHADES`, `dim`; [styles.css](../../src/styles.css), `.pie*`, `.chart-key*`, `slice-enter`.
