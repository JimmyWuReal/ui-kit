# Radio group

Use when one option must be selected, especially when each choice needs a note.

```jsx
<RadioGroup label="Plan" value={plan} onChange={setPlan} options={[
  ['solo', 'Solo', 'One seat'],
  ['team', 'Team', 'Shared workspace'],
]} />
```

Exported from `controls.jsx`. `options` are `[key, title, note]` tuples; `value` is a key and `onChange` receives a key. The component creates a unique native radio name per group.

```css
.radio-group { display: flex; flex-direction: column; gap: 16px; }
.radio-row { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.radio-row input { position: absolute; opacity: 0; pointer-events: none; }
.radio-dot {
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--line);
  transition: background-color 200ms ease, box-shadow 200ms ease;
}
.radio-dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0b0b0b;
  transform: scale(0);
  transition: transform 240ms cubic-bezier(.65, 0, .35, 1);
}
.radio-row:hover .radio-dot { box-shadow: inset 0 0 0 1px var(--line-hover); }
.radio-row input:checked + .radio-dot { background: #fff; box-shadow: inset 0 0 0 1px #fff; }
.radio-row input:checked + .radio-dot::after { transform: scale(1); transition-delay: 70ms; }
.radio-row input:focus-visible + .radio-dot { outline: 2px solid rgba(255, 255, 255, .8); outline-offset: 3px; }
```

The inner dot is 8px and dark. Hover brightens the outline. Selecting changes the fill over 200ms and scales the dot in over 240ms after a 70ms delay, following the checkbox's rhythm; the outgoing dot scales out with no delay. A preselected option is fully visible at first render.

## Component

```jsx
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
```

Source: [controls.jsx](../../src/controls.jsx), `RadioGroup`; [styles.css](../../src/styles.css), `.radio-*`.
