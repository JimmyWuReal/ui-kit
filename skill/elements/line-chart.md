# Line chart

Use for comparable trends over time. The kit uses a 2px white main series, a `#5c5c5c` comparison, a 1px `--rule` grid, and mono axes / values. Lines are smooth without overshooting the data.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts). Use a short title and labeled axes; include a legend for multiple series, and omit it for a single named series. Do not add a period subtitle, growth badge, latest-value footer, or derived statistics by default. Preserve the requested observation interval.

```jsx
<LineChart />
```

Exported from `charts.jsx`. This is a working demo with `MONTHS` and `VISITORS` constants, not a component with data props. Adapt those or expose a data prop; update the scale, any needed legend, and accessible summary with the data. Keep an explicitly labeled scale.

```css
.chart { display: flex; flex-direction: column; gap: 20px; }
.chart-plot { position: relative; }
.chart-plot svg { display: block; overflow: visible; touch-action: pan-y; }
.chart-grid { stroke: var(--rule); stroke-width: 1; shape-rendering: crispEdges; }
.chart-axis { font: var(--mono); letter-spacing: var(--track); fill: var(--dim); text-transform: uppercase; }
.chart-line { fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; animation: draw 900ms cubic-bezier(.65,0,.35,1) backwards; }
.chart-end { transition: cx 160ms cubic-bezier(.22,1,.36,1), cy 160ms cubic-bezier(.22,1,.36,1), opacity 160ms ease; }
@keyframes draw { from { stroke-dashoffset: 1; } }
```

Set `pathLength="1"` on each data path so the draw animation works. Only the paths draw in; header, legend, axes, and grid render immediately. Keep path nodes stable during hover so the entrance does not replay.

The plot is 180px high with 30px left, 6px right, 10px top, and 26px bottom insets. Keep `useWidth` / ResizeObserver for real-pixel SVG dimensions. `smoothPath` assumes at least two finite points with distinct increasing x positions; handle empty / one-point data before calling it. Set safe domains for new data.

Pointer movement snaps a crosshair and tooltip to the nearest observation; the tooltip flips sides near the edge. **Keep the moving hover dot:** render one persistent `.chart-end` circle per series, including while inactive, and update its `cx`/`cy` as inspection moves. Use a stable series key; never key the plot or circle by the hovered index/value. Retain the last inspected position when hiding it so movement can interpolate between points instead of remounting or jumping. Use the 160ms transition above, with immediate movement under reduced motion. Apply the same movement to keyboard inspection. Tooltip content appears immediately.

Provide an accessible summary and make point values available through keyboard focus too. Do not add a visible summary or data table just to supplement the chart; include one when requested or needed for the task.

Source: [charts.jsx](../../src/charts.jsx), `LineChart`, `useWidth`, `smoothPath`, `nearest`, `Legend`; [styles.css](../../src/styles.css), `.chart*`, `draw`.
