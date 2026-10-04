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
.accordion-item button { width: 100%; height: 50px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0; color: #cfcfcf; font-size: 13px; font-weight: 500; letter-spacing: -.01em; }
.accordion-panel { display: grid; grid-template-rows: 0fr; }
.accordion-item.is-open .accordion-panel { grid-template-rows: 1fr; }
.accordion-panel > div { min-height: 0; overflow: hidden; }
.accordion-panel p { margin: 0; padding: 0 28px 18px 0; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
```

Copy the complete trigger / open-state rules. Reveal content and height immediately: remove grid-row transitions, paragraph fades, and reveal delays. The existing plus may rotate 45° over 320ms to indicate the open state; hover / open trigger text turns white. Preserve `aria-expanded` and `aria-controls`; if bodies contain links or fields, make collapsed content inert or hidden so it cannot receive focus.

Source: [controls.jsx](../../src/controls.jsx), `Accordion`; [styles.css](../../src/styles.css), `.accordion-*`.
