# MongoDB Atlas Setup Guide

Complete guide to set up MongoDB Atlas for your portfolio analytics.

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with:
   - Email
   - Google account
   - GitHub account (recommended for developers)

## Step 2: Create a Cluster

1. After login, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
   - 512 MB storage
   - Shared RAM
   - Perfect for portfolio analytics
3. Select Cloud Provider & Region:
   - **Provider**: AWS (recommended)
   - **Region**: Choose closest to your users
     - India: Mumbai (ap-south-1)
     - US: N. Virginia (us-east-1)
     - Europe: Frankfurt (eu-central-1)
4. Cluster Name: `portfolio-analytics` (or keep default)
5. Click "Create"

⏳ Wait 3-5 minutes for cluster creation

## Step 3: Create Database User

1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `portfolio_admin` (or your choice)
5. Password: Click "Autogenerate Secure Password"
   - **IMPORTANT**: Copy and save this password!
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

## Step 4: Configure Network Access

1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Choose one:
   
   **Option A: Allow from Anywhere (Easiest)**
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - ⚠️ Less secure but works everywhere
   
   **Option B: Specific IP (More Secure)**
   - Add your server's IP address
   - Add your local IP for testing
   
4. Click "Confirm"

## Step 5: Get Connection String

1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string:

```
mongodb+srv://portfolio_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **Replace `<password>`** with your actual password
8. **Add database name** before the `?`:

```
mongodb+srv://portfolio_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio-analytics?retryWrites=true&w=majority
```

## Step 6: Set Up Backend

### Create Backend Folder
```bash
mkdir analytics-backend
cd analytics-backend
```

### Initialize Node.js Project
```bash
npm init -y
```

### Install Dependencies
```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

### Create Files

**1. Create `.env` file:**
```bash
# .env
MONGODB_URI=mongodb+srv://portfolio_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio-analytics?retryWrites=true&w=majority
PORT=3001
```

**2. Copy `server.js` from `backend-example/server.js`**

**3. Update `package.json`:**
```json
{
  "name": "portfolio-analytics-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### Test Locally
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Analytics server running on port 3001
```

### Test API
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
    "referrer": "direct",
    "eventType": "visit"
  }'
```

## Step 7: Deploy Backend

### Option A: Vercel (Recommended - Free)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `MONGODB_URI` with your connection string

5. Your API will be at: `https://your-project.vercel.app/api/analytics`

### Option B: Railway (Free Tier)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your backend repository
6. Add environment variables:
   - `MONGODB_URI`: Your connection string
   - `PORT`: 3001
7. Deploy!

### Option C: Render (Free Tier)

1. Go to https://render.com
2. Sign up
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Settings:
   - Name: `portfolio-analytics`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables:
   - `MONGODB_URI`: Your connection string
7. Click "Create Web Service"

## Step 8: Update Frontend

Update `src/utils/analytics.js`:

```javascript
// Replace this line:
const API_URL = '/api/analytics'

// With your deployed backend URL:
const API_URL = 'https://your-backend-url.vercel.app/api/analytics'
```

## Step 9: Verify Everything Works

1. Deploy your frontend (Vercel/Netlify)
2. Visit your portfolio
3. Open browser DevTools → Network tab
4. Navigate between pages
5. Check for POST requests to `/api/analytics`
6. Verify in MongoDB Atlas:
   - Go to "Database" → "Browse Collections"
   - You should see `analytics` collection with data

## MongoDB Atlas Dashboard

### View Your Data
1. Click "Database" → "Browse Collections"
2. Select `portfolio-analytics` database
3. Select `analytics` collection
4. View all tracked visits

### Useful Queries
```javascript
// Find all visits
db.analytics.find()

// Count total visits
db.analytics.countDocuments()

// Find visits by page
db.analytics.find({ page: "/about" })

// Find visits by device
db.analytics.find({ device: "mobile" })

// Get recent visits
db.analytics.find().sort({ timestamp: -1 }).limit(10)
```

## Security Best Practices

1. **Never commit `.env` file**
   - Add to `.gitignore`
   
2. **Use environment variables**
   - Store sensitive data in deployment platform
   
3. **Rotate passwords regularly**
   - Change database password every 3-6 months
   
4. **Monitor usage**
   - Check MongoDB Atlas metrics
   - Set up alerts for unusual activity

5. **Add rate limiting** (production)
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

## Troubleshooting

### Connection Error
- Check if IP is whitelisted in Network Access
- Verify connection string is correct
- Check if password has special characters (URL encode them)

### Authentication Failed
- Verify username and password
- Check database user privileges
- Try creating a new user

### Timeout Error
- Check network connectivity
- Verify cluster is running
- Try different region

### Data Not Appearing
- Check backend logs
- Verify API endpoint is correct
- Check CORS settings
- Test with curl/Postman first

## Cost Estimate

**MongoDB Atlas Free Tier (M0):**
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ No credit card required
- ✅ Perfect for portfolio analytics
- ✅ ~10,000 visits/month easily

**When to Upgrade:**
- Storage > 512 MB
- Need dedicated resources
- High traffic (>100k visits/month)

## Next Steps

1. ✅ MongoDB Atlas set up
2. ✅ Backend deployed
3. ✅ Frontend connected
4. ⏳ Monitor analytics data
5. ⏳ Build admin dashboard (future)

## Support

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB University: https://university.mongodb.com/ (free courses)
- Community Forum: https://www.mongodb.com/community/forums/

---

**You're all set! Your portfolio now has professional analytics tracking.** 🎉
