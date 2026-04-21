import { memo, useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { projectsData, filterCategories } from '../data'
import ProjectCard from './ProjectCard'
import TerminalCard from './TerminalCard'
import MagneticButton from './MagneticButton'

const FEATURED_PROJECT_IDS = new Set(['minhas-lms', 'reverse-shell-loader'])
const isTerminalType = (type) => type === 'security' || type === 'compiler'

const ProjectGridItem = memo(function ProjectGridItem({ project, index, onProjectSelect }) {
  const handleSelect = useCallback(() => {
    onProjectSelect(project)
  }, [onProjectSelect, project])

  const isLarge = FEATURED_PROJECT_IDS.has(project.id)
  const spanClass = isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: -20, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: 0.1 * (index % 3),
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }}
      style={{
        transformOrigin: 'top center',
        perspective: 1000,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      className={`${spanClass} transform-gpu will-change-transform`}
    >
      {isTerminalType(project.type) ? (
        <TerminalCard project={project} onClick={handleSelect} />
      ) : (
        <ProjectCard project={project} onClick={handleSelect} />
      )}
    </motion.div>
  )
})

export default function Projects({ onProjectSelect }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const handleFilterChange = useCallback((category) => {
    setActiveFilter(category)
  }, [])

  const filteredProjects = useMemo(() => (
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter)
  ), [activeFilter])

  return (
    <div className="relative py-28">
      <div className="absolute right-0 top-0 h-[620px] w-[620px] bg-[radial-gradient(circle,rgba(0,212,255,0.16),transparent_68%)] opacity-80" />
      <div className="absolute left-0 top-1/3 h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(123,97,255,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="mb-4 font-mono text-sm tracking-wider text-matrix-green/70">
            {'// 002'}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Project{' '}
            <span className="bg-gradient-to-r from-matrix-green to-electric-blue bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="max-w-2xl text-text-secondary">
            A bento-grid map of Keyaan's work across mobile apps, education web
            platforms, reverse engineering, and compiler design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="sticky top-20 z-30 mb-10"
        >
          <div className="glass-strong inline-flex max-w-full flex-wrap gap-1 rounded-2xl p-1.5">
            {filterCategories.map((category) => (
              <MagneticButton key={category} strength={0.2} radius={50} as="div">
                <button
                  type="button"
                  onClick={() => handleFilterChange(category)}
                  data-hover
                  className={`relative rounded-xl px-4 py-2.5 font-mono text-[11px] font-medium tracking-wider transition-colors duration-300 sm:px-5 ${
                    activeFilter === category
                      ? 'text-deep-black'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {activeFilter === category && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-xl bg-matrix-green shadow-[0_0_22px_rgba(0,255,136,0.22)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        <div className="grid auto-rows-[minmax(330px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectGridItem
              key={project.id}
              project={project}
              index={index}
              onProjectSelect={onProjectSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
