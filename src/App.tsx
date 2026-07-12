import { useEffect } from 'react'
import Lenis from 'lenis'
import CustomCursor from './components/CustomCursor'
import TickerRibbon from './components/TickerRibbon'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import TechSkillsSection from './sections/TechSkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import AchievementsSection from './sections/AchievementsSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <CustomCursor />
      <HeroSection />
      <TickerRibbon
        items={['Edge AI', 'Voice Biometrics', 'Agentic Systems', 'ML Engineer', 'Builder']}
      />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <TechSkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <TickerRibbon
        reverse
        light
        items={['Let’s Build', 'Something', 'Incredible', 'Together']}
      />
      <ContactSection />
    </main>
  )
}
