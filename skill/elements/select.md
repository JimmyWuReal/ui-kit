# Select

Use for one choice from an option list. The trigger shares the [text field](text-field.md) box; the menu uses the raised surface.

```jsx
<Select label="Region" options={['Taipei', 'Tokyo', 'Singapore']}
  value={region} onChange={setRegion} />
```

Exported from `controls.jsx`. `options` are strings; `value` must match one and `onChange` receives the chosen string.

```css
.text-field input,
.text-field textarea,
.search-field input,
.select-trigger {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  outline: 0;
  color: #ededed;
  background: transparent;
  font-size: 13px;
  letter-spacing: -.01em;
  box-shadow: inset 0 0 0 1px var(--line);
  transition: box-shadow 200ms ease;
}
.text-field :is(input, textarea):hover,
.search-field input:hover,
.select-trigger:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.text-field :is(input, textarea):focus,
.search-field input:focus,
.select.is-open .select-trigger { box-shadow: inset 0 0 0 1px var(--line-live); }
.select { position: relative; display: flex; flex-direction: column; gap: 12px; }
.select-trigger { display: flex; align-items: center; justify-content: space-between; padding: 0 14px 0 16px; text-align: left; cursor: pointer; }
.select-trigger svg { color: #8a8a8a; transition: transform 320ms cubic-bezier(.22, 1, .36, 1), color 200ms ease; }
.select.is-open .select-trigger svg { transform: rotate(180deg); color: #fff; }
.select-menu {
  position: absolute;
  z-index: 5;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 12px;
  background: #1c1c1c;
  box-shadow: inset 0 0 0 1px var(--line);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px) scale(.98);
  transform-origin: top;
  transition: opacity 160ms ease-out, transform 240ms cubic-bezier(.22, 1, .36, 1), visibility 0s 240ms;
}
.select.is-open .select-menu { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
.select-menu button {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 11px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a8a8a8;
  font-size: 13px;
  letter-spacing: -.01em;
  text-align: left;
  cursor: pointer;
  transition: background-color 140ms ease-out, color 140ms ease-out;
}
.select-menu button:is(:hover, :focus-visible) { outline: 0; color: #fff; background: rgba(255, 255, 255, .07); }
.select-menu button[aria-selected='true'] { color: #fff; }
```

The menu stays mounted and is shown by class, so it eases both ways: opacity over 160ms, and `translateY(-4px) scale(.98)` settling over 240ms from a top origin. On close, `visibility` waits 240ms so the menu can finish leaving; `.is-open` clears that delay. The chevron rotates 180° over 320ms and brightens over 200ms. Option hover / focus colors change over 140ms; hovered options use a 7% white fill.

Keep ArrowUp/Down navigation, focus on the selected option when opened, Escape dismissal, Tab-out dismissal, and trigger focus after choosing. Connect the trigger to its listbox with a unique ID. If options are numerous, give the menu a maximum height and scrolling.

## Component

```jsx
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
```

Source: [controls.jsx](../../src/controls.jsx), `Select`; [styles.css](../../src/styles.css), `.select*` and shared field rules.
