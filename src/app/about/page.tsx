'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';
import ParallaxImage from '@/components/ui/ParallaxImage';
import { useScrollStore } from '@/store/useScrollStore';
import { EASE } from '@/lib/animations';

// ==========================================
// DATA STATIS
// ==========================================
const TYPEWRITER_TEXT = "[A CREATIVE STUDIO. ■ DESIGN & TECHNOLOGY.]";

const GRID_IMAGES = [
  '/images/about-1.jpg', '/images/about-2.jpg', '/images/about-3.jpg', '/images/about-4.jpg',
  '/images/about-5.jpg', '/images/about-6.jpg', '/images/about-7.jpg', '/images/about-8.jpg',
  '/images/about-9.jpg', '/images/about-10.jpg', '/images/about-11.jpg', '/images/about-12.jpg',
];

const PHILOSOPHY_DATA = [
  {
    id: 0,
    title: 'Move fast.',
    content: 'Speed is a feature. We prototype quickly, test immediately, and iterate constantly to ensure we are always moving forward without getting bogged down by perfectionism.',
  },
  {
    id: 1,
    title: 'Build to last.',
    content: 'While we move fast, we never compromise on architecture. We build robust, scalable, and maintainable systems that will support your business for years to come.',
  },
  {
    id: 2,
    title: 'Start with tech.',
    content: 'Technology isn\'t just an afterthought; it\'s the foundation. We evaluate technical feasibility from day one to ensure our creative visions can be flawlessly executed in the real world.',
  },
  {
    id: 3,
    title: 'Team up, think up.',
    content: 'We believe that teamwork is the ultimate competitive advantage. Our strength lies in bringing diverse perspectives together, working with our clients to co-create solutions that leverage digital expertise and business knowledge. Guiding teams through meaningful dialogue to make confident, informed decisions, we collaborate in order to work seamlessly toward shared goals, focusing on measurable results and meaningful impact.',
  },
  {
    id: 4,
    title: 'See beyond the storefront.',
    content: 'We look at the entire ecosystem of your business. A beautiful frontend is useless if the backend operations and user journeys aren\'t optimized for conversion and retention.',
  },
  {
    id: 5,
    title: 'Design responsibly.',
    content: 'Digital products have real-world impacts. We prioritize accessibility, performance, and ethical design patterns to ensure our work serves all users equitably and sustainably.',
  },
];

