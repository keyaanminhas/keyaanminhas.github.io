import { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { Cpu, Github, Shield } from 'lucide-react'

const springConfig = {
  stiffness: 260,
  damping: 28,
  mass: 0.35,
}

function TerminalCard({ project, onClick }) {
  const cardRef = useRef(null)
  const boundsRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const typingIntervalRef = useRef(null)
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const rotateX = useSpring(rotateXValue, springConfig)
  const rotateY = useSpring(rotateYValue, springConfig)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [glitch, setGlitch] = useState(false)

  const cacheBounds = useCallback((event) => {
    if (event.pointerType === 'touch' || !cardRef.current) return
    boundsRef.current = cardRef.current.getBoundingClientRect()
  }, [])

  const updateTilt = useCallback(() => {
    frameRef.current = null
    const { x, y } = pointerRef.current

    rotateXValue.set((y - 0.5) * -8)
    rotateYValue.set((x - 0.5) * 8)
  }, [rotateXValue, rotateYValue])

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
  }, [rotateXValue, rotateYValue])

  const handlePointerEnter = useCallback((event) => {
    cacheBounds(event)
    if (event.pointerType === 'touch') return

    if (project.terminalSnippet && !isTyping) {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)

      setIsTyping(true)
      setDisplayedText('')
      let i = 0
      const text = project.terminalSnippet
      typingIntervalRef.current = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1))
          i += 1
        } else {
          clearInterval(typingIntervalRef.current)
          typingIntervalRef.current = null
          setIsTyping(false)
        }
      }, 8)
    }
  }, [cacheBounds, isTyping, project.terminalSnippet])

  useEffect(() => {
    if (project.terminalSnippet) {
      setDisplayedText(project.terminalSnippet)
    }
  }, [project.terminalSnippet])

  useEffect(() => () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }
  }, [])

  const Icon = project.type === 'security' ? Shield : Cpu
  const accentColor = project.accent

  return (
    <motion.div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
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
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-xl shadow-black/30 transition-opacity duration-500 group-hover:opacity-100 will-change-[opacity]" />

      <div className="terminal-card scanline relative h-full overflow-hidden rounded-2xl">
        <div
          className="absolute left-0 right-0 top-0 h-px opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.015] transition-opacity duration-500 group-hover:opacity-[0.04]">
          <div className="animate-matrix-scroll select-none break-all font-mono text-[10px] leading-[14px] text-matrix-green">
            {'01001001 01101110 01101001 01110100 00100000 '.repeat(140)}
          </div>
        </div>

        <div className="relative flex h-full flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]/70" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]/70" />
            </div>
            <span
              className="truncate font-mono text-[11px] tracking-wider"
              style={{ color: `${accentColor}95` }}
            >
              {project.terminalPrompt || 'keyaan@systems:~$'}
            </span>
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              onClick={(event) => event.stopPropagation()}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-light/50 text-text-muted transition-all hover:text-text-primary"
              style={{ borderColor: `${accentColor}20` }}
            >
              <Github size={15} />
            </a>
          )}
        </div>

        <div className="mb-6 flex-1 overflow-hidden rounded-xl border border-border/50 bg-deep-black/70 p-4">
          <pre
            className={`text-glow-terminal whitespace-pre-wrap text-[11px] leading-[1.7] ${glitch ? 'animate-glitch' : ''}`}
            style={{ color: `${accentColor}cc` }}
          >
            {displayedText}
            <span className="animate-blink" style={{ color: accentColor }}>
              █
            </span>
          </pre>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <Icon size={14} style={{ color: accentColor }} />
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: `${accentColor}90` }}
            >
              {project.category}
            </span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-text-primary transition-colors group-hover:text-white">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-md border px-2 py-0.5 font-mono text-[10px]"
                style={{
                  borderColor: `${accentColor}20`,
                  color: `${accentColor}95`,
                  backgroundColor: `${accentColor}08`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(TerminalCard)
