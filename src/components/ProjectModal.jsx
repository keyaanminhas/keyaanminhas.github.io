import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  X,
  ExternalLink,
  Github,
  Shield,
  Cpu,
  Smartphone,
  Globe,
} from 'lucide-react'

const typeIcons = {
  mobile: Smartphone,
  web: Globe,
  security: Shield,
  compiler: Cpu,
}

export default function ProjectModal({ project, onClose }) {
  const Icon = typeIcons[project.type] || Globe
  const isTerminal = project.type === 'security' || project.type === 'compiler'

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])
  const useWideGallery =
    project.modalImageLayout === 'wide' ||
    (Array.isArray(project.gallery) && project.gallery.length === 1 && project.type === 'web')
  const getImageDisplay = (image) => {
    if (image === project.image && project.modalImageFit) {
      return {
        className: project.modalImageFit === 'contain' ? 'object-contain' : 'object-cover',
        backgroundColor: project.modalImageFit === 'contain' ? '#050505' : undefined,
        objectPosition: project.modalImagePosition || 'center',
      }
    }

    if (image === project.image && project.imageFit === 'contain') {
      return {
        className: 'object-contain',
        backgroundColor: '#050505',
        objectPosition: project.imagePosition || 'center',
      }
    }

    if (image === project.webImage && project.webPreview) {
      return {
        className: project.webPreview.fit === 'contain' ? 'object-contain' : 'object-cover',
        backgroundColor: project.webPreview.fit === 'contain' ? '#050505' : undefined,
        objectPosition: project.webPreview.position || 'center',
      }
    }

    return {
      className: 'object-cover',
      backgroundColor: undefined,
      objectPosition: 'center',
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden px-4 py-8"
      onClick={onClose}
      data-lenis-prevent
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-deep-black/80 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
        data-lenis-prevent
        className={`relative z-10 max-h-[90vh] w-full max-w-3xl overscroll-contain overflow-y-auto rounded-3xl border ${
          isTerminal
            ? 'terminal-card border-neon-green/10'
            : 'glass-strong border-glass-border'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          data-hover
          className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-border-light bg-surface/80 text-text-secondary transition-all hover:border-text-muted hover:text-text-primary"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Top accent */}
        <div
          className="h-1 w-full rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8 flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
              style={{
                borderColor: `${project.accent}25`,
                backgroundColor: `${project.accent}08`,
              }}
            >
              <Icon size={24} style={{ color: project.accent }} />
            </div>
            <div>
              <div
                className="mb-1 font-mono text-[10px] tracking-wider uppercase"
                style={{ color: `${project.accent}80` }}
              >
                {project.category}
              </div>
              <h2 className="text-3xl font-bold text-text-primary">
                {project.title}
              </h2>
            </div>
          </div>

          {project.gallery && (
            <div
              className={
                useWideGallery
                  ? 'mb-8 grid grid-cols-1 gap-3'
                  : 'mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'
              }
            >
              {project.gallery.slice(0, 4).map((image, index) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-xl border border-border bg-surface"
                  style={{ backgroundColor: getImageDisplay(image).backgroundColor }}
                >
                  <img
                    src={image}
                    alt={`${project.title} visual ${index + 1}`}
                    className={`w-full ${useWideGallery ? 'h-auto max-h-[420px]' : 'h-44'} ${getImageDisplay(image).className}`}
                    style={{ objectPosition: getImageDisplay(image).objectPosition }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          )}

          {!project.gallery && project.image && (
            <div className="mb-8 overflow-hidden rounded-xl border border-border bg-surface">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className={`max-h-80 w-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                style={{ objectPosition: project.imagePosition || 'center' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Terminal snippet if applicable */}
          {project.terminalSnippet && (
            <div className="mb-8 overflow-hidden rounded-xl border border-border bg-deep-black/80 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
                </div>
                <span className="font-mono text-[10px] text-text-muted">
                  output
                </span>
              </div>
              <pre
                className="whitespace-pre-wrap font-mono text-xs leading-[1.8]"
                style={{ color: `${project.accent}cc` }}
              >
                {project.terminalSnippet}
              </pre>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="mb-3 font-mono text-xs tracking-wider text-text-muted uppercase">
              Overview
            </h3>
            <p className="leading-relaxed text-text-secondary">
              {project.longDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="mb-3 font-mono text-xs tracking-wider text-text-muted uppercase">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border px-3 py-1.5 font-mono text-xs font-medium"
                  style={{
                    borderColor: `${project.accent}20`,
                    color: `${project.accent}`,
                    backgroundColor: `${project.accent}08`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.links?.map((link, index) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  index === 0
                    ? 'text-deep-black'
                    : 'border border-border-light bg-glass text-text-primary hover:border-text-muted'
                }`}
                style={index === 0 ? { backgroundColor: project.accent } : undefined}
              >
                <ExternalLink size={16} />
                {link.label}
              </a>
            ))}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-glass px-5 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-text-muted"
              >
                <Github size={16} />
                View Source
              </a>
            )}
            {project.liveDemo && !project.links && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-deep-black transition-all duration-300"
                style={{ backgroundColor: project.accent }}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.secondaryDemo && !project.links && (
              <a
                href={project.secondaryDemo}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-glass px-5 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-text-muted"
              >
                <ExternalLink size={16} />
                Secondary Link
              </a>
            )}
            {project.sourceUrl && !project.liveDemo && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-deep-black transition-all duration-300"
                style={{ backgroundColor: project.accent }}
              >
                <ExternalLink size={16} />
                {project.sourceLabel || 'Open Source'}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
