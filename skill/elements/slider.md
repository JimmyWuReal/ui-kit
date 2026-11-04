# Slider

Use for a continuous numeric range. Show the current value alongside the mono label.

```jsx
<Slider label="Volume" value={volume} onChange={setVolume}
  min={0} max={100} unit="%" />
```

Exported from `controls.jsx`. Defaults: min 0, max 100, unit `%`. `onChange` receives a number. Keep `max > min` and the value within range.

The track is 4px high, white for the filled portion, and `rgba(255,255,255,.12)` for the remainder. The knob is a solid white 18px circle; the label-to-track gap is 16px.

```css
.slider-field, .progress { --rail: rgba(255, 255, 255, .12); }
.slider-field { display: flex; flex-direction: column; gap: 16px; }
.slider-field input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 18px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}
.slider-field input::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(#fff, #fff) 0 0 / var(--fill) 100% no-repeat, var(--rail);
}
.slider-field input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin-top: -7px;
  border-radius: 50%;
  background: #fff;
  transition: transform 180ms cubic-bezier(.22, 1, .36, 1);
}
.slider-field input:active::-webkit-slider-thumb { transform: scale(1.15); }
.slider-field input::-moz-range-track { height: 4px; border-radius: 999px; background: var(--rail); }
.slider-field input::-moz-range-progress { height: 4px; border-radius: 999px; background: #fff; }
.slider-field input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  transition: transform 180ms cubic-bezier(.22, 1, .36, 1);
}
.slider-field input:active::-moz-range-thumb { transform: scale(1.15); }
```

The range-input reset and Firefox pseudo-elements above use the same `--rail`. Do not name it `--track`, which is the mono label's letter-spacing. Pressing scales the knob to 1.15 over 180ms. The fill has no transition: it follows the value immediately, and there is no initial sweep.

## Component

```jsx
export function Slider({ label, value, onChange, min = 0, max = 100, unit = '%' }) {
  return (
    <label className="slider-field">
      <span className="field-head"><span className="mono-label">{label}</span><output className="mono-value">{value}{unit}</output></span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))}
        style={{ '--fill': `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Slider`; [styles.css](../../src/styles.css), `.slider-field` and its range pseudo-elements.
