# Select

Use for one choice from an option list. The trigger shares the [text field](text-field.md) box; the menu uses the raised surface.

```jsx
<Select label="Region" options={['Taipei', 'Tokyo', 'Singapore']}
  value={region} onChange={setRegion} />
```

Exported from `controls.jsx`. `options` are strings; `value` must match one and `onChange` receives the chosen string.

```css
.select { position: relative; display: flex; flex-direction: column; gap: 12px; }
.select-trigger { height: 48px; border-radius: 10px; padding: 0 14px 0 16px; }
.select-menu { position: absolute; z-index: 5; top: calc(100% + 6px); left: 0; right: 0; padding: 5px; border-radius: 12px; background: #1c1c1c; box-shadow: inset 0 0 0 1px var(--line); }
.select-menu button { height: 38px; padding: 0 11px; border-radius: 8px; color: #a8a8a8; }
```

Copy the complete field / menu rules and open-state visibility logic. Remove the menu's opacity / transform / delayed-visibility transitions so it opens and closes immediately. Keep the trigger chevron's 180° rotation over 320ms and option hover / focus color changes over 140ms; hovered options use a 7% white fill.

Keep ArrowUp/Down navigation, focus on the selected option when opened, Escape dismissal, Tab-out dismissal, and trigger focus after choosing. Connect the trigger to its listbox with a unique ID. If options are numerous, give the menu a maximum height and scrolling.

Source: [controls.jsx](../../src/controls.jsx), `Select`; [styles.css](../../src/styles.css), `.select*` and shared field rules.
