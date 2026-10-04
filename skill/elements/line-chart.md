# Line chart

Use for comparable trends over time. The kit uses a 2px white main series, a `#5c5c5c` comparison, a 1px `--rule` grid, and mono axes / values. Lines are smooth without overshooting the data.

```jsx
<LineChart />
```

Exported from `charts.jsx`. This is a working demo with `MONTHS` and `VISITORS` constants, not a component with data props. Adapt those or expose a data prop; update the scale, legend, and accessible summary with the data. Keep an explicitly labeled scale.

```css
.chart { display: flex; flex-direction: column; gap: 20px; }
.chart-plot { position: relative; }
.chart-plot svg { display: block; overflow: visible; touch-action: pan-y; }
.chart-grid { stroke: var(--rule); stroke-width: 1; shape-rendering: crispEdges; }
.chart-axis { font: var(--mono); letter-spacing: var(--track); fill: var(--dim); text-transform: uppercase; }
.chart-line { fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; animation: draw 900ms cubic-bezier(.65,0,.35,1) backwards; }
@keyframes draw { from { stroke-dashoffset: 1; } }
```

Set `pathLength="1"` on each data path so the draw animation works. Only the paths draw in; header, legend, axes, and grid render immediately. Keep path nodes stable during hover so the entrance does not replay.

The plot is 180px high with 30px left, 6px right, 10px top, and 26px bottom insets. Keep `useWidth` / ResizeObserver for real-pixel SVG dimensions. `smoothPath` assumes at least two finite points with distinct increasing x positions; handle empty / one-point data before calling it. Set safe domains for new data.

Pointer movement snaps a crosshair and tooltip to the nearest month; the tooltip flips sides near the edge. Markers move over 160ms. Tooltip content appears immediately. Provide an accessible summary and visible values / a data table when users need exact data without hover.

Source: [charts.jsx](../../src/charts.jsx), `LineChart`, `useWidth`, `smoothPath`, `nearest`, `Legend`; [styles.css](../../src/styles.css), `.chart*`, `draw`.
