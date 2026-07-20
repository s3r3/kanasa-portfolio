"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { SLIDER_PROJECT } from "@/constants";

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isHovering, setIsHovering] = useState(false);
  const images = SLIDER_PROJECT.images;

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
    <section className="relative h-screen w-full overflow-hidden bg-[#efeee8] text-black">
      {/* Kursor Kustom (tengah gambar saat hover) */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-50 pointer-events-none flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white px-4 py-2 text-[10px] tracking-[0.2em] uppercase"
      >
        View Case
      </motion.div>

      {/* Area Gambar Utama — margin kiri-kanan lega, gambar ke kanan */}
      <div
        className="relative flex flex-1 items-center justify-center px-24 pt-16 pb-20 cursor-none"
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onPointerMove={handlePointerMove}
        onClick={nextSlide}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative w-[55vw] max-w-[1100px] aspect-[16/10] overflow-hidden bg-neutral-200 border border-black/10"
          >
            {/* Nomor project kiri atas */}
            <div className="absolute left-5 top-5 z-10 text-[15px] tracking-[0.15em] font-mono text-black/70">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
              <div className="w-full h-full border border-black/5 flex items-center justify-center text-black/30">
                Slide {currentIndex + 1} Main Image
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Layout Bawah Editorial */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-end px-10 pb-14">
        {/* Kiri: Judul (naik, lebih ke kiri) */}
        <div className="text-[54px] leading-none tracking-[-0.04em] font-medium">
          {SLIDER_PROJECT.title}
        </div>

        {/* Tengah: Thumbnail Navigasi (naik 40px) */}
        <div className="flex flex-col items-center relative -mt-10">
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
            <div className="flex overflow-hidden border-x border-black/20">
              {visibleSlides.map((idx) => {
                const isActive = idx === currentIndex;

                return (
                  <motion.div
                    layout
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    className={`relative w-[92px] h-[58px] transition-all duration-500 cursor-none ${
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
                        className="absolute inset-[-6px] border border-black pointer-events-none"
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

        {/* Kanan: Kode (44px, lebih ke kanan, tidak simetris) */}
        <div className="text-right text-[44px] tracking-[-0.05em] font-light">
          {SLIDER_PROJECT.code}
        </div>
      </div>
    </section>
  );
}
