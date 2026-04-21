import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Github, Mail, Terminal } from 'lucide-react'
import { profile, projectsData, techGroups } from '../data'

const bootLines = [
  { text: '$ boot contact-shell', type: 'command' },
  { text: 'keyaan-minhas@portfolio: session ready', type: 'output' },
  { text: 'type "help" to list commands', type: 'output' },
]

const commandHelp = [
  ['help', 'Show this command reference'],
  ['ls', 'List files in the current directory'],
  ['cat <file>', 'Print a file, for example cat flag.txt'],
  ['about', 'Print profile summary'],
  ['projects', 'List portfolio projects'],
  ['skills', 'List technical skills'],
  ['contact', 'Print email, phone, and links'],
  ['email', 'Open a mailto draft'],
  ['github', 'Open GitHub profile'],
  ['linkedin', 'Open LinkedIn profile'],
  ['instagram', 'Open Instagram profile'],
  ['discord', 'Print Discord username'],
  ['clear', 'Clear terminal output'],
]

const virtualFiles = {
  'about.md': [
    '# Keyaan Minhas',
    'Computer Science and Cyber Security undergraduate building mobile apps, web platforms, security tooling, compilers, and automation systems.',
  ],
  'projects.txt': projectsData.map((project) => `${project.category} :: ${project.title}`),
  'skills.txt': techGroups.map((group) => `${group.label}: ${group.items.join(', ')}`),
  'contact.json': [
    `{`,
    `  "email": "${profile.email}",`,
    `  "github": "${profile.github}",`,
    `  "linkedin": "${profile.linkedin}",`,
    `  "instagram": "${profile.instagram}",`,
    `  "discord": "${profile.discord}"`,
    `}`,
  ],
  'flag.txt': [
    'key{k3rn3l_70_u1}',
    'Submit this flag in the access check near the top of the website.',
  ],
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [booted, setBooted] = useState(false)
  const terminalRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || booted) return
        setBooted(true)

        bootLines.forEach((line, index) => {
          setTimeout(() => {
            setHistory((prev) => [...prev, line])
          }, index * 260)
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [booted])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const openEmail = () => {
    window.location.href = `mailto:${profile.email}?subject=Portfolio inquiry for Keyaan Minhas`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase()
    if (!command) return

    const [program, ...args] = command.split(/\s+/)
    const promptLine = { text: `$ ${rawCommand}`, type: 'command' }
    let output = []

    switch (program) {
      case 'help':
        output = [
          { text: 'COMMAND           | DESCRIPTION', type: 'header' },
          { text: '------------------|------------------------------------------', type: 'muted' },
          ...commandHelp.map(([name, description]) => ({
            text: `${name.padEnd(18, ' ')}| ${description}`,
            type: 'help',
          })),
        ]
        break
      case 'ls':
        output = Object.keys(virtualFiles).map((file) => ({
          text: file,
          type: file === 'flag.txt' ? 'header' : 'output',
        }))
        break
      case 'cat': {
        const fileName = args[0]
        if (!fileName) {
          output = [
            { text: 'usage: cat <file>', type: 'error' },
            { text: 'try: cat flag.txt', type: 'output' },
          ]
          break
        }

        const file = virtualFiles[fileName]
        output = file
          ? file.map((text) => ({ text, type: fileName === 'flag.txt' ? 'header' : 'output' }))
          : [
              { text: `cat: ${fileName}: No such file`, type: 'error' },
              { text: 'run "ls" to see available files', type: 'output' },
            ]
        break
      }
      case 'about':
        output = [
          { text: profile.name, type: 'output' },
          { text: profile.headline, type: 'output' },
          { text: profile.summary, type: 'output' },
        ]
        break
      case 'projects':
        output = projectsData.map((project) => ({
          text: `${project.category} :: ${project.title}`,
          type: 'output',
        }))
        break
      case 'skills':
        output = techGroups.map((group) => ({
          text: `${group.label}: ${group.items.join(', ')}`,
          type: 'output',
        }))
        break
      case 'contact':
        output = [
          { text: `email: ${profile.email}`, type: 'output' },
          { text: `phone: ${profile.phone}`, type: 'output' },
          { text: `location: ${profile.location}`, type: 'output' },
          { text: `github: ${profile.github}`, type: 'output' },
          { text: `linkedin: ${profile.linkedin}`, type: 'output' },
          { text: `instagram: ${profile.instagram}`, type: 'output' },
          { text: `discord: ${profile.discord}`, type: 'output' },
        ]
        break
      case 'email':
        openEmail()
        output = [{ text: `opening mailto:${profile.email}`, type: 'output' }]
        break
      case 'github':
        window.open(profile.github, '_blank', 'noopener,noreferrer')
        output = [{ text: 'opening GitHub profile', type: 'output' }]
        break
      case 'linkedin':
        window.open(profile.linkedin, '_blank', 'noopener,noreferrer')
        output = [{ text: 'opening LinkedIn profile', type: 'output' }]
        break
      case 'instagram':
        window.open(profile.instagram, '_blank', 'noopener,noreferrer')
        output = [{ text: 'opening Instagram profile', type: 'output' }]
        break
      case 'discord':
        output = [{ text: `discord: ${profile.discord}`, type: 'output' }]
        break
      case 'whoami':
        output = [{ text: 'root', type: 'output' }]
        break
      case 'pwd':
        output = [{ text: '/home/keyaan/portfolio', type: 'output' }]
        break
      case 'sudo':
        output = [
          { text: 'keyaan is not in the sudoers file. This incident will be reported.', type: 'error' },
        ]
        break
      case 'hack':
        output = [
          { text: 'ACCESS DENIED.', type: 'error' },
          { text: 'INITIATING REVERSE TRACE...', type: 'error' },
          { text: 'IP ADDRESS LOGGED.', type: 'error' },
        ]
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        output = [
          { text: `command not found: ${command}`, type: 'error' },
          { text: 'try "help" or "ls"', type: 'output' },
        ]
        break
    }

    setHistory((prev) => [...prev, promptLine, ...output])
    setInput('')
  }

  return (
    <div ref={sectionRef} className="relative py-28">
      <div className="absolute bottom-0 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,255,136,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 font-mono text-sm tracking-wider text-matrix-green/70">
            {'// 005'}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Interactive{' '}
            <span className="bg-gradient-to-r from-matrix-green to-electric-blue bg-clip-text text-transparent">
              Terminal
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-text-secondary">
            Type commands like help, ls, cat flag.txt, projects, skills,
            contact, email, github, linkedin, or clear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="terminal-card overflow-hidden rounded-2xl"
        >
          <div className="flex items-center justify-between border-b border-matrix-green/10 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]/70" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]/70" />
              </div>
              <span className="font-mono text-[11px] text-text-muted">
                portfolio-terminal
              </span>
            </div>
            <Terminal size={15} className="text-matrix-green/70" />
          </div>

          <div className="p-6 sm:p-8">
            <div
              ref={terminalRef}
              className="h-80 overflow-y-auto rounded-xl border border-matrix-green/10 bg-black/35 p-4"
              onClick={() => document.getElementById('terminal-input')?.focus()}
            >
              <div className="space-y-1">
                {history.map((line, index) => (
                  <motion.div
                    key={`${line.text}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`font-mono text-sm leading-relaxed ${
                      line.type === 'command'
                        ? 'text-matrix-green/90'
                        : line.type === 'header'
                          ? 'text-neon-cyan'
                          : line.type === 'muted'
                            ? 'text-text-muted'
                            : line.type === 'help'
                              ? 'text-text-primary'
                        : line.type === 'error'
                          ? 'text-neon-pink/90'
                          : 'text-text-secondary'
                    }`}
                  >
                    {line.text}
                  </motion.div>
                ))}

                <form
                  className="flex items-center gap-2 pt-2 font-mono text-sm"
                  onSubmit={(event) => {
                    event.preventDefault()
                    runCommand(input)
                  }}
                >
                  <span className="text-glow-green text-matrix-green">$</span>
                  <input
                    id="terminal-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-muted"
                    placeholder="help"
                    autoComplete="off"
                    spellCheck="false"
                    data-hover
                  />
                  <span className="animate-blink text-glow-green text-matrix-green">█</span>
                </form>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openEmail}
                data-hover
                className="inline-flex items-center gap-2 rounded-xl bg-matrix-green px-5 py-3 font-mono text-sm font-semibold text-deep-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.22)]"
              >
                <Mail size={16} />
                execute email
              </button>

              <button
                type="button"
                onClick={handleCopy}
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-matrix-green/20 bg-matrix-green/5 px-5 py-3 font-mono text-sm text-matrix-green/85 transition-all duration-300 hover:border-matrix-green/35 hover:bg-matrix-green/10"
              >
                {copied ? <Check size={16} /> : <Mail size={16} />}
                {copied ? 'copied' : profile.email}
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-electric-blue/20 bg-electric-blue/5 px-5 py-3 font-mono text-sm text-electric-blue transition-all duration-300 hover:border-electric-blue/35 hover:bg-electric-blue/10"
              >
                <Github size={16} />
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-neon-purple/20 bg-neon-purple/5 px-5 py-3 font-mono text-sm text-neon-purple transition-all duration-300 hover:border-neon-purple/35 hover:bg-neon-purple/10"
              >
                LinkedIn
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-neon-pink/20 bg-neon-pink/5 px-5 py-3 font-mono text-sm text-neon-pink transition-all duration-300 hover:border-neon-pink/35 hover:bg-neon-pink/10"
              >
                Instagram
              </a>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(profile.discord)}
                data-hover
                className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-glass px-5 py-3 font-mono text-sm text-text-secondary transition-all duration-300 hover:border-text-muted hover:text-text-primary"
              >
                Discord: {profile.discord}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
