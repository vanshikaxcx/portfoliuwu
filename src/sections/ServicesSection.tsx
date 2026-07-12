import FadeIn from '../components/FadeIn'

const SKILLS = [
  {
    number: '01',
    name: 'ML & Deep Learning',
    description:
      'PyTorch, TensorFlow, and Hugging Face for building and deploying models, from audio deepfake detection to multimodal search.',
  },
  {
    number: '02',
    name: 'Edge AI & MLOps',
    description:
      'Model distillation, ONNX export, and footprint-gated deployment for real hardware constraints, backed by Docker, MLflow, and CI/CD pipelines.',
  },
  {
    number: '03',
    name: 'Agentic & Generative AI',
    description:
      'LangGraph and RAG pipelines for multi-agent systems, offline copilots, and retrieval-driven reasoning.',
  },
  {
    number: '04',
    name: 'Software Engineering',
    description:
      'Full-stack builds with FastAPI, Flask, and REST APIs, plus strong DSA and systems design fundamentals.',
  },
  {
    number: '05',
    name: 'Research & Mentorship',
    description:
      'Leading ML research projects and mentoring interns, from literature review to publication-ready experiments.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="iridescent-text-dark font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </h2>

      <div className="max-w-5xl mx-auto">
        {SKILLS.map((skill, i) => (
          <FadeIn key={skill.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === 0 ? { borderTop: '1px solid rgba(12, 12, 12, 0.15)' } : {}),
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {skill.number}
              </span>
              <div className="flex flex-col gap-3 pt-2">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {skill.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
