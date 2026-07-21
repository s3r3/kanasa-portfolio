'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';
import ParallaxImage from '@/components/ui/ParallaxImage';
import { useScrollStore } from '@/store/useScrollStore';
import { EASE } from '@/lib/animations';
import { useI18nStore } from '@/store/useI18n';

// ==========================================
// DATA STATIS
// ==========================================
const GRID_IMAGES = [
  '/images/about-1.jpg', '/images/about-2.jpg', '/images/about-3.jpg', '/images/about-4.jpg',
  '/images/about-5.jpg', '/images/about-6.jpg', '/images/about-7.jpg', '/images/about-8.jpg',
  '/images/about-9.jpg', '/images/about-10.jpg', '/images/about-11.jpg', '/images/about-12.jpg',
];

const PHILOSOPHY_KEYS = [0,1,2,3,4,5] as const;

export default function AboutPage() {
  const { t } = useI18nStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomProgress, setZoomProgress] = useState(0);

  const textOpacity = Math.max(0, 1 - zoomProgress / 0.2);
  const textScale = 1 - zoomProgress * 0.05;
  const gridOpacity = Math.min(1, Math.max(0, (zoomProgress - 0.15) / 0.1));
  const gridScale = 0.15 + Math.min(1, Math.max(0, (zoomProgress - 0.25) / 0.55)) * 0.85;

  const [displayedText, setDisplayedText] = useState('');
  const puzzleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = useScrollStore.subscribe(({ scrollY }) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.abs(rect.top);
      setZoomProgress(Math.min(1, Math.max(0, total > 0 ? scrolled / total : 0)));
    });
    return unsub;
  }, []);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      const tw = t('about.typewriter');
    if (i < tw.length) {
        setDisplayedText(tw.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  const [activePhilosophy, setActivePhilosophy] = useState(3);

  return (
    <main className="relative bg-bg-accent text-fg selection:bg-black selection:text-white">
      {/* ============================================================== */}
      {/* SEKSI 1: ZOOM GRID REVEAL & TYPEWRITER                           */}
      {/* ============================================================== */}
      <section ref={containerRef} className="relative h-[300vh] w-full">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          {/* Teks Typewriter */}
          <motion.div
            animate={{ opacity: textOpacity, scale: textScale }}
            className="absolute z-20 text-xs md:text-sm font-mono tracking-widest uppercase font-medium text-center"
          >
            {displayedText}
          </motion.div>

          {/* Grid Gambar Pop-up & Zoom */}
          <motion.div
            animate={{ opacity: gridOpacity, scale: gridScale }}
            className="absolute z-10 w-[150vw] h-[150vh] md:w-[120vw] md:h-[120vh] bg-black grid grid-cols-3 md:grid-cols-4 gap-1 p-1 origin-center"
          >
            {GRID_IMAGES.map((src, index) => (
              <div key={index} className="relative w-full h-full bg-neutral-800 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-white z-10" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white z-10" />
                <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-white z-10" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-white z-10" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEKSI 2: KONTEN TEKS, STATISTIK, & TIM                           */}
      {/* ============================================================== */}
      <section className="relative z-30 bg-bg-accent w-full pt-32 pb-24 px-6 md:px-12 border-t-2 border-fg">

        {/* Paragraf Utama */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <div className="hidden md:block md:col-span-1">
            <span className="text-[10px] leading-none mt-2 block">■</span>
          </div>
          <div className="col-span-1 md:col-span-11 max-w-6xl">
            <h2 className="text-4xl md:text-[4rem] font-medium tracking-tight leading-[1.05]">
              {t('about.hero')}
            </h2>
          </div>
        </div>

        {/* List Data */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32 border-t border-fg pt-12">
           <div className="hidden md:block md:col-span-6"></div>
           <Reveal className="col-span-1 md:col-span-6 flex flex-col font-mono text-xs md:text-sm uppercase tracking-wide">
             <div className="grid grid-cols-2 border-b border-fg/20 pb-4 mb-4"><span>{t('about.strategy')}</span></div>
             <div className="grid grid-cols-2 border-b border-fg/20 pb-4 mb-4"><span>{t('about.solidUiux')}</span></div>
             <div className="grid grid-cols-2 border-b border-fg/20 pb-4 mb-4"><span>{t('about.webdev')}</span></div>
             <div className="grid grid-cols-2 border-b border-fg/20 pb-4 mb-4"><span>{t('about.appdev')}</span></div>
             <div className="grid grid-cols-2 border-b border-fg/20 pb-4 mb-4"><span>{t('about.evolution')}</span></div>
           </Reveal>
        </div>

        {/* Statistik */}
        <div className="w-full relative border-y border-fg py-16 flex flex-col md:flex-row justify-between items-end mb-32 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-px bg-black/30 -z-10" />

          <Reveal delay={0} className="flex flex-col mb-12 md:mb-0 bg-bg-accent px-4">
            <span className="text-6xl md:text-[5rem] tracking-tighter font-medium">80</span>
            <span className="text-xs uppercase font-mono tracking-widest mt-2">{t('about.projects')}</span>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col mb-8 md:mb-0 bg-bg-accent px-4 pb-12">
            <span className="text-6xl md:text-[5rem] tracking-tighter font-medium">2+</span>
            <span className="text-xs uppercase font-mono tracking-widest mt-2">{t('about.years')}</span>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col bg-bg-accent px-4 pt-12 border-t border-fg">
            <span className="text-6xl md:text-[5rem] tracking-tighter font-medium">5+</span>
            <span className="text-xs uppercase font-mono tracking-widest mt-2">{t('about.clients')}</span>
          </Reveal>
        </div>

        {/* Grid Tim */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-2">
             <span className="text-[10px] leading-none mt-2 block">{t('about.team')}</span>
          </div>
          <Reveal className="col-span-1 md:col-span-10">
            <h2 className="text-3xl md:text-[3rem] font-medium tracking-tight leading-[1.05] mb-12">
              {t('about.team.desc')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'AL FURQAN', role: t('about.role.backend') },
                { name: 'AHMAD KUSYAIRI', role: t('about.role.uiux') },
                { name: 'MUH. FADHIL', role: t('about.role.mobile') },
                { name: 'MUH. ALGHIFARI', role: t('about.role.fullstack') },
                { name: 'IKSAL AL FARISI', role: t('about.role.frontend') },
              ].map((member, i) => (
                <div key={member.name} className="flex flex-col gap-2">
                  <div className="w-full aspect-3/4 bg-neutral-400 grayscale hover:grayscale-0 transition-all duration-500 bg-cover bg-center" style={{ backgroundImage: `url(/images/team-${i + 1}.jpg)` }} />
                  <span className="text-xs font-mono uppercase tracking-wide">{member.name}</span>
                  <span className="text-[9px] font-mono text-fg/50">{member.role}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEKSI 3: PARALLAX PUZZLE BOX                                     */}
      {/* ============================================================== */}
      <section ref={puzzleRef} className="relative w-full h-[200vh] bg-bg-accent">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          <div
            className="absolute inset-0 w-full h-full -z-10 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/puzzle-bg.jpg)',
              backgroundAttachment: 'fixed',
            }}
          />

          <div className="relative w-[85%] max-w-[400px] aspect-square bg-bg-accent p-8 flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-black" />
            <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-black" />
            <div className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-black" />
            <div className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-black" />

            <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              {t('about.puzzle.title').split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            </h3>
            <div className="text-[10px] font-mono uppercase tracking-widest cursor-pointer hover:italic transition-all">
              {t('about.puzzle.link')}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SEKSI 4: GIANT ACCORDION (PHILOSOPHY LIST)                      */}
      {/* ============================================================== */}
      <section className="relative w-full bg-bg-accent px-6 md:px-12 py-24 md:py-48 z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full relative">

          <div className="hidden md:block md:col-span-4 relative h-full">
            <div className="sticky top-30 flex gap-3 text-xs md:text-sm font-medium uppercase tracking-wide">
              <span className="text-[10px] leading-none mt-1">■</span>
              <span>{t(`about.philosophy.${activePhilosophy}.title`)}</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-8 flex flex-col">
            {PHILOSOPHY_KEYS.map((id) => {
              const isActive = activePhilosophy === id;
              const content = t(`about.philosophy.${id}.content`);

              return (
                <div key={id} className="w-full flex flex-col border-t border-fg">
                  <button
                    onClick={() => setActivePhilosophy(id)}
                    className="w-full text-left py-8 md:py-12 flex justify-between items-center group cursor-pointer"
                  >
                    <h3 className="text-4xl md:text-[4.5rem] tracking-tighter font-medium leading-none group-hover:opacity-60 transition-opacity">
                      {t(`about.philosophy.${id}.title`)}
                    </h3>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE.smooth }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 pt-4">
                          <p className="text-base md:text-lg font-medium leading-relaxed max-w-lg">
                            {content.substring(0, Math.floor(content.length / 2))}
                          </p>
                          <p className="text-base md:text-lg font-medium leading-relaxed max-w-lg">
                            {content.substring(Math.floor(content.length / 2))}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className="border-t border-fg w-full" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
