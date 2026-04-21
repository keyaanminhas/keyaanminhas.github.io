import { useCallback, useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}|/\\'

/**
 * Hacker-style text scramble that decrypts character by character.
 * Each character cycles through random glyphs before resolving.
 */
export default function TextScramble({
  text,
  delay = 0,
  speed = 35,
  className = '',
  as: Tag = 'span',
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const frameRef = useRef(null)

  const scramble = useCallback(() => {
    let iteration = 0
    const totalLength = text.length
    const maxIterations = totalLength * 3

    const tick = () => {
      const resolved = Math.floor(iteration / 3)
      let result = ''

      for (let i = 0; i < totalLength; i++) {
        if (i < resolved) {
          result += text[i]
        } else if (text[i] === ' ') {
          result += ' '
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }

      setDisplayed(result)
      iteration++

      if (iteration <= maxIterations) {
        frameRef.current = setTimeout(tick, speed)
      } else {
        setDisplayed(text)
      }
    }

    tick()
  }, [text, speed])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true)
      scramble()
    }, delay)

    return () => {
      clearTimeout(timer)
      if (frameRef.current) clearTimeout(frameRef.current)
    }
  }, [delay, scramble])

  if (!started) {
    // Render invisible placeholder to prevent layout shift
    return <Tag className={className} style={{ visibility: 'hidden' }}>{text}</Tag>
  }

  return <Tag className={className}>{displayed}</Tag>
}
