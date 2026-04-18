import { useEffect, useRef, useCallback } from 'react'
import styles from './AvgCinematic.module.css'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const TOTAL_DURATION = 18
const STONE_DEFS = [
  { hex: '#00BFFF', name: 'Space',   glow: '0,191,255'   },
  { hex: '#FF4500', name: 'Reality', glow: '255,69,0'    },
  { hex: '#FF0080', name: 'Soul',    glow: '255,0,128'   },
  { hex: '#00FF7F', name: 'Time',    glow: '0,255,127'   },
  { hex: '#FFD700', name: 'Mind',    glow: '255,215,0'   },
  { hex: '#9400D3', name: 'Power',   glow: '148,0,211'   },
]

// ─── AUDIO ENGINE ─────────────────────────────────────────────────────────────
class AudioEngine {
  constructor() { this.ctx = null }
  _ac() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    if (this.ctx.state === 'suspended') this.ctx.resume()
    return this.ctx
  }
  playOrchestraHit() {
    const ac = this._ac(), t = ac.currentTime
    ;[40, 55, 82, 110].forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain(), flt = ac.createBiquadFilter()
      flt.type = 'lowpass'; flt.frequency.value = 600
      o.connect(flt); flt.connect(g); g.connect(ac.destination)
      o.type = 'sawtooth'; o.frequency.value = f
      g.gain.setValueAtTime(0.18 - i*0.03, t)
      g.gain.exponentialRampToValueAtTime(0.001, t+2.5)
      o.start(t); o.stop(t+2.6)
    })
    ;[0, 0.05].forEach(d => {
      const o = ac.createOscillator(), g = ac.createGain()
      o.connect(g); g.connect(ac.destination)
      o.type = 'sine'; o.frequency.setValueAtTime(100, t+d)
      o.frequency.exponentialRampToValueAtTime(35, t+d+0.5)
      g.gain.setValueAtTime(0.6, t+d); g.gain.exponentialRampToValueAtTime(0.001, t+d+1.2)
      o.start(t+d); o.stop(t+d+1.5)
    })
    ;[880, 1047, 1319].forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain()
      o.connect(g); g.connect(ac.destination)
      o.type = 'triangle'; o.frequency.value = f
      g.gain.setValueAtTime(0, t+i*0.1); g.gain.linearRampToValueAtTime(0.03, t+i*0.1+0.3)
      g.gain.exponentialRampToValueAtTime(0.001, t+2)
      o.start(t); o.stop(t+2.2)
    })
  }
  playSnap() {
    const ac = this._ac(), t = ac.currentTime
    const buf = ac.createBuffer(1, Math.floor(ac.sampleRate*0.12), ac.sampleRate)
    const d = buf.getChannelData(0)
    for (let i=0; i<d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/d.length, 4)
    const src = ac.createBufferSource(), flt = ac.createBiquadFilter(), g = ac.createGain()
    flt.type='bandpass'; flt.frequency.value=3000; flt.Q.value=0.8
    src.buffer=buf; src.connect(flt); flt.connect(g); g.connect(ac.destination)
    g.gain.setValueAtTime(1.2, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.12); src.start(t)
    const o2 = ac.createOscillator(), g2 = ac.createGain()
    o2.connect(g2); g2.connect(ac.destination); o2.type='sine'
    o2.frequency.setValueAtTime(180,t); o2.frequency.exponentialRampToValueAtTime(30,t+0.3)
    g2.gain.setValueAtTime(0.8,t); g2.gain.exponentialRampToValueAtTime(0.001,t+0.4)
    o2.start(t); o2.stop(t+0.5)
    const o3=ac.createOscillator(), g3=ac.createGain()
    o3.connect(g3); g3.connect(ac.destination); o3.type='sawtooth'
    o3.frequency.setValueAtTime(800,t+0.05); o3.frequency.exponentialRampToValueAtTime(40,t+0.7)
    g3.gain.setValueAtTime(0.15,t+0.05); g3.gain.exponentialRampToValueAtTime(0.001,t+0.8)
    o3.start(t+0.05); o3.stop(t+0.85)
  }
  playEerie() {
    const ac = this._ac(), t = ac.currentTime
    ;[220,277,330].forEach((f,i) => {
      const o=ac.createOscillator(), g=ac.createGain()
      o.connect(g); g.connect(ac.destination); o.type='sine'; o.frequency.value=f
      const lfo=ac.createOscillator(), lg=ac.createGain()
      lfo.frequency.value=4.5; lg.gain.value=6
      lfo.connect(lg); lg.connect(o.frequency); lfo.start(t+i*0.4)
      g.gain.setValueAtTime(0,t+i*0.4); g.gain.linearRampToValueAtTime(0.05,t+i*0.4+0.8)
      g.gain.linearRampToValueAtTime(0,t+i*0.4+3.5)
      o.start(t+i*0.4); o.stop(t+5); lfo.stop(t+5)
    })
  }
  playComeback() {
    const ac = this._ac(), t = ac.currentTime
    const notes=[164.81,196.00,220.00,261.63,329.63,392.00]
    notes.forEach((f,i) => {
      const o=ac.createOscillator(), g=ac.createGain(), flt=ac.createBiquadFilter()
      flt.type='lowpass'; flt.frequency.value=1800
      o.connect(flt); flt.connect(g); g.connect(ac.destination)
      o.type='sawtooth'; o.frequency.value=f; const st=t+i*0.16
      g.gain.setValueAtTime(0,st); g.gain.linearRampToValueAtTime(0.22,st+0.1)
      g.gain.exponentialRampToValueAtTime(0.001,st+1.1); o.start(st); o.stop(st+1.3)
    })
    ;[82,123,164].forEach(f => {
      const o=ac.createOscillator(), g=ac.createGain()
      o.connect(g); g.connect(ac.destination); o.type='sawtooth'; o.frequency.value=f
      g.gain.setValueAtTime(0.12,t); g.gain.exponentialRampToValueAtTime(0.001,t+2.5)
      o.start(t); o.stop(t+2.6)
    })
    ;[0,0.48,0.96,1.44].forEach(d => {
      const o=ac.createOscillator(), g=ac.createGain()
      o.connect(g); g.connect(ac.destination); o.type='sine'
      o.frequency.setValueAtTime(100,t+d); o.frequency.exponentialRampToValueAtTime(40,t+d+0.25)
      g.gain.setValueAtTime(0.55,t+d); g.gain.exponentialRampToValueAtTime(0.001,t+d+0.3)
      o.start(t+d); o.stop(t+d+0.4)
    })
  }
  playRestore() {
    const ac = this._ac(), t = ac.currentTime
    ;[523,659,784,1047,1319,1568].forEach((f,i) => {
      const o=ac.createOscillator(), g=ac.createGain()
      o.connect(g); g.connect(ac.destination); o.type='triangle'; o.frequency.value=f
      const st=t+i*0.13
      g.gain.setValueAtTime(0.18,st); g.gain.exponentialRampToValueAtTime(0.001,st+1.8)
      o.start(st); o.stop(st+2)
    })
  }
}

