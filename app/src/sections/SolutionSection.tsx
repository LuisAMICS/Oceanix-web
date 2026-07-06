import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Timer, Wind, Shield, Award, Globe } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const specIcons = [Zap, Timer, Wind, Shield, Award, Globe]

const T = {
  es: {
    badge: 'La Solución',
    imgBadge: 'Tecnología Europea',
    floatLabel: 'Tecnología',
    floatValue: '100% Eléctrica',
    title: 'eFoil',
    subtitle: 'La sensación de volar sobre el agua',
    body: 'Equipos de un fabricante europeo líder, con presencia en más de 30 países. Tecnología probada en el Mediterráneo y el Caribe, disponible en exclusiva a través de Oceanix Experience.',
    chip: 'Sea pionero en su destino',
    specs: [
      { label: 'Motor', value: '8kW Brushless' },
      { label: 'Autonomía', value: '90-120 min' },
      { label: 'Velocidad', value: 'Hasta 45 km/h' },
      { label: 'Seguridad', value: 'Apagado Auto' },
      { label: 'Construcción', value: 'Fibra Carbono' },
      { label: 'Emisiones', value: 'Cero CO₂' },
    ],
  },
  en: {
    badge: 'The Solution',
    imgBadge: 'European Technology',
    floatLabel: 'Technology',
    floatValue: '100% Electric',
    title: 'eFoil',
    subtitle: 'The feeling of flying over water',
    body: 'Equipment from a leading European manufacturer, present in more than 30 countries. Technology proven in the Mediterranean and the Caribbean, available exclusively through Oceanix Experience.',
    chip: 'Be the pioneer in your destination',
    specs: [
      { label: 'Motor', value: '8kW Brushless' },
      { label: 'Battery life', value: '90-120 min' },
      { label: 'Speed', value: 'Up to 45 km/h' },
      { label: 'Safety', value: 'Auto shut-off' },
      { label: 'Build', value: 'Carbon fiber' },
      { label: 'Emissions', value: 'Zero CO₂' },
    ],
  },
}

export default function SolutionSection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      gsap.fromTo(contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      const specCards = specsRef.current?.querySelectorAll('.spec-card')
      if (specCards) {
        gsap.fromTo(specCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: specsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      const imgEl = imageRef.current?.querySelector('img')
      if (imgEl) {
        gsap.to(imgEl, {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="efoil"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-ivory via-ocean-mist to-ocean-ivory" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ocean-gold/8 blur-[150px]" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-navy/5 border border-ocean-navy/10 text-xs tracking-[0.3em] text-ocean-gold-dark uppercase">
            {t.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card p-2">
              <img
                src="./images/efoil-trio.jpg"
                alt="eFoil - Oceanix Experience"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
              <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-full">
                <span className="text-xs tracking-wider text-ocean-gold-light font-semibold">{t.imgBadge}</span>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-ocean-gold/15 to-ocean-navy/10 rounded-3xl blur-2xl -z-10" />
            </div>

            <div className="absolute -bottom-8 -right-8 glass-card rounded-2xl p-4 floating">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-gold/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-ocean-gold-dark" />
                </div>
                <div>
                  <p className="text-xs text-ocean-slate">{t.floatLabel}</p>
                  <p className="text-sm font-semibold text-ocean-navy">{t.floatValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={contentRef}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ocean-navy mb-2">
              {t.title}
            </h2>
            <h3 className="font-display text-2xl md:text-3xl text-ocean-gold-dark italic mb-6">
              {t.subtitle}
            </h3>

            <p className="text-ocean-slate leading-relaxed mb-8">
              {t.body}
            </p>

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ocean-navy text-white text-sm font-semibold tracking-wide shadow-[0_8px_20px_rgba(15,30,60,0.25)]">
                <Award className="w-4 h-4 text-ocean-gold-light" />
                {t.chip}
              </span>
            </div>

            <div ref={specsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {t.specs.map((spec, i) => {
                const Icon = specIcons[i]
                return (
                  <div
                    key={i}
                    className="spec-card glass-card rounded-xl p-4 hover:shadow-glow-gold transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-ocean-gold-dark mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-ocean-navy">{spec.value}</p>
                    <p className="text-xs text-ocean-slate-light">{spec.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
