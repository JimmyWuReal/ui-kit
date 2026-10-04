# Bar chart

Use for counts across a few categories or time buckets. Bars are flat gray; the current / emphasized bucket is white. Keep the data baseline at zero for count comparisons.

```jsx
<BarChart />
```

Exported from `charts.jsx`. The demo uses `COMMITS` tuples `[day, count]`, a fixed maximum of 24, and marks the last bucket as today. Adapt the scale and emphasized bucket to the real data rather than assuming the last item is always current.

```css
.bars { display: flex; gap: 8px; height: 120px; box-shadow: inset 0 -1px 0 var(--line); }
.bar-slot { flex: 1; display: flex; align-items: flex-end; justify-content: center; }
.bar { position: relative; width: min(60%,26px); border-radius: 4px 4px 0 0; background: rgba(255,255,255,.18); transform-origin: bottom; transition: background-color 200ms ease; animation: bar-grow 600ms cubic-bezier(.22,1,.36,1) var(--delay,0ms) backwards; }
.bar-slot:hover .bar { background: var(--line-live); }
.bar.is-today, .bar-slot:hover .bar.is-today { background: #fff; }
@keyframes bar-grow { from { transform: scaleY(0); } }
```

Height is `count / max * 100%`; `--delay` is `index * 40ms`. Only bars grow in. Header, total, baseline, and labels appear immediately. The entire column is a hover target and shows a raised value tooltip; remove the source tooltip's reveal transition under the global motion rule.

Labels sit 12px below the plot in mono. Keep the counts in the accessible summary; expose exact values without relying solely on hover if the task requires them.

Source: [charts.jsx](../../src/charts.jsx), `BarChart`, `COMMITS`; [styles.css](../../src/styles.css), `.bars`, `.bar*`, `.chart-tip.is-above`, `bar-grow`.
