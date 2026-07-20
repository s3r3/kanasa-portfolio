'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { AccessibilityIcon, CloseIcon } from '@/components/ui/icons';

const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com' },
  { label: 'LinkedIn', url: 'https://linkedin.com' },
  { label: 'Bluesky', url: 'https://bsky.app' },
  { label: 'Awwwards', url: 'https://awwwards.com' },
];

export default function ContactOverlay() {
  const { isContactOpen, closeContact } = useUIStore();

  return (
    <AnimatePresence>
      {isContactOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContact}
            className="fixed inset-0 z-45 bg-transparent"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.7 }}
            className="fixed top-0 right-0 w-full md:w-[650px] xl:w-[750px] h-screen z-50 bg-[#cec9c0] text-black border-l border-black/20 flex flex-col overflow-y-auto"
          >
            <div className="p-8 md:p-12 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-5xl md:text-[4.5rem] tracking-tighter leading-[1.05] font-medium">
                  Get in touch.<br />And let&rsquo;s get to work.
                </h2>
                <div className="flex items-center gap-2 mt-2 shrink-0 ml-4">
                  <button
                    onClick={closeContact}
                    className="bg-black text-white px-3 py-1.5 text-sm uppercase flex items-center gap-1 hover:bg-black/80 transition-colors"
                  >
                    CLOSE <CloseIcon className="text-xs font-mono" />
                  </button>
                  <button className="border border-black px-3 py-1.5 text-sm hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                    <span className="sr-only">Accessibility</span>
                    <AccessibilityIcon />
                  </button>
                </div>
              </div>

              <p className="text-lg md:text-xl font-medium mb-16 max-w-md">
                If you have a project in mind, we&rsquo;d love to hear about it.<br />
                We typically respond within 5 business days.
              </p>

              <div className="border-t border-black/20 pt-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-[130px_1fr_1.5fr] gap-6 h-full min-h-[130px]">
                  <div
                    className="w-full aspect-square md:w-[130px] md:h-[130px] bg-gray-400 grayscale bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/julie.jpg)' }}
                  />
                  <div className="uppercase text-sm pt-1">Julie Pilon</div>
                  <div className="uppercase text-sm flex flex-col justify-between pt-1">
                    <div>
                      <p>Partner, President</p>
                      <a href="mailto:dvlp@ref.digital" className="underline decoration-1 underline-offset-4 hover:italic transition-all">
                        dvlp@ref.digital
                      </a>
                    </div>
                    <div className="mt-8 md:mt-auto">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all cursor-pointer">
                        [ ] See LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/20 pt-6 mt-auto">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1.5fr] gap-12 text-sm uppercase">
                  <div className="flex flex-col gap-2.5">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer hover:italic transition-all"
                      >
                        [ ] {s.label}
                      </a>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-[24px_1fr] items-start">
                      <span>A</span>
                      <p className="leading-tight">
                        4051 Molson Street<br />
                        Suite 100, Montreal, QC, H1Y 3L1
                      </p>
                    </div>
                    <div className="grid grid-cols-[24px_1fr] items-start">
                      <span>P</span>
                      <p>+1 514 281-8901</p>
                    </div>
                    <div className="grid grid-cols-[24px_1fr] items-start">
                      <span>E</span>
                      <a href="mailto:info@ref.digital" className="underline decoration-1 underline-offset-4 hover:italic transition-all">
                        info@ref.digital
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
