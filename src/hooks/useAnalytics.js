// ---------------------------------------------------------
//  useAnalytics Hook
//  Clean analytics tracking using React Router
// ---------------------------------------------------------

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  trackPageVisit, 
  PageTimer, 
  setGlobalTimer, 
  setupUnloadTracking 
} from '../utils/analytics'

export function useAnalytics() {
  const location = useLocation()
  const timerRef = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Setup unload tracking only once
    if (isInitialMount.current) {
      setupUnloadTracking()
      isInitialMount.current = false
    }

    const currentPage = location.pathname

    // If there's a previous timer, send its duration
    if (timerRef.current) {
      timerRef.current.sendDuration()
    }

    // Track new page visit
    trackPageVisit(currentPage)

    // Start new timer
    timerRef.current = new PageTimer(currentPage)
    setGlobalTimer(timerRef.current)

    // Cleanup function (runs before next route change)
    return () => {
      if (timerRef.current) {
        timerRef.current.sendDuration()
      }
    }
  }, [location.pathname])
}
