import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const WORDS = ['Innovating,', 'Empowering,', 'Delivering.']
const EASE_IN_OUT = [0.22, 1, 0.36, 1] as const
// Accelerating ease so the roll-out reads as a real drop (gravity)
const EASE_DROP = [0.5, 0, 0.75, 0.2] as const

// Full-screen intro: words roll up into view, hold, then drop out one by
// one (right to left); as "Delivering." falls, App drops the whole panel.
export default function Preloader() {
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const t = setTimeout(() => setPhase('out'), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9990] bg-[#0C0C0C] flex items-center justify-center grain"
      exit={{ y: '100%' }}
      transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
    >
      {/* Subtle holographic glows, matching the site's purple/magenta accents */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          left: '-12vw',
          bottom: '-18vw',
          background:
            'radial-gradient(circle, rgba(118, 33, 176, 0.35) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '38vw',
          height: '38vw',
          right: '-10vw',
          top: '-14vw',
          background:
            'radial-gradient(circle, rgba(117, 197, 222, 0.22) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '30vw',
          height: '30vw',
          right: '18vw',
          bottom: '-16vw',
          background:
            'radial-gradient(circle, rgba(182, 0, 168, 0.18) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="flex flex-wrap justify-center gap-x-[0.35em] px-6">
        {WORDS.map((word, i) => (
          <span
            key={word}
            className="inline-flex overflow-hidden"
            style={{ height: '1.2em', fontSize: 'clamp(1.1rem, 2.6vw, 2.2rem)' }}
          >
            <motion.span
              className="inline-block leading-none"
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 600,
                fontStretch: '125%',
                letterSpacing: '0.01em',
                // Iridescent chrome: cream with a soft lavender/ice sheen
                background:
                  'linear-gradient(115deg, #E9E4DB 0%, #E7E1E2 45%, #DDD2EA 75%, #CFD5E8 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ y: '130%' }}
              animate={{ y: phase === 'in' ? '0%' : '130%' }}
              transition={
                phase === 'in'
                  ? {
                      duration: 0.6,
                      ease: EASE_IN_OUT,
                      delay: 0.2 + i * 0.12,
                    }
                  : {
                      duration: 0.5,
                      ease: EASE_DROP,
                      // Drops cascade right-to-left: Delivering. first
                      delay: (WORDS.length - 1 - i) * 0.14,
                    }
              }
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}
