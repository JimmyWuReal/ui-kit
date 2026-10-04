# Dot matrix

An optional patterned region or canvas, used when the design intentionally calls for it. Prefer a flat background by default; do not add dots to every hero or card. Dots are 1px in radius, spaced on a 16px square grid, over the default black.

```css
.bg-dots {
  background: radial-gradient(#ffffff24 1px, transparent 1px)
    0 0 / 16px 16px, #090909;
}
```

Keep dots crisp. Put dense text or fields on a flat surface if the pattern competes with them. Pattern spacing can change with the canvas scale.

Source: [styles.css](../../src/styles.css), `.bg-dots`.
