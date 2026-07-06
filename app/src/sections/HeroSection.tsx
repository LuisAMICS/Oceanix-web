import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Waves } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const T = {
  es: {
    badge: 'Premium Water Experiences',
    subtitle1: 'Vuela sobre el agua con nuestras experiencias eFoil de élite.',
    subtitle2: 'La revolución del deporte acuático, en los destinos más exclusivos.',
    location: 'Resorts & destinos de lujo',
    discover: 'Descubrir',
  },
  en: {
    badge: 'Premium Water Experiences',
    subtitle1: 'Fly over the water with our elite eFoil experiences.',
    subtitle2: 'The water sports revolution, in the most exclusive destinations.',
    location: 'Luxury resorts & destinations',
    discover: 'Discover',
  },
}

export default function HeroSection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Water ripple effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.008
      const w = canvas.width
      const h = canvas.height

      // Deep navy ocean gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, h)
      gradient.addColorStop(0, '#0F1E3C')
      gradient.addColorStop(0.4, '#16294A')
      gradient.addColorStop(0.75, '#1C3156')
      gradient.addColorStop(1, '#0F1E3C')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Animated golden caustic-like waves
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(201, 162, 39, ${0.03 + i * 0.008})`
        ctx.lineWidth = 1.5

        for (let x = 0; x < w; x += 3) {
          const y = h * 0.4 +
            Math.sin(x * 0.003 + time + i * 0.5) * 80 +
            Math.sin(x * 0.007 + time * 1.2 + i) * 40 +
            Math.cos(x * 0.001 + time * 0.5) * 60 +
            i * 30

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      // Golden light rays from surface
      for (let i = 0; i < 5; i++) {
        const x = w * (0.2 + i * 0.15) + Math.sin(time + i) * 50
        const gradient = ctx.createLinearGradient(x, 0, x + Math.sin(time * 0.5 + i) * 100, h)
        gradient.addColorStop(0, `rgba(201, 162, 39, ${0.06 + Math.sin(time + i) * 0.03})`)
        gradient.addColorStop(0.5, 'rgba(201, 162, 39, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(x - 30, 0)
        ctx.lineTo(x + 30, 0)
        ctx.lineTo(x + 120 + Math.sin(time + i) * 50, h)
        ctx.lineTo(x - 80 + Math.sin(time + i) * 50, h)
        ctx.closePath()
        ctx.fill()
      }

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(i * 1.5 + time * 0.3) * 0.5 + 0.5) * w
        const y = ((time * 20 + i * 50) % (h + 100)) - 50
        const size = 1 + Math.sin(i + time) * 1.5
        const opacity = 0.1 + Math.sin(i * 0.7 + time) * 0.1

        ctx.beginPath()
        ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 192, 106, ${Math.max(0, opacity)})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })

      tl.fromTo(logoRef.current,
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(titleRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(scrollIndicatorRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      // Suave parallax del bloque completo (sin desvanecer el título)
      gsap.to(contentRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Hero Image Overlay */}
      <div className="absolute inset-0">
        <img
          src="./images/hero-rider.webp"
          alt="Oceanix eFoil Experience"
          className="w-full h-full object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-navy-deep/70 via-ocean-navy/30 to-ocean-navy-deep" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Logo mark */}
        <img
          ref={logoRef}
          src="./images/logo-mark-white.png"
          alt="Oceanix"
          className="h-20 md:h-24 w-auto mb-6 drop-shadow-[0_4px_20px_rgba(15,30,60,0.5)]"
        />

        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-8 px-6 py-2.5 rounded-full glass-panel"
        >
          <span className="text-xs tracking-[0.3em] text-ocean-gold-light uppercase flex items-center gap-2">
            <Waves className="w-4 h-4" />
            {t.badge}
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.9] tracking-[0.04em] text-white mb-6"
        >
          <span className="block">OCEANIX</span>
          <span className="block text-gradient-gold text-[clamp(1.5rem,5.5vw,4.5rem)] font-normal italic mt-2">
            Experience
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed mb-4"
        >
          {t.subtitle1}
          <br className="hidden md:block" />
          {t.subtitle2}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-ocean-gold-light text-sm tracking-wide">
          <span className="w-2 h-2 rounded-full bg-ocean-gold animate-pulse" />
          {t.location}
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] text-white/60 uppercase">{t.discover}</span>
          <ChevronDown className="w-6 h-6 text-ocean-gold-light scroll-indicator" />
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-ocean-gold/10 blur-3xl floating" />
      <div className="absolute bottom-1/3 right-[15%] w-40 h-40 rounded-full bg-ocean-gold/10 blur-3xl floating-delayed" />
      <div className="absolute top-1/2 right-[25%] w-24 h-24 rounded-full bg-ocean-gold-light/10 blur-2xl floating-slow" />
    </section>
  )
}
