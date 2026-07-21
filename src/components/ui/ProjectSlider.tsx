'use client';

import { useState, useEffect, useRef } from 'react';
import { SLIDER_PROJECT } from '@/constants';

/* ponytail: card-stack slider — active card on top, prev/next scaled & offset */
export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLUListElement>(null);
  const { images, slides } = SLIDER_PROJECT;
  const len = images.length;

  // Auto-play
  useEffect(() => {
    if (isHovering) return;
    const t = setInterval(() => setCurrentIndex((p) => (p + 1) % len), 4000);
    return () => clearInterval(t);
  }, [isHovering, len]);

  // Move DOM nodes — next: append first to end, prev: prepend last to front
  const moveNode = (dir: 'next' | 'prev') => {
    const ul = sliderRef.current;
    if (!ul) return;
    const items = ul.children;
    if (!items.length) return;
    if (dir === 'next') {
      ul.appendChild(items[0]);
    } else {
      ul.prepend(items[items.length - 1]);
    }
  };

  const next = () => {
    moveNode('next');
    setCurrentIndex((p) => (p + 1) % len);
  };

  const prev = () => {
    moveNode('prev');
    setCurrentIndex((p) => (p - 1 + len) % len);
  };

  const active = slides[currentIndex] || slides[0];

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-[#efeee8] overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* Card Stack */}
        <div className="relative flex items-center justify-center" style={{ perspective: '1000px' }}>
          <ul
            ref={sliderRef}
            className="relative w-[280px] h-[400px] md:w-[380px] md:h-[520px]"
            onPointerEnter={() => setIsHovering(true)}
            onPointerLeave={() => setIsHovering(false)}
          >
            {images.map((img, i) => {
              const isActive = i === currentIndex;
              const isPrev = i === (currentIndex - 1 + len) % len;
              const isNext = i === (currentIndex + 1) % len;

              const style: React.CSSProperties = {
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                inset: 0,
                listStyle: 'none',
                borderRadius: '12px',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              };

              if (isActive) {
                style.transform = 'scale(1) translateX(0)';
                style.zIndex = 30;
                style.opacity = 1;
              } else if (isPrev) {
                style.transform = 'scale(0.85) translateX(-60px) rotateY(5deg)';
                style.zIndex = 20;
                style.opacity = 0.6;
              } else if (isNext) {
                style.transform = 'scale(0.85) translateX(60px) rotateY(-5deg)';
                style.zIndex = 20;
                style.opacity = 0.6;
              } else {
                style.transform = 'scale(0.7) translateX(0)';
                style.zIndex = 10;
                style.opacity = 0;
              }

              return (
                <li key={i} style={style} className="cursor-pointer" onClick={next}>
                  <div className="absolute inset-0 bg-black/20 rounded-xl" />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Active slide metadata */}
        <div className="text-center mt-8">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{active.title}</h3>
          <p className="text-sm md:text-base text-black/60 mt-2 max-w-md mx-auto">{active.description}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="text-xs font-mono tracking-[0.2em] hover:opacity-60 transition-opacity uppercase"
          >
            Prev
          </button>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const diff = i - currentIndex;
                  for (let d = 0; d < Math.abs(diff); d++) {
                    if (diff > 0) moveNode('next');
                    else moveNode('prev');
                  }
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-black scale-125' : 'bg-black/30'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="text-xs font-mono tracking-[0.2em] hover:opacity-60 transition-opacity uppercase"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
