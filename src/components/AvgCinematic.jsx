import { useEffect, useRef, useCallback } from 'react'
import styles from './AvgCinematic.module.css'

// ─── PHASE CONFIG ───────────────────────────────────────────────
const PHASES = {
  ACTIVATION: { name: 'activation', start: 0,    end: 0.8  },
  SNAP:       { name: 'snap',       start: 0.8,  end: 3.5  },
  EMPTY:      { name: 'empty',      start: 3.5,  end: 7    },
  EMOTIONAL:  { name: 'emotional',  start: 7,    end: 11   },
  COMEBACK:   { name: 'comeback',   start: 11,   end: 14   },
  RESTORE:    { name: 'restore',    start: 14,   end: 17   },
  COMPLETE:   { name: 'complete',   start: 17,   end: 17.5 },
}
const PHASE_LIST = Object.values(PHASES)
const TOTAL_DURATION = 17.5

const STONE_COLORS = ['#9400D3','#FF4500','#00BFFF','#00FF7F','#FFD700','#FF69B4']

// ─── AUDIO ENGINE ────────────────────────────────────────────────
class AudioEngine {
  constructor() { this.ctx = null }

  getCtx() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    return this.ctx
  }

  playOrchestraHit(delay = 0) {
    const ac = this.getCtx()
    const t = ac.currentTime + delay

    // Low brass chord
    ;[55, 110, 164].forEach((freq, i) => {
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      const filter = ac.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 800
      osc.connect(filter); filter.connect(gain); gain.connect(ac.destination)
      osc.type = 'sawtooth'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.12 - i * 0.02, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8)
      osc.start(t); osc.stop(t + 2)
    })

    // Timpani
    const drum = ac.createOscillator()
    const dg = ac.createGain()
    drum.connect(dg); dg.connect(ac.destination)
    drum.type = 'sine'
    drum.frequency.setValueAtTime(90, t)
    drum.frequency.exponentialRampToValueAtTime(40, t + 0.4)
    dg.gain.setValueAtTime(0.5, t)
    dg.gain.exponentialRampToValueAtTime(0.001, t + 0.8)
    drum.start(t); drum.stop(t + 1)
  }

  playSnap() {
    const ac = this.getCtx()
    const t = ac.currentTime

    // Noise crack
    const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.15), ac.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3)
    }
    const src = ac.createBufferSource()
    const filter = ac.createBiquadFilter()
    const gain = ac.createGain()
    filter.type = 'bandpass'; filter.frequency.value = 2000; filter.Q.value = 0.5
    src.buffer = buf
    src.connect(filter); filter.connect(gain); gain.connect(ac.destination)
    gain.gain.setValueAtTime(0.8, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
    src.start(t)

    // Sweep
    const sweep = ac.createOscillator()
    const sg = ac.createGain()
    sweep.connect(sg); sg.connect(ac.destination)
    sweep.type = 'sawtooth'
    sweep.frequency.setValueAtTime(600, t)
    sweep.frequency.exponentialRampToValueAtTime(50, t + 0.5)
    sg.gain.setValueAtTime(0.2, t)
    sg.gain.exponentialRampToValueAtTime(0.001, t + 0.6)
    sweep.start(t); sweep.stop(t + 0.6)
  }

  playSilenceBreaker() {
    const ac = this.getCtx()
    const t = ac.currentTime
    ;[523, 659, 784, 880].forEach((freq, i) => {
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain); gain.connect(ac.destination)
      osc.type = 'triangle'; osc.frequency.value = freq
      const st = t + i * 0.3
      gain.gain.setValueAtTime(0, st)
      gain.gain.linearRampToValueAtTime(0.04, st + 0.5)
      gain.gain.linearRampToValueAtTime(0, st + 2)
      osc.start(t); osc.stop(t + 4)
    })
  }

  playComeback() {
    const ac = this.getCtx()
    const t = ac.currentTime

    // Avengers motif: E-G-A-C-E
    const notes = [164.81, 196.00, 220.00, 261.63, 329.63]
    notes.forEach((freq, i) => {
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      const filter = ac.createBiquadFilter()
      filter.type = 'lowpass'; filter.frequency.value = 1200
      osc.connect(filter); filter.connect(gain); gain.connect(ac.destination)
      osc.type = 'sawtooth'; osc.frequency.value = freq
      const st = t + i * 0.18
      gain.gain.setValueAtTime(0, st)
      gain.gain.linearRampToValueAtTime(0.18, st + 0.12)
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.8)
      osc.start(st); osc.stop(st + 1)
    })

    // Drum hits
    ;[0, 0.9, 1.5].forEach(d => {
      const drum = ac.createOscillator()
      const dg = ac.createGain()
      drum.connect(dg); dg.connect(ac.destination)
      drum.type = 'sine'
      drum.frequency.setValueAtTime(80, t + d)
      drum.frequency.exponentialRampToValueAtTime(35, t + d + 0.3)
      dg.gain.setValueAtTime(0.4, t + d)
      dg.gain.exponentialRampToValueAtTime(0.001, t + d + 0.5)
      drum.start(t + d); drum.stop(t + d + 0.6)
    })
  }

  playRestoreChime() {
    const ac = this.getCtx()
    const t = ac.currentTime
    ;[523, 659, 784, 1047, 1319].forEach((freq, i) => {
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain); gain.connect(ac.destination)
      osc.type = 'triangle'; osc.frequency.value = freq
      const st = t + i * 0.15
      gain.gain.setValueAtTime(0.15, st)
      gain.gain.exponentialRampToValueAtTime(0.001, st + 1.2)
      osc.start(st); osc.stop(st + 1.5)
    })
  }
}

