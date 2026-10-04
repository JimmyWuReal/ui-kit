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
.checkbox-box { width: 22px; height: 22px; flex-shrink: 0; display: grid; place-items: center; border-radius: 7px; box-shadow: inset 0 0 0 1px var(--line); }
.checkbox-row:hover .checkbox-box { box-shadow: inset 0 0 0 1px var(--line-hover); }
.checkbox-row input:checked + .checkbox-box { background: #fff; box-shadow: inset 0 0 0 1px #fff; }
.checkbox-row input:focus-visible + .checkbox-box { outline: 2px solid rgba(255,255,255,.8); outline-offset: 3px; }
```

Copy the `.check-mark` stroke rules and label typography from the source. On user selection, the fill changes over 200ms and the tick draws over 240ms after 70ms. Initial checked state is already drawn; do not animate it on mount.

Source: [main.jsx](../../src/main.jsx), checkbox demo; [controls.jsx](../../src/controls.jsx), `CheckMark`; [styles.css](../../src/styles.css), `.checkbox-*`, `.check-mark`.
