# Text field

Use for a short value such as email or name. The same flat field box is shared by search, text area, and the select trigger.

```jsx
<label className="text-field">
  <span className="mono-label">Email address</span>
  <input type="email" autoComplete="email" placeholder="studio@form.co"
    value={email} onChange={e => setEmail(e.target.value)} />
</label>
```

```css
.text-field { display: flex; flex-direction: column; gap: 12px; }
.text-field input { width: 100%; height: 48px; padding: 0 16px; border: 0; border-radius: 10px; background: transparent; color: #ededed; font-size: 13px; letter-spacing: -.01em; box-shadow: inset 0 0 0 1px var(--line); transition: box-shadow 200ms ease; }
.text-field input::placeholder { color: #565656; }
.text-field input:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.text-field input:focus { box-shadow: inset 0 0 0 1px var(--line-live); }
```

Height and width may change; keep the 10px radius and comfortable text padding. The source uses the brightened edge as its focus indicator. Keep a real label and use the correct input type. Add errors and helper text when the task needs them.

Source: [main.jsx](../../src/main.jsx), text-field demo; [styles.css](../../src/styles.css), `.text-field` and the shared field selector block.
