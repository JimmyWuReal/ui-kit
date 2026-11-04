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
.text-field :is(input, textarea)::placeholder,
.search-field input::placeholder { color: #565656; }
.text-field :is(input, textarea):hover,
.search-field input:hover,
.select-trigger:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.text-field :is(input, textarea):focus,
.search-field input:focus,
.select.is-open .select-trigger { box-shadow: inset 0 0 0 1px var(--line-live); }
.text-field textarea { height: auto; padding: 14px 16px; line-height: 1.6; resize: none; display: block; }
.text-field .mono-value { color: var(--dim); transition: color 200ms ease; }
.text-field .mono-value.is-near { color: #fff; }
.text-field :is(input, textarea):focus-visible,
.search-field input:focus-visible,
.code-boxes input:focus-visible { outline: 0; }
```

Height and width may change; keep the 10px radius and comfortable text padding. The hairline eases through `--line`, `--line-hover`, and `--line-live` over 200ms; that brightened edge is the focus indicator, so the field has no ring. Keep a real label and use the correct input type. Add errors and helper text when the task needs them.

Source: [main.jsx](../../src/main.jsx), text-field demo; [styles.css](../../src/styles.css), `.text-field` and the shared field selector block.
