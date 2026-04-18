# AVG Cinematic v2 — Avengers Endgame Effect

Full-screen cinematic triggered by typing `avg`. Built entirely with React refs, Canvas 2D API, and Web Audio API — zero runtime dependencies beyond React.

---

## What's New in v2

### Fully 3D Procedural Hand
- Drawn in Canvas 2D with gradient shading to simulate cylindrical depth
- Separate segments per finger (3 phalanges each) with knuckle crease lines
- Fingernails, palm lines, and bevel highlights
- Gold gauntlet cuff with engraving lines and metallic rivets
- 6 Infinity Stones set at anatomically correct knuckle/palm positions
- Stones glow with pulsing corona, facet highlights, and outer rings
- Snap animation: thumb/index finger curl mid-sequence
- Ash disintegration: hand fades out during snap via opacity decay

### Solar System Planets (procedural — no images needed)
- 4 planets: Jupiter (banded + Great Red Spot), Saturn (rings + bands), Neptune (storm vortex), Mars (red terrain)
- Each planet clips a scrolling band texture to a sphere, adds 3D radial shading, and a coloured atmosphere rim
- Planetary rings drawn as stacked arcs in two halves (back + front) for correct depth ordering
- All planets drift with a slow sinusoidal parallax float
- Background features animated nebula clouds (multiple radial gradients) and a twinkling starfield

### Particle System Upgrade
- 550 ash particles (more than v1) with turbulence vectors
- Ellipse and rect shapes randomly mixed for organic feel
- 65 spark bursts at the snap epicentre
- 240 rebuild particles with comet trails converging to centre
- Central convergence burst at end of restore phase

### Cinematic Audio (Web Audio API synthesis)
| Phase | Sound |
|-------|-------|
| Activation | 4-voice brass chord + double timpani + shimmer strings |
| Snap | Noise burst + bass thud + whoosh sweep |
| Empty | 3-voice vibrato strings (eerie) |
| Comeback | 6-note heroic motif (E-G-A-C-E-G) + power chord + 4 drum hits |
| Restore | 6-note ascending triangle chime |

### Cinematic Letterbox
- Permanent black bars top and bottom during the sequence

---

## Files

| File | Description |
|------|-------------|
| `AvgCinematic.jsx` | Main component — `PlanetRenderer`, `HandRenderer`, `ParticleSystem`, `AudioEngine` classes + React wrapper |
| `AvgCinematic.module.css` | Styles — stone glow animations, gradient text, transitions |
| `useAvgTrigger.js` | Input hook — watches for keyword, fires/resets cinematic |
| `App.jsx` | Minimal integration example |
| `App.module.css` | App styles |

---

## Usage

```jsx
import AvgCinematic from './AvgCinematic'
import { useAvgTrigger } from './useAvgTrigger'

export default function MyApp() {
  const { isCinematicActive, onInputChange, onCinematicComplete } = useAvgTrigger()
  return (
    <>
      <input onChange={e => onInputChange(e.target.value)} placeholder="type avg..." />
      <AvgCinematic isActive={isCinematicActive} onComplete={onCinematicComplete} />
    </>
  )
}
```

---

## Phase Timeline

| Phase | Time | Highlights |
|-------|------|------------|
| ACTIVATION | 0–0.8s | Planets appear, stones light up 1-by-1, gauntlet fades in |
| SNAP | 0.8–3.5s | Finger curl, crack flash, 550 ash particles, 65 sparks |
| EMPTY | 3.5–7s | 93% darkness, "Everything fades." |
| EMOTIONAL | 7–11s | "But not everything is lost." / "Some things return stronger." |
| COMEBACK | 11–14s | Heroic motif, 3 pulse rings, "I am the comeback." |
| RESTORE | 14–17s | 240 convergence particles, chime, screen brightens |
| COMPLETE | 17s+ | `onComplete` fires, overlay unmounts |

---

## Customisation

```js
// Change trigger keyword
useAvgTrigger({ keyword: 'thanos' })

// Change comeback text — find in AvgCinematic.jsx
<h1 ... className={...}>I am the comeback.</h1>

// Add more planets — edit _initPlanets() in PlanetRenderer
// Adjust stone colors — edit STONE_DEFS at top of file
// Change timing — edit getPhase() function in component
```

---

## Requirements

- React 17+ (hooks)
- Browser with Canvas 2D + Web Audio API (all modern browsers)
- No other dependencies