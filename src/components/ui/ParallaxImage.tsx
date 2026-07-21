'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ponytail: generic parallax wrapper. speed 0-1. multi-layer support when parallax scenes grow
export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className || ''}`}
      role="img"
      aria-label={alt}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, y }}
      />
    </div>
  );
}
