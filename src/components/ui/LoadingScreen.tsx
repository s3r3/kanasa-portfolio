'use client';

import { useEffect, useRef, useState } from 'react';

// -- helpers (inlined from CodePen) --
function getPointID(row: number, col: number, gridH: number) {
  return row + col * gridH;
}
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

class Vec2 {
  x = 0; y = 0;
  constructor(x = 0, y = 0) { this.reset(x, y); }
  reset(x = 0, y = 0) { this.x = x; this.y = y; }
  clone() { return new Vec2(this.x, this.y); }
  add(v: Vec2) { this.x += v.x; this.y += v.y; return this; }
  subtract(v: Vec2) { this.x -= v.x; this.y -= v.y; return this; }
  subtractNew(v: Vec2) { return this.clone().subtract(v); }
  scale(s: number) { this.x *= s; this.y *= s; return this; }
  get length() { return Math.hypot(this.x, this.y); }
  get lengthSquared() { return this.x ** 2 + this.y ** 2; }
  get angle() { return Math.atan2(this.y, this.x); }
}

class Particle {
  pos: Vec2;
  oldPos: Vec2;
  pinned: boolean;
  id: number;
  char: string;
  downConstraint: Constraint | null = null;
  originalPinnedState = false;
  constructor({ x, y, pinned, id, char }: { x: number; y: number; pinned: boolean; id: number; char: string }) {
    this.pos = new Vec2(x, y);
    this.oldPos = new Vec2(x, y);
    this.pinned = pinned;
    this.id = id;
    this.char = char;
  }
}

