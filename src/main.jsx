import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  CircleDashed,
  Clock3,
  Command,
  Copy,
  Download,
  Heart,
  Layers2,
  LayoutGrid,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'

const categories = ['All elements', 'Actions', 'Inputs', 'Status', 'Navigation']

const elements = [
  { id: 'actions', title: 'Action buttons', category: 'Actions', tone: 'violet' },
  { id: 'toggle', title: 'Preference toggle', category: 'Inputs', tone: 'cyan' },
  { id: 'progress', title: 'Progress ring', category: 'Status', tone: 'coral' },
  { id: 'search', title: 'Search field', category: 'Inputs', tone: 'yellow' },
  { id: 'people', title: 'Avatar group', category: 'Status', tone: 'violet' },
  { id: 'segment', title: 'Segmented control', category: 'Navigation', tone: 'cyan' },
  { id: 'toast', title: 'Toast message', category: 'Status', tone: 'yellow' },
  { id: 'download', title: 'Download card', category: 'Actions', tone: 'coral' },
  { id: 'command', title: 'Command menu', category: 'Navigation', tone: 'violet', wide: true },
]

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

function Topbar({ onSearch }) {
  return (
    <header className="topbar shell">
      <a href="#top" className="brand" aria-label="Formless home">
        <BrandMark />
        <span>Formless</span>
      </a>
      <div className="top-actions">
        <button className="search-trigger" onClick={onSearch}>
          <Search size={15} />
          <span>Search elements</span>
          <kbd>⌘ K</kbd>
        </button>
        <button className="icon-button" aria-label="Switch appearance">
          <Moon size={16} />
        </button>
        <a className="github-button" href="https://github.com" target="_blank" rel="noreferrer">
          <span className="status-dot" />
          v0.9
        </a>
      </div>
    </header>
  )
}

