import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'

const CORNER_BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'

const ABOUT_TEXT =
  "i'm a software engineering student and ml engineer working on edge ai, voice biometrics, and offline agentic systems, i build things that work under real constraints, not just in a notebook, i also compete in hackathons and lead two ml communities at my university. let's build something incredible together!"

// Decorative 3D icons: magnetic hover pull, idle float, and a playful
// scale/tilt on hover.
function FloatingIcon({
  src,
  className,
  duration,
}: {
  src: string
  className: string
  duration: number
}) {
  return (
    <Magnet padding={60} strength={4}>
      <motion.img
        src={src}
        alt=""
        draggable={false}
        className={`${className} select-none`}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.18, rotate: 8 }}
      />
    </Magnet>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
      >
        <FloatingIcon
          src={`${CORNER_BASE}/moon_icon.11395d36.png`}
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          duration={4.2}
        />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <FloatingIcon
          src={`${CORNER_BASE}/p59_1.4659672e.png`}
          className="w-[100px] sm:w-[140px] md:w-[180px]"
          duration={5.1}
        />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
      >
        <FloatingIcon
          src={`${CORNER_BASE}/lego_icon-1.703bb594.png`}
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          duration={4.7}
        />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <FloatingIcon
          src={`${CORNER_BASE}/Group_134-1.2e04f3ce.png`}
          className="w-[130px] sm:w-[170px] md:w-[220px]"
          duration={5.6}
        />
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
