# Sparkline

Use for a compact metric whose current value matters more than a full set of axes. The kit puts a 36px headline value above a small white trend line.

```jsx
<Sparkline />
```

Exported from `charts.jsx`. The demo uses hardcoded `REVENUE` and `DAYS`; adapt the values, dates, currency, percentage calculation, and accessible summary together. It does not accept data props yet.

```css
.stat-value { font-size: 36px; font-weight: 500; line-height: 1; letter-spacing: -.045em; font-variant-numeric: tabular-nums; }
.chart-end { transition: cx 160ms cubic-bezier(.22,1,.36,1), cy 160ms cubic-bezier(.22,1,.36,1); }
```

Use the [line chart](line-chart.md) `.chart-line` / `draw` recipe and SVG helpers. Plot height is 56px with 5px insets. The line may draw over 900ms; the headline, label, and change value render immediately. Avoid counting the headline up or fading it.

Pointer movement scrubs the displayed value / date and moves the endpoint; leaving restores the latest value. Handle fewer than two points, constant values (`max === min`), and a zero previous value before adapting the demo's scale / percentage formulas. Keep a readable default value when hover is unavailable.

Source: [charts.jsx](../../src/charts.jsx), `Sparkline`, `REVENUE`, `DAYS`, shared SVG helpers; [styles.css](../../src/styles.css), `.stat-value`, `.chart-line`, `.chart-end`.
