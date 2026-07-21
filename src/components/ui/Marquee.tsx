'use client';

import { motion } from 'framer-motion';

// ponytail: single-direction marquee, multi-direction when needed
export default function Marquee({
  children,
  speed = 30,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className || ''}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="inline-flex"
      >
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}
