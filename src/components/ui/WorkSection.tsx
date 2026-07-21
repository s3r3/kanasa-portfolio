'use client';

import { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { WORK_CATEGORIES } from '@/constants';
import { EASE, SPRING } from '@/lib/animations';

export default function WorkSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, SPRING.cursor);
  const cursorYSpring = useSpring(cursorY, SPRING.cursor);

  const handlePointerMove = (e: React.PointerEvent) => {
    cursorX.set(e.clientX - 60);
    cursorY.set(e.clientY - 15);
  };

  return (
    <section
      id="work"
      className="relative w-full min-h-screen px-6 py-24 md:py-32 bg-[#efeee8] text-black cursor-default overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          opacity: hoveredId !== null ? 1 : 0,
          scale: hoveredId !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-50 pointer-events-none bg-black text-white px-3 py-1 whitespace-nowrap"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">
          VIEW {hoveredId !== null ? WORK_CATEGORIES[hoveredId].title : ''}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full h-full relative">
        <div className="hidden md:block md:col-span-3 lg:col-span-4 relative h-full">
          <div className="sticky top-[120px] flex items-center gap-3 text-sm font-medium uppercase tracking-wide">
            <span className="text-[10px] leading-none">■</span> Work
          </div>
        </div>

        <div className="col-span-1 md:col-span-9 lg:col-span-8 flex flex-col min-h-[80vh] relative">
          <div className="flex flex-col gap-6 items-center md:items-start mb-24 z-10">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Instead of adapting to change, we shape it.
            </h2>
            <Link href="/work"><button className="border border-black px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-[#efeee8] transition-colors">
              See our work
            </button></Link>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center">
            {WORK_CATEGORIES.map((cat) => {
              const isHovered = hoveredId === cat.id;
              const posClasses = {
                'top-left': 'top-0 left-0 text-left',
                'top-right': 'top-0 right-0 text-right',
                'bottom-left': 'bottom-0 left-0 text-left',
                'bottom-right': 'bottom-0 right-0 text-right',
              }[cat.position];

              return (
                <div key={`title-${cat.id}`} className={`absolute ${posClasses} z-10 flex flex-col gap-2 max-w-[200px]`}>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                    {cat.title}
                  </h3>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] md:text-xs uppercase font-mono text-black/60 tracking-wider leading-relaxed"
                      >
                        {cat.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div
              className="relative w-full max-w-lg aspect-square grid grid-cols-2 grid-rows-2 z-20"
              style={{ cursor: 'none' }}
              onPointerLeave={() => setHoveredId(null)}
            >
              {WORK_CATEGORIES.map((cat) => {
                const isHovered = hoveredId === cat.id;
                const isAnyHovered = hoveredId !== null;

                return (
                  <Link href="/work" key={`img-${cat.id}`}>
                  <motion.div
                    onPointerEnter={() => setHoveredId(cat.id)}
                    animate={{
                      scale: isHovered ? 1.15 : isAnyHovered ? 0.9 : 1,
                      zIndex: isHovered ? 30 : 10,
                    }}
                    transition={{ duration: 0.5, ease: EASE.spring }}
                    className="relative w-full h-full bg-neutral-300 overflow-hidden shadow-lg cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${cat.image})` }}
                    />
                  </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
