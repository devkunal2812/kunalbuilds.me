// ---------------------------------------------------------
//  Analytics Tracking Utility (Optimized)
//  Clean, efficient visitor tracking with no duplicates
// ---------------------------------------------------------

const analyticsApiUrl = (() => {
  const explicitUrl = import.meta.env.VITE_ANALYTICS_API_URL?.trim()
  if (explicitUrl) return explicitUrl

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  if (apiBaseUrl) return `${apiBaseUrl.replace(/\/$/, '')}/api/analytics`

  return '/api/analytics'
})()

// Generate or retrieve session ID
export function getSessionId() {
  let sessionId = localStorage.getItem('portfolio_session_id')
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('portfolio_session_id', sessionId)
  }
  
  return sessionId
}

// Detect device type
export function getDeviceType() {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// Detect browser
export function getBrowser() {
  const ua = navigator.userAgent
  
  if (ua.indexOf('Firefox') > -1) return 'Firefox'
  if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera'
  if (ua.indexOf('Trident') > -1) return 'IE'
  if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) return 'Edge'
  if (ua.indexOf('Chrome') > -1) return 'Chrome'
  if (ua.indexOf('Safari') > -1) return 'Safari'
  
  return 'Unknown'
}

// Detect OS
export function getOS() {
  const ua = navigator.userAgent
  
  if (ua.indexOf('Win') > -1) return 'Windows'
  if (ua.indexOf('Mac') > -1) return 'MacOS'
  if (ua.indexOf('Linux') > -1) return 'Linux'
  if (ua.indexOf('Android') > -1) return 'Android'
  if (ua.indexOf('like Mac') > -1) return 'iOS'
  
  return 'Unknown'
}

// Get screen resolution
export function getScreenResolution() {
  return `${window.screen.width}x${window.screen.height}`
}

// Get referrer
export function getReferrer() {
  return document.referrer || 'direct'
}

// Send analytics data to backend
async function sendAnalytics(data) {
  try {
    await fetch(analyticsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true
    })
  } catch (error) {
    // Silently fail - don't block UI
    console.debug('Analytics error:', error)
  }
}

// Track page visit (initial load only)
export function trackPageVisit(page) {
  const data = {
    sessionId: getSessionId(),
    page: page,
    device: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screen: getScreenResolution(),
    duration: 0,
    timestamp: new Date().toISOString(),
    referrer: getReferrer(),
    eventType: 'visit'
  }

  sendAnalytics(data)
}

// Track page duration (when leaving page)
export function trackPageDuration(page, duration) {
  if (duration < 1) return // Ignore very short visits
  
  const data = {
    sessionId: getSessionId(),
    page: page,
    device: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screen: getScreenResolution(),
    duration: duration,
    timestamp: new Date().toISOString(),
    referrer: getReferrer(),
    eventType: 'duration'
  }

  sendAnalytics(data)
}

// Page timer class
export class PageTimer {
  constructor(page) {
    this.page = page
    this.startTime = Date.now()
    this.isPaused = false
    this.pausedTime = 0
  }

  pause() {
    if (!this.isPaused) {
      this.isPaused = true
      this.pausedTime = Date.now()
    }
  }

  resume() {
    if (this.isPaused) {
      const pauseDuration = Date.now() - this.pausedTime
      this.startTime += pauseDuration // Adjust start time to exclude pause
      this.isPaused = false
    }
  }

  getDuration() {
    if (this.isPaused) {
      return Math.floor((this.pausedTime - this.startTime) / 1000)
    }
    return Math.floor((Date.now() - this.startTime) / 1000)
  }

  sendDuration() {
    const duration = this.getDuration()
    if (duration > 0) {
      trackPageDuration(this.page, duration)
    }
  }
}

// Global timer reference (managed by hook)
let globalTimer = null

export function setGlobalTimer(timer) {
  globalTimer = timer
}

export function getGlobalTimer() {
  return globalTimer
}

// Setup page unload tracking
export function setupUnloadTracking() {
  // Track when user leaves the site
  window.addEventListener('beforeunload', () => {
    const timer = getGlobalTimer()
    if (timer) {
      const duration = timer.getDuration()
      if (duration > 0) {
        const data = {
          sessionId: getSessionId(),
          page: timer.page,
          device: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
          screen: getScreenResolution(),
          duration: duration,
          timestamp: new Date().toISOString(),
          referrer: getReferrer(),
          eventType: 'duration'
        }
        
        // Use sendBeacon for reliable delivery on page unload
        navigator.sendBeacon(analyticsApiUrl, JSON.stringify(data))
      }
    }
  })

  // Pause timer when tab is hidden (don't send data)
  document.addEventListener('visibilitychange', () => {
    const timer = getGlobalTimer()
    if (timer) {
      if (document.hidden) {
        timer.pause()
      } else {
        timer.resume()
      }
    }
  })
}
