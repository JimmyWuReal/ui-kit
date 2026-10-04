# Search

Use for finding or filtering content, with a leading search icon and a clear action.

```jsx
<SearchField value={query} onChange={setQuery} />
```

Exported from `controls.jsx`. `onChange` receives the text. The source has the fixed placeholder / accessible name `Search components`; adapt both to the content being searched.

```css
.search-field { position: relative; }
.search-field input { height: 48px; padding: 0 44px 0 42px; border-radius: 10px; }
.search-icon { position: absolute; top: 50%; left: 16px; color: #6f6f6f; transform: translateY(-50%); }
.search-clear { position: absolute; top: 11px; right: 11px; width: 26px; height: 26px; border-radius: 7px; background: rgba(255,255,255,.08); }
```

Copy the shared [field](text-field.md) rules and `.search-field.has-value` visibility state. The icon brightens on focus; clear-button hover uses a 14% white fill. Show / hide the clear action immediately, removing its opacity, scale, and delayed visibility transitions.

Clearing returns focus to the input. Escape clears a nonempty query before being allowed to dismiss a surrounding view. Keep an accessible label independent of the placeholder.

Source: [controls.jsx](../../src/controls.jsx), `SearchField`; [styles.css](../../src/styles.css), `.search-*` and shared field rules.
