import FadeIn from '../components/FadeIn'
import {
  FeatureCarousel,
  type CarouselStep,
} from '@/components/ui/animated-feature-carousel'

// Unsplash placeholders, swap for real screenshots when ready.
// Image positions stay in the right half so they never overlap the text.
const PROJECTS: CarouselStep[] = [
  {
    id: '1',
    name: 'VoxMind',
    category: 'Edge AI / Voice Biometrics · Client',
    title: 'Audio Deepfake Detection @ VoxMind',
    description:
      'Real-time deepfake detection that runs on-device: spectrogram feature extraction, model distillation, ONNX export, and footprint-gated deployment for real hardware constraints.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop',
        className: 'w-[26%] left-[52%] top-[6%] h-[46%]',
        preset: 'slideInLeft',
      },
      {
        src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
        className: 'w-[24%] left-[74%] top-[40%] h-[52%]',
        preset: 'slideInRight',
        delay: 0.1,
      },
    ],
  },
  {
    id: '2',
    name: 'MiraclePay',
    category: 'Multi-Agent Systems / Fintech AI · Personal',
    title: 'MiraclePay: Agentic Commerce',
    description:
      'LangGraph multi-agent orchestration for autonomous commerce. Agents negotiate checkout, verify payments, and expose their full retrieval-driven reasoning traces end to end.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
        className: 'w-[26%] left-[52%] top-[8%] h-[48%]',
        preset: 'fadeInScale',
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        className: 'w-[26%] left-[72%] top-[44%] h-[48%]',
        preset: 'fadeInScale',
        delay: 0.1,
      },
    ],
  },
  {
    id: '3',
    name: 'Try-On AI',
    category: 'Computer Vision / Generative Modeling · Personal',
    title: 'AI Virtual Try-On & Fashion Platform',
    description:
      'Pose-aware garment warping with diffusion-based rendering, plus multimodal embedding search so users can find styles by image, text, or both.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
        className: 'w-[38%] left-[56%] top-[8%] h-[84%]',
        preset: 'fadeInScale',
      },
    ],
  },
]

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      <FadeIn>
        <FeatureCarousel steps={PROJECTS} />
      </FadeIn>
    </section>
  )
}
