import { memo, useCallback, useMemo, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { ExternalLink, Github, Globe, Smartphone } from 'lucide-react'

const iconMap = {
  mobile: Smartphone,
  web: Globe,
}

const springConfig = {
  stiffness: 260,
  damping: 28,
  mass: 0.35,
}

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null)
  const boundsRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const glareX = useMotionValue(0)
  const glareY = useMotionValue(0)
  const rotateX = useSpring(rotateXValue, springConfig)
  const rotateY = useSpring(rotateYValue, springConfig)

  const cacheBounds = useCallback((event) => {
    if (event.pointerType === 'touch' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    boundsRef.current = rect
    glareX.set(rect.width / 2)
    glareY.set(rect.height / 2)
  }, [glareX, glareY])

  const updateTilt = useCallback(() => {
    frameRef.current = null
    const rect = boundsRef.current
    if (!rect) return

    const { x, y } = pointerRef.current
    rotateXValue.set((y - 0.5) * -12)
    rotateYValue.set((x - 0.5) * 12)
    glareX.set(x * rect.width)
    glareY.set(y * rect.height)
  }, [glareX, glareY, rotateXValue, rotateYValue])

  const handlePointerMove = useCallback((event) => {
    if (event.pointerType === 'touch') return
    const rect = boundsRef.current
    if (!rect) return

    pointerRef.current = {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    }

    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(updateTilt)
    }
  }, [updateTilt])

  const handlePointerLeave = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    boundsRef.current = null
    pointerRef.current = { x: 0.5, y: 0.5 }
    rotateXValue.set(0)
    rotateYValue.set(0)
    glareX.set(0)
    glareY.set(0)
  }, [glareX, glareY, rotateXValue, rotateYValue])

  const isApp = project.type === 'mobile'
  const hasGallery = Array.isArray(project.gallery) && project.gallery.length > 0
  const Icon = iconMap[project.type] || Globe
  const accentColor = project.accent
  const imageFitClass = project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
  const imageBackground = project.imageFit === 'contain' ? '#050505' : undefined
  const webPreview = project.webPreview || {}
  const webImageFitClass = webPreview.fit === 'contain' ? 'object-contain' : 'object-cover'
  const accentBorderStyle = useMemo(
    () => ({
      background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
    }),
    [accentColor],
  )
  const cardSurfaceStyle = useMemo(
    () => ({
      borderColor: hexToRgba(accentColor, 0.14),
      background: `
        linear-gradient(135deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015)),
        radial-gradient(circle at 20% 0%, ${hexToRgba(accentColor, 0.12)}, transparent 36%)
      `,
    }),
    [accentColor],
  )

  return (
    <motion.div
      ref={cardRef}
      onPointerEnter={cacheBounds}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      data-hover
      className="group relative h-full cursor-pointer rounded-2xl transform-gpu will-change-transform"
      transformTemplate={(_, generated) => `${generated} translateZ(0)`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-xl shadow-black/20 transition-opacity duration-500 group-hover:opacity-100 will-change-[opacity]" />

      <div className="glass-card relative h-full overflow-hidden rounded-2xl" style={cardSurfaceStyle}>
        {/* Glare effect */}
        <motion.div
          className="pointer-events-none absolute z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_62%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            x: glareX,
            y: glareY,
            willChange: 'transform, opacity',
          }}
        />

        {/* Top accent border */}
        <div
          className="absolute top-0 right-0 left-0 h-[2px] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={accentBorderStyle}
        />

        <div className="relative flex h-full flex-col p-6 sm:p-8">
        {/* Header Row */}
        <div className="mb-6 flex items-start justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300"
            style={{
              borderColor: `${accentColor}25`,
              backgroundColor: `${accentColor}08`,
            }}
          >
            <Icon size={20} style={{ color: accentColor }} />
          </div>

          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                onClick={(e) => e.stopPropagation()}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-light text-text-muted transition-all hover:border-text-secondary hover:text-text-primary"
              >
                <Github size={15} />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                onClick={(e) => e.stopPropagation()}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-light text-text-muted transition-all hover:border-text-secondary hover:text-text-primary"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <div className="mb-6 flex-1">
          {isApp && hasGallery ? (
            <div
              className="relative overflow-hidden rounded-xl border bg-surface p-3"
              style={{
                minHeight: webPreview.minHeight || 250,
                borderColor: `${accentColor}18`,
              }}
            >
              {project.webImage && (
                <div
                  className="absolute inset-x-3 top-3 overflow-hidden rounded-lg border border-white/10 opacity-80 shadow-2xl shadow-black/30"
                  style={{
                    height: webPreview.height || 172,
                    backgroundColor: webPreview.fit === 'contain' ? '#050505' : undefined,
                  }}
                >
                  <img
                    src={project.webImage}
                    alt={`${project.title} web preview`}
                    className={`h-full w-full transform-gpu ${webImageFitClass}`}
                    style={{ objectPosition: webPreview.position || 'center' }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/70 via-deep-black/10 to-transparent" />
                </div>
              )}
              <div
                className="relative z-10 flex justify-center gap-3"
                style={{
                  paddingTop:
                    webPreview.phoneOffset ||
                    (webPreview.height ? Math.max(72, webPreview.height - 70) : 48),
                }}
              >
                {project.gallery
                  .filter((image) => image !== project.webImage)
                  .slice(0, 2)
                  .map((image, index) => (
                    <div
                      key={image}
                      className={`relative h-44 w-20 overflow-hidden rounded-[1.1rem] border-2 bg-surface shadow-2xl shadow-black/40 sm:h-52 sm:w-24 sm:rounded-[1.25rem] ${
                        index === 1 ? 'mt-7 hidden sm:block' : ''
                      }`}
                      style={{ borderColor: `${accentColor}35` }}
                    >
                      <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/65" />
                      <img
                        src={image}
                        alt={`${project.title} mobile screenshot ${index + 1}`}
                        className="h-full w-full transform-gpu object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                    </div>
                  ))}
              </div>
              <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/55 px-2 py-1 font-mono text-[10px] text-text-secondary backdrop-blur-md">
                mobile + web
              </div>
            </div>
          ) : project.image ? (
            <div
              className="overflow-hidden rounded-xl border bg-surface"
              style={{ borderColor: `${accentColor}18`, backgroundColor: imageBackground }}
            >
              <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
                </div>
                <div className="ml-2 min-w-0 flex-1 rounded-md bg-border/30 px-3 py-1">
                  <span className="block truncate font-mono text-[10px] text-text-muted">
                    {project.sourceUrl || 'keyaanminhas.github.io'}
                  </span>
                </div>
              </div>
              <div className="relative h-44 overflow-hidden group">
                <div className="absolute inset-0 z-20 h-full w-full -translate-y-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent transition-opacity duration-300 group-hover:animate-scanline" />
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className={`h-full w-full transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:scale-105 ${imageFitClass}`}
                  style={{ objectPosition: project.imagePosition || 'center' }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-deep-black/90 via-transparent to-transparent" />
                {project.sourceLabel && (
                  <div className="absolute bottom-3 left-3 z-30 rounded-md border border-white/10 bg-black/55 px-2 py-1 font-mono text-[10px] text-text-secondary backdrop-blur-md">
                    {project.sourceLabel}
                  </div>
                )}
              </div>
            </div>
          ) : isApp ? (
            <div className="flex items-center justify-center py-4">
              <div
                className="relative h-48 w-24 rounded-2xl border-2 p-1.5"
                style={{
                  borderColor: `${accentColor}20`,
                  background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)',
                }}
              >
                {/* Notch */}
                <div className="mx-auto mb-2 h-1.5 w-8 rounded-full bg-border-light" />
                {/* Screen content lines */}
                <div className="space-y-2 px-1">
                  <div
                    className="h-2 w-full rounded-sm opacity-30"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="h-2 w-3/4 rounded-sm bg-border-light" />
                  <div className="h-2 w-1/2 rounded-sm bg-border-light" />
                  <div className="mt-3 h-6 w-full rounded-md bg-border-light/50" />
                  <div className="h-6 w-full rounded-md bg-border-light/50" />
                  <div className="h-6 w-2/3 rounded-md bg-border-light/50" />
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-border-light" />
              </div>
            </div>
          ) : (
            <div
              className="overflow-hidden rounded-xl border"
              style={{
                borderColor: `${accentColor}15`,
                background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)',
              }}
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
                </div>
                <div className="ml-2 flex-1 rounded-md bg-border/30 px-3 py-1">
                  <span className="font-mono text-[10px] text-text-muted">
                    keyaanminhas.github.io
                  </span>
                </div>
              </div>
              <div className="space-y-2.5 p-4">
                <div
                  className="h-2.5 w-2/3 rounded-sm opacity-30"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="h-2.5 w-full rounded-sm bg-border-light/50" />
                <div className="h-2.5 w-4/5 rounded-sm bg-border-light/50" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-md bg-border-light/30" />
                  <div className="h-12 rounded-md bg-border-light/30" />
                  <div className="h-12 rounded-md bg-border-light/30" />
                </div>
                <div className="h-16 rounded-md bg-border-light/20" />
              </div>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <div className="mb-1 font-mono text-[10px] tracking-wider text-text-muted uppercase">
            {project.category}
          </div>
          <h3 className="mb-2 text-xl font-semibold text-text-primary transition-colors group-hover:text-white">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>

          {project.links ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-light/35 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted transition-colors hover:border-neon-cyan/35 hover:text-neon-cyan"
                >
                  <ExternalLink size={11} />
                  {link.label}
                </a>
              ))}
            </div>
          ) : project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              onClick={(event) => event.stopPropagation()}
              className="mb-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted transition-colors hover:text-neon-cyan"
            >
              <ExternalLink size={12} />
              {project.sourceLabel || 'Source'}
            </a>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-light/50 px-2 py-0.5 font-mono text-[10px] text-text-muted"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProjectCard)
