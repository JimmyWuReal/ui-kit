# Motion

The kit's animation system, as the site actually behaves. Each element reference carries that element's exact CSS and state logic; this file explains the rules behind them and lists every timing in one place.

## Rules

1. **The page is complete when it paints.** Nothing fades, slides, or staggers in on load. No page fades, scroll reveals, staggered cards, animated headings, counting numbers, or route transitions. Navigating swaps content instantly; only the nav's own thumb moves.
2. **Chart data marks are the one mount animation.** Lines draw, bars grow, slices fade, and the meter reveals. Their titles, axes, legends, keys, and surrounding cards appear immediately. Returning to a page with charts plays them again, because they remount.
3. **Everything else answers something.** A pointer, a key, a value changing, or real work in progress. Status is the only motion that runs without input: the spinner while loading, and the progress bar as real progress arrives.
4. **Controls mount at rest.** Render the actual value with no startup sweep. CSS-state controls (checkbox, radio, toggle, chips, slider, stars) get this for free, because a transition cannot fire on the first style. Three controls need a guard, and each is in its component:
   - Segmented: the thumb is not rendered until it has been measured.
   - Stepper: `direction` is null until the first step.
   - Tabs: the `moved` ref adds `.is-entering` only after the first selection.
5. **Transition when a node persists; keyframe when a node is new.** A node that exists in both states stays mounted and transitions, so it eases both ways: select menus, tooltips, accordion panels, thumbs, chart hover dots, the search clear button. A node created by the change uses a keyframe: a rolled number, a typed digit, a changed tab panel, an opened popup. Those replay through a React `key`, or by mounting.
6. **Move one thing.** A single thumb, indicator, or marker slides between positions instead of each option fading its own fill. Never remount it or key it by the current value; that turns a glide into a jump.
7. **Sequence, don't overlap.** The fill lands first and the mark follows 70ms later (checkbox, radio, chip). The accordion's row opens, then its text fades in 80ms later. The tooltip's old word leaves, then the new one arrives 90ms later. Reversing skips the delay, so leaving is quicker than arriving.
8. **Stagger only inside one control or one series.** Stars 30ms, bars 40ms, slices 60ms, each `index * step` through a `--delay` property. Never stagger cards, sections, or list rows.
9. **Press fast, release slow.** Buttons set `transition-duration: 55ms` on `:active`, so a press lands at once and the release settles over the base timing.
10. **Small distances.** Entrances travel 4–12px, and overlays scale from .96 or higher; only small icons and digits start lower. Hover lifts by 1px.
11. **Exits are usually the reverse.** A persistent node eases back out; `visibility` waits for the longest transition so it can (`visibility 0s 240ms`, cleared with `transition-delay: 0s` on the open state). The popup and expanded view unmount immediately and have no exit.
12. **CSS only.** The kit needs no animation library. In Tailwind, use arbitrary values or keep these rules in custom CSS.

## Curves

| Name | Value | Use |
| --- | --- | --- |
| Settle | `cubic-bezier(.22, 1, .36, 1)` | Anything that moves: thumbs, knobs, menus, panels, press scales, chart hover dots |
| Draw | `cubic-bezier(.65, 0, .35, 1)` | Strokes and dots being drawn: tick, radio dot, chart line |
| `ease` / `ease-out` | | Color, fill, hairline, and opacity |
| `linear` | | The spinner, and nothing else |
| `steps(1)` | | The caret blink |

## Durations

| Time | Use |
| --- | --- |
| 55ms | Button press |
| 100ms | Tooltip word leaving |
| 140ms | Press release, option hover |
| 160ms | Short fades, chart hover dot |
| 180–200ms | Color, hairline, and hover changes |
| 240ms | Tick, radio dot, menu settle, chip space |
| 260ms | Toggle color, segment text, new number or panel |
| 320ms | Thumbs, knobs, indicators, chevrons, accordion row, progress |
| 400–900ms | Chart mount only |

## Every motion

Settle and Draw are the curves above.

### Actions

| Element | Trigger | Motion |
| --- | --- | --- |
| Outline button | Hover | Hairline, 200ms `ease` |
| | Press | `scale(.97)`, 55ms Settle; release 140ms |
| Gradient buttons | Hover | Fill and shadow 180ms `ease-out`; `translateY(-1px)` 140ms Settle |
| | Press | `translateY(1px) scale(.97)`, all 55ms; release at base timing |
| Icon button | Hover | Icon 180ms `ease-out`; hairline 200ms `ease` |
| | Press | `scale(.94)`, 140ms Settle |
| | `.is-on` | Icon 180ms; fill and hairline 200ms; icons crossfade (opacity 200ms `ease`, scale from .6 at 240ms Settle) |
| | `.is-hidden` | Opacity 160ms `ease-out`; `scale(.8)` 140ms Settle |

### Selection

| Element | Trigger | Motion |
| --- | --- | --- |
| Checkbox | Check | Fill and hairline 200ms `ease`; tick draws 240ms Draw after 70ms |
| | Uncheck | The same with no delay |
| Radio | Select | Fill and hairline 200ms `ease`; dot scales in 240ms Draw after 70ms; old dot scales out with no delay |
| Toggle | Switch | Knob 320ms Settle; track and knob color 260ms `ease` |
| Chips | Toggle | Fill, text, and hairline 200ms `ease`; space and padding 240ms Settle; tick 240ms Draw, after 70ms when turning on |
| Segmented | Select | Thumb position and width 320ms Settle; text 260ms `ease` |
| Pagination | Change | Thumb 320ms Settle; numbers 260ms `ease` |
| Tabs | Select | Underline 320ms Settle; text 200ms `ease`; new panel `panel-enter` 260ms Settle |
| Rating | Hover or click | Color and fill 200ms `ease` after `index * 30ms` |
| | Hover, press | `scale(1.12)`, `scale(.92)`, 240ms Settle |

