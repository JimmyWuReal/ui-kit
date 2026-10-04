# Stacked bar

Use for capacity or allocation in a compact space. This is a data chart, distinct from the task [progress bar](progress.md).

```jsx
<StackedBar />
```

Exported from `charts.jsx`. The demo uses `STORAGE` `[name, value]` tuples and `CAPACITY = 100`. Adapt values, units, total, and accessible summary, or expose them as props. Values must be nonnegative and their sum must not exceed capacity; capacity must be positive.

```css
.meter { display: flex; gap: 2px; height: 8px; border-radius: 999px; overflow: hidden; clip-path: inset(0 round 999px); animation: meter-fill 700ms cubic-bezier(.22,1,.36,1) backwards; }
.meter span { min-width: 0; flex-basis: 0; transition: opacity 200ms ease; }
.meter .is-free { background: rgba(255,255,255,.12); }
.chart-key.is-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); column-gap: 28px; }
.chart .is-dim { opacity: .25; }
@keyframes meter-fill { from { clip-path: inset(0 100% 0 0 round 999px); } }
```

Use `flexGrow: value` for each segment and `flexGrow: capacity - used` for free space, so gaps do not overflow the meter. The shades are `#ffffff`, `#a3a3a3`, `#5c5c5c`, `#383838`; keep at most four displayed categories and fold extras into Other.

Only the meter reveals from left to right over 700ms. Header, percentage, and key appear immediately. Hovering a segment or key row dims the other categories to .25 over 200ms. Use the source `Key` helper for matching names, values, and square swatches; its two-column key becomes one column at 440px.

Source: [charts.jsx](../../src/charts.jsx), `StackedBar`, `Key`, `SHADES`, `dim`; [styles.css](../../src/styles.css), `.meter*`, `.chart-key*`, `meter-fill`.
