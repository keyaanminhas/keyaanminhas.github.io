import { Github, Instagram, Linkedin, Terminal } from 'lucide-react'
import { profile } from '../data'

const socials = [
  { icon: Github, href: profile.github, label: 'GitHub' },
  profile.linkedin && { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  profile.instagram && { icon: Instagram, href: profile.instagram, label: 'Instagram' },
].filter(Boolean)

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-electric-blue/15 bg-electric-blue/5">
              <Terminal size={14} className="text-electric-blue" />
            </div>
            <span className="font-mono text-sm text-text-muted">
              keyaanminhas.github.io
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light text-text-muted transition-all duration-300 hover:border-electric-blue/35 hover:text-text-primary hover:shadow-[0_0_15px_rgba(0,212,255,0.1)]"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

          <div className="font-mono text-xs text-text-muted">
            <span className="text-electric-blue/50">C</span>{' '}
            {new Date().getFullYear()}{' '}
            <span className="text-text-secondary">{profile.name}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-matrix-green opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-matrix-green" />
            </span>
            <span className="font-mono text-[10px] tracking-wider text-text-muted">
              React + Three.js + Framer Motion + GitHub Pages root deployment
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
