# Rating

Use for a 1–5 score. Hover previews a rating without changing the saved value; clicking commits it.

```jsx
<Rating value={rating} onChange={setRating} />
```

Exported from `controls.jsx`. `value` must be 1–5; the demo has no unrated / zero state. Add that state deliberately if needed, including a reachable keyboard starting point.

```css
.rating { display: flex; gap: 4px; }
.star { width: 38px; height: 38px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 9px; background: transparent; color: #4a4a4a; }
.star svg { fill: transparent; }
.star.is-on { color: #fff; }
.star.is-on svg { fill: currentColor; }
.star:hover { transform: scale(1.12); }
.star:active { transform: scale(.92); }
```

The lucide star is 22px with a 1.6px stroke. Local hover / selection fill changes take 200ms with 30ms between stars; press / hover scale takes 240ms. Render a saved rating fully filled on mount. Preserve radio semantics, descriptive score labels, arrow navigation, and selected-only tab stop.

Source: [controls.jsx](../../src/controls.jsx), `Rating`, `RATINGS`, `arrowStep`; [styles.css](../../src/styles.css), `.rating*`, `.star*`.
