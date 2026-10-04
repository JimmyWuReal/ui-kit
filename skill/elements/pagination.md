# Pagination

Use for a small number of result pages. The selected number sits on a white moving thumb, with compact previous / next icon buttons.

```jsx
<Pagination value={page} onChange={setPage} total={6} perPage={10} />
```

Exported from `controls.jsx`. `value` is one-based; `total` is **page count**, not item count. Defaults: 6 pages, 10 items per page. `onChange` receives a page number.

```css
.pagination { display: flex; align-items: center; gap: 8px; }
.pages { position: relative; display: grid; grid-template-columns: repeat(var(--count),34px); }
.pages .segmented-thumb { top: 0; bottom: 0; left: 0; width: calc(100% / var(--count)); border-radius: 10px; }
.pages button { height: 34px; padding: 0; border-radius: 10px; font-variant-numeric: tabular-nums; }
```

Copy the shared segmented-thumb and page-button rules. The thumb may slide over 320ms when the page changes; results appear immediately. Numbers brighten on hover, with dark text on the selected white thumb. Narrow-screen columns are 30px.

Preserve boundary disabling, navigation labeling, and `aria-current="page"`. The demo assumes full pages; adapt the range and total item count for a partial final page. For many pages, use a bounded number list / ellipsis rather than overflowing the screen.

Source: [controls.jsx](../../src/controls.jsx), `Pagination`; [styles.css](../../src/styles.css), `.pagination*`, `.pages`, `.segmented-thumb`.
