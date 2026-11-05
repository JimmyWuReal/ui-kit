# Stat row

Use for a few figures that describe the page as a whole. It is also where a number goes when it is not the chart's own: a lifetime total sits here, above a 30-day chart, rather than inside it. See the [minimal chart defaults](../SKILL.md#minimal-charts).

```jsx
<StatRow stats={[['This week', '12h'], ['All time', '128h'], ['Streak', '9 days']]} />
```

Exported from `patterns.jsx`. It is built from the [card](../elements/card.md) and the small stat size.

```css
.stat-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 20px; margin: 0; }
.stat-row .card { gap: 14px; }
.stat-row dd { margin: 0; }
.stat-value { font-size: 36px; font-weight: 500; line-height: 1; letter-spacing: -.045em; font-variant-numeric: tabular-nums; }
.stat-value.is-small { font-size: 28px; letter-spacing: -.04em; }
```

Columns fit themselves, so the row needs no breakpoints of its own: four across on a page, two on a phone. Use the 28px `.is-small` size here. The 36px size is for one value leading a block, as in the [sparkline](../elements/sparkline.md). Values appear at first paint and never count up.

Add a row only for figures a person checks. Change percentages and extra KPIs are not defaults here either.

## Component

```jsx
export function StatRow({ stats }) {
  return (
    <dl className="stat-row">
      {stats.map(([label, value]) => (
        <div className="card" key={label}>
          <dt className="mono-label">{label}</dt>
          <dd className="stat-value is-small">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
```

Source: [patterns.jsx](../../src/patterns.jsx), `StatRow`; [styles.css](../../src/styles.css), `.stat-row`, `.stat-value`.
