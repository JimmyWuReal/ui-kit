import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Check, ChevronDown, Info, Plus, Sparkles, X } from 'lucide-react'
import './styles.css'

const chartPoints = '0,76 25,67 50,72 75,45 100,53 125,24 150,31 175,15 200,22 225,5'

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

function App() {
  const [enabled, setEnabled] = useState(true)
  const [checked, setChecked] = useState(true)
  const [plan, setPlan] = useState('Professional')
  const [menuOpen, setMenuOpen] = useState(false)
  const [alertVisible, setAlertVisible] = useState(true)
  const [progress, setProgress] = useState(68)

  return (
    <main className="showcase-shell">
      <header className="page-title">
        <h1>ELEMENT STUDY</h1>
      </header>

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
          <label className="field-label" htmlFor="email">EMAIL ADDRESS</label>
          <div className="text-field-wrap">
            <input id="email" type="email" defaultValue="studio@form.co" />
            <span>↵</span>
          </div>
        </Cell>

        <Cell className="cell-checkbox">
          <label className="checkbox-row">
            <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
            <span className="checkbox-box"><Check size={14} strokeWidth={2.2} /></span>
            <span><strong>Remember me</strong><small>Keep this device signed in</small></span>
          </label>
        </Cell>

        <Cell className="cell-chart">
          <div className="chart-heading">
            <div><span>ACTIVE USERS</span><strong>24,892</strong></div>
            <span className="positive">+18.4%</span>
          </div>
          <div className="chart-plot" aria-label="Active users rising line chart">
            <div className="y-labels"><span>25K</span><span>20K</span><span>15K</span><span>10K</span></div>
            <svg viewBox="0 0 225 82" preserveAspectRatio="none" role="img">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".22" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`${chartPoints} 225,82 0,82`} fill="url(#chartFill)" />
              <polyline points={chartPoints} fill="none" stroke="#ffffff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="225" cy="5" r="3.5" fill="#ffffff" />
            </svg>
            <div className="x-labels"><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div>
          </div>
        </Cell>

        <Cell className="cell-card">
          <article className="project-card">
            <div className="card-visual">
              <div className="orb orb-one" /><div className="orb orb-two" /><div className="card-index">A—08</div>
            </div>
            <div className="card-copy">
              <div><span>SELECTED WORK</span><h2>Signal / Noise</h2></div>
              <ArrowUpRight size={19} />
            </div>
          </article>
        </Cell>

        <Cell className="cell-progress">
          <div className="progress-header">
            <div><span>UPLOAD STATUS</span><strong>{progress}%</strong></div><span>3.4 / 5 GB</span>
          </div>
          <input className="progress-control" aria-label="Upload progress" type="range" min="0" max="100"
            value={progress} onChange={(event) => setProgress(event.target.value)} style={{ '--progress': `${progress}%` }} />
          <div className="progress-scale" aria-hidden="true">
            {Array.from({ length: 21 }, (_, index) => <i key={index} />)}
          </div>
        </Cell>

        <Cell className="cell-dropdown">
          <div className="dropdown-wrap">
            <label>SELECT PLAN</label>
            <button className="dropdown-trigger" type="button" aria-haspopup="listbox" aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}>
              <span>{plan}</span><ChevronDown size={16} className={menuOpen ? 'rotate' : ''} />
            </button>
            {menuOpen && (
              <div className="dropdown-menu" role="listbox">
                {['Starter', 'Professional', 'Enterprise'].map((option) => (
                  <button type="button" role="option" aria-selected={plan === option} key={option}
                    onClick={() => { setPlan(option); setMenuOpen(false) }}>
                    <span>{option}</span>{plan === option && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Cell>

        <Cell className="cell-alert">
          {alertVisible ? (
            <div className="alert" role="status">
              <div className="alert-icon"><Info size={16} /></div>
              <div className="alert-copy"><strong>Workspace updated</strong><span>Your changes are now live.</span></div>
              <button type="button" aria-label="Dismiss alert" onClick={() => setAlertVisible(false)}><X size={16} /></button>
            </div>
          ) : (
            <button className="restore-alert" type="button" onClick={() => setAlertVisible(true)}>Restore notification</button>
          )}
        </Cell>

      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
