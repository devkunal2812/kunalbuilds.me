/**
 * Content Protection Utility
 * Two algorithms to prevent unauthorized content copying
 */

// ============================================
// ALGORITHM 1: Event-Based Protection
// Prevents copy, right-click, drag, and selection
// ============================================

export const useContentProtection = () => {
  const preventCopy = (e) => {
    e.preventDefault()
    return false
  }

  const preventRightClick = (e) => {
    e.preventDefault()
    return false
  }

  const preventDrag = (e) => {
    e.preventDefault()
    return false
  }

  const preventSelection = (e) => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }
    return false
  }

  const preventKeyboardShortcuts = (e) => {
    // Prevent Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I
    if (
      (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 's' || e.key === 'p')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
      e.key === 'F12'
    ) {
      e.preventDefault()
      return false
    }
  }

  return {
    preventCopy,
    preventRightClick,
    preventDrag,
    preventSelection,
    preventKeyboardShortcuts
  }
}

// ============================================
// ALGORITHM 2: CSS-Based Protection
// Applies comprehensive CSS rules to prevent selection
// ============================================

export const applyProtectionStyles = () => {
  const style = document.createElement('style')
  style.id = 'content-protection-styles'
  style.textContent = `
    /* Disable text selection */
    .protected-content,
    .protected-content * {
      user-select: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      -webkit-touch-callout: none !important;
    }

    /* Prevent image dragging - applies to all images globally */
    img {
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }

    /* Prevent text highlighting */
    .protected-content::selection,
    .protected-content *::selection {
      background: transparent !important;
      color: inherit !important;
    }

    .protected-content::-moz-selection,
    .protected-content *::-moz-selection {
      background: transparent !important;
      color: inherit !important;
    }
  `

  // Remove existing style if present
  const existing = document.getElementById('content-protection-styles')
  if (existing) {
    existing.remove()
  }

  document.head.appendChild(style)
}

// ============================================
// ALGORITHM 3: React Hook for Component Protection
// Complete protection for React components
// ============================================

export const useProtectContent = (enabled = true) => {
  const protection = useContentProtection()

  const protectionProps = enabled ? {
    onCopy: protection.preventCopy,
    onCut: protection.preventCopy,
    onContextMenu: protection.preventRightClick,
    onDragStart: protection.preventDrag,
    onSelectStart: protection.preventSelection,
    onKeyDown: protection.preventKeyboardShortcuts,
    className: 'protected-content',
    style: {
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      WebkitTouchCallout: 'none'
    }
  } : {}

  return protectionProps
}

// ============================================
// Image Protection Wrapper
// ============================================

export const getImageProtectionProps = () => ({
  draggable: false,
  onDragStart: (e) => e.preventDefault(),
  onContextMenu: (e) => e.preventDefault(),
  onMouseDown: (e) => e.preventDefault()
})

// ============================================
// Global Protection Initializer
// Call this once in your app entry point
// ============================================

export const initializeGlobalProtection = () => {
  // Apply CSS protection
  applyProtectionStyles()

  // Add global event listeners
  const protection = useContentProtection()

  document.addEventListener('copy', protection.preventCopy)
  document.addEventListener('cut', protection.preventCopy)
  document.addEventListener('contextmenu', protection.preventRightClick)
  document.addEventListener('dragstart', protection.preventDrag)
  document.addEventListener('selectstart', protection.preventSelection)
  document.addEventListener('keydown', protection.preventKeyboardShortcuts)

  // Disable console shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J)
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))
    ) {
      e.preventDefault()
      return false
    }
  })

  // Cleanup function
  return () => {
    document.removeEventListener('copy', protection.preventCopy)
    document.removeEventListener('cut', protection.preventCopy)
    document.removeEventListener('contextmenu', protection.preventRightClick)
    document.removeEventListener('dragstart', protection.preventDrag)
    document.removeEventListener('selectstart', protection.preventSelection)
    document.removeEventListener('keydown', protection.preventKeyboardShortcuts)
    
    const style = document.getElementById('content-protection-styles')
    if (style) style.remove()
  }
}
