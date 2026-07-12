import FadeIn from '../components/FadeIn'
import { Magnetic } from '@/components/ui/magnetic'

const CREAM = '#E9E4DB'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-6 md:px-10 pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24 flex flex-col"
    >
      <FadeIn y={40}>
        <h2
          className="font-black uppercase leading-[0.85] tracking-tight text-center whitespace-nowrap"
          style={{ color: CREAM, fontSize: 'clamp(4rem, 16vw, 320px)' }}
        >
          Let&apos;s Talk
        </h2>
      </FadeIn>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10 mt-16 sm:mt-24 md:mt-32">
        <FadeIn delay={0.15}>
          <div className="flex flex-col gap-6 max-w-md">
            <p
              className="uppercase tracking-wider font-light leading-relaxed"
              style={{ color: `${CREAM}B3`, fontSize: 'clamp(0.8rem, 1.3vw, 1.05rem)' }}
            >
              Got a question, proposal, project, or want to work together on
              something?
            </p>
            <div
              className="flex flex-wrap items-center gap-2 uppercase tracking-wider font-medium"
              style={{ color: CREAM, fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)' }}
            >
              <Magnetic range={70} intensity={0.4}>
                <a
                  href="mailto:vanshika@voxmind.ai"
                  data-cursor-morph
                  className="underline underline-offset-8 rounded-lg px-1"
                >
                  Send me an email
                </a>
              </Magnetic>
              <span className="font-light lowercase mx-1">or</span>
              <Magnetic range={70} intensity={0.4}>
                <a
                  href="mailto:vanshika@voxmind.ai?subject=Book%20a%20call"
                  data-cursor-morph
                  className="underline underline-offset-8 rounded-lg px-1"
                >
                  Book a call
                </a>
              </Magnetic>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex gap-8">
            <Magnetic range={80} intensity={0.5}>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                data-cursor-morph
                className="font-medium rounded-lg px-1"
                style={{ color: CREAM, fontSize: 'clamp(1rem, 1.6vw, 1.35rem)' }}
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic range={80} intensity={0.5}>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                data-cursor-morph
                className="font-medium rounded-lg px-1"
                style={{ color: CREAM, fontSize: 'clamp(1rem, 1.6vw, 1.35rem)' }}
              >
                GitHub
              </a>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
