import React from 'react'
import { createRoot } from 'react-dom/client'
import { Sparkles } from 'lucide-react'
import './styles.css'

function DepthButton() {
  function animateClick(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const button = event.currentTarget
    button.getAnimations().forEach((animation) => animation.cancel())
    button.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(.965)', offset: .42 },
        { transform: 'scale(1)' },
      ],
      { duration: 240, easing: 'cubic-bezier(.22, 1, .36, 1)' },
    )
  }

  return (
    <button
      className="depth-button"
      type="button"
      onClick={animateClick}
    >
      <span className="button-content">
        <span className="button-icon">
          <Sparkles size={17} strokeWidth={2.15} />
        </span>
        <span>Create with AI</span>
      </span>
    </button>
  )
}

function App() {
  return (
    <main className="element-canvas">
      <DepthButton />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
