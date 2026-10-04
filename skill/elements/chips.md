# Chips

Use for a small set of independent selectable filters or interests. Use [segmented](segmented.md) for an exclusive mode instead.

```jsx
<Chips label="Interests" options={['Motion', 'Type', 'Layout']}
  value={topics} onChange={setTopics} />
```

Exported from `controls.jsx`. `value` is an array of selected strings; `onChange` receives the next array. Buttons expose selection with `aria-pressed`.

```css
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { height: 34px; display: inline-flex; align-items: center; padding: 0 14px; border: 0; border-radius: 999px; background: transparent; color: #a8a8a8; font-size: 12.5px; font-weight: 500; letter-spacing: -.01em; box-shadow: inset 0 0 0 1px var(--line); }
.chip.is-on { padding-left: 11px; color: #0a0a0a; background: #fff; box-shadow: inset 0 0 0 1px #fff; }
```

Copy the `.chip-check` and `.check-mark` rules. Hover brightens the hairline and text. After a click, the tick's 14px space and 6px gap open over 240ms; fill changes over 200ms. This is selection feedback on an existing control. Initially selected chips render fully selected, without a startup animation.

Source: [controls.jsx](../../src/controls.jsx), `Chips`, `CheckMark`; [styles.css](../../src/styles.css), `.chips*`, `.chip*`, `.check-mark`.
