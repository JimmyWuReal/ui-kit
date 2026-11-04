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
  position: relative;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #bdbdbd;
  box-shadow: inset 0 0 0 1px var(--line);
  cursor: pointer;
  transition:
    color 180ms ease-out,
    background-color 200ms ease,
    box-shadow 200ms ease,
    opacity 160ms ease-out,
    transform 140ms cubic-bezier(.22, 1, .36, 1);
}
.icon-button:hover:not(:disabled) { color: #fff; box-shadow: inset 0 0 0 1px var(--line-hover); }
.icon-button:active:not(:disabled) { transform: scale(.94); }
.icon-button:disabled { color: #3d3d3d; cursor: default; }
.icon-button.is-on,
.icon-button.is-on:hover:not(:disabled) { color: #0a0a0a; background: #fff; box-shadow: inset 0 0 0 1px #fff; }
.icon-button.is-small { width: 28px; height: 28px; border-radius: 8px; }
.icon-button.is-hidden { opacity: 0; transform: scale(.8); pointer-events: none; }
.icon-button > svg { grid-area: 1 / 1; transition: opacity 200ms ease, transform 240ms cubic-bezier(.22, 1, .36, 1); }
.icon-button .icon-in,
.icon-button.is-on .icon-out { opacity: 0; transform: scale(.6); }
.icon-button.is-on .icon-in { opacity: 1; transform: none; }
```

Hover brightens the edge over 200ms and the icon over 180ms; pressing scales it to .94 over 140ms. A conditionally shown button stays mounted: `.is-hidden` fades it out and scales it to .8, and the same transition brings it back. Pair it with `tabIndex={-1}` while hidden, as `Progress` does.

For a state swap, stack both icons in the one grid cell as `.icon-out` and `.icon-in`, as `CopyLink` does in the [tooltip recipe](tooltip.md). `.is-on` crossfades them: opacity over 200ms, scaling from .6 over 240ms.

Source: [styles.css](../../src/styles.css), `.icon-button`; examples in [controls.jsx](../../src/controls.jsx).
