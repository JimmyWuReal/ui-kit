import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronLeft, ChevronRight, Copy, Minus, Plus, RotateCcw, Search, Star, X } from 'lucide-react'

/* The flat controls. Every one is controlled — its value lives with the
   page — so the copy in the cell and the expanded copy stay in step.
   Only passing UI state (a menu being open, a hover) is kept locally. */

/* One continuous stroke, so the tick can be drawn on and wiped off with
   dashoffset alone. pathLength normalises the dash maths to 0—1. */
export function CheckMark() {
  return (
    <svg className="check-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" pathLength="1" />
    </svg>
  )
}

/* Moves focus and selection together across a row of roving-tabindex
   buttons, the way native radios do. */
function arrowStep(event, count, index, onStep) {
  const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
  if (!delta) return
  event.preventDefault()
  const next = (index + delta + count) % count
  event.currentTarget.querySelectorAll('[data-step]')[next]?.focus()
  onStep(next)
}

export function RadioGroup({ label, options, value, onChange }) {
  const name = useId()
  return (
    <div className="radio-group" role="radiogroup" aria-label={label}>
      {options.map(([key, title, note]) => (
        <label className="radio-row" key={key}>
          <input type="radio" name={name} checked={value === key} onChange={() => onChange(key)} />
          <span className="radio-dot" />
          <span><strong>{title}</strong><small>{note}</small></span>
        </label>
      ))}
    </div>
  )
}

/* The white thumb is one element moved by index, so it slides between
   segments instead of each segment fading its own fill. */
/* Each segment is as wide as its label, so short and long words get the same
   room around them. The thumb is measured off the active button and slides
   and resizes to it. It is left out until the first measurement, so it lands
   in place on load rather than sliding in from the left. */
