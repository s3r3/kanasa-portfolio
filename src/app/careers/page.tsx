'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';
import CareerModal from '@/components/ui/CareerModal';

// ==========================================
// DATA
// ==========================================
const CAREERS_ITEMS = [
  { id: 'jobs',     label: 'Jobs Opening',         x: '82%', y: '50%', type: 'jobs' },
  { id: 'playlist', label: 'PLAYLIST Kanasa 2025',     x: '62%', y: '15%', type: 'playlist' },
  { id: 'employee', label: 'EMPLOYEE OF THE MONTH', x: '30%', y: '18%', type: 'icon' },
  { id: 'admin',    label: 'ADMIN PARTY',           x: '14%', y: '38%', type: 'stack' },
  { id: 'rabbit',   label: 'RABBIT_HOLE',           x: '16%', y: '68%', type: 'icon' },
  { id: 'shoes',    label: 'SHOES',                 x: '26%', y: '55%', type: 'icon' },
  { id: 'pets',     label: 'PETS',                  x: '38%', y: '50%', type: 'icon' },
  { id: 'launch',   label: 'Kanasa_LAUNCH_PARTY',      x: '35%', y: '88%', type: 'stack' },
  { id: 'terrace',  label: 'TERRACE PARTY',         x: '55%', y: '80%', type: 'stack' },
  { id: 'benefits', label: 'JOBS BENEFITS',         x: '80%', y: '68%', type: 'icon' },
];

const ICON_MAP: Record<string, string> = {
  employee: '/images/ascii-placeholder.jpg',
  admin: '/images/slide-1.jpg',
  rabbit: '/images/slide-2.jpg',
  shoes: '/images/slide-3.jpg',
  pets: '/images/slide-4.jpg',
  launch: '/images/slide-5.jpg',
  terrace: '/images/experiential.jpg',
  benefits: '/images/mobile.jpg',
};

const OPEN_POSITIONS = [
  { title: 'Digital Strategist', type: 'Full-time', location: 'Montreal' },
  { title: 'Art Director', type: 'Full-time', location: 'Montreal' },
  { title: 'Full-Stack Developer', type: 'Contract', location: 'Remote' },
];