function ElementCard({ item, children }) {
  const [copied, setCopied] = useState(false)
  function copyName() {
    navigator.clipboard?.writeText(`<${item.title.replaceAll(' ', '')} />`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <article className={`element-card ${item.wide ? 'wide' : ''}`}>
      <div className="card-meta">
        <div>
          <span className={`tone-dot ${item.tone}`} />
          <h2>{item.title}</h2>
        </div>
        <button className={copied ? 'copied' : ''} onClick={copyName} aria-label={`Copy ${item.title}`}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className={`element-stage stage-${item.tone}`}>{children}</div>
      <div className="card-footer">
        <span>{item.category}</span>
        <button aria-label={`Open ${item.title}`}><ArrowRight size={14} /></button>
      </div>
    </article>
  )
}

function ActionButtons() {
  const [liked, setLiked] = useState(false)
  return (
    <div className="button-stack">
      <button className="primary-btn"><Sparkles size={15} /> Create with AI</button>
      <button className={`heart-btn ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)} aria-label="Like">
        <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}

function PreferenceToggle() {
  const [on, setOn] = useState(true)
  return (
    <div className="preference-row">
      <div className="mini-icon cyan"><Bell size={17} /></div>
      <div className="preference-copy"><strong>Smart alerts</strong><span>Only what matters</span></div>
      <button className={`toggle ${on ? 'on' : ''}`} onClick={() => setOn(!on)} aria-pressed={on}><span /></button>
    </div>
  )
}

function ProgressRing() {
  return (
    <div className="progress-wrap">
      <div className="progress-ring"><span>72<small>%</small></span></div>
      <div><strong>Almost there</strong><span>3 of 4 steps complete</span></div>
    </div>
  )
}

function SearchField() {
  const [value, setValue] = useState('')
  return (
    <label className="demo-search">
      <Search size={17} />
      <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Search anything…" />
      {value ? <button onClick={() => setValue('')} aria-label="Clear"><X size={14} /></button> : <kbd>/</kbd>}
    </label>
  )
}

function AvatarGroup() {
  return (
    <div className="avatar-demo">
      <div className="avatars">
        <span className="avatar a1">AM</span>
        <span className="avatar a2">JL</span>
        <span className="avatar a3">SK</span>
        <span className="avatar more">+8</span>
      </div>
      <div className="active-copy"><span><i /> 12 online</span><small>Design team</small></div>
    </div>
  )
}

function SegmentedControl() {
  const [selected, setSelected] = useState('Grid')
  const choices = [{ name: 'Grid', icon: LayoutGrid }, { name: 'Layers', icon: Layers2 }, { name: 'Settings', icon: Settings2 }]
  return (
    <div className="segmented">
      {choices.map(({ name, icon: Icon }) => (
        <button key={name} className={selected === name ? 'selected' : ''} onClick={() => setSelected(name)}>
          <Icon size={16} /><span>{name}</span>
        </button>
      ))}
    </div>
  )
}

function ToastMessage() {
  const [visible, setVisible] = useState(true)
  if (!visible) return <button className="restore-toast" onClick={() => setVisible(true)}>Show toast</button>
  return (
    <div className="toast-demo">
      <div className="success-icon"><Check size={15} /></div>
      <div><strong>Changes saved</strong><span>Your workspace is up to date.</span></div>
      <button onClick={() => setVisible(false)} aria-label="Dismiss"><X size={15} /></button>
    </div>
  )
}

function DownloadCard() {
  const [downloading, setDownloading] = useState(false)
  useEffect(() => {
    if (!downloading) return
    const timer = window.setTimeout(() => setDownloading(false), 1800)
    return () => window.clearTimeout(timer)
  }, [downloading])
  return (
    <div className="download-demo">
      <div className="file-icon"><span>ZIP</span></div>
      <div><strong>formless-kit.zip</strong><span>24 components · 8.4 MB</span></div>
      <button onClick={() => setDownloading(true)} aria-label="Download">
        {downloading ? <CircleDashed className="spin" size={17} /> : <Download size={17} />}
      </button>
    </div>
  )
}

function CommandMenu() {
  const [active, setActive] = useState(0)
  const commands = [
    { icon: Zap, name: 'Create new component', meta: 'C' },
    { icon: Clock3, name: 'Open recent files', meta: 'R' },
    { icon: ShieldCheck, name: 'Manage permissions', meta: 'P' },
  ]
  return (
    <div className="command-demo">
      <div className="command-input"><Search size={17} /><span>Type a command…</span><kbd>ESC</kbd></div>
      <div className="command-list">
        <small>SUGGESTED</small>
        {commands.map(({ icon: Icon, name, meta }, index) => (
          <button key={name} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)} onClick={() => setActive(index)}>
            <span><Icon size={16} />{name}</span><kbd>⌘ {meta}</kbd>
          </button>
        ))}
      </div>
    </div>
  )
}

function Preview({ id }) {
  const components = {
    actions: <ActionButtons />, toggle: <PreferenceToggle />, progress: <ProgressRing />, search: <SearchField />,
    people: <AvatarGroup />, segment: <SegmentedControl />, toast: <ToastMessage />, download: <DownloadCard />, command: <CommandMenu />,
  }
  return components[id]
}

function SearchOverlay({ open, onClose, onSelect }) {
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (!open) setQuery('')
  }, [open])
  const matches = elements.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
  if (!open) return null
  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="search-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-input"><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find an element…" /><kbd>ESC</kbd></div>
        <div className="modal-results">
          <small>{matches.length ? 'ELEMENTS' : 'NO RESULTS'}</small>
          {matches.map((item) => (
            <button key={item.id} onClick={() => onSelect(item.id)}><span className={`tone-dot ${item.tone}`} />{item.title}<span>{item.category}<ArrowRight size={14} /></span></button>
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [category, setCategory] = useState('All elements')
  const [searchOpen, setSearchOpen] = useState(false)
  const filtered = useMemo(() => category === 'All elements' ? elements : elements.filter((item) => item.category === category), [category])

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function selectSearch(id) {
    setSearchOpen(false)
    setCategory('All elements')
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80)
  }

  return (
    <div id="top" className="app">
      <div className="ambient one" /><div className="ambient two" />
      <Topbar onSearch={() => setSearchOpen(true)} />
      <main className="shell">
        <section className="intro">
          <div className="eyebrow"><span /> UI ELEMENT LIBRARY <em>09</em></div>
          <h1>Small elements.<br /><span>Big personality.</span></h1>
          <p>A growing collection of polished, interactive details<br /> for products that care about the little things.</p>
        </section>

        <section className="library" aria-label="Element gallery">
          <div className="library-head">
            <div className="category-tabs">
              {categories.map((name) => <button key={name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name}</button>)}
            </div>
            <div className="count"><span>{String(filtered.length).padStart(2, '0')}</span> elements</div>
          </div>
          <div className="gallery">
            {filtered.map((item) => <div id={item.id} key={item.id} className={item.wide ? 'wide-slot' : ''}><ElementCard item={item}><Preview id={item.id} /></ElementCard></div>)}
          </div>
          {filtered.length === 0 && <div className="empty">No elements in this collection yet.</div>}
        </section>
      </main>
      <footer className="shell"><BrandMark /><span>Made for the details.</span><small>FORMLESS / 2026</small></footer>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={selectSearch} />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