export function Segmented({ label, options, value, onChange }) {
  const index = options.indexOf(value)
  const ref = useRef(null)
  const [thumb, setThumb] = useState(null)

  useLayoutEffect(() => {
    const buttons = ref.current.querySelectorAll('button')
    const measure = () => {
      const active = buttons[index]
      if (active) setThumb({ '--thumb-x': `${active.offsetLeft}px`, '--thumb-width': `${active.offsetWidth}px` })
    }
    measure()
    /* Widths change when the web font arrives and when the control is resized. */
    const observer = new ResizeObserver(measure)
    buttons.forEach((button) => observer.observe(button))
    return () => observer.disconnect()
  }, [index, options.length])

  return (
    <div className="segmented" role="radiogroup" aria-label={label} ref={ref}
      style={{ '--count': options.length }}
      onKeyDown={(event) => arrowStep(event, options.length, index, (next) => onChange(options[next]))}>
      {thumb && <span className="segmented-thumb" style={thumb} aria-hidden="true" />}
      {options.map((option) => (
        <button key={option} type="button" role="radio" data-step aria-checked={option === value}
          tabIndex={option === value ? 0 : -1} className={option === value ? 'is-active' : ''}
          onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  )
}

export function Slider({ label, value, onChange, min = 0, max = 100, unit = '%' }) {
  return (
    <label className="slider-field">
      <span className="field-head"><span className="mono-label">{label}</span><output className="mono-value">{value}{unit}</output></span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))}
        style={{ '--fill': `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  )
}

export function Stepper({ label, note, value, onChange, min = 1, max = 20 }) {
  /* Which way the number rolls. Null until the first step, so the value
     doesn't animate in on page load. */
  const [direction, setDirection] = useState(null)
  const step = (delta) => {
    setDirection(delta > 0 ? 'up' : 'down')
    onChange(Math.min(max, Math.max(min, value + delta)))
  }
  return (
    <div className="control-row">
      <div><strong>{label}</strong><span>{note}</span></div>
      <div className="stepper">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => step(-1)}>
          <Minus size={14} strokeWidth={2.2} />
        </button>
        <output className="stepper-value" aria-live="polite">
          <span key={value} className={direction ? `roll-${direction}` : ''}>{value}</span>
        </output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => step(1)}>
          <Plus size={14} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  )
}

/* The menu is always rendered and shown with a class, so closing
   animates out as well as in. Focus lives in the menu while it is open;
   losing it is what closes the menu, whether by click or by Tab. */
export function Select({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const trigger = useRef(null)
  const id = useId()

  useEffect(() => {
    if (open) root.current.querySelector('[aria-selected="true"]')?.focus()
  }, [open])

  const choose = (option) => { onChange(option); setOpen(false); trigger.current.focus() }

  const onKeyDown = (event) => {
    if (event.key === 'Escape' && open) {
      // Close the menu only — not the expanded view around it.
      event.stopPropagation()
      setOpen(false)
      trigger.current.focus()
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) return setOpen(true)
      const items = [...root.current.querySelectorAll('[role="option"]')]
      const index = items.indexOf(document.activeElement)
      items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus()
    }
  }

  return (
    <div className={`select ${open ? 'is-open' : ''}`} ref={root} onKeyDown={onKeyDown}
      onBlur={(event) => { if (!root.current.contains(event.relatedTarget)) setOpen(false) }}>
      <span className="mono-label">{label}</span>
      <button className="select-trigger" type="button" ref={trigger} aria-haspopup="listbox"
        aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span>{value}</span>
        <ChevronDown size={15} strokeWidth={2} />
      </button>
      <div className="select-menu" role="listbox" id={id} aria-label={label}>
        {options.map((option) => (
          <button key={option} type="button" role="option" tabIndex={-1} aria-selected={option === value}
            onClick={() => choose(option)}>
            {option}
            {option === value && <Check size={14} strokeWidth={2.2} />}
          </button>
        ))}
      </div>
    </div>
  )
}

export function SearchField({ value, onChange }) {
  const input = useRef(null)
  const clear = () => { onChange(''); input.current.focus() }
  return (
    <div className={`search-field ${value ? 'has-value' : ''}`}>
      <Search className="search-icon" size={15} strokeWidth={2} aria-hidden="true" />
      <input ref={input} type="search" placeholder="Search components" aria-label="Search components" value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          // A first Escape clears the query; the next one closes the view.
          if (event.key === 'Escape' && value) { event.preventDefault(); event.stopPropagation(); onChange('') }
        }} />
      <button className="search-clear" type="button" aria-label="Clear search" tabIndex={value ? 0 : -1} onClick={clear}>
        <X size={13} strokeWidth={2.2} />
      </button>
    </div>
  )
}

export function TextArea({ label, value, onChange, limit = 140 }) {
  return (
    <label className="text-field">
      <span className="field-head">
        <span className="mono-label">{label}</span>
        <span className={`mono-value ${value.length >= limit * .85 ? 'is-near' : ''}`}>{value.length} / {limit}</span>
      </span>
      <textarea rows={3} maxLength={limit} placeholder="Say something kind…" value={value}
        onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

/* One real input laid over the boxes takes the typing, paste and autofill;
   the boxes only draw what is in it. */
export function CodeInput({ label, value, onChange, length = 6 }) {
  const [focused, setFocused] = useState(false)
  const caret = Math.min(value.length, length - 1)
  return (
    <label className="code-field">
      <span className="field-head">
        <span className="mono-label">{label}</span>
        <span className="mono-value">{value.length === length ? 'Complete' : `${value.length} / ${length}`}</span>
      </span>
      <span className="code-boxes" style={{ '--count': length }}>
        <input inputMode="numeric" autoComplete="one-time-code" maxLength={length} value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, length))}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        {Array.from({ length }, (_, index) => (
          <span key={index} aria-hidden="true"
            className={`code-box ${value[index] ? 'is-filled' : ''} ${focused && index === caret ? 'is-active' : ''}`}>
            {value[index] && <span className="code-digit">{value[index]}</span>}
          </span>
        ))}
      </span>
    </label>
  )
}

export function Chips({ label, options, value, onChange }) {
  return (
    <div className="chips-field">
      <span className="mono-label">{label}</span>
      <div className="chips" role="group" aria-label={label}>
        {options.map((option) => {
          const on = value.includes(option)
          return (
            <button key={option} type="button" className={`chip ${on ? 'is-on' : ''}`} aria-pressed={on}
              onClick={() => onChange(on ? value.filter((item) => item !== option) : [...value, option])}>
              <span className="chip-check"><CheckMark /></span>
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Tabs({ label, tabs, value, onChange }) {
  const index = tabs.findIndex(([key]) => key === value)
  /* The panel fades in when the tab changes, not when the page loads. */
  const moved = useRef(false)
  const select = (key) => { moved.current = true; onChange(key) }
  const id = useId()
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label={label} style={{ '--count': tabs.length, '--index': index }}
        onKeyDown={(event) => arrowStep(event, tabs.length, index, (next) => select(tabs[next][0]))}>
        {tabs.map(([key, title]) => (
          <button key={key} type="button" role="tab" data-step id={`${id}-${key}`} aria-selected={key === value}
            aria-controls={`${id}-panel`} tabIndex={key === value ? 0 : -1} onClick={() => select(key)}>
            {title}
          </button>
        ))}
        <span className="tab-indicator" aria-hidden="true" />
      </div>
      <p className={`tab-panel ${moved.current ? 'is-entering' : ''}`} key={value} role="tabpanel"
        id={`${id}-panel`} aria-labelledby={`${id}-${value}`}>
        {tabs[index][2]}
      </p>
    </div>
  )
}

/* Height is animated with a 0fr → 1fr grid row, so no panel has to be
   measured. One item open at a time; opening the open one closes it. */
export function Accordion({ items, value, onChange }) {
  const id = useId()
  return (
    <div className="accordion">
      {items.map(([key, title, body]) => {
        const open = key === value
        return (
          <div className={`accordion-item ${open ? 'is-open' : ''}`} key={key}>
            <button type="button" aria-expanded={open} aria-controls={`${id}-${key}`} onClick={() => onChange(open ? null : key)}>
              {title}
              <Plus size={15} strokeWidth={2} />
            </button>
            <div className="accordion-panel" id={`${id}-${key}`}>
              <div><p>{body}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Progress({ name, size, value, onReplay }) {
  const done = value >= 100
  return (
    <div className="progress">
      <div className="control-row">
        <div><strong>{name}</strong><span>{done ? 'Upload complete' : size}</span></div>
        <div className="progress-end">
          <span className="mono-value">{value}%</span>
          <button className={`icon-button is-small ${done ? '' : 'is-hidden'}`} type="button" aria-label="Upload again"
            tabIndex={done ? 0 : -1} onClick={onReplay}>
            <RotateCcw size={13} strokeWidth={2.2} />
          </button>
        </div>
      </div>
      <div className="progress-track" role="progressbar" aria-label={`Uploading ${name}`}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <span className="progress-fill" style={{ transform: `scaleX(${value / 100})` }} />
      </div>
    </div>
  )
}

/* The tooltip is a quiet hint on the raised gray, with no edge. It shows on
   hover and focus, and stays up for a moment to confirm a copy. */
export function CopyLink() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setCopied(true)
  }
  return (
    <div className="control-row">
      <div><strong>Share</strong><span>Copy a link to this kit</span></div>
      <span className={`tooltip-anchor ${copied ? 'is-shown' : ''}`}>
        <button className={`icon-button ${copied ? 'is-on' : ''}`} type="button"
          aria-label={copied ? 'Link copied' : 'Copy link'} onClick={copy}>
          <Copy className="icon-out" size={15} strokeWidth={2} />
          <Check className="icon-in" size={15} strokeWidth={2.4} />
        </button>
        <span className="tooltip" aria-hidden="true">
          <span className="tooltip-label">Copy link</span>
          <span className="tooltip-label is-copied">Copied</span>
        </span>
      </span>
    </div>
  )
}

/* Same sliding thumb as the segmented control, under the page numbers. */
export function Pagination({ value, onChange, total = 6, perPage = 10 }) {
  return (
    <div className="pagination-field">
      <nav className="pagination" aria-label="Pagination">
        <button className="icon-button" type="button" aria-label="Previous page" disabled={value <= 1} onClick={() => onChange(value - 1)}>
          <ChevronLeft size={15} strokeWidth={2} />
        </button>
        <div className="pages" style={{ '--count': total, '--index': value - 1 }}>
          <span className="segmented-thumb" aria-hidden="true" />
          {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
            <button key={page} type="button" className={page === value ? 'is-active' : ''}
              aria-current={page === value ? 'page' : undefined} onClick={() => onChange(page)}>
              {page}
            </button>
          ))}
        </div>
        <button className="icon-button" type="button" aria-label="Next page" disabled={value >= total} onClick={() => onChange(value + 1)}>
          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </nav>
      <span className="mono-label">Results {(value - 1) * perPage + 1}–{value * perPage} of {total * perPage}</span>
    </div>
  )
}

export function Spinner({ label, note }) {
  return (
    <div className="control-row" role="status">
      <div><strong>{label}</strong><span>{note}</span></div>
      <span className="spinner" aria-hidden="true" />
    </div>
  )
}

const RATINGS = ['Poor', 'Fair', 'Good', 'Great', 'Excellent']

export function Rating({ value, onChange }) {
  /* Hovering previews a score without committing it. */
  const [preview, setPreview] = useState(null)
  const shown = preview ?? value
  return (
    <div className="rating-field">
      <div className="rating" role="radiogroup" aria-label="Rating" onMouseLeave={() => setPreview(null)}
        onKeyDown={(event) => arrowStep(event, RATINGS.length, value - 1, (next) => onChange(next + 1))}>
        {RATINGS.map((label, index) => (
          <button key={label} type="button" role="radio" data-step aria-checked={value === index + 1} aria-label={label}
            tabIndex={value === index + 1 ? 0 : -1} className={`star ${index < shown ? 'is-on' : ''}`}
            style={{ '--delay': `${index * 30}ms` }}
            onMouseEnter={() => setPreview(index + 1)} onClick={() => onChange(index + 1)}>
            <Star size={22} strokeWidth={1.6} />
          </button>
        ))}
      </div>
      <span className="mono-label">{RATINGS[shown - 1]}</span>
    </div>
  )
}
