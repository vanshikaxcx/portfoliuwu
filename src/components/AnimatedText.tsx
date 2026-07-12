import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

function Char({
  char,
  progress,
  range,
}: {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline">
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  let charIndex = 0
  const totalChars = text.length

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const start = charIndex
        charIndex += word.length + 1
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => {
              const i = start + ci
              return (
                <Char
                  key={ci}
                  char={char}
                  progress={scrollYProgress}
                  range={[i / totalChars, Math.min(1, (i + 1) / totalChars)]}
                />
              )
            })}
            {wi < words.length - 1 && ' '}
          </span>
        )
      })}
    </p>
  )
}
