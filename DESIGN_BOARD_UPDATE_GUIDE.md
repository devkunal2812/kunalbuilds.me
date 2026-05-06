# 🎨 Design Board Update Guide

## What is the Design Board?

The Design Board is an **interactive portfolio showcase** that displays your design work in a **Pinterest-style collage** with:
- 📌 Sticky note cards with rotation effects
- 🖼️ Multiple slides (UI/Product, Graphic/Print, Motion/Interaction)
- 🔍 Click to expand and see full details
- 📱 Fully responsive and touch-friendly

---

## 📁 File Structure

```
your-portfolio/
├── figma-files/              ← Add your design images here (SVG/PNG)
│   ├── 10_dashboard-ui-design.svg
│   ├── 11_mobile-app-ui.svg
│   └── ... (your design files)
├── src/
│   ├── assets/               ← Alternative location for images
│   │   └── ui_1.png
│   └── data/
│       └── designBoard.js    ← Update design data here
```

---

## 🚀 Quick Start: Add Your Design

### Step 1: Add Your Design Image

**Option A: Use `figma-files/` folder** (Recommended for SVG exports)
```
figma-files/
├── my-dashboard-design.svg
├── my-mobile-app.png
└── my-branding-work.svg
```

**Option B: Use `src/assets/` folder** (For PNG/JPG)
```
src/assets/
├── my-design-1.png
├── my-design-2.jpg
```

---

### Step 2: Import Your Image

**File**: `src/data/designBoard.js`

**At the top of the file**, add your import:

```javascript
// Add your imports here
import myDashboard from '../../figma-files/my-dashboard-design.svg'
import myMobileApp from '../assets/my-mobile-app.png'
```

---

### Step 3: Add Design Card to a Slide

Find the slide you want (Slide 1, 2, or 3) and add your design:

```javascript
{
  id: 26,                              // Unique ID (increment from last)
  title: 'My Awesome Dashboard',       // Card title
  category: 'UI Design',               // Category label
  image: myDashboard,                  // Your imported image
  accent: '#3b82f6',                   // Sticky note color (hex)
  w: 200,                              // Width in pixels
  h: 150,                              // Height in pixels
  top: '10%',                          // Position from top
  left: '20%',                         // Position from left
  rotate: -5,                          // Rotation angle (-10 to 10)
  z: 8,                                // Stack order (1-10)
  description: 'Full description of your design work...',
  tools: ['Figma', 'React', 'Tailwind'],
  purpose: 'Why you created this design...',
}
```

---

## 📐 Understanding the Layout

### Slide Structure

The design board has **3 slides**:

1. **Slide 1**: UI / Product Work (web apps, dashboards, mobile apps)
2. **Slide 2**: Graphic / Print Work (posters, branding, social media)
3. **Slide 3**: Motion / Interaction (animations, micro-interactions)

### Card Positioning

Cards are positioned using **percentage-based coordinates**:

```javascript
top: '10%',   // 10% from top of screen
left: '20%',  // 20% from left of screen
```

**Layout Grid Reference**:
```
Top Row:    top: '5%' to '10%'
Middle Row: top: '35%' to '42%'
Bottom Row: top: '60%' to '65%'

Left:       left: '4%' to '10%'
Center-L:   left: '27%' to '32%'
Center-R:   left: '51%' to '56%'
Right:      left: '73%' to '78%'
```

---

## 🎨 Customization Options

### 1. Card Size

```javascript
w: 200,  // Width: 150-220px (small to large)
h: 150,  // Height: 120-230px (short to tall)
```

**Recommended Sizes**:
- Small card: `w: 165, h: 135`
- Medium card: `w: 185, h: 145`
- Large card: `w: 210, h: 160`
- Tall card: `w: 175, h: 210`

---

### 2. Rotation Angle

```javascript
rotate: -5,  // Rotate left: -10 to -1
rotate: 0,   // No rotation
rotate: 5,   // Rotate right: 1 to 10
```

**Tips**:
- Mix positive and negative rotations for natural look
- Keep between -6 and 6 for best effect
- Avoid all cards having same rotation

---

### 3. Accent Color (Sticky Note Color)

```javascript
accent: '#3b82f6',  // Blue
```

**Popular Colors**:
```javascript
'#3b82f6'  // Blue
'#a3e635'  // Green
'#fbbf24'  // Yellow/Gold
'#f472b6'  // Pink
'#8b5cf6'  // Purple
'#06b6d4'  // Cyan
'#ec4899'  // Hot Pink
'#34d399'  // Emerald
'#60a5fa'  // Light Blue
```

---

### 4. Stack Order (z-index)

```javascript
z: 8,  // Higher number = on top (1-10)
```

