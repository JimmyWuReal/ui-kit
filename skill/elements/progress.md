# Progress

Use for a task with known progress, such as an upload. Render the actual initial value; update it from task progress.

```jsx
<Progress name="assets.zip" size="24.8 MB" value={uploadPercent} onReplay={retryUpload} />
```

Exported from `controls.jsx`. `value` is a percentage from 0 to 100. At 100, the note becomes `Upload complete` and the replay icon is shown; adapt completion copy and the action to the task.

```css
.slider-field, .progress { --rail: rgba(255, 255, 255, .12); }
.progress { display: flex; flex-direction: column; gap: 16px; }
.progress-end { display: flex; align-items: center; gap: 10px; }
.progress-track { height: 4px; overflow: hidden; border-radius: 999px; background: var(--rail); }
.progress-fill { display: block; height: 100%; border-radius: inherit; background: #fff; transform-origin: left; transition: transform 320ms cubic-bezier(.22, 1, .36, 1); }
```

The fill uses `scaleX(value / 100)` and eases to each new value over 320ms. A progress indicator is not a chart: do not add a mount fill animation or copy the showcase's simulated upload timer. The replay button stays mounted: `.is-hidden` lifts at completion, fading it in and scaling it up from .8 (see the [icon button](icon-button.md)). Preserve `role="progressbar"` and numeric ARIA values.

## Component

```jsx
export function Progress({ name, size, value, onReplay }) {
  const done = value >= 100
  return (
    <div className="progress">
      <div className="control-row">
        <div><strong>{name}</strong><span>{done ? 'Upload complete' : size}</span></div>
        <div className="progress-end">
          <span className="mono-value">{value}%</span>
          <button className={`icon-button is-small ${done ? '' : 'is-hidden'}`} type="button" aria-label="Upload again"
            tabIndex={done ? 0 : -1} onClick={onReplay}>
            <RotateCcw size={13} strokeWidth={2.2} />
          </button>
        </div>
      </div>
      <div className="progress-track" role="progressbar" aria-label={`Uploading ${name}`}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <span className="progress-fill" style={{ transform: `scaleX(${value / 100})` }} />
      </div>
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Progress`; [styles.css](../../src/styles.css), `.progress*`, `.icon-button.is-small`.
