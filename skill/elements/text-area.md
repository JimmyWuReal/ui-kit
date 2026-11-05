# Text area

Use for a short message or description with a visible character count.

```jsx
<TextArea label="Message" value={message} onChange={setMessage} limit={140} />
```

Exported from `controls.jsx`. Default limit is 140 and `onChange` receives text. The component uses three rows and native `maxLength`. Adapt the fixed placeholder to the task.

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
.search-field input::placeholder { color: var(--dim); }
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

Use the shared [text-field](text-field.md) placeholder, hover, and focus rules. The counter eases to white over 200ms at 85% of the limit; its numbers update immediately. Keep the field label and count in `.field-head`. Change rows, limit, or resizing behavior when the content requires it.

## Component

```jsx
export function TextArea({ label, value, onChange, limit = 140 }) {
  return (
    <label className="text-field">
      <span className="field-head">
        <span className="mono-label">{label}</span>
        <span className={`mono-value ${value.length >= limit * .85 ? 'is-near' : ''}`}>{value.length} / {limit}</span>
      </span>
      <textarea rows={3} maxLength={limit} placeholder="Say something kind…" value={value}
        onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `TextArea`; [styles.css](../../src/styles.css), `.text-field textarea` and counter rules.
