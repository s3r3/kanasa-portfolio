'use client';

import { useEffect, useRef } from 'react';

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
  subtract(v: Vec2) { this.x -= v.x; this.y -= v.y; return this; }
  get length() { return Math.hypot(this.x, this.y); }
}
class Particle {
  pos: Vec2; oldPos: Vec2; pinned: boolean; id: number; char: string;
  downConstraint: Constraint | null = null;
  constructor({ x, y, pinned, id, char }: { x: number; y: number; pinned: boolean; id: number; char: string }) {
    this.pos = new Vec2(x, y); this.oldPos = new Vec2(x, y);
    this.pinned = pinned; this.id = id; this.char = char;
  }
}
class Constraint {
  p1: Particle; p2: Particle; length: number; minLen: number; maxLen: number;
  constructor({ p1, p2, length, cf, sf }: { p1: Particle; p2: Particle; length: number; cf: number; sf: number }) {
    this.p1 = p1; this.p2 = p2; this.length = length;
    this.minLen = length * cf; this.maxLen = length * sf;
  }
  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;
    let target = this.length;
    if (dist < this.minLen) target = this.minLen;
    else if (dist > this.maxLen) target = this.maxLen;
    else return;
    const pct = (target - dist) / dist / 2;
    const ox = dx * pct, oy = dy * pct;
    if (!this.p1.pinned) { this.p1.pos.x -= ox; this.p1.pos.y -= oy; }
    if (!this.p2.pinned) { this.p2.pos.x += ox; this.p2.pos.y += oy; }
  }
}

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const c = canvasRef.current;
    const bar = barRef.current;
    const typeEl = typeRef.current;
    if (!container || !c || !bar || !typeEl) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    // Typewriter "KANASA"
    const text = 'KANASA';
    let i = 0;
    const typer = setInterval(() => {
      if (i <= text.length) {
        typeEl.textContent = text.substring(0, i);
        i++;
      } else clearInterval(typer);
    }, 150);

    // Progress bar
    const startTime = Date.now();
    const progressTick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(1, elapsed / 10000);
      bar.style.width = `${pct * 100}%`;
      if (pct < 1) requestAnimationFrame(progressTick);
    };
    requestAnimationFrame(progressTick);

    // Canvas setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.min(400, window.innerWidth - 100);
    const h = Math.min(400, window.innerHeight - 100);
    const gridW = Math.min(40, Math.floor(w / 10));
    const gridH = Math.min(40, Math.floor(w / 5));
    const cellW = w / (gridW - 1);
    const cellH = h / (gridH - 1);
    const gravity = 0.2;
    const damping = 0.99;
    const iters = 5;
    const cf = 0.02, sf = 1.1;
    const mouseReach = 5000;
    const mouseStr = 4;

    const setSize = () => {
      c.style.width = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
      c.width = Math.round(window.innerWidth * dpr);
      c.height = Math.round(window.innerHeight * dpr);
    };
    setSize();

    // Build char canvases from random chars
    const chars = 'KANASA CREATIVE DESIGN TECHNOLOGY 0123456789';
    const box = Math.ceil(cellH * 1.4);
    const charCanvases: Record<string, HTMLCanvasElement> = {};
    for (const ch of new Set(chars)) {
      if (ch === ' ') continue;
      const off = document.createElement('canvas');
      off.width = off.height = box * dpr;
      const octx = off.getContext('2d')!;
      octx.scale(dpr, dpr);
      octx.font = `bold ${Math.max(12, cellH * 1.2)}px monospace`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#333';
      octx.fillText(ch, box / 2, box / 2);
      (off as HTMLCanvasElement & Record<string, unknown>).logicalSize = box;
      charCanvases[ch] = off;
    }

    const particles: Particle[] = [];
    const constraints: Constraint[] = [];

    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = getPointID(j, i, gridH);
        particles.push(new Particle({
          x: i * cellW, y: j * cellH,
          pinned: j === 0, id,
          char: chars[(i + j * gridW) % chars.length],
        }));
      }
    }
    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = getPointID(j, i, gridH);
        const p = particles[id];
        if (j < gridH - 1) {
          const bp = particles[getPointID(j + 1, i, gridH)];
          const cst = new Constraint({ p1: p, p2: bp, length: cellH, cf, sf });
          constraints.push(cst);
          p.downConstraint = cst;
        }
        if (i < gridW - 1) {
          constraints.push(new Constraint({ p1: p, p2: particles[getPointID(j, i + 1, gridH)], length: cellW, cf: 0.6, sf: 4 }));
        }
      }
    }

    // Hover-only mouse — no click grab
    const mouse = { x: -9999, y: -9999 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const ox = (c.width / dpr - w) / 2;
      const oy = (c.height / dpr - h) / 2 - 30;
      mouse.x = mx - ox;
      mouse.y = my - oy;
    };
    window.addEventListener('pointermove', onPointerMove);

    const doneTimer = setTimeout(() => {
      cancelAnimationFrame(raf);
      // Animate out
      container.style.opacity = '0';
      container.style.transition = 'opacity 0.6s ease';
      setTimeout(() => { container.style.display = 'none'; }, 600);
    }, 10000);

    let raf: number;
    let last = performance.now();
    const render = (now: number) => {
      const delta = now - last;
      last = now;

      ctx.clearRect(0, 0, c.width, c.height);

      for (const p of particles) {
        if (p.pinned) continue;
        const vx = (p.pos.x - p.oldPos.x) * damping;
        const vy = (p.pos.y - p.oldPos.y) * damping;
        p.oldPos.reset(p.pos.x, p.pos.y);
        p.pos.x += vx;
        p.pos.y += vy + gravity;
      }

      for (let k = 0; k < iters; k++) for (const cst of constraints) cst.solve();

      // Mouse hover — push particles away (no click grab)
      for (const p of particles) {
        const dx = mouse.x - p.pos.x;
        const dy = mouse.y - p.pos.y;
        const ls = dx * dx + dy * dy;
        if (ls < mouseReach) {
          const a = Math.atan2(dy, dx) - Math.PI;
          const str = smoothstep(mouseReach, -2000, ls) * mouseStr / 300;
          p.pos.x += Math.cos(a) * str;
          p.pos.y += Math.sin(a) * str;
        }
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
        if (p.downConstraint) {
          const ddx = p.downConstraint.p2.pos.x - p.downConstraint.p1.pos.x;
          const ddy = p.downConstraint.p2.pos.y - p.downConstraint.p1.pos.y;
          const a = Math.atan2(ddy, ddx) - Math.PI / 2;
          cos = Math.cos(a); sin = Math.sin(a);
        }
        const tx = p.pos.x + ox;
        const ty = p.pos.y + oy;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * tx, dpr * ty);
        const ls = (img as unknown as Record<string, number>).logicalSize;
        ctx.drawImage(img, -ls / 2, -ls / 2, ls, ls);
      }
      ctx.restore();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      clearTimeout(doneTimer);
      clearInterval(typer);
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#EEE] flex flex-col items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Typewriter */}
      <h1
        ref={typeRef}
        className="font-sans text-[60px] md:text-[80px] font-extrabold leading-none text-[#333] mb-8 tracking-tight"
      />

      {/* Canvas */}
      <div className="relative flex items-center justify-center border border-black/10 shadow-lg">
        <canvas ref={canvasRef} />
      </div>

      {/* Progress bar */}
      <div className="w-[320px] md:w-[400px] h-1 bg-black/10 mt-8 overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="h-full bg-black/60 rounded-full transition-none"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
