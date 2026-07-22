'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import Typewriter from '@/components/ui/Typewriter';
import { EASE, SPRING } from '@/lib/animations';
import { useI18nStore } from '@/store/useI18n';

const ALL_WORK_ITEMS = [
  {
    id: 1,
    client: 'NURQURAN',
    desc: 'QURAN READER WITH PRAYER TIMES, FASTING CALENDAR & AUDIO.',
    category: 'MOBILE APP',
    industry: 'ISLAMIC TECHNOLOGY',
    year: '2026',
    refCode: 'KAN-NQA-0426',
    image: '/images/nurquran.jpg',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 2,
    client: 'FOODIE',
    desc: 'FOOD DELIVERY PLATFORM WITH SEAMLESS ORDERING.',
    category: 'WEBSITE',
    industry: 'FOOD & BEVERAGE',
    year: '2026',
    refCode: 'KAN-FDE-0226',
    image: '/images/foodie.jpg',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-square',
  },
  {
    id: 3,
    client: 'QITCHEN',
    desc: 'RESTAURANT MANAGEMENT & RESERVATION SYSTEM.',
    category: 'WEBSITE',
    industry: 'FOOD & BEVERAGE',
    year: '2026',
    refCode: 'KAN-QTC-0726',
    image: '/images/qitchen.jpg',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-square',
  },
  {
    id: 4,
    client: 'VRADA',
    desc: 'E-COMMERCE APP WITH VISUAL SEARCH CAPABILITIES.',
    category: 'MOBILE APP',
    industry: 'RETAIL',
    year: '2026',
    refCode: 'KAN-VRD-0326',
    image: '/images/vrada.jpg',
    colSpan: 'md:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 5,
    client: 'SKILLBRIDGE',
    desc: 'SKILL-BASED JOB MATCHING PLATFORM.',
    category: 'WEBSITE',
    industry: 'EDUCATION & HR',
    year: '2026',
    refCode: 'KAN-SKB-0126',
    image: '/images/skillbridge.jpg',
    colSpan: 'md:col-span-3',
    aspect: 'aspect-square',
  },
  {
    id: 6,
    client: 'SETHMILOT',
    desc: 'PERSONAL BRANDING & PORTFOLIO WEBSITE.',
    category: 'WEBSITE',
    industry: 'CREATIVE SERVICES',
    year: '2026',
    refCode: 'KAN-SMT-0126',
    image: '/images/sethmilot.jpg',
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
  },
];

