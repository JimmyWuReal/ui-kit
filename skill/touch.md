# Touch

The kit draws small, precise controls for a mouse. On a touch screen a finger needs about 44×44px, so the drawn size stays and the target stretches around it. Add this block to any page that may be used on a phone or tablet.

**Put it last, after every element's CSS.** These rules tie on specificity with the elements' own, so anything placed after them silently wins and the fix does nothing. This is the easiest way to get touch wrong, and nothing looks broken when it happens. Measure, as below, rather than reading the CSS.

```css
@media (pointer: coarse) {
  .brand, .outline-button, .chip, .stepper button, .star, .expand-close { position: relative; }
  :is(.brand, .outline-button, .icon-button, .toggle, .chip, .segmented :is(button, a), .pages button, .stepper button, .star, .search-clear, .expand-button, .expand-close, .swatch)::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100%, 44px);
    height: max(100%, 44px);
    transform: translate(-50%, -50%);
  }
  .pages button::after { width: 100%; }
  .chips { gap: 10px; }
  .rating { gap: 6px; }
  .row-actions { gap: 16px; }
  .surface-picker { gap: 18px; }
  .checkbox-row, .radio-row { min-height: 44px; }
  .select-menu button, .tab-list button { height: 44px; }
  .slider-field input { height: 44px; margin-block: -13px; }
  .text-field :is(input, textarea), .search-field input { font-size: 16px; }
}
```

Keep only the selectors for elements the page uses, and add your own small controls to the `:is()` list. Each needs `position: relative`, or `absolute` if it already has it, and no `overflow: hidden` of its own, which would clip the `::after`. `pointer: coarse` leaves the mouse rendering untouched.

## Rules

- **Aim for 44×44px.** That is the size of the target, not of what is drawn: a 28px icon button stays 28px and gains a clear 44px target.
- **Never overlap targets.** Where two would collide, the later one paints on top and steals taps from the near side of the earlier one, so tapping the edge of one control activates its neighbour. Space the row out to a 44px pitch instead.
- **When a row cannot fit, keep the height and share the width.** Page numbers and calendar days are the kit's two cases. Hold 24×24px as the floor.
- **Nothing is hidden behind hover on touch.** Guard hover-revealed content with `@media (hover: hover)`, as the [list row](patterns/list-row.md) does, so touch shows it at rest. Reveal it for keyboards too, with `:has(:focus-visible)`.
- **Fields are 16px on touch.** iOS zooms the whole page when a smaller field takes focus.

## Measuring

Check in a browser with touch emulated, because `pointer: coarse` does not match otherwise.

- Measure the target, not the box: walk outward from the control's center with `document.elementFromPoint`, and count how far the control still answers. That catches `::after` targets, and neighbours or overlays that steal the tap.
- Use `offsetWidth` for a control's size. `getBoundingClientRect` includes transforms, so a pressed button reads 42px instead of 44px.
- In Playwright, `fullPage: true` renders without touch emulation, even though `matchMedia` still reports touch afterwards. `hover: none` styles vanish from the image, so hover-revealed controls look missing. To capture a tall phone page, set the viewport to the page's `scrollHeight` and take a normal screenshot.

Source: [styles.css](../src/styles.css), the Touch block at the end.
