# Progress

Use for a task with known progress, such as an upload. Render the actual initial value; update it from task progress.

```jsx
<Progress name="assets.zip" size="24.8 MB" value={uploadPercent} onReplay={retryUpload} />
```

Exported from `controls.jsx`. `value` is a percentage from 0 to 100. At 100, the note becomes `Upload complete` and the replay icon is shown; adapt completion copy and the action to the task.

```css
.progress { display: flex; flex-direction: column; gap: 16px; }
.progress-track { height: 4px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.12); }
.progress-fill { display: block; height: 100%; border-radius: inherit; background: #fff; transform-origin: left; transition: transform 320ms cubic-bezier(.22,1,.36,1); }
```

The fill uses `scaleX(value / 100)` and may move as real progress changes. A progress indicator is not a chart: do not add a mount fill animation or copy the showcase's simulated upload timer. Reveal the completion action immediately; keep its hover styling. Preserve `role="progressbar"` and numeric ARIA values.

Source: [controls.jsx](../../src/controls.jsx), `Progress`; [styles.css](../../src/styles.css), `.progress*`, `.icon-button.is-small`.
