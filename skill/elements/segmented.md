# Segmented control

Use for a few mutually exclusive modes or compact navigation. It measures the selected label so unequal-length options get equal padding, rather than equal label widths.

```jsx
<Segmented label="View" options={['List', 'Board', 'Calendar']}
  value={view} onChange={setView} />
```

Exported from `controls.jsx`. `value` must match an option; `onChange` receives the option string.

```css
.segmented { position: relative; display: grid; grid-template-columns: repeat(var(--count), auto); padding: 4px; border-radius: 12px; box-shadow: inset 0 0 0 1px var(--line); }
.segmented .segmented-thumb { position: absolute; top: 4px; bottom: 4px; left: 0; width: var(--thumb-width); border-radius: 8px; background: #fff; transform: translateX(var(--thumb-x)); transition: transform 320ms cubic-bezier(.22,1,.36,1), width 320ms cubic-bezier(.22,1,.36,1); }
.segmented button { position: relative; z-index: 1; height: 36px; padding: 0 16px; border: 0; background: transparent; color: #8a8a8a; font-size: 12.5px; font-weight: 500; letter-spacing: -.01em; }
.segmented button.is-active { color: #0a0a0a; }
```

Keep the source's layout measurement and ResizeObserver so the thumb stays aligned after fonts load or the control resizes. Render it at its initial measured position before enabling movement. Arrow keys move focus and selection; only the selected option is tabbable. Hover text brightens to `#e6e6e6`; selection slides / resizes over 320ms.

Source: [controls.jsx](../../src/controls.jsx), `Segmented`, `arrowStep`; [styles.css](../../src/styles.css), `.segmented*`.
