# Stacked bar

Use for capacity or allocation in a compact space. This is a data chart, distinct from the task [progress bar](progress.md).

Follow the [minimal chart defaults](../SKILL.md#minimal-charts). Use a short title, the meter, and the category key needed to identify its segments. For capacity, a single used/total value with units may be useful; do not also repeat it as a percentage, free-space statistic, or footer summary unless requested.

```jsx
<StackedBar />
```

Exported from `charts.jsx`. The demo uses `STORAGE` `[name, value]` tuples and `CAPACITY = 100`. Adapt values, units, total, and accessible summary, or expose them as props. Values must be nonnegative and their sum must not exceed capacity; capacity must be positive.

```css
.chart-key { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.chart-key.is-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; }
.chart-key li { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: #a8a8a8; letter-spacing: -.01em; }
.chart-key i { width: 8px; height: 8px; flex: 0 0 auto; border-radius: 2px; }
.chart-key .mono-value { margin-left: auto; }
.chart-key li, .pie path, .meter span { transition: opacity 200ms ease; }
.chart .is-dim { opacity: .25; }
.meter { display: flex; gap: 2px; height: 8px; border-radius: 999px; overflow: hidden; clip-path: inset(0 round 999px); animation: meter-fill 700ms cubic-bezier(.22, 1, .36, 1) backwards; }
.meter span { min-width: 0; flex-basis: 0; }
.meter .is-free { background: rgba(255, 255, 255, .12); }
@keyframes meter-fill { from { clip-path: inset(0 100% 0 0 round 999px); } }
@media (max-width: 680px) {
  .chart-key.is-grid { column-gap: 20px; }
}
@media (max-width: 440px) {
  .chart-key.is-grid { grid-template-columns: 1fr; }
}
```

Use `flexGrow: value` for each segment and `flexGrow: capacity - used` for free space, so gaps do not overflow the meter. The shades are `#ffffff`, `#a3a3a3`, `#5c5c5c`, `#383838`; keep at most four displayed categories and fold extras into Other.

Only the meter reveals, left to right over 700ms on mount, by animating its `clip-path`. The title, any chosen capacity value, and key appear immediately. Hovering a segment or key row dims the other categories to .25 over 200ms. Use the `Key` helper for matching names, values, and square swatches; its two-column key becomes one column at 440px.

## Component

```jsx
/* The grays a series or a slice is drawn in, brightest first. Assigned in
   this order and never cycled — a fifth category folds into "Other". */
const SHADES = ['#ffffff', '#a3a3a3', '#5c5c5c', '#383838']

const dim = (hover, index) => (hover !== null && hover !== index ? 'is-dim' : '')

/* A key that doubles as a hover target: pointing at a row picks out its slice. */
function Key({ items, hover, onHover, format, grid = false }) {
  return (
    <ul className={`chart-key ${grid ? 'is-grid' : ''}`} onPointerLeave={() => onHover(null)}>
      {items.map(([name, value], index) => (
        <li key={name} className={dim(hover, index)} onPointerEnter={() => onHover(index)}>
          <i style={{ background: SHADES[index] }} />{name}<span className="mono-value">{format(value)}</span>
        </li>
      ))}
    </ul>
  )
}

const STORAGE = [['Media', 28.4], ['Documents', 17.6], ['Apps', 12.1], ['Other', 6.1]]

const CAPACITY = 100

/* A part-of-a-whole in one line: each category, then what is left as the
   faint track. Widths come from flex-grow, so the gaps never push it over. */
export function StackedBar() {
  const [hover, setHover] = useState(null)
  const used = STORAGE.reduce((sum, [, value]) => sum + value, 0)
  return (
    <div className="chart">
      <div className="control-row">
        <div><strong>Storage</strong><span>{used.toFixed(1)} of {CAPACITY} GB used</span></div>
      </div>
      <div className="meter" role="img" aria-label={STORAGE.map(([name, value]) => `${name} ${value} GB`).join(', ')}
        onPointerLeave={() => setHover(null)}>
        {STORAGE.map(([name, value], i) => (
          <span key={name} className={dim(hover, i)} style={{ flexGrow: value, background: SHADES[i] }}
            onPointerEnter={() => setHover(i)} />
        ))}
        <span className="is-free" style={{ flexGrow: CAPACITY - used }} />
      </div>
      <Key items={STORAGE} hover={hover} onHover={setHover} format={(value) => `${value} GB`} grid />
    </div>
  )
}
```

Source: [charts.jsx](../../src/charts.jsx), `StackedBar`, `Key`, `SHADES`, `dim`; [styles.css](../../src/styles.css), `.meter*`, `.chart-key*`, `meter-fill`.
