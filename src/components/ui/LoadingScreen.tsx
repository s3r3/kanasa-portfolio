'use client';

import { useEffect, useRef, useState } from 'react';

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
}
class Particle {
  pos: Vec2; oldPos: Vec2; pinned: boolean; char: string;
  down: Particle | null = null;
  constructor(x: number, y: number, pinned: boolean, char: string) {
    this.pos = new Vec2(x, y); this.oldPos = new Vec2(x, y);
    this.pinned = pinned; this.char = char;
  }
}

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) return;
    const c = canvasRef.current;
    const bar = barRef.current;
    const typeEl = typeRef.current;
    if (!c || !bar || !typeEl) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    // Typewriter
    let ti = 0;
    const typer = setInterval(() => {
      typeEl.textContent = 'KANASA'.substring(0, ti);
      ti++;
      if (ti > 7) clearInterval(typer);
    }, 120);

    // Dimensi
    const VW = window.innerWidth;
    const VH = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.min(420, VW - 60);
    const H = Math.min(420, VH - 200);
    const gridW = Math.min(36, Math.floor(W / 12));
    const gridH = Math.min(28, Math.floor(H / 16));
    const cellW = W / (gridW - 1);
    const cellH = H / (gridH - 1);
    const ox = (VW - W) / 2;
    const oy = (VH - H) / 2;

    // Resize canvas
    c.style.width = VW + 'px';
    c.style.height = VH + 'px';
    c.width = VW * dpr;
    c.height = VH * dpr;

    // Char canvases
    const chars = 'KANASA CREATIVE DESIGN 0123456789';
    const box = Math.ceil(cellH * 1.5);
    const atlas: Record<string, HTMLCanvasElement> = {};
    for (const ch of new Set(chars)) {
      if (ch === ' ') continue;
      const off = document.createElement('canvas');
      off.width = off.height = box * dpr;
      const o = off.getContext('2d')!;
      o.scale(dpr, dpr);
      o.font = `bold ${Math.max(14, cellH * 1.3)}px monospace`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillStyle = '#444';
      o.fillText(ch, box / 2, box / 2);
      (off as unknown as Record<string, number>)._s = box;
      atlas[ch] = off;
    }

    // Particles
    const pts: Particle[] = [];
    const csts: { p1: Particle; p2: Particle; len: number; min: number; max: number }[] = [];

    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        pts.push(new Particle(
          i * cellW, j * cellH, j === 0,
          chars[(i + j * gridW) % chars.length],
        ));
      }
    }
    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = getPointID(j, i, gridH);
        const p = pts[id];
        if (j < gridH - 1) {
          const bp = pts[getPointID(j + 1, i, gridH)];
          csts.push({ p1: p, p2: bp, len: cellH, min: cellH * 0.02, max: cellH * 1.1 });
          p.down = bp;
        }
        if (i < gridW - 1) {
          csts.push({ p1: p, p2: pts[getPointID(j, i + 1, gridH)], len: cellW, min: cellW * 0.6, max: cellW * 4 });
        }
      }
    }

    // Mouse — grid-space coordinates
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      mouse.x = e.clientX - rect.left - ox;
      mouse.y = e.clientY - rect.top - oy;
    };
    c.addEventListener('pointermove', onMove);

    // 10s timer
    const timer = setTimeout(() => setDone(true), 10000);

    // Progress bar fill — rAF based
    const progStart = Date.now();
    const fillBar = () => {
      const p = Math.min(1, (Date.now() - progStart) / 10000);
      bar.style.width = `${p * 100}%`;
      if (p < 1) requestAnimationFrame(fillBar);
    };
    requestAnimationFrame(fillBar);

    // Loop
    let running = true;
    const loop = () => {
      if (!running) return;

      ctx.clearRect(0, 0, c.width, c.height);

      // Verlet physics
      for (const p of pts) {
        if (p.pinned) continue;
        const vx = (p.pos.x - p.oldPos.x) * 0.99;
        const vy = (p.pos.y - p.oldPos.y) * 0.99;
        p.oldPos.reset(p.pos.x, p.pos.y);
        p.pos.x += vx;
        p.pos.y += vy + 0.15;
      }

      // Solve 3×
      for (let k = 0; k < 3; k++) {
        for (const cst of csts) {
          const dx = cst.p2.pos.x - cst.p1.pos.x;
          const dy = cst.p2.pos.y - cst.p1.pos.y;
          const dist = Math.hypot(dx, dy);
          if (dist === 0) continue;
          let target = cst.len;
          if (dist < cst.min) target = cst.min;
          else if (dist > cst.max) target = cst.max;
          else continue;
          const pct = (target - dist) / dist / 2;
          if (!cst.p1.pinned) { cst.p1.pos.x -= dx * pct; cst.p1.pos.y -= dy * pct; }
          if (!cst.p2.pinned) { cst.p2.pos.x += dx * pct; cst.p2.pos.y += dy * pct; }
        }
      }

      // Mouse repulsion
      for (const p of pts) {
        const dx = mouse.x - p.pos.x;
        const dy = mouse.y - p.pos.y;
        const ls = dx * dx + dy * dy;
        if (ls < 5000 && ls > 1) {
          const a = Math.atan2(dy, dx) - Math.PI;
          const s = smoothstep(5000, -2000, ls) * 4 / 300;
          p.pos.x += Math.cos(a) * s;
          p.pos.y += Math.sin(a) * s;
        }
      }

      // Draw
      ctx.save();
      for (const p of pts) {
        if (!p.char || p.char === ' ' || !atlas[p.char]) continue;
        const img = atlas[p.char];
        let cos = 1, sin = 0;
        if (p.down) {
          const a = Math.atan2(p.down.pos.y - p.pos.y, p.down.pos.x - p.pos.x) - Math.PI / 2;
          cos = Math.cos(a); sin = Math.sin(a);
        }
        const tx = p.pos.x + ox;
        const ty = p.pos.y + oy;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * tx, dpr * ty);
        const s = (img as unknown as Record<string, number>)._s;
        ctx.drawImage(img, -s / 2, -s / 2, s, s);
      }
      ctx.restore();

      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearInterval(typer);
      c.removeEventListener('pointermove', onMove);
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#EEE] flex flex-col items-center justify-center">
      {/* Typewriter */}
      <h1
        ref={typeRef}
        className="font-sans text-[60px] md:text-[80px] font-extrabold leading-none text-[#333] mb-4 tracking-tight"
      />

      {/* Canvas wrapper */}
      <div className="relative">
        <canvas ref={canvasRef} className="block" />
      </div>

      {/* Progress bar */}
      <div className="w-[300px] md:w-[400px] h-[3px] bg-black/10 mt-6 overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="h-full bg-black/60 rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
