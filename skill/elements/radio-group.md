# Radio group

Use when one option must be selected, especially when each choice needs a note.

```jsx
<RadioGroup label="Plan" value={plan} onChange={setPlan} options={[
  ['solo', 'Solo', 'One seat'],
  ['team', 'Team', 'Shared workspace'],
]} />
```

Exported from `controls.jsx`. `options` are `[key, title, note]` tuples; `value` is a key and `onChange` receives a key. The component creates a unique native radio name per group.

```css
.radio-group { display: flex; flex-direction: column; gap: 16px; }
.radio-row { display: flex; align-items: center; gap: 14px; }
.radio-dot { width: 22px; height: 22px; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--line); }
.radio-row input:checked + .radio-dot { background: #fff; box-shadow: inset 0 0 0 1px #fff; }
```

Copy `.radio-dot::after`, hidden-input / focus rules, and label typography from the source. The inner dot is 8px and dark. Hover brightens the outline; selection changes fill over 200ms and dot scale over 240ms after 70ms. A preselected option is fully visible at first render.

Source: [controls.jsx](../../src/controls.jsx), `RadioGroup`; [styles.css](../../src/styles.css), `.radio-*`.
