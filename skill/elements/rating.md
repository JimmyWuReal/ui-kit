# Rating

Use for a 1–5 score. Hover previews a rating without changing the saved value; clicking commits it.

```jsx
<Rating value={rating} onChange={setRating} />
```

Exported from `controls.jsx`. `value` must be 1–5; the demo has no unrated / zero state. Add that state deliberately if needed, including a reachable keyboard starting point.

```css
.rating-field { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.rating { display: flex; gap: 4px; }
.star {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #4a4a4a;
  cursor: pointer;
  transition: color 200ms ease var(--delay), transform 240ms cubic-bezier(.22, 1, .36, 1);
}
.star svg { fill: transparent; transition: fill 200ms ease var(--delay); }
.star.is-on { color: #fff; }
.star.is-on svg { fill: currentColor; }
.star:hover { transform: scale(1.12); }
.star:active { transform: scale(.92); }
```

The lucide star is 22px with a 1.6px stroke. Stars fill one after another: each has `--delay: index * 30ms`, applied to its color and fill over 200ms, so a hover preview or a click runs along the row. Hover scales a star to 1.12 and pressing to .92, over 240ms. The word under the stars updates immediately. Render a saved rating fully filled on mount. Preserve radio semantics, descriptive score labels, arrow navigation, and selected-only tab stop.

## Component

```jsx
const RATINGS = ['Poor', 'Fair', 'Good', 'Great', 'Excellent']

export function Rating({ value, onChange }) {
  /* Hovering previews a score without committing it. */
  const [preview, setPreview] = useState(null)
  const shown = preview ?? value
  return (
    <div className="rating-field">
      <div className="rating" role="radiogroup" aria-label="Rating" onMouseLeave={() => setPreview(null)}
        onKeyDown={(event) => arrowStep(event, RATINGS.length, value - 1, (next) => onChange(next + 1))}>
        {RATINGS.map((label, index) => (
          <button key={label} type="button" role="radio" data-step aria-checked={value === index + 1} aria-label={label}
            tabIndex={value === index + 1 ? 0 : -1} className={`star ${index < shown ? 'is-on' : ''}`}
            style={{ '--delay': `${index * 30}ms` }}
            onMouseEnter={() => setPreview(index + 1)} onClick={() => onChange(index + 1)}>
            <Star size={22} strokeWidth={1.6} />
          </button>
        ))}
      </div>
      <span className="mono-label">{RATINGS[shown - 1]}</span>
    </div>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `Rating`, `RATINGS`, `arrowStep`; [styles.css](../../src/styles.css), `.rating*`, `.star*`.
