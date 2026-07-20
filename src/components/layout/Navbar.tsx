'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import Link from 'next/link';
import { FEATURED_PROJECTS } from '@/constants';

const NAV_ITEMS = ['WORK', 'ABOUT', 'SERVICES', 'CAREERS'];

// Custom ease untuk transisi premium ala situs Awwwards
const smoothEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

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
      transition={{ duration: 0.6, ease: smoothEase }}
      className="fixed top-0 left-0 w-full z-40 bg-[#cec9c0] text-black px-6 flex items-center justify-between border-b"
    >
      {/* Bagian Kiri: Logo Animasi (Besar -> Kecil) */}
      <motion.div
        layout
        initial={false}
        animate={{
          fontSize: isScrolled ? '3.5rem' : '14rem',
          y: isScrolled ? 0 : -10, // Sedikit penyesuaian posisi saat besar
        }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="font-medium leading-[0.75] tracking-tighter -ml-2 z-10"
      >
        <Link href="/">REF</Link>
      </motion.div>

      {/* Bagian Tengah: Menu Navigasi */}
      <nav
        className="flex items-center space-x-6 text-sm font-medium"
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
            className="relative py-2" // Area hover lebih luas
          >
            <Link
              href={`#${item.toLowerCase()}`}
              className="uppercase cursor-pointer transition-all duration-200"
            >
              {hoveredNav === item ? `[${item}]` : item}
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
              className="absolute top-full right-0 mt-4 w-[90vw] md:w-[800px] shadow-2xl flex flex-col z-50"
              onMouseEnter={() => setIsWorkMenuOpen(true)}
            >
              {/* ... Kode isi Mega Menu (WORK) tidak berubah ... */}
              {/* Gunakan kode Mega Menu dari tahap sebelumnya di sini */}
              <div className="bg-[#cec9c0] pt-6 pl-6 pr-6 flex flex-col">
                <div className="grid grid-cols-2 gap-y-1 gap-x-12 text-4xl md:text-[2.75rem] tracking-tight mb-8">
                  <div className="hover:italic cursor-pointer transition-all">Website<sup className="text-sm ml-1 font-sans">7</sup></div>
                  <div className="hover:italic cursor-pointer transition-all">Mobile App<sup className="text-sm ml-1 font-sans">4</sup></div>
                  <div className="hover:italic cursor-pointer transition-all">Experiential<sup className="text-sm ml-1 font-sans">4</sup></div>
                  <div className="hover:italic cursor-pointer transition-all">E-commerce<sup className="text-sm ml-1 font-sans">3</sup></div>
                </div>
                <div className="bg-white inline-flex items-center gap-2 px-4 py-3 text-xs font-medium border-t border-l border-r border-black/10 rounded-t-md relative top-[1px] w-max">
                  <svg width="14" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.22-1.8A2 2 0 0 0 7.53 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
                  FEATURED PROJECTS
                </div>
              </div>

              <div className="bg-white w-full border-t border-black/10 flex flex-col">
                {FEATURED_PROJECTS.map((project) => (
                  <div key={project.id} className="group flex items-center justify-between p-4 border-b border-black/10 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4 w-1/4">
                      <div className="w-24 h-24 bg-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${project.image})` }} />
                      <span className="text-sm uppercase font-medium mt-1">{project.title}</span>
                    </div>
                    <div className="flex-1 px-8 max-w-sm">
                      <p className="text-xs uppercase leading-relaxed text-black">{project.description}</p>
                    </div>
                    <div className="text-xs uppercase whitespace-nowrap mt-1 self-start">{project.code}</div>
                  </div>
                ))}
                <div className="p-4">
                  <button className="w-full border border-black py-3 text-sm uppercase hover:bg-black hover:text-white transition-colors">
                    See All Work [17]
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Bagian Kanan: Action Buttons (Contact & Accessibility) */}
      <div className="flex items-center space-x-2">
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
