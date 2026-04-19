# ✅ Vercel Deployment Checklist

Quick checklist to deploy your analytics backend to Vercel.

## Pre-Deployment

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for testing)
- [ ] Connection string copied
- [ ] Backend code ready in `analytics-backend/` folder

## GitHub Setup

- [ ] Create GitHub repository: `portfolio-analytics-backend`
- [ ] Initialize git in `analytics-backend/` folder
- [ ] Add and commit all files
- [ ] Push to GitHub

```bash
cd analytics-backend
git init
git add .
git commit -m "Initial commit: Analytics backend"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-analytics-backend.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

- [ ] Go to https://vercel.com
- [ ] Sign up / Login with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Import `portfolio-analytics-backend` repository
- [ ] Configure project:
  - Framework: Other
  - Root Directory: ./
  - Build Command: (empty)
  - Install Command: npm install
- [ ] Add environment variables:
  - `MONGODB_URI`: Your full connection string
  - `PORT`: 3001
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete

## Post-Deployment Testing

- [ ] Copy your Vercel URL (e.g., `https://portfolio-analytics-backend-xxx.vercel.app`)
- [ ] Test health endpoint:
```bash
curl https://your-project.vercel.app/health
```
- [ ] Test analytics endpoint:
```bash
curl -X POST https://your-project.vercel.app/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","page":"/","device":"desktop","browser":"Chrome","os":"Windows","screen":"1920x1080","duration":0,"referrer":"direct","eventType":"visit"}'
```
- [ ] Check MongoDB Atlas for test data
- [ ] Check Vercel logs for any errors

## Update Frontend

- [ ] Open `src/utils/analytics.js`
- [ ] Find line ~60: `const API_URL = '/api/analytics'`
- [ ] Replace with: `const API_URL = 'https://your-project.vercel.app/api/analytics'`
- [ ] Save file
- [ ] Test locally
- [ ] Commit and push changes

## Final Verification

- [ ] Deploy frontend to Vercel/Netlify
- [ ] Visit your portfolio website
- [ ] Open browser DevTools → Network tab
- [ ] Navigate between pages
- [ ] Check for POST requests to analytics API
- [ ] Verify data in MongoDB Atlas
- [ ] Check Vercel function logs

## Troubleshooting

### If deployment fails:
- Check Vercel logs in dashboard
- Verify `vercel.json` exists
- Check `package.json` dependencies

### If MongoDB connection fails:
- Verify `MONGODB_URI` in Vercel environment variables
- Check MongoDB Atlas Network Access
- Verify password is correct (no special characters or URL encoded)

### If API returns 404:
- Check `vercel.json` routes
- Verify deployment completed
- Check function logs

### If CORS error:
- Backend has CORS enabled
- Check API URL in frontend
- Verify Vercel deployment is live

## Success Criteria

✅ Backend deployed to Vercel
✅ Health endpoint returns 200
✅ Analytics endpoint accepts data
✅ Data appears in MongoDB Atlas
✅ Frontend connected to backend
✅ Analytics tracking works end-to-end

## Your URLs

**Backend API:**
```
https://your-project.vercel.app/api/analytics
```

**Health Check:**
```
https://your-project.vercel.app/health
```

**Stats:**
```
https://your-project.vercel.app/api/analytics/stats
```

**Recent Visits:**
```
https://your-project.vercel.app/api/analytics/recent?limit=10
```

## Next Steps

1. ✅ Backend deployed
2. ⏳ Update frontend API URL
3. ⏳ Deploy frontend
4. ⏳ Test complete flow
5. ⏳ Monitor analytics data
6. ⏳ Build admin dashboard (future)

---

**Need help?** Check `analytics-backend/VERCEL_DEPLOYMENT.md` for detailed guide.
