# Type specimens

The Text page's typeface cards and type table. Use them for a design system or a type reference. The table is also the kit's only table: its row, header, and side-scrolling rules are a good starting point for a real data table when the task needs one.

```css
.type-section + .type-section { margin-top: 64px; }
.typeface { display: flex; flex-direction: column; padding: 26px 30px 28px; }
.typeface.is-wide { grid-column: span 2; }
.typeface-name { margin: 34px 0 0; font-size: 56px; line-height: 1; letter-spacing: -.04em; }
.typeface-use { margin: 12px 0 0; font-size: 12px; line-height: 1.5; color: #888; }
.typeface-glyphs { flex: 1; margin: 30px 0 0; font-size: 17px; line-height: 1.6; color: #aaa; overflow-wrap: anywhere; }
.typeface-weights { display: flex; gap: 40px; margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--rule); }
.typeface-weights div { display: flex; flex-direction: column; gap: 10px; }
.typeface-weights div span:first-child { font-size: 32px; line-height: 1; }
.type-table-wrap { overflow-x: auto; border-radius: 20px; background: #111; }
.type-table { width: 100%; min-width: 900px; border-collapse: collapse; }
.type-table th, .type-table td { padding: 16px 18px; text-align: left; vertical-align: middle; white-space: nowrap; }
.type-table td { font: 400 11px/1 'DM Mono', ui-monospace, monospace; color: #d6d6d6; border-top: 1px solid var(--rule); }
.type-table thead th { padding-top: 22px; padding-bottom: 18px; }
.type-table .type-group th { padding-top: 30px; padding-bottom: 12px; color: #9a9a9a; }
.type-table tbody th[scope='row'] { border-top: 1px solid var(--rule); font-weight: 400; }
.type-table tbody th strong { display: block; font-size: 13px; font-weight: 500; letter-spacing: -.01em; }
.type-table tbody th small { display: block; margin-top: 5px; font-size: 11.5px; color: var(--sub); }
.type-table .type-sample { width: 100%; min-width: 240px; max-width: 0; overflow: hidden; text-overflow: ellipsis; }
.type-color { display: flex; align-items: center; gap: 6px; }
.type-color i { width: 9px; height: 9px; border-radius: 50%; box-shadow: inset 0 0 0 1px #ffffff38; }
@media (max-width: 680px) {
  .typeface.is-wide, .cell-chart { grid-column: auto; }
  .typeface { padding: 24px; }
  .typeface-name { font-size: 44px; }
}
```

A specimen shows the face's name in itself at 56px (44px at 680px and below), the use, the character set, and the weights in use. The `border-top` on `.typeface-weights` is a functional divider inside a specimen; do not carry it into page layout.

The table scrolls sideways inside `.type-table-wrap` when the page is narrow, so the page itself never overflows. Its cells use the mono value style, and rows are separated by `--rule`. The sample column takes the leftover width and trims with an ellipsis. Group headings are `th` elements with `scope="rowgroup"`, and each row has a `th` with `scope="row"`.

Neither has any motion.

## Component

The role data is the `typeScale` array in the source; the [reading](reading.md), [interface](interface.md), and [mono](mono.md) tables list the same values.

```jsx
/* The three faces the kit is set in, with the weights it actually uses. */
const FAMILIES = {
  'Inter': 'Inter, ui-sans-serif, system-ui, sans-serif',
  'DM Mono': "'DM Mono', ui-monospace, monospace",
  'Georgia': 'Georgia, serif',
}

const WEIGHTS = { 400: 'Regular', 500: 'Medium', 600: 'Semibold' }

const typefaces = [
  { name: 'Inter', kind: 'Sans', use: 'Everything you read and click.', weights: [400, 500, 600], wide: true },
  { name: 'DM Mono', kind: 'Mono', use: 'Labels, values and counts.', weights: [400] },
  { name: 'Georgia', kind: 'Serif', use: 'Quotes, and only in italic.', weights: [400], italic: true },
]

const typeStyle = (font, { size, weight = 400, leading, tracking, color, italic, on }) => ({
  fontFamily: FAMILIES[font], fontSize: size, fontWeight: weight, lineHeight: leading,
  letterSpacing: tracking, color, fontStyle: italic ? 'italic' : undefined,
  ...(on && { display: 'inline-block', padding: '6px 9px', borderRadius: 7, background: on }),
})

function Typeface({ name, kind, use, weights, italic, wide, index }) {
  const face = (weight) => typeStyle(name, { weight, italic })
  return (
    <article className={`sample-card typeface ${wide ? 'is-wide' : ''}`}>
      <span className="mono-label">0{index} &#8212; {kind}</span>
      <p className="typeface-name" style={face(500)}>{name}</p>
      <p className="typeface-use">{use}</p>
      <p className="typeface-glyphs" style={face(400)}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 &amp;?!@#%
      </p>
      <div className="typeface-weights">
        {weights.map((weight) => (
          <div key={weight}>
            <span style={face(weight)}>Aa</span>
            <span className="mono-label">{weight} {italic ? 'Italic' : WEIGHTS[weight]}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function TypeTable() {
  return (
    <div className="type-table-wrap">
      <table className="type-table">
        <thead>
          <tr>{['Role', 'Sample', 'Font', 'Size', 'Weight', 'Leading', 'Tracking', 'Color'].map((head) =>
            <th className="mono-label" key={head} scope="col">{head}</th>)}</tr>
        </thead>
        {typeScale.map(([group, rows]) => (
          <tbody key={group}>
            <tr className="type-group"><th className="mono-label" colSpan={8} scope="rowgroup">{group}</th></tr>
            {rows.map((row) => (
              <tr key={row.role}>
                <th scope="row"><strong>{row.role}</strong><small>{row.use}</small></th>
                <td className="type-sample"><span style={typeStyle(row.font, row)}>{row.sample}</span></td>
                <td>{row.font}{row.italic && ' Italic'}</td>
                <td>{row.size}</td>
                <td>{row.weight} {WEIGHTS[row.weight]}</td>
                <td>{row.leading}</td>
                <td>{row.tracking}</td>
                <td><span className="type-color"><i style={{ background: row.color }} aria-hidden="true" />{row.color}</span></td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
```

Source: [main.jsx](../../src/main.jsx), `typefaces`, `typeScale`, `typeStyle`, `Typeface`, `TypeTable`; [styles.css](../../src/styles.css), `.typeface*`, `.type-*`.
