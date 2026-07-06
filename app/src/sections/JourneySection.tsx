import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarCheck, Umbrella, Waves, Share2, ArrowRight, Route } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const stepMeta = [
  { icon: CalendarCheck, highlight: false },
  { icon: Umbrella, highlight: false },
  { icon: Waves, highlight: false },
  { icon: Share2, highlight: true },
]

const T = {
  es: {
    badge: 'El Viaje del Huésped',
    title: 'Una experiencia diseñada para',
    titleAccent: 'generar lealtad, contenido y conversación',
    footer: 'De la reserva al recuerdo viral en 4 pasos',
    steps: [
      { number: '01', title: 'Reserva', description: 'Reserva con 24h de anticipación. Confirmación automática con briefing personalizado.' },
      { number: '02', title: 'Bienvenida VIP', description: 'Área exclusiva en playa. Sombrillas privadas. Briefing de seguridad de 15 minutos.' },
      { number: '03', title: 'Experiencia', description: '60 min con instructor. De rodillas a volar de pie. Fotografía y video profesional.' },
      { number: '04', title: 'Recuerdo Viral', description: 'Certificado Oceanix Elite + fotos y video listos para redes sociales.' },
    ],
  },
  en: {
    badge: 'The Guest Journey',
    title: 'An experience designed to',
    titleAccent: 'build loyalty, content and conversation',
    footer: 'From booking to viral memory in 4 steps',
    steps: [
      { number: '01', title: 'Booking', description: 'Book 24h in advance. Automatic confirmation with a personalized briefing.' },
      { number: '02', title: 'VIP Welcome', description: 'Exclusive beach area. Private umbrellas. 15-minute safety briefing.' },
      { number: '03', title: 'Experience', description: '60 min with an instructor. From kneeling to flying upright. Professional photo and video.' },
      { number: '04', title: 'Viral Memory', description: 'Oceanix Elite certificate + photos and video ready for social media.' },
    ],
  },
}


export default function JourneySection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

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
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.fromTo(step,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            }
          }
        )

        gsap.to(step, {
          y: -4,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-ivory via-ocean-mist to-ocean-ivory" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-ocean-gold/8 blur-[150px]" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-navy/5 border border-ocean-navy/10 text-xs tracking-[0.3em] text-ocean-gold-dark uppercase mb-6">
            <Route className="w-3 h-3 inline mr-2" />
            {t.badge}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-navy mb-4">
            {t.title}
            <span className="block text-ocean-gold-dark italic">{t.titleAccent}</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-ocean-gold via-ocean-gold-light to-ocean-gold origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.map((step, i) => {
              const meta = stepMeta[i]
              return (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative"
              >
                <div className={`rounded-2xl p-6 lg:p-8 text-center group transition-all duration-500 h-full hover:shadow-glow-gold ${
                  meta.highlight
                    ? 'bg-ocean-navy text-white shadow-[0_15px_40px_rgba(15,30,60,0.3)]'
                    : 'glass-card'
                }`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    meta.highlight
                      ? 'bg-gradient-to-br from-ocean-gold to-ocean-gold-dark'
                      : 'bg-ocean-navy'
                  }`}>
                    <meta.icon className={`w-8 h-8 ${meta.highlight ? 'text-ocean-navy-deep' : 'text-ocean-gold-light'}`} />
                  </div>

                  <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center ${
                    meta.highlight ? 'bg-gradient-to-br from-ocean-gold to-ocean-gold-dark' : 'bg-ocean-navy'
                  }`}>
                    <span className={`font-bold text-sm ${meta.highlight ? 'text-ocean-navy-deep' : 'text-ocean-gold-light'}`}>{step.number}</span>
                  </div>

                  <h3 className={`font-display text-xl font-bold mb-3 ${meta.highlight ? 'text-white' : 'text-ocean-navy'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${meta.highlight ? 'text-white/70' : 'text-ocean-slate'}`}>
                    {step.description}
                  </p>

                  {i < t.steps.length - 1 && (
                    <div className="hidden md:flex lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-ocean-gold/60" />
                    </div>
                  )}
                </div>
              </div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3">
            <div className="w-2 h-2 rounded-full bg-ocean-gold animate-pulse" />
            <span className="text-sm text-ocean-slate">
              {t.footer}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
