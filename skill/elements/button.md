# Buttons

Use the flat `outline-button` by default for all regular actions, including primary, submit, and AI / generate actions.

The two gradient styles, light `primary-button` and dark `depth-button`, are reserved for CTAs in the homepage hero section only. Use them only when the user requests a homepage hero section, with **at most two gradient buttons across the entire website, counting both variants together**. Use outline buttons for navigation, forms, cards, dialogs, other sections, and other pages. Do not add a hero section just to use gradients.

All three styles share 48px height, 12px radius, 20px horizontal padding, and 13px/600 Inter with -.01em tracking. Regular actions:

```jsx
<button className="outline-button" type="button" onClick={createProject}>
  <span className="button-content">
    <span className="button-icon"><Plus size={17} strokeWidth={2.15} /></span>
    <span>Create project</span>
  </span>
</button>
<button className="outline-button" type="button" onClick={generate}>Create with AI</button>
<button className="outline-button" type="button" onClick={exportProject}>Export</button>
```

`Plus` is from `lucide-react`; icons are optional. The helpers keep icon and text aligned.

For a requested homepage hero only:

```jsx
<button className="primary-button" type="button" onClick={getStarted}>Get started</button>
<button className="depth-button" type="button" onClick={openDemo}>Try demo</button>
```

```css
.primary-button,
.depth-button {
  position: relative;
  overflow: hidden;
  height: 48px;
  padding: 0 20px;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -.01em;
  transform: translateY(0) scale(1);
  transition:
    background-color 180ms ease-out,
    box-shadow 180ms ease-out,
    transform 140ms cubic-bezier(.22, 1, .36, 1);
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.primary-button {
  min-width: 164px;
  color: #111;
  background-color: #d8d8d8;
  background-image: linear-gradient(rgba(255, 255, 255, .28), rgba(255, 255, 255, 0));
  /* Solid edge, soft light, solid edge, soft shade, then the outer drop shadow. */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .72),
    inset 0 3px 4px rgba(255, 255, 255, .22),
    inset 0 -1px 0 rgba(0, 0, 0, .68),
    inset 0 -3px 4px rgba(0, 0, 0, .22),
    0 4px 10px rgba(0, 0, 0, .3);
}
.primary-button:hover {
  background-color: #f5f5f5;
  transform: translateY(-1px) scale(1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 3px 4px rgba(255, 255, 255, .28),
    inset 0 -1px 0 rgba(0, 0, 0, .62),
    inset 0 -3px 4px rgba(0, 0, 0, .18),
    0 7px 16px rgba(0, 0, 0, .4);
}
.depth-button {
  min-width: 172px;
  color: #fff;
  background-color: #1c1c1c;
  background-image: linear-gradient(rgba(255, 255, 255, .045), transparent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .16),
    inset 0 3px 4px rgba(255, 255, 255, .055),
    inset 0 -1px 0 #0b0b0b,
    inset 0 -3px 4px rgba(0, 0, 0, .2),
    0 1px 2px rgba(0, 0, 0, .4),
    0 5px 11px rgba(0, 0, 0, .36);
}
.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -.01em;
}
.button-icon { width: 18px; height: 18px; display: grid; place-items: center; }
.depth-button:hover {
  background-color: #262626;
  transform: translateY(-1px) scale(1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .22),
    inset 0 3px 4px rgba(255, 255, 255, .075),
    inset 0 -1px 0 #101010,
    inset 0 -3px 4px rgba(0, 0, 0, .2),
    0 2px 3px rgba(0, 0, 0, .4),
    0 8px 18px rgba(0, 0, 0, .4);
}
.primary-button:active,
.depth-button:active {
  transform: translateY(1px) scale(.97);
  transition-duration: 55ms;
}
.primary-button:active { background-color: #e8e8e8; }
.depth-button:active { background-color: #202020; }
.outline-button {
  min-width: 164px;
  height: 48px;
  padding: 0 20px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--line);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -.01em;
  transition: box-shadow 200ms ease, transform 140ms cubic-bezier(.22, 1, .36, 1);
  -webkit-tap-highlight-color: transparent;
}
.outline-button:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.outline-button[aria-expanded='true'] { box-shadow: inset 0 0 0 1px var(--line-live); }
.outline-button:active { transform: scale(.97); transition-duration: 55ms; }
.outline-button.is-small { min-width: 0; height: 36px; padding: 0 14px; border-radius: 10px; }
```

You may change height, width, label, icon, and base color. For eligible hero CTAs, keep the inset highlight / shade order on gradient variants. Maintain contrast and keep regular buttons flat. Derive hover and pressed colors from the chosen base. Use `type="submit"` for form submission. Add a clear disabled state when needed; the showcase buttons have none. Use `.button-group` to set a pair side by side.

Motion: the outline button's hairline brightens over 200ms; pressing scales it to .97. Gradient buttons lift 1px and brighten on hover (color and shadow 180ms, movement 140ms) and press to `translateY(1px) scale(.97)`. On every button `:active` sets `transition-duration: 55ms`, so the press lands in 55ms and the release settles over the slower base timing. Keep that asymmetry; it is what makes the buttons feel physical.

Source: [main.jsx](../../src/main.jsx), `PrimaryButton`, `DepthButton`, `OutlineButton`; [styles.css](../../src/styles.css), the three button classes and `.button-content` / `.button-icon`.
