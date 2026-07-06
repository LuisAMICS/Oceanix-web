import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { useLang } from '../lib/lang'

gsap.registerPlugin(ScrollTrigger)

const T = {
  es: {
    links: [
      { label: 'Experiencia', href: '#experiencia' },
      { label: 'eFoil', href: '#efoil' },
      { label: 'Por qué Oceanix', href: '#alianza' },
      { label: 'Experiencias', href: '#experiencias' },
      { label: 'Seguridad', href: '#seguridad' },
      { label: 'Contacto', href: '#contacto' },
    ],
    cta: 'Reservar',
    otherLangHref: '/en',
    otherLangLabel: 'EN',
  },
  en: {
    links: [
      { label: 'Experience', href: '#experiencia' },
      { label: 'eFoil', href: '#efoil' },
      { label: 'Why Oceanix', href: '#alianza' },
      { label: 'Experiences', href: '#experiencias' },
      { label: 'Safety', href: '#seguridad' },
      { label: 'Contact', href: '#contacto' },
    ],
    cta: 'Book now',
    otherLangHref: '/',
    otherLangLabel: 'ES',
  },
}

export default function Navigation() {
  const lang = useLang()
  const t = T[lang]
  const navLinks = t.links
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    )
  }, [])

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-ocean-navy/10 shadow-[0_4px_20px_rgba(15,30,60,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <img
                src={isScrolled ? '/images/logo-mark.png' : '/images/logo-mark-white.png'}
                alt="Oceanix Experience"
                className="h-11 w-auto transition-all duration-500"
              />
              <div className="flex flex-col">
                <span className={`font-display text-lg font-bold tracking-[0.2em] transition-colors duration-500 ${isScrolled ? 'text-ocean-navy' : 'text-white'}`}>
                  OCEANIX
                </span>
                <span className="text-[10px] tracking-[0.3em] text-ocean-gold uppercase">
                  Experience
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm transition-colors duration-300 tracking-wide ${
                    isScrolled ? 'text-ocean-slate hover:text-ocean-gold-dark' : 'text-white/80 hover:text-ocean-gold-light'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://wa.me/34643032031"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isScrolled ? 'text-ocean-slate hover:text-ocean-gold-dark' : 'text-white/80 hover:text-ocean-gold-light'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:alex@oceanixexperience.com"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-ocean-gold to-ocean-gold-dark text-white font-semibold text-sm hover:shadow-glow-gold transition-shadow duration-300"
              >
                {t.cta}
              </a>
              <a
                href={t.otherLangHref}
                className={`px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider transition-colors ${
                  isScrolled
                    ? 'border-ocean-navy/20 text-ocean-navy hover:border-ocean-gold'
                    : 'border-white/30 text-white hover:border-ocean-gold-light'
                }`}
              >
                {t.otherLangLabel}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-ocean-navy' : 'text-white'}`}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ocean-navy-deep/95 backdrop-blur-xl" onClick={() => setIsMobileOpen(false)} />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          <img src="/images/logo-mark-white.png" alt="Oceanix" className="h-16 w-auto mb-2" />
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-display text-white/80 hover:text-ocean-gold-light transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col items-center gap-4 mt-8">
            <a
              href="https://wa.me/34643032031"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ocean-gold-light"
            >
              <Phone className="w-5 h-5" />
              <span>+34 643 032 031</span>
            </a>
            <a
              href="mailto:alex@oceanixexperience.com"
              className="flex items-center gap-2 text-ocean-gold-light"
            >
              <Mail className="w-5 h-5" />
              <span>alex@oceanixexperience.com</span>
            </a>
            <a
              href={t.otherLangHref}
              className="px-4 py-2 rounded-full border border-white/30 text-white text-sm font-bold tracking-wider"
            >
              {t.otherLangLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
