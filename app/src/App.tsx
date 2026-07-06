import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { LangContext, type Lang } from './lib/lang'

import Navigation from './sections/Navigation'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import SolutionSection from './sections/SolutionSection'
import AllianceSection from './sections/AllianceSection'
import ExperiencesSection from './sections/ExperiencesSection'
import JourneySection from './sections/JourneySection'
import SafetySection from './sections/SafetySection'
import MarketingSection from './sections/MarketingSection'
import ContactSection from './sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function App({ lang = 'es' }: { lang?: Lang }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <LangContext.Provider value={lang}>
    <div className="relative min-h-screen bg-ocean-ivory overflow-x-hidden">
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <AllianceSection />
        <ExperiencesSection />
        <JourneySection />
        <SafetySection />
        <MarketingSection />
        <ContactSection />
      </main>
    </div>
    </LangContext.Provider>
  )
}

export default App