export default function CareersPage() {
  const [viewMode, setViewMode] = useState<'node' | 'grid'>('node');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [centerHover, setCenterHover] = useState(false);

  return (
    <main className="relative bg-bg-accent text-fg min-h-screen overflow-x-hidden selection:bg-black selection:text-white font-mono">
      {/* ========================================== */}
      {/* HERO                                       */}
      {/* ========================================== */}
      <section className="relative min-h-screen flex flex-col">
        {/* Kanasa background texture */}
        <div className="absolute top-20 left-6 text-[12rem] md:text-[18rem] leading-[0.7] font-sans font-medium tracking-tighter pointer-events-none z-0 select-none opacity-[0.06]">
          Kanasa
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pt-32">
          <Reveal>
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide mb-6">
              <span className="text-[10px] leading-none">■</span> Careers
            </div>
            <Typewriter
              text="Let's build something great together."
              speed={50}
              className="text-5xl md:text-[5.5rem] leading-[1.05] tracking-tight font-medium max-w-3xl mb-6 font-sans block"
            />
            <p className="text-base md:text-lg font-medium leading-relaxed text-fg/60 max-w-xl">
              Kanasa Creative is always looking for passionate people who love design and technology.
            </p>
          </Reveal>
        </div>

        {/* View toggle inside hero */}
        <div className="relative z-10 px-6 md:px-12 pb-8">
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wide">
            <span className="text-fg/40">Explore</span>
            <button
              onClick={() => setViewMode('node')}
              className={`transition-colors px-3 py-1.5 rounded-full ${
                viewMode === 'node' ? 'bg-black text-white' : 'border border-fg/30 text-fg/60 hover:text-fg'
              }`}
            >
              Mind Map
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`transition-colors px-3 py-1.5 rounded-full ${
                viewMode === 'grid' ? 'bg-black text-white' : 'border border-fg/30 text-fg/60 hover:text-fg'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* MIND MAP SECTION                           */}
      {/* ========================================== */}
      <section className="relative min-h-[900px] md:min-h-[1100px] w-full">
        {viewMode === 'node' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* SVG lines */}
            <svg className="absolute inset-0 w-full h-full">
              {CAREERS_ITEMS.map((item) => (
                <line
                  key={`line-${item.id}`}
                  x1="50%" y1="50%"
                  x2={item.x} y2={item.y}
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

            {/* Nodes */}
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              {/* Center KanasaFY */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
                onMouseEnter={() => setCenterHover(true)}
                onMouseLeave={() => setCenterHover(false)}
              >
                <div className="w-16 h-12 bg-black relative flex items-center justify-center rounded-[3px]">
                  <div className="absolute -top-[5px] left-1 w-5 h-[5px] bg-black rounded-t-sm" />
                  <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-3 h-1 bg-white" />
                  </div>
                </div>
                <span className="mt-1.5 bg-black text-white px-2 py-0.5 text-[10px] font-bold tracking-wide">KanasaFY</span>

                {centerHover && (
                  <div className="absolute top-full mt-2 w-max flex flex-col items-center gap-0.5 z-30">
                    <span className="bg-black text-white px-2 py-1 text-[10px] uppercase whitespace-nowrap">CONVINCED TO JOIN US?</span>
                    <span className="bg-black text-white px-2 py-1 text-[10px] uppercase whitespace-nowrap">YOU WON&rsquo;T REGRET IT.</span>
                  </div>
                )}
              </div>

              {/* Job Opening card */}
              {(() => {
                const item = CAREERS_ITEMS[0];
                return (
                  <div
                    key={item.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ top: item.y, left: item.x }}
                    onClick={() => setActiveModal(item.id)}
                  >
                    <div className="w-40 h-40 bg-[#dfff80] rounded-xl p-5 flex flex-col justify-between transition-colors duration-300 group-hover:bg-black border border-fg/10 shadow-lg">
                      <div className="w-8 h-8 bg-black text-[#dfff80] rounded-full flex items-center justify-center text-xs transition-colors duration-300 group-hover:bg-[#dfff80] group-hover:text-fg">
                        01
                      </div>
                      <div className="flex justify-between items-end font-sans">
                        <span className="text-2xl font-medium leading-none text-fg group-hover:text-[#dfff80]">Jobs<br/>Opening</span>
                        <span className="text-fg group-hover:text-[#dfff80]">[+]</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Other nodes */}
              {CAREERS_ITEMS.slice(1).map((item) => (
                <div
                  key={item.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                  style={{ top: item.y, left: item.x }}
                  onClick={() => setActiveModal(item.id)}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/60 shadow-md bg-neutral-300">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${ICON_MAP[item.type] || ICON_MAP[item.id] || '/images/ascii-placeholder.jpg'})` }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-sans whitespace-nowrap bg-white/60 px-1.5 py-0.5 rounded-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid Mode */}
        {viewMode === 'grid' && (
          <div className="relative z-10 pt-16 pb-32 px-6 md:px-12 flex flex-col items-center">
            <div className="flex flex-col items-center mb-16">
              <div className="w-16 h-12 bg-black relative flex items-center justify-center rounded-[3px]">
                <div className="absolute -top-[5px] left-1 w-5 h-[5px] bg-black rounded-t-sm" />
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-3 h-1 bg-white" />
                </div>
              </div>
              <span className="mt-1.5 bg-black text-white px-2 py-0.5 text-[10px] font-bold tracking-wide">KanasaFY</span>
              <div className="w-px h-12 bg-black/30 mt-4" />
            </div>

            <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
              <div
                onClick={() => setActiveModal('jobs')}
                className="w-full aspect-square bg-[#dfff80] rounded-xl p-5 flex flex-col justify-between cursor-pointer group hover:bg-black transition-colors border border-fg/10 shadow-lg"
              >
                <div className="w-8 h-8 bg-black text-[#dfff80] rounded-full flex items-center justify-center text-xs group-hover:bg-[#dfff80] group-hover:text-fg transition-colors">
                  01
                </div>
                <div className="flex justify-between items-end font-sans">
                  <span className="text-2xl font-medium leading-none text-fg group-hover:text-[#dfff80]">Jobs<br/>Opening</span>
                  <span className="text-fg group-hover:text-[#dfff80]">[+]</span>
                </div>
              </div>

              {CAREERS_ITEMS.filter(i => i.id !== 'jobs').map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModal(item.id)}
                  className="w-full aspect-square bg-white/40 border border-fg/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/80 transition-all shadow-sm"
                >
                  <div
                    className="w-20 h-20 rounded-lg bg-cover bg-center border border-fg/10 shadow-sm"
                    style={{ backgroundImage: `url(${ICON_MAP[item.type] || ICON_MAP[item.id] || '/images/ascii-placeholder.jpg'})` }}
                  />
                  <span className="text-[10px] uppercase tracking-wider font-sans text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================== */}
      {/* OPEN POSITIONS                             */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t border-fg/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-30 flex items-center gap-3 text-xs md:text-sm font-medium uppercase tracking-wide">
              <span className="text-[10px] leading-none">■</span> Open Positions
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
            {OPEN_POSITIONS.map((pos, i) => (
              <Reveal key={pos.title} delay={i * 0.05}>
                <div className="group flex items-center justify-between border-t border-fg/20 py-6 cursor-pointer hover:bg-black/5 transition-colors -mx-6 px-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight font-sans">{pos.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-[10px] uppercase font-mono tracking-wide text-fg/50">
                      <span>{pos.type}</span>
                      <span>{pos.location}</span>
                    </div>
                  </div>
                  <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity font-sans">→</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* MODALS                                     */}
      {/* ========================================== */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 z-45 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <CareerModal id={activeModal} onClose={() => setActiveModal(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer before footer */}
      <div className="h-32 md:h-48" />

      <Footer />
    </main>
  );
}
