# Checkbox

Use for an independent binary choice, with an optional supporting note. Keep the real input for labels, focus, and native keyboard behavior.

```jsx
<label className="checkbox-row">
  <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
  <span className="checkbox-box"><CheckMark /></span>
  <span><strong>Remember me</strong><small>Keep this device signed in</small></span>
</label>
```

`CheckMark` is exported from `controls.jsx`. The box is 22×22px, radius 7px, with a 14px tick. Label gap is 14px. The outline uses `--line`; checked is white with a `#0b0b0b` tick.

```css
.checkbox-row { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.checkbox-row input { position: absolute; opacity: 0; pointer-events: none; }
.checkbox-box {
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--line);
  transition: background-color 200ms ease, box-shadow 200ms ease;
}
.checkbox-row:hover .checkbox-box { box-shadow: inset 0 0 0 1px var(--line-hover); }
.checkbox-row input:checked + .checkbox-box {
  background: #fff;
  box-shadow: inset 0 0 0 1px #fff;
}
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
.checkbox-row input:checked + .checkbox-box .check-mark {
  stroke-dashoffset: 0;
  transition-delay: 70ms;
}
.checkbox-row input:focus-visible + .checkbox-box { outline: 2px solid rgba(255, 255, 255, .8); outline-offset: 3px; }
```

On selection the fill and hairline change over 200ms, and the tick draws over 240ms after a 70ms delay, so the box fills first and the tick follows into it. Unchecking wipes the tick straight off, with no delay. The tick is one stroke with `pathLength="1"`, which is why `stroke-dashoffset` alone can draw it. It is a transition rather than a keyframe so it reverses. An initially checked box is already drawn; nothing plays on mount.

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
```

Source: [main.jsx](../../src/main.jsx), checkbox demo; [controls.jsx](../../src/controls.jsx), `CheckMark`; [styles.css](../../src/styles.css), `.checkbox-*`, `.check-mark`.
