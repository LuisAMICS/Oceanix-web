import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingDown, Anchor, Clock, Leaf } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const icons = [TrendingDown, Anchor, Clock, Leaf]
const delays = [0, 0.15, 0.3, 0.45]

const T = {
  es: {
    badge: 'El Problema',
    title: 'Los huéspedes quieren más',
    titleAccent: '— los resorts siguen igual',
    subtitle: 'Los competidores innovan cada día. El momento de actuar es ahora.',
    footnote: 'Alto potencial de generación de contenido orgánico y visibilidad en redes sociales',
    stats: [
      { value: '73%', label: 'de los millennials prefiere gastar en experiencias únicas' },
      { value: '20', suffix: ' años', label: 'Los resorts ofrecen los mismos deportes acuáticos desde hace dos décadas' },
      { value: '18-22', suffix: '%', label: 'de incremento en RevPAR para resorts con experiencias diferenciadas' },
      { value: '68%', label: 'de los viajeros de lujo paga más por opciones ecológicas' },
    ],
  },
  en: {
    badge: 'The Problem',
    title: 'Guests want more',
    titleAccent: '— resorts stay the same',
    subtitle: 'Competitors innovate every day. The time to act is now.',
    footnote: 'High potential for organic content generation and social media visibility',
    stats: [
      { value: '73%', label: 'of millennials prefer to spend on unique experiences' },
      { value: '20', suffix: ' years', label: 'Resorts have offered the same water sports for two decades' },
      { value: '18-22', suffix: '%', label: 'RevPAR increase for resorts offering differentiated experiences' },
      { value: '68%', label: 'of luxury travelers pay more for eco-friendly options' },
    ],
  },
}

export default function ProblemSection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 40, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            delay: delays[i],
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-ivory via-white to-ocean-ivory" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ocean-gold/30 to-transparent" />

      <div className="absolute top-20 left-[5%] w-64 h-64 rounded-full bg-ocean-gold/10 blur-[100px] floating" />
      <div className="absolute bottom-20 right-[10%] w-48 h-48 rounded-full bg-ocean-navy/10 blur-[80px] floating-delayed" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-navy/5 border border-ocean-navy/10 text-xs tracking-[0.3em] text-ocean-gold-dark uppercase mb-6">
            {t.badge}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-navy mb-6">
            {t.title}
            <span className="block text-ocean-gold-dark">{t.titleAccent}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-ocean-slate">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {t.stats.map((stat, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                className="relative group"
                style={{ perspective: '1000px' }}
              >
                <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 group-hover:shadow-glow-gold group-hover:border-ocean-gold/40">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ocean-gold/15 to-ocean-navy/10 flex items-center justify-center mb-6 group-hover:from-ocean-gold/25 group-hover:to-ocean-gold/15 transition-all duration-500">
                    <Icon className="w-7 h-7 text-ocean-gold-dark" />
                  </div>

                  <div className="mb-4">
                    <span className="font-display text-5xl lg:text-6xl font-bold text-gradient-gold">
                      {stat.value}
                    </span>
                    {'suffix' in stat && stat.suffix && (
                      <span className="font-display text-2xl text-ocean-gold-dark/70 ml-1">{stat.suffix}</span>
                    )}
                  </div>

                  <p className="text-sm text-ocean-slate leading-relaxed">
                    {stat.label}
                  </p>

                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-ocean-gold/30 rounded-tr-lg group-hover:border-ocean-gold/60 transition-colors" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative z-10 mt-14 text-center">
          <p className="text-ocean-slate-light text-sm italic">
            {t.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
