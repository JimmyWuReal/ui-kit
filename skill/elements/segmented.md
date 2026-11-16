# Segmented control

Use for a few mutually exclusive modes, such as a view switch. To move between pages, use `SegmentedNav` from the [site shell](site-shell.md): the same look, built from real links. It measures the selected label so unequal-length options get equal padding, rather than equal label widths.

```jsx
<Segmented label="View" options={['List', 'Board', 'Calendar']}
  value={view} onChange={setView} />
```

Exported from `controls.jsx`. `value` must match an option; `onChange` receives the option string.

```css
.segmented {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--count), auto);
  padding: 4px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px var(--line);
}
.segmented-thumb {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / var(--count));
  border-radius: 8px;
  background: #fff;
  transform: translateX(calc(var(--index) * 100%));
  transition: transform 320ms cubic-bezier(.22, 1, .36, 1);
}
.segmented .segmented-thumb {
  left: 0;
  width: var(--thumb-width);
  transform: translateX(var(--thumb-x));
  transition: transform 320ms cubic-bezier(.22, 1, .36, 1), width 320ms cubic-bezier(.22, 1, .36, 1);
}
.segmented :is(button, a),
.pages button {
  position: relative;
  z-index: 1;
  height: 36px;
  padding: 0 16px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8a8a8a;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: -.01em;
  cursor: pointer;
  transition: color 260ms ease;
}
.segmented :is(button, a):not(.is-active):hover,
.pages button:not(.is-active):hover { color: #e6e6e6; }
.segmented :is(button, a).is-active,
.pages button.is-active { color: #0a0a0a; }
.segmented a { display: grid; place-items: center; text-decoration: none; }
```

Keep the layout measurement and ResizeObserver so the thumb stays aligned after fonts load or the control resizes. The thumb is not rendered until the first measurement, so it lands in place on load instead of sliding in from the left. Selection slides and resizes it over 320ms while the label colors cross-fade over 260ms. Hover text brightens to `#e6e6e6`. Arrow keys move focus and selection; only the selected option is tabbable.

## Component

```jsx
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

/* Measures the active item so one white thumb can slide and resize to it.
   Each item is as wide as its label, so short and long words get the same room
   around them. The result stays null until the first measurement, and whenever
   nothing is active, so the thumb lands in place rather than sliding in from
   the left. */
function useThumb(ref, index, count) {
  const [thumb, setThumb] = useState(null)
  useLayoutEffect(() => {
    const items = ref.current.querySelectorAll('button, a')
    const measure = () => {
      const active = items[index]
      setThumb(active ? { '--thumb-x': `${active.offsetLeft}px`, '--thumb-width': `${active.offsetWidth}px` } : null)
    }
    measure()
    /* Widths change when the web font arrives and when the control is resized. */
    const observer = new ResizeObserver(measure)
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [index, count])
  return thumb
}

/* The white thumb is one element moved by index, so it slides between
   segments instead of each segment fading its own fill. */
export function Segmented({ label, options, value, onChange }) {
  const index = options.indexOf(value)
  const ref = useRef(null)
  const thumb = useThumb(ref, index, options.length)

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
```

Source: [controls.jsx](../../src/controls.jsx), `Segmented`, `useThumb`, `arrowStep`; [styles.css](../../src/styles.css), `.segmented*`.
