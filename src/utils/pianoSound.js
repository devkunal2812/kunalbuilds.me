/**
 * Piano Sound Generator using Web Audio API
 * Creates realistic piano notes without external audio files
 */

class PianoSoundGenerator {
  constructor() {
    this.audioContext = null
    this.masterGain = null
    this.initialized = false
  }

  // Initialize audio context (must be called after user interaction)
  init() {
    if (this.initialized) return
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.connect(this.audioContext.destination)
      this.masterGain.gain.value = 0.3 // Master volume
      this.initialized = true
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  // Piano note frequencies (C4 to C6 scale)
  getNoteFrequency(noteIndex) {
    const notes = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      349.23, // F4
      392.00, // G4
      440.00, // A4
      493.88, // B4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      698.46, // F5
      783.99, // G5
      880.00, // A5
      987.77, // B5
      1046.50 // C6
    ]
    return notes[noteIndex % notes.length]
  }

  // Create a piano-like sound with harmonics and envelope
  playNote(noteIndex, duration = 0.5) {
    if (!this.initialized) this.init()
    if (!this.audioContext) return

    const now = this.audioContext.currentTime
    const frequency = this.getNoteFrequency(noteIndex)

    // Create oscillators for harmonics (piano has multiple harmonics)
    const oscillators = []
    const gains = []

    // Fundamental + harmonics
    const harmonics = [
      { mult: 1, gain: 0.4 },   // Fundamental
      { mult: 2, gain: 0.2 },   // 2nd harmonic
      { mult: 3, gain: 0.1 },   // 3rd harmonic
      { mult: 4, gain: 0.05 },  // 4th harmonic
    ]

    harmonics.forEach(({ mult, gain: gainValue }) => {
      const osc = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      osc.type = 'sine'
      osc.frequency.value = frequency * mult

      // Piano envelope: quick attack, medium decay, sustain, release
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(gainValue, now + 0.01) // Attack
      gainNode.gain.exponentialRampToValueAtTime(gainValue * 0.7, now + 0.1) // Decay
      gainNode.gain.exponentialRampToValueAtTime(gainValue * 0.3, now + duration * 0.7) // Sustain
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration) // Release

      osc.connect(gainNode)
      gainNode.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + duration)

      oscillators.push(osc)
      gains.push(gainNode)
    })

    // Add subtle noise for realistic piano attack
    const noiseBuffer = this.audioContext.createBuffer(
      1,
      this.audioContext.sampleRate * 0.05,
      this.audioContext.sampleRate
    )
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.02
    }

    const noiseSource = this.audioContext.createBufferSource()
    const noiseGain = this.audioContext.createGain()
    const noiseFilter = this.audioContext.createBiquadFilter()

    noiseSource.buffer = noiseBuffer
    noiseFilter.type = 'highpass'
    noiseFilter.frequency.value = 2000

    noiseGain.gain.setValueAtTime(0.3, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(this.masterGain)

    noiseSource.start(now)
    noiseSource.stop(now + 0.05)
  }

  // Play a pleasant chord progression
  playChord(noteIndices, duration = 0.6) {
    noteIndices.forEach((noteIndex, i) => {
      setTimeout(() => this.playNote(noteIndex, duration), i * 50)
    })
  }

  // Play a quick arpeggio (for skill card clicks)
  playSkillSound(skillIndex) {
    if (!this.initialized) this.init()
    
    // Different pleasant note patterns for each skill
    const patterns = [
      [0, 4, 7],      // C major
      [2, 5, 9],      // D minor
      [4, 7, 11],     // E minor
      [5, 9, 12],     // F major
      [7, 11, 14],    // G major
      [9, 12, 16],    // A minor
    ]

    const pattern = patterns[skillIndex % patterns.length]
    this.playChord(pattern, 0.4)
  }

  // Play a pleasant melody (for "Explore Skills" label click)
  playExploreMelody() {
    if (!this.initialized) this.init()
    
    const melody = [0, 2, 4, 5, 7, 9, 11, 12] // C major scale
    melody.forEach((note, i) => {
      setTimeout(() => this.playNote(note, 0.3), i * 80)
    })
  }
}

// Singleton instance
const pianoSound = new PianoSoundGenerator()

export default pianoSound
