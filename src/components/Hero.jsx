import { Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { profile, quickStats } from '../data'
import Scene3D from './Scene3D'
import TextScramble from './TextScramble'
import MagneticButton from './MagneticButton'

function getHeroQuality() {
  if (typeof window === 'undefined') return 'medium'

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const narrowScreen = window.innerWidth < 768
  const memory = navigator.deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  const dpr = window.devicePixelRatio || 1

  if (reducedMotion || narrowScreen || coarsePointer || memory <= 3 || cores <= 4) {
    return 'low'
  }

  if (memory >= 8 && cores >= 8 && dpr <= 2) {
    return 'ultra'
  }

  if (memory >= 6 && cores >= 6) {
    return 'high'
  }

  return 'medium'
}

export default function Hero() {
  const heroRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const [flagInput, setFlagInput] = useState('')
  const [flagStatus, setFlagStatus] = useState('idle')
  const [sceneVisible, setSceneVisible] = useState(true)
  const [heroQuality, setHeroQuality] = useState('medium')

  useEffect(() => {
    const updateQuality = () => setHeroQuality(getHeroQuality())
    updateQuality()
    window.addEventListener('resize', updateQuality)
    return () => window.removeEventListener('resize', updateQuality)
  }, [])

  useEffect(() => {
    if (!heroRef.current || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneVisible(entry.isIntersecting)
      },
      { rootMargin: '180px 0px 180px 0px', threshold: 0 },
    )

    observer.observe(heroRef.current)

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (event) => {
    if (!sceneVisible) return

    mousePos.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    }
  }

  const handleFlagSubmit = (event) => {
    event.preventDefault()
    const normalizedFlag = flagInput.trim().toLowerCase()
    setFlagStatus(normalizedFlag === 'key{k3rn3l_70_u1}' ? 'owned' : 'denied')
  }

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="grid-pattern absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(0,212,255,0.18),transparent_34%),radial-gradient(circle_at_48%_52%,rgba(123,97,255,0.14),transparent_28%)]" />

      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-neon-cyan/20 border-t-neon-cyan" />
                <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 30px rgba(0,212,255,0.2)' }} />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-neon-cyan/50">LOADING 3D SCENE</span>
            </div>
          }
        >
          {sceneVisible && <Scene3D mousePos={mousePos} quality={heroQuality} />}
        </Suspense>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.85 }}
        className="absolute left-4 right-4 top-20 z-20 rounded-2xl border border-neon-cyan/15 bg-black/40 p-3 shadow-[0_0_28px_rgba(0,212,255,0.1)] backdrop-blur-xl sm:left-auto sm:right-6 sm:top-24 sm:w-[min(21rem,calc(100vw-2rem))] lg:right-10"
      >
        <form onSubmit={handleFlagSubmit} className="flex items-center gap-2">
          <span className="pl-1 font-mono text-xs text-neon-cyan">$</span>
          <input
            value={flagInput}
            onChange={(event) => {
              setFlagInput(event.target.value)
              setFlagStatus('idle')
            }}
            data-hover
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
            placeholder="Enter Flag Here"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            data-hover
            className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-2 font-mono text-xs text-neon-cyan transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/15"
          >
            run
          </button>
        </form>
        <p className="mt-2 px-1 font-mono text-[10px] leading-relaxed text-text-muted">
          Find the hidden flag somewhere on this site. Format: key{'{...}'}
        </p>
        {flagStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-2 px-1 font-mono text-[11px] ${
              flagStatus === 'owned' ? 'text-matrix-green' : 'text-neon-pink/90'
            }`}
          >
            {flagStatus === 'owned'
              ? 'access granted: you have pwned the portfolio'
              : 'access denied: invalid flag'}
          </motion.div>
        )}
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 sm:py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 shadow-[0_0_35px_rgba(0,212,255,0.08)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            <span className="font-mono text-xs tracking-wider text-neon-cyan/80">
              CYBER-SECURITY NEXUS ONLINE
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mb-3 font-mono text-sm uppercase tracking-[0.32em] text-neon-cyan/80"
          >
            {profile.headline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="mb-6 max-w-5xl text-5xl font-bold leading-[0.94] tracking-tight text-text-primary sm:text-7xl lg:text-8xl"
          >
            <TextScramble
              text="KEYAAN"
              delay={600}
              speed={30}
              className="block"
            />
            <TextScramble
              text="MINHAS"
              delay={900}
              speed={30}
              className="block bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="mb-9 max-w-2xl text-xl leading-relaxed text-text-secondary sm:text-2xl"
          >
            {profile.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton strength={0.3} radius={100}>
              <a
                href="#projects"
                data-hover
                className="magnetic-btn group relative inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-medium text-text-primary transition-all duration-300"
              >
                <Sparkles size={16} className="text-neon-cyan" />
                <span className="relative z-10">Initialize Portfolio</span>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25} radius={80}>
              <a
                href="#contact"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-7 py-3.5 font-mono text-sm text-text-secondary transition-all duration-300 hover:border-neon-cyan/30 hover:text-text-primary"
              >
                <span className="text-neon-cyan">$</span>
                execute contact
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-14 flex flex-wrap gap-3"
          >
            {quickStats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-xs text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(0,212,255,0.08)] backdrop-blur-xl"
              >
                {stat}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted">
            SCROLL
          </span>
          <ChevronDown size={14} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </div>
  )
}
