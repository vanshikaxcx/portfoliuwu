import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import TickerRibbon from './components/TickerRibbon'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import AchievementsSection from './sections/AchievementsSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Words roll out starting at 1.4s ("Delivering." drops first);
    // the panel starts its own drop just after
    const t = setTimeout(() => setLoading(false), reduced ? 300 : 1800)
    return () => clearTimeout(t)
  }, [])

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
      <AnimatePresence onExitComplete={() => setRevealed(true)}>
        {loading && <Preloader />}
      </AnimatePresence>
      {revealed && (
        <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <AchievementsSection />
      <TickerRibbon
        reverse
        light
        items={['Let’s Build', 'Something', 'Incredible', 'Together']}
      />
      <ContactSection />
        </>
      )}
    </main>
  )
}