export default function AboutPage() {
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
      if (i < TYPEWRITER_TEXT.length) {
        setDisplayedText(TYPEWRITER_TEXT.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  const [activePhilosophy, setActivePhilosophy] = useState(3);

  return (
    <main className="relative bg-[#cec9c0] text-black selection:bg-black selection:text-white">
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
      <section className="relative z-30 bg-[#cec9c0] w-full pt-32 pb-24 px-6 md:px-12 border-t-2 border-black">

        {/* Paragraf Utama */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <div className="hidden md:block md:col-span-1">
            <span className="text-[10px] leading-none mt-2 block">■</span>
          </div>
          <div className="col-span-1 md:col-span-11 max-w-6xl">
            <h2 className="text-4xl md:text-[4rem] font-medium tracking-tight leading-[1.05]">
              Kanasa Creative is a design and technology studio based in Aceh, Indonesia. We build digital products that blend creativity with code — from mobile apps to websites, we craft experiences that matter.
            </h2>
          </div>
        </div>

        {/* List Data */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32 border-t border-black pt-12">
           <div className="hidden md:block md:col-span-6"></div>
           <Reveal className="col-span-1 md:col-span-6 flex flex-col font-mono text-xs md:text-sm uppercase tracking-wide">
             <div className="grid grid-cols-2 border-b border-black/20 pb-4 mb-4"><span>Strategy</span></div>
             <div className="grid grid-cols-2 border-b border-black/20 pb-4 mb-4"><span>Solid UI / UX</span></div>
             <div className="grid grid-cols-2 border-b border-black/20 pb-4 mb-4"><span>Web Development</span></div>
             <div className="grid grid-cols-2 border-b border-black/20 pb-4 mb-4"><span>App Development</span></div>
             <div className="grid grid-cols-2 border-b border-black/20 pb-4 mb-4"><span>Ongoing Evolution</span></div>
           </Reveal>
        </div>

        {/* Statistik */}
        <div className="w-full relative border-y border-black py-16 flex flex-col md:flex-row justify-between items-end mb-32 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-px bg-black/30 -z-10" />

          <Reveal delay={0} className="flex flex-col mb-12 md:mb-0 bg-[#cec9c0] px-4">
            <span className="text-6xl md:text-[5rem] tracking-tighter font-medium">80</span>
            <span className="text-xs uppercase font-mono tracking-widest mt-2">Projects</span>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col mb-8 md:mb-0 bg-[#cec9c0] px-4 pb-12">
            <span className="text-6xl md:text-[5rem] tracking-tighter font-medium">2+</span>
            <span className="text-xs uppercase font-mono tracking-widest mt-2">Years</span>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col bg-[#cec9c0] px-4 pt-12 border-t border-black">
            <span className="text-6xl md:text-[5rem] tracking-tighter font-medium">5+</span>
            <span className="text-xs uppercase font-mono tracking-widest mt-2">Clients</span>
          </Reveal>
        </div>

        {/* Grid Tim */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-2">
             <span className="text-[10px] leading-none mt-2 block">■ TEAM</span>
          </div>
          <Reveal className="col-span-1 md:col-span-10">
            <h2 className="text-3xl md:text-[3rem] font-medium tracking-tight leading-[1.05] mb-12">
              We're a small but passionate team dedicated to crafting digital products that make a difference. Every project is an opportunity to push boundaries and deliver quality.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'AL FURQAN', role: 'Backend Developer' },
                { name: 'AHMAD KUSYAIRI', role: 'UI/UX Designer' },
                { name: 'MUH. FADHIL', role: 'Mobile Developer' },
                { name: 'MUH. ALGHIFARI', role: 'Full Stack Developer' },
                { name: 'IKSAL AL FARISI', role: 'Frontend Developer' },
              ].map((member, i) => (
                <div key={member.name} className="flex flex-col gap-2">
                  <div className="w-full aspect-3/4 bg-neutral-400 grayscale hover:grayscale-0 transition-all duration-500 bg-cover bg-center" style={{ backgroundImage: `url(/images/team-${i + 1}.jpg)` }} />
                  <span className="text-xs font-mono uppercase tracking-wide">{member.name}</span>
                  <span className="text-[9px] font-mono text-black/50">{member.role}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEKSI 3: PARALLAX PUZZLE BOX                                     */}
      {/* ============================================================== */}
      <section ref={puzzleRef} className="relative w-full h-[200vh] bg-[#cec9c0]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          <div
            className="absolute inset-0 w-full h-full -z-10 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/puzzle-bg.jpg)',
              backgroundAttachment: 'fixed',
            }}
          />

          <div className="relative w-[85%] max-w-[400px] aspect-square bg-[#cec9c0] p-8 flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-black" />
            <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-black" />
            <div className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-black" />
            <div className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-black" />

            <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              The key to pivotal<br />work? Good company.
            </h3>
            <div className="text-[10px] font-mono uppercase tracking-widest cursor-pointer hover:italic transition-all">
              [ ] See our clients
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SEKSI 4: GIANT ACCORDION (PHILOSOPHY LIST)                      */}
      {/* ============================================================== */}
      <section className="relative w-full bg-[#cec9c0] px-6 md:px-12 py-24 md:py-48 z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full relative">

          <div className="hidden md:block md:col-span-4 relative h-full">
            <div className="sticky top-30 flex gap-3 text-xs md:text-sm font-medium uppercase tracking-wide">
              <span className="text-[10px] leading-none mt-1">■</span>
              <span>{PHILOSOPHY_DATA[activePhilosophy].title}</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-8 flex flex-col">
            {PHILOSOPHY_DATA.map((item, index) => {
              const isActive = activePhilosophy === index;

              return (
                <div key={item.id} className="w-full flex flex-col border-t border-black">
                  <button
                    onClick={() => setActivePhilosophy(index)}
                    className="w-full text-left py-8 md:py-12 flex justify-between items-center group cursor-pointer"
                  >
                    <h3 className="text-4xl md:text-[4.5rem] tracking-tighter font-medium leading-none group-hover:opacity-60 transition-opacity">
                      {item.title}
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
                            {item.content.substring(0, Math.floor(item.content.length / 2))}
                          </p>
                          <p className="text-base md:text-lg font-medium leading-relaxed max-w-lg">
                            {item.content.substring(Math.floor(item.content.length / 2))}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className="border-t border-black w-full" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
