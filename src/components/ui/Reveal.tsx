'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/animations';

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.reveal } },
};

// ponytail: stagger via implicit children mapping. explicit variants when complexity grows.
export default function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}) {
  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        }}
        className={className}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={staggerItem}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: EASE.reveal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
