'use client';

import { motion } from 'framer-motion';
import ServicesSection from '@/components/ui/ServicesSection';
import Reveal from '@/components/ui/Reveal';
import Footer from '@/components/layout/Footer';

const SERVICE_LIST = [
  { title: 'Strategy', desc: 'Digital strategy, brand positioning, go-to-market planning, and innovation workshops.' },
  { title: 'UI / UX Design', desc: 'User research, wireframing, prototyping, visual design, and design systems.' },
  { title: 'Web Development', desc: 'Front-end, back-end, CMS integration, e-commerce, and performance optimization.' },
  { title: 'App Development', desc: 'Native iOS/Android, cross-platform, MVP builds, and app store launch support.' },
  { title: 'Ongoing Evolution', desc: 'Analytics, A/B testing, maintenance, and continuous product improvement.' },
];

export default function ServicesPage() {
  return (
    <main className="relative bg-[#cec9c0] text-black min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="pt-48 pb-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-6" />
          <Reveal className="md:col-span-6">
            <span className="text-xs font-mono uppercase tracking-widest text-black/40 mb-4 block">What We Do</span>
            <h1 className="text-5xl md:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-6">
              At the intersection of strategy and business, tech and design.
            </h1>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-black/70 max-w-xl">
              We help businesses navigate the digital-first economy with quick wins and long games.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-[120px] flex items-center gap-3 text-xs md:text-sm font-medium uppercase tracking-wide">
              <span className="text-[10px] leading-none">■</span> Capabilities
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-16">
            {SERVICE_LIST.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.05}>
                <div className="border-t border-black/20 pt-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-black/30 shrink-0 w-8">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">{svc.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-black/60 max-w-lg">{svc.desc}</p>
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
            { value: '80', label: 'Projects Delivered' },
            { value: '40+', label: 'Team Members' },
            { value: '150', label: 'Awards' },
            { value: '200+', label: 'Happy Clients' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl md:text-7xl font-medium tracking-tighter">{s.value}</span>
                <span className="text-xs uppercase font-mono tracking-wide text-black/50 mt-2">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