// ─── PARTICLE FACTORIES ──────────────────────────────────────────
function createAshParticles(W, H) {
  const colors = ['#e8a838','#ff6b35','#ffd700','#ff8c42','#c8a97e','#8b6914']
  return Array.from({ length: 400 }, () => {
    const cx = W / 2 + (Math.random() - 0.5) * W * 0.6
    const cy = H / 2 + (Math.random() - 0.5) * H * 0.6
    const angle = Math.random() * Math.PI * 2
    const speed = 0.5 + Math.random() * 2.5
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed * (0.3 + Math.random()),
      vy: Math.sin(angle) * speed * (0.3 + Math.random()) - Math.random() * 0.5,
      life: 1,
      decay: 0.004 + Math.random() * 0.008,
      w: 2 + Math.random() * 5,
      h: 1 + Math.random() * 3,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      isEllipse: Math.random() > 0.5,
      z: 0.5 + Math.random() * 0.5,
    }
  })
}

function createRebuildParticles(W, H) {
  const colors = ['#60a5fa','#8b5cf6','#ec4899','#34d399','#fbbf24']
  return Array.from({ length: 180 }, (_, i) => {
    const angle = (i / 180) * Math.PI * 2
    const r = 200 + Math.random() * 200
    return {
      sx: W / 2 + Math.cos(angle) * r,
      sy: H / 2 + Math.sin(angle) * r,
      x: W / 2 + Math.cos(angle) * r,
      y: H / 2 + Math.sin(angle) * r,
      life: 0,
      speed: 0.012 + Math.random() * 0.008,
      delay: i * 0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 4,
      z: 0.5 + Math.random() * 0.5,
    }
  })
}

function createStars(W, H) {
  return Array.from({ length: 200 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    twinkle: Math.random() * Math.PI * 2,
  }))
}

