# Mono text

Use `'DM Mono', ui-monospace, monospace`, weight 400. Mono marks metadata and values; use Inter for sentences and primary control labels.

These roles are optional. Use mono for useful units, dates, values, and field labels. Omit decorative eyebrows, section/card numbers, and role/location tags that repeat nearby content. Tiny uppercase text should carry necessary information, not ornament.

| Role | Use | Size | Line height | Tracking | Color |
| --- | --- | --- | --- | --- | --- |
| Value | Slider, progress, chart values, counts | 11px | 1 | 0 | #d6d6d6 |
| Label | Optional context over content | 10px | 1.5 | .15em | #ffffff |
| Field label | Fields, chart axes | 9px | 1 | .14em | #848484 |

```css
.mono-value { font: 400 11px/1 'DM Mono', ui-monospace, monospace; color: #d6d6d6; font-variant-numeric: tabular-nums; }
.eyebrow { font: 400 10px/1.5 'DM Mono', ui-monospace, monospace; letter-spacing: .15em; text-transform: uppercase; color: #fff; }
.mono-label { font: 400 9px/1 'DM Mono', ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; color: #848484; }
```

The source class `.mono-label` is the **9px field label**, despite its name. Use `.eyebrow` for the 10px white Label role. Values are visible at first paint and never count up. The stepper's rolling number and the code input's typed digit are the only values with their own motion.

Source: [main.jsx](../../src/main.jsx), `typeScale` → `Mono`; [styles.css](../../src/styles.css), `.mono-label`, `.mono-value`.
