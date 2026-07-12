import FadeIn from '../components/FadeIn'
import {
  FeatureCarousel,
  type CarouselStep,
} from '@/components/ui/animated-feature-carousel'

// Unsplash placeholders, swap for real screenshots when ready.
// Update github/live URLs to the real repos and deployments.
const PROJECTS: CarouselStep[] = [
  {
    id: '1',
    name: 'VoxMind',
    title: 'Audio Deepfake Detection',
    description:
      'Real-time voice deepfake detection built for VoxMind that runs fully on-device: spectrogram feature extraction, model distillation, and footprint-gated deployment for real hardware constraints.',
    tech: ['PyTorch', 'ONNX', 'Edge AI'],
    image:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop',
    github: 'https://github.com/',
    live: 'https://voxmind.ai',
  },
  {
    id: '2',
    name: 'MiraclePay',
    title: 'MiraclePay: Agentic Commerce',
    description:
      'LangGraph multi-agent orchestration for autonomous commerce. Agents negotiate checkout, verify payments, and expose their full retrieval-driven reasoning traces end to end.',
    tech: ['LangGraph', 'FastAPI', 'RAG'],
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
    github: 'https://github.com/',
    live: 'https://github.com/',
  },
  {
    id: '3',
    name: 'Try-On AI',
    title: 'AI Virtual Try-On Platform',
    description:
      'Pose-aware garment warping with diffusion-based rendering, plus multimodal embedding search so users can find styles by image, text, or both.',
    tech: ['Diffusion', 'OpenCV', 'Hugging Face'],
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
    github: 'https://github.com/',
    live: 'https://github.com/',
  },
]

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="iridescent-text font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
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
