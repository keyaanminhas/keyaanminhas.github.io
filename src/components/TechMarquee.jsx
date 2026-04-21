import { motion } from 'framer-motion'
import { techGroups, techStack } from '../data'

function MarqueeRow({ items, direction = 'left', speed = 30 }) {
  const doubled = [...items, ...items]

  return (
    <div className="group relative flex overflow-hidden py-3">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-deep-black to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-deep-black to-transparent sm:w-32" />

      <div
        className={`flex shrink-0 gap-4 ${
          direction === 'left'
            ? 'animate-marquee-left'
            : 'animate-marquee-right'
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((tech, i) => {
          const color = tech.color || '#00d4ff'
          return (
            <div
              key={`${tech.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border px-5 py-3 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: `${color}15`,
                background: `linear-gradient(135deg, ${color}05 0%, transparent 100%)`,
              }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: `${color}60` }}
              />
              <span className="font-mono text-sm font-medium whitespace-nowrap text-text-secondary">
                {tech.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  const row1 = techStack.filter((_, i) => i % 2 === 0)
  const row2 = techStack.filter((_, i) => i % 2 === 1)

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.16) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 font-mono text-sm tracking-wider text-matrix-green/70">
            {'// 003'}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Tech{' '}
            <span className="bg-gradient-to-r from-matrix-green to-electric-blue bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-text-secondary">
            Languages, frameworks, security methods, and systems tooling that
            support Keyaan's mobile, web, cyber security, and robotics work.
          </p>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="space-y-2"
      >
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={40} />
      </motion.div>

      {/* Category legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mx-auto mt-12 flex flex-wrap justify-center gap-6"
      >
        {techGroups.map((group) => (
          <div key={group.label} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: group.color }}
            />
            <span className="font-mono text-[11px] tracking-wider text-text-muted capitalize">
              {group.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