// ─── COMPONENT ───────────────────────────────────────────────────
export default function AvgCinematic({ isActive, onComplete }) {
  const overlayRef     = useRef(null)
  const bgCanvasRef    = useRef(null)
  const pCanvasRef     = useRef(null)
  const textRefs       = useRef({})
  const stoneRefs      = useRef([])
  const gauntletRef    = useRef(null)
  const portalRef      = useRef(null)
  const crackRef       = useRef(null)
  const stoneHudRef    = useRef(null)
  const progressRef    = useRef(null)

  const stateRef = useRef({
    running: false,
    startTime: null,
    animId: null,
    darkness: 0,
    phase: 'idle',
    soundsFired: {},
    textsFired: {},
    stonesActive: [false,false,false,false,false,false],
    ashParticles: [],
    rebuildParticles: [],
    stars: [],
    bgFrame: 0,
    audio: new AudioEngine(),
  })

  const getPhase = useCallback((t) => {
    for (const p of PHASE_LIST) if (t >= p.start && t < p.end) return p.name
    return 'complete'
  }, [])

  const fireOnce = useCallback((key, fn) => {
    const s = stateRef.current
    if (!s.soundsFired[key]) { s.soundsFired[key] = true; fn() }
  }, [])

  const showText = useCallback((id) => {
    const s = stateRef.current
    if (!s.textsFired[id]) {
      s.textsFired[id] = true
      const el = textRefs.current[id]
      if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }
    }
  }, [])

  const hideText = useCallback((id) => {
    const s = stateRef.current
    s.textsFired[id] = false
    const el = textRefs.current[id]
    if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(30px)' }
  }, [])

  const activateStone = useCallback((i) => {
    const s = stateRef.current
    if (!s.stonesActive[i]) {
      s.stonesActive[i] = true
      const el = stoneRefs.current[i]
      if (el) el.classList.add(styles.stoneActive)
    }
  }, [])

  const resetAll = useCallback(() => {
    const s = stateRef.current
    s.running = false; s.startTime = null; s.darkness = 0
    s.soundsFired = {}; s.textsFired = {}
    s.stonesActive = [false,false,false,false,false,false]
    s.ashParticles = []; s.rebuildParticles = []; s.bgFrame = 0

    stoneRefs.current.forEach(el => el?.classList.remove(styles.stoneActive))
    ;['empty-text','hope-text1','hope-text2','comeback-text'].forEach(id => hideText(id))
    if (gauntletRef.current) gauntletRef.current.style.opacity = '0'
    if (portalRef.current) portalRef.current.style.opacity = '0'
    if (crackRef.current) crackRef.current.style.opacity = '0'
    if (stoneHudRef.current) stoneHudRef.current.style.opacity = '0'
    if (progressRef.current) progressRef.current.style.width = '0%'
  }, [hideText])

  const renderBG = useCallback((elapsed, phase) => {
    const s = stateRef.current
    const canvas = bgCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height

    ctx.clearRect(0, 0, W, H)
    
    // Deep space gradient
    const bgGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.7)
    bgGrad.addColorStop(0, '#0a0a0a')
    bgGrad.addColorStop(0.5, '#050505')
    bgGrad.addColorStop(1, '#000000')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, W, H)

    // Nebula during comeback/restore with depth
    if (phase === 'comeback' || phase === 'restore') {
      const intensity = phase === 'comeback' ? 0.08 : 0.12
      const pulse = Math.sin(s.bgFrame * 0.02)
      
      // Multiple nebula layers for depth
      for (let i = 0; i < 3; i++) {
        const offset = i * 100
        const grad = ctx.createRadialGradient(
          W/2 + offset, H/2 - offset/2, 0,
          W/2 + offset, H/2 - offset/2, W * (0.4 + i * 0.15)
        )
        const alpha = (intensity + pulse * 0.03) * (1 - i * 0.3)
        grad.addColorStop(0, `rgba(59,130,246,${alpha})`)
        grad.addColorStop(0.3, `rgba(139,92,246,${alpha * 0.6})`)
        grad.addColorStop(0.6, `rgba(232,168,56,${alpha * 0.3})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      }
    }

    // Enhanced stars with depth and twinkle
    s.stars.forEach(star => {
      star.twinkle += 0.015
      const twinkleIntensity = 0.5 + 0.5 * Math.sin(star.twinkle)
      const a = star.alpha * twinkleIntensity
      
      // Star glow
      const glowGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 3)
      glowGrad.addColorStop(0, `rgba(255,255,255,${a * 0.8})`)
      glowGrad.addColorStop(0.5, `rgba(200,220,255,${a * 0.3})`)
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2)
      ctx.fill()
      
      // Star core
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${a})`
      ctx.fill()
    })

    // Comeback pulse with 3D effect
    if (phase === 'comeback') {
      const pulseTime = elapsed - 11
      const pulse = Math.max(0, Math.sin(pulseTime * 3) * 0.15)
      
      // Multiple pulse rings for depth
      for (let i = 0; i < 3; i++) {
        const ringGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.6 * (1 + i * 0.2))
        ringGrad.addColorStop(0, `rgba(59,130,246,${pulse * (1 - i * 0.3)})`)
        ringGrad.addColorStop(0.5, `rgba(139,92,246,${pulse * 0.5 * (1 - i * 0.3)})`)
        ringGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = ringGrad
        ctx.fillRect(0, 0, W, H)
      }
    }

    // Enhanced snap flash with depth
    if (phase === 'snap' && elapsed < 1.2) {
      const flashTime = elapsed - 0.8
      const flash = Math.max(0, 0.6 - flashTime * 1.5)
      
      // Outer flash
      const flashGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.8)
      flashGrad.addColorStop(0, `rgba(255,220,150,${flash * 0.8})`)
      flashGrad.addColorStop(0.4, `rgba(255,180,100,${flash * 0.5})`)
      flashGrad.addColorStop(0.7, `rgba(232,168,56,${flash * 0.2})`)
      flashGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = flashGrad
      ctx.fillRect(0, 0, W, H)
      
      // Inner bright core
      const coreGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.3)
      coreGrad.addColorStop(0, `rgba(255,255,255,${flash})`)
      coreGrad.addColorStop(0.5, `rgba(255,220,150,${flash * 0.6})`)
      coreGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = coreGrad
      ctx.fillRect(0, 0, W, H)
    }

    s.bgFrame++
  }, [])

  const renderParticles = useCallback((elapsed) => {
    const s = stateRef.current
    const canvas = pCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height

    ctx.clearRect(0, 0, W, H)

    // Enhanced darkness with gradient
    if (s.darkness > 0) {
      const darkGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.7)
      darkGrad.addColorStop(0, `rgba(0,0,0,${s.darkness * 0.5})`)
      darkGrad.addColorStop(0.6, `rgba(0,0,0,${s.darkness * 0.65})`)
      darkGrad.addColorStop(1, `rgba(0,0,0,${s.darkness * 0.75})`)
      ctx.fillStyle = darkGrad
      ctx.fillRect(0, 0, W, H)
    }

    // ── ENHANCED ASH PARTICLES WITH 3D DEPTH ──
    const ashAge = elapsed - 0.8
    s.ashParticles.forEach(p => {
      if (ashAge < p.delay) return
      p.x += p.vx; p.y += p.vy
      p.vy += 0.018 // Slightly stronger gravity
      p.rot += p.rotV
      p.life -= p.decay
      if (p.life <= 0) return

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      
      const alpha = Math.min(p.life, 0.95) * p.z
      const scale = 0.4 + p.z * 0.7 // More depth variation
      ctx.scale(scale, scale)

      // Particle glow for depth
      ctx.globalAlpha = alpha * 0.4
      ctx.fillStyle = p.color
      ctx.shadowColor = p.color
      ctx.shadowBlur = 15 * p.z
      
      ctx.beginPath()
      if (p.isEllipse) {
        ctx.ellipse(0, 0, p.w * 1.8, p.h * 1.8, 0, 0, Math.PI * 2)
      } else {
        const glow = p.w * 1.5
        ctx.rect(-glow / 2, -glow / 2, glow, glow)
      }
      ctx.fill()

      // Particle core with lighting
      ctx.globalAlpha = alpha
      ctx.shadowBlur = 8 * p.z
      
      // Add highlight for 3D effect
      const grad = ctx.createRadialGradient(-p.w * 0.2, -p.h * 0.2, 0, 0, 0, Math.max(p.w, p.h))
      grad.addColorStop(0, p.color)
      grad.addColorStop(0.5, p.color)
      grad.addColorStop(1, `${p.color}80`)
      ctx.fillStyle = grad
      
      ctx.beginPath()
      if (p.isEllipse) {
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2)
      } else {
        ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h)
      }
      ctx.fill()
      
      ctx.restore()
    })
    ctx.globalAlpha = 1; ctx.shadowBlur = 0

    // ── ENHANCED REBUILD PARTICLES WITH 3D TRAILS ──
    if (s.phase === 'restore') {
      const rebuildAge = elapsed - 14
      s.rebuildParticles.forEach(p => {
        if (rebuildAge < p.delay) return
        p.life = Math.min(p.life + p.speed, 1)
        p.x = p.sx + (W / 2 - p.sx) * p.life
        p.y = p.sy + (H / 2 - p.sy) * p.life

        const alpha = Math.sin(p.life * Math.PI) * p.z
        if (alpha <= 0) return

        // Enhanced particle glow
        ctx.save()
        ctx.globalAlpha = alpha * 0.5
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 20 * p.z
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2 * (0.5 + p.z * 0.5), 0, Math.PI * 2)
        ctx.fill()

        // Particle core with 3D lighting
        ctx.globalAlpha = alpha
        ctx.shadowBlur = 12 * p.z
        const coreGrad = ctx.createRadialGradient(
          p.x - p.size * 0.3, p.y - p.size * 0.3, 0,
          p.x, p.y, p.size * (0.5 + p.z * 0.5)
        )
        coreGrad.addColorStop(0, '#ffffff')
        coreGrad.addColorStop(0.3, p.color)
        coreGrad.addColorStop(1, `${p.color}cc`)
        ctx.fillStyle = coreGrad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (0.5 + p.z * 0.5), 0, Math.PI * 2)
        ctx.fill()

        // Enhanced trail with gradient
        ctx.globalAlpha = alpha * 0.4
        const trailLife = Math.max(0, p.life - 0.15)
        const tx = p.sx + (W / 2 - p.sx) * trailLife
        const ty = p.sy + (H / 2 - p.sy) * trailLife
        
        const trailGrad = ctx.createLinearGradient(tx, ty, p.x, p.y)
        trailGrad.addColorStop(0, `${p.color}00`)
        trailGrad.addColorStop(0.5, `${p.color}80`)
        trailGrad.addColorStop(1, p.color)
        
        ctx.strokeStyle = trailGrad
        ctx.lineWidth = p.size * 0.8 * p.z
        ctx.lineCap = 'round'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.restore()
      })
      ctx.globalAlpha = 1; ctx.shadowBlur = 0

      // Enhanced central burst with 3D rings
      const burstProgress = Math.min((elapsed - 14) / 3, 1)
      const burstAlpha = Math.sin(burstProgress * Math.PI) * 0.4
      if (burstAlpha > 0) {
        // Multiple burst rings for depth
        for (let i = 0; i < 4; i++) {
          const ringSize = (120 * burstProgress + 60) * (1 + i * 0.3)
          const ringAlpha = burstAlpha * (1 - i * 0.2)
          const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, ringSize)
          gr.addColorStop(0, `rgba(255,255,255,${ringAlpha})`)
          gr.addColorStop(0.3, `rgba(147,197,253,${ringAlpha * 0.7})`)
          gr.addColorStop(0.6, `rgba(96,165,250,${ringAlpha * 0.4})`)
          gr.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = gr
          ctx.fillRect(0, 0, W, H)
        }
      }
    }
  }, [])

  const loop = useCallback((ts) => {
    const s = stateRef.current
    if (!s.running) return
    if (!s.startTime) s.startTime = ts

    const elapsed = (ts - s.startTime) / 1000
    const progress = Math.min(elapsed / TOTAL_DURATION, 1)
    s.phase = getPhase(elapsed)

    if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`

    // ── ACTIVATION ──
    if (s.phase === 'activation') {
      s.darkness = Math.min(s.darkness + 0.01, 0.5)
      fireOnce('orchestra', () => s.audio.playOrchestraHit())
      STONE_COLORS.forEach((_, i) => { if (elapsed > i * 0.1) activateStone(i) })
      if (stoneHudRef.current) stoneHudRef.current.style.opacity = '1'
      if (gauntletRef.current) gauntletRef.current.style.opacity = '0.6'
    }

    // ── SNAP ──
    if (s.phase === 'snap') {
      s.darkness = Math.min(s.darkness + 0.008, 0.85)
      fireOnce('snap', () => {
        s.audio.playSnap()
        const W = pCanvasRef.current?.width || window.innerWidth
        const H = pCanvasRef.current?.height || window.innerHeight
        s.ashParticles = createAshParticles(W, H)
      })
      if (crackRef.current) crackRef.current.style.opacity = '1'
      if (portalRef.current) portalRef.current.style.opacity = '0.8'
    }

    // ── EMPTY ──
    if (s.phase === 'empty') {
      s.darkness = Math.min(s.darkness + 0.003, 0.92)
      if (crackRef.current) crackRef.current.style.opacity = '0'
      if (portalRef.current) portalRef.current.style.opacity = '0.3'
      if (gauntletRef.current) gauntletRef.current.style.opacity = '0.2'
      fireOnce('silence', () => s.audio.playSilenceBreaker())
      if (elapsed > 4.5) showText('empty-text')
    }

    // ── EMOTIONAL ──
    if (s.phase === 'emotional') {
      s.darkness = Math.min(s.darkness - 0.001, 0.88)
      hideText('empty-text')
      if (elapsed > 7.8) showText('hope-text1')
      if (elapsed > 9.2) showText('hope-text2')
      if (portalRef.current) portalRef.current.style.opacity = '0'
    }

    // ── COMEBACK ──
    if (s.phase === 'comeback') {
      s.darkness = Math.max(s.darkness - 0.015, 0.5)
      hideText('hope-text1'); hideText('hope-text2')
      fireOnce('comeback', () => {
        s.audio.playComeback()
        if (gauntletRef.current) gauntletRef.current.style.opacity = '0.9'
      })
      if (elapsed > 11.5) showText('comeback-text')
    }

    // ── RESTORE ──
    if (s.phase === 'restore') {
      s.darkness = Math.max(s.darkness - 0.02, 0.1)
      hideText('comeback-text')
      fireOnce('restore', () => {
        s.audio.playRestoreChime()
        const W = pCanvasRef.current?.width || window.innerWidth
        const H = pCanvasRef.current?.height || window.innerHeight
        s.rebuildParticles = createRebuildParticles(W, H)
        if (gauntletRef.current) gauntletRef.current.style.opacity = '0.4'
      })
    }

    // ── COMPLETE ──
    if (s.phase === 'complete') {
      fireOnce('done', () => {
        setTimeout(() => {
          resetAll()
          onComplete?.()
        }, 800)
      })
    }

    renderBG(elapsed, s.phase)
    renderParticles(elapsed)

    s.animId = requestAnimationFrame(loop)
  }, [getPhase, fireOnce, activateStone, showText, hideText, resetAll, renderBG, renderParticles, onComplete])

  // ── RESIZE ──
  useEffect(() => {
    const handleResize = () => {
      const W = window.innerWidth, H = window.innerHeight
      if (bgCanvasRef.current) { bgCanvasRef.current.width = W; bgCanvasRef.current.height = H }
      if (pCanvasRef.current)  { pCanvasRef.current.width = W;  pCanvasRef.current.height = H }
      stateRef.current.stars = createStars(W, H)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── START / STOP ──
  useEffect(() => {
    const s = stateRef.current
    if (!isActive) {
      if (s.animId) cancelAnimationFrame(s.animId)
      resetAll()
      return
    }

    resetAll()
    const W = window.innerWidth, H = window.innerHeight
    s.stars = createStars(W, H)
    s.running = true
    s.animId = requestAnimationFrame(loop)

    return () => {
      if (s.animId) cancelAnimationFrame(s.animId)
    }
  }, [isActive, loop, resetAll])

  if (!isActive) return null

  return (
    <div ref={overlayRef} className={styles.overlay}>
      {/* Starfield + BG effects */}
      <canvas ref={bgCanvasRef} className={styles.canvas} />

      {/* Particle layer */}
      <canvas ref={pCanvasRef} className={styles.canvas} />

      {/* Vignette */}
      <div className={styles.vignette} />

      {/* Crack / energy overlay */}
      <div ref={crackRef} className={styles.crackOverlay} />

      {/* Sling Ring Portal */}
      <div ref={portalRef} className={styles.portal} />

      {/* Infinity Gauntlet SVG */}
      <svg
        ref={gauntletRef}
        className={styles.gauntlet}
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="avgGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffd700" />
            <stop offset="50%"  stopColor="#e8a838" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
          <linearGradient id="avgSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0"   />
          </linearGradient>
        </defs>

        {/* Palm */}
        <rect x="40" y="120" width="120" height="130" rx="20" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="2"/>
        <rect x="40" y="120" width="120" height="40"  rx="8"  fill="url(#avgSheen)"/>

        {/* Fingers */}
        <rect x="42"  y="60" width="28" height="75" rx="10" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="1.5"/>
        <rect x="76"  y="45" width="28" height="85" rx="10" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="1.5"/>
        <rect x="110" y="50" width="28" height="80" rx="10" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="1.5"/>
        <rect x="144" y="65" width="24" height="70" rx="10" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="1.5"/>

        {/* Thumb */}
        <rect x="10" y="140" width="38" height="65" rx="12" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="1.5" transform="rotate(-20 29 172)"/>

        {/* Mind Stone (palm - main) */}
        <circle cx="100" cy="155" r="18" fill="#9400D3" opacity="0.9">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="100" cy="155" r="14" fill="#7B00C4" stroke="#c084fc" strokeWidth="1.5"/>
        <circle cx="100" cy="155" r="7"  fill="#fff" opacity="0.4"/>

        {/* Finger stones */}
        {[
          { cx:56,  cy:90, color:'#00BFFF', dur:'2s'   },
          { cx:90,  cy:72, color:'#FF4500', dur:'1.8s' },
          { cx:124, cy:78, color:'#00FF7F', dur:'2.2s' },
          { cx:156, cy:92, color:'#FFD700', dur:'1.6s' },
        ].map((stone, i) => (
          <ellipse key={i} cx={stone.cx} cy={stone.cy} rx="8" ry="6" fill={stone.color} opacity="0.85">
            <animate attributeName="opacity" values="0.85;1;0.85" dur={stone.dur} repeatCount="indefinite"/>
          </ellipse>
        ))}

        {/* Wrist cuff */}
        <rect x="45" y="230" width="110" height="22" rx="6" fill="url(#avgGold)" stroke="#b8860b" strokeWidth="1.5"/>
        <rect x="55" y="234" width="90"  height="14" rx="3" fill="none" stroke="#ffd70060" strokeWidth="1"/>
      </svg>

      {/* Infinity Stones HUD */}
      <div ref={stoneHudRef} className={styles.stoneHud}>
        {STONE_COLORS.map((color, i) => (
          <div
            key={i}
            ref={el => stoneRefs.current[i] = el}
            className={styles.stone}
            style={{ '--stone-color': color, background: color }}
          />
        ))}
      </div>

      {/* Cinematic Text */}
      <div className={styles.textStage}>
        <p
          id="empty-text"
          ref={el => textRefs.current['empty-text'] = el}
          className={styles.emptyText}
        >
          Everything fades.
        </p>
        <p
          id="hope-text1"
          ref={el => textRefs.current['hope-text1'] = el}
          className={styles.hopeText}
        >
          But not everything is lost.
        </p>
        <p
          id="hope-text2"
          ref={el => textRefs.current['hope-text2'] = el}
          className={`${styles.hopeText} ${styles.hopeTextGold}`}
        >
          Some things return stronger.
        </p>
        <h1
          id="comeback-text"
          ref={el => textRefs.current['comeback-text'] = el}
          className={styles.comebackText}
        >
          I am the comeback.
        </h1>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div ref={progressRef} className={styles.progressFill} />
      </div>

      {/* Interaction blocker */}
      <div className={styles.blocker} />
    </div>
  )
}