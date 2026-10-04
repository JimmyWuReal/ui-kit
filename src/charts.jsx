import React, { useLayoutEffect, useRef, useState } from 'react'

/* The charts. Drawn the way the flat controls are: white for the thing that
   matters, steps of gray for the rest, a hairline grid that stays out of the
   way, and values in mono. No hues — identity is carried by brightness and a
   label, never by colour alone. Hover is passing UI state, so it stays local. */

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

const dim = (hover, index) => (hover !== null && hover !== index ? 'is-dim' : '')

function Legend({ items }) {
  return (
    <div className="chart-legend">
      {items.map(([name, color]) => <span key={name}><i style={{ background: color }} />{name}</span>)}
    </div>
  )
}

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
        <div><strong>Visitors</strong><span>The past twelve months</span></div>
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

const REVENUE = [3120, 3380, 3240, 3610, 3490, 3820, 4050, 3910, 4180, 4420, 4260, 4610, 4880, 5140]
const DAYS = REVENUE.map((_, i) => new Date(2026, 8, 21 + i).toLocaleDateString('en', { month: 'short', day: 'numeric' }))

/* A headline number with its trend underneath. Pointing along the line
   scrubs the number back through the days. */
export function Sparkline() {
  const [ref, width] = useWidth()
  const [hover, setHover] = useState(null)
  const shown = hover ?? REVENUE.length - 1
  const change = shown ? (REVENUE[shown] / REVENUE[shown - 1] - 1) * 100 : 0
  const height = 56, inset = 5
  const min = Math.min(...REVENUE), max = Math.max(...REVENUE)
  const step = (width - inset * 2) / (REVENUE.length - 1)
  const x = (i) => inset + i * step
  const y = (value) => inset + (1 - (value - min) / (max - min)) * (height - inset * 2)

  return (
    <div className="chart">
      <div className="field-head">
        <span className="mono-label">{hover === null ? 'Revenue today' : DAYS[hover]}</span>
        <span className="mono-value">{change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>
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

const COMMITS = [['Mon', 12], ['Tue', 18], ['Wed', 9], ['Thu', 22], ['Fri', 16], ['Sat', 4], ['Sun', 7]]

/* The week so far. Past days sit at the hairline's gray; today is white.
   The whole column is the hover target, not just the bar. */
export function BarChart() {
  const max = 24
  const total = COMMITS.reduce((sum, [, count]) => sum + count, 0)
  return (
    <div className="chart">
      <div className="control-row">
        <div><strong>Commits</strong><span>This week</span></div>
        <span className="mono-value">{total} total</span>
      </div>
      <div>
        <div className="bars" role="img" aria-label={COMMITS.map(([day, count]) => `${day} ${count}`).join(', ')}>
          {COMMITS.map(([day, count], i) => (
            <div className="bar-slot" key={day}>
              <span className={`bar ${i === COMMITS.length - 1 ? 'is-today' : ''}`}
                style={{ height: `${(count / max) * 100}%`, '--delay': `${i * 40}ms` }}>
                <span className="chart-tip is-above"><b className="mono-value">{count}</b></span>
              </span>
            </div>
          ))}
        </div>
        <div className="bar-labels">{COMMITS.map(([day]) => <span className="mono-label" key={day}>{day}</span>)}</div>
      </div>
    </div>
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
        <div><strong>Traffic</strong><span>Where visitors came from</span></div>
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
        <span className="mono-value">{Math.round((used / CAPACITY) * 100)}%</span>
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
