# 🚀 Quick Setup Instructions

Follow these steps to get your analytics backend running:

## Step 1: Navigate to Backend Folder
```bash
cd analytics-backend
```

## Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express (web server)
- mongoose (MongoDB driver)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (development auto-reload)

## Step 3: Create .env File

Create a file named `.env` in the `analytics-backend` folder:

```bash
# On Windows (PowerShell)
Copy-Item .env.example .env

# On Mac/Linux
cp .env.example .env
```

## Step 4: Add Your MongoDB Password

Open `.env` file and replace `<db_password>` with your actual MongoDB Atlas password.

**Your connection string:**
```
YOUR_MONGODB_CONNECTION_STRING
```

**After replacing password:**
```
MONGODB_URI=YOUR_MONGODB_URI_HERE
PORT=3001
```

⚠️ **Important:** If your password has special characters, URL encode them:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `/` → `%2F`

## Step 5: Run the Server

```bash
# Development mode (recommended for testing)
npm run dev

# Production mode
npm start
```

## Step 6: Verify It's Working

You should see:
```
✅ MongoDB Atlas connected
🚀 Analytics server running on port 3001
📊 API endpoint: http://localhost:3001/api/analytics
```

## Step 7: Test the API

Open a new terminal and run:

```bash
# Test health check
curl http://localhost:3001/health

# Test analytics tracking
curl -X POST http://localhost:3001/api/analytics -H "Content-Type: application/json" -d "{\"sessionId\":\"test_123\",\"page\":\"/\",\"device\":\"desktop\",\"browser\":\"Chrome\",\"os\":\"Windows\",\"screen\":\"1920x1080\",\"duration\":0,\"referrer\":\"direct\",\"eventType\":\"visit\"}"
```

## Step 8: Check MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click "Database" → "Browse Collections"
3. You should see:
   - Database: `portfolio-analytics`
   - Collection: `analytics`
   - Your test data!

## ✅ Success!

Your backend is now running and connected to MongoDB Atlas!

## Next Steps

1. Deploy backend to Vercel/Railway (see README.md)
2. Update frontend API URL in `src/utils/analytics.js`
3. Test your portfolio website
4. Monitor analytics data in MongoDB Atlas

## Troubleshooting

### "Cannot find module 'express'"
Run: `npm install`

### "MongoDB connection error"
- Check your password in `.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check internet connection

### "Port 3001 already in use"
Run: `npx kill-port 3001`

### "ECONNREFUSED"
- Check if MongoDB Atlas cluster is running
- Verify connection string is correct

## Need Help?

Check the full README.md for detailed documentation and deployment guides.
