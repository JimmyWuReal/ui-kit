# Mono text

Use `'DM Mono', ui-monospace, monospace`, weight 400. Mono marks metadata and values; use Inter for sentences and primary control labels.

| Role | Use | Size | Line height | Tracking | Color |
| --- | --- | --- | --- | --- | --- |
| Value | Slider, progress, chart values, counts | 11px | 1 | 0 | #d6d6d6 |
| Label | Eyebrow over content | 10px | 1.5 | .15em | #ffffff |
| Field label | Fields, card numbers, chart axes | 9px | 1 | .14em | #6f6f6f |

```css
.mono-value { font: 400 11px/1 'DM Mono', ui-monospace, monospace; color: #d6d6d6; font-variant-numeric: tabular-nums; }
.eyebrow { font: 400 10px/1.5 'DM Mono', ui-monospace, monospace; letter-spacing: .15em; text-transform: uppercase; color: #fff; }
.mono-label { font: 400 9px/1 'DM Mono', ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; color: #6f6f6f; }
```

The source class `.mono-label` is the **9px field label**, despite its name. Use `.eyebrow` for the 10px white Label role. Values remain visible without rolling, fading, or counting into view.

Source: [main.jsx](../../src/main.jsx), `typeScale` → `Mono`; [styles.css](../../src/styles.css), `.mono-label`, `.mono-value`.
