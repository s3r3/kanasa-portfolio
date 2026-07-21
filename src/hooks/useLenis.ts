'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { useScrollStore } from '@/store/useScrollStore';

export function useLenis() {
  const setScrollY = useScrollStore((s) => s.setScrollY);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      setScrollY(lenis.scroll);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const observer = new ResizeObserver(() => lenis.resize());
    observer.observe(document.body);

    // ponytail: one extra resize after fonts/images load
    setTimeout(() => lenis.resize(), 1000);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      lenis.destroy();
    };
  }, [setScrollY]);
}
