# Toolbar

Use when a page-level action belongs to the content under a set of [tabs](../elements/tabs.md): one row holds both, on one hairline. This is `Tabs` with its `action` prop, so it needs the tabs reference and the [small outline button](../elements/button.md).

```jsx
<Tabs label="Tasks" value={tab} onChange={setTab} tabs={tabs}
  action={<button className="outline-button is-small" type="button" onClick={add}>Add task</button>} />
```

```css
.toolbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; box-shadow: inset 0 -1px 0 var(--line); }
.toolbar .tab-list { flex: 0 1 calc(var(--count) * 88px); min-width: 0; box-shadow: none; }
.toolbar-actions { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; }
```

Tabs keep equal widths, which the sliding indicator's arithmetic depends on, and shrink on narrow screens rather than wrapping. The action stays at the top of the 42px row, so a 36px button sits 6px clear of the hairline instead of crowding it. Keep this row to one or two controls. Filters that need more room go on their own row below it.

Without tabs, a heading and an action on a plain row need no pattern: `.control-row` already does it.

Source: [controls.jsx](../../src/controls.jsx), `Tabs`; [styles.css](../../src/styles.css), `.toolbar*`.
