# Code input

Use for a numeric verification code. One real input handles typing, paste, and autofill; the visual boxes are hidden from assistive technology.

```jsx
<CodeInput label="Verification code" value={code} onChange={setCode} length={6} />
```

Exported from `controls.jsx`. Default length is 6. Input uses `inputMode="numeric"`, `autoComplete="one-time-code"`, and strips non-digits. `onChange` receives a string, preserving leading zeros.

```css
.code-field { display: flex; flex-direction: column; gap: 12px; }
.code-boxes { position: relative; display: grid; grid-template-columns: repeat(var(--count), minmax(0, 1fr)); gap: 8px; }
.code-boxes input {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  opacity: 0;
  font-size: 16px;
  cursor: text;
}
.code-box {
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  box-shadow: inset 0 0 0 1px var(--line);
  transition: box-shadow 200ms ease;
}
.code-box.is-filled { box-shadow: inset 0 0 0 1px var(--line-hover); }
.code-box.is-active { box-shadow: inset 0 0 0 1px var(--line-live); }
.code-box.is-active:not(.is-filled)::after { content: ''; width: 1.5px; height: 18px; background: #fff; animation: caret-blink 1s steps(1) infinite; }
.code-digit { animation: digit-enter 200ms cubic-bezier(.22, 1, .36, 1); }
.text-field :is(input, textarea):focus-visible,
.search-field input:focus-visible,
.code-boxes input:focus-visible { outline: 0; }
@keyframes digit-enter { from { opacity: 0; transform: translateY(4px) scale(.9); } }
@keyframes caret-blink { 50% { opacity: 0; } }
@media (max-width: 680px) {
  .code-boxes { gap: 6px; }
}
```

The box edge steps from `--line` to `--line-hover` when filled and `--line-live` when active, over 200ms. A 1.5×18px caret blinks on a hard 1s step while the active box is empty. Each typed digit rises 4px from `scale(.9)` over 200ms (`digit-enter`): its `<span>` mounts only when that box fills, so the keyframe plays once per digit. If you prefill a value on load, leave `.code-digit` off those digits so nothing animates at first paint.

Gap drops to 6px on narrow screens. Keep the real input associated with its visible label.

## Component

```jsx
/* One real input laid over the boxes takes the typing, paste and autofill;
   the boxes only draw what is in it. */
export function CodeInput({ label, value, onChange, length = 6 }) {
  const [focused, setFocused] = useState(false)
  const caret = Math.min(value.length, length - 1)
  return (
    <label className="code-field">
      <span className="field-head">
        <span className="mono-label">{label}</span>
        <span className="mono-value">{value.length === length ? 'Complete' : `${value.length} / ${length}`}</span>
      </span>
      <span className="code-boxes" style={{ '--count': length }}>
        <input inputMode="numeric" autoComplete="one-time-code" maxLength={length} value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, length))}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        {Array.from({ length }, (_, index) => (
          <span key={index} aria-hidden="true"
            className={`code-box ${value[index] ? 'is-filled' : ''} ${focused && index === caret ? 'is-active' : ''}`}>
            {value[index] && <span className="code-digit">{value[index]}</span>}
          </span>
        ))}
      </span>
    </label>
  )
}
```

Source: [controls.jsx](../../src/controls.jsx), `CodeInput`; [styles.css](../../src/styles.css), `.code-*`.