**Guidelines**:
- Important cards: `z: 9-10`
- Normal cards: `z: 6-8`
- Background cards: `z: 5-6`

---

## 📝 Complete Example: Adding a New Design

### Example 1: Add Dashboard Design to Slide 1

**Step 1**: Add image to `figma-files/my-dashboard.svg`

**Step 2**: Import in `designBoard.js`:
```javascript
import myDashboard from '../../figma-files/my-dashboard.svg'
```

**Step 3**: Add to Slide 1 array:
```javascript
export const SLIDES = [
  // Slide 1 - UI / Product Work
  [
    // ... existing cards ...
    
    {
      id: 26,
      title: 'Analytics Dashboard',
      category: 'UI Design',
      image: myDashboard,
      accent: '#3b82f6',
      w: 195,
      h: 145,
      top: '8%',
      left: '25%',
      rotate: -4,
      z: 8,
      description: 'Modern analytics dashboard with real-time data visualization, interactive charts, and customizable widgets. Features dark mode support and responsive design.',
      tools: ['Figma', 'React', 'Chart.js', 'Tailwind CSS'],
      purpose: 'To help users understand their data at a glance and make informed decisions quickly.',
    },
  ],
  // ... other slides
]
```

---

### Example 2: Add Branding Work to Slide 2

```javascript
import myBranding from '../../figma-files/my-brand-identity.svg'

// In Slide 2 array:
{
  id: 27,
  title: 'Tech Startup Branding',
  category: 'Branding',
  image: myBranding,
  accent: '#c084fc',
  w: 185,
  h: 155,
  top: '40%',
  left: '30%',
  rotate: 3,
  z: 7,
  description: 'Complete brand identity for a tech startup including logo design, color palette, typography system, and brand guidelines.',
  tools: ['Figma', 'Illustrator', 'Photoshop'],
  purpose: 'To create a memorable and professional brand identity that resonates with the target audience.',
}
```

---

## 🎯 Categories Reference

Use these categories for consistency:

### Slide 1 (UI/Product):
- `'UI Design'`
- `'App UI'`
- `'Web Design'`
- `'Design System'`

### Slide 2 (Graphic/Print):
- `'Branding'`
- `'Print Design'`
- `'Social Design'`
- `'Editorial'`
- `'Graphic Design'`
- `'Product Design'`

### Slide 3 (Motion/Interaction):
- `'Web Animation'`
- `'Interaction'`
- `'Motion'`
- `'Creative'`

---

## 🛠️ Tools Reference

Common tools to list:

**Design Tools**:
- `'Figma'`
- `'Adobe XD'`
- `'Sketch'`
- `'Illustrator'`
- `'Photoshop'`
- `'CorelDRAW'`
- `'Canva'`

**Development Tools**:
- `'React'`
- `'Next.js'`
- `'TypeScript'`
- `'Tailwind CSS'`
- `'CSS Modules'`
- `'Framer Motion'`
- `'GSAP'`

**Other Tools**:
- `'Storybook'`
- `'Chart.js'`
- `'Socket.io'`
- `'Stripe'`
- `'Web Audio API'`

---

## 📋 Card Without Image (Placeholder)

If you don't have an image yet:

```javascript
{
  id: 28,
  title: 'Coming Soon Design',
  category: 'UI Design',
  image: null,  // ← No image = shows placeholder icon
  accent: '#60a5fa',
  w: 185,
  h: 145,
  top: '10%',
  left: '50%',
  rotate: -3,
  z: 7,
  description: 'Description of your upcoming design work.',
  tools: ['Figma', 'React'],
  purpose: 'Purpose of this design.',
}
```

---

## 🎨 Layout Tips

### Creating a Balanced Layout

1. **Vary card sizes**: Mix small, medium, and large cards
2. **Alternate rotations**: Don't rotate all cards the same way
3. **Use different colors**: Mix accent colors for visual interest
4. **Avoid overlaps**: Check that cards don't cover each other too much
5. **Create depth**: Use z-index to layer cards naturally

### Positioning Strategy

```
Row 1 (Top):    4-5 cards
Row 2 (Middle): 4-5 cards  
Row 3 (Bottom): 2-3 cards (fewer for breathing room)
```

**Example Layout**:
```
[Card1]  [Card2]  [Card3]  [Card4]
   [Card5]  [Card6]  [Card7]
      [Card8]  [Card9]
```

---

## 🖼️ Image Guidelines

### File Formats
- ✅ **SVG**: Best for Figma exports (scalable, small file size)
- ✅ **PNG**: Good for screenshots with transparency
- ✅ **JPG**: Good for photos, but no transparency

