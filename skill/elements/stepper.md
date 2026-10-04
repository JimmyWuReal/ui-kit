# Stepper

Use for a small bounded integer quantity.

```jsx
<Stepper label="Seats" note="Billed per member" value={seats}
  onChange={setSeats} min={1} max={20} />
```

Exported from `controls.jsx`. Defaults: min 1, max 20; +/- changes by one and clamps the value. Buttons disable at bounds. Keep the input value in range.

```css
.stepper { display: flex; align-items: center; padding: 3px; border-radius: 10px; box-shadow: inset 0 0 0 1px var(--line); }
.stepper button { width: 30px; height: 30px; border: 0; border-radius: 7px; background: transparent; color: #bdbdbd; }
.stepper-value { width: 34px; height: 30px; display: grid; place-items: center; font-size: 13px; font-weight: 500; font-variant-numeric: tabular-nums; }
```

Hover brightens enabled icons; pressing scales them to .88 over 140ms. Display updated numbers immediately: omit the source's `direction` / `roll-*` logic, or use the global compatibility override. Preserve the output's polite live announcement.

Source: [controls.jsx](../../src/controls.jsx), `Stepper`; [styles.css](../../src/styles.css), `.stepper*`.
