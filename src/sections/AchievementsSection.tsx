import FadeIn from '../components/FadeIn'

// Edit these to your real numbers/titles.
const ACHIEVEMENTS = [
  {
    number: '01',
    name: 'Edge AI in Production @ VoxMind',
    description:
      'Shipped audio deepfake detection that runs under real hardware constraints: distilled, exported to ONNX, and gated on footprint before every deploy.',
  },
  {
    number: '02',
    name: 'Hackathon Competitor',
    description:
      'Regular hackathon finalist and winner, building working AI products end-to-end under 24–48 hour constraints.',
  },
  {
    number: '03',
    name: 'ML Community Lead ×2',
    description:
      'Leading two machine learning communities at my university: organizing sessions, mentoring members, and growing the campus ML ecosystem.',
  },
  {
    number: '04',
    name: 'Research & Mentorship',
    description:
      'Leading ML research projects and mentoring interns from literature review through publication-ready experiments.',
  },
]

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative z-10 bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="iridescent-text-dark font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Achievements
      </h2>

      <div className="max-w-5xl mx-auto">
        {ACHIEVEMENTS.map((item, i) => (
          <FadeIn key={item.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === 0
                  ? { borderTop: '1px solid rgba(12, 12, 12, 0.15)' }
                  : {}),
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {item.number}
              </span>
              <div className="flex flex-col gap-3 pt-2">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
