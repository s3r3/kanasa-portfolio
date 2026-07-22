'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import Link from 'next/link';
import { FEATURED_PROJECTS } from '@/constants';
import { EASE } from '@/lib/animations';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LangToggle from '@/components/ui/LangToggle';
import { useI18nStore } from '@/store/useI18n';

const NAV_ITEMS = ['WORK', 'ABOUT', 'SERVICES', 'CAREERS'] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleContact } = useUIStore();
  const { t } = useI18nStore();

  // Deteksi event scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
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
            onClick={() => setMobileMenuOpen(false)}
            className="uppercase cursor-pointer transition-all duration-200 inline-block"
          >
            {hoveredNav === item || (item === 'WORK' && isWorkMenuOpen) ? `[${t(`nav.${item.toLowerCase()}`)}]` : t(`nav.${item.toLowerCase()}`)}
          </Link>
        </div>
      ))}
    </>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          paddingTop: isScrolled ? '1rem' : '2rem',
          paddingBottom: isScrolled ? '1rem' : '2rem',
          borderBottomColor: isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.6, ease: EASE.smooth }}
        className="fixed top-0 left-0 w-full z-40 bg-bg-accent text-fg px-6 flex items-start justify-between border-b"
      >
        {/* Logo */}
        <motion.div
          layout
          initial={false}
          animate={{
            fontSize: isScrolled ? '3.5rem' : '14rem',
            y: isScrolled ? 0 : -10,
          }}
          transition={{ duration: 0.6, ease: EASE.smooth }}
          className="font-medium leading-[0.75] tracking-tighter -ml-2 z-10 max-sm:!text-[2rem]"
        >
          <Link href="/">KANASA</Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav
          className="relative hidden md:flex items-center space-x-6 text-sm font-medium pt-2"
          onMouseLeave={() => {
            setHoveredNav(null);
            setIsWorkMenuOpen(false);
          }}
        >
          {navLinks}

          {/* Dropdown Mega Menu */}
          <AnimatePresence>
            {isWorkMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
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
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }} className="bg-bg-accent pt-6 flex flex-col">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-[2rem] md:text-[2.25rem] tracking-tight mb-10 text-fg">
                      <div className="hover:italic cursor-pointer transition-all flex items-start">{t('nav.mega.website')}<sup className="text-xs ml-1 mt-1.5 font-sans">7</sup></div>
                      <div className="hover:italic cursor-pointer transition-all flex items-start">{t('nav.mega.mobile')}<sup className="text-xs ml-1 mt-1.5 font-sans">4</sup></div>
                      <div className="hover:italic cursor-pointer transition-all flex items-start">{t('nav.mega.experiential')}<sup className="text-xs ml-1 mt-1.5 font-sans">4</sup></div>
                      <div className="hover:italic cursor-pointer transition-all flex items-start">{t('nav.mega.ecommerce')}<sup className="text-xs ml-1 mt-1.5 font-sans">3</sup></div>
                    </div>
                    <div className="bg-white inline-flex items-center gap-2 px-5 py-3 pr-10 text-[10px] font-bold tracking-widest uppercase relative top-[1px] w-max text-black" style={{ clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0 100%)' }}>
                      <svg width="14" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.22-1.8A2 2 0 0 0 7.53 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
                      {t('nav.mega.featured')}
                    </div>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }} className="bg-white w-full flex flex-col shadow-2xl pb-2">
                    {FEATURED_PROJECTS.map((project) => (
                      <Link href="/work" key={project.id} className="group flex items-start gap-4 p-4 border-t border-fg/10 hover:bg-neutral-50 transition-colors cursor-pointer">
                        <img src={project.image} alt={project.title} className="w-[75px] h-[75px] object-cover bg-neutral-200 shrink-0" />
                        <div className="w-[120px] pt-1">
                          <span className="text-[10px] uppercase font-bold tracking-wide text-black leading-tight block">{project.title}</span>
                        </div>
                        <div className="flex-1 pt-1 px-2">
                          <span className="text-[10px] uppercase leading-[1.6] text-black/80 font-medium line-clamp-3">
                            {project.id === '1' ? t('nav.mega.project.nurquran') : project.id === '2' ? t('nav.mega.project.foodie') : t('nav.mega.project.qitchen')}
                          </span>
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-black pt-1 shrink-0 font-medium">{project.code}</div>
                      </Link>
                    ))}
                    <div className="px-4 pt-4 pb-2">
                      <Link href="/work"><button className="w-full border border-black py-3 text-xs uppercase hover:bg-black hover:text-white text-black transition-colors font-medium tracking-wide">{t('nav.mega.seeAll')}</button></Link>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Right buttons + Hamburger */}
        <div className="flex items-center space-x-2 pt-2 z-50 max-sm:gap-1">
          <button
            onClick={toggleContact}
            className="hidden sm:inline-block border border-fg px-4 py-1.5 text-sm uppercase hover:bg-black hover:text-white transition-colors max-sm:px-2 max-sm:py-1 max-sm:text-[10px]"
          >
            {t('nav.contact')}
          </button>
          <LangToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border border-fg px-2 py-1.5 text-sm"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: EASE.smooth }}
              className="fixed top-0 right-0 z-40 h-full w-[280px] bg-bg-accent text-fg border-l border-fg/10 shadow-2xl md:hidden pt-24 px-6"
            >
              <div className="flex flex-col gap-4 text-lg font-medium uppercase tracking-wide">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:opacity-60 transition-opacity"
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </Link>
                ))}
                <hr className="border-fg/20 my-2" />
                <button
                  onClick={() => { toggleContact(); setMobileMenuOpen(false); }}
                  className="border border-fg px-4 py-2 text-sm uppercase hover:bg-black hover:text-white transition-colors text-left"
                >
                  {t('nav.contact')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
