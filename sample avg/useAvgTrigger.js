import { useState, useCallback, useRef } from 'react'

/**
 * useAvgTrigger
 *
 * Watches input text for the keyword "avg" and fires the cinematic.
 *
 * Usage:
 *   const { isCinematicActive, onInputChange, onCinematicComplete } = useAvgTrigger()
 *
 *   <input onChange={e => onInputChange(e.target.value)} />
 *   {isCinematicActive && <AvgCinematic isActive onComplete={onCinematicComplete} />}
 */
export function useAvgTrigger({ keyword = 'avg', onComplete } = {}) {
  const [isCinematicActive, setActive] = useState(false)
  const firedRef = useRef(false)

  const onInputChange = useCallback((value) => {
    if (firedRef.current) return
    if (value.toLowerCase().includes(keyword.toLowerCase())) {
      firedRef.current = true
      setActive(true)
    }
  }, [keyword])

  const onCinematicComplete = useCallback(() => {
    setActive(false)
    firedRef.current = false
    onComplete?.()
  }, [onComplete])

  const resetTrigger = useCallback(() => {
    firedRef.current = false
    setActive(false)
  }, [])

  return { isCinematicActive, onInputChange, onCinematicComplete, resetTrigger }
}
