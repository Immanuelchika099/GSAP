import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const controllerImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gamer_Controller.jpg/1280px-Gamer_Controller.jpg'

const fragments = [
  { clip: 'polygon(0 0, 25% 0, 24% 25%, 0 28%)', x: -360, y: -250, r: -18 },
  { clip: 'polygon(25% 0, 50% 0, 48% 25%, 24% 25%)', x: -130, y: -330, r: 14 },
  { clip: 'polygon(50% 0, 75% 0, 76% 25%, 48% 25%)', x: 120, y: -310, r: -12 },
  { clip: 'polygon(75% 0, 100% 0, 100% 28%, 76% 25%)', x: 370, y: -230, r: 20 },
  { clip: 'polygon(0 28%, 24% 25%, 25% 50%, 0 52%)', x: -430, y: -40, r: 11 },
  { clip: 'polygon(24% 25%, 48% 25%, 50% 50%, 25% 50%)', x: -150, y: -80, r: -8 },
  { clip: 'polygon(48% 25%, 76% 25%, 75% 50%, 50% 50%)', x: 160, y: -70, r: 9 },
  { clip: 'polygon(76% 25%, 100% 28%, 100% 52%, 75% 50%)', x: 430, y: -20, r: -14 },
  { clip: 'polygon(0 52%, 25% 50%, 24% 76%, 0 74%)', x: -390, y: 80, r: -16 },
  { clip: 'polygon(25% 50%, 50% 50%, 48% 76%, 24% 76%)', x: -120, y: 90, r: 10 },
  { clip: 'polygon(50% 50%, 75% 50%, 76% 76%, 48% 76%)', x: 120, y: 100, r: -11 },
  { clip: 'polygon(75% 50%, 100% 52%, 100% 74%, 76% 76%)', x: 400, y: 70, r: 16 },
  { clip: 'polygon(0 74%, 24% 76%, 25% 100%, 0 100%)', x: -340, y: 290, r: 17 },
  { clip: 'polygon(24% 76%, 48% 76%, 50% 100%, 25% 100%)', x: -100, y: 320, r: -13 },
  { clip: 'polygon(48% 76%, 76% 76%, 75% 100%, 50% 100%)', x: 130, y: 310, r: 12 },
  { clip: 'polygon(76% 76%, 100% 74%, 100% 100%, 75% 100%)', x: 360, y: 270, r: -18 },
]

function App() {
  const app = useRef(null)
  const hero = useRef(null)
  const card = useRef(null)
  const circle = useRef(null)
  const fragmentsRef = useRef([])

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.slice-section',
          start: 'top top',
          end: '+=220%',
          scrub: 1,
          pin: true,
        },
      })

      tl.to(fragmentsRef.current, {
        x: (index) => fragments[index].x,
        y: (index) => fragments[index].y,
        rotation: (index) => fragments[index].r,
        scale: 0.72,
        duration: 1,
        ease: 'power2.inOut',
        stagger: {
          each: 0.025,
          from: 'center',
        },
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
          <p>03 · Image Reconstruction</p>
          <h2>Scatter it.</h2>
          <span>Keep scrolling ↓</span>
        </div>

        <div className="fragment-stage">
          {fragments.map((fragment, index) => (
            <div
              key={index}
              ref={(element) => {
                fragmentsRef.current[index] = element
              }}
              className="image-fragment"
              style={{
                backgroundImage: `url(${controllerImage})`,
                clipPath: fragment.clip,
              }}
            />
          ))}
        </div>
      </section>

      <section className="end-section">
        <p>The controller has been scattered.</p>
        <h2>Now we can reverse it.</h2>
      </section>
    </main>
  )
}

export default App
