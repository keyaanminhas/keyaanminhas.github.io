import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUp } from 'lucide-react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import TechMarquee from './components/TechMarquee'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import LoadingScreen from './components/LoadingScreen'
import { projectsData } from './data'

const projectAssetUrls = Array.from(
  new Set(
    projectsData.flatMap((project) => [
      project.image,
      project.webImage,
      ...(project.gallery || []),
    ]).filter(Boolean),
  ),
)

function preloadImage(url) {
  const image = new Image()
  image.decoding = 'async'
  image.loading = 'eager'
  image.fetchPriority = 'low'
  image.src = url

  if (image.decode) {
    return image.decode().catch(() => undefined)
  }

  return new Promise((resolve) => {
    image.onload = resolve
    image.onerror = resolve
  })
}

function scheduleIdleTask(callback) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout: 1200 })
  }

  return window.setTimeout(() => callback({ timeRemaining: () => 16 }), 120)
}

function cancelIdleTask(id) {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id)
    return
  }

  window.clearTimeout(id)
}

function ScrollToTopButton({ onScrollTop }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 520)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          data-hover
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.86, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.86, y: 12 }}
          transition={{ duration: 0.22 }}
          onClick={onScrollTop}
          className="fixed bottom-6 right-6 z-[120] flex h-12 w-12 items-center justify-center rounded-xl border border-neon-cyan/25 bg-black/55 text-neon-cyan shadow-[0_0_28px_rgba(0,212,255,0.16)] backdrop-blur-xl transition-colors hover:border-neon-cyan/45 hover:bg-neon-cyan/10"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  // Lenis smooth scroll, kept lightweight and cleaned up explicitly.
  useEffect(() => {
    if (isLoading) return undefined
    if (!window.matchMedia('(hover: hover)').matches) return undefined

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
    })
    lenisRef.current = lenis
    let rafId = null

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isLoading])

  useEffect(() => {
    if (!lenisRef.current) return

    if (selectedProject) {
      lenisRef.current.stop()
      return
    }

    lenisRef.current.start()
  }, [selectedProject])

  // Warm project imagery during idle time so scrolling into the grid does less decode work.
  useEffect(() => {
    if (isLoading) return undefined

    let cancelled = false
    let assetIndex = 0
    let idleId = null

    const preloadBatch = (deadline) => {
      if (cancelled) return

      let warmedThisFrame = 0
      while (
        assetIndex < projectAssetUrls.length &&
        warmedThisFrame < 3 &&
        (deadline.timeRemaining() > 4 || deadline.didTimeout)
      ) {
        preloadImage(projectAssetUrls[assetIndex])
        assetIndex += 1
        warmedThisFrame += 1
      }

      if (assetIndex < projectAssetUrls.length) {
        idleId = scheduleIdleTask(preloadBatch)
      }
    }

    idleId = scheduleIdleTask(preloadBatch)

    return () => {
      cancelled = true
      if (idleId !== null) {
        cancelIdleTask(idleId)
      }
    }
  }, [isLoading])

  const handleScrollTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.05 })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="noise-bg relative min-h-screen overflow-x-hidden bg-deep-black">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />

          <main>
            <section id="hero">
              <Hero />
            </section>

            <section id="projects" className="perf-section">
              <Projects onProjectSelect={setSelectedProject} />
            </section>

            <section id="tech" className="perf-section">
              <TechMarquee />
            </section>

            <section id="timeline" className="perf-section">
              <Timeline />
            </section>

            <section id="contact" className="perf-section">
              <Contact />
            </section>
          </main>

          <Footer />
          <ScrollToTopButton onScrollTop={handleScrollTop} />

          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default App
