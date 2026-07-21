'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SLIDER_PROJECT } from '@/constants';

const SLUGS = ['nurquran', 'foodie', 'qitchen', 'vrada', 'skillbridge', 'sethmilot'];

/* ponytail: React-friendly card-stack slider. State-driven, no DOM fighting. */
export default function ProjectSlider() {
  const { images, slides } = SLIDER_PROJECT;
  const len = images.length;

  // startIdx = which slide is currently the "first" (the hero bg)
  const [startIdx, setStartIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragDelta = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Build 6 visible items cyclically from startIdx
  const visible = Array.from({ length: 6 }, (_, i) => {
    const idx = (startIdx + i) % len;
    return {
      idx,
      slide: slides[idx] || slides[0],
      img: images[idx] || images[0],
      slug: SLUGS[idx] || 'work',
    };
  });

  const go = useCallback((dir: 'next' | 'prev') => {
    setStartIdx((prev) => (dir === 'next' ? (prev + 1) % len : (prev - 1 + len) % len));
  }, [len]);

  const goTo = useCallback((i: number) => setStartIdx(i % len), [len]);

  // Auto-play
  useEffect(() => {
    if (isHovering || isDragging) return;
    const t = setInterval(() => go('next'), 4000);
    return () => clearInterval(t);
  }, [isHovering, isDragging, go]);

  // Progress bar — 0..1 over 4s, direct DOM update
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (isHovering || isDragging) { bar.style.width = '0%'; return; }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 4000);
      bar.style.width = `${p * 100}%`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startIdx, isHovering, isDragging]);

  // Pointer drag/swipe
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDelta.current = e.clientX - dragStart.current;
  };
  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragDelta.current) > 50) {
      go(dragDelta.current < 0 ? 'next' : 'prev');
    }
    dragDelta.current = 0;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black select-none"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => { setIsHovering(false); setIsDragging(false); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes showSlideContent {
          0% { filter: blur(5px); transform: translateY(calc(-50% + 75px)); }
          100% { opacity: 1; filter: blur(0); transform: translateY(-50%); }
        }
        @keyframes progressShrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 z-20 bg-white/20">
        <div
          ref={barRef}
          className="h-full bg-white/60 transition-none"
          style={{ width: '0%' }}
        />
      </div>

      {/* Slides */}
      <ul className="slider relative w-full h-screen">
        {visible.map((item, i) => (
          <li
            key={`${startIdx}-${i}`}
            className="item"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="content">
              <h2 className="title">{item.slide.title}</h2>
              <p className="description">{item.slide.description}</p>
              <Link href={`/work/${item.slug}`} onClick={(e) => e.stopPropagation()}>
                <button>View Project</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Click nav on slider (not on content buttons) */}
      <div className="absolute inset-0 z-10 flex cursor-pointer" onClick={() => go('next')}>
        <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); go('prev'); }} />
        <div className="w-2/3 h-full" />
      </div>

      {/* Bottom nav buttons */}
      <nav className="nav">
        <button className="btn prev" onClick={(e) => { e.stopPropagation(); go('prev'); }} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 px-4">
          {Array.from({ length: len }, (_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === startIdx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="btn next" onClick={(e) => { e.stopPropagation(); go('next'); }} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </nav>

      {/* Counter */}
      <div className="absolute bottom-8 right-8 z-20 text-white/60 text-xs font-mono tracking-widest">
        {String(startIdx + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
      </div>

      {/* Styles */}
      <style jsx>{`
        .slider {
          position: relative;
          width: 100%;
          height: 100vh;
        }
        .item {
          width: 200px;
          height: 300px;
          list-style: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          background-position: center;
          background-size: cover;
          border-radius: 20px;
          box-shadow: 0 20px 30px rgba(255,255,255,0.15) inset;
          transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
        }
        .item:nth-child(1),
        .item:nth-child(2) {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: none;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
        }
        .item:nth-child(3) { left: 50%; }
        .item:nth-child(4) { left: calc(50% + 220px); }
        .item:nth-child(5) { left: calc(50% + 440px); }
        .item:nth-child(6) { left: calc(50% + 660px); opacity: 0; }

        .content {
          width: min(30vw, 400px);
          position: absolute;
          top: 50%;
          left: 3rem;
          transform: translateY(-50%);
          color: white;
          text-shadow: 0 3px 8px rgba(0,0,0,0.5);
          opacity: 0;
          display: none;
          pointer-events: none;
        }
        .content .title {
          font-family: 'Habitus', Arial, Helvetica, sans-serif;
          text-transform: uppercase;
          font-size: 1.8rem;
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        .content .description {
          line-height: 1.7;
          margin: 1rem 0 1.5rem;
          font-size: 0.8rem;
          opacity: 0.9;
        }
        .content a {
          pointer-events: auto;
        }
        .content button {
          width: fit-content;
          background: rgba(0,0,0,0.2);
          color: white;
          border: 2px solid white;
          border-radius: 0.25rem;
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: background 0.3s;
        }
        .content button:hover {
          background: rgba(255,255,255,0.2);
        }
        .item:nth-of-type(2) .content {
          display: block;
          animation: showSlideContent 0.75s ease-in-out 0.3s forwards;
        }

        .nav {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn {
          background: rgba(255,255,255,0.5);
          color: rgba(0,0,0,0.7);
          border: 2px solid rgba(0,0,0,0.6);
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }
        .btn:hover {
          background: rgba(255,255,255,0.3);
        }

        @media (max-width: 900px) {
          .content .title { font-size: 1rem; }
          .content .description { font-size: 0.7rem; }
          .content button { font-size: 0.7rem; }
          .item { width: 160px; height: 270px; }
          .item:nth-child(4) { left: calc(50% + 170px); }
          .item:nth-child(5) { left: calc(50% + 340px); }
          .item:nth-child(6) { left: calc(50% + 510px); opacity: 0; }
        }
        @media (max-width: 650px) {
          .content { left: 1.5rem; }
          .content .title { font-size: 0.9rem; }
          .content .description { font-size: 0.65rem; }
          .content button { font-size: 0.7rem; }
          .item { width: 130px; height: 220px; }
          .item:nth-child(4) { left: calc(50% + 140px); }
          .item:nth-child(5) { left: calc(50% + 280px); }
          .item:nth-child(6) { left: calc(50% + 420px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
