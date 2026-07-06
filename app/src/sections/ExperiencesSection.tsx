import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Heart, Users, Camera, Sparkles } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const expMeta = [
  { icon: Star, image: '/images/experience-diamond.jpg' },
  { icon: Heart, image: '/images/experience-luna-miel.jpg' },
  { icon: Users, image: '/images/efoil-duo.webp' },
  { icon: Camera, image: '/images/efoil-river.webp' },
]

const T = {
  es: {
    badge: 'Experiencias',
    title: 'Cuatro perfiles, cuatro experiencias',
    titleAccent: 'premium',
    subtitle: 'Diseñadas para generar lealtad, contenido y conversación. Cada experiencia se adapta a su destino y a sus huéspedes.',
    ctaQuestion: '¿Quiere una propuesta a medida para su resort o destino?',
    ctaButton: 'Hablemos de su proyecto',
    items: [
      {
        title: 'Diamond Club / Butler',
        subtitle: 'Experiencia Privada',
        description: 'Experiencia privada con champagne, horario preferencial y fotografía profesional. Servicio de mayordomo dedicado.',
        features: ['Champagne de bienvenida', 'Horario preferencial', 'Fotografía profesional', 'Servicio de mayordomo'],
        badge: null as string | null,
      },
      {
        title: 'Luna de Miel',
        subtitle: 'Romance sobre el agua',
        description: 'Sesión al atardecer con iluminación dorada, música ambiental y video cinemático. El momento perfecto para parejas.',
        features: ['Atardecer dorado', 'Música ambiental', 'Video cinemático', 'Decoración romántica'],
        badge: 'Más Popular' as string | null,
      },
      {
        title: 'Familia Premium',
        subtitle: 'Diversión para todos',
        description: '2 eFoils simultáneos con instructores dedicados. Seguro y emocionante para toda la familia.',
        features: ['2 eFoils simultáneos', 'Instructores dedicados', 'Seguro incluido', 'Actividad familiar'],
        badge: null as string | null,
      },
      {
        title: 'Influencer / UGC',
        subtitle: 'Contenido de valor',
        description: 'Colaboraciones seleccionadas con creadores de contenido para aumentar la visibilidad del resort.',
        features: ['Fotografía profesional', 'Video 4K', 'Contenido para redes', 'Visibilidad garantizada'],
        badge: null as string | null,
      },
    ],
  },
  en: {
    badge: 'Experiences',
    title: 'Four profiles, four premium',
    titleAccent: 'experiences',
    subtitle: 'Designed to generate loyalty, content and conversation. Each experience is tailored to your destination and your guests.',
    ctaQuestion: 'Would you like a tailored proposal for your resort or destination?',
    ctaButton: "Let's talk about your project",
    items: [
      {
        title: 'Diamond Club / Butler',
        subtitle: 'Private Experience',
        description: 'Private experience with champagne, preferred scheduling and professional photography. Dedicated butler service.',
        features: ['Welcome champagne', 'Preferred scheduling', 'Professional photography', 'Butler service'],
        badge: null as string | null,
      },
      {
        title: 'Honeymoon',
        subtitle: 'Romance on the water',
        description: 'Sunset session with golden light, ambient music and cinematic video. The perfect moment for couples.',
        features: ['Golden sunset', 'Ambient music', 'Cinematic video', 'Romantic setting'],
        badge: 'Most Popular' as string | null,
      },
      {
        title: 'Premium Family',
        subtitle: 'Fun for everyone',
        description: '2 simultaneous eFoils with dedicated instructors. Safe and exciting for the whole family.',
        features: ['2 simultaneous eFoils', 'Dedicated instructors', 'Insurance included', 'Family activity'],
        badge: null as string | null,
      },
      {
        title: 'Influencer / UGC',
        subtitle: 'Valuable content',
        description: 'Selected collaborations with content creators to boost the resort\'s visibility.',
        features: ['Professional photography', '4K video', 'Social media content', 'Guaranteed visibility'],
        badge: null as string | null,
      },
    ],
  },
}


export default function ExperiencesSection() {
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
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experiencias"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-ivory via-white to-ocean-ivory" />
      <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-ocean-gold/8 blur-[100px] floating" />
      <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-ocean-navy/8 blur-[120px] floating-delayed" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-navy/5 border border-ocean-navy/10 text-xs tracking-[0.3em] text-ocean-gold-dark uppercase mb-6">
            <Sparkles className="w-3 h-3 inline mr-2" />
            {t.badge}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-navy mb-4">
            {t.title}
            <span className="block text-ocean-gold-dark italic">{t.titleAccent}</span>
          </h2>
          <p className="max-w-xl mx-auto text-ocean-slate">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
          {t.items.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative"
            >
              <div className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-glow-gold ${
                exp.badge ? 'border-ocean-gold/50 ring-1 ring-ocean-gold/30' : 'group-hover:border-ocean-gold/40'
              }`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={expMeta[i].image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-navy-deep/80 via-ocean-navy-deep/20 to-transparent" />

                  {exp.badge && (
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-ocean-gold to-ocean-gold-dark text-white text-xs font-bold tracking-wider uppercase">
                      {exp.badge}
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full glass-panel flex items-center justify-center">
                    {(() => { const Icon = expMeta[i].icon; return <Icon className="w-6 h-6 text-ocean-gold-light" /> })()}
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="font-display text-2xl font-bold text-ocean-navy mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-ocean-gold-dark text-sm mb-4">{exp.subtitle}</p>
                  <p className="text-ocean-slate text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.features.map((feature, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full glass-card-light text-xs text-ocean-slate"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-ocean-slate mb-6">
            {t.ctaQuestion}
          </p>
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ocean-navy text-white font-semibold hover:shadow-glow-gold transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-ocean-gold-light" />
            {t.ctaButton}
          </a>
        </div>
      </div>
    </section>
  )
}
