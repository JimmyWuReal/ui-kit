# Calendar

Use to show things by date across a month. Weeks start on Monday. Days are flat cells, today's date is filled white, and the selected day takes the live hairline.

```jsx
<Calendar events={{ 4: ['Design review'], 11: ['Team sync', 'Pricing call'] }} />
```

Exported from `patterns.jsx`. `events` is sample data keyed by day of the month, so it repeats every month. Key real events by full date, and update `eventsOn` to match. Use the `.mono-label` from the [shared foundation](../SKILL.md#shared-foundation) for weekdays, and [icon buttons](../elements/icon-button.md) for the month arrows.

```css
.calendar-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.calendar-head h3 { margin: 0; font-size: 14px; font-weight: 500; }
.calendar-nav { display: flex; gap: 10px; }
.calendar-weekdays, .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.calendar-weekdays { margin-bottom: 10px; }
.calendar-weekdays span { padding-left: 8px; }
.calendar-day {
  min-width: 0;
  min-height: 88px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border: 0;
  border-radius: 8px;
  background: #161616;
  text-align: left;
  cursor: pointer;
  transition: background-color 200ms ease, box-shadow 200ms ease, transform 140ms cubic-bezier(.22, 1, .36, 1);
}
.calendar-day:hover { background: #1c1c1c; }
.calendar-day:active { transform: scale(.97); transition-duration: 55ms; }
.calendar-day[aria-pressed='true'] { box-shadow: inset 0 0 0 1px var(--line-live); }
.calendar-day.is-outside { background: transparent; }
.calendar-date { width: 22px; height: 22px; display: grid; place-items: center; margin: -2px 0 0 -2px; border-radius: 50%; color: #a8a8a8; font: 400 11px/1 'DM Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; }
.is-outside .calendar-date { color: var(--dim); }
.is-today .calendar-date { color: #0a0a0a; background: #fff; }
.calendar-events { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.calendar-events span { overflow: hidden; color: #d6d6d6; font-size: 11px; line-height: 1.4; text-overflow: ellipsis; white-space: nowrap; }
.calendar-dots { display: none; gap: 3px; }
.calendar-dots i { width: 5px; height: 5px; border-radius: 50%; background: #d6d6d6; }
.calendar-agenda { display: flex; flex-direction: column; gap: 6px; margin-top: 20px; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
.calendar-agenda strong { font-size: 13px; font-weight: 500; letter-spacing: -.01em; color: #fff; }
.calendar-agenda ul { margin: 0; padding: 0; list-style: none; }
@media (max-width: 680px) {
  .calendar-weekdays, .calendar-grid { gap: 3px; }
  .calendar-weekdays span { padding-left: 0; text-align: center; }
  .calendar-day { min-height: 52px; align-items: center; gap: 5px; padding: 6px 2px; }
  .calendar-date { margin: 0; }
  .calendar-events { display: none; }
  .calendar-dots { display: flex; }
}
```

**The agenda under the grid is not optional.** On a phone a day is about 38px wide, so titles become dots, and the agenda is the only place the words remain. It announces changes through `aria-live`.

Only one day is a Tab stop, and arrow keys move by day and week, turning the month at its edges, so a month is not 35 Tab stops. Each day's `aria-label` carries its full date and event count, since the cell shows only a number. Choosing a day from a neighbouring month brings that month into view.

Hover and the selected hairline change over 200ms `ease`, and a press scales to .97 over 55ms like a button. Months swap instantly, like pages.

## Component

```jsx
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
```

Source: [patterns.jsx](../../src/patterns.jsx), `Calendar`; [styles.css](../../src/styles.css), `.calendar*`.
