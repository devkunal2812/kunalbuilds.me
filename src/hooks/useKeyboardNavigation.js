import { useEffect } from 'react'

/**
 * Custom hook for keyboard navigation shortcuts
 * Provides keyboard shortcuts for common actions
 */
export function useKeyboardNavigation(callbacks = {}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // Cmd/Ctrl + K - Search (if provided)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        callbacks.onSearch?.()
      }

      // Escape - Close modals/overlays
      if (e.key === 'Escape') {
        callbacks.onEscape?.()
      }

      // Arrow keys for navigation
      if (e.key === 'ArrowLeft') {
        callbacks.onPrevious?.()
      }
      if (e.key === 'ArrowRight') {
        callbacks.onNext?.()
      }

      // Home - Scroll to top
      if (e.key === 'Home') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      // End - Scroll to bottom
      if (e.key === 'End') {
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callbacks])
}
