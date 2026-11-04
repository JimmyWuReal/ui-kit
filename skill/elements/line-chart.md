# Line chart

Use for comparable trends over time. The kit uses a 2px white main series, a `#5c5c5c` comparison, a 1px `--rule` grid, and mono axes / values. Lines are smooth without overshooting the data.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts). Use a short title and labeled axes; include a legend for multiple series, and omit it for a single named series. Do not add a period subtitle, growth badge, latest-value footer, or derived statistics by default. Preserve the requested observation interval.

```jsx
<LineChart />
```

Exported from `charts.jsx`. This is a working demo with `MONTHS` and `VISITORS` constants, not a component with data props. Adapt those or expose a data prop; update the scale, any needed legend, and accessible summary with the data. Keep an explicitly labeled scale.

```css
.chart { display: flex; flex-direction: column; gap: 20px; }
.chart-plot { position: relative; }
.chart-plot svg { display: block; overflow: visible; touch-action: pan-y; }
.chart-grid { stroke: var(--rule); stroke-width: 1; shape-rendering: crispEdges; }
.chart-axis { font: var(--mono); letter-spacing: var(--track); fill: var(--dim); text-transform: uppercase; }
.chart-line {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  animation: draw 900ms cubic-bezier(.65, 0, .35, 1) backwards;
}
.chart-cross { stroke: var(--line); stroke-width: 1; shape-rendering: crispEdges; }
.chart-end { transition: cx 160ms cubic-bezier(.22, 1, .36, 1), cy 160ms cubic-bezier(.22, 1, .36, 1), opacity 160ms ease; }
.chart-legend { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px 14px; font-size: 11.5px; color: var(--sub); }
.chart-legend span { display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; }
.chart-legend i { width: 10px; height: 2px; border-radius: 1px; }
.chart-tip {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 8px;
  color: #a8a8a8;
  background: #1c1c1c;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
}
.chart-tip b { margin-left: auto; padding-left: 14px; font-weight: 400; }
.chart-tip.is-above b { padding: 0; }
.chart .is-dim { opacity: .25; }
.chart-tip.is-above {
  bottom: calc(100% + 8px);
  left: 50%;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 160ms ease-out, transform 200ms cubic-bezier(.22, 1, .36, 1);
}
@keyframes draw { from { stroke-dashoffset: 1; } }
```

Set `pathLength="1"` on each data path so the draw animation works. Only the paths draw in, over 900ms on mount; header, legend, axes, and grid render immediately. Keep path nodes stable during hover so the entrance does not replay.

The plot is 180px high with 30px left, 6px right, 10px top, and 26px bottom insets. Keep `useWidth` / ResizeObserver for real-pixel SVG dimensions. `smoothPath` assumes at least two finite points with distinct increasing x positions; handle empty / one-point data before calling it. Set safe domains for new data.

Pointer movement snaps a crosshair and tooltip to the nearest observation; the tooltip flips sides past the middle. The crosshair and tooltip have no entrance: they mount and update immediately, unlike the bar chart's tooltip.

**Keep the moving hover dot.** Render one persistent `.chart-end` circle per series, including while inactive, and update its `cx`/`cy` as inspection moves. Use a stable series key; never key the plot or circle by the hovered index/value. `at` holds the last inspected position after `hover` clears, so the dots glide between points over 160ms and fade out in place when the pointer leaves. The source is pointer-only; apply the same movement to keyboard inspection when adapting it.

Provide an accessible summary and make point values available through keyboard focus too. Do not add a visible summary or data table just to supplement the chart; include one when requested or needed for the task.

## Component

