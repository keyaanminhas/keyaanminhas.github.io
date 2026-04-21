import { motion } from 'framer-motion'
import { BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { timelineItems } from '../data'

export default function Timeline() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="mb-4 font-mono text-sm tracking-wider text-matrix-green/70">
            {'// 004'}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Experience &{' '}
            <span className="bg-gradient-to-r from-matrix-green to-electric-blue bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="max-w-2xl text-text-secondary">
            A practical path through shipped apps, web platforms, automation
            work, cyber security study, and systems-focused engineering.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-electric-blue/0 via-electric-blue/35 to-matrix-green/0 sm:left-1/2" />

          <div className="space-y-6">
            {timelineItems.map((item, index) => {
              const Icon = item.type === 'Education' ? GraduationCap : BriefcaseBusiness
              const alignRight = index % 2 === 1

              return (
                <motion.div
                  key={`${item.title}-${item.organization}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className={`relative grid gap-5 pl-12 sm:grid-cols-2 sm:pl-0 ${
                    alignRight ? 'sm:[&>div:first-child]:col-start-2' : ''
                  }`}
                >
                  <div
                    className="absolute left-4 top-8 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border bg-deep-black sm:left-1/2"
                    style={{
                      borderColor: `${item.accent}55`,
                      boxShadow: `0 0 24px ${item.accent}22`,
                    }}
                  >
                    <Icon size={16} style={{ color: item.accent }} />
                  </div>

                  <div
                    className={`glass-card rounded-2xl p-6 ${
                      alignRight ? 'sm:col-start-2' : 'sm:col-start-1'
                    }`}
                  >
                    <div
                      className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: item.accent }}
                    >
                      {item.type}
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
                      <span>{item.organization}</span>
                      {item.period && <span>{item.period}</span>}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
