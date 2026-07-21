'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { AccessibilityIcon } from '@/components/ui/icons';
import { EASE } from '@/lib/animations';

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM', url: 'https://instagram.com' },
  { label: 'LINKEDIN', url: 'https://linkedin.com' },
  { label: 'BLUESKY', url: 'https://bsky.app' },
  { label: 'AWWWARDS', url: 'https://awwwards.com' },
];

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.smooth } },
};

export default function ContactOverlay() {
  const { isContactOpen, closeContact } = useUIStore();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isContactOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContact}
            className="fixed inset-0 z-[45] bg-transparent cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: EASE.smooth, duration: 0.6 }}
            className="fixed top-0 right-0 w-full md:w-[750px] h-auto z-50 bg-[#cec9c0] text-black border-l border-b border-black/10 shadow-2xl overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
              }}
              className="p-8 md:p-10 flex flex-col"
            >
              <motion.div variants={staggerItem} className="flex justify-between items-start mb-6">
                <h2 className="text-4xl md:text-[3.25rem] tracking-tight leading-[1.05] font-medium text-black">
                  Get in touch.<br />And let&rsquo;s get to work.
                </h2>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <button onClick={closeContact} className="bg-black text-white px-3 py-1.5 text-xs font-mono uppercase flex items-center hover:bg-black/80 transition-colors tracking-widest">CLOSE[x]</button>
                  <button className="border border-black px-3 py-1.5 text-sm hover:bg-black hover:text-white transition-colors flex items-center justify-center"><span className="sr-only">Accessibility</span><AccessibilityIcon /></button>
                </div>
              </motion.div>
              <motion.p variants={staggerItem} className="text-sm font-medium mb-12 max-w-sm leading-relaxed text-black/90">
                If you have a project in mind, we&rsquo;d love to hear about it.<br />We typically respond within 5 business days.
              </motion.p>
              <motion.div variants={staggerItem} className="border-t border-black/10 py-6">
                <div className="grid grid-cols-[120px_1fr_1.5fr] gap-6">
                  <div className="relative w-[120px] h-[120px] bg-gray-400 grayscale bg-cover bg-center shadow-inner" style={{ backgroundImage: 'url(/images/julie.jpg)' }} >
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                  </div>
                  <div className="uppercase text-[11px] font-mono tracking-wide pt-1">Julie Pilon</div>
                  <div className="uppercase text-[11px] font-mono tracking-wide flex flex-col justify-between pt-1">
                    <div>
                      <p className="mb-1">Partner, President</p>
                      <a href="mailto:dvlp@ref.digital" className="underline decoration-1 underline-offset-4 hover:italic transition-all">dvlp@ref.digital</a>
                    </div>
                    <div className="mt-auto">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all cursor-pointer inline-block">[ ] SEE LINKEDIN PROFILE</a>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="border-t border-black/10 pt-6">
                <div className="grid grid-cols-2 gap-8 text-[11px] font-mono uppercase tracking-wide">
                  <div className="flex flex-col gap-2">
                    {SOCIAL_LINKS.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredSocial(s.label)} onMouseLeave={() => setHoveredSocial(null)} className="cursor-pointer hover:italic transition-all inline-block w-max">
                        [{hoveredSocial === s.label ? '→' : ' '}] {s.label}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-8"><span className="w-4">A</span><p className="leading-relaxed">4051 MOLSON STREET<br />SUITE 100, MONTREAL, QC, H1Y 3L1</p></div>
                    <div className="flex items-start gap-8"><span className="w-4">P</span><p>+1 514 281-8901</p></div>
                    <div className="flex items-start gap-8"><span className="w-4">E</span><a href="mailto:info@ref.digital" className="underline decoration-1 underline-offset-4 hover:italic transition-all">INFO@REF.DIGITAL</a></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
