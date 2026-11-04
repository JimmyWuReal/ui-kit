# Chips

Use for a small set of independent selectable filters or interests. Use [segmented](segmented.md) for an exclusive mode instead.

```jsx
<Chips label="Interests" options={['Motion', 'Type', 'Layout']}
  value={topics} onChange={setTopics} />
```

Exported from `controls.jsx`. `value` is an array of selected strings; `onChange` receives the next array. Buttons expose selection with `aria-pressed`.

```css
.check-mark {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #0b0b0b;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 240ms cubic-bezier(.65, 0, .35, 1);
}
.chips-field { display: flex; flex-direction: column; gap: 12px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  height: 34px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #a8a8a8;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: -.01em;
  box-shadow: inset 0 0 0 1px var(--line);
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease, box-shadow 200ms ease, padding 240ms cubic-bezier(.22, 1, .36, 1);
}
.chip:hover { color: #e6e6e6; box-shadow: inset 0 0 0 1px var(--line-hover); }
.chip.is-on { padding-left: 11px; color: #0a0a0a; background: #fff; box-shadow: inset 0 0 0 1px #fff; }
.chip-check { width: 0; display: flex; overflow: hidden; transition: width 240ms cubic-bezier(.22, 1, .36, 1), margin 240ms cubic-bezier(.22, 1, .36, 1); }
.chip.is-on .chip-check { width: 14px; margin-right: 6px; }
.chip-check .check-mark { flex: 0 0 auto; }
.chip.is-on .check-mark { stroke-dashoffset: 0; transition-delay: 70ms; }
```

Hover brightens the hairline and text. On selection the fill changes over 200ms, the tick's 14px space and 6px gap open over 240ms while the left padding eases to match, and the tick draws over 240ms after 70ms. Deselecting reverses it with no delay. Initially selected chips render fully selected, without a startup animation.

## Component

```jsx
/* One continuous stroke, so the tick can be drawn on and wiped off with
   dashoffset alone. pathLength normalises the dash maths to 0—1. */
export function CheckMark() {
  return (
    <svg className="check-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" pathLength="1" />
    </svg>
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
```

Source: [controls.jsx](../../src/controls.jsx), `Chips`, `CheckMark`; [styles.css](../../src/styles.css), `.chips*`, `.chip*`, `.check-mark`.