class Constraint {
  p1: Particle; p2: Particle;
  length: number;
  minLength: number;
  maxLength: number;
  constructor({ p1, p2, length, compressFactor, stretchFactor }: { p1: Particle; p2: Particle; length: number; compressFactor: number; stretchFactor: number }) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = length;
    this.minLength = length * compressFactor;
    this.maxLength = length * stretchFactor;
  }
  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const distance = Math.hypot(dx, dy);
    if (distance === 0) return;
    let targetLength = this.length;
    if (distance < this.minLength) targetLength = this.minLength;
    else if (distance > this.maxLength) targetLength = this.maxLength;
    else return;
    const percent = (targetLength - distance) / distance / 2;
    const ox = dx * percent;
    const oy = dy * percent;
    if (!this.p1.pinned) { this.p1.pos.x -= ox; this.p1.pos.y -= oy; }
    if (!this.p2.pinned) { this.p2.pos.x += ox; this.p2.pos.y += oy; }
  }
}

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const c = canvasRef.current;
    if (!container || !c) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.min(400, window.innerWidth - 100);
    const h = Math.min(400, window.innerHeight - 100);

    const gridW = Math.min(40, Math.floor(w / 10));
    const gridH = Math.min(40, Math.floor(w / 5));
    const cellWidth = w / (gridW - 1);
    const cellHeight = h / (gridH - 1);
    const gravity = 0.2;
    const damping = 0.99;
    const iterations = 5;
    const compressFactor = 0.02;
    const stretchFactor = 1.1;
    const mouseSize = 5000;
    const mouseStrength = 4;

    // Build char canvas (source code of this component)
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
      (off as any).logicalSize = box;
      charCanvases[ch] = off;
    }

    // Sizing
    const sizeCanvas = () => {
      if (!c) return;
      c.style.width = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
      c.width = Math.round(window.innerWidth * dpr);
      c.height = Math.round(window.innerHeight * dpr);
    };
    sizeCanvas();

    // Particles
    const particles: Particle[] = [];
    const constraints: Constraint[] = [];

    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const x = i * cellWidth;
        const y = j * cellHeight;
        const id = getPointID(j, i, gridH);
        const pinned = j === 0;
        const charIndex = (i + j * gridW) % code.length;
        const char = code[charIndex] || ' ';
        particles.push(new Particle({ x, y, pinned, id, char }));
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
          const rp = particles[getPointID(j, i + 1, gridH)];
          constraints.push(new Constraint({
            p1: p, p2: rp, length: cellWidth,
            compressFactor: 0.6, stretchFactor: 4,
          }));
        }
      }
    }

    // Mouse
    const mouse = { x: -9999, y: -9999 };
    let grabbedParticle: Particle | null = null;

    const onPointerDown = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const ox = (c.width / dpr - w) / 2;
      const oy = (c.height / dpr - h) / 2 - 30;
      const lx = mx - ox;
      const ly = my - oy;
      mouse.x = lx;
      mouse.y = ly;

      for (const p of particles) {
        const dx = mouse.x - p.pos.x;
        const dy = mouse.y - p.pos.y;
        if (Math.hypot(dx, dy) < 20) {
          grabbedParticle = p;
          p.originalPinnedState = p.pinned;
          p.pinned = true;
          break;
        }
      }
    };
    const onPointerUp = () => {
      if (grabbedParticle) {
        grabbedParticle.pinned = grabbedParticle.originalPinnedState;
        grabbedParticle = null;
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const ox = (c.width / dpr - w) / 2;
      const oy = (c.height / dpr - h) / 2 - 30;
      const lx = mx - ox;
      const ly = my - oy;
      mouse.x = lx;
      mouse.y = ly;

      if (grabbedParticle) {
        grabbedParticle.pos.reset(mouse.x, mouse.y);
        grabbedParticle.oldPos.reset(mouse.x, mouse.y);
      }

      for (const p of particles) {
        const dx = mouse.x - p.pos.x;
        const dy = mouse.y - p.pos.y;
        const ls = dx * dx + dy * dy;
        if (ls < mouseSize) {
          const a = Math.atan2(dy, dx) - Math.PI;
          const strength = smoothstep(mouseSize, -2000, ls) * mouseStrength / 300;
          p.pos.x += Math.cos(a) * strength;
          p.pos.y += Math.sin(a) * strength;
        }
      }
    };

    c.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);

    // Auto-close after 3s
    const doneTimer = setTimeout(() => {
      setDone(true);
      cancelAnimationFrame(raf);
    }, 3000);

    // Render loop
    let raf: number;
    let last = performance.now();
    const render = (now: number) => {
      const delta = now - last;
      last = now;

      ctx.clearRect(0, 0, c.width, c.height);

      // Update particles
      for (const p of particles) {
        if (p.pinned) continue;
        const vx = (p.pos.x - p.oldPos.x) * damping;
        const vy = (p.pos.y - p.oldPos.y) * damping;
        p.oldPos.reset(p.pos.x, p.pos.y);
        p.pos.x += vx;
        p.pos.y += vy + gravity;
      }

      // Solve constraints
      for (let k = 0; k < iterations; k++) {
        for (const cst of constraints) cst.solve();
      }

      // Draw
      const ox = (c.width / dpr - w) / 2;
      const oy = (c.height / dpr - h) / 2 - 30;
      ctx.save();

      for (const p of particles) {
        if (!p.char || p.char === ' ') continue;
        const img = charCanvases[p.char];
        if (!img) continue;

        let cos = 1, sin = 0;
        const dcst = p.downConstraint;
        if (dcst) {
          const ddx = dcst.p2.pos.x - dcst.p1.pos.x;
          const ddy = dcst.p2.pos.y - dcst.p1.pos.y;
          const angle = Math.atan2(ddy, ddx) - Math.PI / 2;
          cos = Math.cos(angle);
          sin = Math.sin(angle);
        }

        const tx = p.pos.x + ox;
        const ty = p.pos.y + oy;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * tx, dpr * ty);
        const half = (img as any).logicalSize / 2;
        ctx.drawImage(img, -half, -half, (img as any).logicalSize, (img as any).logicalSize);
      }

      ctx.restore();

      if (!done) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      clearTimeout(doneTimer);
      cancelAnimationFrame(raf);
      c.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#EEE] flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      <div className="relative flex items-center justify-center border border-black/10 shadow-lg">
        <canvas ref={canvasRef} />
        <h1 className="absolute font-sans text-[80px] md:text-[100px] font-extrabold leading-none text-white pointer-events-none select-none">
          KANASA
        </h1>
      </div>
    </div>
  );
}
