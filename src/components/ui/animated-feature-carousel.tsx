import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from 'framer-motion'
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
  category: string
  title: string
  description: string
  images: { src: string; className: string; preset?: AnimationPreset; delay?: number }[]
}

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const

export type AnimationPreset = keyof typeof ANIMATION_PRESETS

function useNumberCycler(totalSteps: number, interval = 5000) {
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

interface StepImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={className}
      src={src}
      style={{
        position: 'absolute',
        userSelect: 'none',
        maxWidth: 'unset',
        ...style,
      }}
      onError={(e) => (e.currentTarget.src = placeholderImage(alt))}
      {...props}
    />
  ),
)
StepImage.displayName = 'StepImage'

const MotionStepImage = motion.create(StepImage)

const IMG_BASE =
  'rounded-2xl border border-[#D7E2EA]/20 shadow-2xl shadow-black/50 object-cover invert-hover'

function FeatureCard({
  children,
  step,
  steps,
}: {
  children: React.ReactNode
  step: number
  steps: readonly CarouselStep[]
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
        <div className="m-6 sm:m-10 min-h-[520px] md:min-h-[460px] w-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-3 md:w-1/2 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#B600A8]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].category}
              </motion.div>
              <motion.h3
                className="text-[#D7E2EA] font-medium uppercase tracking-tight text-xl sm:text-2xl md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].title}
              </motion.h3>
              <motion.p
                className="text-[#D7E2EA]/70 font-light leading-relaxed text-sm sm:text-base max-w-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
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

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto">
      <FeatureCard step={step} steps={steps}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            {...ANIMATION_PRESETS.fadeInScale}
            className="absolute inset-0 hidden md:block"
          >
            <div className="relative w-full h-full">
              {steps[step].images.map((img, i) => {
                const preset = ANIMATION_PRESETS[img.preset ?? 'fadeInScale']
                return (
                  <MotionStepImage
                    key={`${step}-${i}`}
                    alt={steps[step].title}
                    src={img.src}
                    className={cn(IMG_BASE, img.className)}
                    {...preset}
                    transition={{ ...preset.transition, delay: img.delay ?? 0 }}
                  />
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile: single stacked image below the text */}
        <div className="md:hidden mt-6">
          <AnimatePresence mode="wait">
            <motion.img
              key={step}
              src={steps[step].images[0].src}
              alt={steps[step].title}
              className={cn(IMG_BASE, 'relative w-full h-48 sm:h-64')}
              {...ANIMATION_PRESETS.fadeInScale}
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = placeholderImage(
                  steps[step].title,
                ))
              }
            />
          </AnimatePresence>
        </div>
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
