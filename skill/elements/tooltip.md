# Tooltip and copy feedback

Use a quiet raised hint for an icon action, shown on hover and keyboard focus. Copy feedback can temporarily replace the hint with `Copied`.

```jsx
<CopyLink />
```

Exported from `controls.jsx`. This demo copies `window.location.href` and holds its feedback for 1600ms. Adapt the URL / text and accessible labels to the task. Await clipboard success before showing `Copied`; the demo currently sets success even when copying fails.

```css
.tooltip-anchor { position: relative; display: inline-flex; }
.tooltip { position: absolute; bottom: calc(100% + 10px); left: 50%; padding: 6px 9px; border-radius: 7px; color: #a8a8a8; background: #1c1c1c; font-size: 11px; font-weight: 400; line-height: 1; white-space: nowrap; pointer-events: none; opacity: 0; transform: translate(-50%,0); }
.tooltip-anchor:hover .tooltip,
.tooltip-anchor:has(:focus-visible) .tooltip,
.tooltip-anchor.is-shown .tooltip { opacity: 1; }
```

The hint appears immediately, including when hover triggers it. Omit the source's tooltip opacity / transform transitions, `--hold` delays, and label slide effects. For copy feedback, use a single label that updates immediately; swap the copy / check icons immediately too. The underlying [icon button](icon-button.md) keeps its hover and press response.

If the tooltip provides information beyond the button's accessible name, associate it with `aria-describedby`; the source's decorative duplicate hint is `aria-hidden`.

Source: [controls.jsx](../../src/controls.jsx), `CopyLink`; [styles.css](../../src/styles.css), `.tooltip*`, `.icon-in`, `.icon-out`.
