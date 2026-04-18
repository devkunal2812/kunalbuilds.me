# AVG Cinematic Effect — Avengers Endgame Style

A cinematic React component triggered by typing `avg`, featuring:

- **3D canvas-based particles** — ash disintegration + rebuild trails with depth/perspective
- **Synthesized orchestra audio** — brass hits, snap crack, comeback motif (E-G-A-C-E), chime restore
- **Infinity Gauntlet SVG** — hand-drawn with all 6 animated Infinity Stones
- **Sling Ring Portal** — spinning conic-gradient portal
- **6-Stone HUD** — stones light up sequentially on activation
- **Starfield background** — twinkling stars throughout
- **17-second timeline** — 7 cinematic phases with precise timing

---

## Files

| File | Description |
|------|-------------|
| `AvgCinematic.jsx` | Main component — canvas engine, audio, phases, SVG gauntlet |
| `AvgCinematic.module.css` | All styles — overlay, portal, gauntlet, text, stones |
| `useAvgTrigger.js` | Hook — watches input for `avg` keyword, fires effect |
| `App.jsx` | Example integration |
| `App.module.css` | Example styles |

---

## Setup

```bash
# No extra dependencies needed beyond React
# (framer-motion is NOT used — pure canvas + Web Audio API)
npm install react react-dom
```

---

## Usage

### Basic (copy-paste into your app)

```jsx
import AvgCinematic from './AvgCinematic'
import { useAvgTrigger } from './useAvgTrigger'

export default function MyApp() {
  const { isCinematicActive, onInputChange, onCinematicComplete } = useAvgTrigger()

  return (
    <>
      <input
        onChange={e => onInputChange(e.target.value)}
        placeholder="Type avg..."
      />

      <AvgCinematic
        isActive={isCinematicActive}
        onComplete={onCinematicComplete}
      />
    </>
  )
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `isActive` | `boolean` | Mounts and starts the cinematic |
| `onComplete` | `() => void` | Called when the 17s sequence finishes |

### Hook options

```js
useAvgTrigger({
  keyword: 'avg',      // string to watch for (default: 'avg')
  onComplete: () => {} // runs after cinematic ends
})
```

---

## Phase Timeline

| Phase | Time | What happens |
|-------|------|-------------|
| ACTIVATION | 0–0.8s | Screen darkens, stones light up, orchestra hit |
| SNAP | 0.8–3.5s | 400 ash particles, snap crack + sweep audio, portal appears |
| EMPTY | 3.5–7s | 90% darkness, "Everything fades." appears |
| EMOTIONAL | 7–11s | "But not everything is lost." + "Some things return stronger." |
| COMEBACK | 11–14s | Screen brightens, Avengers brass motif, "I am the comeback." |
| RESTORE | 14–17s | 180 rebuild particles converge to center, chime audio |
| COMPLETE | 17s+ | onComplete fires, overlay unmounts |

---

## Customisation

### Change the trigger keyword
```js
useAvgTrigger({ keyword: 'endgame' })
```

### Change the comeback text
In `AvgCinematic.jsx`, find the element with `id="comeback-text"` and edit the text.

### Adjust timing
In `AvgCinematic.jsx`, edit the `PHASES` object at the top.

### Change stone colors
Edit `STONE_COLORS` array at the top of `AvgCinematic.jsx`.

---

## Notes

- Uses **Web Audio API** for all sound — no external audio files needed
- Uses **Canvas 2D API** for particles — no Three.js or WebGL
- No `framer-motion` dependency — fully removed in this version
- Blocks all user interactions during playback (`cursor: wait`)
- Fully responsive — gauntlet/portal hidden on very small screens
