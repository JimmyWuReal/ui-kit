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
footer { display: flex; justify-content: space-between; gap: 20px; padding: 30px 2px; color: #666; font-size: 11px; }
.section-head { display: flex; flex-direction: column; gap: 10px; margin: 0 2px 22px; }
.section-head h2 { margin: 0; font-size: 24px; font-weight: 500; line-height: 1.3; letter-spacing: -.035em; }
.section-head p { margin: 0; font-size: 12px; line-height: 1.5; color: #888; }
@media (max-width: 680px) {
  .showcase-shell { width: calc(100% - 32px); }
  .site-header { flex-direction: column; align-items: flex-start; padding: 26px 0; gap: 24px; }
  .site-nav { width: 100%; }
  footer { flex-direction: column; gap: 8px; }
}
```

The column is `min(1120px, 100% - 64px)`, and side gutters become 16px at 680px and below, where the header stacks. The nav is the kit's [segmented control](segmented.md), with its thumb sliding between pages. Page content swaps instantly: `key={page}` on `<main>` remounts the page with no transition, which is also why charts draw again when you return to them. Keep the hash in the URL so a view can be linked and the browser's back button works.

`.brand-icon` is this site's own mark. Use the project's mark, or the name alone. The footer's tagline is the site's own too: omit a tagline unless it says something useful. There are no header or footer borders.

`.section-head` is the heading block on the Text page. The site numbers its sections because it is a catalog; omit the mono number on a normal page, and keep the note only when it adds something.

## Component

```jsx
/* The pages, by their names. The hash is the lowercase name. */
const pages = ['Elements', 'Background', 'Text']

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
        {/* The page chooser is the kit's own segmented control. Choosing sets
            the hash, and the hashchange listener above follows it. */}
        <nav className="site-nav" aria-label="Main navigation">
          <Segmented label="Page" options={pages} value={page} onChange={(name) => { window.location.hash = name.toLowerCase() }} />
        </nav>
      </header>
      <main key={page}>
        {page === 'Elements' ? <ElementsPage /> : page === 'Background' ? <BackgroundPage /> : <TextPage />}
      </main>
      <footer><span>A personal collection, made with care.</span><span>Jimmy Wu © {new Date().getFullYear()}</span></footer>
    </div>
  </SurfaceContext.Provider>
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

Source: [main.jsx](../../src/main.jsx), `App`, `SectionHead`; [styles.css](../../src/styles.css), `.showcase-shell`, `.site-*`, `.brand*`, `footer`, `.section-head`.