### Image Size
- **Width**: 800-1600px
- **Height**: 600-1200px
- **File size**: Under 500KB (compress if needed)

### Exporting from Figma
1. Select your frame/artboard
2. Export as **SVG** or **PNG 2x**
3. Save to `figma-files/` folder
4. Use descriptive filename: `dashboard-analytics-ui.svg`

---

## 🔄 Updating Existing Cards

### Change Image
```javascript
// Before
image: oldImage,

// After
import newImage from '../../figma-files/new-design.svg'
image: newImage,
```

### Change Position
```javascript
// Move card to different position
top: '40%',   // Was '10%'
left: '50%',  // Was '20%'
```

### Change Color
```javascript
accent: '#ec4899',  // Change sticky note color
```

---

## 🗑️ Removing a Card

Simply delete the entire card object from the array:

```javascript
// Delete this entire block:
{
  id: 10,
  title: 'Old Design',
  // ... rest of card
},
```

---

## ✅ Testing Your Changes

1. **Save** `src/data/designBoard.js`
2. **Run** `npm run dev`
3. **Navigate** to `/design-board`
4. **Check**:
   - ✅ All images load correctly
   - ✅ Cards are positioned well
   - ✅ No overlapping issues
   - ✅ Click to expand works
   - ✅ Responsive on mobile

---

## 🎯 Complete Template

Copy this template for new cards:

```javascript
{
  id: 99,                              // Unique ID
  title: 'Your Design Title',          // Short, descriptive
  category: 'UI Design',               // See categories above
  image: yourImage,                    // Imported image or null
  accent: '#3b82f6',                   // Hex color
  w: 185,                              // Width (150-220)
  h: 145,                              // Height (120-230)
  top: '10%',                          // Position from top
  left: '30%',                         // Position from left
  rotate: -4,                          // Rotation (-10 to 10)
  z: 8,                                // Stack order (1-10)
  description: 'Detailed description of your design work, what problem it solves, and key features. Be specific and highlight your design decisions.',
  tools: ['Figma', 'React', 'Tailwind'],
  purpose: 'Why you created this design and what value it provides to users or the business.',
}
```

---

## 🆘 Troubleshooting

### Image not showing?
- ✅ Check import path is correct
- ✅ Verify file exists in folder
- ✅ Check file extension (.svg, .png, .jpg)
- ✅ Try using absolute path: `/figma-files/your-image.svg`

### Cards overlapping?
- ✅ Adjust `top` and `left` positions
- ✅ Change `z` values to control stacking
- ✅ Reduce card sizes (`w` and `h`)

### Layout looks messy?
- ✅ Use the positioning grid reference above
- ✅ Keep rotations between -6 and 6
- ✅ Mix card sizes for variety
- ✅ Use different accent colors

---

## 💡 Pro Tips

1. **Export from Figma**: Use SVG for best quality and small file size
2. **Compress images**: Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
3. **Consistent naming**: Use descriptive filenames like `dashboard-analytics-ui.svg`
4. **Test on mobile**: Design board is fully responsive
5. **Update regularly**: Keep your design board fresh with latest work
6. **Tell a story**: Arrange cards to show your design journey
7. **Quality over quantity**: 8-12 cards per slide is ideal

---

## 📊 Current Slides Overview

### Slide 1: UI / Product Work (9 cards)
- Portfolio UI, Dashboard, Mobile App, E-Commerce, Landing Page, Component Library, Brand Identity, Chat App, Music Player

### Slide 2: Graphic / Print Work (8 cards)
- Social Media Graphics, Yearbook, Event Poster, Magazine, PRAXIS Branding, Business Card, Infographic, Packaging

### Slide 3: Motion / Interaction (8 cards)
- Scroll Animations, Micro Interactions, Hover Effects, Page Transitions, Visual Experiments, Loading Animations, Gesture Controls, Parallax

---

## 🚀 After Updating

1. **Save** all changes
2. **Test** locally: `npm run dev`
3. **Commit** changes:
   ```bash
   git add figma-files/* src/data/designBoard.js
   git commit -m "Update design board with new work"
   git push origin main
   ```
4. **Deploy**: Vercel auto-deploys your changes

---

## 📚 Additional Resources

- **Figma Export Guide**: [Figma Help Center](https://help.figma.com/hc/en-us/articles/360040028114-Export-from-Figma)
- **Image Optimization**: [TinyPNG](https://tinypng.com/)
- **Color Picker**: [Coolors](https://coolors.co/)
- **SVG Optimizer**: [SVGOMG](https://jakearchibald.github.io/svgomg/)

---

**Need help?** Check the existing cards in `src/data/designBoard.js` for reference!
