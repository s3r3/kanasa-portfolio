'use client';

import { useEffect, useRef, useState } from 'react';

/* ---- helpers ---- */
function getPointID(row: number, col: number, _gridH: number) { return row + col * _gridH; }
function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/* ---- Vec2 (exact from CodePen) ---- */
class Vec2 {
  x = 0; y = 0;
  constructor(x = 0, y = 0) { this.reset(x, y); }
  zero() { this.reset(0, 0); }
  reset(x = 0, y = 0) { this.x = x; this.y = y; }
  clone() { return new Vec2(this.x, this.y); }
  add(v: Vec2) { this.x += v.x; this.y += v.y; return this; }
  subtract(v: Vec2) { this.x -= v.x; this.y -= v.y; return this; }
  subtractNew(v: Vec2) { return this.clone().subtract(v); }
  scale(s: number) { this.x *= s; this.y *= s; return this; }
  get lengthSquared() { return this.x ** 2 + this.y ** 2; }
  get length() { return Math.hypot(this.x, this.y); }
  get angle() { return Math.atan2(this.y, this.x); }
}

/* ---- Particle ---- */
class Particle {
  pos: Vec2; oldPos: Vec2; pinned: boolean; id: number; char: string;
  downConstraint: { p1: Particle; p2: Particle } | null = null;
  originalPinnedState = false;
  velocity = new Vec2(); acceleration = new Vec2(); gravityVec = new Vec2();
  constructor({ x, y, pinned, id, char }: { x: number; y: number; pinned: boolean; id: number; char: string }) {
    this.pos = new Vec2(x, y); this.oldPos = new Vec2(x, y);
    this.pinned = pinned; this.id = id; this.char = char;
  }
  applyForce(v: Vec2) { this.acceleration.add(v); }
}

/* ---- Constraint ---- */
class Constraint {
  p1: Particle; p2: Particle; length: number; minLength: number; maxLength: number;
  constructor({ p1, p2, length, compressFactor, stretchFactor }: { p1: Particle; p2: Particle; length: number; compressFactor: number; stretchFactor: number }) {
    this.p1 = p1; this.p2 = p2; this.length = length;
    this.minLength = length * compressFactor; this.maxLength = length * stretchFactor;
  }
  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;
    let target = this.length;
    if (dist < this.minLength) target = this.minLength;
    else if (dist > this.maxLength) target = this.maxLength;
    else return;
    const pct = (target - dist) / dist / 2;
    if (!this.p1.pinned) { this.p1.pos.x -= dx * pct; this.p1.pos.y -= dy * pct; }
    if (!this.p2.pinned) { this.p2.pos.x += dx * pct; this.p2.pos.y += dy * pct; }
  }
}

/* ---- Audio: wind chime ---- */
let audioCtx: AudioContext | null = null;
function chime() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const now = audioCtx.currentTime;
    for (let h = 0; h < 3; h++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 520 + h * 170 + Math.random() * 80;
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5 + Math.random());
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now + h * 0.12);
      osc.stop(now + 2);
    }
  } catch (_) { /* silent */ }
}
let chimeThrottle = 0;

