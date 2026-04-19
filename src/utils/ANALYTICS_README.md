# Analytics Tracking System (Optimized)

## Overview
Clean, efficient analytics tracking with no duplicates. Uses React Router for proper route detection and avoids polling.

## Features
- ✅ Session tracking (unique per visitor)
- ✅ Page view tracking (no duplicates)
- ✅ Accurate time tracking per page
- ✅ Device type detection (mobile/tablet/desktop)
- ✅ Browser & OS detection
- ✅ Screen resolution
- ✅ Referrer tracking
- ✅ Non-blocking async requests
- ✅ Reliable data on page unload
- ✅ Pause timer when tab is hidden
- ✅ No setInterval polling
- ✅ Event type differentiation (visit vs duration)

## How It Works

### Tracking Flow
1. **Page Load**: Track visit with duration=0, start timer
2. **Route Change**: Send previous page duration, track new visit, start new timer
3. **Tab Hidden**: Pause timer (don't send data)
4. **Tab Visible**: Resume timer
5. **Page Unload**: Send final duration via sendBeacon

### Event Types
- `visit`: Initial page load (duration=0)
- `duration`: Time spent on page (duration>0)

## Data Collected

### Session Data
- `sessionId`: Unique identifier stored in localStorage
- `timestamp`: ISO 8601 format
- `eventType`: "visit" | "duration"

### Page Data
- `page`: Current route (e.g., `/about`, `/projects`)
- `duration`: Time spent in seconds (0 for visits)

### Device Data
- `device`: mobile | tablet | desktop
- `browser`: Chrome, Firefox, Safari, Edge, etc.
- `os`: Windows, MacOS, Linux, Android, iOS
- `screen`: Resolution (e.g., `1920x1080`)

### Traffic Data
- `referrer`: Where user came from (or 'direct')

## Usage

### Automatic Tracking (Recommended)
Already integrated in `App.jsx` via `useAnalytics()` hook. No additional setup needed!

### Manual Tracking (Optional)
```javascript
import { trackPageVisit, trackPageDuration } from './utils/analytics'

// Track custom visit
trackPageVisit('/custom-page')

// Track custom duration
trackPageDuration('/custom-page', 45)
```

## Implementation Details

### React Hook: `useAnalytics()`
```javascript
import { useAnalytics } from './hooks/useAnalytics'

function App() {
  useAnalytics() // That's it!
  // ...
}
```

### What It Does
- Uses `useLocation()` from React Router
- Detects route changes automatically
- Sends previous page duration on route change
- Tracks new page visit
- Starts new timer
- Cleans up on unmount

### Timer Management
- ONE active timer per page
- Pauses when tab is hidden
- Resumes when tab is visible
- Sends duration on route change or page unload

## Backend Setup

### Request Body
```json
{
  "sessionId": "session_1234567890_abc123",
  "page": "/about",
  "device": "desktop",
  "browser": "Chrome",
  "os": "Windows",
  "screen": "1920x1080",
  "duration": 45,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "referrer": "https://google.com",
  "eventType": "duration"
}
```

### MongoDB Schema
```javascript
{
  sessionId: String,
  page: String,
  device: String,
  browser: String,
  os: String,
  screen: String,
  duration: Number,
  timestamp: Date,
  referrer: String,
  eventType: String, // "visit" | "duration"
  createdAt: Date,
  updatedAt: Date
}
```

## Data Quality

### No Duplicates
- Each page visit tracked once
- Each duration tracked once
- No duplicate events for same session + page + timestamp

### Accurate Duration
- Timer pauses when tab is hidden
- Timer resumes when tab is visible
- Duration excludes time spent in other tabs

### Clean Data
- `eventType: "visit"` → duration = 0
- `eventType: "duration"` → duration > 0
- Consistent timestamps
- Validated device types

## Performance

### Optimizations
- No setInterval polling
- Uses React Router's useLocation hook
- Non-blocking async requests
- Fails silently if backend unavailable
- Uses sendBeacon for reliable unload tracking
- Lightweight: ~3KB minified

### No UI Blocking
- All requests are async
- No waiting for responses
- Silent error handling
- keepalive flag for reliability

## Privacy
- ❌ No personal information
- ❌ No emails, names, passwords
- ❌ No IP addresses stored
- ✅ Only anonymous usage data

## Testing
```javascript
// Check session ID
import { getSessionId } from './utils/analytics'
console.log('Session:', getSessionId())

// Check device detection
import { getDeviceType, getBrowser, getOS } from './utils/analytics'
console.log('Device:', getDeviceType())
console.log('Browser:', getBrowser())
console.log('OS:', getOS())
```

## Troubleshooting

### No data being sent?
1. Check browser console for errors
2. Verify backend URL in `analytics.js`
3. Check network tab for API calls
4. Ensure backend is running

### Duplicate entries?
- Should not happen with optimized version
- Check that you're not calling `initializeAnalytics()` multiple times
- Use `useAnalytics()` hook only once in App.jsx

### Timer not accurate?
- Timer pauses when tab is hidden (expected behavior)
- Duration excludes time in other tabs
- Check browser console for timer logs

## Next Steps
1. ✅ Frontend tracking optimized
2. ⏳ Deploy backend
3. ⏳ Update API URL in `analytics.js`
4. ⏳ Test end-to-end
5. ⏳ Build admin dashboard (future)