// ─── PLANET RENDERER ──────────────────────────────────────────────────────────
class PlanetRenderer {
  constructor(canvas) {
    this.cv = canvas
    this.ctx = canvas.getContext('2d')
    this.W = canvas.width; this.H = canvas.height
    this.time = 0; this._stars = null
    this._initPlanets()
  }
  resize(W, H) {
    this.W=W; this.H=H; this.cv.width=W; this.cv.height=H
    this._initPlanets(); this._stars=null
  }
  _initPlanets() {
    const {W,H}=this
    this.planets = [
      // Jupiter-like — right
      { x:W*0.88, y:H*0.28, r:W*0.10,
        bands:[{y:0,h:0.12,c:'#c8a46e'},{y:0.12,h:0.08,c:'#7a4a2a'},{y:0.20,h:0.16,c:'#d4956a'},
               {y:0.36,h:0.06,c:'#8b3e1a'},{y:0.42,h:0.18,c:'#cd853f'},{y:0.60,h:0.10,c:'#7b5014'},
               {y:0.70,h:0.18,c:'#c4882f'},{y:0.88,h:0.12,c:'#9a5520'}],
        storm:{x:-0.22,y:0.08,rx:0.16,ry:0.07,c:'#6a2810'},
        rings:true, rc:'rgba(180,140,80,', ri:1.45, ro:2.15, rt:0.22,
        opacity:0, z:0.3, rot:0, rs:0.0003, dx:0, dy:0 },
      // Saturn-like — upper left
      { x:W*0.10, y:H*0.22, r:W*0.072,
        bands:[{y:0,h:0.15,c:'#e8d5a3'},{y:0.15,h:0.10,c:'#c9a96e'},{y:0.25,h:0.22,c:'#ddb87a'},
               {y:0.47,h:0.15,c:'#b8924a'},{y:0.62,h:0.22,c:'#e0c080'},{y:0.84,h:0.16,c:'#c4a050'}],
        rings:true, rc:'rgba(215,185,125,', ri:1.55, ro:2.55, rt:0.17,
        opacity:0, z:0.25, rot:0, rs:0.0002, dx:0, dy:0 },
      // Neptune-like — bottom left
      { x:W*0.16, y:H*0.74, r:W*0.052,
        bands:[{y:0,h:0.3,c:'#1a4fa8'},{y:0.3,h:0.2,c:'#2255b8'},
               {y:0.5,h:0.3,c:'#1840a0'},{y:0.8,h:0.2,c:'#0d2d7a'}],
        storm:{x:0.12,y:-0.12,rx:0.14,ry:0.14,c:'rgba(200,220,255,0.22)'},
        rings:false, opacity:0, z:0.2, rot:0, rs:0.0004, dx:0, dy:0 },
      // Mars-like — top center-right
      { x:W*0.58, y:H*0.04, r:W*0.036,
        bands:[{y:0,h:0.25,c:'#c1440e'},{y:0.25,h:0.20,c:'#7a2200'},
               {y:0.45,h:0.32,c:'#c0522a'},{y:0.77,h:0.23,c:'#6a1c00'}],
        rings:false, opacity:0, z:0.15, rot:0, rs:0.0006, dx:0, dy:0 },
    ]
  }
  setOpacity(i,v) { if(this.planets[i]) this.planets[i].opacity=Math.max(0,Math.min(1,v)) }
  update(dt) {
    this.time+=dt
    this.planets.forEach(p => {
      p.rot+=p.rs
      p.dx=Math.sin(this.time*0.0004+p.z*5)*3*p.z
      p.dy=Math.cos(this.time*0.0003+p.z*3)*2*p.z
    })
  }
  draw() {
    const {ctx,W,H}=this
    ctx.clearRect(0,0,W,H)
    // Deep space bg
    const bg=ctx.createRadialGradient(W*0.5,H*0.38,0,W*0.5,H*0.5,W*0.95)
    bg.addColorStop(0,'#0d1b3e'); bg.addColorStop(0.45,'#060d1f'); bg.addColorStop(1,'#000208')
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H)
    this._nebula()
    this._stars_()
    ;[...this.planets].sort((a,b)=>a.z-b.z).forEach(p => {
      this._planet({...p, x:p.x+p.dx, y:p.y+p.dy})
    })
  }
  _nebula() {
    const {ctx,W,H}=this; const t=this.time*0.0004
    const blobs=[
      {cx:W*0.3,cy:H*0.5,r:W*0.45,c:'rgba(70,18,35,0.2)',ox:Math.sin(t)*18,oy:Math.cos(t*0.7)*12},
      {cx:W*0.78,cy:H*0.28,r:W*0.38,c:'rgba(8,24,72,0.22)',ox:Math.cos(t*0.8)*16,oy:Math.sin(t*1.1)*10},
      {cx:W*0.5,cy:H*0.7,r:W*0.35,c:'rgba(15,8,45,0.18)',ox:Math.sin(t*1.2)*10,oy:Math.cos(t*0.9)*8},
    ]
    blobs.forEach(b=>{
      const g=ctx.createRadialGradient(b.cx+b.ox,b.cy+b.oy,0,b.cx,b.cy,b.r)
      g.addColorStop(0,b.c); g.addColorStop(0.6,b.c.replace(/[\d.]+\)$/,'0.06)')); g.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H)
    })
  }
  _stars_() {
    const {ctx,W,H}=this
    if (!this._stars) {
      this._stars=Array.from({length:300},()=>({
        x:Math.random(), y:Math.random(),
        r:Math.random()*1.5+0.2, a:Math.random()*0.7+0.1,
        tw:Math.random()*Math.PI*2, sp:Math.random()*0.018+0.004,
      }))
    }
    this._stars.forEach(s=>{
      s.tw+=s.sp
      const a=s.a*(0.5+0.5*Math.sin(s.tw))
      ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.r*(0.8+0.2*Math.sin(s.tw*1.3)),0,Math.PI*2)
      ctx.fillStyle=`rgba(255,255,255,${a})`; ctx.fill()
    })
  }
  _planet(p) {
    const {ctx}=this
    if (p.opacity<=0.01) return
    ctx.save(); ctx.globalAlpha=p.opacity
    const r=p.r
    if(p.rings) this._ringsHalf(p, true)
    // Clip sphere
    ctx.save(); ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.clip()
    // Scrolling bands
    const off=(p.rot*r*0.4)%(r*0.35)
    p.bands.forEach(band=>{
      const by=p.y-r+band.y*r*2, bh=band.h*r*2
      for(let ox=-r*2+(off%(r*0.35)); ox<r*2; ox+=r*0.35){
        ctx.fillStyle=band.c; ctx.fillRect(p.x-r+ox,by,r*0.38,bh)
      }
    })
    // 3D shading
    const sph=ctx.createRadialGradient(p.x-r*0.3,p.y-r*0.3,r*0.05,p.x,p.y,r)
    sph.addColorStop(0,'rgba(255,255,255,0.22)'); sph.addColorStop(0.4,'rgba(255,255,255,0.04)')
    sph.addColorStop(0.75,'rgba(0,0,0,0.18)'); sph.addColorStop(1,'rgba(0,0,0,0.72)')
    ctx.fillStyle=sph; ctx.fillRect(p.x-r,p.y-r,r*2,r*2)
    // Storm
    if(p.storm){
      ctx.beginPath()
      ctx.ellipse(p.x+p.storm.x*r,p.y+p.storm.y*r,p.storm.rx*r,p.storm.ry*r,0,0,Math.PI*2)
      ctx.fillStyle=p.storm.c; ctx.fill()
    }
    // Atmosphere rim
    const atm=ctx.createRadialGradient(p.x,p.y,r*0.72,p.x,p.y,r)
    atm.addColorStop(0,'rgba(0,0,0,0)'); atm.addColorStop(0.82,'rgba(0,0,0,0)')
    atm.addColorStop(1,(p.bands[0]?.c||'#888')+'90')
    ctx.fillStyle=atm; ctx.fillRect(p.x-r,p.y-r,r*2,r*2)
    ctx.restore()
    if(p.rings) this._ringsHalf(p, false)
    ctx.restore()
  }
  _ringsHalf(p, back) {
    const {ctx}=this; const {ri,ro,rt,rc,x,y,r}=p
    ctx.save(); ctx.translate(x,y); ctx.scale(1,rt)
    for(let i=0;i<10;i++){
      const f=i/10, a=0.05+f*0.13
      const rri=r*ri+(r*ro-r*ri)*f, rro=r*ri+(r*ro-r*ri)*(f+0.09)
      ctx.beginPath()
      if(back){ ctx.arc(0,0,rri,Math.PI,Math.PI*2); ctx.arc(0,0,rro,Math.PI*2,Math.PI,true) }
      else     { ctx.arc(0,0,rri,0,Math.PI);         ctx.arc(0,0,rro,Math.PI,0,true) }
      ctx.closePath(); ctx.fillStyle=rc+a+')'; ctx.fill()
    }
    ctx.restore()
  }
}

