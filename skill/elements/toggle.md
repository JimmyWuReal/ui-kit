# Toggle

Use for an on/off setting that takes effect immediately. Use a checkbox when choosing values to submit later.

```jsx
<button className={`toggle ${enabled ? 'is-on' : ''}`} type="button"
  role="switch" aria-checked={enabled} aria-label="Notifications"
  onClick={() => setEnabled(!enabled)}>
  <span className="toggle-knob" />
</button>
```

```css
.toggle {
  position: relative;
  flex: 0 0 auto;
  width: 46px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #0a0a0a;
  box-shadow: inset 0 0 0 1px var(--line);
  cursor: pointer;
  transition: background-color 260ms ease, box-shadow 260ms ease;
}
.toggle:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.toggle-knob {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #6d6d6d;
  /* Both knobs are 16px, but light-on-dark irradiates and reads larger
     than dark-on-light. Take ~8% off the off state so the two match by
     eye — the growth on the way across is the compensation, not a flourish. */
  transform: scale(.92);
  transition:
    transform 320ms cubic-bezier(.22, 1, .36, 1),
    background-color 260ms ease;
}
.toggle.is-on { background: #fff; box-shadow: inset 0 0 0 1px #fff; }
.toggle.is-on .toggle-knob { transform: translateX(20px) scale(1); background: #0a0a0a; }
```

Place the title and note alongside it using `.control-row`. Switching slides the knob over 320ms while track and knob colors cross over 260ms. The off knob sits at `scale(.92)` on purpose: light on dark reads larger, so the growth on the way across is optical compensation, not a flourish. Initialize directly in the saved state.

Source: [main.jsx](../../src/main.jsx), toggle demo; [styles.css](../../src/styles.css), `.toggle*`.
