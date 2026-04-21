/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#050505',
        'surface': '#0a0a0f',
        'surface-light': '#111118',
        'border': '#1a1a2e',
        'border-light': '#2a2a3e',
        'text-primary': '#e4e4e7',
        'text-secondary': '#71717a',
        'text-muted': '#3f3f46',
        'neon-cyan': '#00d4ff',
        'neon-green': '#00ff88',
        'electric-blue': '#00d4ff',
        'matrix-green': '#00ff88',
        'neon-purple': '#7b61ff',
        'neon-orange': '#ff6b35',
        'neon-pink': '#ff2d78',
        'glass': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.06)',
        'glass-hover': 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      zIndex: {
        '30': '30',
      },
    },
  },
  plugins: [],
}
