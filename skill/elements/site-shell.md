# Site shell

The site's page frame: a centered column, a header with the brand and navigation, and a quiet footer. Use the parts a site or small app needs. A single page may need no header or footer at all.

```css
.showcase-shell {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
}
.site-header { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 34px 0 42px; }
.brand { display: inline-flex; align-items: center; gap: 12px; color: #efefef; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: -.035em; }
.brand-icon { display: grid; grid-template-columns: repeat(2, 7px); gap: 3px; transform: rotate(-8deg); }
.brand-icon i { width: 7px; height: 7px; background: #eee; border-radius: 2px; }
.brand-icon i:last-child { opacity: .4; }
footer { display: flex; justify-content: space-between; gap: 20px; padding: 30px 2px; color: var(--dim); font-size: 11px; }
.section-head { display: flex; flex-direction: column; gap: 10px; margin: 0 2px 22px; }
.section-head h2 { margin: 0; font-size: 24px; font-weight: 500; line-height: 1.3; letter-spacing: -.035em; }
.section-head p { margin: 0; font-size: 12px; line-height: 1.5; color: #888; }
@media (max-width: 680px) {
  .showcase-shell { width: calc(100% - 32px); }
  .site-header { flex-direction: column; align-items: flex-start; padding: 26px 0; gap: 24px; }
  .site-nav { width: 100%; }
  footer { flex-direction: column; gap: 8px; }
}
@media (max-width: 440px) { .site-nav .segmented a { padding: 0 6px; } }
```

The column is `min(1120px, 100% - 64px)`, and side gutters become 16px at 680px and below, where the header stacks. The nav is `SegmentedNav`: the [segmented control](segmented.md)'s look and sliding thumb, built from real links, so each page is a Tab stop, carries `aria-current="page"`, and can open in a new tab. Radios are for choosing a mode, not for going somewhere, so do not use `Segmented` here. When the current page is not in the nav, such as a profile, pass a `value` that matches no link: the thumb disappears rather than marking the wrong page. Page content swaps instantly: `key={page}` on `<main>` remounts the page with no transition, which is also why charts draw again when you return to them. Keep the hash in the URL so a view can be linked and the browser's back button works.

`.brand-icon` is this site's own mark. Use the project's mark, or the name alone. The footer's tagline is the site's own too: omit a tagline unless it says something useful. There are no header or footer borders.

`.section-head` is the heading block on the Text page. The site numbers its sections because it is a catalog; omit the mono number on a normal page, and keep the note only when it adds something.

## Component

```jsx
/* The pages, by their names. The hash is the lowercase name. */
const pages = ['Elements', 'Patterns', 'Background', 'Text']

const currentPage = () => pages.find((name) => name.toLowerCase() === window.location.hash.slice(1)) ?? pages[0]

function App() {
  const [page, setPage] = useState(currentPage)
  const surface = useState('default')
  useEffect(() => {
    const navigate = () => setPage(currentPage())
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => { document.title = `${page} · Jimmy Wu's UI Kit` }, [page])
  return <SurfaceContext.Provider value={surface}>
    <div className="showcase-shell">
      <header className="site-header">
        <a className="brand" href="#elements"><span className="brand-icon" aria-hidden="true"><i /><i /><i /><i /></span>Jimmy Wu's UI Kit</a>
        {/* Real links, drawn as the segmented control. Following one changes
            the hash, and the hashchange listener above follows that. */}
        <SegmentedNav label="Main navigation" value={page}
          links={pages.map((name) => [name, `#${name.toLowerCase()}`])} />
      </header>
      <main key={page}>
        {page === 'Elements' ? <ElementsPage /> : page === 'Patterns' ? <PatternsPage /> : page === 'Background' ? <BackgroundPage /> : <TextPage />}
      </main>
      <footer><span>A personal collection, made with care.</span><span>Jimmy Wu © {new Date().getFullYear()}</span></footer>
    </div>
  </SurfaceContext.Provider>
}

/* The segmented control's look for real navigation: links with aria-current
   rather than radios, so each page is a Tab stop that can be opened in a new
   tab. `links` are [name, href] pairs. A `value` matching none of them, such as
   a profile page outside the nav, shows no thumb. */
export function SegmentedNav({ label, links, value }) {
  const index = links.findIndex(([name]) => name === value)
  const ref = useRef(null)
  const thumb = useThumb(ref, index, links.length)

  return (
    <nav className="site-nav" aria-label={label}>
      <div className="segmented" ref={ref} style={{ '--count': links.length }}>
        {thumb && <span className="segmented-thumb" style={thumb} aria-hidden="true" />}
        {links.map(([name, href]) => (
          <a key={name} href={href} className={name === value ? 'is-active' : ''}
            aria-current={name === value ? 'page' : undefined}>
            {name}
          </a>
        ))}
      </div>
    </nav>
  )
}

function SectionHead({ id, index, title, note }) {
  return (
    <header className="section-head">
      <span className="mono-label">{index}</span>
      <h2 id={id}>{title}</h2>
      <p>{note}</p>
    </header>
  )
}
```

Source: [main.jsx](../../src/main.jsx), `App`, `SectionHead`; [controls.jsx](../../src/controls.jsx), `SegmentedNav`; [styles.css](../../src/styles.css), `.showcase-shell`, `.site-*`, `.brand*`, `footer`, `.section-head`.
