# 📸 Gallery Photos Update Guide

## Quick Steps to Update Gallery

### 1️⃣ Add Your Photos to Assets Folder

**Location**: `src/assets/`

**Add your photos** (6 photos recommended):
```
src/assets/
├── hackathon-2024.jpg
├── praxis-event.jpg
├── team-photo.jpg
├── workshop-svit.jpg
├── project-demo.jpg
└── coding-session.jpg
```

**Photo Guidelines**:
- ✅ Format: JPG, PNG, or WebP
- ✅ Size: 800x600px to 1200x900px (4:3 or 16:9 aspect ratio)
- ✅ File size: Under 500KB each (compress if needed)
- ✅ Quality: High quality but optimized for web

---

### 2️⃣ Update Gallery Data

**File**: `src/data/aboutSections.js`

**Find the `GALLERY_DATA` section** and update it:

```javascript
export const GALLERY_DATA = [
  {
    image: '/src/assets/hackathon-2024.jpg',  // ← Your image path
    caption: 'Hackathon 2024'                  // ← Your caption
  },
  {
    image: '/src/assets/praxis-event.jpg',
    caption: 'PRAXIS Club Event'
  },
  {
    image: '/src/assets/team-photo.jpg',
    caption: 'Team Photo at SVIT'
  },
  {
    image: '/src/assets/workshop-svit.jpg',
    caption: 'Workshop Session'
  },
  {
    image: '/src/assets/project-demo.jpg',
    caption: 'Project Demo Day'
  },
  {
    image: '/src/assets/coding-session.jpg',
    caption: 'Late Night Coding'
  }
]
```

---

### 3️⃣ Example: Complete Update

**Before**:
```javascript
{
  image: '/path/to/image1.jpg',
  caption: 'Hackathon 2024'
}
```

**After**:
```javascript
{
  image: '/src/assets/hackathon-2024.jpg',
  caption: 'Won First Place at College Hackathon 2024'
}
```

---

### 4️⃣ Add/Remove Photos

**To add more photos**:
```javascript
export const GALLERY_DATA = [
  // ... existing photos ...
  {
    image: '/src/assets/new-photo.jpg',
    caption: 'New Event'
  }
]
```

**To remove a photo**:
Simply delete the entire object from the array.

---

## 🎨 Caption Ideas

Make your captions descriptive and engaging:

**Good Examples**:
- ✅ "Won First Place at College Hackathon 2024"
- ✅ "PRAXIS Club - PRIMORIS Event Launch"
- ✅ "Team Photo at TRAE MiniMax AI Event"
- ✅ "Workshop on Full-Stack Development"
- ✅ "Late Night Coding Session with Team"
- ✅ "Project Demo at SVIT Annual Fest"

**Avoid**:
- ❌ "Photo 1"
- ❌ "IMG_1234"
- ❌ Generic captions without context

---

## 🖼️ Image Optimization Tips

### Before Adding Photos:

1. **Resize Images**:
   - Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
   - Target: 800-1200px width
   - Keep aspect ratio consistent

2. **Compress Images**:
   - Aim for under 500KB per image
   - Use 80-85% quality for JPG
   - Consider WebP format for better compression

3. **Rename Files**:
   - Use descriptive names: `hackathon-2024.jpg`
   - Use lowercase and hyphens
   - Avoid spaces and special characters

---

## 📁 File Structure

```
your-portfolio/
├── src/
│   ├── assets/
│   │   ├── hackathon-2024.jpg      ← Add your photos here
│   │   ├── praxis-event.jpg
│   │   ├── team-photo.jpg
│   │   ├── workshop-svit.jpg
│   │   ├── project-demo.jpg
│   │   └── coding-session.jpg
│   └── data/
│       └── aboutSections.js         ← Update gallery data here
```

---

## 🚀 After Updating

1. **Save the file**: `src/data/aboutSections.js`
2. **Test locally**: Run `npm run dev` and check `/gallery`
3. **Commit changes**:
   ```bash
   git add src/assets/* src/data/aboutSections.js
   git commit -m "Update gallery photos"
   git push origin main
   ```
4. **Deploy**: Vercel will auto-deploy your changes

---

## 🎯 Current Gallery Structure

The gallery displays photos in a **3-column grid** on desktop:
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column

Each photo has:
- ✅ Hover zoom effect
- ✅ Caption overlay
- ✅ Smooth animations
- ✅ Responsive sizing

---

## 💡 Pro Tips

1. **Use consistent aspect ratio** for all photos (e.g., all 4:3 or all 16:9)
2. **Add variety**: Mix event photos, team photos, project demos, and candid shots
3. **Tell a story**: Arrange photos chronologically or by theme
4. **Quality over quantity**: 6-9 high-quality photos are better than 20 mediocre ones
5. **Update regularly**: Keep your gallery fresh with recent events

---

## 🆘 Troubleshooting

### Photos not showing?
- ✅ Check file path: `/src/assets/your-image.jpg`
- ✅ Verify file exists in `src/assets/` folder
- ✅ Check file name spelling (case-sensitive)
- ✅ Clear browser cache (Ctrl+Shift+R)

### Photos too large?
- ✅ Compress images before adding
- ✅ Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
- ✅ Target: Under 500KB per image

### Layout looks broken?
- ✅ Use consistent aspect ratios
- ✅ Check that all image paths are correct
- ✅ Verify no syntax errors in `aboutSections.js`

---

## 📝 Example: Complete Gallery Update

```javascript
export const GALLERY_DATA = [
  {
    image: '/src/assets/hackathon-winner-2024.jpg',
    caption: 'Won First Place at College Hackathon 2024 🏆'
  },
  {
    image: '/src/assets/praxis-primoris-event.jpg',
    caption: 'PRAXIS Club - PRIMORIS Flagship Event Launch'
  },
  {
    image: '/src/assets/trae-minimax-team.jpg',
    caption: 'Team Photo at TRAE MiniMax AI Event - Growi Tech'
  },
  {
    image: '/src/assets/svit-workshop-fullstack.jpg',
    caption: 'Full-Stack Development Workshop at SVIT'
  },
  {
    image: '/src/assets/prakash-fest-2024.jpg',
    caption: 'Organizing Prakash 2024 - SVIT Annual Fest'
  },
  {
    image: '/src/assets/coding-session-night.jpg',
    caption: 'Late Night Coding Session with the Team'
  },
  {
    image: '/src/assets/project-demo-day.jpg',
    caption: 'Presenting Praxis Coding Platform Demo'
  },
  {
    image: '/src/assets/infosys-certificate.jpg',
    caption: 'Infosys Springboard AI/ML Certification'
  }
]
```

---

**Need help?** Check the existing photos in `src/assets/` for reference!
