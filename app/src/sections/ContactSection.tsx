import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, MessageCircle, Send, Instagram, ArrowUpRight, Clock, User, Building } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const T = {
  es: {
    badge: 'Próximos Pasos',
    title: 'De cero a operación',
    titleAccent: 'en 7 semanas',
    subtitle: 'Juntos, transformemos su playa. Respuesta en 24 horas.',
    timeline: [
      { week: 'SEM 1', label: 'Reunión + Demo' },
      { week: 'SEM 2', label: 'Demo en Playa' },
      { week: 'SEM 3', label: 'Visita Técnica' },
      { week: 'SEM 4', label: 'Contrato' },
      { week: 'SEM 5-6', label: 'Instalación' },
      { week: 'SEM 7', label: 'Lanzamiento' },
    ],
    footerDesc: 'Experiencias eFoil de élite para hoteles y resorts de lujo. Tecnología europea, operación llave en mano.',
    founderLabel: 'Fundador & CEO',
    phoneLabel: 'Teléfono / WhatsApp',
    emailLabel: 'Email',
    locationLabel: 'Base de operaciones',
    locationValue: 'Punta Cana · Expansión internacional',
    responseLabel: 'Respuesta',
    responseValue: 'En 24 horas',
    formTitle: 'Solicitar información',
    formSubtitle: 'Complete el formulario y nos pondremos en contacto con usted.',
    fName: 'Nombre', fNamePh: 'Su nombre',
    fCompany: 'Hotel / Empresa', fCompanyPh: 'Nombre del hotel',
    fEmail: 'Email', fEmailPh: 'su@email.com',
    fPhone: 'Teléfono', fPhonePh: '+1 (809) 000-0000',
    fMessage: 'Mensaje', fMessagePh: 'Cuéntenos sobre su proyecto...',
    fSubmit: 'Enviar solicitud',
    copyright: '© 2026 Oceanix Experience',
    tagline: 'Premium Water Experiences',
    bottomLine: 'Oceanix Experience — Premium Water Experiences',
  },
  en: {
    badge: 'Next Steps',
    title: 'From zero to operation',
    titleAccent: 'in 7 weeks',
    subtitle: "Together, let's transform your beach. Response within 24 hours.",
    timeline: [
      { week: 'WEEK 1', label: 'Meeting + Demo' },
      { week: 'WEEK 2', label: 'Beach Demo' },
      { week: 'WEEK 3', label: 'Technical Visit' },
      { week: 'WEEK 4', label: 'Contract' },
      { week: 'WEEK 5-6', label: 'Setup' },
      { week: 'WEEK 7', label: 'Launch' },
    ],
    footerDesc: 'Elite eFoil experiences for luxury hotels and resorts. European technology, turnkey operation.',
    founderLabel: 'Founder & CEO',
    phoneLabel: 'Phone / WhatsApp',
    emailLabel: 'Email',
    locationLabel: 'Base of operations',
    locationValue: 'Punta Cana · International expansion',
    responseLabel: 'Response',
    responseValue: 'Within 24 hours',
    formTitle: 'Request information',
    formSubtitle: 'Fill out the form and we will get in touch with you.',
    fName: 'Name', fNamePh: 'Your name',
    fCompany: 'Hotel / Company', fCompanyPh: 'Hotel name',
    fEmail: 'Email', fEmailPh: 'your@email.com',
    fPhone: 'Phone', fPhonePh: '+1 (809) 000-0000',
    fMessage: 'Message', fMessagePh: 'Tell us about your project...',
    fSubmit: 'Send request',
    copyright: '© 2026 Oceanix Experience',
    tagline: 'Premium Water Experiences',
    bottomLine: 'Oceanix Experience — Premium Water Experiences',
  },
}

