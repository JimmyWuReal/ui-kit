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
.toggle { position: relative; width: 46px; height: 26px; flex-shrink: 0; padding: 0; border: 0; border-radius: 999px; background: #0a0a0a; box-shadow: inset 0 0 0 1px var(--line); cursor: pointer; transition: background-color 260ms ease, box-shadow 260ms ease; }
.toggle:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.toggle-knob { position: absolute; top: 5px; left: 5px; width: 16px; height: 16px; border-radius: 50%; background: #6d6d6d; transform: scale(.92); transition: transform 320ms cubic-bezier(.22,1,.36,1), background-color 260ms ease; }
.toggle.is-on { background: #fff; box-shadow: inset 0 0 0 1px #fff; }
.toggle.is-on .toggle-knob { background: #0a0a0a; transform: translateX(20px) scale(1); }
```

Place the title and note alongside it using `.control-row`. Knob movement is allowed when switched; initialize directly in the saved state.

Source: [main.jsx](../../src/main.jsx), toggle demo; [styles.css](../../src/styles.css), `.toggle*`.