```jsx
/* The grays a series or a slice is drawn in, brightest first. Assigned in
   this order and never cycled — a fifth category folds into "Other". */
const SHADES = ['#ffffff', '#a3a3a3', '#5c5c5c', '#383838']

/* SVG is drawn in real pixels, so lines and text never stretch. */
function useWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, width]
}

/* A smooth curve through every point that never overshoots them — a
   monotone cubic (Fritsch–Carlson), the same as d3's curveMonotoneX. Peaks
   stay where the data peaks, rather than bulging past it. */
function smoothPath(points) {
  const n = points.length
  const slope = (a, b) => (b[1] - a[1]) / (b[0] - a[0])
  const secants = points.slice(1).map((point, i) => slope(points[i], point))
  const tangents = points.map((_, i) => {
    if (i === 0) return secants[0]
    if (i === n - 1) return secants[n - 2]
    const [s0, s1] = [secants[i - 1], secants[i]]
    return s0 * s1 <= 0 ? 0 : (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), Math.abs(s0 + s1) / 4)
  })
  return points.reduce((path, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = points[i - 1]
    const h = (x - px) / 3
    return `${path}C${px + h},${py + tangents[i - 1] * h} ${x - h},${y - tangents[i] * h} ${x},${y}`
  }, '')
}

/* The index of the point nearest the pointer, along an evenly spaced axis. */
const nearest = (event, left, step, count) => {
  const offset = event.clientX - event.currentTarget.getBoundingClientRect().left - left
  return Math.max(0, Math.min(count - 1, Math.round(offset / step)))
}

function Legend({ items }) {
  return (
    <div className="chart-legend">
      {items.map(([name, color]) => <span key={name}><i style={{ background: color }} />{name}</span>)}
    </div>
  )
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const VISITORS = [
  ['This year', SHADES[0], [2100, 2600, 2400, 3200, 3900, 3600, 4300, 4800, 4500, 5200, 5600, 5900]],
  ['Last year', SHADES[2], [1800, 1900, 2300, 2200, 2700, 3100, 2900, 3400, 3800, 3600, 4100, 4400]],
]

/* Two smooth lines on a four-step grid. A crosshair snaps to the nearest
   month and a tooltip reads out both years; it flips side past the middle
   so it never runs off the edge. */
export function LineChart() {
  const [ref, width] = useWidth()
  const [hover, setHover] = useState(null)
  // Where the dots sit. Unlike hover it outlives the pointer, so they fade where they were.
  const [at, setAt] = useState(MONTHS.length - 1)
  const height = 180, left = 30, right = 6, top = 10, bottom = 26
  const max = 6000
  const step = (width - left - right) / (MONTHS.length - 1)
  const x = (i) => left + i * step
  const y = (value) => top + (1 - value / max) * (height - top - bottom)

  return (
    <div className="chart">
      <div className="control-row">
        <div><strong>Visitors</strong></div>
        <Legend items={VISITORS} />
      </div>
      <div className="chart-plot" ref={ref} style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} role="img"
            aria-label="Visitors by month. This year rises from 2,100 to 5,900; last year from 1,800 to 4,400."
            onPointerMove={(event) => {
              const index = nearest(event, left, step, MONTHS.length)
              setHover(index)
              setAt(index)
            }}
            onPointerLeave={() => setHover(null)}>
            {[0, 2000, 4000, 6000].map((tick) => (
              <g key={tick}>
                <line className="chart-grid" x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} />
                <text className="chart-axis" x={0} y={y(tick)} dy=".32em">{tick ? `${tick / 1000}K` : 0}</text>
              </g>
            ))}
            {MONTHS.map((month, i) => i % 2 === 0 &&
              <text className="chart-axis" key={month} x={x(i)} y={height - 4} textAnchor="middle">{month}</text>)}
            {hover !== null && <line className="chart-cross" x1={x(hover)} x2={x(hover)} y1={top} y2={height - bottom} />}
            {/* Last year first, so this year is drawn over it. */}
            {[...VISITORS].reverse().map(([name, color, values]) => (
              <path key={name} className="chart-line" stroke={color} pathLength="1"
                d={smoothPath(values.map((value, i) => [x(i), y(value)]))} />
            ))}
            {/* Always mounted, so they glide between months like the sparkline's dot,
                and fade out in place when the pointer leaves. */}
            {VISITORS.map(([name, color, values]) =>
              <circle key={name} className="chart-end" cx={x(at)} cy={y(values[at])} r={4} fill={color}
                style={{ opacity: hover === null ? 0 : 1 }} />)}
          </svg>
        )}
        {hover !== null && (
          <div className="chart-tip" style={{
            top: top, left: x(hover) + (hover < MONTHS.length / 2 ? 12 : -12),
            transform: hover < MONTHS.length / 2 ? 'none' : 'translateX(-100%)',
          }}>
            <span className="mono-label">{MONTHS[hover]}</span>
            {VISITORS.map(([name, color, values]) => (
              <span className="chart-tip-row" key={name}>
                <i style={{ background: color }} />{name}<b className="mono-value">{values[hover].toLocaleString()}</b>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

Source: [charts.jsx](../../src/charts.jsx), `LineChart`, `useWidth`, `smoothPath`, `nearest`, `Legend`; [styles.css](../../src/styles.css), `.chart*`, `draw`.
