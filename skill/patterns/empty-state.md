# Empty state

Use wherever data could be absent: a first run, a filter with no results, a finished list. An empty region keeps its place on the page and says what to do next.

```jsx
<EmptyState title="No projects yet" note="Projects keep related tasks together."
  action={<button className="outline-button is-small" type="button" onClick={create}>New project</button>} />
```

Exported from `patterns.jsx`.

```css
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 48px 24px; text-align: center; }
.empty-state strong { font-size: 14px; font-weight: 500; color: #fff; }
.empty-state p { max-width: 36ch; margin: 0; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
.empty-state .outline-button { margin-top: 12px; }
```

Name what is missing in the title, and give the reason or next step in one sentence. Include the action that fills the region when there is one: `New project` on a first run, `Clear filters` for no results. Do not add an illustration or ornamental icon, and keep the surrounding toolbar, since it may be the way out.

In a small region, such as one board column, a single quiet line is enough; the [board](board.md)'s `Nothing here` is that case. An empty state does not animate in. It appears when the data says so.

## Component

```jsx
export function EmptyState({ title, note, action }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      {note && <p>{note}</p>}
      {action}
    </div>
  )
}
```

Source: [patterns.jsx](../../src/patterns.jsx), `EmptyState`; [styles.css](../../src/styles.css), `.empty-state`.
