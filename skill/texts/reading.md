# Reading text

Use semantic headings and paragraphs. Inter uses `Inter, ui-sans-serif, system-ui, sans-serif`; quote uses `Georgia, serif`, italic only. These are the kit's important prose roles.

| Role | Use | Size | Weight | Line height | Tracking | Color |
| --- | --- | --- | --- | --- | --- | --- |
| Display | Page opener | 64px | 500 | 1.05 | -.065em | #ffffff |
| Title | Page / section title, stat | 36px | 500 | 1.15 | -.045em | #ffffff |
| Heading | Start a section | 24px | 500 | 1.3 | -.035em | #ffffff |
| Quote | Pull quote, Georgia italic | 24px | 400 | 1.5 | 0 | #cccccc |
| Description | Intro below a title | 18px | 400 | 1.6 | -.02em | #aaaaaa |
| Body | Running text | 14px | 400 | 1.75 | 0 | #999999 |
| Caption | Supporting note | 12px | 400 | 1.5 | 0 | #888888 |

```css
.display { margin: 0; font-size: 64px; font-weight: 500; line-height: 1.05; letter-spacing: -.065em; color: #fff; }
.title { margin: 0; font-size: 36px; font-weight: 500; line-height: 1.15; letter-spacing: -.045em; color: #fff; }
.heading { margin: 0; font-size: 24px; font-weight: 500; line-height: 1.3; letter-spacing: -.035em; color: #fff; }
.quote { font: italic 400 24px/1.5 Georgia, serif; letter-spacing: 0; color: #ccc; }
.description { font-size: 18px; line-height: 1.6; letter-spacing: -.02em; color: #aaa; }
.body-copy { font-size: 14px; line-height: 1.75; color: #999; }
.caption { font-size: 12px; line-height: 1.5; color: #888; }
```

Scale the display down on narrow screens when the content needs it; preserve its tight tracking and hierarchy. All text renders immediately.

Source: [main.jsx](../../src/main.jsx), `typeScale` → `Reading`. The gallery renders most roles with inline styles; the class names above are reusable recipes.
