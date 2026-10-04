# Card

Use for a compact project or resource summary, with one supporting action. Its solid `#161616` fill differs from the background swatch's `#111111`.

```jsx
<article className="card">
  <strong>Project name</strong>
  <p>A short description of what is inside.</p>
  <button className="outline-button is-small" type="button" onClick={openProject}>Open</button>
</article>
```

```css
.card { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 20px; border-radius: 16px; background: #161616; }
.card strong { font-size: 14px; font-weight: 500; }
.card p { margin: 0 0 12px; font-size: 12.5px; line-height: 1.7; color: var(--sub); }
```

Adapt content and width; retain a clear title / description / action hierarchy. There is no card animation or hover lift in the kit. Use the [small outline button](button.md) for its action.

Source: [main.jsx](../../src/main.jsx), `ProjectCard`; [styles.css](../../src/styles.css), `.card`.
