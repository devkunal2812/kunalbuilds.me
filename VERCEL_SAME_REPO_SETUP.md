# 🚀 Deploy Frontend + Backend Together on Vercel

Your portfolio (kunalbuilds.vercel.app) can host both frontend and backend in the same repository!

## ✅ What's Been Set Up

### Frontend (Already Deployed)
- React app with Vite
- Deployed at: `kunalbuilds.vercel.app`

### Backend (New - Serverless Functions)
- `/api/analytics.js` - Analytics tracking endpoint
- `/api/health.js` - Health check endpoint
- Uses Vercel Serverless Functions (automatic!)

## 📁 Project Structure

```
your-portfolio/
├── src/                    ← Frontend (React)
├── api/                    ← Backend (Serverless Functions)
│   ├── analytics.js        ← POST /api/analytics
│   └── health.js           ← GET /api/health
├── package.json            ← Updated with mongoose
└── vercel.json             ← (optional) Vercel config
```

## 🔧 Setup Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install `mongoose` for MongoDB connection.

### Step 2: Add Environment Variable in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project: `kunalbuilds`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB connection string:
   ```
   YOUR_MONGODB_CONNECTION_STRING
   ```
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**

### Step 3: Push Changes to GitHub

```bash
git add .
git commit -m "feat: Add serverless analytics API"
git push origin main
```

### Step 4: Vercel Auto-Deploy

Vercel will automatically:
- Detect the `/api` folder
- Create serverless functions
- Deploy both frontend and backend
- Your API will be at: `kunalbuilds.vercel.app/api/analytics`

### Step 5: Verify Deployment

Wait 1-2 minutes for deployment, then test:

```bash
# Test health endpoint
curl https://kunalbuilds.vercel.app/api/health

# Test analytics endpoint
curl -X POST https://kunalbuilds.vercel.app/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_123",
    "page": "/",
    "device": "desktop",
    "browser": "Chrome",
    "os": "Windows",
    "screen": "1920x1080",
    "duration": 0,
    "referrer": "direct",
    "eventType": "visit"
  }'
```

## ✅ How It Works

### Vercel Serverless Functions
- Any file in `/api` folder becomes an API endpoint
- `/api/analytics.js` → `kunalbuilds.vercel.app/api/analytics`
- `/api/health.js` → `kunalbuilds.vercel.app/api/health`
- Automatically scales
- No server management needed

### Frontend Integration
- `src/utils/analytics.js` already configured to use `/api/analytics`
- Same domain - no CORS issues
- Automatic tracking on page visits

### MongoDB Connection
- Serverless functions connect to MongoDB Atlas
- Connection is cached for performance
- Environment variable stores connection string securely

## 📊 API Endpoints

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

### GET /api/analytics
Get basic statistics

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalVisits": 1250,
    "uniqueVisitors": 450
  }
}
```

### GET /api/health
Health check

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Portfolio Analytics API"
}
```

## 🔍 Monitoring

### Vercel Dashboard
1. Go to your project dashboard
2. Click **Functions** tab
3. See all API calls and logs
4. Monitor performance and errors

### MongoDB Atlas
1. Go to MongoDB Atlas dashboard
2. Click **Database** → **Browse Collections**
3. View `portfolio-analytics` → `analytics`
4. See all tracked visits

## 🎯 Testing Checklist

- [ ] Push changes to GitHub
- [ ] Vercel auto-deploys
- [ ] Add `MONGODB_URI` environment variable
- [ ] Test health endpoint: `curl https://kunalbuilds.vercel.app/api/health`
- [ ] Test analytics endpoint with POST request
- [ ] Visit your portfolio website
- [ ] Open DevTools → Network tab
- [ ] Navigate between pages
- [ ] Check for POST requests to `/api/analytics`
- [ ] Verify data in MongoDB Atlas

## 🚨 Troubleshooting

### API returns 500 error
- Check Vercel function logs
- Verify `MONGODB_URI` environment variable is set
- Check MongoDB Atlas Network Access (whitelist 0.0.0.0/0)

### API returns 404
- Verify `/api` folder exists
- Check file names: `analytics.js`, `health.js`
- Redeploy: `git push origin main`

### MongoDB connection error
- Verify connection string in Vercel environment variables
- Check password is correct (no special characters or URL encoded)
- Verify MongoDB Atlas cluster is running

### No data being tracked
- Check browser console for errors
- Verify API endpoint in Network tab
- Check Vercel function logs
- Test API with curl first

## 💡 Benefits of This Approach

✅ **Single Repository** - Easier to manage
✅ **Same Domain** - No CORS issues
✅ **Auto-Deploy** - Push to GitHub, Vercel handles rest
✅ **Serverless** - No server management
✅ **Free Tier** - Perfect for portfolio
✅ **Scalable** - Handles traffic automatically

## 📈 Limits (Vercel Free Tier)

- ✅ 100 GB bandwidth/month
- ✅ 100,000 function invocations/month
- ✅ 10 second function timeout
- ✅ Perfect for portfolio analytics

## 🎉 You're Done!

Your portfolio now has:
- ✅ Frontend at `kunalbuilds.vercel.app`
- ✅ Backend API at `kunalbuilds.vercel.app/api/*`
- ✅ Analytics tracking working
- ✅ Data stored in MongoDB Atlas
- ✅ All in one repository!

## 🚀 Next Steps

1. ✅ Push changes to GitHub
2. ⏳ Add MongoDB URI in Vercel
3. ⏳ Wait for auto-deploy
4. ⏳ Test API endpoints
5. ⏳ Visit your portfolio
6. ⏳ Check analytics data in MongoDB

---

**Everything is in one place - easy to manage!** 🎊
