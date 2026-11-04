# Tooltip and copy feedback

Use a quiet raised hint for an icon action, shown on hover and keyboard focus. Copy feedback can temporarily replace the hint with `Copied`.

```jsx
<CopyLink />
```

Exported from `controls.jsx`. This demo copies `window.location.href` and holds its feedback for 1600ms. Adapt the URL / text and accessible labels to the task. It shows `Copied` only after the clipboard write succeeds; keep that when adapting it.

```css
.icon-button > svg { grid-area: 1 / 1; transition: opacity 200ms ease, transform 240ms cubic-bezier(.22, 1, .36, 1); }
.icon-button .icon-in,
.icon-button.is-on .icon-out { opacity: 0; transform: scale(.6); }
.icon-button.is-on .icon-in { opacity: 1; transform: none; }
.tooltip-anchor { position: relative; display: inline-flex; }
.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  padding: 6px 9px;
  border-radius: 7px;
  color: #a8a8a8;
  background: #1c1c1c;
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px) scale(.96);
  transition: opacity 160ms ease-out, transform 200ms cubic-bezier(.22, 1, .36, 1);
}
.tooltip-anchor:hover .tooltip,
.tooltip-anchor:has(:focus-visible) .tooltip,
.tooltip-anchor.is-shown .tooltip { opacity: 1; transform: translate(-50%, 0); }
.tooltip { display: grid; justify-items: center; clip-path: inset(0 round 7px); }
.tooltip-label {
  grid-area: 1 / 1;
  transition: opacity 100ms ease-out var(--hold), transform 240ms cubic-bezier(.22, 1, .36, 1) var(--hold);
}
.tooltip-label.is-copied,
.tooltip-anchor.is-shown .tooltip-label:not(.is-copied) { opacity: 0; transform: translateY(6px); }
.tooltip-anchor.is-shown .tooltip-label:not(.is-copied) { transform: translateY(-6px); }
.tooltip-anchor.is-shown .tooltip-label.is-copied { opacity: 1; transform: none; }
.tooltip-anchor:not(.is-shown) .tooltip-label:not(.is-copied),
.tooltip-anchor.is-shown .tooltip-label.is-copied {
  transition:
    opacity 160ms ease-out calc(var(--hold) + 90ms),
    transform 240ms cubic-bezier(.22, 1, .36, 1) calc(var(--hold) + 90ms);
}
.tooltip-anchor { --hold: 0ms; }
.tooltip-anchor:not(:hover, :has(:focus-visible)) { --hold: 200ms; }
```

The hint rises 4px from `scale(.96)` and fades in (160ms opacity, 200ms movement), on hover, on keyboard focus, and while `.is-shown` holds it up after a copy.

The two labels share one grid cell, so the tooltip is sized to the longer word and never jumps. The swap is sequential so they never overlap: the outgoing label fades over 100ms and slides 6px away, then the incoming one waits 90ms and fades in over 160ms while sliding over 240ms. `--hold` adds 200ms when the tooltip is fading out on its own, so the words do not change on the way out. At the same time the button turns white and its icons crossfade (see the [icon button](icon-button.md)). The `copied` state clears after 1600ms and everything reverses. Keep this whole sequence when adapting the copy action.

If the tooltip provides information beyond the button's accessible name, associate it with `aria-describedby`; the source's decorative duplicate hint is `aria-hidden`.

## Component

```jsx
/* The tooltip is a quiet hint on the raised gray, with no edge. It shows on
   hover and focus, and stays up for a moment to confirm a copy. */
export function CopyLink() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])
  /* Confirm only once the clipboard has taken it; a failed copy stays quiet. */
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true), () => {})
  }
  return (
    <div className="control-row">
      <div><strong>Share</strong><span>Copy a link to this kit</span></div>
      <span className={`tooltip-anchor ${copied ? 'is-shown' : ''}`}>
        <button className={`icon-button ${copied ? 'is-on' : ''}`} type="button"
          aria-label={copied ? 'Link copied' : 'Copy link'} onClick={copy}>
          <Copy className="icon-out" size={15} strokeWidth={2} />
          <Check className="icon-in" size={15} strokeWidth={2.4} />
        </button>
        <span className="tooltip" aria-hidden="true">
          <span className="tooltip-label">Copy link</span>
          <span className="tooltip-label is-copied">Copied</span>
        </span>
      </span>
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `CopyLink`; [styles.css](../../src/styles.css), `.tooltip*`, `.icon-in`, `.icon-out`.
