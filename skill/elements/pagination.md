# Pagination

Use for a small number of result pages. The selected number sits on a white moving thumb, with compact previous / next icon buttons.

```jsx
<Pagination value={page} onChange={setPage} total={6} perPage={10} />
```

Exported from `controls.jsx`. `value` is one-based; `total` is **page count**, not item count. Defaults: 6 pages, 10 items per page. `onChange` receives a page number.

```css
.segmented-thumb {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / var(--count));
  border-radius: 8px;
  background: #fff;
  transform: translateX(calc(var(--index) * 100%));
  transition: transform 320ms cubic-bezier(.22, 1, .36, 1);
}
.segmented button,
.pages button {
  position: relative;
  z-index: 1;
  height: 36px;
  padding: 0 16px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8a8a8a;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: -.01em;
  cursor: pointer;
  transition: color 260ms ease;
}
.segmented button:not(.is-active):hover,
.pages button:not(.is-active):hover { color: #e6e6e6; }
.segmented button.is-active,
.pages button.is-active { color: #0a0a0a; }
.pagination-field { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.pagination { display: flex; align-items: center; gap: 8px; }
.pages { position: relative; display: grid; grid-template-columns: repeat(var(--count), 34px); }
.pages .segmented-thumb { top: 0; bottom: 0; left: 0; width: calc(100% / var(--count)); border-radius: 10px; }
.pages button { height: 34px; padding: 0; border-radius: 10px; font-variant-numeric: tabular-nums; }
@media (max-width: 680px) {
  .pages { grid-template-columns: repeat(var(--count), 30px); }
}
```

The thumb slides over 320ms when the page changes while the numbers cross-fade color over 260ms; the results line updates immediately. Numbers brighten on hover, with dark text on the selected white thumb. Unlike [segmented](segmented.md), the cells are equal width, so the thumb is positioned by `--index` alone and is correct at first paint without measuring. Narrow-screen columns are 30px.

Preserve boundary disabling, navigation labeling, and `aria-current="page"`. The demo assumes full pages; adapt the range and total item count for a partial final page. For many pages, use a bounded number list / ellipsis rather than overflowing the screen.

## Component

```jsx
/* Same sliding thumb as the segmented control, under the page numbers. */
export function Pagination({ value, onChange, total = 6, perPage = 10 }) {
  return (
    <div className="pagination-field">
      <nav className="pagination" aria-label="Pagination">
        <button className="icon-button" type="button" aria-label="Previous page" disabled={value <= 1} onClick={() => onChange(value - 1)}>
          <ChevronLeft size={15} strokeWidth={2} />
        </button>
        <div className="pages" style={{ '--count': total, '--index': value - 1 }}>
          <span className="segmented-thumb" aria-hidden="true" />
          {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
            <button key={page} type="button" className={page === value ? 'is-active' : ''}
              aria-current={page === value ? 'page' : undefined} onClick={() => onChange(page)}>
              {page}
            </button>
          ))}
        </div>
        <button className="icon-button" type="button" aria-label="Next page" disabled={value >= total} onClick={() => onChange(value + 1)}>
          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </nav>
      <span className="mono-label">Results {(value - 1) * perPage + 1}–{value * perPage} of {total * perPage}</span>
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Pagination`; [styles.css](../../src/styles.css), `.pagination*`, `.pages`, `.segmented-thumb`.
