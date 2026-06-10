# Analytics Data Checker

Two ways to check your portfolio analytics data stored in MongoDB.

## Method 1: Web Dashboard (Easiest)

### Option A: Deploy the dashboard
1. Copy `analytics-dashboard.html` to your `public` folder
2. Deploy to Vercel
3. Visit: `https://your-site.vercel.app/analytics-dashboard.html`

### Option B: Run locally
1. Open `analytics-dashboard.html` in your browser
2. It will fetch data from your deployed API

**Note:** Make sure your API endpoint `/api/analytics` supports GET requests for stats.

## Method 2: Node.js Script (Most Detailed)

### Setup

1. Make sure you have Node.js installed
2. Install dependencies (if not already installed):
```bash
npm install mongoose dotenv
```

3. Create a `.env` file in the root directory with your MongoDB connection string:
```env
MONGODB_URI=YOUR_MONGODB_URI_HERE
```

### Run the Script

```bash
node check-analytics.js
```

### What You'll See

The script will show you:
- ✅ Total visits
- 👥 Unique visitors
- 📄 Page views breakdown
- 📱 Device breakdown (mobile/tablet/desktop)
- 🌐 Browser breakdown
- 💻 OS breakdown
- ⏱️ Average duration
- 🕐 Recent 10 visits with full details

### Example Output

```
🔌 Connecting to MongoDB...

✅ Connected to MongoDB Atlas

============================================================
📊 TOTAL VISITS: 45
👥 UNIQUE VISITORS: 12

📄 PAGE VIEWS:
   /: 15 visits
   /about: 10 visits
   /projects: 8 visits
   /skills: 7 visits
   /contact: 5 visits

📱 DEVICE BREAKDOWN:
   desktop: 25 visits
   mobile: 15 visits
   tablet: 5 visits

🌐 BROWSER BREAKDOWN:
   Chrome: 30 visits
   Safari: 10 visits
   Firefox: 5 visits

💻 OS BREAKDOWN:
   Windows: 20 visits
   MacOS: 15 visits
   Android: 7 visits
   iOS: 3 visits

⏱️  AVERAGE DURATION: 45 seconds

🕐 RECENT 10 VISITS:
============================================================

1. /projects
   Time: 4/21/2026, 7:30:15 PM
   Device: desktop | Browser: Chrome | OS: Windows
   Screen: 1920x1080
   Duration: 60s | Type: duration
   Referrer: direct
   Session: session_1713724815...

...
```

## Method 3: MongoDB Atlas Dashboard

### Direct Database Access

1. Go to https://cloud.mongodb.com
2. Log in to your account
3. Click "Database" → "Browse Collections"
4. Select your database: `portfolio-analytics`
5. Select collection: `analytics`
6. View all your data!

### Useful MongoDB Queries

In the MongoDB Atlas query bar, you can run:

**Find all visits:**
```javascript
{}
```

**Find visits by page:**
```javascript
{ "page": "/about" }
```

**Find mobile visits:**
```javascript
{ "device": "mobile" }
```

**Find visits with duration > 30 seconds:**
```javascript
{ "duration": { "$gt": 30 } }
```

**Sort by most recent:**
```javascript
// Filter: {}
// Sort: { "timestamp": -1 }
// Limit: 20
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Check if your `MONGODB_URI` is correct in `.env`
- Verify your IP is whitelisted in MongoDB Atlas Network Access
- Make sure your MongoDB cluster is running

### "No data found"
- Visit your portfolio website to generate analytics data
- Check if the frontend is correctly sending data to `/api/analytics`
- Verify the API endpoint is working (check Vercel logs)

### "MONGODB_URI not defined"
- Create a `.env` file in the root directory
- Add your MongoDB connection string
- Never commit `.env` to git!

## Security Notes

⚠️ **IMPORTANT:**
- Never share your `.env` file
- Never commit `.env` to git
- Add `.env` to `.gitignore`
- Keep your MongoDB password secure
- Rotate passwords regularly

## Next Steps

Once you verify your data is being collected:

1. ✅ Monitor visitor trends
2. ✅ Identify popular pages
3. ✅ Understand your audience (devices, browsers)
4. ⏳ Build a custom admin dashboard (future)
5. ⏳ Add more analytics features (future)

---

**Happy analyzing! 📊**
