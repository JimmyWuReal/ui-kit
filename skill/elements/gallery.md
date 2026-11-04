# Gallery

The site's own layout for showing elements and samples. Use it when the task is a component gallery, a design system page, or a set of previews. Do not use it to compose an ordinary page.

```css
.component-grid, .sample-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.grid-cell, .sample-card { position: relative; min-width: 0; border-radius: 20px; background: #111; box-shadow: inset 0 1px 0 #ffffff06, 0 8px 24px #0002; }
.grid-cell { min-height: 220px; }
.sample-card { overflow: hidden; }
.background-preview { height: 270px; }
.sample-caption { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 22px 26px; }
.sample-caption h2 { margin: 0; font-size: 14px; font-weight: 500; }
.sample-caption p { margin: 7px 0 0; font-size: 12px; color: #888; line-height: 1.5; }
.cell-content {
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  align-items: center;
  padding: var(--pad);
}
.cell-control .cell-content {
  width: min(100%, calc(var(--col) + var(--pad) * 2));
  margin-inline: auto;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 12px;
}
.cell-buttons .cell-content { justify-content: center; }
.grid-cell.cell-black { background: #090909; box-shadow: inset 0 0 0 1px var(--rule); }
.cell-chart { grid-column: span 2; }
.cell-chart .cell-content { flex-direction: column; justify-content: center; align-items: stretch; }
.grid-cell:hover .expand-button,
.sample-card:hover .expand-button,
.expand-button:focus-visible { opacity: 1; transform: scale(1); }
@media (max-width: 680px) {
  .component-grid, .sample-grid { grid-template-columns: 1fr; gap: 16px; }
  .typeface.is-wide, .cell-chart { grid-column: auto; }
}
```

The grid is two columns with 20px gaps, becoming one column with 16px gaps at 680px and below. A cell is `#111` with a 20px radius and a 220px minimum height. Single controls share a 404px centered measure, set by `--col` and `--pad`, so their edges line up across cells. `.cell-black` puts an element on the page color, edged with `--rule`; the kit's card uses it, because a card lands on the page rather than on a cell. `.cell-chart` spans both columns. The cell's faint shadow belongs to the gallery only: content surfaces on a real page stay flat.

`.sample-card` pairs a preview with a `.sample-caption`, as the Background page does. Grid cells have no entrance: the site removed one so the kit is fully visible when the page paints.

Each demo is described once in `ElementsPage` and rendered twice, in its cell and in the [expanded view](expanded-view.md). Both copies read the same state, so they stay in step.

## Component

```jsx
function Cell({ className = '', title, onExpand, children }) {
  return (
    <section className={`grid-cell ${className}`}>
      <div className="cell-content">{children}</div>
      {onExpand && <ExpandButton label={title} onClick={onExpand} />}
    </section>
  )
}
```

Source: [main.jsx](../../src/main.jsx), `Cell`, `ElementsPage`, `BackgroundPage`; [styles.css](../../src/styles.css), `.component-grid`, `.sample-*`, `.grid-cell`, `.cell-*`.
