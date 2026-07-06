import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Monitor, BookOpen, UserCheck, Camera, Gift, Megaphone, TrendingUp, MessageSquare } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const phaseMeta = [
  { icon: Mail, accent: 'navy' as const, itemIcons: [Mail, Monitor, BookOpen] },
  { icon: Camera, accent: 'gold' as const, itemIcons: [Monitor, BookOpen, UserCheck] },
  { icon: MessageSquare, accent: 'navy' as const, itemIcons: [Camera, Mail, Gift] },
]

const T = {
  es: {
    badge: 'Marketing Integrado',
    title: 'Oceanix genera contenido, visibilidad y reputación',
    titleAccent: '— sin costo adicional',
    phaseLabel: 'Fase',
    bannerCaption: 'Contenido que vende por usted',
    stats: [
      { value: '3x', label: 'Mayor engagement en redes' },
      { value: '4K', label: 'Video profesional incluido' },
      { value: 'UGC', label: 'Contenido generado por huéspedes' },
      { value: '0$', label: 'Costo de marketing adicional' },
    ],
    phases: [
      { title: 'Antes de la Llegada', items: ['Email pre-llegada: "Reserve su experiencia Oceanix"', 'Landing page dedicada en el sitio web del hotel', 'Paquete "Oceanix Elite" visible en el motor de reservas'] },
      { title: 'Durante la Estadía', items: ['Video promocional 4K en pantallas del lobby y elevadores', 'Brochure de lujo impreso en cada suite', 'Capacitación del concierge para venta adicional natural'] },
      { title: 'Post-Estadía', items: ['Hashtag #OceanixAt[Hotel] + Reels y TikToks semanales', 'Email de agradecimiento con fotos personalizadas', 'UGC incentivado: 20% de descuento si publica y etiqueta'] },
    ],
  },
  en: {
    badge: 'Integrated Marketing',
    title: 'Oceanix generates content, visibility and reputation',
    titleAccent: '— at no additional cost',
    phaseLabel: 'Phase',
    bannerCaption: 'Content that sells for you',
    stats: [
      { value: '3x', label: 'Higher social media engagement' },
      { value: '4K', label: 'Professional video included' },
      { value: 'UGC', label: 'Guest-generated content' },
      { value: '$0', label: 'Additional marketing cost' },
    ],
    phases: [
      { title: 'Before Arrival', items: ['Pre-arrival email: "Book your Oceanix experience"', 'Dedicated landing page on the hotel website', '"Oceanix Elite" package visible in the booking engine'] },
      { title: 'During the Stay', items: ['4K promo video on lobby and elevator screens', 'Luxury printed brochure in every suite', 'Concierge training for natural upselling'] },
      { title: 'Post-Stay', items: ['#OceanixAt[Hotel] hashtag + weekly Reels and TikToks', 'Thank-you email with personalized photos', 'Incentivized UGC: 20% discount for posting and tagging'] },
    ],
  },
}


export default function MarketingSection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const phasesRef = useRef<(HTMLDivElement | null)[]>([])

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

      phasesRef.current.forEach((phase, i) => {
        if (!phase) return
        gsap.fromTo(phase,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })

      gsap.fromTo(bannerRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-ivory via-ocean-mist to-ocean-ivory" />
      <div className="absolute top-1/3 right-[20%] w-72 h-72 rounded-full bg-ocean-gold/8 blur-[120px] floating" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-navy/5 border border-ocean-navy/10 text-xs tracking-[0.3em] text-ocean-gold-dark uppercase mb-6">
              <Megaphone className="w-3 h-3 inline mr-2" />
              {t.badge}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-navy mb-4">
              {t.title}
              <span className="block text-ocean-gold-dark italic">{t.titleAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.phases.map((phase, i) => {
              const meta = phaseMeta[i]
              return (
              <div
                key={i}
                ref={(el) => { phasesRef.current[i] = el }}
                className="group"
              >
                <div className="glass-card rounded-3xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-glow-gold group-hover:border-ocean-gold/40">
                  <div className={`flex items-center gap-4 px-8 py-5 ${
                    meta.accent === 'gold'
                      ? 'bg-gradient-to-r from-ocean-gold to-ocean-gold-dark'
                      : 'bg-ocean-navy'
                  }`}>
                    <meta.icon className={`w-6 h-6 ${meta.accent === 'gold' ? 'text-ocean-navy-deep' : 'text-ocean-gold-light'}`} />
                    <div>
                      <span className={`text-[10px] tracking-wider uppercase ${meta.accent === 'gold' ? 'text-ocean-navy-deep/70' : 'text-white/50'}`}>{t.phaseLabel} {i + 1}</span>
                      <h3 className={`font-display text-lg font-bold ${meta.accent === 'gold' ? 'text-ocean-navy-deep' : 'text-white'}`}>{phase.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 p-8">
                    {phase.items.map((item, j) => {
                      const ItemIcon = meta.itemIcons[j]
                      return (
                        <div
                          key={j}
                          className="flex items-start gap-3 p-3 rounded-xl glass-card-light transition-all duration-300 hover:bg-ocean-gold/10"
                        >
                          <ItemIcon className="w-5 h-5 text-ocean-gold-dark mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-ocean-slate leading-relaxed">{item}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          {/* Action banner */}
          <div ref={bannerRef} className="mt-16 relative rounded-3xl overflow-hidden h-56 lg:h-72">
            <img
              src="/images/efoil-race.jpg"
              alt="eFoils en acción"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-navy-deep/70 via-transparent to-ocean-navy-deep/40" />
            <div className="absolute bottom-6 left-8">
              <p className="font-display text-2xl lg:text-3xl text-white font-bold drop-shadow-lg">
                {t.bannerCaption}
              </p>
            </div>
          </div>

          <div className="mt-16 glass-card rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {t.stats.map((stat, i) => {
                const StatIcon = [TrendingUp, Camera, MessageSquare, Gift][i]
                return (
                  <div key={i}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <StatIcon className="w-5 h-5 text-ocean-gold-dark" />
                      <span className="font-display text-3xl font-bold text-ocean-navy">{stat.value}</span>
                    </div>
                    <p className="text-xs text-ocean-slate">{stat.label}</p>
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
