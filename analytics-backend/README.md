# Portfolio Analytics Backend

Backend server for Kunal's portfolio analytics tracking.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and replace `<db_password>` with your actual MongoDB Atlas password:
```
MONGODB_URI=mongodb+srv://kunaldevofficial07_db_user:YOUR_ACTUAL_PASSWORD@cluster0.wvankzz.mongodb.net/portfolio-analytics?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```

### 3. Run Locally
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB Atlas connected
🚀 Analytics server running on port 3001
📊 API endpoint: http://localhost:3001/api/analytics
```

### 4. Test the API
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test analytics tracking
curl -X POST http://localhost:3001/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session_123",
    "page": "/",
    "device": "desktop",
    "browser": "Chrome",
    "os": "Windows",
    "screen": "1920x1080",
    "duration": 0,
    "referrer": "direct",
    "eventType": "visit"
  }'

# Get stats
curl http://localhost:3001/api/analytics/stats

# Get recent visits
curl http://localhost:3001/api/analytics/recent?limit=10
```

## API Endpoints

### POST /api/analytics
Track visitor data

**Request:**
```json
{
  "sessionId": "session_123",
  "page": "/about",
  "device": "desktop",
  "browser": "Chrome",
  "os": "Windows",
  "screen": "1920x1080",
  "duration": 45,
  "referrer": "https://google.com",
  "eventType": "duration"
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

### GET /api/analytics/recent?limit=50
Get recent visits

### GET /health
Health check

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variable in Vercel dashboard:
   - Key: `MONGODB_URI`
   - Value: Your full MongoDB connection string

4. Your API will be at: `https://your-project.vercel.app/api/analytics`

## Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select this repository
5. Add environment variable `MONGODB_URI`
6. Deploy!

## Update Frontend

After deploying, update `src/utils/analytics.js`:

```javascript
const API_URL = 'https://your-backend-url.vercel.app/api/analytics'
```

## Troubleshooting

### MongoDB Connection Error
- Check if your IP is whitelisted in MongoDB Atlas Network Access
- Verify connection string is correct
- Check if password has special characters (URL encode them)

### Port Already in Use
```bash
# Kill process on port 3001
npx kill-port 3001
```

### CORS Error
- Backend already has CORS enabled
- Check if frontend URL is correct

## Next Steps

1. ✅ Backend running locally
2. ⏳ Deploy to Vercel/Railway
3. ⏳ Update frontend API URL
4. ⏳ Test end-to-end
5. ⏳ Monitor data in MongoDB Atlas
"# portfolio-analytics-backend" 
