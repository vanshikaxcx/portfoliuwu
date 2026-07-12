import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { Github, Link as LinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/ui/magnetic'

const placeholderImage = (text = 'Image') =>
  `https://placehold.co/900x600/1a1a1a/D7E2EA?text=${encodeURIComponent(text)}`

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>
  '--y': MotionValue<string>
}

export interface CarouselStep {
  id: string
  name: string
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
}

function useNumberCycler(totalSteps: number, interval = 6000) {
  const [currentNumber, setCurrentNumber] = useState(0)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
    }, interval)
    return () => clearTimeout(timerId)
  }, [currentNumber, totalSteps, interval])

  const setStep = useCallback(
    (stepIndex: number) => setCurrentNumber(stepIndex % totalSteps),
    [totalSteps],
  )

  return { currentNumber, setStep }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkDevice = () =>
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])
  return isMobile
}

function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
}

const EASE = [0.22, 1, 0.36, 1] as const

function IconLinkButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Magnetic range={70} intensity={0.4}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        data-cursor-morph
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white text-[#0C0C0C]"
      >
        {children}
      </a>
    </Magnetic>
  )
}

function FeatureCard({
  children,
}: {
  children: React.ReactNode
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="animated-cards group relative w-full rounded-[40px]"
      onMouseMove={handleMouseMove}
      style={
        {
          '--x': useMotionTemplate`${mouseX}px`,
          '--y': useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div className="animated-cards-glow relative w-full overflow-hidden rounded-[40px] border-2 border-[#D7E2EA]/60 bg-[#0C0C0C]">
        {children}
      </div>
    </motion.div>
  )
}

function StepsNav({
  steps: stepItems,
  current,
  onChange,
}: {
  steps: readonly CarouselStep[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Projects" className="flex justify-center px-4">
      <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          return (
            <motion.li
              key={step.id}
              initial="inactive"
              animate={isCurrent ? 'active' : 'inactive'}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Magnetic range={70} intensity={0.4}>
              <button
                type="button"
                data-cursor-morph
                className={cn(
                  'group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium uppercase tracking-wider transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8]',
                  isCurrent
                    ? 'bg-[#D7E2EA] text-[#0C0C0C]'
                    : 'bg-[#D7E2EA]/10 text-[#D7E2EA] hover:bg-[#D7E2EA]/20',
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300 text-xs',
                    isCompleted
                      ? 'bg-[#B600A8] text-white'
                      : isCurrent
                        ? 'bg-[#0C0C0C] text-[#D7E2EA]'
                        : 'bg-[#D7E2EA]/20 text-[#D7E2EA]',
                  )}
                >
                  {isCompleted ? <IconCheck className="h-3.5 w-3.5" /> : <span>{stepIdx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block">{step.name}</span>
              </button>
              </Magnetic>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

export function FeatureCarousel({ steps }: { steps: readonly CarouselStep[] }) {
  const { currentNumber: step, setStep } = useNumberCycler(steps.length)
  const project = steps[step]

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto">
      <FeatureCard>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative z-10 p-8 sm:p-10 md:p-12 flex flex-col gap-8 md:gap-10"
          >
            {/* Icon links, top-left */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35, ease: EASE }}
            >
              <IconLinkButton href={project.github} label="GitHub repository">
                <Github className="h-5 w-5 sm:h-6 sm:w-6 pointer-events-none" />
              </IconLinkButton>
              <IconLinkButton href={project.live} label="Live project">
                <LinkIcon className="h-5 w-5 sm:h-6 sm:w-6 pointer-events-none" />
              </IconLinkButton>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Text column */}
              <div className="flex flex-col gap-6 md:w-[45%]">
                <motion.h3
                  className="relative text-[#E9E4DB] font-medium tracking-tight text-3xl sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.35, ease: EASE }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-[#D7E2EA]/60 font-light leading-relaxed text-base sm:text-lg max-w-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16, duration: 0.35, ease: EASE }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-x-8 gap-y-2 mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22, duration: 0.35, ease: EASE }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[#E9E4DB] font-black uppercase tracking-wider text-sm sm:text-base"
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Image column */}
              <motion.div
                className="md:w-[55%] w-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.4, ease: EASE }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 sm:h-72 md:h-[380px] object-cover rounded-2xl invert-hover"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).src = placeholderImage(
                      project.title,
                    ))
                  }
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </FeatureCard>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StepsNav current={step} onChange={setStep} steps={steps} />
      </motion.div>
    </div>
  )
}
