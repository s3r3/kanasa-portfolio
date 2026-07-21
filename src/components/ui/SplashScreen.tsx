'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/lib/animations';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE.smooth }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#cec9c0]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1, ease: EASE.reveal }}
            className="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none text-black"
          >
            REF
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
