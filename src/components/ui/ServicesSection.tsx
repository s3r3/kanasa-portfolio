'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MAIN_NODES, BG_LINES } from '@/constants';
import { SPRING } from '@/lib/animations';
import Link from 'next/link';
import { useI18nStore } from '@/store/useI18n';

export default function ServicesSection() {
  const { t } = useI18nStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const moveX = useTransform(mouseX, [-1, 1], [-40, 40]);
  const moveY = useTransform(mouseY, [-1, 1], [-40, 40]);
  const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  const smoothX = useSpring(moveX, SPRING.tilt);
  const smoothY = useSpring(moveY, SPRING.tilt);
  const smoothRotateX = useSpring(rotateX, SPRING.tilt);
  const smoothRotateY = useSpring(rotateY, SPRING.tilt);

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="services"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1000 }}
      className="relative w-full bg-[#cec9c0] text-black overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full relative z-20 pointer-events-none">
          <div className="col-span-1 md:col-span-3 lg:col-span-4 relative h-full">
            <div className="sticky top-[120px] flex items-center gap-3 text-xs md:text-sm font-medium uppercase tracking-wide">
              <span className="text-[10px] leading-none">■</span> {t('srvSection.label')}
            </div>
          </div>
          <div className="col-span-1 md:col-span-9 lg:col-span-8 flex flex-col items-start gap-8 pointer-events-auto">
            <h2 className="text-4xl md:text-[3.25rem] font-medium tracking-tight leading-[1.1] max-w-4xl">
              {t('srvSection.title').split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            </h2>
            <Link
              href="/services"
              className="border border-black px-4 py-2 text-xs md:text-sm font-medium uppercase tracking-wider hover:bg-black hover:text-[#cec9c0] transition-colors cursor-pointer"
            >
              {t('srvSection.link')}
            </Link>
          </div>
        </div>

        {/* Spider area — isolated from header */}
        <div className="relative mt-24 lg:mt-32 h-[700px] max-sm:h-[500px] md:h-[850px] overflow-hidden">
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
            }}
            animate={{
              rotate: [0, 2, -1, 0],
              scale: [1, 1.02, 0.99, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-full w-full max-w-[1400px] mx-auto transform-gpu"
          >
            {/* SVG lines */}
            <svg className="absolute inset-0 w-full h-full overflow-visible">
              <rect x="49.5%" y="49.5%" width="1%" height="1%" fill="black" />
              {BG_LINES.map((line, idx) => (
                <line
                  key={`bg-line-${idx}`}
                  x1="50%" y1="50%"
                  x2={`${line.x}%`} y2={`${line.y}%`}
                  stroke="rgba(0,0,0,0.12)" strokeWidth="1"
                />
              ))}
              {BG_LINES.map((line, idx) => (
                <circle
                  key={`bg-dot-${idx}`}
                  cx={`${line.x}%`} cy={`${line.y}%`}
                  r="1.5" fill="rgba(0,0,0,0.12)"
                />
              ))}
              {MAIN_NODES.map((node) => (
                <line
                  key={`main-line-${node.id}`}
                  x1="50%" y1="50%"
                  x2={`${node.x}%`} y2={`${node.y}%`}
                  stroke="black" strokeWidth="1.5"
                />
              ))}
            </svg>

            {/* Node labels */}
            {MAIN_NODES.map((node) => (
              <div
                key={`label-${node.id}`}
                className="absolute flex flex-col items-center justify-center gap-2"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="w-16 h-24 md:w-24 md:h-32 bg-contain bg-center bg-no-repeat absolute -top-24 md:-top-32"
                  style={{ backgroundImage: `url(${node.image})` }}
                />
                <div className="flex items-center gap-2 whitespace-nowrap bg-[#cec9c0]/90 backdrop-blur-sm px-1">
                  <span className="text-[10px] leading-none">■</span>
                  <span className="text-sm font-medium tracking-wide uppercase">{node.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
