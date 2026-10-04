# Buttons

Use the light primary for the main action, the dark depth variant for an AI / generate action, and outline for supporting actions. All share 48px height, 12px radius, 20px horizontal padding, and 13px/600 Inter with -.01em tracking.

```jsx
<button className="primary-button" type="button" onClick={createProject}>
  <span className="button-content">
    <span className="button-icon"><Plus size={17} strokeWidth={2.15} /></span>
    <span>Create project</span>
  </span>
</button>
<button className="depth-button" type="button" onClick={generate}>Create with AI</button>
<button className="outline-button" type="button" onClick={exportProject}>Export</button>
```

`Plus` is from `lucide-react`; icons are optional. The helpers keep icon and text aligned.

```css
.primary-button, .depth-button, .outline-button {
  height: 48px; padding: 0 20px; border: 0; border-radius: 12px;
  font-size: 13px; font-weight: 600; letter-spacing: -.01em; cursor: pointer;
  transition: background-color 180ms ease-out, box-shadow 180ms ease-out,
    transform 140ms cubic-bezier(.22, 1, .36, 1);
}
.button-content { display: flex; align-items: center; justify-content: center; gap: 8px; }
.button-icon { width: 18px; height: 18px; display: grid; place-items: center; }
.primary-button {
  min-width: 164px; color: #111; background-color: #d8d8d8;
  background-image: linear-gradient(rgba(255,255,255,.28), rgba(255,255,255,0));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.72),
    inset 0 3px 4px rgba(255,255,255,.22), inset 0 -1px 0 rgba(0,0,0,.68),
    inset 0 -3px 4px rgba(0,0,0,.22), 0 4px 10px rgba(0,0,0,.3);
}
.primary-button:hover {
  background-color: #f5f5f5; transform: translateY(-1px);
  box-shadow: inset 0 1px 0 #fff, inset 0 3px 4px rgba(255,255,255,.28),
    inset 0 -1px 0 rgba(0,0,0,.62), inset 0 -3px 4px rgba(0,0,0,.18),
    0 7px 16px rgba(0,0,0,.4);
}
.depth-button {
  min-width: 172px; color: #fff; background-color: #1c1c1c;
  background-image: linear-gradient(rgba(255,255,255,.045), transparent);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.16),
    inset 0 3px 4px rgba(255,255,255,.055), inset 0 -1px 0 #0b0b0b,
    inset 0 -3px 4px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.4),
    0 5px 11px rgba(0,0,0,.36);
}
.depth-button:hover {
  background-color: #262626; transform: translateY(-1px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22),
    inset 0 3px 4px rgba(255,255,255,.075), inset 0 -1px 0 #101010,
    inset 0 -3px 4px rgba(0,0,0,.2), 0 2px 3px rgba(0,0,0,.4),
    0 8px 18px rgba(0,0,0,.4);
}
.primary-button:active, .depth-button:active { transform: translateY(1px) scale(.97); transition-duration: 55ms; }
.primary-button:active { background-color: #e8e8e8; }
.depth-button:active { background-color: #202020; }
.outline-button { min-width: 164px; color: #fff; background: transparent; box-shadow: inset 0 0 0 1px var(--line); }
.outline-button:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.outline-button[aria-expanded='true'] { box-shadow: inset 0 0 0 1px var(--line-live); }
.outline-button:active { transform: scale(.97); transition-duration: 55ms; }
.outline-button.is-small { min-width: 0; height: 36px; padding: 0 14px; border-radius: 10px; }
```

You may change height, width, label, icon, and base color. Keep the inset highlight / shade order on depth variants, maintain contrast, and keep secondary buttons flat. Derive hover and pressed colors from the chosen base. Use `type="submit"` for form submission. Add a clear disabled state when needed; the showcase buttons have none.

Source: [main.jsx](../../src/main.jsx), `PrimaryButton`, `DepthButton`, `OutlineButton`; [styles.css](../../src/styles.css), the three button classes and `.button-content` / `.button-icon`.
