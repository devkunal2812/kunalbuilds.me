import { useState, useEffect, useCallback } from 'react'

/**
 * Bug Mode - Secret Easter Egg
 * Type "bug" anywhere to trigger glitch effect
 */
export function useBugMode() {
  const [isBugMode, setIsBugMode] = useState(false)
  const [keySequence, setKeySequence] = useState('')

  const triggerBugMode = useCallback(() => {
    setIsBugMode(true)
    
    // Auto-disable after 3 seconds
    setTimeout(() => {
      setIsBugMode(false)
    }, 3000)
  }, [])

  useEffect(() => {
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

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [keySequence, triggerBugMode])

  return { isBugMode, triggerBugMode }
}
