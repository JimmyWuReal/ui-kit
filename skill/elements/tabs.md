# Tabs

Use to switch among related panels within the same page. A thin moving underline marks the selected tab.

```jsx
<Tabs label="Project" value={tab} onChange={setTab} tabs={[
  ['overview', 'Overview', 'Project summary'],
  ['activity', 'Activity', 'Recent changes'],
]} />
```

Exported from `controls.jsx`. `tabs` are `[key, title, panelContent]` tuples; `value` is a valid key and `onChange` receives a key. The panel holds any content, such as a [list](../patterns/list-row.md). `action` puts a page-level action on the tab row, as a [toolbar](../patterns/toolbar.md).

```css
.tab-list { position: relative; display: grid; grid-template-columns: repeat(var(--count), minmax(0, 1fr)); box-shadow: inset 0 -1px 0 var(--line); }
.tab-list button {
  height: 42px;
  padding: 0;
  border: 0;
  border-radius: 8px 8px 0 0;
  background: transparent;
  color: var(--sub);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: -.01em;
  cursor: pointer;
  transition: color 200ms ease;
}
.tab-list button:hover { color: #d0d0d0; }
.tab-list button[aria-selected='true'] { color: #fff; }
.tab-list button:focus-visible { outline-offset: -2px; }
.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% / var(--count));
  height: 1px;
  background: #fff;
  pointer-events: none;
  transform: translateX(calc(var(--index) * 100%));
  transition: transform 320ms cubic-bezier(.22, 1, .36, 1);
}
.tab-panel { min-height: 3.4em; margin: 18px 0 0; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
.tab-panel.is-entering { animation: panel-enter 260ms cubic-bezier(.22, 1, .36, 1); }
@keyframes panel-enter { from { opacity: 0; transform: translateY(4px); } }
```

Hover text brightens to `#d0d0d0` and selected text whitens over 200ms. The underline slides over 320ms. The panel rises 4px and fades in over 260ms when the tab changes, not when the page loads: `key={value}` remounts it, and the `moved` ref adds `.is-entering` only after the first selection. Keep both. Keep arrow navigation, selected-only tab stop, and tab / panel ARIA relationships.

## Component

```jsx
/* Moves focus and selection together across a row of roving-tabindex
   buttons, the way native radios do. */
function arrowStep(event, count, index, onStep) {
  const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
  if (!delta) return
  event.preventDefault()
  const next = (index + delta + count) % count
  event.currentTarget.querySelectorAll('[data-step]')[next]?.focus()
  onStep(next)
}

/* `action` shares the tab row, for the page-level action of a list or board. */
export function Tabs({ label, tabs, value, onChange, action }) {
  const index = tabs.findIndex(([key]) => key === value)
  /* The panel fades in when the tab changes, not when the page loads. */
  const moved = useRef(false)
  const select = (key) => { moved.current = true; onChange(key) }
  const id = useId()
  const list = (
    <div className="tab-list" role="tablist" aria-label={label} style={{ '--count': tabs.length, '--index': index }}
      onKeyDown={(event) => arrowStep(event, tabs.length, index, (next) => select(tabs[next][0]))}>
      {tabs.map(([key, title]) => (
        <button key={key} type="button" role="tab" data-step id={`${id}-${key}`} aria-selected={key === value}
          aria-controls={`${id}-panel`} tabIndex={key === value ? 0 : -1} onClick={() => select(key)}>
          {title}
        </button>
      ))}
      <span className="tab-indicator" aria-hidden="true" />
    </div>
  )
  return (
    <div className="tabs">
      {action ? <div className="toolbar">{list}<div className="toolbar-actions">{action}</div></div> : list}
      <div className={`tab-panel ${moved.current ? 'is-entering' : ''}`} key={value} role="tabpanel"
        id={`${id}-panel`} aria-labelledby={`${id}-${value}`}>
        {tabs[index][2]}
      </div>
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Tabs`, `arrowStep`; [styles.css](../../src/styles.css), `.tab-*`.
