import { useState, useEffect, useCallback } from 'react'

/**
 * Bug Mode - Secret Easter Egg
 * Desktop: Type "bug" anywhere
 * Mobile: Triple tap anywhere on the screen
 */
export function useBugMode() {
  const [isBugMode, setIsBugMode] = useState(false)
  const [keySequence, setKeySequence] = useState('')
  const [tapCount, setTapCount] = useState(0)
  const [lastTapTime, setLastTapTime] = useState(0)

  const triggerBugMode = useCallback(() => {
    setIsBugMode(true)
    
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30, 50, 30])
    }
    
    // Auto-disable after 3 seconds
    setTimeout(() => {
      setIsBugMode(false)
    }, 3000)
  }, [])

  useEffect(() => {
    // Desktop: Keyboard trigger
    const handleKeyPress = (e) => {
      // Build key sequence
      const newSequence = (keySequence + e.key).slice(-3)
      setKeySequence(newSequence)

      // Check if "bug" was typed
      if (newSequence === 'bug') {
        triggerBugMode()
        setKeySequence('') // Reset
      }
    }

    // Mobile: Triple tap trigger
    const handleTouchEnd = (e) => {
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

      const currentTime = Date.now()
      const timeSinceLastTap = currentTime - lastTapTime

      // Reset if more than 500ms since last tap
      if (timeSinceLastTap > 500) {
        setTapCount(1)
      } else {
        const newTapCount = tapCount + 1
        setTapCount(newTapCount)

        // Trigger on triple tap
        if (newTapCount === 3) {
          triggerBugMode()
          setTapCount(0)
        }
      }

      setLastTapTime(currentTime)
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [keySequence, triggerBugMode, tapCount, lastTapTime])

  return { isBugMode, triggerBugMode }
}
