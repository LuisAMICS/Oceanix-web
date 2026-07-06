import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gem, Cpu, TrendingUp, Wrench, Megaphone, Leaf, Quote } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const reasonIcons = [Gem, Cpu, TrendingUp, Wrench, Megaphone, Leaf]

const T = {
  es: {
    badge: '¿Por qué Oceanix?',
    title: 'El socio ideal para',
    titleAccent: 'su resort o destino',
    quote: '"Oceanix Experience se enorgullece de llevar experiencias premium de hidrofoil eléctrico a los destinos más exclusivos."',
    quoteRole: 'Fundador & CEO — Oceanix Experience',
    reasons: [
      { label: 'Pioneros del eFoil de lujo', desc: 'Primer operador premium enfocado en resorts y destinos exclusivos. Su marca se posiciona como innovadora antes que la competencia.' },
      { label: 'Tecnología de vanguardia', desc: 'Equipos europeos de última generación, con soporte técnico, repuestos y formación continua.' },
      { label: 'Ingresos nuevos, riesgo cero', desc: 'Sin CAPEX ni costos fijos: Oceanix asume equipos, seguros, personal y mantenimiento. El hotel solo suma.' },
      { label: 'Operación llave en mano', desc: 'De cero a operación en 7 semanas, con instructores certificados IKO/PASA y protocolos de seguridad probados.' },
      { label: 'Marketing que vende por usted', desc: 'Contenido profesional, UGC y activaciones integradas en todo el viaje del huésped — sin costo adicional.' },
      { label: 'Lujo sostenible', desc: '100% eléctrico: cero emisiones, cero ruido, cero combustible. Alineado con los objetivos ESG del resort.' },
    ],
  },
  en: {
    badge: 'Why Oceanix?',
    title: 'The ideal partner for',
    titleAccent: 'your resort or destination',
    quote: '"Oceanix Experience is proud to bring premium electric hydrofoil experiences to the most exclusive destinations."',
    quoteRole: 'Founder & CEO — Oceanix Experience',
    reasons: [
      { label: 'Luxury eFoil pioneers', desc: 'The first premium operator focused on exclusive resorts and destinations. Your brand positions itself as an innovator ahead of the competition.' },
      { label: 'Cutting-edge technology', desc: 'Latest-generation European equipment, with technical support, spare parts and ongoing training.' },
      { label: 'New revenue, zero risk', desc: 'No CAPEX or fixed costs: Oceanix covers equipment, insurance, staff and maintenance. The hotel only gains.' },
      { label: 'Turnkey operation', desc: 'From zero to operation in 7 weeks, with IKO/PASA certified instructors and proven safety protocols.' },
      { label: 'Marketing that sells for you', desc: 'Professional content, UGC and activations integrated across the entire guest journey — at no additional cost.' },
      { label: 'Sustainable luxury', desc: '100% electric: zero emissions, zero noise, zero fuel. Aligned with the resort\'s ESG goals.' },
    ],
  },
}


export default function AllianceSection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
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

      gsap.fromTo(quoteRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
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
      id="alianza"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-navy-deep via-ocean-navy to-ocean-navy-deep" />
      <div className="absolute top-20 right-[20%] w-72 h-72 rounded-full bg-ocean-gold/10 blur-[120px] floating" />
      <div className="absolute bottom-20 left-[15%] w-56 h-56 rounded-full bg-ocean-gold/8 blur-[100px] floating-delayed" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full navy-card text-xs tracking-[0.3em] text-ocean-gold-light uppercase mb-6">
              {t.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.title}
              <span className="block text-ocean-gold-light">{t.titleAccent}</span>
            </h2>
          </div>

          <div ref={logoRef} className="flex items-center justify-center mb-12">
            <img src="./images/logo-full-white.png" alt="Oceanix Experience" className="h-28 w-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {t.reasons.map((reason, i) => {
              const Icon = reasonIcons[i]
              return (
                <div
                  key={i}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="navy-card rounded-2xl p-6 group hover:shadow-glow-gold transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-gold/25 to-ocean-gold-muted/20 flex items-center justify-center mb-4 group-hover:from-ocean-gold/40 group-hover:to-ocean-gold-dark/30 transition-all">
                    <Icon className="w-6 h-6 text-ocean-gold-light" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{reason.label}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{reason.desc}</p>
                </div>
              )
            })}
          </div>

          <div
            ref={quoteRef}
            className="navy-card rounded-3xl p-8 md:p-10 max-w-4xl mx-auto relative"
          >
            <Quote className="absolute top-6 left-6 w-10 h-10 text-ocean-gold/30" />
            <blockquote className="text-center">
              <p className="font-display text-xl md:text-2xl text-white/90 italic leading-relaxed mb-6">
                {t.quote}
              </p>
              <footer className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-gold to-ocean-gold-dark flex items-center justify-center">
                  <span className="text-ocean-navy-deep font-bold">AP</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Alex Pineda</p>
                  <p className="text-xs text-white/50">{t.quoteRole}</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
