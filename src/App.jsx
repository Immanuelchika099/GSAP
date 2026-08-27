import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const laptopImage =
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=85'

function App() {
  const app = useRef(null)
  const hero = useRef(null)
  const card = useRef(null)
  const circle = useRef(null)
  const laptopSection = useRef(null)
  const laptopScene = useRef(null)
  const laptop = useRef(null)
  const laptopGlow = useRef(null)
  const laptopCopy = useRef(null)
  const laptopEyebrow = useRef(null)
  const laptopTitle = useRef(null)
  const laptopText = useRef(null)
  const laptopBadge = useRef(null)

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

      gsap.set(laptop, {
        transformPerspective: 1400,
        transformOrigin: 'center center',
        scale: 0.62,
        x: 260,
        y: 110,
        rotateY: -24,
        rotateX: 12,
        rotateZ: 3,
        opacity: 0,
      })

      gsap.set(laptopGlow, {
        scale: 0.45,
        opacity: 0,
      })

      gsap.set([laptopEyebrow, laptopTitle, laptopText, laptopBadge], {
        opacity: 0,
        y: 35,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: laptopSection.current,
          start: 'top top',
          end: '+=320%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(laptop, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 0.82,
        rotateY: -10,
        rotateX: 5,
        rotateZ: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(laptopGlow, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '<')
        .to([laptopEyebrow, laptopTitle, laptopText, laptopBadge], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        })
        .to(laptop, {
          scale: 1.08,
          x: 20,
          y: -10,
          rotateY: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(laptopGlow, {
          scale: 1.25,
          opacity: 0.7,
          duration: 1,
          ease: 'none',
        }, '<')
        .to(laptopCopy, {
          x: -35,
          opacity: 0.55,
          duration: 0.7,
          ease: 'power2.inOut',
        })
        .to(laptop, {
          scale: 1.34,
          x: 0,
          y: -35,
          rotateZ: -1,
          duration: 1,
          ease: 'power3.inOut',
        })
        .to(laptopGlow, {
          scale: 1.5,
          opacity: 0.45,
          duration: 1,
        }, '<')
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

      <section ref={laptopSection} className="laptop-section">
        <div ref={laptopCopy} className="laptop-copy">
          <p ref={laptopEyebrow}>04 · PhoneVertex</p>
          <h2 ref={laptopTitle}>Something bigger is loading.</h2>
          <p ref={laptopText}>
            The same laptop concept from your PhoneVertex Coming Soon section,
            rebuilt as a scroll-driven GSAP experience.
          </p>
          <span ref={laptopBadge}>Keep scrolling ↓</span>
        </div>

        <div ref={laptopScene} className="laptop-scene-gsap">
          <div ref={laptopGlow} className="laptop-glow-gsap" />
          <div ref={laptop} className="laptop-gsap">
            <img src={laptopImage} alt="Laptop showing a modern workspace" />
            <div className="laptop-shine-gsap" />
          </div>
        </div>
      </section>

      <section className="end-section">
        <p>Scroll-driven product presentation.</p>
        <h2>Now imagine this inside the real PhoneVertex site.</h2>
      </section>
    </main>
  )
}

export default App
