import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Award, TreePine, MapPin, Radio, CheckCircle, ShieldCheck } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const safetyIcons = [Award, ShieldCheck, Shield, TreePine, MapPin, Radio]

const T = {
  es: {
    badge: 'Seguridad & Cumplimiento',
    title: 'El hotel opera con tranquilidad',
    titleAccent: 'Oceanix asume la responsabilidad operativa',
    check: 'Cumplimiento garantizado',
    imgCaption: 'Aguas cristalinas, operación impecable',
    footer: 'Operación conforme a la normativa aplicable en cada destino',
    items: [
      { title: 'Instructores Certificados', description: 'Certificación IKO / PASA. Entrenamiento continuo para garantizar la mejor experiencia.' },
      { title: 'Seguro de Responsabilidad Civil', description: 'Cobertura internacional en proceso de contratación para total tranquilidad.' },
      { title: 'Equipos Certificados CE', description: 'Resistentes al agua IP67. Sistema de apagado automático integrado.' },
      { title: 'Impacto Ambiental Cero', description: 'Sin combustible, aceite, ruido ni emisiones. Certificable ESG.' },
      { title: 'Zona Operacional Delimitada', description: 'Área exclusiva con bandera de seguridad. Radio VHF constante.' },
      { title: 'Protocolo de Emergencias', description: 'Botiquín acuático y personal de rescate en alerta permanente.' },
    ],
  },
  en: {
    badge: 'Safety & Compliance',
    title: 'The hotel operates with peace of mind',
    titleAccent: 'Oceanix takes on the operational responsibility',
    check: 'Compliance guaranteed',
    imgCaption: 'Crystal-clear waters, flawless operation',
    footer: 'Operation compliant with applicable regulations in each destination',
    items: [
      { title: 'Certified Instructors', description: 'IKO / PASA certification. Ongoing training to guarantee the best experience.' },
      { title: 'Liability Insurance', description: 'International coverage being arranged for total peace of mind.' },
      { title: 'CE Certified Equipment', description: 'IP67 water resistant. Integrated automatic shut-off system.' },
      { title: 'Zero Environmental Impact', description: 'No fuel, oil, noise or emissions. ESG certifiable.' },
      { title: 'Defined Operating Zone', description: 'Exclusive area with safety flag. Constant VHF radio.' },
      { title: 'Emergency Protocol', description: 'Water first-aid kit and rescue staff on permanent alert.' },
    ],
  },
}


export default function SafetySection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
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

      gsap.fromTo(imageRef.current,
        { x: 80, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
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
          { y: 50, opacity: 0, rotateY: i % 2 === 0 ? -10 : 10 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
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
      id="seguridad"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-ivory via-white to-ocean-ivory" />
      <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-ocean-gold/8 blur-[100px] floating" />
      <div className="absolute bottom-20 right-[10%] w-56 h-56 rounded-full bg-ocean-navy/8 blur-[90px] floating-delayed" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-navy/5 border border-ocean-navy/10 text-xs tracking-[0.3em] text-ocean-gold-dark uppercase mb-6">
              <ShieldCheck className="w-3 h-3 inline mr-2" />
              {t.badge}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-navy mb-4">
              {t.title}
              <span className="block text-ocean-gold-dark italic">{t.titleAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
              {t.items.map((item, i) => {
                const Icon = safetyIcons[i]
                return (
                <div
                  key={i}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="group"
                >
                  <div className="glass-card rounded-2xl p-6 h-full transition-all duration-500 group-hover:shadow-glow-gold group-hover:border-ocean-gold/40">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ocean-gold/15 to-ocean-navy/10 flex items-center justify-center mb-5 group-hover:from-ocean-gold/25 group-hover:to-ocean-gold/15 transition-all">
                      <Icon className="w-7 h-7 text-ocean-gold-dark" />
                    </div>

                    <h4 className="text-lg font-semibold text-ocean-navy mb-3">
                      {item.title}
                    </h4>
                    <p className="text-sm text-ocean-slate leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-ocean-gold-dark" />
                      <span className="text-xs text-ocean-gold-dark">{t.check}</span>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>

            <div ref={imageRef} className="hidden lg:block relative">
              <div className="sticky top-28 h-full max-h-[720px] rounded-3xl overflow-hidden glass-card p-2">
                <img
                  src="/images/efoil-split.jpg"
                  alt="eFoil sobre aguas cristalinas"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-ocean-navy-deep/50 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-display text-xl text-white font-semibold drop-shadow-lg">
                    {t.imgCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3">
              <Shield className="w-5 h-5 text-ocean-gold-dark" />
              <span className="text-sm text-ocean-slate">
                {t.footer}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