### Fields

| Element | Trigger | Motion |
| --- | --- | --- |
| Text field, area, search, select trigger | Hover, focus | Hairline `--line` → `--line-hover` → `--line-live`, 200ms `ease` |
| Text area | Near limit | Counter color 200ms `ease` |
| Search | Focus | Icon color 200ms `ease` |
| | Has a value | Clear button: opacity 160ms `ease-out`, `scale(.8)` to 1 at 200ms Settle, `visibility` waits 200ms on hide, hover fill 140ms |
| Code input | Type | Digit `digit-enter` 200ms Settle; box edge 200ms `ease` |
| | Focus on empty box | Caret `caret-blink` 1s `steps(1)`, infinite |
| Slider | Press | Knob `scale(1.15)`, 180ms Settle; the fill has no transition |
| Stepper | Hover, press | Icon 180ms `ease-out`; `scale(.88)` 140ms Settle |
| | Step | Number `roll-up` or `roll-down`, 260ms Settle |

### Revealed content

| Element | Trigger | Motion |
| --- | --- | --- |
| Select | Open, close | Menu opacity 160ms `ease-out`, `translateY(-4px) scale(.98)` 240ms Settle; chevron 180° 320ms Settle and color 200ms; `visibility` waits 240ms on close |
| | Option hover | Fill and text 140ms `ease-out` |
| Accordion | Open | Row `0fr → 1fr` 320ms Settle; plus 45° 320ms Settle; text fades 200ms `ease` after 80ms |
| | Close | The same with no text delay |
| Tooltip | Hover, focus | Opacity 160ms `ease-out`; `translate(-50%, 4px) scale(.96)` to rest at 200ms Settle |
| | Copy | Old word fades 100ms and slides 6px over 240ms; new word waits 90ms, fades 160ms, slides 240ms; `--hold` adds 200ms while the tooltip fades away by itself |
| Popup | Open | Backdrop `popup-fade` 160ms `ease-out`; dialog `popup-in` 240ms Settle |
| | Close | Unmounts immediately |
| Expanded view | Open | Overlay `overlay-enter` 220ms `ease-out`; content `expand-enter` 300ms Settle; picker `picker-enter` 320ms Settle after 60ms |
| | Close | Unmounts immediately |
| Expand button | Cell hover, focus | Opacity 160ms `ease-out`; `scale(.92)` to 1 at 160ms Settle |
| Swatch | Hover, select | `scale(1.1)` 180ms Settle; ring 180ms `ease-out` |

### Status and charts

| Element | Trigger | Motion |
| --- | --- | --- |
| Spinner | While loading | `spin` 800ms `linear`, infinite |
| Progress | Value changes | `scaleX` 320ms Settle |
| Line chart, sparkline | Mount | `draw` 900ms Draw |
| | Inspect | Dot `cx`/`cy` 160ms Settle; line chart dots fade 160ms `ease` in place. Crosshair, tooltip, and text update immediately |
| Bar chart | Mount | `bar-grow` 600ms Settle after `index * 40ms` |
| | Column hover | Bar color 200ms `ease`; tooltip opacity 160ms `ease-out`, rise 200ms Settle |
| Pie chart | Mount | `slice-enter` 400ms `ease-out` after `index * 60ms` |
| Stacked bar | Mount | `meter-fill` 700ms Settle |
| Pie, stacked bar | Hover slice, segment, or key | Others dim to .25, 200ms `ease` |

## What does not animate

Cards, page changes, text, chart titles and axes, the line chart's tooltip and crosshair, the slider fill, result counts, the danger button's hover fill, and anything at first paint outside rule 2.

## Keyframes

```css
@keyframes popup-fade { from { opacity: 0; } }
@keyframes popup-in { from { opacity: 0; transform: scale(.96); } }
@keyframes draw { from { stroke-dashoffset: 1; } }
@keyframes bar-grow { from { transform: scaleY(0); } }
@keyframes slice-enter { from { opacity: 0; } }
@keyframes meter-fill { from { clip-path: inset(0 100% 0 0 round 999px); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes roll-up { from { opacity: 0; transform: translateY(9px); } }
@keyframes roll-down { from { opacity: 0; transform: translateY(-9px); } }
@keyframes digit-enter { from { opacity: 0; transform: translateY(4px) scale(.9); } }
@keyframes panel-enter { from { opacity: 0; transform: translateY(4px); } }
@keyframes caret-blink { 50% { opacity: 0; } }
@keyframes overlay-enter { from { opacity: 0; } to { opacity: 1; } }
@keyframes expand-enter { from { opacity: 0; transform: translateY(10px) scale(.985); } to { opacity: 1; transform: none; } }
@keyframes picker-enter { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
```

## Reduced motion

This is the site's rule, and it is in the [shared foundation](SKILL.md#shared-foundation). It collapses every transition and animation rather than removing them, so end states still apply and infinite loops stop.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

Effects with a separate `transition-delay` keep that delay under this rule. When reduced motion matters for a new control, zero the delay as well.

## Checking your work

- Reload: only chart data marks, status, and values that are really changing should move.
- Use each control, then undo it. Persistent nodes should ease both ways.
- Reopen revealed content and repeat a step: keyframes should replay.
- Turn on reduced motion: end states should still appear, and the spinner should stop.
