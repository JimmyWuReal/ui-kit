# Spinner

Use for ongoing work when a percentage is unavailable. Include a status label and optional note.

```jsx
<Spinner label="Syncing" note="Saving your changes" />
```

Exported from `controls.jsx`; its wrapper has `role="status"` and the graphic is decorative.

```css
.spinner { position: relative; width: 20px; height: 20px; flex-shrink: 0; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--line); }
.spinner::after { content: ''; position: absolute; inset: 0; border: 1.5px solid transparent; border-top-color: #fff; border-radius: 50%; animation: spin 800ms linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

Rotation while loading is functional status feedback, not an entrance effect. Render and remove the status immediately. Reduced motion stops rotation while leaving the ring and label visible.

Source: [controls.jsx](../../src/controls.jsx), `Spinner`; [styles.css](../../src/styles.css), `.spinner`, `spin`.
