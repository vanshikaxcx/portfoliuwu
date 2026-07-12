import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import avatarCard from '../assets/avatar-card.jpg'

// Live avatar card: 3D tilt + parallax following the cursor anywhere on the
// page, an idle float, black & white by default and full color on hover.
export default function InteractiveAvatar() {
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0) // -1 .. 1 relative to element center
  const my = useMotionValue(0)

  const springCfg = { stiffness: 120, damping: 16, mass: 0.8 }
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-16, 16]), springCfg)
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), springCfg)
  const translateX = useSpring(useTransform(mx, [-1, 1], [-12, 12]), springCfg)
  const translateY = useSpring(useTransform(my, [-1, 1], [-8, 8]), springCfg)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover)').matches) return

    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))))
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <motion.div
      ref={ref}
      data-cursor-label="I'm open to work, DM me now…"
      className="relative w-[210px] h-[214px] sm:w-[260px] sm:h-[265px] md:w-[300px] md:h-[305px] rounded-[32px] sm:rounded-[40px] overflow-hidden"
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformPerspective: 900,
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
      }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <img
        src={avatarCard}
        alt="Vanshika"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none grayscale hover:grayscale-0 transition-[filter] duration-500"
      />
    </motion.div>
  )
}
