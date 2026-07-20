'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import { useScrollStore } from '@/store/useScrollStore';

const ALL_WORK_ITEMS = [
  {
    id: 1,
    client: 'DIME',
    desc: 'MODERNIZING AN ICONIC STREETWEAR BRAND.',
    category: 'E-COMMERCE',
    industry: 'RETAIL & CONSUMER GOODS',
    year: '2025',
    refCode: 'PDM-1025',
    image: '/images/dime-green.jpg',
    colSpan: 'md:col-span-3',
    aspect: 'aspect-square',
  },
  {
    id: 2,
    client: 'IT GETS BETTER CANADA',
    desc: 'EMPOWERING LGBTQ+ YOUTH.',
    category: 'MOBILE APP',
    industry: 'HEALTH & EDUCATION',
    year: '2025',
    refCode: 'PGL-0925',
    image: '/images/igbc.jpg',
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 3,
    client: 'SOPFEU',
    desc: 'HARNESSING REAL-TIME DATA TO CREATE THE ULTIMATE PREVENTION TOOL.',
    category: 'MOBILE APP, WEBSITE',
    industry: 'PUBLIC & SOCIAL SECTOR',
    year: '2025',
    refCode: 'PSF-0325',
    image: '/images/sopfeu.jpg',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-square',
  },
  {
    id: 4,
    client: 'CELLART',
    desc: 'THE ART OF WINE CONSERVATION.',
    category: 'WEBSITE',
    industry: 'RETAIL & CONSUMER GOODS',
    year: '2025',
    refCode: 'PCA-0325',
    image: '/images/cellart.jpg',
    colSpan: 'md:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 5,
    client: 'MISSION 2035',
    desc: 'SHAPING THE FUTURE.',
    category: 'WEBSITE',
    industry: 'HEALTH & EDUCATION',
    year: '2024',
    refCode: 'PHM-0524',
    image: '/images/mission.jpg',
    colSpan: 'md:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 6,
    client: 'HALO DENTAL',
    desc: 'BUILDING TRUST TO PROPEL A NEW PLAYER.',
    category: 'WEBSITE',
    industry: 'PROFESSIONAL SERVICES',
    year: '2024',
    refCode: 'PHD-0524',
    image: '/images/halo-monster.jpg',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/3]',
  },
];

// ponytail: inline parallax card, extract if reused elsewhere
function WorkCard({
  item,
  index,
}: {
  item: (typeof ALL_WORK_ITEMS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 150, damping: 25, mass: 0.5 });

  // Track card position relative to viewport on every Lenis scroll frame
  useEffect(() => {
    const unsub = useScrollStore.subscribe(({ scrollY }) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewMid = window.innerHeight / 2;
      const cardMid = rect.top + rect.height / 2;
      y.set((cardMid - viewMid) * -0.15);
    });
    return unsub;
  }, [y]);

  const slug = item.client.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/work/${slug}`} className={`col-span-1 ${item.colSpan}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.6,
          delay: (index % 3) * 0.1,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="flex flex-col gap-4 group cursor-pointer"
      >
        <div
          className={`relative w-full bg-neutral-300 overflow-hidden ${item.aspect}`}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})`, y: smoothY }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>
        <div className="grid grid-cols-2 text-[10px] md:text-xs uppercase font-medium tracking-wide">
          <div className="pr-4">{item.client}</div>
          <div className="flex flex-col text-black/60">
            <span className="leading-relaxed">{item.desc}</span>
            <span className="mt-3 text-black group-hover:italic transition-all">
              {item.category}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function WorkPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen">
      {/* --- HERO TEXT --- */}
      <section className="pt-48 pb-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12">
        <div className="hidden md:block md:col-span-6" />
        <Reveal className="md:col-span-6">
          <h1 className="text-5xl md:text-[5.5rem] leading-[0.95] tracking-tighter font-medium">
            Don't adapt to change.
            <br />
            Shape it.
          </h1>
        </Reveal>
      </section>

      {/* --- FILTER BAR + VIEW TOGGLE (fixed — Lenis breaks sticky) --- */}
      <div className="fixed top-20 z-30 w-full bg-[#efeee8]/90 backdrop-blur-md px-6 md:px-12 py-4 border-b border-black/20 flex justify-between items-center text-xs md:text-sm font-medium uppercase tracking-wide">
        <div className="flex gap-2">
          <span className="text-[10px] leading-none mt-0.5">■</span>
          <span className="cursor-pointer">
            ALL WORK [{ALL_WORK_ITEMS.length}]
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer font-mono">
          <span
            onClick={() => setViewMode('grid')}
            className={`transition-colors ${
              viewMode === 'grid'
                ? 'text-black'
                : 'text-black/40 hover:text-black'
            }`}
          >
            {viewMode === 'grid' ? '[GRID]' : 'GRID'}
          </span>
          <span
            onClick={() => setViewMode('list')}
            className={`transition-colors ${
              viewMode === 'list'
                ? 'text-black'
                : 'text-black/40 hover:text-black'
            }`}
          >
            {viewMode === 'list' ? '[LIST]' : 'LIST'}
          </span>
        </div>
      </div>

      {/* --- KONTEN DINAMIS --- */}
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-12 md:pb-24 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {/* GRID */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-16 md:gap-y-24"
            >
              {ALL_WORK_ITEMS.map((item, index) => (
                <WorkCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}

          {/* LIST */}
          {viewMode === 'list' && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col"
            >
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 border-b border-black pb-4 text-lg md:text-2xl font-medium tracking-tight mb-4">
                <div className="col-span-1">Projects</div>
                <div className="col-span-1">Type</div>
                <div className="col-span-1">Industries</div>
                <div className="col-span-1 flex items-center gap-2">
                  Year <span className="text-sm">▼</span>
                </div>
                <div className="col-span-1 text-right">Ref.</div>
              </div>

              {ALL_WORK_ITEMS.map((item) => (
                <div
                  key={`list-${item.id}`}
                  className="grid grid-cols-5 gap-4 border-b border-black/10 py-5 text-xs md:text-sm uppercase font-mono tracking-wide cursor-pointer hover:bg-black/5 transition-colors group"
                >
                  <div className="col-span-1 font-sans font-medium group-hover:italic transition-all">
                    {item.client}
                  </div>
                  <div className="col-span-1 text-black/70">
                    {item.category}
                  </div>
                  <div className="col-span-1 text-black/70">
                    {item.industry}
                  </div>
                  <div className="col-span-1 text-black/70">{item.year}</div>
                  <div className="col-span-1 text-right text-black/70">
                    {item.refCode}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* --- LOAD MORE --- */}
      <section className="px-6 md:px-12 pb-32 flex justify-start">
        <button className="bg-black text-white px-8 py-3 text-xs uppercase font-medium tracking-wider hover:bg-black/80 transition-colors">
          Load More
        </button>
      </section>

      {/* --- ARCHIVE --- */}
      <section className="bg-[#cec9c0] w-full px-6 md:px-12 py-24 flex flex-col gap-12">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide">
          <span className="text-[10px] leading-none">■</span> Archive
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-video bg-neutral-300 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/wind-turbine.jpg)' }}
            />
          </div>
          <div className="aspect-video bg-neutral-300 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/zen-garden.jpg)' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
