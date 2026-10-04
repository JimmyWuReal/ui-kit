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
.popup-backdrop { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: 16px; background: rgba(0,0,0,.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.popup { width: min(340px, 100%); display: flex; flex-direction: column; gap: 6px; padding: 20px; border-radius: 16px; background: #1c1c1c; box-shadow: inset 0 0 0 1px var(--line); }
.popup strong { font-size: 13px; font-weight: 500; letter-spacing: -.01em; }
.popup p { margin: 0; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
.popup-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
.popup-actions .outline-button { min-width: 0; height: 40px; border-radius: 10px; font-weight: 500; }
.popup-actions .is-danger { background: #e5484d; box-shadow: none; }
.popup-actions .is-danger:hover { background: #ec5d61; }
```

Portal to the document body, focus Cancel on open, keep focus inside while open, and restore the trigger on close. Close on Escape and backdrop click; lock background scrolling. The source supplies portal / initial focus / dismiss behavior; add focus containment and scroll locking when adapting it. Use unique IDs for multiple instances.

Both backdrop and dialog appear immediately. Omit `popup-fade` and `popup-in`; button hover remains local to the [button](button.md).

Source: [controls.jsx](../../src/controls.jsx), `Popup`; [styles.css](../../src/styles.css), `.popup*`.
