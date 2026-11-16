# Expanded view

Lifts one element out of its cell into a full-screen view, on a surface the reader can change. Use it for a component gallery or a preview tool. For a confirmation, use the [popup](popup.md) instead.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.expand-button {
  position: absolute;
  z-index: 4;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 9px;
  color: #9a9a9a;
  background: rgba(20, 20, 20, .72);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .09);
  backdrop-filter: blur(8px);
  cursor: pointer;
  opacity: 0;
  transform: scale(.92);
  transition: opacity 160ms ease-out, transform 160ms cubic-bezier(.22, 1, .36, 1), color 160ms ease-out, background 160ms ease-out;
}
.grid-cell:hover .expand-button,
.sample-card:hover .expand-button,
.expand-button:focus-visible { opacity: 1; transform: scale(1); }
.expand-button:hover { color: #fff; background: rgba(38, 38, 38, .88); }
.expand-button:active { transform: scale(.94); }
.expand-overlay {
  position: fixed;
  z-index: 100;
  inset: 0;
  animation: overlay-enter 220ms ease-out both;
}
.expand-surface { position: absolute; inset: 0; }
.expand-body {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: auto;
  display: grid;
  place-items: center;
  padding: 88px 24px 118px;
}
.expand-content {
  width: min(var(--col), 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  animation: expand-enter 300ms cubic-bezier(.22, 1, .36, 1) both;
}
.expand-content.is-wide { width: min(760px, 100%); gap: 0; }
.expand-bar {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  pointer-events: none;
}
.expand-bar > * { pointer-events: auto; }
.expand-title {
  height: 30px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  color: #cfcfcf;
  background: rgba(12, 12, 12, .62);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
  backdrop-filter: blur(14px);
}
.expand-close {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #cfcfcf;
  background: rgba(12, 12, 12, .62);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
  backdrop-filter: blur(14px);
  cursor: pointer;
  transition: color 150ms ease-out, background 150ms ease-out, transform 150ms cubic-bezier(.22, 1, .36, 1);
}
.expand-close:hover { color: #fff; background: rgba(32, 32, 32, .8); transform: scale(1.06); }
.expand-close:active { transform: scale(.94); }
.surface-picker {
  position: absolute;
  z-index: 2;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
  max-width: min(420px, calc(100% - 32px));
  padding: 10px;
  border-radius: 999px;
  background: rgba(12, 12, 12, .66);
  backdrop-filter: blur(18px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .12),
    inset 0 0 0 1px rgba(255, 255, 255, .06),
    0 14px 34px rgba(0, 0, 0, .55);
  animation: picker-enter 320ms 60ms cubic-bezier(.22, 1, .36, 1) both;
}
.swatch {
  position: relative;
  isolation: isolate;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .16);
  transition: transform 180ms cubic-bezier(.22, 1, .36, 1), box-shadow 180ms ease-out;
}
.swatch:hover { transform: scale(1.1); }
.swatch.is-active {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2), 0 0 0 2px #0c0c0c, 0 0 0 4px #fff;
}
.swatch.bg-dots { background-size: 6px 6px, auto; }
.swatch.bg-grid { background-size: 7px 7px, 7px 7px, auto; }
.swatch.bg-checker { background-size: 10px 10px; }
@keyframes overlay-enter { from { opacity: 0; } to { opacity: 1; } }
@keyframes expand-enter { from { opacity: 0; transform: translateY(10px) scale(.985); } to { opacity: 1; transform: none; } }
@keyframes picker-enter { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
@media (hover: none) {
  .expand-button { opacity: 1; transform: none; }
}
@media (max-width: 680px) {
  .expand-body { padding: 76px 18px 132px; }
  .surface-picker { bottom: 16px; gap: 8px; padding: 9px; }
  .swatch { width: 26px; height: 26px; }
}
```

The expand button stays mounted in the cell and appears on cell hover or keyboard focus, fading over 160ms from `scale(.92)`. It is always visible on touch screens, through `@media (hover: none)`.

The view mounts on open, so it uses keyframes: the overlay fades in over 220ms, the content rises 10px from `scale(.985)` over 300ms, and the picker rises 12px over 320ms after a 60ms delay. Closing unmounts it immediately. Swatches grow to 1.1 on hover over 180ms, and a white ring marks the selected one.

Opening locks body scrolling, moves focus to the close button, and restores both on close. Escape closes the view, and so does a press on the backdrop. `onClose` is held in a ref on purpose: depending on it directly would rerun the effect on every render and pull focus back to the close button on each keystroke. A nested control that also uses Escape stops propagation, so only the innermost thing closes: the [select](select.md) menu, the [search](search.md) query, or the [popup](popup.md), and then this view.

The surfaces are the [backgrounds](../SKILL.md#backgrounds); `.swatch.bg-*` scale their patterns down to fit a swatch.

## Component

```jsx
/* Every surface an element can be tested against, as [key, name, use].
   All flat black and gray — the places an element actually lands.
   The first is the default. */
const SURFACES = [
  ['default', 'Black', 'The page the kit is drawn on.'],
  ['card', 'Card', 'The gray every cell sits on.'],
  ['raised', 'Raised', 'Menus, popovers and dialogs.'],
  ['dots', 'Dot matrix', 'A little structure, a lot of space.'],
  ['grid', 'Grid', 'A canvas for checking alignment.'],
  ['checker', 'Checker', 'Shows what a translucent layer lets through.'],
]

const SurfaceContext = createContext(['default', () => {}])

const useSurface = () => useContext(SurfaceContext)

function ExpandButton({ label, onClick }) {
  return (
    <button className="expand-button" type="button" title="Expand" aria-label={`Expand ${label}`} onClick={onClick}>
      <Maximize2 size={13} strokeWidth={2.2} />
    </button>
  )
}

function SurfacePicker() {
  const [surface, setSurface] = useSurface()
  return (
    <div className="surface-picker" role="radiogroup" aria-label="Preview background">
      {SURFACES.map(([key, label]) => (
        <button className={`swatch bg-${key} ${surface === key ? 'is-active' : ''}`} key={key} type="button"
          role="radio" aria-checked={surface === key} title={label} onClick={() => setSurface(key)}>
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  )
}

/* One element, full bleed, over whichever surface is selected. */
function ExpandedView({ title, wide = false, onClose, children }) {
  const [surface] = useSurface()
  const closeRef = useRef(null)

  /* onClose is a fresh closure on every render, and the elements shown here
     re-render the page as they are used — so it is held in a ref. Depending
     on it directly would tear this effect down and move focus back to the
     close button on every keystroke inside the expanded element. */
  const closeHandler = useRef(onClose)
  closeHandler.current = onClose

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    const onKey = (event) => { if (event.key === 'Escape') closeHandler.current() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [])

  const dismiss = (event) => { if (event.target.dataset.backdrop) onClose() }

  return (
    <div className="expand-overlay" role="dialog" aria-modal="true" aria-label={`${title}, expanded`}>
      <div className={`expand-surface bg-${surface}`} data-backdrop="true" onMouseDown={dismiss} />
      <div className="expand-body" data-backdrop="true" onMouseDown={dismiss}>
        <div className={`expand-content ${wide ? 'is-wide' : ''}`}>{children}</div>
      </div>
      <div className="expand-bar">
        <span className="expand-title mono-label">{title}</span>
        <button className="expand-close" type="button" aria-label="Close expanded view" ref={closeRef} onClick={onClose}>
          <X size={16} strokeWidth={2.1} />
        </button>
      </div>
      <SurfacePicker />
    </div>
  )
}
```

Source: [main.jsx](../../src/main.jsx), `ExpandedView`, `ExpandButton`, `SurfacePicker`, `SURFACES`; [styles.css](../../src/styles.css), `.expand-*`, `.surface-picker`, `.swatch`, `.sr-only`.
