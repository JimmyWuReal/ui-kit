# Board

Use when items move through named stages. Columns sit on one row that scrolls sideways and snaps to whole columns.

```jsx
<Board label="Tasks by status" columns={[
  { title: 'To do', cards: [{ title: 'Write the launch post', note: 'Due Friday' }] },
  { title: 'Done', cards: [] },
]} />
```

Exported from `patterns.jsx`. Set `--columns` to how many fit; the default is three.

```css
.board {
  --columns: 3;
  --gap: 20px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - (var(--columns) - 1) * var(--gap)) / var(--columns));
  gap: var(--gap);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.board::-webkit-scrollbar { display: none; }
.board:focus-visible { outline: 2px solid rgba(255, 255, 255, .8); outline-offset: -2px; }
.board-column { display: flex; flex-direction: column; gap: 12px; min-width: 0; scroll-snap-align: start; }
.board-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.board-head h3 { margin: 0; font-size: 13px; font-weight: 500; letter-spacing: -.01em; }
.board-cards { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
.board-card { display: flex; flex-direction: column; gap: 5px; padding: 14px 16px; border-radius: 12px; background: #161616; }
.board-card strong { font-size: 13px; font-weight: 400; line-height: 1.45; overflow-wrap: anywhere; }
.board-card small { font-size: 11.5px; color: var(--sub); }
.board-empty { margin: 0; font-size: 11.5px; color: var(--sub); }
@media (max-width: 900px) { .board { --columns: 2.2; } }
@media (max-width: 680px) {
  .board { --columns: 1.12; --gap: 16px; }
}
```

**Keep a sliver of the next column visible.** A column that fits exactly hides the fact that there is more, so on a phone the board looks like it has one column. The fractional `--columns` needs no pager or extra control: it leaves about 24px of the next column at 390px. The scrollbar is hidden, so the sliver is the only signal. Keep it.

The row takes focus, because a keyboard otherwise cannot reach columns past its edge. Use a real list inside each column, and one quiet line in a column with no cards. Cards are flat and fixed: add a hover or press only when a card does something, using the [calendar](calendar.md) day's. Dragging is up to the project. Turn snapping off during a drag, or columns jump under the pointer.

## Component

```jsx
export function Board({ label, columns }) {
  return (
    <div className="board" role="group" aria-label={label} tabIndex={0}>
      {columns.map((column) => (
        <section className="board-column" key={column.title} aria-label={column.title}>
          <header className="board-head">
            <h3>{column.title}</h3>
            <span className="mono-value">{column.cards.length}</span>
          </header>
          {column.cards.length ? (
            <ul className="board-cards">
              {column.cards.map((card) => (
                <li className="board-card" key={card.title}>
                  <strong>{card.title}</strong>
                  {card.note && <small>{card.note}</small>}
                </li>
              ))}
            </ul>
          ) : <p className="board-empty">Nothing here</p>}
        </section>
      ))}
    </div>
  )
}
```

Source: [patterns.jsx](../../src/patterns.jsx), `Board`; [styles.css](../../src/styles.css), `.board*`.
