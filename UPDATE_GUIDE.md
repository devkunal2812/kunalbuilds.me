# 📝 Portfolio Update Guide

This guide shows you how to update different parts of your portfolio website.

## 🎯 Quick Updates

### 1. Update Your Profile Photo
**File**: `src/assets/profile_photo.jpeg`
- Replace this file with your new photo
- Keep the same filename or update the import in `src/components/Hero.jsx`

### 2. Update Personal Information

**File**: `src/components/Hero.jsx`
- **Name**: Line ~40 - `<h1 className={styles.mobileName}>Kunal Chauhan</h1>`
- **Title**: Line ~30 - `Full-Stack Engineer & Product Designer`
- **Stats**: Lines ~42-46
  ```javascript
  { value: '3+',  label: 'Years Exp.' },
  { value: '20+', label: 'Projects' },
  { value: '10+', label: 'Clients' },
  ```
- **Tech Stack**: Line ~120
  ```javascript
  ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma', 'AI Tools']
  ```

### 3. Update About Page

**File**: `src/data/about.js`
- **Bio**: Update the `bio` array with your story
- **Interests**: Update the `interests` array
- **Tools**: Update the `tools` array with your tech stack

### 4. Update Projects

**File**: `src/data/projects.js`
- Add/edit projects in the `PROJECTS` array
- Each project needs:
  ```javascript
  {
    id: 1,
    title: 'Project Name',
    category: 'Web App',
    year: '2024',
    description: 'Project description...',
    tags: ['React', 'Node.js'],
    image: projectImage, // Import at top
    link: 'https://project-url.com',
    github: 'https://github.com/username/repo'
  }
  ```
- Add project images to `src/assets/` folder

### 5. Update Skills

**File**: `src/data/skills.js`
- Update the `SKILL_CARDS` array
- Each skill needs:
  ```javascript
  {
    id: 1,
    title: 'Skill Name',
    sub: 'Category',
    icon: '<svg>...</svg>' // SVG icon code
  }
  ```

### 6. Update Contact Information

**File**: `src/pages/Contact.jsx`
- **Email**: Line ~50 - Update email address
- **Phone**: Line ~60 - Update phone number
- **Location**: Line ~70 - Update location
- **Social Links**: Lines ~80-110 - Update GitHub, LinkedIn, Twitter, etc.

### 7. Update Design Board

**File**: `src/data/designBoard.js`
- Add design work to the `SLIDES` array
- Each slide is an array of design cards
- Add SVG designs to `figma-files/` folder
- Import and reference them in the data file

## 🎨 Styling Updates

### Change Color Scheme

**File**: `src/index.css`
- Update CSS variables (lines 10-30):
  ```css
  --accent: #3b82f6;        /* Primary blue */
  --bg-primary: #fafafa;    /* Background */
  --text-primary: #0a0a0a;  /* Text color */
  ```

### Update Fonts

**File**: `src/index.css`
- Change font imports (lines 1-5)
- Update `font-family` in body styles

## 📄 Content Files to Update

### Resume/CV
- Add your resume PDF to `public/` folder
- Update the resume button link in `src/components/Nav.jsx`

### Favicon
- Replace `public/favicon.svg` with your icon
- Replace `public/favicon-dark.svg` for dark mode

### SEO Meta Tags

**File**: `index.html`
- Update `<title>` tag
- Update meta description
- Update Open Graph tags for social sharing

## 🚀 Deployment Updates

### Update Vercel Project
1. Push changes to GitHub
2. Vercel auto-deploys from main branch
3. Check deployment at: https://kunalbuilds.vercel.app

### Update Domain (if needed)
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add custom domain

## 🎭 Easter Eggs Configuration

### AVG Cinematic
**File**: `src/hooks/useAvgTrigger.js`
- Change trigger keyword (default: 'avg')
- Adjust long-press duration (default: 2000ms)

### Bug Mode
**File**: `src/hooks/useBugMode.js`
- Change trigger keyword (default: 'bug')
- Adjust effect duration (default: 3000ms)

### Piano Sounds
**File**: `src/utils/pianoSound.js`
- Adjust chord progressions
- Change note frequencies
- Modify melody patterns

## 📊 Analytics (Optional)

### Add Google Analytics
1. Get GA tracking ID
2. Add to `index.html` in `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   ```

## 🔧 Advanced Customizations

### Add New Page
1. Create component in `src/pages/`
2. Create CSS module in same folder
3. Add route in `src/App.jsx`
4. Add navigation link in `src/components/Nav.jsx`

### Add New Component
1. Create component in `src/components/`
2. Create CSS module
3. Import and use in pages

### Modify Animations
- Framer Motion animations in component files
- CSS animations in `.module.css` files
- Adjust `duration`, `delay`, `ease` values

## 📝 Content Protection

**File**: `src/utils/contentProtection.js`
- Enable/disable text selection
- Enable/disable right-click
- Enable/disable image dragging
- Customize protection messages

## 🐛 Troubleshooting

### Changes not showing?
1. Clear browser cache (Ctrl+Shift+R)
2. Check browser console for errors
3. Verify file paths are correct
4. Restart dev server: `npm run dev`

### Build errors?
1. Run `npm install` to update dependencies
2. Check for syntax errors in modified files
3. Run `npm run build` to test production build

### Deployment issues?
1. Check Vercel deployment logs
2. Verify `vercel.json` is present
3. Check GitHub repository connection

## 📚 File Structure Reference

```
portfolio/
├── public/              # Static assets
│   ├── favicon.svg
│   └── _redirects
├── src/
│   ├── assets/         # Images, media
│   ├── components/     # React components
│   ├── data/          # Content data files
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app component
│   └── index.css      # Global styles
├── figma-files/       # Design mockups (SVG)
├── index.html         # HTML entry point
└── package.json       # Dependencies

```

## 💡 Tips

1. **Test locally first**: Run `npm run dev` before pushing
2. **Commit often**: Use descriptive commit messages
3. **Backup**: Keep copies of original files
4. **Mobile test**: Check responsive design on mobile
5. **Performance**: Optimize images before adding
6. **Accessibility**: Test with screen readers
7. **SEO**: Update meta tags for each page

## 🔗 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Commit and push changes
git add .
git commit -m "Your message"
git push

# Check for errors
npm run build
```

## 📞 Need Help?

- Check browser console for errors
- Review component documentation
- Test in incognito mode
- Clear cache and rebuild

---

**Remember**: After making changes, always test locally before deploying!