// ─── 3D HAND RENDERER ─────────────────────────────────────────────────────────
class HandRenderer {
  constructor(canvas) {
    this.cv=canvas; this.ctx=canvas.getContext('2d')
    this.W=canvas.width; this.H=canvas.height
    this.t=0; this.opacity=0; this.snapProgress=0; this.ashProgress=0
    this.stoneOpacities=[0,0,0,0,0,0]
  }
  resize(W,H){ this.W=W; this.H=H; this.cv.width=W; this.cv.height=H }

  _rr(ctx, x,y,w,h,r) {
    ctx.beginPath()
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r)
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h)
    ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r)
    ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath()
  }

  _seg(ctx, x,y,w,h,rx, light,mid,shadow, scale) {
    // 3-stop lateral gradient for cylindrical look
    const g=ctx.createLinearGradient(x-w/2,0,x+w/2,0)
    g.addColorStop(0,shadow); g.addColorStop(0.18,mid); g.addColorStop(0.5,light)
    g.addColorStop(0.82,mid); g.addColorStop(1,shadow)
    ctx.fillStyle=g; this._rr(ctx,x-w/2,y-h/2,w,h,rx); ctx.fill()
    // Top bevel highlight
    const hl=ctx.createLinearGradient(0,y-h/2,0,y-h/2+h*0.28)
    hl.addColorStop(0,'rgba(255,255,255,0.28)'); hl.addColorStop(1,'rgba(255,255,255,0)')
    ctx.fillStyle=hl; this._rr(ctx,x-w/2+2,y-h/2+1,w-4,h*0.38,rx); ctx.fill()
    // Knuckle lines
    ctx.strokeStyle='rgba(0,0,0,0.22)'; ctx.lineWidth=0.7*scale
    ;[0.32,0.56,0.76].forEach(f=>{
      const ky=y-h/2+h*f
      ctx.beginPath(); ctx.moveTo(x-w/2+3*scale,ky)
      ctx.bezierCurveTo(x-w*0.25,ky-scale,x+w*0.25,ky-scale,x+w/2-3*scale,ky)
      ctx.stroke()
    })
  }

  _stone(ctx, x,y,r,si,alpha) {
    if(alpha<=0.01) return
    const sc=STONE_DEFS[si]
    const pulse=0.7+0.3*Math.sin(this.t*0.06+si*1.1)
    ctx.save(); ctx.globalAlpha=alpha*pulse
    // Glow corona
    const glow=ctx.createRadialGradient(x,y,0,x,y,r*4)
    glow.addColorStop(0,`rgba(${sc.glow},0.9)`)
    glow.addColorStop(0.35,`rgba(${sc.glow},0.35)`)
    glow.addColorStop(1,`rgba(${sc.glow},0)`)
    ctx.fillStyle=glow; ctx.fillRect(x-r*4,y-r*4,r*8,r*8)
    // Gem facets
    ctx.globalAlpha=alpha
    const body=ctx.createRadialGradient(x-r*0.3,y-r*0.35,r*0.08,x,y,r)
    body.addColorStop(0,'#ffffff'); body.addColorStop(0.15,sc.hex)
    body.addColorStop(0.65,sc.hex+'cc'); body.addColorStop(1,'#00000099')
    ctx.fillStyle=body; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill()
    // Inner bright facet
    ctx.fillStyle='rgba(255,255,255,0.55)'
    ctx.beginPath(); ctx.ellipse(x-r*0.22,y-r*0.28,r*0.3,r*0.17,-Math.PI/4,0,Math.PI*2); ctx.fill()
    // Outer ring
    ctx.strokeStyle=sc.hex+'aa'; ctx.lineWidth=0.8
    ctx.beginPath(); ctx.arc(x,y,r+1.5,0,Math.PI*2); ctx.stroke()
    ctx.restore()
  }

  draw() {
    const {ctx,W,H,t}=this
    if(this.opacity<=0.01){ ctx.clearRect(0,0,W,H); return }
    ctx.clearRect(0,0,W,H)
    ctx.save()

    // Ash disintegration: clip with dissolve pattern
    if(this.ashProgress>0){
      ctx.globalAlpha = this.opacity * (1-this.ashProgress*0.85)
    } else {
      ctx.globalAlpha = this.opacity
    }

    const sc = Math.min(W,H)*0.0044
    const cx = W*0.70, cy = H*0.50
    const snapTilt = this.snapProgress*0.1

    ctx.translate(cx,cy)
    ctx.rotate(snapTilt-0.03)

    const LIGHT='#f0d890', MID='#c8a850', SHADOW='#7a5420', DARK='#4a2e08'
    const RX=sc*4

    // ── FOREARM / WRIST ──
    const palmW=sc*56, palmH=sc*62
    const armG=ctx.createLinearGradient(-palmW/2,0,palmW/2,0)
    armG.addColorStop(0,DARK); armG.addColorStop(0.15,SHADOW); armG.addColorStop(0.5,MID)
    armG.addColorStop(0.85,SHADOW); armG.addColorStop(1,DARK)
    ctx.fillStyle=armG; this._rr(ctx,-palmW/2*1.1,palmH*0.5,palmW*1.2,sc*55,sc*6); ctx.fill()
    // Arm sheen
    const armSh=ctx.createLinearGradient(0,palmH*0.5,0,palmH*1.0)
    armSh.addColorStop(0,'rgba(255,255,255,0.1)'); armSh.addColorStop(1,'rgba(0,0,0,0)')
    ctx.fillStyle=armSh; this._rr(ctx,-palmW/2*1.1+3,palmH*0.5+2,palmW*1.2-6,sc*26,sc*5); ctx.fill()

    // ── PALM ──
    const palmG=ctx.createLinearGradient(-palmW/2,0,palmW/2,0)
    palmG.addColorStop(0,DARK); palmG.addColorStop(0.12,SHADOW); palmG.addColorStop(0.45,LIGHT)
    palmG.addColorStop(0.75,MID); palmG.addColorStop(1,DARK)
    ctx.fillStyle=palmG; this._rr(ctx,-palmW/2,-sc*8,palmW,palmH,sc*9); ctx.fill()
    const palmSh=ctx.createLinearGradient(0,-sc*8,0,sc*22)
    palmSh.addColorStop(0,'rgba(255,255,255,0.18)'); palmSh.addColorStop(1,'rgba(0,0,0,0)')
    ctx.fillStyle=palmSh; this._rr(ctx,-palmW/2+3,-sc*8+2,palmW-6,palmH*0.4,sc*7); ctx.fill()
    // Palm lines
    ctx.strokeStyle='rgba(0,0,0,0.15)'; ctx.lineWidth=sc*0.7
    ;[0.35,0.6].forEach(f=>{
      ctx.beginPath(); ctx.moveTo(-palmW*0.4,sc*(-8+palmH*f))
      ctx.bezierCurveTo(0,sc*(-8+palmH*f)-sc*3, palmW*0.3,sc*(-8+palmH*f)+sc*2, palmW*0.45,sc*(-8+palmH*f)); ctx.stroke()
    })

    // ── THUMB ──
    ctx.save()
    ctx.translate(-palmW/2-sc*3,sc*14); ctx.rotate(-0.48+this.snapProgress*0.28)
    this._seg(ctx,0,0,sc*16,sc*24,sc*6,LIGHT,MID,SHADOW,sc)
    ctx.translate(0,-sc*22); ctx.rotate(-0.18)
    this._seg(ctx,0,0,sc*14,sc*20,sc*6,LIGHT,MID,SHADOW,sc)
    ctx.translate(0,-sc*18); ctx.rotate(-0.1)
    this._seg(ctx,0,0,sc*12,sc*16,sc*5,LIGHT,MID,SHADOW,sc)
    // Thumb nail
    ctx.fillStyle='rgba(255,245,215,0.55)'; ctx.beginPath()
    ctx.ellipse(0,-sc*5,sc*4,sc*6,0,0,Math.PI*2); ctx.fill()
    ctx.restore()

    // ── 4 FINGERS ──
    const fingers=[
      {ox:-sc*20,len:sc*44,w:sc*15,curl:this.snapProgress*0.55},
      {ox:-sc*6, len:sc*52,w:sc*16,curl:this.snapProgress*0.40},
      {ox:sc*10, len:sc*48,w:sc*15,curl:this.snapProgress*0.25},
      {ox:sc*25, len:sc*40,w:sc*13,curl:this.snapProgress*0.15},
    ]
    fingers.forEach((fd)=>{
      const segs=3, segH=fd.len/segs
      ctx.save(); ctx.translate(fd.ox,-sc*10); ctx.rotate(fd.curl)
      for(let s=0;s<segs;s++){
        const sy=-segH*(s+0.5), sw=fd.w*(1-s*0.10)
        this._seg(ctx,0,sy,sw,segH-sc*1.8,RX,LIGHT,MID,SHADOW,sc)
        if(s<segs-1){
          ctx.strokeStyle='rgba(0,0,0,0.28)'; ctx.lineWidth=sc*0.8
          ctx.beginPath(); ctx.moveTo(-sw/2+sc*2.5,sy-segH/2+sc*2)
          ctx.bezierCurveTo(-sw*0.25,sy-segH/2-sc,sw*0.25,sy-segH/2-sc,sw/2-sc*2.5,sy-segH/2+sc*2)
          ctx.stroke()
        }
      }
      // Nail
      ctx.fillStyle='rgba(255,242,210,0.6)'; ctx.beginPath()
      ctx.ellipse(0,-fd.len+sc*4,fd.w*0.3,sc*5.5,0,0,Math.PI*2); ctx.fill()
      ctx.strokeStyle='rgba(180,140,80,0.35)'; ctx.lineWidth=0.6; ctx.stroke()
      ctx.restore()
    })

    // ── GAUNTLET CUFF ──
    const cuffG=ctx.createLinearGradient(-palmW/2,0,palmW/2,0)
    cuffG.addColorStop(0,'#2a1600'); cuffG.addColorStop(0.18,'#7a5010')
    cuffG.addColorStop(0.5,'#f0c040'); cuffG.addColorStop(0.82,'#7a5010'); cuffG.addColorStop(1,'#2a1600')
    ctx.fillStyle=cuffG; this._rr(ctx,-palmW/2-sc*3,palmH*0.75,palmW+sc*6,sc*18,sc*5); ctx.fill()
    // Cuff detail
    ;[-1,0,1].forEach(k=>{
      ctx.strokeStyle=k===0?'rgba(255,200,0,0.35)':'rgba(0,0,0,0.4)'; ctx.lineWidth=k===0?1.2:0.6
      const ly=palmH*0.75+sc*9+k*sc*2.8
      ctx.beginPath(); ctx.moveTo(-palmW/2+sc*5,ly); ctx.lineTo(palmW/2-sc*5,ly); ctx.stroke()
    })
    // Cuff rivets
    ;[-palmW*0.35,-palmW*0.12,palmW*0.12,palmW*0.35].forEach(rx=>{
      ctx.fillStyle='#f0c040'; ctx.beginPath()
      ctx.arc(rx,palmH*0.75+sc*9,sc*1.8,0,Math.PI*2); ctx.fill()
      ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.beginPath()
      ctx.arc(rx-sc*0.5,palmH*0.75+sc*8,sc*0.7,0,Math.PI*2); ctx.fill()
    })

    // ── INFINITY STONES ──
    const stonePos=[
      {x:-sc*17,y:-sc*8},{x:-sc*3,y:-sc*12},{x:sc*12,y:-sc*9},{x:sc*26,y:-sc*5},
      {x:sc*6,y:sc*20},{x:-sc*14,y:sc*28}
    ]
    stonePos.forEach((sp,i)=>this._stone(ctx,sp.x,sp.y,sc*6,i,this.stoneOpacities[i]))

    ctx.restore()
    this.t++
  }
}

