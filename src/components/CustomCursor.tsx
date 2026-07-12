import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// One white circle with difference blending that IS the cursor. It:
// - inverts whatever passes underneath it
// - grows slightly over plain links/buttons
// - over [data-cursor-morph] elements it snaps to and takes the exact
//   shape of the element, engulfing it (still inverting through blend)
// - over [data-cursor-label] elements it transforms into a rectangular
//   bubble containing the message (solid white, dark text)
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [morph, setMorph] = useState<{ w: number; h: number; r: number } | null>(null)
  const [textW, setTextW] = useState(0)
  const measureRef = useRef<HTMLSpanElement>(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 })

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const morphEl = target.closest('[data-cursor-morph]') as HTMLElement | null
      const labelEl = target.closest('[data-cursor-label]')

      if (morphEl) {
        // Glide to the element's center and take its shape (slightly padded)
        const rect = morphEl.getBoundingClientRect()
        x.set(rect.left + rect.width / 2)
        y.set(rect.top + rect.height / 2)
        const radius = parseFloat(getComputedStyle(morphEl).borderRadius) || 12
        setMorph({ w: rect.width + 14, h: rect.height + 14, r: radius + 7 })
      } else {
        x.set(e.clientX)
        y.set(e.clientY)
        setMorph(null)
      }

      setLabel(labelEl ? labelEl.getAttribute('data-cursor-label') : null)
      setIsLink(!!target.closest('a, button'))
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [x, y])

  // Measure the label text so the bubble can size to it
  useEffect(() => {
    if (label && measureRef.current) {
      setTextW(measureRef.current.offsetWidth)
    }
  }, [label])

  if (!enabled) return null

  return (
    <>
      {/* Small center dot; hides while morphing or showing the bubble */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#D7E2EA] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: morph || label ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* The shape-shifting cursor body. Difference blend stays on in every
          state, so even the label bubble inverts what's underneath it. */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center overflow-hidden bg-white mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={
          morph
            ? { width: morph.w, height: morph.h, borderRadius: morph.r, scale: 1 }
            : label
              ? {
                  width: Math.max(textW + 48, 64),
                  height: 56,
                  borderRadius: 18,
                  scale: 1,
                }
              : {
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  scale: isLink ? 1.6 : 1,
                }
        }
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
          // Springs overshoot; on borderRadius that dips below the target
          // (briefly squaring the corners), so tween it instead.
          borderRadius: { type: 'tween', duration: 0.25, ease: 'easeOut' },
        }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.28, delay: 0.08, ease: 'easeInOut' }}
            className="text-[#0C0C0C] text-lg font-medium whitespace-nowrap px-5 text-center"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Hidden span for pre-measuring the label width */}
      {label && (
        <span
          ref={measureRef}
          className="fixed invisible pointer-events-none whitespace-nowrap text-lg font-medium"
          aria-hidden="true"
        >
          {label}
        </span>
      )}
    </>
  )
}
