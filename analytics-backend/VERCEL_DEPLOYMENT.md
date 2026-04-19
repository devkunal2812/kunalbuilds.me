# 🚀 Deploy Analytics Backend to Vercel

Complete guide to deploy your analytics backend to Vercel (FREE).

## Why Vercel?
- ✅ Free tier (perfect for portfolio)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy deployment
- ✅ Environment variables support
- ✅ Auto-deploy on git push

## Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas connection string

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

1. **Create a new GitHub repository** (if not already done)
   - Go to https://github.com/new
   - Name: `portfolio-analytics-backend`
   - Make it **Private** (recommended)
   - Don't initialize with README

2. **Push your code:**
```bash
cd analytics-backend

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Analytics backend"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-analytics-backend.git

# Push
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Click "Import" next to your `portfolio-analytics-backend` repo
   - If you don't see it, click "Adjust GitHub App Permissions"

3. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: `./` (leave as is)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   **Key:** `MONGODB_URI`
   
   **Value:** Your full connection string (replace `<db_password>` with actual password):
   ```
   mongodb+srv://kunaldevofficial07_db_user:YOUR_ACTUAL_PASSWORD@cluster0.wvankzz.mongodb.net/portfolio-analytics?retryWrites=true&w=majority&appName=Cluster0
   ```
   
   **Key:** `PORT`
   
   **Value:** `3001`

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - ✅ Done!

### Step 3: Get Your API URL

After deployment, you'll see:
```
🎉 Your project is live!
https://portfolio-analytics-backend-xxx.vercel.app
```

Your API endpoint will be:
```
https://portfolio-analytics-backend-xxx.vercel.app/api/analytics
```

### Step 4: Test Your Deployment

```bash
# Test health endpoint
curl https://your-project.vercel.app/health

# Test analytics tracking
curl -X POST https://your-project.vercel.app/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_vercel_123",
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

## Method 2: Deploy via Vercel CLI (Advanced)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
cd analytics-backend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (Choose your account)
- Link to existing project? **N**
- What's your project's name? `portfolio-analytics-backend`
- In which directory is your code located? `./`
- Want to override settings? **N**

### Step 4: Add Environment Variables
```bash
vercel env add MONGODB_URI
```
Paste your MongoDB connection string when prompted.

```bash
vercel env add PORT
```
Enter `3001` when prompted.

### Step 5: Deploy to Production
```bash
vercel --prod
```

## Update Frontend

After deployment, update `src/utils/analytics.js`:

```javascript
// Find this line (around line 60):
const API_URL = '/api/analytics'

// Replace with your Vercel URL:
const API_URL = 'https://your-project.vercel.app/api/analytics'
```

Example:
```javascript
const API_URL = 'https://portfolio-analytics-backend-abc123.vercel.app/api/analytics'
```

## Verify Everything Works

### 1. Check Vercel Logs
- Go to Vercel dashboard
- Click your project
- Click "Deployments"
- Click latest deployment
- Check "Functions" tab for logs

### 2. Test API Endpoints
```bash
# Health check
curl https://your-project.vercel.app/health

# Get stats
curl https://your-project.vercel.app/api/analytics/stats

# Get recent visits
curl https://your-project.vercel.app/api/analytics/recent?limit=5
```

### 3. Check MongoDB Atlas
- Go to MongoDB Atlas dashboard
- Click "Database" → "Browse Collections"
- Check `portfolio-analytics` → `analytics`
- You should see test data!

## Auto-Deploy on Git Push

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show deployment status in GitHub

## Manage Your Deployment

### Vercel Dashboard
- View logs: Project → Deployments → Click deployment → Functions
- Update env vars: Project → Settings → Environment Variables
- Custom domain: Project → Settings → Domains
- View analytics: Project → Analytics

### Redeploy
```bash
# Via CLI
vercel --prod

# Or push to GitHub
git push origin main
```

## Custom Domain (Optional)

1. Go to Project → Settings → Domains
2. Add your domain (e.g., `api.kunalchauhan.dev`)
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)
5. Update frontend API URL

## Troubleshooting

### Deployment Failed
- Check Vercel logs in dashboard
- Verify `vercel.json` exists
- Check `package.json` has correct dependencies

### MongoDB Connection Error
- Verify `MONGODB_URI` environment variable
- Check MongoDB Atlas Network Access (whitelist `0.0.0.0/0`)
- Verify password doesn't have special characters (or URL encode them)

### 404 on API Endpoints
- Check `vercel.json` routes configuration
- Verify deployment completed successfully
- Check function logs in Vercel dashboard

### CORS Error
- Backend already has CORS enabled
- Check if frontend URL is correct
- Verify API endpoint URL

### Environment Variables Not Working
- Go to Vercel dashboard → Settings → Environment Variables
- Make sure variables are set for "Production"
- Redeploy after adding variables

## Cost & Limits

### Vercel Free Tier
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Perfect for portfolio analytics
- ✅ ~100,000 function invocations/month

### When to Upgrade
- Bandwidth > 100 GB/month
- Need team collaboration
- Custom deployment regions

## Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use Vercel environment variables

2. **Use environment variables**
   - Store sensitive data in Vercel dashboard
   - Never hardcode passwords

3. **Monitor usage**
   - Check Vercel analytics
   - Set up alerts for errors

4. **Rotate passwords**
   - Change MongoDB password every 3-6 months
   - Update in Vercel environment variables

## Next Steps

1. ✅ Deploy backend to Vercel
2. ⏳ Update frontend API URL
3. ⏳ Deploy frontend to Vercel
4. ⏳ Test end-to-end
5. ⏳ Monitor analytics data

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

**You're ready to deploy! 🚀**

Choose Method 1 (Dashboard) for easiest deployment or Method 2 (CLI) for more control.