// ─── PARTICLE SYSTEM ──────────────────────────────────────────────────────────
class ParticleSystem {
  constructor(canvas) {
    this.cv=canvas; this.ctx=canvas.getContext('2d')
    this.W=canvas.width; this.H=canvas.height
    this.ash=[]; this.rebuild=[]; this.sparks=[]
  }
  resize(W,H){ this.W=W; this.H=H; this.cv.width=W; this.cv.height=H }
  spawnAsh() {
    const {W,H}=this
    const cols=['#e8a838','#ff7e2a','#ffd700','#ff9944','#c8a97e','#8b6000','#ff4400','#ffb347']
    this.ash=Array.from({length:550},()=>{
      const cx=W*0.5+(Math.random()-0.5)*W*0.72
      const cy=H*0.5+(Math.random()-0.5)*H*0.66
      const angle=Math.random()*Math.PI*2, speed=0.6+Math.random()*3.5
      return {
        x:cx,y:cy, vx:Math.cos(angle)*speed*(0.2+Math.random()),
        vy:Math.sin(angle)*speed*(0.2+Math.random())-Math.random()*0.9,
        life:1, decay:0.003+Math.random()*0.009,
        w:1.5+Math.random()*5.5, h:1+Math.random()*3,
        rot:Math.random()*Math.PI*2, rotV:(Math.random()-0.5)*0.13,
        color:cols[Math.floor(Math.random()*cols.length)],
        delay:Math.random()*1.9, ellipse:Math.random()>0.38,
        z:0.3+Math.random()*0.7, tx:(Math.random()-0.5)*0.045, ty:(Math.random()-0.5)*0.02,
      }
    })
  }
  spawnSparks(cx,cy){
    this.sparks=Array.from({length:65},()=>{
      const a=Math.random()*Math.PI*2, sp=3+Math.random()*9
      return {x:cx,y:cy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,
        decay:0.025+Math.random()*0.04, c:Math.random()>0.5?'#ffd700':'#ff8800'}
    })
  }
  spawnRebuild(){
    const {W,H}=this
    const cols=['#60a5fa','#8b5cf6','#ec4899','#34d399','#fbbf24','#a78bfa','#67e8f9']
    this.rebuild=Array.from({length:240},(_, i)=>{
      const a=(i/240)*Math.PI*2, r=160+Math.random()*Math.min(W,H)*0.32
      return {
        sx:W/2+Math.cos(a)*r, sy:H/2+Math.sin(a)*r,
        x:W/2+Math.cos(a)*r,  y:H/2+Math.sin(a)*r,
        life:0, speed:0.01+Math.random()*0.012,
        delay:i*0.004, color:cols[Math.floor(Math.random()*cols.length)],
        size:1.5+Math.random()*4.5, z:0.4+Math.random()*0.6,
      }
    })
  }
  update(ashAge,rebuildAge){
    this.ash.forEach(p=>{
      if(ashAge<p.delay) return
      p.vx+=p.tx; p.vy+=p.ty; p.x+=p.vx; p.y+=p.vy
      p.vy+=0.019; p.vx*=0.998; p.rot+=p.rotV; p.life-=p.decay
    })
    this.sparks.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vx*=0.92; p.vy*=0.92; p.vy+=0.14; p.life-=p.decay
    })
    this.rebuild.forEach(p=>{
      if(rebuildAge<p.delay) return
      p.life=Math.min(p.life+p.speed,1)
      p.x=p.sx+(this.W/2-p.sx)*p.life; p.y=p.sy+(this.H/2-p.sy)*p.life
    })
  }
  draw(ashAge,rebuildAge){
    const {ctx,W,H}=this
    ctx.clearRect(0,0,W,H)
    this.ash.forEach(p=>{
      if(ashAge<p.delay||p.life<=0) return
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot)
      ctx.globalAlpha=Math.min(p.life,0.88)*p.z
      ctx.shadowColor=p.color; ctx.shadowBlur=5; ctx.fillStyle=p.color
      const s=0.4+p.z*0.6; ctx.scale(s,s); ctx.beginPath()
      if(p.ellipse) ctx.ellipse(0,0,p.w,p.h,0,0,Math.PI*2)
      else ctx.rect(-p.w/2,-p.h/2,p.w,p.h)
      ctx.fill(); ctx.restore()
    })
    this.sparks.forEach(p=>{
      if(p.life<=0) return
      ctx.save(); ctx.globalAlpha=p.life*0.9
      ctx.fillStyle=p.c; ctx.shadowColor=p.c; ctx.shadowBlur=10
      ctx.beginPath(); ctx.arc(p.x,p.y,2.8,0,Math.PI*2); ctx.fill(); ctx.restore()
    })
    if(rebuildAge>0){
      this.rebuild.forEach(p=>{
        if(rebuildAge<p.delay||p.life<=0) return
        const alpha=Math.sin(p.life*Math.PI)*p.z; if(alpha<=0) return
        ctx.save(); ctx.globalAlpha=alpha
        ctx.fillStyle=p.color; ctx.shadowColor=p.color; ctx.shadowBlur=14
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size*(0.4+p.z*0.6),0,Math.PI*2); ctx.fill()
        ctx.globalAlpha=alpha*0.22
        const pl=Math.max(0,p.life-0.12)
        const tx=p.sx+(W/2-p.sx)*pl, ty=p.sy+(H/2-p.sy)*pl
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(p.x,p.y)
        ctx.strokeStyle=p.color; ctx.lineWidth=p.size*0.65; ctx.stroke()
        ctx.restore()
      })
      const prog=Math.min(rebuildAge/3,1), ba=Math.sin(prog*Math.PI)*0.38
      if(ba>0){
        const gr=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,90+130*prog)
        gr.addColorStop(0,`rgba(255,255,255,${ba})`); gr.addColorStop(0.4,`rgba(96,165,250,${ba*0.6})`)
        gr.addColorStop(0.8,`rgba(139,92,246,${ba*0.22})`); gr.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=gr; ctx.fillRect(0,0,W,H)
      }
    }
    ctx.shadowBlur=0; ctx.globalAlpha=1
  }
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AvgCinematic({ isActive, onComplete }) {
  const planetRef  = useRef(null)
  const handRef    = useRef(null)
  const particleRef= useRef(null)
  const uiRef      = useRef(null)
  const textRefs   = useRef({})
  const stoneHudRef= useRef(null)
  const stoneEls   = useRef([])
  const progRef    = useRef(null)

  const R = useRef({ planet:null, hand:null, particles:null, audio:new AudioEngine() })
  const S = useRef({
    running:false, startTime:null, animId:null,
    phase:'idle', fired:{}, shown:{}, darkness:0, stonesLit:0,
  })

  const getPhase = useCallback(t=>{
    if(t<0.8) return 'activation'
    if(t<3.5) return 'snap'
    if(t<7)   return 'empty'
    if(t<11)  return 'emotional'
    if(t<14)  return 'comeback'
    if(t<17)  return 'restore'
    return 'complete'
  },[])

  const once = useCallback((k,fn)=>{ if(!S.current.fired[k]){S.current.fired[k]=true;fn()} },[])

  const showTxt = useCallback(id=>{
    if(!S.current.shown[id]){ S.current.shown[id]=true
      const el=textRefs.current[id]
      if(el){el.style.opacity='1';el.style.transform='translateY(0) scale(1)'} }
  },[])

  const hideTxt = useCallback(id=>{
    S.current.shown[id]=false
    const el=textRefs.current[id]
    if(el){el.style.opacity='0';el.style.transform='translateY(24px) scale(0.96)'}
  },[])

  const litStones = useCallback(n=>{
    const s=S.current
    while(s.stonesLit<n&&s.stonesLit<6){
      const i=s.stonesLit
      stoneEls.current[i]?.classList.add(styles.stoneActive)
      if(R.current.hand) R.current.hand.stoneOpacities[i]=1
      s.stonesLit++
    }
  },[])

  const drawUI = useCallback((elapsed, phase)=>{
    const c=uiRef.current; if(!c) return
    const ctx=c.getContext('2d'), W=c.width, H=c.height, s=S.current
    ctx.clearRect(0,0,W,H)
    if(s.darkness>0){ ctx.fillStyle=`rgba(0,0,0,${s.darkness*0.68})`; ctx.fillRect(0,0,W,H) }
    // Vignette
    const vig=ctx.createRadialGradient(W/2,H/2,H*0.22,W/2,H/2,H*0.88)
    vig.addColorStop(0,'rgba(0,0,0,0)'); vig.addColorStop(0.58,'rgba(0,0,0,0)')
    vig.addColorStop(1,`rgba(0,0,0,${0.5+s.darkness*0.35})`)
    ctx.fillStyle=vig; ctx.fillRect(0,0,W,H)
    // Snap flash
    if(phase==='snap'&&elapsed<1.18){
      const fl=Math.max(0,0.9-(elapsed-0.8)*2.8)
      const gr=ctx.createRadialGradient(W*0.70,H*0.50,0,W*0.70,H*0.50,W*0.55)
      gr.addColorStop(0,`rgba(255,220,100,${fl*0.95})`); gr.addColorStop(0.4,`rgba(255,150,50,${fl*0.5})`)
      gr.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=gr; ctx.fillRect(0,0,W,H)
    }
    // Comeback rings
    if(phase==='comeback'){
      const age=elapsed-11
      ;[0,0.42,0.84].forEach(d=>{
        const pa=age-d; if(pa<0) return
        const rr=Math.min(pa/2.2,1), alpha=(1-rr)*0.45
        if(alpha<=0) return
        const rad=rr*Math.min(W,H)*0.58
        const ring=ctx.createRadialGradient(W/2,H/2,rad*0.78,W/2,H/2,rad)
        ring.addColorStop(0,'rgba(59,130,246,0)'); ring.addColorStop(0.7,`rgba(59,130,246,${alpha*0.45})`)
        ring.addColorStop(0.9,`rgba(139,92,246,${alpha})`); ring.addColorStop(1,'rgba(59,130,246,0)')
        ctx.fillStyle=ring; ctx.fillRect(0,0,W,H)
      })
    }
    // Cinematic letterbox
    const bH=H*0.065
    ctx.fillStyle='#000'; ctx.fillRect(0,0,W,bH); ctx.fillRect(0,H-bH,W,bH)
  },[])

  const loop = useCallback(ts=>{
    const s=S.current; if(!s.running) return
    if(!s.startTime) s.startTime=ts
    const elapsed=(ts-s.startTime)/1000
    s.phase=getPhase(elapsed)
    if(progRef.current) progRef.current.style.width=`${Math.min(elapsed/TOTAL_DURATION,1)*100}%`

    const {planet,hand,particles,audio}=R.current
    const W=window.innerWidth, H=window.innerHeight

    if(s.phase==='activation'){
      s.darkness=Math.min(s.darkness+0.013,0.45)
      once('orch',()=>audio.playOrchestraHit())
      if(planet){ planet.setOpacity(0,Math.min(elapsed/0.65,0.85)); planet.setOpacity(1,Math.min(elapsed/0.8,0.75))
        planet.setOpacity(2,Math.min(elapsed/0.7,0.62)); planet.setOpacity(3,Math.min(elapsed/0.55,0.72)) }
      litStones(Math.min(Math.floor(elapsed/0.12),6))
      if(stoneHudRef.current) stoneHudRef.current.style.opacity='1'
      if(hand) hand.opacity=Math.min(elapsed/0.65,0.88)
    }
    if(s.phase==='snap'){
      s.darkness=Math.min(s.darkness+0.008,0.88)
      once('snap',()=>{
        audio.playSnap()
        particles?.spawnAsh(); particles?.spawnSparks(W*0.70,H*0.50)
      })
      if(hand){
        hand.snapProgress=Math.min((elapsed-0.8)/0.55,1)
        hand.ashProgress=Math.max(0,(elapsed-1.3)/2.0)
        hand.opacity=Math.max(0,0.88-hand.ashProgress*0.88)
      }
    }
    if(s.phase==='empty'){
      s.darkness=Math.min(s.darkness+0.004,0.93)
      if(hand) hand.opacity=0
      once('eerie',()=>audio.playEerie())
      if(planet){ planet.setOpacity(0,0.52); planet.setOpacity(1,0.42) }
      if(elapsed>4.65) showTxt('t-empty')
    }
    if(s.phase==='emotional'){
      s.darkness=Math.min(s.darkness*0.9993+0,0.88)
      hideTxt('t-empty')
      if(elapsed>7.85) showTxt('t-hope1')
      if(elapsed>9.35) showTxt('t-hope2')
    }
    if(s.phase==='comeback'){
      s.darkness=Math.max(s.darkness-0.019,0.38)
      hideTxt('t-hope1'); hideTxt('t-hope2')
      once('comeback',()=>audio.playComeback())
      if(elapsed>11.65) showTxt('t-comeback')
      if(hand){ hand.opacity=Math.min((elapsed-11)/1.4,0.88); hand.ashProgress=0; hand.snapProgress=0 }
      if(planet){ planet.setOpacity(0,Math.min(0.52+(elapsed-11)*0.1,0.88)); planet.setOpacity(1,Math.min(0.42+(elapsed-11)*0.08,0.78)) }
    }
    if(s.phase==='restore'){
      s.darkness=Math.max(s.darkness-0.024,0.04)
      hideTxt('t-comeback')
      once('restore',()=>{ audio.playRestore(); particles?.spawnRebuild() })
      if(hand) hand.opacity=Math.min(0.88+(elapsed-14)*0.06,1)
    }
    if(s.phase==='complete'){
      once('done',()=>setTimeout(()=>{ reset(); onComplete?.() },600))
    }

    if(planet){ planet.update(16); planet.draw() }
    if(hand) hand.draw()
    if(particles){ particles.update(elapsed-0.8, s.phase==='restore'?elapsed-14:-1); particles.draw(elapsed-0.8, s.phase==='restore'?elapsed-14:-1) }
    drawUI(elapsed, s.phase)
    s.animId=requestAnimationFrame(loop)
  },[getPhase,once,showTxt,hideTxt,litStones,drawUI,onComplete])

  const reset = useCallback(()=>{
    const s=S.current
    if(s.animId) cancelAnimationFrame(s.animId)
    s.running=false; s.startTime=null; s.fired={}; s.shown={}; s.darkness=0; s.stonesLit=0
    stoneEls.current.forEach(el=>el?.classList.remove(styles.stoneActive))
    ;['t-empty','t-hope1','t-hope2','t-comeback'].forEach(id=>hideTxt(id))
    if(stoneHudRef.current) stoneHudRef.current.style.opacity='0'
    if(progRef.current) progRef.current.style.width='0%'
    const h=R.current.hand
    if(h){ h.opacity=0; h.stoneOpacities=[0,0,0,0,0,0]; h.snapProgress=0; h.ashProgress=0 }
  },[hideTxt])

  useEffect(()=>{
    const resize=()=>{
      const W=window.innerWidth, H=window.innerHeight
      ;[planetRef,handRef,particleRef,uiRef].forEach(ref=>{
        if(ref.current){ref.current.width=W; ref.current.height=H}
      })
      R.current.planet?.resize(W,H)
      R.current.hand?.resize(W,H)
      R.current.particles?.resize(W,H)
    }
    resize()
    window.addEventListener('resize',resize)
    R.current.planet=new PlanetRenderer(planetRef.current)
    R.current.hand=new HandRenderer(handRef.current)
    R.current.particles=new ParticleSystem(particleRef.current)
    return ()=>window.removeEventListener('resize',resize)
  },[])

  useEffect(()=>{
    const s=S.current
    if(!isActive){ if(s.running) reset(); return }
    reset()
    s.running=true; s.animId=requestAnimationFrame(loop)
    return ()=>{ if(s.animId) cancelAnimationFrame(s.animId) }
  },[isActive,loop,reset])

  if(!isActive) return null

  return (
    <div className={styles.wrap}>
      <canvas ref={planetRef}   className={styles.layer} />
      <canvas ref={handRef}     className={styles.layer} />
      <canvas ref={particleRef} className={styles.layer} />
      <canvas ref={uiRef}       className={styles.layer} />

      <div ref={stoneHudRef} className={styles.stoneHud}>
        {STONE_DEFS.map((sc,i)=>(
          <div key={i} ref={el=>stoneEls.current[i]=el}
            className={styles.stone}
            style={{'--sc':sc.hex,'--sg':sc.glow,background:sc.hex}}
            title={sc.name}
          />
        ))}
      </div>

      <div className={styles.textLayer}>
        <p  ref={el=>textRefs.current['t-empty']=el}   className={`${styles.txt} ${styles.txtEmpty}`}>Everything fades.</p>
        <p  ref={el=>textRefs.current['t-hope1']=el}   className={`${styles.txt} ${styles.txtHope}`}>But not everything is lost.</p>
        <p  ref={el=>textRefs.current['t-hope2']=el}   className={`${styles.txt} ${styles.txtHopeGold}`}>Some things return stronger.</p>
        <h1 ref={el=>textRefs.current['t-comeback']=el} className={`${styles.txt} ${styles.txtComeback}`}>I am the comeback.</h1>
      </div>

      <div className={styles.progressWrap}><div ref={progRef} className={styles.progressFill}/></div>
      <div className={styles.blocker}/>
    </div>
  )
}