// ponytail: inline parallax card, now uses ParallaxImage
function WorkCard({
  item,
  index,
  t,
}: {
  item: (typeof ALL_WORK_ITEMS)[0];
  index: number;
  t: (key: string) => string;
}) {
  const slug = item.client.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/work/${slug}`} className={`col-span-1 ${item.colSpan}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.6,
          delay: (index % 3) * 0.1,
          ease: EASE.spring,
        }}
        className="flex flex-col gap-4 group cursor-pointer"
      >
        <div className={`relative w-full overflow-hidden ${item.aspect}`}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: EASE.spring }}
            className="w-full h-full"
          >
            <ParallaxImage src={item.image} alt={item.client} speed={0.15} className="w-full h-full" />
          </motion.div>
        </div>
        <div className="grid grid-cols-2 text-[10px] md:text-xs uppercase font-medium tracking-wide">
          <div className="pr-4">{item.client}</div>
          <div className="flex flex-col text-fg/60">
            <span className="leading-relaxed">{({1:t('work.desc.nurquran'),2:t('work.desc.foodie'),3:t('work.desc.qitchen'),4:t('work.desc.vrada'),5:t('work.desc.skillbridge'),6:t('work.desc.sethmilot')} as Record<number,string>)[item.id]}</span>
            <span className="mt-3 text-fg group-hover:italic transition-all">
              {item.category === 'MOBILE APP' ? t('work.category.mobile') : t('work.category.website')}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function WorkPage() {
  const { t } = useI18nStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <main className="relative bg-bg text-fg min-h-screen">
      {/* --- HERO TEXT --- */}
      <section className="pt-48 pb-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12">
        <div className="hidden md:block md:col-span-6" />
        <Reveal className="md:col-span-6">
          <p className="text-[17px] md:text-[22px] leading-[1.35] tracking-[-0.02em] text-fg/60 mb-8">
            {t('work.hero.desc')}
          </p>
          <Typewriter
            text={t('work.hero.typewriter')}
            speed={50}
            className="text-5xl md:text-[5.5rem] leading-[0.95] tracking-tighter font-medium"
          />
        </Reveal>
      </section>

      {/* --- FILTER BAR + VIEW TOGGLE (fixed — Lenis breaks sticky) --- */}
      <div className="fixed top-20 z-30 w-full bg-bg/90 backdrop-blur-md px-6 md:px-12 py-4 border-b border-fg/20 flex justify-between items-center text-xs md:text-sm font-medium uppercase tracking-wide">
        <div className="flex gap-2">
          <span className="text-[10px] leading-none mt-0.5">■</span>
          <span className="cursor-pointer">
            {t('work.all').replace('{n}', String(ALL_WORK_ITEMS.length))}
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer font-mono">
          <span
            onClick={() => setViewMode('grid')}
            className={`transition-colors ${
              viewMode === 'grid'
                ? 'text-fg'
                : 'text-fg/40 hover:text-fg'
            }`}
          >
            {viewMode === 'grid' ? `[${t('work.grid')}]` : t('work.grid')}
          </span>
          <span
            onClick={() => setViewMode('list')}
            className={`transition-colors ${
              viewMode === 'list'
                ? 'text-fg'
                : 'text-fg/40 hover:text-fg'
            }`}
          >
            {viewMode === 'list' ? `[${t('work.list')}]` : t('work.list')}
          </span>
        </div>
      </div>

      {/* --- KONTEN DINAMIS --- */}
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-12 md:pb-24 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {/* GRID */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-16 md:gap-y-24"
            >
              {ALL_WORK_ITEMS.map((item, index) => (
                <WorkCard key={item.id} item={item} index={index} t={t} />
              ))}
            </motion.div>
          )}

          {/* LIST */}
          {viewMode === 'list' && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col"
            >
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 max-sm:grid-cols-3 border-b border-fg pb-4 text-lg md:text-2xl font-medium tracking-tight mb-4">
                <div className="col-span-1">{t('work.projects')}</div>
                <div className="col-span-1">{t('work.type')}</div>
                <div className="col-span-1">{t('work.industries')}</div>
                <div className="col-span-1 flex items-center gap-2">
                  {t('work.year')} <span className="text-sm">▼</span>
                </div>
                <div className="col-span-1 text-right">{t('work.ref')}</div>
              </div>

              {ALL_WORK_ITEMS.map((item) => (
                <div
                  key={`list-${item.id}`}
                  className="grid grid-cols-5 gap-4 max-sm:grid-cols-3 border-b border-fg/10 py-5 text-xs md:text-sm uppercase font-mono tracking-wide cursor-pointer hover:bg-black/5 transition-colors group"
                >
                  <div className="col-span-1 font-sans font-medium group-hover:italic transition-all">
                    {item.client}
                  </div>
                  <div className="col-span-1 text-fg/70">
                    {item.category === 'MOBILE APP' ? t('work.category.mobile') : t('work.category.website')}
                  </div>
                  <div className="col-span-1 text-fg/70">
                    {({1:t('work.industry.islamic'),2:t('work.industry.fnb'),3:t('work.industry.fnb'),4:t('work.industry.retail'),5:t('work.industry.education'),6:t('work.industry.creative')} as Record<number,string>)[item.id]}
                  </div>
                  <div className="col-span-1 text-fg/70">{item.year}</div>
                  <div className="col-span-1 text-right text-fg/70">
                    {item.refCode}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* --- LOAD MORE --- */}
      <section className="px-6 md:px-12 pb-32 flex justify-start">
        <button className="bg-black text-white px-8 py-3 text-xs uppercase font-medium tracking-wider hover:bg-black/80 transition-colors">
          {t('work.loadMore')}
        </button>
      </section>

      {/* --- ARCHIVE --- */}
      <section className="bg-[#cec9c0] w-full px-6 md:px-12 py-24 flex flex-col gap-12">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide">
          <span className="text-[10px] leading-none">■</span> {t('work.archive')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-video bg-neutral-300 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/wind-turbine.jpg)' }}
            />
          </div>
          <div className="aspect-video bg-neutral-300 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/zen-garden.jpg)' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
