# Icon button

Use for compact actions such as copy, paging, and replay. Give every icon-only button an accessible name.

```jsx
<button className="icon-button" type="button" aria-label="Copy link" onClick={copyLink}>
  <Copy size={15} strokeWidth={2} aria-hidden="true" />
</button>
```

`Copy` is from `lucide-react`.

```css
.icon-button {
  width: 34px; height: 34px; display: grid; place-items: center; padding: 0;
  border: 0; border-radius: 10px; background: transparent; color: #bdbdbd;
  box-shadow: inset 0 0 0 1px var(--line); cursor: pointer;
  transition: color 180ms ease-out, box-shadow 200ms ease, transform 140ms cubic-bezier(.22,1,.36,1);
}
.icon-button:hover:not(:disabled) { color: #fff; box-shadow: inset 0 0 0 1px var(--line-hover); }
.icon-button:active:not(:disabled) { transform: scale(.94); }
.icon-button:disabled { color: #3d3d3d; cursor: default; }
.icon-button.is-small { width: 28px; height: 28px; border-radius: 8px; }
.icon-button.is-on { color: #0a0a0a; background: #fff; box-shadow: inset 0 0 0 1px #fff; }
```

Hover brightens the edge; pressing scales it. If conditionally shown, reveal it immediately. For copy feedback, swap icons immediately; use the [tooltip recipe](tooltip.md).

Source: [styles.css](../../src/styles.css), `.icon-button`; examples in [controls.jsx](../../src/controls.jsx).
