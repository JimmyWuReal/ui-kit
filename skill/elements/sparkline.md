# Sparkline

Use for a compact metric whose current value matters more than a full set of axes. The kit puts a 36px headline value above a small white trend line.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts): one metric label, one main value, and the trend. Omit change percentages, extra totals, period recaps, and footer summaries unless explicitly requested. Do not place a separate sparkline summary beside a full chart of the same metric merely to fill a stats row.

```jsx
<Sparkline />
```

Exported from `charts.jsx`. The demo uses hardcoded `REVENUE` and `DAYS`; adapt the values, dates, currency, and accessible summary together. It does not accept data props yet.

```css
.chart-end { transition: cx 160ms cubic-bezier(.22, 1, .36, 1), cy 160ms cubic-bezier(.22, 1, .36, 1), opacity 160ms ease; }
.stat-value { font-size: 36px; font-weight: 500; line-height: 1; letter-spacing: -.045em; font-variant-numeric: tabular-nums; }
.stat-value.is-small { font-size: 28px; letter-spacing: -.04em; }
```

Plot height is 56px with 5px insets. The line draws over 900ms on mount, using the [line chart](line-chart.md)'s `.chart-line` / `draw` recipe and SVG helpers. The headline and label render immediately. Avoid counting the headline up or fading it.

Pointer movement scrubs the displayed value / date and moves the endpoint; leaving restores the latest value. **Keep the dot's smooth movement:** use one persistently mounted `.chart-end` circle with a stable key, and update its `cx`/`cy` using the 160ms transition above. Do not conditionally mount it or key it by the inspected value. The value and date text update immediately. Offer the same inspection through keyboard focus without adding a permanent detail row; the source is pointer-only. Handle fewer than two points and constant values (`max === min`) before adapting the demo's scale. Keep a readable default value when hover is unavailable.

## Component

```jsx
const REVENUE = [3120, 3380, 3240, 3610, 3490, 3820, 4050, 3910, 4180, 4420, 4260, 4610, 4880, 5140]

const DAYS = REVENUE.map((_, i) => new Date(2026, 8, 21 + i).toLocaleDateString('en', { month: 'short', day: 'numeric' }))

/* A headline number with its trend underneath. Pointing along the line
   scrubs the number back through the days. */
export function Sparkline() {
  const [ref, width] = useWidth()
  const [hover, setHover] = useState(null)
  const shown = hover ?? REVENUE.length - 1
  const height = 56, inset = 5
  const min = Math.min(...REVENUE), max = Math.max(...REVENUE)
  const step = (width - inset * 2) / (REVENUE.length - 1)
  const x = (i) => inset + i * step
  const y = (value) => inset + (1 - (value - min) / (max - min)) * (height - inset * 2)

  return (
    <div className="chart">
      <div className="field-head">
        <span className="mono-label">{hover === null ? 'Revenue today' : DAYS[hover]}</span>
      </div>
      <strong className="stat-value">${REVENUE[shown].toLocaleString()}</strong>
      <div className="chart-plot" ref={ref} style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label="Daily revenue over two weeks, rising from $3,120 to $5,140."
            onPointerMove={(event) => setHover(nearest(event, inset, step, REVENUE.length))}
            onPointerLeave={() => setHover(null)}>
            {hover !== null && <line className="chart-cross" x1={x(hover)} x2={x(hover)} y1={0} y2={height} />}
            <path className="chart-line" stroke={SHADES[0]} pathLength="1" d={smoothPath(REVENUE.map((value, i) => [x(i), y(value)]))} />
            <circle className="chart-end" cx={x(shown)} cy={y(REVENUE[shown])} r={4} fill={SHADES[0]} />
          </svg>
        )}
      </div>
    </div>
  )
}
```

Source: [charts.jsx](../../src/charts.jsx), `Sparkline`, `REVENUE`, `DAYS`, shared SVG helpers; [styles.css](../../src/styles.css), `.stat-value`, `.chart-line`, `.chart-end`.
