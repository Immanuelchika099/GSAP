import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const app = useRef(null)
  const hero = useRef(null)
  const card = useRef(null)
  const circle = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(hero.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.from(card.current, {
        scrollTrigger: {
          trigger: card.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 120,
        scale: 0.85,
      })

      gsap.to(circle.current, {
        scrollTrigger: {
          trigger: circle.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        x: 300,
        rotation: 360,
        ease: 'none',
      })
    }, app)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={app}>
      <section className="hero-section">
        <div ref={hero} className="hero-content">
          <p className="eyebrow">GSAP + React</p>
          <h1>Scroll into motion.</h1>
          <p>Scroll down and watch the elements respond to your movement.</p>
          <span className="scroll-hint">Scroll ↓</span>
        </div>
      </section>

      <section className="animation-section">
        <div ref={card} className="animation-card">
          <span>01</span>
          <h2>ScrollTrigger</h2>
          <p>
            This card enters the viewport with a smooth reveal controlled by
            your scroll position.
          </p>
        </div>
      </section>

      <section className="motion-section">
        <div ref={circle} className="motion-circle" />
        <div className="motion-content">
          <span>02</span>
          <h2>Motion follows you.</h2>
          <p>
            The circle moves and rotates as you scroll through this section.
          </p>
        </div>
      </section>

      <section className="end-section">
        <p>That&apos;s your first scroll animation.</p>
        <h2>Now we can make it crazy.</h2>
      </section>
    </main>
  )
}

export default App
