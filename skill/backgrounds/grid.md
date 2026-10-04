# Grid

Use when an alignment, editor, or diagram canvas needs a spatial guide. Keep ordinary page sections flat; do not add this pattern as page decoration. This is two hard 1px line layers, not a soft color wash.

```css
.bg-grid {
  background:
    linear-gradient(#ffffff12 1px, transparent 1px) 0 0 / 24px 24px,
    linear-gradient(90deg, #ffffff12 1px, transparent 1px) 0 0 / 24px 24px,
    #090909;
}
```

Adjust grid spacing to the content's scale. Keep important content legible above it.

Source: [styles.css](../../src/styles.css), `.bg-grid`.