/* ===== COMPONENT ===== */
export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) return;
    const container = containerRef.current;
    const c = canvasRef.current;
    const bar = barRef.current;
    const typeEl = typeRef.current;
    if (!container || !c || !bar || !typeEl) return;

    /* ---- typewriter ---- */
    let ti = 0;
    const typer = setInterval(() => {
      typeEl.textContent = 'KANASA'.substring(0, ti);
      ti++;
      if (ti > 7) clearInterval(typer);
    }, 120);

    /* ---- progress bar ---- */
    const progStart = Date.now();
    const fillBar = () => {
      const p = Math.min(1, (Date.now() - progStart) / 10000);
      bar.style.width = `${p * 100}%`;
      if (p < 1) requestAnimationFrame(fillBar);
    };
    requestAnimationFrame(fillBar);

    /* ---- canvas setup ---- */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.min(400, window.innerWidth - 100);
    const h = Math.min(400, window.innerHeight - 100);
    const gridW = Math.min(40, Math.floor(w / 10));
    const gridH = Math.min(40, Math.floor(w / 5));
    const cellWidth = w / (gridW - 1);
    const cellHeight = h / (gridH - 1);
    const gravity = 0.2;
    const damping = 0.99;
    const iterationsPerFrame = 5;
    const compressFactor = 0.02;
    const stretchFactor = 1.1;
    const mouseSize = 5000;
    const mouseStrength = 4;

    c.style.width = w + 'px';
    c.style.height = h + 'px';
    c.width = w * dpr;
    c.height = h * dpr;

    const ctx = c.getContext('2d')!;

    /* ---- char canvases (source code of this component) ---- */
    const code = LoadingScreen.toString();
    const fontSize = Math.max(12, cellHeight * 1.2);
    const box = Math.ceil(fontSize * 1.4);
    const charCanvases: Record<string, HTMLCanvasElement> = {};
    for (const ch of new Set(code)) {
      if (ch === ' ') continue;
      const off = document.createElement('canvas');
      off.width = off.height = box * dpr;
      const octx = off.getContext('2d')!;
      octx.scale(dpr, dpr);
      octx.font = `bold ${fontSize}px monospace`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#333';
      octx.fillText(ch, box / 2, box / 2);
      (off as unknown as Record<string, number>).logicalSize = box;
      charCanvases[ch] = off;
    }

    /* ---- particles ---- */
    const particles: Particle[] = [];
    const constraints: Constraint[] = [];

    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = getPointID(j, i, gridH);
        const cIdx = (i + j * gridW) % code.length;
        particles.push(new Particle({ x: i * cellWidth, y: j * cellHeight, pinned: j === 0, id, char: code[cIdx] }));
      }
    }
    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = getPointID(j, i, gridH);
        const p = particles[id];
        if (j < gridH - 1) {
          const bp = particles[getPointID(j + 1, i, gridH)];
          const cst = new Constraint({ p1: p, p2: bp, length: cellHeight, compressFactor, stretchFactor });
          constraints.push(cst);
          p.downConstraint = cst;
        }
        if (i < gridW - 1) {
          constraints.push(new Constraint({ p1: p, p2: particles[getPointID(j, i + 1, gridH)], length: cellWidth, compressFactor: 0.6, stretchFactor: 4 }));
        }
      }
    }

    /* ---- input (exact CodePen logic) ---- */
    const mousePos = new Vec2(-9999, -9999);
    let grabbedParticle: Particle | null = null;
      const setMouse = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      const cssX = e.clientX - rect.left;
      const cssY = e.clientY - rect.top;
      const offsetX = (c.width / dpr - w) / 2;
      const offsetY = (c.height / dpr - h) / 2 - 30;
      mousePos.x = cssX - offsetX;
      mousePos.y = cssY - offsetY;
    };

    const onDown = (e: PointerEvent) => {
      setMouse(e);
      for (const p of particles) {
        if (mousePos.subtractNew(p.pos).length < 20) {
          grabbedParticle = p;
          p.originalPinnedState = p.pinned;
          p.pinned = true;
          break;
        }
      }
    };
    const onUp = () => {
      if (grabbedParticle) {
        grabbedParticle.pinned = grabbedParticle.originalPinnedState;
        grabbedParticle = null;
      }
    };
    const onMove = (e: PointerEvent) => {
      setMouse(e);
      if (grabbedParticle) {
        grabbedParticle.pos.reset(mousePos.x, mousePos.y);
        grabbedParticle.oldPos.reset(mousePos.x, mousePos.y);
      }
      for (const p of particles) {
        const diff = mousePos.subtractNew(p.pos);
        const ls = diff.lengthSquared;
        if (ls < mouseSize && ls > 0.1) {
          const a = diff.angle - Math.PI;
          const strength = smoothstep(mouseSize, -2000, ls) * mouseStrength / 300;
          p.applyForce(new Vec2(Math.cos(a) * strength, Math.sin(a) * strength));

          // chime on strong movement
          chimeThrottle++;
          if (chimeThrottle > 30 && ls < 5000 && ls > 100) {
            chimeThrottle = 0;
            chime();
          }
        }
      }
    };

    c.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);
    c.addEventListener('contextmenu', (e) => e.preventDefault());

    /* ---- close timer ---- */
    const timer = setTimeout(() => setDone(true), 10000);

    /* ---- render loop (exact CodePen structure) ---- */
    let running = true;
    let lastDelta = 0;
    const runloop = (delta: number) => {
      if (!running) return;
      requestAnimationFrame(runloop);

      ctx.save();
      ctx.clearRect(0, 0, c.width, c.height);

      // Update
      for (const p of particles) {
        if (p.pinned) { p.acceleration.zero(); continue; }
        p.velocity.reset((p.pos.x - p.oldPos.x) * damping, (p.pos.y - p.oldPos.y) * damping);
        p.oldPos.reset(p.pos.x, p.pos.y);
        const dd = (delta - lastDelta) ** 2;
        p.gravityVec.reset(0, gravity / dd);
        p.applyForce(p.gravityVec);
        p.pos.x += p.velocity.x + p.acceleration.x * dd;
        p.pos.y += p.velocity.y + p.acceleration.y * dd;
        p.acceleration.zero();
      }
      lastDelta = delta;

      // Solve constraints
      for (let i = 0; i < iterationsPerFrame; i++) {
        for (const cst of constraints) cst.solve();
      }

      // Draw
      const offsetX = (c.width / dpr - w) / 2;
      const offsetY = (c.height / dpr - h) / 2 - 30;

      for (const p of particles) {
        if (!p.char || p.char === ' ' || !charCanvases[p.char]) continue;
        const img = charCanvases[p.char];
        let cos = 1, sin = 0;
        if (p.downConstraint) {
          const dx = p.downConstraint.p2.pos.x - p.downConstraint.p1.pos.x;
          const dy = p.downConstraint.p2.pos.y - p.downConstraint.p1.pos.y;
          const angle = Math.atan2(dy, dx) - Math.PI / 2;
          cos = Math.cos(angle); sin = Math.sin(angle);
        }
        const tx = p.pos.x + offsetX;
        const ty = p.pos.y + offsetY;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * tx, dpr * ty);
        const sz = (img as unknown as Record<string, number>).logicalSize || box;
        ctx.drawImage(img, -sz / 2, -sz / 2, sz, sz);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.restore();
    };
    requestAnimationFrame(runloop);

    return () => {
      running = false;
      clearTimeout(timer);
      clearInterval(typer);
      c.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#EEE] flex flex-col items-center justify-center select-none"
      style={{ touchAction: 'none' }}
    >
      <h1
        ref={typeRef}
        className="font-sans text-[60px] md:text-[80px] font-extrabold leading-none text-[#333] mb-6 tracking-tight"
      />
      <div
        className="relative flex items-center justify-center border border-black/10 shadow-lg"
        style={{ touchAction: 'none' }}
      >
        <canvas ref={canvasRef} />
      </div>
      <div className="w-[300px] md:w-[400px] h-[3px] bg-black/10 mt-6 overflow-hidden rounded-full">
        <div ref={barRef} className="h-full bg-black/60 rounded-full" style={{ width: '0%' }} />
      </div>
    </div>
  );
}
