import FadeIn from '../components/FadeIn'

const STACK: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'C++', 'TypeScript', 'SQL'],
  },
  {
    group: 'ML & Deep Learning',
    items: [
      'PyTorch',
      'TensorFlow',
      'Hugging Face',
      'scikit-learn',
      'NumPy',
      'Pandas',
      'OpenCV',
    ],
  },
  {
    group: 'Edge AI & MLOps',
    items: ['ONNX', 'Model Distillation', 'Docker', 'MLflow', 'CI/CD', 'Git'],
  },
  {
    group: 'Agentic & GenAI',
    items: ['LangGraph', 'LangChain', 'RAG Pipelines', 'Vector DBs', 'LLM Fine-tuning'],
  },
  {
    group: 'Backend',
    items: ['FastAPI', 'Flask', 'REST APIs', 'PostgreSQL'],
  },
]

export default function TechSkillsSection() {
  return (
    <section className="bg-white px-5 sm:px-8 md:px-10 pb-20 sm:pb-24 md:pb-32">
      <FadeIn>
        <h2
          className="iridescent-text-dark font-black uppercase text-center mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(2rem, 7vw, 90px)' }}
        >
          Tech Stack
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
        {STACK.map((row, i) => (
          <FadeIn key={row.group} delay={i * 0.08}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
              <span
                className="text-[#0C0C0C] font-medium uppercase tracking-widest shrink-0 sm:w-56 opacity-60"
                style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1.05rem)' }}
              >
                {row.group}
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {row.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#0C0C0C]/25 text-[#0C0C0C] px-4 py-1.5 sm:px-5 sm:py-2 font-light hover:bg-[#0C0C0C] hover:text-white transition-colors duration-200"
                    style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1.05rem)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
