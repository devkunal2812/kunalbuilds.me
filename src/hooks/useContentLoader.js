import { useState, useEffect } from 'react'

/**
 * Custom hook to manage content loading states
 * Shows skeleton loader for minimum duration to avoid flash
 */
export function useContentLoader(minLoadTime = 800) {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const startTime = Date.now()

    // Simulate content loading
    const loadContent = async () => {
      // Wait for minimum load time
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadTime - elapsed)

      await new Promise(resolve => setTimeout(resolve, remainingTime))
      
      setIsReady(true)
      
      // Small delay for fade out animation
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    loadContent()
  }, [minLoadTime])

  return { isLoading, isReady }
}
