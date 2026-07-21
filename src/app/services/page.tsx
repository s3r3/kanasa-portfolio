'use client';

import { motion } from 'framer-motion';
import ServicesSection from '@/components/ui/ServicesSection';
import Reveal from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';
import Footer from '@/components/layout/Footer';
import { useI18nStore } from '@/store/useI18n';

const SERVICE_KEYS = ['strategy', 'uiux', 'webdev', 'appdev', 'evolution'] as const;

export default function ServicesPage() {
  const { t } = useI18nStore();
  return (
    <main className="relative bg-bg-accent text-fg min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="pt-48 pb-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-6" />
          <Reveal className="md:col-span-6">
            <span className="text-xs font-mono uppercase tracking-widest text-fg/40 mb-4 block">{t('services.whatWeDo')}</span>
            <Typewriter
              text={t('services.typewriter')}
              speed={50}
              className="text-5xl md:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-6 block"
            />
            <p className="text-lg md:text-xl font-medium leading-relaxed text-fg/70 max-w-xl">
              {t('services.hero.desc')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-fg/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-[120px] flex items-center gap-3 text-xs md:text-sm font-medium uppercase tracking-wide">
              <span className="text-[10px] leading-none">■</span> {t('services.capabilities')}
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-16">
            {SERVICE_KEYS.map((k, i) => (
              <Reveal key={k} delay={i * 0.05}>
                <div className="border-t border-fg/20 pt-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-fg/30 shrink-0 w-8">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">{t(`services.${k}`)}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-fg/60 max-w-lg">{t(`services.${k}.desc`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reuse ServicesSection (interactive SVG) */}
      <ServicesSection />

      {/* Stats */}
      <section className="px-6 md:px-12 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: t('services.projectsDelivered') },
            { value: '5', label: t('services.technologies') },
            { value: '2+', label: t('services.yearsExperience') },
            { value: '5+', label: t('services.happyClients') },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl md:text-7xl font-medium tracking-tighter">{s.value}</span>
                <span className="text-xs uppercase font-mono tracking-wide text-fg/50 mt-2">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
