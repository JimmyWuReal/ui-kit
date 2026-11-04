# Popup

Use a raised confirmation dialog for a consequential action. The source demo is `<Popup />` from `controls.jsx`; its Delete action only closes the demo. Adapt it to accept the real title, description, and confirmation callback.

```jsx
<div className="popup-backdrop">
  <div className="popup" role="alertdialog" aria-modal="true"
    aria-labelledby="confirm-title" aria-describedby="confirm-description">
    <strong id="confirm-title">Delete this project?</strong>
    <p id="confirm-description">The project will be removed.</p>
    <div className="popup-actions">
      <button className="outline-button" type="button" onClick={close}>Cancel</button>
      <button className="outline-button is-danger" type="button" onClick={confirm}>Delete</button>
    </div>
  </div>
</div>
```

```css
.popup-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, .5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: popup-fade 160ms ease-out;
}
.popup {
  width: min(340px, 100%);
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: 16px;
  background: #1c1c1c;
  box-shadow: inset 0 0 0 1px var(--line);
  animation: popup-in 240ms cubic-bezier(.22, 1, .36, 1);
}
.popup strong { font-size: 13px; font-weight: 500; letter-spacing: -.01em; }
.popup p { margin: 0; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
.popup-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
.popup-actions .outline-button { min-width: 0; height: 40px; border-radius: 10px; font-weight: 500; }
.popup-actions .outline-button.is-danger { background: #e5484d; box-shadow: none; }
.popup-actions .outline-button.is-danger:hover { background: #ec5d61; }
@keyframes popup-fade { from { opacity: 0; } }
@keyframes popup-in { from { opacity: 0; transform: scale(.96); } }
```

Portal to the document body, focus Cancel on open, keep focus inside while open, and restore the trigger on close. Close on Escape and backdrop click; lock background scrolling. The source supplies portal / initial focus / dismiss behavior; add focus containment and scroll locking when adapting it. Use unique IDs for multiple instances.

The popup mounts on open, so it uses keyframes: the backdrop fades in over 160ms (`popup-fade`) while the dialog fades and scales up from .96 over 240ms (`popup-in`). Closing unmounts it immediately; the kit has no exit animation here. The Delete button's hover fill changes instantly, because the outline button's transition covers only its hairline and press.

## Component

```jsx
/* Popup: a delete confirm, opened from its own outline button into the centre
   of the screen over a dimmed backdrop. Closes on either action, on Escape, or
   on a click outside it. Portalled to the body so no cell clips it. */
export function Popup() {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const cancel = useRef(null)
  const id = useId()

  useEffect(() => { if (open) cancel.current.focus() }, [open])

  const close = () => { setOpen(false); trigger.current.focus() }

  return (
    <>
      <div className="control-row">
        <div><strong>Delete project</strong><span>This can't be undone</span></div>
        <button className="outline-button is-small" type="button" ref={trigger} aria-haspopup="dialog"
          onClick={() => setOpen(true)}>Delete</button>
      </div>
      {open && createPortal(
        <div className="popup-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}
          onKeyDown={(event) => {
            // Close the popup only — not the expanded view behind it.
            if (event.key === 'Escape') { event.stopPropagation(); close() }
          }}>
          <div className="popup" role="alertdialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-text`}>
            <strong id={`${id}-title`}>Delete Formless?</strong>
            <p id={`${id}-text`}>The project and everything in it will be removed for good.</p>
            <div className="popup-actions">
              <button className="outline-button" type="button" ref={cancel} onClick={close}>Cancel</button>
              <button className="outline-button is-danger" type="button" onClick={close}>Delete</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Popup`; [styles.css](../../src/styles.css), `.popup*`.
