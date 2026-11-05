import React, { useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CheckMark } from './controls.jsx'

/* How the elements combine in a product. Like the controls, these keep their
   data with the page; only passing state, such as a selected day, stays here. */

/* A checkbox row with its title on the first line. `actions` are quiet icon
   buttons, revealed on hover or keyboard focus and always shown on touch. */
export function ListRow({ title, note, done, onToggle, actions }) {
  return (
    <li className={`list-row ${done ? 'is-done' : ''}`}>
      <label className="checkbox-row">
        <input type="checkbox" checked={done} onChange={onToggle} />
        <span className="checkbox-box"><CheckMark /></span>
        <span><strong>{title}</strong>{note && <small>{note}</small>}</span>
      </label>
      {actions && <div className="row-actions">{actions}</div>}
    </li>
  )
}

/* An empty region keeps its place on the page and says what to do next. */
export function EmptyState({ title, note, action }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      {note && <p>{note}</p>}
      {action}
    </div>
  )
}

/* `stats` are [label, value] pairs. A definition list, so each value is read
   with its label. */
export function StatRow({ stats }) {
  return (
    <dl className="stat-row">
      {stats.map(([label, value]) => (
        <div className="card" key={label}>
          <dt className="mono-label">{label}</dt>
          <dd className="stat-value is-small">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/* `columns` are { title, cards: [{ title, note }] }. The row scrolls by itself,
   so it takes focus to let a keyboard reach the columns past its edge. */
export function Board({ label, columns }) {
  return (
    <div className="board" role="group" aria-label={label} tabIndex={0}>
      {columns.map((column) => (
        <section className="board-column" key={column.title} aria-label={column.title}>
          <header className="board-head">
            <h3>{column.title}</h3>
            <span className="mono-value">{column.cards.length}</span>
          </header>
          {column.cards.length ? (
            <ul className="board-cards">
              {column.cards.map((card) => (
                <li className="board-card" key={card.title}>
                  <strong>{card.title}</strong>
                  {card.note && <small>{card.note}</small>}
                </li>
              ))}
            </ul>
          ) : <p className="board-empty">Nothing here</p>}
        </section>
      ))}
    </div>
  )
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dayKey = (date) => date.toDateString()

/* Whole weeks, Monday first, covering the month of `first`. */
function monthDays(first) {
  const lead = (first.getDay() + 6) % 7
  const length = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const count = Math.ceil((lead + length) / 7) * 7
  return Array.from({ length: count }, (_, index) =>
    new Date(first.getFullYear(), first.getMonth(), index - lead + 1))
}

/* `events` maps a day of the month to its titles, the same for every month
   since this is sample data; key yours by full date. Only the selected day is
   a Tab stop, and arrow keys move between days and across months, so a month is
   not 35 Tab stops. */
export function Calendar({ events }) {
  const today = new Date()
  const [shown, setShown] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(today)
  const grid = useRef(null)
  const moved = useRef(false)

  const days = monthDays(shown)
  const eventsOn = (date) => events[date.getDate()] ?? []
  const turn = (step) => setShown(new Date(shown.getFullYear(), shown.getMonth() + step, 1))
  const select = (date) => {
    setSelected(date)
    /* A day from a neighbouring month brings that month into view. */
    if (date.getMonth() !== shown.getMonth()) setShown(new Date(date.getFullYear(), date.getMonth(), 1))
  }
  /* The selected day can sit in another month after turning the page; the first
     of the month then holds the Tab stop. */
  const tabStop = days.some((date) => dayKey(date) === dayKey(selected)) ? dayKey(selected) : dayKey(shown)

  const onKeyDown = (event, date) => {
    const delta = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[event.key]
    if (!delta) return
    event.preventDefault()
    moved.current = true
    select(new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta))
  }

  /* Focus follows the Tab stop once it has rendered, which may be in a new month. */
  useLayoutEffect(() => {
    if (!moved.current) return
    moved.current = false
    grid.current.querySelector('[tabindex="0"]').focus()
  })

  const agenda = eventsOn(selected)
  const longDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="calendar">
      <div className="calendar-head">
        <h3>{shown.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <div className="calendar-nav">
          <button className="icon-button" type="button" aria-label="Previous month" onClick={() => turn(-1)}><ChevronLeft size={15} strokeWidth={2} aria-hidden="true" /></button>
          <button className="icon-button" type="button" aria-label="Next month" onClick={() => turn(1)}><ChevronRight size={15} strokeWidth={2} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="calendar-weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => <span className="mono-label" key={day}>{day}</span>)}
      </div>
      <div className="calendar-grid" ref={grid}>
        {days.map((date) => {
          const key = dayKey(date)
          const titles = eventsOn(date)
          const classes = [date.getMonth() !== shown.getMonth() && 'is-outside', key === dayKey(today) && 'is-today']
          return (
            <button className={`calendar-day ${classes.filter(Boolean).join(' ')}`} key={key} type="button"
              aria-pressed={key === dayKey(selected)} tabIndex={key === tabStop ? 0 : -1}
              aria-label={`${longDate(date)}, ${titles.length} ${titles.length === 1 ? 'event' : 'events'}`}
              onClick={() => select(date)} onKeyDown={(event) => onKeyDown(event, date)}>
              <span className="calendar-date">{date.getDate()}</span>
              <span className="calendar-events">{titles.map((title) => <span key={title}>{title}</span>)}</span>
              <span className="calendar-dots">{titles.map((title) => <i key={title} />)}</span>
            </button>
          )
        })}
      </div>
      <div className="calendar-agenda" aria-live="polite">
        <strong>{longDate(selected)}</strong>
        {agenda.length ? <ul>{agenda.map((title) => <li key={title}>{title}</li>)}</ul> : <span>Nothing planned</span>}
      </div>
    </div>
  )
}
