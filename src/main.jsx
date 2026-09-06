import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Check, ChevronDown, Info, Plus, Sparkles, X } from 'lucide-react'
import './styles.css'

const SERIES = [10.0, 11.9, 10.9, 16.6, 14.9, 21.0, 19.5, 22.9, 21.4, 24.9]
const AXIS = [25, 20, 15, 10]
const VIEW = { w: 240, h: 84, min: 8, max: 26 }

const round = (n) => Math.round(n * 100) / 100
const yAt = (value) => ((VIEW.max - value) / (VIEW.max - VIEW.min)) * VIEW.h
const samples = SERIES.map((value, i) => [(i / (SERIES.length - 1)) * VIEW.w, yAt(value)])

/* Cardinal spline through the samples — the raw polyline read as a sawtooth. */
function smooth(points, tension = 0.2) {
  let d = `M ${round(points[0][0])} ${round(points[0][1])}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    d += ` C ${round(p1[0] + (p2[0] - p0[0]) * tension)} ${round(p1[1] + (p2[1] - p0[1]) * tension)}`
    d += `, ${round(p2[0] - (p3[0] - p1[0]) * tension)} ${round(p2[1] - (p3[1] - p1[1]) * tension)}`
    d += `, ${round(p2[0])} ${round(p2[1])}`
  }
  return d
}

const linePath = smooth(samples)
const areaPath = `${linePath} L ${VIEW.w} ${VIEW.h} L 0 ${VIEW.h} Z`
const lastPoint = samples[samples.length - 1]

function Cell({ className = '', children }) {
  return (
    <section className={`grid-cell ${className}`}>
      <div className="cell-content">{children}</div>
    </section>
  )
}

function DepthButton() {
  return (
    <button className="depth-button" type="button">
      <span className="button-content">
        <span className="button-icon"><Sparkles size={17} strokeWidth={2.15} /></span>
        <span>Create with AI</span>
      </span>
    </button>
  )
}

function PrimaryButton() {
  return (
    <button className="primary-button" type="button">
      <span className="button-content">
        <span className="button-icon"><Plus size={17} strokeWidth={2.15} /></span>
        <span>Create project</span>
      </span>
    </button>
  )
}

function ElementsPage() {
  const [enabled, setEnabled] = useState(true)
  const [checked, setChecked] = useState(true)
  const [plan, setPlan] = useState('Professional')
  const [menuOpen, setMenuOpen] = useState(false)
  const [alertVisible, setAlertVisible] = useState(true)
  const [progress, setProgress] = useState(68)

  return (
      <div className="component-grid" id="top">
        <Cell className="cell-button">
          <div className="button-group">
            <PrimaryButton />
            <DepthButton />
          </div>
        </Cell>

        <Cell className="cell-toggle">
          <div className="control-row">
            <div><strong>Notifications</strong><span>Product updates</span></div>
            <button className={`toggle ${enabled ? 'is-on' : ''}`} type="button" role="switch"
              aria-checked={enabled} aria-label="Toggle product notifications" onClick={() => setEnabled(!enabled)}>
              <span />
            </button>
          </div>
        </Cell>

        <Cell className="cell-input">
          <label className="mono-label" htmlFor="email">EMAIL ADDRESS</label>
          <div className="text-field-wrap">
            <input id="email" type="email" defaultValue="studio@form.co" />
            <kbd>&#8629;</kbd>
          </div>
        </Cell>

        <Cell className="cell-checkbox">
          <label className="checkbox-row">
            <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
            <span className="checkbox-box"><Check size={14} strokeWidth={2.6} /></span>
            <span><strong>Remember me</strong><small>Keep this device signed in</small></span>
          </label>
        </Cell>

        <Cell className="cell-chart">
          <div className="chart-heading">
            <div><span className="mono-label">ACTIVE USERS</span><strong>24,892</strong></div>
            <span className="trend"><ArrowUpRight size={12} strokeWidth={2.6} />18.4%</span>
          </div>
          <div className="chart-plot">
            <div className="y-labels" aria-hidden="true">
              {AXIS.map((value) => (
                <span className="mono-label" key={value} style={{ top: `${(yAt(value) / VIEW.h) * 100}%` }}>{value}K</span>
              ))}
            </div>
            <div className="plot-area">
              <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} preserveAspectRatio="none" role="img"
                aria-label="Active users from March to June, rising from 10K to 24,892">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity=".26" />
                    <stop offset=".55" stopColor="#ffffff" stopOpacity=".06" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  {/* Closing the area on the last sample leaves a hard wall; fade it out instead. */}
                  <linearGradient id="chartEdge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset=".88" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <mask id="chartEdgeMask" maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW.w} height={VIEW.h}>
                    <rect width={VIEW.w} height={VIEW.h} fill="url(#chartEdge)" />
                  </mask>
                </defs>
                {/* Ruled at the label values, so the grid and the axis agree. */}
                {AXIS.map((value) => (
                  <line className="gridline" key={value} x1="0" x2={VIEW.w} y1={yAt(value)} y2={yAt(value)}
                    vectorEffect="non-scaling-stroke" />
                ))}
                <path className="area" d={areaPath} fill="url(#chartFill)" mask="url(#chartEdgeMask)" />
                <path className="line" d={linePath} pathLength="1" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="chart-marker"
                style={{ left: `${(lastPoint[0] / VIEW.w) * 100}%`, top: `${(lastPoint[1] / VIEW.h) * 100}%` }} />
            </div>
            <div className="x-labels" aria-hidden="true">
              {['MAR', 'APR', 'MAY', 'JUN'].map((month) => <span className="mono-label" key={month}>{month}</span>)}
            </div>
          </div>
        </Cell>

        <Cell className="cell-card">
          <article className="project-card">
            <div className="card-visual">
              <span className="sphere" />
              <span className="mono-label card-index">A&#8212;08</span>
            </div>
            <div className="card-copy">
              <div><span className="mono-label">SELECTED WORK</span><h2>Signal / Noise</h2></div>
              <span className="card-go"><ArrowUpRight size={17} strokeWidth={2.1} /></span>
            </div>
          </article>
        </Cell>

        <Cell className="cell-progress">
          <div className="progress-header">
            <div><span className="mono-label">UPLOAD STATUS</span><strong>{progress}%</strong></div>
            <span className="mono-label">3.4 / 5 GB</span>
          </div>
          <div className="progress-track" style={{ '--progress': `${progress}%` }}>
            <span className="progress-fill" />
            <input className="progress-control" aria-label="Upload progress" type="range" min="0" max="100"
              value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
          </div>
          <div className="progress-scale" aria-hidden="true">
            {Array.from({ length: 21 }, (_, index) => <i className={index % 5 === 0 ? 'major' : ''} key={index} />)}
          </div>
        </Cell>

        <Cell className="cell-dropdown">
          <div className="dropdown-wrap">
            <label className="mono-label">SELECT PLAN</label>
            <button className={`dropdown-trigger ${menuOpen ? 'is-open' : ''}`} type="button" aria-haspopup="listbox"
              aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <span>{plan}</span><ChevronDown size={15} strokeWidth={2.1} />
            </button>
            {menuOpen && (
              <div className="dropdown-menu" role="listbox">
                {['Starter', 'Professional', 'Enterprise'].map((option) => (
                  <button type="button" role="option" aria-selected={plan === option} key={option}
                    onClick={() => { setPlan(option); setMenuOpen(false) }}>
                    <span>{option}</span>{plan === option && <Check size={14} strokeWidth={2.4} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Cell>

        <Cell className="cell-alert">
          {alertVisible ? (
            <div className="alert" role="status">
              <span className="alert-icon"><Info size={15} strokeWidth={2.1} /></span>
              <div className="alert-copy"><strong>Workspace updated</strong><span>Your changes are now live.</span></div>
              <button type="button" aria-label="Dismiss alert" onClick={() => setAlertVisible(false)}><X size={15} strokeWidth={2.1} /></button>
            </div>
          ) : (
            <button className="restore-alert" type="button" onClick={() => setAlertVisible(true)}>Restore notification</button>
          )}
        </Cell>

      </div>
  )
}

const backgrounds = [
  ['Midnight', 'A quiet, soft-lit surface.', 'midnight'],
  ['Aurora', 'A wash of violet and cool blue.', 'aurora'],
  ['Dot matrix', 'A little structure, a lot of space.', 'dots'],
  ['Warmth', 'An amber glow at the horizon.', 'warmth'],
  ['Brushed metal', 'Light and shadow in fine layers.', 'metal'],
  ['Eclipse', 'A halo emerging from the dark.', 'eclipse'],
]

function BackgroundPage() {
  return <div className="sample-grid" aria-label="Background styles">
    {backgrounds.map(([name, description, style], index) =>
      <article className="sample-card background-card" key={style}>
        <div className={`background-preview bg-${style}`}><span className="preview-mark">Aa</span></div>
        <div className="sample-caption"><div><h2>{name}</h2><p>{description}</p></div><span className="mono-label">0{index + 1}</span></div>
      </article>
    )}
  </div>
}

function TypeCard({ label, detail, className = '', children }) {
  return <article className={`sample-card type-card ${className}`}>
    <div className="type-meta"><span className="mono-label">{label}</span><span className="mono-label">{detail}</span></div>
    <div className="type-preview">{children}</div>
  </article>
}

function TextPage() {
  return <div className="sample-grid typography-grid" aria-label="Typography samples">
    <TypeCard label="Display" detail="64 / 1.05" className="type-wide"><p className="type-display">Less, but better.</p></TypeCard>
    <TypeCard label="Title" detail="36 / 1.15"><h1 className="type-title">Make room<br />for good ideas.</h1></TypeCard>
    <TypeCard label="Description" detail="18 / 1.6"><p className="type-description">Thoughtful interfaces start with the essentials. A little space, a clear purpose, and details that feel just right.</p></TypeCard>
    <TypeCard label="Heading" detail="24 / 1.3"><h2 className="type-heading">Details make the difference.</h2><p className="type-body">Give every section a clear starting point.</p></TypeCard>
    <TypeCard label="Body" detail="14 / 1.75"><p className="type-body">Good design makes the complex feel simple. Use comfortable line lengths and a steady rhythm to make your words easy to read, from the first sentence to the last.</p></TypeCard>
    <TypeCard label="Label & caption" detail="10–12 / 1.5"><div><span className="type-label">THE SMALL DETAILS</span><p className="type-caption">A collection of things, made with care.</p></div></TypeCard>
    <TypeCard label="Quote" detail="24 / 1.5"><blockquote>“Simplicity is the ultimate sophistication.”</blockquote></TypeCard>
  </div>
}

const pages = ['elements', 'background', 'text']
const currentPage = () => pages.includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'elements'

function App() {
  const [page, setPage] = useState(currentPage)
  useEffect(() => {
    const navigate = () => setPage(currentPage())
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => { document.title = `${page[0].toUpperCase() + page.slice(1)} · Jimmy Wu's UI Kit` }, [page])
  return <div className="showcase-shell">
    <header className="site-header">
      <a className="brand" href="#elements"><span className="brand-icon" aria-hidden="true"><i /><i /><i /><i /></span>Jimmy Wu's UI Kit</a>
      <nav aria-label="Main navigation">{pages.map(item => <a key={item} href={`#${item}`} aria-current={page === item ? 'page' : undefined}>{item[0].toUpperCase() + item.slice(1)}</a>)}</nav>
    </header>
    <main key={page}>
      {page === 'elements' ? <ElementsPage /> : page === 'background' ? <BackgroundPage /> : <TextPage />}
    </main>
    <footer><span>A personal collection, made with care.</span><span>Jimmy Wu © {new Date().getFullYear()}</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
