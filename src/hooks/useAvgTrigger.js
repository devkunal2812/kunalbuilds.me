import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * useAvgTrigger
 *
 * Watches for the keyword "avg" typed anywhere on the page and fires the cinematic.
 *
 * Usage:
 *   const { isCinematicActive, onCinematicComplete } = useAvgTrigger()
 *   {isCinematicActive && <AvgCinematic isActive onComplete={onCinematicComplete} />}
 */
export function useAvgTrigger({ keyword = 'avg', onComplete } = {}) {
  const [isCinematicActive, setActive] = useState(false)
  const firedRef = useRef(false)
  const bufferRef = useRef('')

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (firedRef.current) return
      
      // Ignore if typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      // Add key to buffer
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-keyword.length)

      // Check if buffer matches keyword
      if (bufferRef.current === keyword.toLowerCase()) {
        firedRef.current = true
        setActive(true)
        bufferRef.current = ''
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [keyword])

  const onCinematicComplete = useCallback(() => {
    setActive(false)
    firedRef.current = false
    onComplete?.()
  }, [onComplete])

  const resetTrigger = useCallback(() => {
    firedRef.current = false
    setActive(false)
    bufferRef.current = ''
  }, [])

  return { isCinematicActive, onCinematicComplete, resetTrigger }
}
