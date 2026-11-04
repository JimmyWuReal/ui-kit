# Pie chart

Use for a few parts of a whole, with names and percentages in a visible key. Assign brightness in this order: `#ffffff`, `#a3a3a3`, `#5c5c5c`, `#383838`. Keep at most four displayed categories; combine the remainder into Other rather than cycling colors.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts). The category key is needed to identify the slices; it is not permission to add a descriptive subtitle, overall total, change percentage, or summary footer. Keep each category's name and value in one place.

```jsx
<PieChart />
```

Exported from `charts.jsx`. Adapt the `TRAFFIC` `[name, value]` tuples, formatted percentages, and accessible summary, or expose data props. Values must be positive and sum to a positive total. The demo assumes its values already represent percentages.

```css
.chart-key { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.chart-key.is-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; }
.chart-key li { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: #a8a8a8; letter-spacing: -.01em; }
.chart-key i { width: 8px; height: 8px; flex: 0 0 auto; border-radius: 2px; }
.chart-key .mono-value { margin-left: auto; }
.chart-key li, .pie path, .meter span { transition: opacity 200ms ease; }
.chart .is-dim { opacity: .25; }
.pie-chart { display: flex; align-items: center; gap: 32px; }
.pie { width: 132px; height: 132px; flex: 0 0 auto; overflow: visible; }
.pie path { animation: slice-enter 400ms ease-out var(--delay) backwards; }
@keyframes slice-enter { from { opacity: 0; } }
@media (max-width: 680px) {
  .pie-chart { gap: 24px; }
  .pie { width: 104px; height: 104px; }
  .chart-key.is-grid { column-gap: 20px; }
}
@media (max-width: 440px) {
  .chart-key.is-grid { grid-template-columns: 1fr; }
}
```

The SVG uses a 100×100 viewBox, starts at twelve o'clock, and runs clockwise. Gaps are real geometry, leaving the underlying background visible. The source `slice` helper handles slices **smaller than half**; for a share of 50% or more, adapt the SVG arc / gap geometry or choose a bar / stacked bar. Skip zero-size slices.

Slices fade in over 400ms on mount; set `--delay: index * 60ms` on each. The heading and key appear immediately. Hovering a slice or its key dims the others to .25 over 200ms; labels retain category identity. Narrow-screen pie size is 104px and the gap is 24px. Keep the key's name and value aligned with an 8px square swatch.

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

const TRAFFIC = [['Direct', 42], ['Search', 28], ['Social', 18], ['Referral', 12]]

/* One slice of a pie, cut back 1 unit from each straight edge so
   neighbours are parted by an even gap all the way to the centre. Angles
   start at twelve o'clock and run clockwise. Slices must stay under half. */
function slice(from, to, radius = 50, gap = .8) {
  const point = (angle, distance) => [50 + distance * Math.sin(angle), 50 - distance * Math.cos(angle)]
  const half = (to - from) / 2
  const trim = Math.asin(gap / radius)
  const [cx, cy] = point(from + half, gap / Math.sin(half))
  const [sx, sy] = point(from + trim, radius)
  const [ex, ey] = point(to - trim, radius)
  return `M${cx},${cy}L${sx},${sy}A${radius},${radius} 0 0 1 ${ex},${ey}Z`
}

export function PieChart() {
  const [hover, setHover] = useState(null)
  const total = TRAFFIC.reduce((sum, [, value]) => sum + value, 0)
  let angle = 0
  return (
    <div className="chart">
      <div className="control-row">
        <div><strong>Traffic</strong></div>
      </div>
      <div className="pie-chart">
        <svg className="pie" viewBox="0 0 100 100" role="img"
          aria-label={TRAFFIC.map(([name, value]) => `${name} ${value}%`).join(', ')} onPointerLeave={() => setHover(null)}>
          {TRAFFIC.map(([name, value], i) => {
            const from = angle
            angle += (value / total) * Math.PI * 2
            return <path key={name} d={slice(from, angle)} fill={SHADES[i]} className={dim(hover, i)}
              style={{ '--delay': `${i * 60}ms` }} onPointerEnter={() => setHover(i)} />
          })}
        </svg>
        <Key items={TRAFFIC} hover={hover} onHover={setHover} format={(value) => `${value}%`} />
      </div>
    </div>
  )
}
```

Source: [charts.jsx](../../src/charts.jsx), `PieChart`, `slice`, `Key`, `SHADES`, `dim`; [styles.css](../../src/styles.css), `.pie*`, `.chart-key*`, `slice-enter`.
