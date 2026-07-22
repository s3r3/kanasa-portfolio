"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { SLIDER_PROJECT } from "@/constants";
import { EASE as EASE_SHARED } from "@/lib/animations";
import { useI18nStore } from "@/store/useI18n";

const EASE = EASE_SHARED.smooth;

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isHovering, setIsHovering] = useState(false);
  const { images, slides, codes } = SLIDER_PROJECT;

  const { t } = useI18nStore();

  // Kursor Kustom
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Auto-Slide
  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
    // images.length stable (from constant)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);

  const handlePointerMove = (e: React.PointerEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Film strip: slide aktif di tengah, bergeser terus
  const visibleSlides = [
    (currentIndex + images.length - 2) % images.length,
    (currentIndex + images.length - 1) % images.length,
    currentIndex,
    (currentIndex + 1) % images.length,
    (currentIndex + 2) % images.length,
  ];

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-bg text-fg">
      {/* Kursor Kustom (tengah gambar saat hover) */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-50 pointer-events-none flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white px-4 py-2 text-[10px] tracking-[0.2em] uppercase"
      >
        {t('slider.viewCase')}
      </motion.div>

      {/* Area Gambar Utama — margin kiri-kanan lega, gambar ke kanan */}
      <div
        className="relative flex flex-1 items-center justify-center max-sm:px-4 px-24 pt-16 pb-20 cursor-none"
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onPointerMove={handlePointerMove}
        onClick={nextSlide}
      >
        <AnimatePresence mode="wait">
          <Link href={`/work`}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative w-[55vw] max-w-[1100px] max-sm:w-[85vw] aspect-[16/10] overflow-hidden bg-neutral-200 border border-fg/10 cursor-pointer"
          >
            {/* Nomor project kiri atas */}
            <div className="absolute left-5 top-5 z-10 text-[15px] tracking-[0.15em] font-mono text-fg/70">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
              <div className="w-full h-full border border-fg/5 flex items-center justify-center text-fg/30">
                Slide {currentIndex + 1} Main Image
              </div>
            </div>
          </motion.div>
          </Link>
        </AnimatePresence>
      </div>

      {/* Layout Bawah Editorial */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-end max-sm:grid-cols-1 max-sm:gap-2 max-sm:text-center px-10 pb-14">
        {/* Kiri: Judul */}
        <div className="text-[54px] leading-none tracking-[-0.04em] font-medium max-sm:text-[28px]">
          {slides[currentIndex]?.title || SLIDER_PROJECT.title}
        </div>

        {/* Tengah: Thumbnail Navigasi (naik 40px) */}
        <div className="flex flex-col items-center relative max-sm:mt-0 -mt-10">
          {/* Garis tipis 160px lebih transparan */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-px bg-black/15" />

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="font-mono text-[12px] tracking-[0.25em] hover:opacity-60 transition-opacity"
            >
              &lt;
            </button>

            {/* Film strip dengan border-x */}
            <div className="flex overflow-hidden border-x border-fg/20">
              {visibleSlides.map((idx) => {
                const isActive = idx === currentIndex;

                return (
                  <motion.div
                    layout
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    className={`relative w-[92px] h-[58px] max-sm:w-[60px] max-sm:h-[38px] transition-all duration-500 cursor-none ${
                      isActive
                        ? "brightness-100 scale-100"
                        : "brightness-[.7] scale-95 hover:brightness-100"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center bg-neutral-300"
                      style={{ backgroundImage: `url(${images[idx]})` }}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="active-frame"
                        className="absolute inset-[-6px] border border-fg pointer-events-none"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              className="font-mono text-[12px] tracking-[0.25em] hover:opacity-60 transition-opacity"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Kanan: Kode */}
        <div className="text-right text-[44px] max-sm:text-[20px] tracking-[-0.05em] font-light">
          {codes[currentIndex] || SLIDER_PROJECT.code}
        </div>
      </div>
    </section>
  );
}
