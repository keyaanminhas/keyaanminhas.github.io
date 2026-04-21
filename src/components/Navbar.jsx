import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Terminal, X } from 'lucide-react'
import { profile } from '../data'

const navLinks = [
  { label: 'Stack', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="group flex items-center gap-2.5" data-hover>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-electric-blue/20 bg-electric-blue/5 transition-all duration-300 group-hover:border-matrix-green/40 group-hover:bg-matrix-green/10 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.16)]">
            <Terminal size={18} className="text-electric-blue group-hover:text-matrix-green" />
          </div>
          <span className="font-mono text-sm font-medium tracking-wider text-text-secondary transition-colors group-hover:text-matrix-green">
            keyaan.work.gd
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-hover
              className="relative px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary"
            >
              <span className="mr-1 font-mono text-text-muted">{'>'}</span>
              {link.label}
            </a>
          ))}

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="ml-4 rounded-lg border border-border-light bg-glass px-4 py-2 font-mono text-xs font-medium text-electric-blue transition-all duration-300 hover:border-electric-blue/30 hover:bg-electric-blue/5 hover:shadow-[0_0_20px_rgba(0,212,255,0.12)]"
          >
            GitHub
          </a>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-light md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-hover
          aria-label="Toggle menu"
          type="button"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 font-mono text-sm text-text-secondary transition-colors hover:bg-glass-hover hover:text-text-primary"
                >
                  <span className="mr-2 text-matrix-green">$</span>
                  {link.label.toLowerCase()}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
