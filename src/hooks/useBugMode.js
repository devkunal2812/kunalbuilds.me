import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Bug Mode - Secret Easter Egg
 * Desktop: Type "bug" anywhere
 * Mobile: 4-finger tap anywhere on the screen (avoids conflict with piano effect)
 * Redirects to /secret/bug page
 */
export function useBugMode() {
  const navigate = useNavigate()
  const [keySequence, setKeySequence] = useState('')

  const triggerBugMode = useCallback(() => {
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30, 50, 30])
    }
    
    // Navigate to bug easter egg page
    navigate('/secret/bug')
  }, [navigate])

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

    // Mobile: 4-finger tap trigger (avoids conflict with piano effect)
    const handleTouchStart = (e) => {
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

      // Check if 4 or more fingers are touching
      if (e.touches && e.touches.length >= 4) {
        e.preventDefault()
        triggerBugMode()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [keySequence, triggerBugMode])

  return { triggerBugMode }
}
