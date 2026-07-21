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
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      setScrollY(lenis.scroll);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    // ponytail: resize after mount so Lenis catches animated page height
    requestAnimationFrame(() => lenis.resize());

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [setScrollY]);
}
