# Content Protection System

This utility provides comprehensive protection against unauthorized content copying, text selection, and image downloading across your website.

## Features

### Algorithm 1: Event-Based Protection
Prevents user actions through JavaScript event handlers:
- Copy/Cut operations (Ctrl+C, Ctrl+X)
- Right-click context menu
- Image dragging
- Text selection
- Keyboard shortcuts (Ctrl+A, Ctrl+S, Ctrl+P, F12, DevTools shortcuts)

### Algorithm 2: CSS-Based Protection
Applies comprehensive CSS rules:
- Disables text selection via `user-select: none`
- Prevents image dragging via `user-drag: none`
- Removes text highlighting
- Blocks pointer events on images
- Cross-browser compatible

### Algorithm 3: React Hook Integration
Easy-to-use React hooks for component-level protection:
- `useProtectContent()` - Returns props to spread on any component
- `getImageProtectionProps()` - Returns props specifically for images
- `initializeGlobalProtection()` - Sets up site-wide protection

## Implementation

### Global Protection (Already Applied)
The global protection is initialized in `src/App.jsx`:

```javascript
import { initializeGlobalProtection } from './utils/contentProtection'

useEffect(() => {
  const cleanup = initializeGlobalProtection()
  return cleanup
}, [])
```

This provides site-wide protection automatically.

### Image Protection (Already Applied)
Images are protected in the following components:
- `src/components/Hero.jsx` - Profile photo
- `src/pages/Projects.jsx` - Project screenshots
- `src/pages/DesignBoard.jsx` - Design board images

```javascript
import { getImageProtectionProps } from '../utils/contentProtection'

<img 
  src={imageSrc} 
  alt="Description"
  {...getImageProtectionProps()}
/>
```

### Component-Level Protection (Optional)
To protect specific components:

```javascript
import { useProtectContent } from '../utils/contentProtection'

function MyComponent() {
  const protectionProps = useProtectContent(true)
  
  return (
    <div {...protectionProps}>
      Protected content here
    </div>
  )
}
```

## Protected Actions

### Keyboard Shortcuts Blocked
- `Ctrl+C` - Copy
- `Ctrl+X` - Cut
- `Ctrl+A` - Select All
- `Ctrl+S` - Save Page
- `Ctrl+P` - Print
- `F12` - DevTools
- `Ctrl+Shift+I` - DevTools
- `Ctrl+Shift+J` - Console
- `Ctrl+Shift+C` - Inspect Element

### Mouse Actions Blocked
- Right-click context menu
- Text selection/highlighting
- Image dragging
- Copy from context menu

### CSS Protection
- Text selection disabled
- Image dragging disabled
- Pointer events blocked on images
- Selection highlighting removed

## Browser Compatibility

Works across all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Opera
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

⚠️ **Important**: This protection is client-side and can be bypassed by:
- Disabling JavaScript
- Using browser DevTools
- Viewing page source
- Using browser extensions
- Taking screenshots

This protection is designed to:
✅ Deter casual users from copying content
✅ Prevent accidental copying
✅ Make it harder for non-technical users to steal content
✅ Show professionalism and content ownership

For true content security, consider:
- Watermarking images
- Using lower resolution images
- Server-side rendering
- Legal copyright notices
- DMCA protection

## Testing

To verify protection is working:
1. Try to select text on the page (should not work)
2. Try to right-click (should be blocked)
3. Try to drag images (should not work)
4. Try Ctrl+C on text (should be blocked)
5. Try to open DevTools with F12 (should be blocked)

## Disabling Protection

To disable protection for specific elements, add the class `unprotected`:

```css
.unprotected {
  user-select: text !important;
  -webkit-user-select: text !important;
}
```

Or remove the protection props from specific components.

## Performance

The protection system is lightweight:
- ~2KB minified
- No external dependencies
- Minimal performance impact
- Event listeners are properly cleaned up

## Maintenance

The protection is automatically applied and requires no maintenance. If you need to update protection rules, edit `src/utils/contentProtection.js`.
