import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const controllerImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gamer_Controller.jpg/1280px-Gamer_Controller.jpg'

function App() {
  const app = useRef(null)
  const hero = useRef(null)
  const card = useRef(null)
  const circle = useRef(null)
  const slices = useRef([])

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

      gsap.to(slices.current, {
        scrollTrigger: {
          trigger: '.slice-section',
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
        },
        x: (index) => (index - 2) * 190,
        y: (index) => Math.abs(index - 2) * 45,
        rotation: (index) => (index - 2) * 5,
        scale: 0.92,
        ease: 'power2.inOut',
        stagger: 0.04,
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

      <section className="slice-section">
        <div className="slice-heading">
          <p>03 · Image Slicing</p>
          <h2>Break it apart.</h2>
          <span>Keep scrolling ↓</span>
        </div>

        <div className="slice-stage">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              ref={(element) => {
                slices.current[index] = element
              }}
              className="image-slice"
              style={{
                backgroundImage: `url(${controllerImage})`,
                backgroundPosition: `${index * 25}% center`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="end-section">
        <p>That&apos;s your first sliced-image animation.</p>
        <h2>Now we can make it crazy.</h2>
      </section>
    </main>
  )
}

export default App
