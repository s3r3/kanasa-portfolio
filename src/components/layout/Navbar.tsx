'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import Link from 'next/link';
import { FEATURED_PROJECTS } from '@/constants';
import { EASE } from '@/lib/animations';

const NAV_ITEMS = ['WORK', 'ABOUT', 'SERVICES', 'CAREERS'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const { toggleContact } = useUIStore();

  // Deteksi event scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 50px, aktifkan mode minimized
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Cek saat mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: isScrolled ? '1rem' : '2rem',
        paddingBottom: isScrolled ? '1rem' : '2rem',
        borderBottomColor: isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.6, ease: EASE.smooth }}
      className="fixed top-0 left-0 w-full z-40 bg-[#cec9c0] text-black px-6 flex items-start justify-between border-b"
    >
      {/* Bagian Kiri: Logo Animasi (Besar -> Kecil) */}
      <motion.div
        layout
        initial={false}
        animate={{
          fontSize: isScrolled ? '3.5rem' : '14rem',
          y: isScrolled ? 0 : -10,
        }}
        transition={{ duration: 0.6, ease: EASE.smooth }}
        className="font-medium leading-[0.75] tracking-tighter -ml-2 z-10"
      >
        <Link href="/">KANASA</Link>
      </motion.div>

      {/* Bagian Tengah: Menu Navigasi (Dibuat relative agar dropdown menempel di sini) */}
      <nav
        className="relative flex items-center space-x-6 text-sm font-medium pt-2"
        onMouseLeave={() => {
          setHoveredNav(null);
          setIsWorkMenuOpen(false);
        }}
      >
        {NAV_ITEMS.map((item) => (
          <div
            key={item}
            onMouseEnter={() => {
              setHoveredNav(item);
              if (item === 'WORK') setIsWorkMenuOpen(true);
            }}
            className="relative py-2 z-50"
          >
            <Link
              href={`/${item.toLowerCase()}`}
              className="uppercase cursor-pointer transition-all duration-200 inline-block"
            >
              {hoveredNav === item || (item === 'WORK' && isWorkMenuOpen) ? `[${item}]` : item}
            </Link>
          </div>
        ))}

        {/* Dropdown Mega Menu (Hanya untuk WORK) */}
        <AnimatePresence>
          {isWorkMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              // [REVISI]: Lebar disesuaikan menjadi max 700px agar bertindak seperti overlay yang proporsional
              className="absolute top-full left-0 mt-2 w-[90vw] md:w-[650px] lg:w-[700px] flex flex-col z-40"
              onMouseEnter={() => setIsWorkMenuOpen(true)}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }} className="bg-[#cec9c0] pt-6 flex flex-col">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-[2rem] md:text-[2.25rem] tracking-tight mb-10 text-black">
                    <div className="hover:italic cursor-pointer transition-all flex items-start">Website<sup className="text-xs ml-1 mt-1.5 font-sans">7</sup></div>
                    <div className="hover:italic cursor-pointer transition-all flex items-start">Mobile App<sup className="text-xs ml-1 mt-1.5 font-sans">4</sup></div>
                    <div className="hover:italic cursor-pointer transition-all flex items-start">Experiential<sup className="text-xs ml-1 mt-1.5 font-sans">4</sup></div>
                    <div className="hover:italic cursor-pointer transition-all flex items-start">E-commerce<sup className="text-xs ml-1 mt-1.5 font-sans">3</sup></div>
                  </div>
                  <div className="bg-white inline-flex items-center gap-2 px-5 py-3 pr-10 text-[10px] font-bold tracking-widest uppercase relative top-[1px] w-max text-black" style={{ clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0 100%)' }}>
                    <svg width="14" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.22-1.8A2 2 0 0 0 7.53 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
                    FEATURED PROJECTS
                  </div>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }} className="bg-white w-full flex flex-col shadow-2xl pb-2">
                  {FEATURED_PROJECTS.map((project) => (
                    <div key={project.id} className="group flex items-start gap-4 p-4 border-t border-black/10 hover:bg-neutral-50 transition-colors cursor-pointer">
                      <img src={project.image} alt={project.title} className="w-[75px] h-[75px] object-cover bg-neutral-200 shrink-0" />
                      <div className="w-[120px] pt-1">
                        <span className="text-[10px] uppercase font-bold tracking-wide text-black leading-tight block">{project.title}</span>
                      </div>
                      <div className="flex-1 pt-1 px-2">
                        <span className="text-[10px] uppercase leading-[1.6] text-black/80 font-medium line-clamp-3">{project.description}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-wide text-black pt-1 shrink-0 font-medium">{project.code}</div>
                    </div>
                  ))}
                  <div className="px-4 pt-4 pb-2">
                    <button className="w-full border border-black py-3 text-xs uppercase hover:bg-black hover:text-white transition-colors font-medium tracking-wide">SEE ALL WORK [17]</button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Bagian Kanan: Action Buttons (Contact & Accessibility) */}
      <div className="flex items-center space-x-2 pt-2 z-50">
        <button
          onClick={toggleContact}
          className="border border-black px-4 py-1.5 text-sm uppercase hover:bg-black hover:text-white transition-colors"
        >
          Contact
        </button>
        <button className="border border-black px-3 py-1.5 text-sm hover:bg-black hover:text-white transition-colors flex items-center justify-center">
          <span className="sr-only">Accessibility</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="4" r="2"></circle>
            <path d="M12 7v7M8 10h8M10 21l2-7 2 7"></path>
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
