# Accordion

Use for FAQs or details that readers choose to reveal. The kit opens one item at a time; clicking the open item closes it.

```jsx
<Accordion value={openItem} onChange={setOpenItem} items={[
  ['what', 'What is included?', 'The elements needed for your page.'],
  ['use', 'How do I use it?', 'Choose the pieces that fit your task.'],
]} />
```

Exported from `controls.jsx`. `items` are `[key, title, body]` tuples; `value` is a key or null; `onChange` receives a key or null.

```css
.accordion-item { box-shadow: inset 0 -1px 0 var(--rule); }
.accordion-item button {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #cfcfcf;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -.01em;
  text-align: left;
  cursor: pointer;
  transition: color 200ms ease;
}
.accordion-item button:hover,
.accordion-item.is-open button { color: #fff; }
.accordion-item button svg { flex: 0 0 auto; color: #7d7d7d; transition: transform 320ms cubic-bezier(.22, 1, .36, 1), color 200ms ease; }
.accordion-item.is-open button svg { color: #fff; transform: rotate(45deg); }
.accordion-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 320ms cubic-bezier(.22, 1, .36, 1); }
.accordion-item.is-open .accordion-panel { grid-template-rows: 1fr; }
.accordion-panel > div { min-height: 0; overflow: hidden; }
.accordion-panel p { margin: 0; padding: 0 28px 18px 0; font-size: 12.5px; line-height: 1.7; color: var(--sub); opacity: 0; transition: opacity 200ms ease; }
.accordion-item.is-open .accordion-panel p { opacity: 1; transition-delay: 80ms; }
```

The plus rotates 45° into a cross and brightens. The panel opens on a `0fr → 1fr` grid row over 320ms, so no height has to be measured. Its text fades in over 200ms, starting 80ms after the row, and fades straight out on close. Hover / open trigger text turns white over 200ms.

Keep every panel mounted so closing animates too. Preserve `aria-expanded` and `aria-controls`. If bodies contain links or fields, make collapsed content `inert` so it cannot receive focus; `hidden` or unmounting would cancel the closing animation.

## Component

```jsx
/* Height is animated with a 0fr → 1fr grid row, so no panel has to be
   measured. One item open at a time; opening the open one closes it. */
export function Accordion({ items, value, onChange }) {
  const id = useId()
  return (
    <div className="accordion">
      {items.map(([key, title, body]) => {
        const open = key === value
        return (
          <div className={`accordion-item ${open ? 'is-open' : ''}`} key={key}>
            <button type="button" aria-expanded={open} aria-controls={`${id}-${key}`} onClick={() => onChange(open ? null : key)}>
              {title}
              <Plus size={15} strokeWidth={2} />
            </button>
            <div className="accordion-panel" id={`${id}-${key}`}>
              <div><p>{body}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Accordion`; [styles.css](../../src/styles.css), `.accordion-*`.
