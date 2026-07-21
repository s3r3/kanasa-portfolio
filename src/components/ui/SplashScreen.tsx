'use client';

import { useEffect, useRef } from 'react';

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simpel fade-in fade-out splash
    const el = document.createElement('div');
    el.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-[#cec9c0] text-black';
    el.innerHTML = `<span class="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none">KANASA</span>`;
    container.appendChild(el);

    // Play: muncul, tunggu, fade out
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 700);
      }, 1200);
    });

    return () => { el.remove(); };
  }, []);

  return <div ref={containerRef} />;
}
