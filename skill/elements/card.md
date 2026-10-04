# Card

Use when a compact project or resource summary benefits from its own surface; a plain list or text block may be enough. Its solid `#161616` fill differs from the background swatch's `#111111`. A description and supporting action are optional, based on the content.

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

Adapt content and width; give the title clear emphasis, then include only useful details and actions. Omit decorative icons, index numbers, extra badges, and internal divider lines. There is no card outline, animation, or hover lift in the kit. Use the [small outline button](button.md) when an action is needed.

Source: [main.jsx](../../src/main.jsx), `ProjectCard`; [styles.css](../../src/styles.css), `.card`.
