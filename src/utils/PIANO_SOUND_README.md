# Piano Sound System

Interactive piano sounds for the mobile "Explore Skills" section using the Web Audio API.

## Features

- **No external audio files** - Generates realistic piano sounds using Web Audio API
- **Multiple harmonics** - Creates rich piano timbre with fundamental + 3 harmonics
- **Realistic envelope** - ADSR envelope (Attack, Decay, Sustain, Release) for authentic piano feel
- **Attack noise** - Subtle noise burst simulates piano hammer strike
- **Different patterns** - Each skill card plays a unique chord progression
- **Melody mode** - "Explore Skills" label plays a pleasant C major scale

## Implementation

### Piano Sound Generator
Located in `src/utils/pianoSound.js`

**Key Features:**
- Singleton pattern for efficient resource usage
- Lazy initialization (only creates AudioContext after user interaction)
- Multiple oscillators for rich harmonics
- Envelope shaping for realistic piano dynamics
- High-pass filtered noise for attack transient

### Integration
Applied to `src/components/Hero.jsx` mobile section:

```javascript
import pianoSound from '../utils/pianoSound'

// On skill card click
onClick={() => pianoSound.playSkillSound(index)}

// On "Explore Skills" label click
onClick={() => pianoSound.playExploreMelody()}
```

## Sound Patterns

### Skill Card Sounds
Each skill plays a different chord:
1. Frontend Development - C major (C-E-G)
2. UI/UX Design - D minor (D-F-A)
3. Programming - E minor (E-G-B)
4. AI & Automation - F major (F-A-C)
5. Data Analytics - G major (G-B-D)
6. Leadership - A minor (A-C-E)

### Explore Skills Melody
Plays a pleasant C major scale ascending (C-D-E-F-G-A-B-C)

## Technical Details

### Audio Context
- Sample rate: 44100 Hz (default)
- Master volume: 0.3 (30%)
- Polyphony: Multiple notes can play simultaneously

### Harmonics Structure
Each note consists of:
- Fundamental (100% frequency, 40% gain)
- 2nd harmonic (200% frequency, 20% gain)
- 3rd harmonic (300% frequency, 10% gain)
- 4th harmonic (400% frequency, 5% gain)

### Envelope (ADSR)
- Attack: 10ms (quick rise)
- Decay: 90ms (drop to 70%)
- Sustain: 70% of duration (gradual fade to 30%)
- Release: 30% of duration (fade to silence)

### Attack Noise
- Duration: 50ms
- High-pass filter: 2000 Hz
- Gain: 30% → 0% (exponential decay)

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS and macOS)
- ✅ Opera
- ✅ Mobile browsers

**Note:** Web Audio API requires user interaction to start. The first click initializes the audio context.

## Performance

- Lightweight: ~3KB minified
- No external dependencies
- No audio file loading
- Minimal CPU usage
- Automatic cleanup after notes finish

## Customization

### Change Volume
Edit `masterGain.gain.value` in `init()`:
```javascript
this.masterGain.gain.value = 0.3 // 0.0 to 1.0
```

### Change Note Duration
Modify the `duration` parameter:
```javascript
pianoSound.playNote(noteIndex, 0.5) // seconds
```

### Add New Patterns
Add to the `patterns` array in `playSkillSound()`:
```javascript
const patterns = [
  [0, 4, 7],   // C major
  [2, 5, 9],   // D minor
  // Add more...
]
```

### Change Note Frequencies
Edit the `notes` array in `getNoteFrequency()` to use different scales or tunings.

## Visual Feedback

CSS animations enhance the audio experience:
- Hover: Card lifts up slightly
- Active: Card scales down (press effect)
- Smooth transitions with cubic-bezier easing
- Tap highlight disabled for clean mobile experience

## Accessibility

- Visual feedback accompanies all sounds
- Works without sound (visual-only mode)
- No autoplay (user-initiated only)
- Respects system audio settings

## Future Enhancements

Possible improvements:
- Add reverb effect for more spacious sound
- Implement velocity sensitivity
- Add different instrument sounds
- Create longer melodies or sequences
- Add sound on/off toggle
