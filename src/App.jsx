import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const wigImage = 'https://pngimg.com/d/wig_PNG6.png'

const fragments = [
  { clip: 'polygon(0 0, 25% 0, 23% 24%, 0 27%)', x: -300, y: -260, r: -16 },
  { clip: 'polygon(25% 0, 50% 0, 49% 24%, 23% 24%)', x: -95, y: -330, r: 11 },
  { clip: 'polygon(50% 0, 75% 0, 77% 24%, 49% 24%)', x: 110, y: -310, r: -9 },
  { clip: 'polygon(75% 0, 100% 0, 100% 27%, 77% 24%)', x: 320, y: -230, r: 18 },
  { clip: 'polygon(0 27%, 23% 24%, 25% 51%, 0 50%)', x: -390, y: -40, r: 12 },
  { clip: 'polygon(23% 24%, 49% 24%, 50% 51%, 25% 51%)', x: -125, y: -65, r: -7 },
  { clip: 'polygon(49% 24%, 77% 24%, 75% 51%, 50% 51%)', x: 125, y: -55, r: 8 },
  { clip: 'polygon(77% 24%, 100% 27%, 100% 50%, 75% 51%)', x: 390, y: -25, r: -13 },
  { clip: 'polygon(0 50%, 25% 51%, 24% 76%, 0 74%)', x: -360, y: 85, r: -15 },
  { clip: 'polygon(25% 51%, 50% 51%, 49% 76%, 24% 76%)', x: -110, y: 95, r: 9 },
  { clip: 'polygon(50% 51%, 75% 51%, 76% 76%, 49% 76%)', x: 115, y: 105, r: -10 },
  { clip: 'polygon(75% 51%, 100% 50%, 100% 74%, 76% 76%)', x: 360, y: 70, r: 15 },
  { clip: 'polygon(0 74%, 24% 76%, 25% 100%, 0 100%)', x: -290, y: 270, r: 17 },
  { clip: 'polygon(24% 76%, 49% 76%, 50% 100%, 25% 100%)', x: -90, y: 315, r: -12 },
  { clip: 'polygon(49% 76%, 76% 76%, 75% 100%, 50% 100%)', x: 105, y: 300, r: 13 },
  { clip: 'polygon(76% 76%, 100% 74%, 100% 100%, 75% 100%)', x: 300, y: 250, r: -19 },
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
          end: '+=240%',
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
          <p>03 · Wig Showcase</p>
          <h2>Made to move.</h2>
          <span>Keep scrolling ↓</span>
        </div>

        <div className="slice-stage">
          {fragments.map((fragment, index) => (
            <div
              key={index}
              ref={(element) => {
                fragmentsRef.current[index] = element
              }}
              className="image-slice"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${wigImage})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                clipPath: fragment.clip,
                borderRadius: 0,
                willChange: 'transform',
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>
      </section>

      <section className="end-section">
        <p>Your first wig animation.</p>
        <h2>Now imagine this with your own brand.</h2>
      </section>
    </main>
  )
}

export default App
