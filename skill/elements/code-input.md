# Code input

Use for a numeric verification code. One real input handles typing, paste, and autofill; the visual boxes are hidden from assistive technology.

```jsx
<CodeInput label="Verification code" value={code} onChange={setCode} length={6} />
```

Exported from `controls.jsx`. Default length is 6. Input uses `inputMode="numeric"`, `autoComplete="one-time-code"`, and strips non-digits. `onChange` receives a string, preserving leading zeros.

```css
.code-boxes { position: relative; display: grid; grid-template-columns: repeat(var(--count), minmax(0,1fr)); gap: 8px; }
.code-box { height: 52px; display: grid; place-items: center; border-radius: 10px; font-size: 18px; font-weight: 500; box-shadow: inset 0 0 0 1px var(--line); transition: box-shadow 200ms ease; }
.code-box.is-filled { box-shadow: inset 0 0 0 1px var(--line-hover); }
.code-box.is-active { box-shadow: inset 0 0 0 1px var(--line-live); }
```

Copy the invisible overlaid input and focused-caret rules. The 1.5×18px caret may blink while editing; digits appear immediately, so omit `digit-enter`. Gap drops to 6px on narrow screens. Keep the real input associated with its visible label.

Source: [controls.jsx](../../src/controls.jsx), `CodeInput`; [styles.css](../../src/styles.css), `.code-*`.
