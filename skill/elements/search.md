# Search

Use for finding or filtering content, with a leading search icon and a clear action.

```jsx
<SearchField value={query} onChange={setQuery} />
```

Exported from `controls.jsx`. `onChange` receives the text. The source has the fixed placeholder / accessible name `Search components`; adapt both to the content being searched.

```css
.text-field input,
.text-field textarea,
.search-field input,
.select-trigger {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  outline: 0;
  color: #ededed;
  background: transparent;
  font-size: 13px;
  letter-spacing: -.01em;
  box-shadow: inset 0 0 0 1px var(--line);
  transition: box-shadow 200ms ease;
}
.text-field :is(input, textarea)::placeholder,
.search-field input::placeholder { color: #565656; }
.text-field :is(input, textarea):hover,
.search-field input:hover,
.select-trigger:hover { box-shadow: inset 0 0 0 1px var(--line-hover); }
.text-field :is(input, textarea):focus,
.search-field input:focus,
.select.is-open .select-trigger { box-shadow: inset 0 0 0 1px var(--line-live); }
.search-field { position: relative; }
.search-field input { -webkit-appearance: none; appearance: none; padding: 0 44px 0 42px; }
.search-field input::-webkit-search-cancel-button { display: none; }
.search-icon { position: absolute; top: 50%; left: 16px; color: #6f6f6f; transform: translateY(-50%); pointer-events: none; transition: color 200ms ease; }
.search-field:focus-within .search-icon { color: #fff; }
.search-clear {
  position: absolute;
  top: 11px;
  right: 11px;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 7px;
  color: #cfcfcf;
  background: rgba(255, 255, 255, .08);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: scale(.8);
  transition: opacity 160ms ease-out, transform 200ms cubic-bezier(.22, 1, .36, 1), visibility 0s 200ms, background-color 140ms ease-out;
}
.search-field.has-value .search-clear { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
.search-clear:hover { color: #fff; background: rgba(255, 255, 255, .14); }
.text-field :is(input, textarea):focus-visible,
.search-field input:focus-visible,
.code-boxes input:focus-visible { outline: 0; }
```

The icon brightens on focus over 200ms. The clear button stays mounted and is shown by `.has-value`: it fades in over 160ms and scales up from .8 over 200ms, while `visibility` waits 200ms on the way out so it can ease off. Its hover uses a 14% white fill over 140ms.

Clearing returns focus to the input. Escape clears a nonempty query before being allowed to dismiss a surrounding view. Keep an accessible label independent of the placeholder.

## Component

```jsx
export function SearchField({ value, onChange }) {
  const input = useRef(null)
  const clear = () => { onChange(''); input.current.focus() }
  return (
    <div className={`search-field ${value ? 'has-value' : ''}`}>
      <Search className="search-icon" size={15} strokeWidth={2} aria-hidden="true" />
      <input ref={input} type="search" placeholder="Search components" aria-label="Search components" value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          // A first Escape clears the query; the next one closes the view.
          if (event.key === 'Escape' && value) { event.preventDefault(); event.stopPropagation(); onChange('') }
        }} />
      <button className="search-clear" type="button" aria-label="Clear search" tabIndex={value ? 0 : -1} onClick={clear}>
        <X size={13} strokeWidth={2.2} />
      </button>
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `SearchField`; [styles.css](../../src/styles.css), `.search-*` and shared field rules.
