import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Download, Maximize2, Plus, Sparkles, X } from 'lucide-react'
import {
  Accordion, CheckMark, Chips, CodeInput, CopyLink, Pagination, Popup, Progress,
  RadioGroup, Rating, SearchField, Segmented, Select, Slider, Spinner, Stepper, Tabs, TextArea,
} from './controls.jsx'
import { BarChart, LineChart, PieChart, Sparkline, StackedBar } from './charts.jsx'
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

/* Drawn in the flat controls' hairline rather than the lit material,
   for every action that is not the main one. */
function OutlineButton() {
  return (
    <button className="outline-button" type="button">
      <span className="button-content">
        <span className="button-icon"><Download size={17} strokeWidth={2.15} /></span>
        <span>Export</span>
      </span>
    </button>
  )
}

function ProjectCard() {
  return (
    <article className="card">
      <div className="card-preview bg-dots" />
      <div className="card-body">
        <strong>Formless</strong>
        <p>A small set of elements, drawn in two materials.</p>
      </div>
      <div className="card-foot">
        <span className="mono-label">Edited 2h ago</span>
        <button className="outline-button is-small" type="button">Open</button>
      </div>
    </article>
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
      id: 'outline', title: 'Outline button', cell: 'cell-buttons',
      node: <div className="button-group"><OutlineButton /></div>,
    },
    /* The two layers that land on the page itself, so their cells are the
       page's black rather than the cell gray. */
    {
      id: 'card', title: 'Card', cell: 'cell-control cell-black',
      node: <ProjectCard />,
    },
    {
      id: 'popup', title: 'Popup', cell: 'cell-control cell-black',
      node: <Popup />,
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
      id: 'spinner', title: 'Spinner',
      node: <Spinner label="Syncing" note="Saving your changes" />,
    },
    {
      id: 'rating', title: 'Rating',
      node: <Rating value={values.rating} onChange={set('rating')} />,
    },
    {
      id: 'line', title: 'Line chart', cell: 'cell-chart', wide: true,
      node: <LineChart />,
    },
    {
      id: 'sparkline', title: 'Sparkline',
      node: <Sparkline />,
    },
    {
      id: 'bar', title: 'Bar chart',
      node: <BarChart />,
    },
    {
      id: 'pie', title: 'Pie chart',
      node: <PieChart />,
    },
    {
      id: 'stacked', title: 'Stacked bar',
      node: <StackedBar />,
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

/* The three faces the kit is set in, with the weights it actually uses. */
const FAMILIES = {
  'Inter': 'Inter, ui-sans-serif, system-ui, sans-serif',
  'DM Mono': "'DM Mono', ui-monospace, monospace",
  'Georgia': 'Georgia, serif',
}
const WEIGHTS = { 400: 'Regular', 500: 'Medium', 600: 'Semibold' }

const typefaces = [
  { name: 'Inter', kind: 'Sans', use: 'Everything you read and click.', weights: [400, 500, 600], wide: true },
  { name: 'DM Mono', kind: 'Mono', use: 'Labels, values and counts.', weights: [400] },
  { name: 'Georgia', kind: 'Serif', use: 'Quotes, and only in italic.', weights: [400], italic: true },
]

/* Every kind of text in the kit, with the values it is drawn with. These
   mirror the rules in styles.css — keep the two in step. A sample on a
   light fill names it as `on`. */
const style = (role, use, sample, font, size, weight, leading, tracking, color, extra = {}) =>
  ({ role, use, sample, font, size, weight, leading, tracking, color, ...extra })

const typeScale = [
  ['Reading', [
    style('Display', 'Page openers', 'Better.', 'Inter', '64px', 500, '1.05', '-0.065em', '#FFFFFF'),
    style('Title', 'Page and section titles, stat values', 'Make room.', 'Inter', '36px', 500, '1.15', '-0.045em', '#FFFFFF'),
    style('Heading', 'The start of a section', 'Details matter.', 'Inter', '24px', 500, '1.3', '-0.035em', '#FFFFFF'),
    style('Quote', 'Pull quotes', '“Simply put.”', 'Georgia', '24px', 400, '1.5', '0', '#CCCCCC', { italic: true }),
    style('Description', 'An intro under a title', 'Start with the essentials.', 'Inter', '18px', 400, '1.6', '-0.02em', '#AAAAAA'),
    style('Body', 'Running text', 'Good design makes the complex feel simple.', 'Inter', '14px', 400, '1.75', '0', '#999999'),
    style('Caption', 'Notes, background card notes', 'A collection of things, made with care.', 'Inter', '12px', 400, '1.5', '0', '#888888'),
  ]],
  ['Interface', [
    style('Brand', 'Site header', 'Jimmy Wu’s UI Kit', 'Inter', '15px', 600, 'normal', '-0.035em', '#EFEFEF'),
    style('Card name', 'Cards, background cards', 'Dot matrix', 'Inter', '14px', 500, 'normal', '0', '#FFFFFF'),
    style('Button', 'AI and outline; #111111 on the primary', 'Create with AI', 'Inter', '13px', 600, 'normal', '-0.01em', '#FFFFFF'),
    style('Control title', 'Toggle, checkbox, radio, stepper, popup', 'Notifications', 'Inter', '13px', 500, 'normal', '-0.01em', '#FFFFFF'),
    style('Question', 'Accordion', 'What is in the kit?', 'Inter', '13px', 500, 'normal', '-0.01em', '#CFCFCF'),
    style('Count', 'Stepper value', '3', 'Inter', '13px', 500, 'normal', '0', '#FFFFFF'),
    style('Field text', 'Text field, search, select', 'studio@form.co', 'Inter', '13px', 400, 'normal', '-0.01em', '#EDEDED'),
    style('Option', 'Select menu', 'Singapore', 'Inter', '13px', 400, 'normal', '-0.01em', '#A8A8A8'),
    style('Code digit', 'Code input', '4 8 1 5', 'Inter', '18px', 500, 'normal', '0', '#FFFFFF'),
    style('Segment', 'Segmented, pagination, site nav', 'Board', 'Inter', '12.5px', 500, 'normal', '-0.01em', '#8A8A8A'),
    style('Tab', 'Tabs', 'Overview', 'Inter', '12.5px', 500, 'normal', '-0.01em', '#7D7D7D'),
    style('Chip', 'Chips, chart keys', 'Motion', 'Inter', '12.5px', 500, 'normal', '-0.01em', '#A8A8A8'),
    style('Panel text', 'Tab panel, accordion, card, popup', 'Three changes this week.', 'Inter', '12.5px', 400, '1.7', '0', '#7D7D7D'),
    style('Control note', 'Under a control title, chart legends', 'Product updates', 'Inter', '11.5px', 400, 'normal', '0', '#7D7D7D'),
    style('Tooltip', 'Tooltip and chart tooltip, on raised', 'Copy link', 'Inter', '11px', 400, '1', '0', '#A8A8A8', { on: '#1C1C1C' }),
    style('Footer', 'Site footer', 'A personal collection, made with care.', 'Inter', '11px', 400, 'normal', '0', '#666666'),
  ]],
  ['Mono', [
    style('Value', 'Slider, progress, counts, chart values', '24.8 MB', 'DM Mono', '11px', 400, '1', '0', '#D6D6D6'),
    style('Label', 'Eyebrows over content', 'THE SMALL DETAILS', 'DM Mono', '10px', 400, '1.5', '0.15em', '#FFFFFF'),
    style('Field label', 'Over fields, card numbers, chart axes', 'EMAIL ADDRESS', 'DM Mono', '9px', 400, '1', '0.14em', '#6F6F6F'),
  ]],
]

const typeStyle = (font, { size, weight = 400, leading, tracking, color, italic, on }) => ({
  fontFamily: FAMILIES[font], fontSize: size, fontWeight: weight, lineHeight: leading,
  letterSpacing: tracking, color, fontStyle: italic ? 'italic' : undefined,
  ...(on && { display: 'inline-block', padding: '6px 9px', borderRadius: 7, background: on }),
})

function SectionHead({ id, index, title, note }) {
  return (
    <header className="section-head">
      <span className="mono-label">{index}</span>
      <h2 id={id}>{title}</h2>
      <p>{note}</p>
    </header>
  )
}

function Typeface({ name, kind, use, weights, italic, wide, index }) {
  const face = (weight) => typeStyle(name, { weight, italic })
  return (
    <article className={`sample-card typeface ${wide ? 'is-wide' : ''}`}>
      <span className="mono-label">0{index} &#8212; {kind}</span>
      <p className="typeface-name" style={face(500)}>{name}</p>
      <p className="typeface-use">{use}</p>
      <p className="typeface-glyphs" style={face(400)}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 &amp;?!@#%
      </p>
      <div className="typeface-weights">
        {weights.map((weight) => (
          <div key={weight}>
            <span style={face(weight)}>Aa</span>
            <span className="mono-label">{weight} {italic ? 'Italic' : WEIGHTS[weight]}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function TypeTable() {
  return (
    <div className="type-table-wrap">
      <table className="type-table">
        <thead>
          <tr>{['Role', 'Sample', 'Font', 'Size', 'Weight', 'Leading', 'Tracking', 'Color'].map((head) =>
            <th className="mono-label" key={head} scope="col">{head}</th>)}</tr>
        </thead>
        {typeScale.map(([group, rows]) => (
          <tbody key={group}>
            <tr className="type-group"><th className="mono-label" colSpan={8} scope="rowgroup">{group}</th></tr>
            {rows.map((row) => (
              <tr key={row.role}>
                <th scope="row"><strong>{row.role}</strong><small>{row.use}</small></th>
                <td className="type-sample"><span style={typeStyle(row.font, row)}>{row.sample}</span></td>
                <td>{row.font}{row.italic && ' Italic'}</td>
                <td>{row.size}</td>
                <td>{row.weight} {WEIGHTS[row.weight]}</td>
                <td>{row.leading}</td>
                <td>{row.tracking}</td>
                <td><span className="type-color"><i style={{ background: row.color }} aria-hidden="true" />{row.color}</span></td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}

function TextPage() {
  return (
    <>
      <section className="type-section" aria-labelledby="typefaces">
        <SectionHead id="typefaces" index="01" title="Typefaces" note="The three faces the kit is set in." />
        <div className="sample-grid">
          {typefaces.map((face, index) => <Typeface key={face.name} index={index + 1} {...face} />)}
        </div>
      </section>
      <section className="type-section" aria-labelledby="type-scale">
        <SectionHead id="type-scale" index="02" title="Type scale" note="Every kind of text in the kit, and what it is drawn with." />
        <TypeTable />
      </section>
    </>
  )
}

/* The pages, by their names. The hash is the lowercase name. */
const pages = ['Elements', 'Background', 'Text']
const currentPage = () => pages.find((name) => name.toLowerCase() === window.location.hash.slice(1)) ?? pages[0]

function App() {
  const [page, setPage] = useState(currentPage)
  const surface = useState('default')
  useEffect(() => {
    const navigate = () => setPage(currentPage())
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => { document.title = `${page} · Jimmy Wu's UI Kit` }, [page])
  return <SurfaceContext.Provider value={surface}>
    <div className="showcase-shell">
      <header className="site-header">
        <a className="brand" href="#elements"><span className="brand-icon" aria-hidden="true"><i /><i /><i /><i /></span>Jimmy Wu's UI Kit</a>
        {/* The page chooser is the kit's own segmented control. Choosing sets
            the hash, and the hashchange listener above follows it. */}
        <nav className="site-nav" aria-label="Main navigation">
          <Segmented label="Page" options={pages} value={page} onChange={(name) => { window.location.hash = name.toLowerCase() }} />
        </nav>
      </header>
      <main key={page}>
        {page === 'Elements' ? <ElementsPage /> : page === 'Background' ? <BackgroundPage /> : <TextPage />}
      </main>
      <footer><span>A personal collection, made with care.</span><span>Jimmy Wu © {new Date().getFullYear()}</span></footer>
    </div>
  </SurfaceContext.Provider>
}

createRoot(document.getElementById('root')).render(<App />)
