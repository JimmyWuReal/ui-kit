# Interface text

Use Inter for these roles. Weight, muted color, and context separate labels from values; do not make every control bold.

Add helper text when it clarifies a choice, constraint, error, or unfamiliar behavior. Omit obvious instructions, duplicate labels, and decorative footer taglines. Keep the labels and accessible names needed to operate controls.

| Role | Use | Size | Weight | Line height | Tracking | Color |
| --- | --- | --- | --- | --- | --- | --- |
| Brand | Site header | 15px | 600 | normal | -.035em | #efefef |
| Card name | Content / background card | 14px | 500 | normal | 0 | #ffffff |
| Button | Action label | 13px | 600 | normal | -.01em | #ffffff; #111111 on primary |
| Control title | Toggle, checkbox, radio, stepper, popup | 13px | 500 | normal | -.01em | #ffffff |
| Question | Accordion trigger | 13px | 500 | normal | -.01em | #cfcfcf |
| Count | Stepper value | 13px | 500 | normal | 0 | #ffffff |
| Field text | Input, search, select | 13px | 400 | normal | -.01em | #ededed |
| Option | Select option | 13px | 400 | normal | -.01em | #a8a8a8 |
| Code digit | Verification box | 18px | 500 | normal | 0 | #ffffff |
| Segment | Segmented, pagination, navigation | 12.5px | 500 | normal | -.01em | #8a8a8a |
| Tab | Tab navigation | 12.5px | 500 | normal | -.01em | #7d7d7d |
| Chip | Filter, chart key | 12.5px | 500 | normal | -.01em | #a8a8a8 |
| Panel text | Card, popup, tab, accordion body | 12.5px | 400 | 1.7 | 0 | #7d7d7d |
| Control note | Control helper, chart legend | 11.5px | 400 | normal | 0 | #7d7d7d |
| Tooltip | Hint on #1c1c1c | 11px | 400 | 1 | 0 | #a8a8a8 |
| Footer | Site footer | 11px | 400 | normal | 0 | #666666 |

```css
.control-title { font-size: 13px; font-weight: 500; letter-spacing: -.01em; color: #fff; }
.control-note { font-size: 11.5px; font-weight: 400; color: var(--sub); }
.panel-copy { font-size: 12.5px; font-weight: 400; line-height: 1.7; color: var(--sub); }
```

These colors describe resting text. Use each element's selected, hover, and focus colors from its reference. Stepper counts use tabular numerals. Placeholder text defaults to `#565656`, distinct from entered text.

Source: [main.jsx](../../src/main.jsx), `typeScale` → `Interface`; [styles.css](../../src/styles.css), corresponding component selectors.
