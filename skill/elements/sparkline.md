# Sparkline

Use for a compact metric whose current value matters more than a full set of axes. The kit puts a 36px headline value above a small white trend line.

Follow the [minimal chart defaults](../SKILL.md#minimal-charts): one metric label, one main value, and the trend. Omit change percentages, extra totals, period recaps, and footer summaries unless explicitly requested. Do not place a separate sparkline summary beside a full chart of the same metric merely to fill a stats row.

```jsx
<Sparkline />
```

Exported from `charts.jsx`. The demo uses hardcoded `REVENUE` and `DAYS`; adapt the values, dates, currency, and accessible summary together. It does not accept data props yet.

```css
.stat-value { font-size: 36px; font-weight: 500; line-height: 1; letter-spacing: -.045em; font-variant-numeric: tabular-nums; }
.chart-end { transition: cx 160ms cubic-bezier(.22,1,.36,1), cy 160ms cubic-bezier(.22,1,.36,1); }
```

Use the [line chart](line-chart.md) `.chart-line` / `draw` recipe and SVG helpers. Plot height is 56px with 5px insets. The line may draw over 900ms; the headline and label render immediately. Avoid counting the headline up or fading it.

Pointer movement scrubs the displayed value / date and moves the endpoint; leaving restores the latest value. **Keep the dot's smooth movement:** use one persistently mounted `.chart-end` circle with a stable key, and update its `cx`/`cy` using the 160ms transition above. Do not conditionally mount it or key it by the inspected value. Keep this local interaction when removing entrance effects; reduced-motion mode moves it immediately. Offer the same inspection through keyboard focus without adding a permanent detail row. Handle fewer than two points and constant values (`max === min`) before adapting the demo's scale. Keep a readable default value when hover is unavailable.

Source: [charts.jsx](../../src/charts.jsx), `Sparkline`, `REVENUE`, `DAYS`, shared SVG helpers; [styles.css](../../src/styles.css), `.stat-value`, `.chart-line`, `.chart-end`.
