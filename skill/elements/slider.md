# Slider

Use for a continuous numeric range. Show the current value alongside the mono label.

```jsx
<Slider label="Volume" value={volume} onChange={setVolume}
  min={0} max={100} unit="%" />
```

Exported from `controls.jsx`. Defaults: min 0, max 100, unit `%`. `onChange` receives a number. Keep `max > min` and the value within range.

The track is 4px high, white for the filled portion, and `rgba(255,255,255,.12)` for the remainder. The knob is a solid white 18px circle; the label-to-track gap is 16px.

```css
.slider-field { display: flex; flex-direction: column; gap: 16px; }
.slider-field input::-webkit-slider-runnable-track { height: 4px; border-radius: 999px; background: linear-gradient(#fff,#fff) 0 0 / var(--fill) 100% no-repeat, rgba(255,255,255,.12); }
.slider-field input::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -7px; border-radius: 50%; background: #fff; }
```

Copy the range-input reset and Firefox pseudo-element rules too. Pressing scales the knob to 1.15 over 180ms; the fill follows the actual value immediately. There is no initial fill sweep.

Source: [controls.jsx](../../src/controls.jsx), `Slider`; [styles.css](../../src/styles.css), `.slider-field` and its range pseudo-elements.
