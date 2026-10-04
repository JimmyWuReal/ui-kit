# Tabs

Use to switch among related panels within the same page. A thin moving underline marks the selected tab.

```jsx
<Tabs label="Project" value={tab} onChange={setTab} tabs={[
  ['overview', 'Overview', 'Project summary'],
  ['activity', 'Activity', 'Recent changes'],
]} />
```

Exported from `controls.jsx`. `tabs` are `[key, title, panelContent]` tuples; `value` is a valid key and `onChange` receives a key. Adapt the source's paragraph panel to a suitable container for richer content.

```css
.tab-list { position: relative; display: grid; grid-template-columns: repeat(var(--count), minmax(0,1fr)); box-shadow: inset 0 -1px 0 var(--line); }
.tab-list button { height: 42px; font-size: 12.5px; font-weight: 500; letter-spacing: -.01em; color: #7d7d7d; }
.tab-list button[aria-selected='true'] { color: #fff; }
.tab-indicator { position: absolute; bottom: 0; left: 0; width: calc(100% / var(--count)); height: 1px; background: #fff; transform: translateX(calc(var(--index) * 100%)); transition: transform 320ms cubic-bezier(.22,1,.36,1); }
.tab-panel { margin: 18px 0 0; min-height: 3.4em; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
```

Hover text brightens to `#d0d0d0`. The existing underline may slide on selection; panel content changes immediately. Omit the source's `moved` / `is-entering` logic or disable `panel-enter`. Keep arrow navigation, selected-only tab stop, and tab / panel ARIA relationships.

Source: [controls.jsx](../../src/controls.jsx), `Tabs`, `arrowStep`; [styles.css](../../src/styles.css), `.tab-*`.
