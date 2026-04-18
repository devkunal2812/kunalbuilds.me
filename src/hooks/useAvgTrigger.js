import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * useAvgTrigger
 *
 * Desktop: Type "avg" anywhere on the page
 * Mobile: Long press (hold for 2 seconds) anywhere on the screen
 *
 * Usage:
 *   const { isCinematicActive, onCinematicComplete } = useAvgTrigger()
 *   {isCinematicActive && <AvgCinematic isActive onComplete={onCinematicComplete} />}
 */
export function useAvgTrigger({ keyword = 'avg', onComplete } = {}) {
  const [isCinematicActive, setActive] = useState(false)
  const firedRef = useRef(false)
  const bufferRef = useRef('')
  const longPressTimerRef = useRef(null)
  const touchStartTimeRef = useRef(0)

  useEffect(() => {
    // Desktop: Keyboard trigger
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

    // Mobile: Long press trigger (2 seconds)
    const handleTouchStart = (e) => {
      if (firedRef.current) return
      
      // Ignore if touching input/textarea or interactive elements
      const target = e.target
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) return

      touchStartTimeRef.current = Date.now()
      
      longPressTimerRef.current = setTimeout(() => {
        firedRef.current = true
        setActive(true)
        
        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate([50, 100, 50])
        }
      }, 2000) // 2 second long press
    }

    const handleTouchEnd = () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
    }

    const handleTouchMove = () => {
      // Cancel long press if finger moves
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
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
    bufferRef.current = ''
  }, [])

  return { isCinematicActive, onCinematicComplete, resetTrigger }
}
