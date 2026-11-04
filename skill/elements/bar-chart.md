# Bar chart

Use for counts across a few categories or time buckets. Bars are flat gray; the current / emphasized bucket is white. Keep the data baseline at zero for count comparisons.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts): a short title, an optional single primary total, the bars, and sparse axis labels. Do not add a weekly-total subtitle, active-day count, latest-bucket footer, or a second value/period summary. Exact bucket values belong in an accessible hover/focus tooltip, not a permanent summary row. Keep daily data daily when requested.

```jsx
<BarChart />
```

Exported from `charts.jsx`. The demo uses `COMMITS` tuples `[day, count]`, a fixed maximum of 24, and marks the last bucket as today. Adapt the scale and emphasized bucket to the real data rather than assuming the last item is always current.

```css
.chart { display: flex; flex-direction: column; gap: 20px; }
.chart-tip {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 8px;
  color: #a8a8a8;
  background: #1c1c1c;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
}
.chart-tip-row { display: flex; align-items: center; gap: 7px; }
.chart-tip-row i { width: 8px; height: 2px; border-radius: 1px; }
.chart-tip b { margin-left: auto; padding-left: 14px; font-weight: 400; }
.chart-tip.is-above b { padding: 0; }
.bars { display: flex; gap: 8px; height: 120px; box-shadow: inset 0 -1px 0 var(--line); }
.bar-slot { flex: 1; display: flex; align-items: flex-end; justify-content: center; }
.bar {
  position: relative;
  width: min(60%, 26px);
  border-radius: 4px 4px 0 0;
  background: rgba(255, 255, 255, .18);
  transform-origin: bottom;
  transition: background-color 200ms ease;
  animation: bar-grow 600ms cubic-bezier(.22, 1, .36, 1) var(--delay) backwards;
}
.bar-slot:hover .bar { background: var(--line-live); }
.bar.is-today, .bar-slot:hover .bar.is-today { background: #fff; }
.chart-tip.is-above {
  bottom: calc(100% + 8px);
  left: 50%;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 160ms ease-out, transform 200ms cubic-bezier(.22, 1, .36, 1);
}
.bar-slot:hover .chart-tip.is-above { opacity: 1; transform: translate(-50%, 0); }
.bar-labels { display: flex; gap: 8px; margin-top: 12px; }
.bar-labels span { flex: 1; text-align: center; }
@keyframes bar-grow { from { transform: scaleY(0); } }
```

Height is `count / max * 100%`. Set `--delay: index * 40ms` on every bar; the source rule has no fallback. Bars grow from the baseline over 600ms on mount. The chosen title/value, baseline, and labels appear immediately; this does not require a headline total.

The entire column is the hover target. Its bar steps to `--line-live` over 200ms (the emphasized bar stays white) and a raised value tooltip rises 4px and fades in, 160ms for opacity and 200ms for movement. The source is pointer-only; expose the same point details on keyboard focus when adapting it.

Labels sit 12px below the plot in mono. Keep the counts in the accessible summary; expose exact values without relying solely on hover if the task requires them.

## Component

```jsx
const COMMITS = [['Mon', 12], ['Tue', 18], ['Wed', 9], ['Thu', 22], ['Fri', 16], ['Sat', 4], ['Sun', 7]]

/* The week so far. Past days sit at the hairline's gray; today is white.
   The whole column is the hover target, not just the bar. */
export function BarChart() {
  const max = 24
  const total = COMMITS.reduce((sum, [, count]) => sum + count, 0)
  return (
    <div className="chart">
      <div className="control-row">
        <div><strong>Commits</strong></div>
        <span className="mono-value">{total}</span>
      </div>
      <div>
        <div className="bars" role="img" aria-label={COMMITS.map(([day, count]) => `${day} ${count}`).join(', ')}>
          {COMMITS.map(([day, count], i) => (
            <div className="bar-slot" key={day}>
              <span className={`bar ${i === COMMITS.length - 1 ? 'is-today' : ''}`}
                style={{ height: `${(count / max) * 100}%`, '--delay': `${i * 40}ms` }}>
                <span className="chart-tip is-above"><b className="mono-value">{count}</b></span>
              </span>
            </div>
          ))}
        </div>
        <div className="bar-labels">{COMMITS.map(([day]) => <span className="mono-label" key={day}>{day}</span>)}</div>
      </div>
    </div>
  )
}
```

Source: [charts.jsx](../../src/charts.jsx), `BarChart`, `COMMITS`; [styles.css](../../src/styles.css), `.bars`, `.bar*`, `.chart-tip`, `.chart-tip.is-above`, `bar-grow`.