export default function ContactSection() {
  const lang = useLang()
  const t = T[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      gsap.fromTo(formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* CTA Hero */}
      <div className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-ocean-navy-deep" />

        <div className="absolute inset-0">
          <img
            src="/images/puntacana-hires.jpg"
            alt="Punta Cana"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-navy-deep/80 via-ocean-navy/60 to-ocean-navy-deep" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-ocean-gold/10 blur-[150px]" />

        <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full navy-card text-xs tracking-[0.3em] text-ocean-gold-light uppercase mb-6">
              {t.badge}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
              {t.title}
              <span className="block text-gradient-gold">{t.titleAccent}</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto font-display italic">
              {t.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://wa.me/34643032031"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-ocean-gold to-ocean-gold-dark text-white font-bold text-lg hover:shadow-glow-gold-strong transition-all duration-300 flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="mailto:alex@oceanixexperience.com"
                className="group px-8 py-4 rounded-full navy-card text-white font-semibold hover:border-ocean-gold/60 transition-all duration-300 flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-ocean-gold-light" />
                Email
                <ArrowUpRight className="w-4 h-4 text-ocean-gold-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="navy-card rounded-3xl p-6 lg:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {t.timeline.map((item, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-gold to-ocean-gold-dark flex items-center justify-center mx-auto mb-2 group-hover:from-ocean-gold-light group-hover:to-ocean-gold transition-all">
                      <span className="text-xs font-bold text-ocean-navy-deep">{i + 1}</span>
                    </div>
                    <p className="text-[10px] text-ocean-gold-light/80 tracking-wider">{item.week}</p>
                    <p className="text-xs text-white/60 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info & Footer */}
      <div className="relative py-20 lg:py-24 bg-ocean-navy-deep border-t border-ocean-gold/20">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div ref={contentRef}>
                <img
                  src="/images/logo-full-white.png"
                  alt="Oceanix Experience — Premium Water Experiences"
                  className="h-32 w-auto mb-8"
                />

                <p className="text-white/60 mb-8 leading-relaxed">
                  {t.footerDesc}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg navy-card flex items-center justify-center">
                      <User className="w-5 h-5 text-ocean-gold-light" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">{t.founderLabel}</p>
                      <p className="text-white">Alex Pineda</p>
                    </div>
                  </div>

                  <a href="tel:+34643032031" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg navy-card flex items-center justify-center group-hover:border-ocean-gold/50 transition-colors">
                      <Phone className="w-5 h-5 text-ocean-gold-light" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">{t.phoneLabel}</p>
                      <p className="text-white group-hover:text-ocean-gold-light transition-colors">+34 643 032 031</p>
                    </div>
                  </a>

                  <a href="mailto:alex@oceanixexperience.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg navy-card flex items-center justify-center group-hover:border-ocean-gold/50 transition-colors">
                      <Mail className="w-5 h-5 text-ocean-gold-light" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">{t.emailLabel}</p>
                      <p className="text-white group-hover:text-ocean-gold-light transition-colors">alex@oceanixexperience.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg navy-card flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-ocean-gold-light" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">{t.locationLabel}</p>
                      <p className="text-white">{t.locationValue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg navy-card flex items-center justify-center">
                      <Clock className="w-5 h-5 text-ocean-gold-light" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">{t.responseLabel}</p>
                      <p className="text-white">{t.responseValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={formRef}>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {t.formTitle}
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  {t.formSubtitle}
                </p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-2">{t.fName}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-gold/60" />
                        <input
                          type="text"
                          placeholder={t.fNamePh}
                          className="w-full pl-10 pr-4 py-3 rounded-xl navy-card bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-ocean-gold/60 transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-2">{t.fCompany}</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-gold/60" />
                        <input
                          type="text"
                          placeholder={t.fCompanyPh}
                          className="w-full pl-10 pr-4 py-3 rounded-xl navy-card bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-ocean-gold/60 transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 mb-2">{t.fEmail}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-gold/60" />
                      <input
                        type="email"
                        placeholder={t.fEmailPh}
                        className="w-full pl-10 pr-4 py-3 rounded-xl navy-card bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-ocean-gold/60 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 mb-2">{t.fPhone}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-gold/60" />
                      <input
                        type="tel"
                        placeholder={t.fPhonePh}
                        className="w-full pl-10 pr-4 py-3 rounded-xl navy-card bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-ocean-gold/60 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 mb-2">{t.fMessage}</label>
                    <textarea
                      rows={4}
                      placeholder={t.fMessagePh}
                      className="w-full px-4 py-3 rounded-xl navy-card bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-ocean-gold/60 transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-ocean-gold to-ocean-gold-dark text-white font-bold hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t.fSubmit}
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 text-xs text-white/40">
                  <span>{t.copyright}</span>
                  <span className="hidden md:inline">|</span>
                  <span>{t.tagline}</span>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="https://wa.me/34643032031"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full navy-card flex items-center justify-center hover:border-ocean-gold/60 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-ocean-gold-light" />
                  </a>
                  <a
                    href="mailto:alex@oceanixexperience.com"
                    className="w-10 h-10 rounded-full navy-card flex items-center justify-center hover:border-ocean-gold/60 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-ocean-gold-light" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full navy-card flex items-center justify-center hover:border-ocean-gold/60 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-ocean-gold-light" />
                  </a>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[10px] text-white/30 tracking-wider uppercase">
                  {t.bottomLine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
