import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-deep-black"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle circuit grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.08),transparent_60%)]" />

      {/* Glowing core */}
      <div className="relative mb-8">
        <motion.div
          className="h-16 w-16 rounded-full will-change-transform"
          style={{
            background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
            boxShadow: '0 0 60px rgba(0,212,255,0.4), 0 0 120px rgba(0,212,255,0.15)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-neon-cyan/30 will-change-transform"
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-neon-cyan/20 will-change-transform"
          animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        className="font-mono text-sm tracking-[0.3em] text-neon-cyan/70"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        INITIALIZING SYSTEM
      </motion.div>

      {/* Progress bar */}
      <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}
