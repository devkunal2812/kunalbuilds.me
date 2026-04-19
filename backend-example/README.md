# Portfolio Analytics Backend

Backend server for collecting and storing portfolio visitor analytics.

## Features
- ✅ REST API for analytics tracking
- ✅ MongoDB database storage
- ✅ Data validation
- ✅ CORS enabled
- ✅ Basic stats endpoint
- ✅ Recent visits endpoint

## Setup

### 1. Install Dependencies
```bash
cd backend-example
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string.

### 3. Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas (cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to `.env`

### 4. Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3001`

## API Endpoints

### POST /api/analytics
Track visitor data

**Request Body:**
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
  "referrer": "https://google.com"
}
```

**Response:**
```json
{
  "success": true,
  "id": "65a5f8c9d4e5f6a7b8c9d0e1"
}
```

### GET /api/analytics/stats
Get analytics statistics

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalVisits": 1250,
    "uniqueVisitors": 450,
    "topPages": [
      { "_id": "/", "count": 500 },
      { "_id": "/about", "count": 300 }
    ],
    "devices": [
      { "_id": "desktop", "count": 800 },
      { "_id": "mobile", "count": 400 }
    ]
  }
}
```

### GET /api/analytics/recent?limit=50
Get recent visits

**Response:**
```json
{
  "success": true,
  "visits": [
    {
      "_id": "65a5f8c9d4e5f6a7b8c9d0e1",
      "sessionId": "session_123",
      "page": "/about",
      "device": "desktop",
      "browser": "Chrome",
      "os": "Windows",
      "screen": "1920x1080",
      "duration": 45,
      "timestamp": "2024-01-15T10:30:00.000Z",
      "referrer": "direct"
    }
  ]
}
```

### GET /health
Health check

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

```javascript
{
  sessionId: String,      // Unique session identifier
  page: String,           // Page route (e.g., "/about")
  device: String,         // "mobile" | "tablet" | "desktop"
  browser: String,        // Browser name
  os: String,             // Operating system
  screen: String,         // Screen resolution
  duration: Number,       // Time spent in seconds
  timestamp: Date,        // Visit timestamp
  referrer: String,       // Traffic source
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## Deployment

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Add MongoDB URI in Vercel dashboard

### Option 2: Railway
1. Create account at https://railway.app
2. New Project → Deploy from GitHub
3. Add MongoDB plugin
4. Deploy

### Option 3: Render
1. Create account at https://render.com
2. New Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy

## Frontend Integration

Update your frontend API endpoint:

```javascript
// src/utils/analytics.js
const API_URL = 'https://your-backend-url.com/api/analytics'

await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

## Testing

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test analytics tracking
curl -X POST http://localhost:3001/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session",
    "page": "/test",
    "device": "desktop",
    "browser": "Chrome",
    "os": "Windows",
    "screen": "1920x1080",
    "duration": 10,
    "referrer": "direct"
  }'

# Get stats
curl http://localhost:3001/api/analytics/stats

# Get recent visits
curl http://localhost:3001/api/analytics/recent?limit=10
```

## Security Notes
- Add rate limiting in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Add authentication for stats endpoints
- Implement data retention policy

## Next Steps
1. ✅ Backend API created
2. ⏳ Deploy to cloud
3. ⏳ Update frontend API URL
4. ⏳ Test end-to-end
5. ⏳ Build admin dashboard (future)
