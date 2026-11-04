# Stepper

Use for a small bounded integer quantity.

```jsx
<Stepper label="Seats" note="Billed per member" value={seats}
  onChange={setSeats} min={1} max={20} />
```

Exported from `controls.jsx`. Defaults: min 1, max 20; +/- changes by one and clamps the value. Buttons disable at bounds. Keep the input value in range.

```css
.stepper { display: flex; align-items: center; padding: 3px; border-radius: 10px; box-shadow: inset 0 0 0 1px var(--line); }
.stepper button {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #bdbdbd;
  cursor: pointer;
  transition: color 180ms ease-out, transform 140ms cubic-bezier(.22, 1, .36, 1);
}
.stepper button:hover:not(:disabled) { color: #fff; }
.stepper button:active:not(:disabled) { transform: scale(.88); }
.stepper button:disabled { color: #3d3d3d; cursor: default; }
.stepper-value {
  width: 34px;
  height: 30px;
  display: grid;
  place-items: center;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.roll-up { animation: roll-up 260ms cubic-bezier(.22, 1, .36, 1); }
.roll-down { animation: roll-down 260ms cubic-bezier(.22, 1, .36, 1); }
@keyframes roll-up { from { opacity: 0; transform: translateY(9px); } }
@keyframes roll-down { from { opacity: 0; transform: translateY(-9px); } }
```

The number rolls the way it moved: over 260ms it rises 9px for a step up (`roll-up`) or drops 9px for a step down (`roll-down`), clipped by `.stepper-value`. `key={value}` mounts a new `<span>` per value so the keyframe replays, and `direction` stays null until the first step so nothing animates on load. Keep both.

Hover brightens enabled icons over 180ms; pressing scales them to .88 over 140ms. Preserve the output's polite live announcement.

## Component

```jsx
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
```

Source: [controls.jsx](../../src/controls.jsx), `Stepper`; [styles.css](../../src/styles.css), `.stepper*`.
