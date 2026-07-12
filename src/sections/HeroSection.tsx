import FadeIn from '../components/FadeIn'
import { Magnetic } from '@/components/ui/magnetic'
import InteractiveAvatar from '../components/InteractiveAvatar'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Contact']

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col grain smoke-bg overflow-hidden"
      style={{ overflowX: 'clip' }}
    >
      {/* Top bar: book-a-call left, magnetic nav links right */}
      <FadeIn delay={0} y={-20} as="nav" className="relative z-20">
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <Magnetic>
            <a
              href="mailto:vanshika@voxmind.ai"
              data-cursor-morph
              className="inline-block border border-[#C9B8F0]/50 rounded-xl px-5 py-2.5 md:px-6 md:py-3 uppercase tracking-widest text-xs md:text-sm font-medium"
            >
              <span className="iridescent-text">Book a Call</span>
            </a>
          </Magnetic>
          <div className="flex items-center gap-5 md:gap-10">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link} range={80} intensity={0.5}>
                <a
                  href={`#${link.toLowerCase()}`}
                  data-cursor-morph
                  className="iridescent-text inline-block font-medium tracking-wide text-sm md:text-lg rounded-lg px-1"
                >
                  {link}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Big stacked name with the avatar overlapping */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <FadeIn delay={0.15} y={70}>
            <div className="holo-text font-black uppercase tracking-tight leading-none text-[8vw] sm:text-[7vw]">
              Hi, i&apos;m
            </div>
          </FadeIn>
          <FadeIn delay={0.25} y={80}>
            <h1 className="holo-text font-black uppercase tracking-tight leading-[0.85] text-[17vw] sm:text-[15vw]">
              Vanshika
            </h1>
          </FadeIn>
        </div>

        <FadeIn delay={0.5} y={70} className="relative z-10 -mt-[6vw] sm:-mt-[5vw]">
          <InteractiveAvatar />
        </FadeIn>
      </div>

      {/* Bottom info, reference-style */}
      <div className="relative z-20 flex justify-between items-end gap-8 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.65} y={40}>
          <p
            className="iridescent-text font-light leading-snug max-w-[280px] md:max-w-[360px]"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.35rem)' }}
          >
            I currently work as an ML Engineer at{' '}
            <a
              href="mailto:vanshika@voxmind.ai"
              className="underline underline-offset-4 decoration-[#C9B8F0]/60 hover:opacity-70 transition-opacity"
            >
              VoxMind
            </a>
            , currently available for work.
          </p>
        </FadeIn>
        <FadeIn delay={0.75} y={40}>
          <p
            className="iridescent-text font-light leading-snug max-w-[280px] md:max-w-[400px] text-right"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.35rem)' }}
          >
            Focused on edge AI and agentic systems, working from India.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
