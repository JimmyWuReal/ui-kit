import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Maximize2, Plus, Sparkles, X } from 'lucide-react'
import './styles.css'

/* Every surface an element can be tested against. The first is the default. */
const SURFACES = [
  ['default', 'Default black'],
  ['midnight', 'Midnight'],
  ['aurora', 'Aurora'],
  ['dots', 'Dot matrix'],
  ['warmth', 'Warmth'],
  ['metal', 'Brushed metal'],
  ['eclipse', 'Eclipse'],
  ['paper', 'Paper'],
]

const SurfaceContext = createContext(['default', () => {}])
const useSurface = () => useContext(SurfaceContext)

function ExpandButton({ label, onClick }) {
  return (
    <button className="expand-button" type="button" title="Expand" aria-label={`Expand ${label}`} onClick={onClick}>
      <Maximize2 size={13} strokeWidth={2.2} />
    </button>
  )
}

function SurfacePicker() {
  const [surface, setSurface] = useSurface()
  return (
    <div className="surface-picker" role="radiogroup" aria-label="Preview background">
      {SURFACES.map(([key, label]) => (
        <button className={`swatch bg-${key} ${surface === key ? 'is-active' : ''}`} key={key} type="button"
          role="radio" aria-checked={surface === key} title={label} onClick={() => setSurface(key)}>
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  )
}

/* One element, full bleed, over whichever surface is selected. */
function ExpandedView({ title, wide = false, onClose, children }) {
  const [surface] = useSurface()
  const closeRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [onClose])

  const dismiss = (event) => { if (event.target.dataset.backdrop) onClose() }

  return (
    <div className="expand-overlay" role="dialog" aria-modal="true" aria-label={`${title}, expanded`}>
      <div className={`expand-surface bg-${surface}`} data-backdrop="true" onMouseDown={dismiss} />
      <div className="expand-body" data-backdrop="true" onMouseDown={dismiss}>
        <div className={`expand-content ${wide ? 'is-wide' : ''}`}>{children}</div>
      </div>
      <div className="expand-bar">
        <span className="expand-title mono-label">{title}</span>
        <button className="expand-close" type="button" aria-label="Close expanded view" ref={closeRef} onClick={onClose}>
          <X size={16} strokeWidth={2.1} />
        </button>
      </div>
      <SurfacePicker />
    </div>
  )
}

function Cell({ className = '', title, onExpand, children }) {
  return (
    <section className={`grid-cell ${className}`}>
      <div className="cell-content">{children}</div>
      {onExpand && <ExpandButton label={title} onClick={onExpand} />}
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

/* One continuous stroke, so the tick can be drawn on and wiped off with
   dashoffset alone. pathLength normalises the dash maths to 0—1. */
function CheckMark() {
  return (
    <svg className="check-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" pathLength="1" />
    </svg>
  )
}

function ElementsPage() {
  const [checked, setChecked] = useState(true)
  const [enabled, setEnabled] = useState(true)
  const [email, setEmail] = useState('')
  const [expanded, setExpanded] = useState(null)

  /* Each demo is described once and rendered twice — in its cell, and expanded.
     Both copies share this component's state, so they stay in step. */
  const demos = [
    {
      id: 'buttons', title: 'Buttons', cell: 'cell-buttons',
      node: <div className="button-group"><PrimaryButton /><DepthButton /></div>,
    },
    {
      id: 'checkbox', title: 'Checkbox', cell: 'cell-checkbox',
      node: (
        <label className="checkbox-row">
          <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
          <span className="checkbox-box"><CheckMark /></span>
          <span><strong>Remember me</strong><small>Keep this device signed in</small></span>
        </label>
      ),
    },
    {
      id: 'toggle', title: 'Toggle', cell: 'cell-toggle',
      node: (
        <div className="control-row">
          <div><strong>Notifications</strong><span>Product updates</span></div>
          <button className={`toggle ${enabled ? 'is-on' : ''}`} type="button" role="switch"
            aria-checked={enabled} aria-label="Toggle product notifications" onClick={() => setEnabled(!enabled)}>
            <span className="toggle-knob" />
          </button>
        </div>
      ),
    },
    {
      id: 'input', title: 'Text field', cell: 'cell-input',
      node: (
        <label className="text-field">
          <span className="mono-label">EMAIL ADDRESS</span>
          <input type="email" placeholder="studio@form.co" value={email}
            onChange={(event) => setEmail(event.target.value)} />
        </label>
      ),
    },
  ]

  const active = demos.find((demo) => demo.id === expanded)

  return (
    <>
      <div className="component-grid" id="top">
        {demos.map((demo) => (
          <Cell className={demo.cell} key={demo.id} title={demo.title} onExpand={() => setExpanded(demo.id)}>
            {demo.node}
          </Cell>
        ))}
      </div>
      {active && (
        <ExpandedView title={active.title} wide={active.wide} onClose={() => setExpanded(null)}>
          {active.node}
        </ExpandedView>
      )}
    </>
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
  const [, setSurface] = useSurface()
  const [expanded, setExpanded] = useState(null)
  const active = backgrounds.find(([, , style]) => style === expanded)

  return (
    <>
      <div className="sample-grid" aria-label="Background styles">
        {backgrounds.map(([name, description, style], index) =>
          <article className="sample-card background-card" key={style}>
            <div className={`background-preview bg-${style}`}><span className="preview-mark">Aa</span></div>
            <div className="sample-caption"><div><h2>{name}</h2><p>{description}</p></div><span className="mono-label">0{index + 1}</span></div>
            <ExpandButton label={name} onClick={() => { setSurface(style); setExpanded(style) }} />
          </article>
        )}
      </div>
      {active && (
        <ExpandedView title={active[0]} wide onClose={() => setExpanded(null)}>
          <div className="surface-sampler">
            <span className="preview-mark">Aa</span>
            <div className="button-group"><PrimaryButton /><DepthButton /></div>
          </div>
        </ExpandedView>
      )}
    </>
  )
}

/* The values a sample is actually drawn with — every sample states the
   same six, so the sheets under them all read the same way. */
const spec = (font, size, weight, leading, tracking, color) =>
  ({ font, size, weight, leading, tracking, color })

function SpecSheet({ specs }) {
  return (
    <div className="type-spec">
      {specs.map(([name, values]) => (
        <div className="spec-group" key={name || 'only'}>
          {name && <span className="mono-label spec-name">{name}</span>}
          <dl className="spec-items">
            {Object.entries(values).map(([key, value]) => (
              <div className="spec-item" key={key}>
                <dt className="mono-label">{key}</dt>
                <dd className={key === 'color' ? 'spec-color' : ''}>
                  {key === 'color' && <i style={{ background: value }} aria-hidden="true" />}
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

function TypeCard({ label, index, specs, className = '', onExpand, children }) {
  return <article className={`sample-card type-card ${className}`}>
    <span className="mono-label type-meta">{index} &#8212; {label}</span>
    <div className="type-preview">{children}</div>
    <SpecSheet specs={specs} />
    {onExpand && <ExpandButton label={label} onClick={onExpand} />}
  </article>
}

const typeSamples = [
  {
    label: 'Display', className: 'type-wide',
    node: <p className="type-display">Less, but better.</p>,
    specs: [[null, spec('Inter', '64px', 'Medium 500', '1.05', '-0.065em', '#FFFFFF')]],
  },
  {
    label: 'Title',
    node: <h1 className="type-title">Make room<br />for good ideas.</h1>,
    specs: [[null, spec('Inter', '36px', 'Medium 500', '1.15', '-0.045em', '#FFFFFF')]],
  },
  {
    label: 'Description',
    node: <p className="type-description">Thoughtful interfaces start with the essentials. A little space, a clear purpose, and details that feel just right.</p>,
    specs: [[null, spec('Inter', '18px', 'Regular 400', '1.6', '-0.02em', '#AAAAAA')]],
  },
  {
    label: 'Heading',
    node: <><h2 className="type-heading">Details make the difference.</h2><p className="type-body">Give every section a clear starting point.</p></>,
    specs: [
      ['Heading', spec('Inter', '24px', 'Medium 500', '1.3', '-0.035em', '#FFFFFF')],
      ['Body', spec('Inter', '14px', 'Regular 400', '1.75', '0', '#999999')],
    ],
  },
  {
    label: 'Body',
    node: <p className="type-body">Good design makes the complex feel simple. Use comfortable line lengths and a steady rhythm to make your words easy to read, from the first sentence to the last.</p>,
    specs: [[null, spec('Inter', '14px', 'Regular 400', '1.75', '0', '#999999')]],
  },
  {
    label: 'Label & caption',
    node: <div><span className="type-label">THE SMALL DETAILS</span><p className="type-caption">A collection of things, made with care.</p></div>,
    specs: [
      ['Label', spec('DM Mono', '10px', 'Regular 400', '1.5', '0.15em', '#FFFFFF')],
      ['Caption', spec('Inter', '12px', 'Regular 400', '1.5', '0', '#888888')],
    ],
  },
  {
    label: 'Quote',
    node: <blockquote>&#8220;Simplicity is the ultimate sophistication.&#8221;</blockquote>,
    specs: [[null, spec('Georgia Italic', '24px', 'Regular 400', '1.5', '0', '#CCCCCC')]],
  },
]

function TextPage() {
  const [expanded, setExpanded] = useState(null)
  const active = typeSamples.find((sample) => sample.label === expanded)

  return (
    <>
      <div className="sample-grid typography-grid" aria-label="Typography samples">
        {typeSamples.map((sample, index) => (
          <TypeCard key={sample.label} label={sample.label} index={`0${index + 1}`} specs={sample.specs}
            className={sample.className} onExpand={() => setExpanded(sample.label)}>
            {sample.node}
          </TypeCard>
        ))}
      </div>
      {active && (
        <ExpandedView title={active.label} wide onClose={() => setExpanded(null)}>
          <div className="type-preview">{active.node}</div>
          <SpecSheet specs={active.specs} />
        </ExpandedView>
      )}
    </>
  )
}

const pages = ['elements', 'background', 'text']
const currentPage = () => pages.includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'elements'

function App() {
  const [page, setPage] = useState(currentPage)
  const surface = useState('default')
  useEffect(() => {
    const navigate = () => setPage(currentPage())
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => { document.title = `${page[0].toUpperCase() + page.slice(1)} · Jimmy Wu's UI Kit` }, [page])
  return <SurfaceContext.Provider value={surface}>
    <div className="showcase-shell">
      <header className="site-header">
        <a className="brand" href="#elements"><span className="brand-icon" aria-hidden="true"><i /><i /><i /><i /></span>Jimmy Wu's UI Kit</a>
        <nav aria-label="Main navigation">{pages.map(item => <a key={item} href={`#${item}`} aria-current={page === item ? 'page' : undefined}>{item[0].toUpperCase() + item.slice(1)}</a>)}</nav>
      </header>
      <main key={page}>
        {page === 'elements' ? <ElementsPage /> : page === 'background' ? <BackgroundPage /> : <TextPage />}
      </main>
      <footer><span>A personal collection, made with care.</span><span>Jimmy Wu © {new Date().getFullYear()}</span></footer>
    </div>
  </SurfaceContext.Provider>
}

createRoot(document.getElementById('root')).render(<App />)
