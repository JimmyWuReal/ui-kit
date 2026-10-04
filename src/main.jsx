import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Maximize2, Plus, Sparkles, X } from 'lucide-react'
import {
  Accordion, Avatars, Badges, CheckMark, Chips, CodeInput, CopyLink, Pagination, Progress,
  RadioGroup, Rating, SearchField, Segmented, Select, Slider, Spinner, Stepper, Tabs, TextArea,
} from './controls.jsx'
import './styles.css'

/* Every surface an element can be tested against, as [key, name, use].
   All flat black and gray — the places an element actually lands.
   The first is the default. */
const SURFACES = [
  ['default', 'Black', 'The page the kit is drawn on.'],
  ['card', 'Card', 'The gray every cell sits on.'],
  ['raised', 'Raised', 'Menus, popovers and dialogs.'],
  ['dots', 'Dot matrix', 'A little structure, a lot of space.'],
  ['grid', 'Grid', 'A canvas for checking alignment.'],
  ['checker', 'Checker', 'Shows what a translucent layer lets through.'],
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

  /* onClose is a fresh closure on every render, and the elements shown here
     re-render the page as they are used — so it is held in a ref. Depending
     on it directly would tear this effect down and move focus back to the
     close button on every keystroke inside the expanded element. */
  const closeHandler = useRef(onClose)
  closeHandler.current = onClose

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    const onKey = (event) => { if (event.key === 'Escape') closeHandler.current() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [])

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

function ElementsPage() {
  const [checked, setChecked] = useState(true)
  const [enabled, setEnabled] = useState(true)
  const [email, setEmail] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [values, setValues] = useState({
    plan: 'pro', view: 'Board', volume: 64, seats: 3, region: 'Taipei', query: '', message: '',
    code: '', topics: ['Motion', 'Type'], tab: 'overview', faq: 'what', upload: 0, page: 2, rating: 4,
  })
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  /* The upload runs once on load, and again from its replay button. */
  useEffect(() => {
    if (values.upload >= 100) return
    const timer = setTimeout(() => set('upload')(Math.min(100, values.upload + 4 + Math.round(Math.random() * 8))), 160)
    return () => clearTimeout(timer)
  }, [values.upload])

  /* Each demo is described once and rendered twice — in its cell, and expanded.
     Both copies share this component's state, so they stay in step. A demo
     sits in the single-control measure unless it names its own cell. */
  const demos = [
    {
      id: 'buttons', title: 'Buttons', cell: 'cell-buttons',
      node: <div className="button-group"><PrimaryButton /><DepthButton /></div>,
    },
    {
      id: 'checkbox', title: 'Checkbox',
      node: (
        <label className="checkbox-row">
          <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
          <span className="checkbox-box"><CheckMark /></span>
          <span><strong>Remember me</strong><small>Keep this device signed in</small></span>
        </label>
      ),
    },
    {
      id: 'toggle', title: 'Toggle',
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
      id: 'input', title: 'Text field',
      node: (
        <label className="text-field">
          <span className="mono-label">EMAIL ADDRESS</span>
          <input type="email" placeholder="studio@form.co" value={email}
            onChange={(event) => setEmail(event.target.value)} />
        </label>
      ),
    },
    {
      id: 'radio', title: 'Radio group',
      node: (
        <RadioGroup label="Plan" value={values.plan} onChange={set('plan')} options={[
          ['solo', 'Solo', 'One seat, every element'],
          ['pro', 'Pro', 'Shared libraries and history'],
          ['team', 'Team', 'Roles, review and support'],
        ]} />
      ),
    },
    {
      id: 'segmented', title: 'Segmented control',
      node: <Segmented label="View" options={['List', 'Board', 'Calendar']} value={values.view} onChange={set('view')} />,
    },
    {
      id: 'slider', title: 'Slider',
      node: <Slider label="VOLUME" value={values.volume} onChange={set('volume')} />,
    },
    {
      id: 'stepper', title: 'Stepper',
      node: <Stepper label="Seats" note="Billed per member" value={values.seats} onChange={set('seats')} />,
    },
    {
      id: 'select', title: 'Select',
      node: <Select label="REGION" options={['Taipei', 'Tokyo', 'Singapore', 'Frankfurt', 'Oregon']}
        value={values.region} onChange={set('region')} />,
    },
    {
      id: 'search', title: 'Search',
      node: <SearchField value={values.query} onChange={set('query')} />,
    },
    {
      id: 'textarea', title: 'Text area',
      node: <TextArea label="MESSAGE" value={values.message} onChange={set('message')} />,
    },
    {
      id: 'code', title: 'Code input',
      node: <CodeInput label="VERIFICATION CODE" value={values.code} onChange={set('code')} />,
    },
    {
      id: 'chips', title: 'Chips',
      node: <Chips label="INTERESTS" options={['Motion', 'Type', 'Colour', 'Layout', 'Sound']}
        value={values.topics} onChange={set('topics')} />,
    },
    {
      id: 'tabs', title: 'Tabs',
      node: (
        <Tabs label="Project" value={values.tab} onChange={set('tab')} tabs={[
          ['overview', 'Overview', 'A small set of elements, drawn in two materials and nothing more.'],
          ['activity', 'Activity', 'Three changes this week, all of them to the way things move.'],
          ['settings', 'Settings', 'Private to you. Nothing here is shared until you say so.'],
        ]} />
      ),
    },
    {
      id: 'accordion', title: 'Accordion',
      node: (
        <Accordion value={values.faq} onChange={set('faq')} items={[
          ['what', 'What is in the kit?', 'Buttons, flat controls, surfaces and type — each one documented by the values it is drawn with.'],
          ['why', 'Why only two materials?', 'One lit material for actions, one flat line for everything else. Fewer rules, fewer surprises.'],
          ['use', 'Can I use it?', 'Take whatever helps. It was made to be borrowed.'],
        ]} />
      ),
    },
    {
      id: 'progress', title: 'Progress',
      node: <Progress name="kit-assets.zip" size="24.8 MB" value={values.upload} onReplay={() => set('upload')(0)} />,
    },
    {
      id: 'tooltip', title: 'Tooltip',
      node: <CopyLink />,
    },
    {
      id: 'pagination', title: 'Pagination',
      node: <Pagination value={values.page} onChange={set('page')} />,
    },
    {
      id: 'avatars', title: 'Avatars',
      node: <Avatars extra={5} people={[['JW', 'Jimmy Wu'], ['AL', 'Ada Lin'], ['MK', 'Mei Kao'], ['SR', 'Sam Reyes']]} />,
    },
    {
      id: 'badges', title: 'Badges',
      node: <Badges />,
    },
    {
      id: 'spinner', title: 'Spinner',
      node: <Spinner label="Syncing" note="Saving your changes" />,
    },
    {
      id: 'rating', title: 'Rating',
      node: <Rating value={values.rating} onChange={set('rating')} />,
    },
  ]

  const active = demos.find((demo) => demo.id === expanded)

  return (
    <>
      <div className="component-grid" id="top">
        {demos.map((demo) => (
          <Cell className={demo.cell ?? 'cell-control'} key={demo.id} title={demo.title} onExpand={() => setExpanded(demo.id)}>
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

function BackgroundPage() {
  const [, setSurface] = useSurface()
  const [expanded, setExpanded] = useState(null)
  const active = SURFACES.find(([style]) => style === expanded)

  return (
    <>
      <div className="sample-grid" aria-label="Background styles">
        {SURFACES.map(([style, name, description], index) =>
          <article className="sample-card background-card" key={style}>
            <div className={`background-preview bg-${style}`} />
            <div className="sample-caption"><div><h2>{name}</h2><p>{description}</p></div><span className="mono-label">0{index + 1}</span></div>
            <ExpandButton label={name} onClick={() => { setSurface(style); setExpanded(style) }} />
          </article>
        )}
      </div>
      {active && (
        <ExpandedView title={active[1]} wide onClose={() => setExpanded(null)}>
          <div className="button-group"><PrimaryButton /><DepthButton /></div>
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
