# Text area

Use for a short message or description with a visible character count.

```jsx
<TextArea label="Message" value={message} onChange={setMessage} limit={140} />
```

Exported from `controls.jsx`. Default limit is 140 and `onChange` receives text. The component uses three rows and native `maxLength`. Adapt the fixed placeholder to the task.

```css
.text-field textarea { width: 100%; height: auto; padding: 14px 16px; border: 0; border-radius: 10px; background: transparent; color: #ededed; font-size: 13px; line-height: 1.6; letter-spacing: -.01em; resize: none; display: block; box-shadow: inset 0 0 0 1px var(--line); }
.text-field .mono-value { color: var(--dim); transition: color 200ms ease; }
.text-field .mono-value.is-near { color: #fff; }
```

Use the shared [text-field](text-field.md) placeholder, hover, and focus rules. The counter turns white at 85% of the limit; numbers update immediately. Keep the field label and count in `.field-head`. Change rows, limit, or resizing behavior when the content requires it.

Source: [controls.jsx](../../src/controls.jsx), `TextArea`; [styles.css](../../src/styles.css), `.text-field textarea` and counter rules.
