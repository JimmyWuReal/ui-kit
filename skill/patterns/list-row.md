# List row

Use for a list of things a person acts on: tasks, files, members. It is the [checkbox](../elements/checkbox.md) row with the title on the first line, plus optional quiet actions. Drop the checkbox when the row has nothing to mark.

```jsx
<ul className="list">
  <ListRow title="Write the launch post" note="Due Friday" done={done} onToggle={toggle}
    actions={<button className="icon-button is-small is-quiet" type="button" aria-label="Delete Write the launch post" onClick={remove}>
      <Trash2 size={13} strokeWidth={2} aria-hidden="true" />
    </button>} />
</ul>
```

Exported from `patterns.jsx`. It needs the checkbox and [icon button](../elements/icon-button.md) references. Include the row's own name in each action's `aria-label`, because every row repeats the same icons.

```css
.list { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.list-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; }
.list-row .checkbox-row { flex: 1; min-width: 0; align-items: flex-start; gap: 12px; }
.list-row .checkbox-row > span:last-child { min-width: 0; }
.list-row strong { font-weight: 400; line-height: 22px; color: #ededed; overflow-wrap: anywhere; transition: color 200ms ease; }
.list-row.is-done strong { color: var(--sub); text-decoration: line-through; }
.row-actions { flex: 0 0 auto; display: flex; gap: 2px; margin-top: -3px; }
@media (hover: hover) {
  .row-actions { opacity: 0; transition: opacity 160ms ease-out; }
  .list-row:hover .row-actions,
  .list-row:has(:focus-visible) .row-actions { opacity: 1; }
}
```

Rows are separated by spacing, with no dividers and no hover fill. Keep metadata to one quiet line; a row with several lines of detail wants a detail view instead. Show at most two actions, because more squeeze the title on a phone, where they stay visible.

Actions fade in over 160ms `ease-out`, the kit's fade for revealed controls. They stay mounted, so they ease both ways and stay reachable by keyboard: focus entering the row reveals them. Only `@media (hover: hover)` hides them, so touch always shows them. See [touch](../touch.md).

## Component

```jsx
export function ListRow({ title, note, done, onToggle, actions }) {
  return (
    <li className={`list-row ${done ? 'is-done' : ''}`}>
      <label className="checkbox-row">
        <input type="checkbox" checked={done} onChange={onToggle} />
        <span className="checkbox-box"><CheckMark /></span>
        <span><strong>{title}</strong>{note && <small>{note}</small>}</span>
      </label>
      {actions && <div className="row-actions">{actions}</div>}
    </li>
  )
}
```

Source: [patterns.jsx](../../src/patterns.jsx), `ListRow`; [styles.css](../../src/styles.css), `.list*`, `.row-actions`.
