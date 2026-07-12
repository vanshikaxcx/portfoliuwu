import { useEffect, useRef } from 'react'
import {
  AudioWaveform,
  Bot,
  Boxes,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Layers,
  LineChart,
  Network,
  Search,
  Server,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

interface Skill {
  name: string
  icon: LucideIcon
}

// Row 1 (drifts right): languages + software engineering
const ROW_1_SKILLS: Skill[] = [
  { name: 'Python', icon: Code2 },
  { name: 'JavaScript', icon: Code2 },
  { name: 'SQL', icon: Database },
  { name: 'Backend Dev', icon: Server },
  { name: 'API Dev', icon: Server },
  { name: 'SWE', icon: Code2 },
  { name: 'System Design', icon: Network },
  { name: 'DBMS', icon: Database },
  { name: 'Distributed Systems', icon: Network },
]

// Row 2 (drifts left): ML/DL + core AI skills
const ROW_2_SKILLS: Skill[] = [
  { name: 'ML', icon: Brain },
  { name: 'DL', icon: Brain },
  { name: 'LLMs', icon: Sparkles },
  { name: 'Gen AI', icon: Sparkles },
  { name: 'CV', icon: Search },
  { name: 'Audio AI', icon: AudioWaveform },
  { name: 'Edge AI', icon: Cpu },
  { name: 'Model Deployment', icon: Cpu },
  { name: 'Model Evaluation', icon: Gauge },
]

// Row 3 (drifts right): infra, MLOps + agentic systems
const ROW_3_SKILLS: Skill[] = [
  { name: 'Cloud', icon: Cloud },
  { name: 'MLOps', icon: LineChart },
  { name: 'Docker', icon: Boxes },
  { name: 'K8s', icon: Boxes },
  { name: 'CI/CD', icon: GitBranch },
  { name: 'Git', icon: GitBranch },
  { name: 'Data Engg', icon: Layers },
  { name: 'RAG', icon: Bot },
  { name: 'Multi-Agent AI', icon: Bot },
]

const ROW_1 = [...ROW_1_SKILLS, ...ROW_1_SKILLS, ...ROW_1_SKILLS]
const ROW_2 = [...ROW_2_SKILLS, ...ROW_2_SKILLS, ...ROW_2_SKILLS]
const ROW_3 = [...ROW_3_SKILLS, ...ROW_3_SKILLS, ...ROW_3_SKILLS]

function Tile({ skill }: { skill: Skill }) {
  const Icon = skill.icon
  return (
    <span className="shrink-0 inline-flex items-center gap-6 sm:gap-8">
      <span
        className="skill-word font-black uppercase tracking-tight leading-none whitespace-nowrap"
        style={{ fontSize: 'clamp(1.6rem, 3.4vw, 3rem)' }}
      >
        {skill.name}
      </span>
      <Icon
        className="h-5 w-5 sm:h-6 sm:w-6 text-[#C9B8F0]/70 shrink-0"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </span>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)

  // Drive transforms directly via refs inside rAF (no React re-renders).
  // Each row is 3 copies of its list; the offset wraps modulo one copy's
  // width so the row can never translate past its content and expose
  // black space at either side, no matter how far the page scrolls.
  useEffect(() => {
    let rafId = 0
    let ticking = false

    const applyLoop = (
      el: HTMLDivElement | null,
      raw: number,
      direction: 1 | -1,
    ) => {
      if (!el) return
      const copyWidth = el.scrollWidth / 3
      if (!copyWidth) return
      const x = ((raw % copyWidth) + copyWidth) % copyWidth
      const pos = direction === 1 ? x : copyWidth - x
      el.style.transform = `translateX(${-copyWidth + pos}px)`
    }

    const update = () => {
      ticking = false
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.offsetTop
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      applyLoop(row1Ref.current, offset, 1)
      applyLoop(row2Ref.current, offset, -1)
      applyLoop(row3Ref.current, offset - 200, 1)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-10 sm:pt-12 md:pt-14 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        <div
          ref={row1Ref}
          className="flex items-center gap-6 sm:gap-8"
          style={{ willChange: 'transform' }}
        >
          {ROW_1.map((skill, i) => (
            <Tile key={i} skill={skill} />
          ))}
        </div>
        <div
          ref={row2Ref}
          className="flex items-center gap-6 sm:gap-8"
          style={{ willChange: 'transform' }}
        >
          {ROW_2.map((skill, i) => (
            <Tile key={i} skill={skill} />
          ))}
        </div>
        <div
          ref={row3Ref}
          className="flex items-center gap-6 sm:gap-8"
          style={{ willChange: 'transform' }}
        >
          {ROW_3.map((skill, i) => (
            <Tile key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
