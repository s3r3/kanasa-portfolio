'use client';

import { useEffect, useRef, useState } from 'react';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import { useScrollStore } from '@/store/useScrollStore';
import { useI18nStore } from '@/store/useI18n';

interface MetadataItem {
  label: string;
  value: string;
}

interface AccordionItem {
  id: string;
  shortTitle: string;
  longTitle: string;
  description: string;
  image: string;
}

interface WorkDetailData {
  hero: {
    headline: string;
    metadata: MetadataItem[];
    image: string;
  };
  brief: {
    text: string;
    solution: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  accordion: AccordionItem[];
  startBg: string;
}

/* ponytail: minimal lerp — no dependency added */
function lerpColor(a: string, b: string, t: number): string {
  const pa = a.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const pb = b.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const rr = pa.map((c, i) => Math.round(c + (pb[i] - c) * t));
  return `rgb(${rr[0]},${rr[1]},${rr[2]})`;
}

export default function WorkDetailTemplate({ data }: { data: WorkDetailData }) {
  const { t } = useI18nStore();
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  // ponytail: counter as force-update — only fires on actual activeIndex change (3-4× per page)
  const [, bump] = useState(0);
  // store activeIndex in state so the render cycle picks it up for the sticky nav
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = (el: HTMLDivElement, scrollY: number) => {
      const t = Math.min(1, Math.max(0, (scrollY - 300) / 400));
      el.style.backgroundColor = lerpColor(data.startBg, '#ffffff', t);
      el.style.color = t < 0.5 ? '#ffffff' : '#000000';
    };

    update(mainRef.current!, 0);

    const unsub = useScrollStore.subscribe(({ scrollY }) => {
      const el = mainRef.current;
      if (!el) return;

      // 1. Direct DOM color update — no React re-render
      update(el, scrollY);

      // 2. Accordion tracking — only setState on actual change
      const refs = sectionRefs.current;
      if (!refs.length) return;
      const viewMid = window.innerHeight * 0.4;
      let closest = 0;
      let best = Infinity;
      refs.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height * 0.5 - viewMid);
        if (dist < best) {
          best = dist;
          closest = i;
        }
      });
      if (closest !== activeRef.current) {
        activeRef.current = closest;
        setActiveIndex(closest);
        bump((n) => n + 1);
      }
    });
    return unsub;
    // ponytail: empty deps — data.startBg stable per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-[#04142b] text-white"
    >
      {/* --- 1. HERO --- */}
      <section className="max-sm:pt-32 pt-72 pb-12 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-6" />
          <div className="col-span-1 md:col-span-6">
            <h1 className="text-5xl max-sm:text-[2rem] md:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-12">
              {data.hero.headline}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-white/20 text-[10px] md:text-xs uppercase font-mono tracking-wide">
          {data.hero.metadata.map((m) => (
            <div key={m.label}>
              <span className="opacity-50">{m.label}</span>{' '}
              <br className="md:hidden" /> {m.value}
            </div>
          ))}
        </div>

        <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-800 relative mt-4 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.hero.image})` }}
          />
        </div>
      </section>

      {/* --- 2. STATS & BRIEF --- */}
      <section className="px-6 md:px-12 max-sm:py-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
          <Reveal className="col-span-1 md:col-span-6 flex flex-col gap-12 max-w-lg">
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wide mb-6">
                {t('workDetail.brief')}
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {data.brief.text}
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wide mb-6">
                {t('workDetail.solution')}
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {data.brief.solution}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-1 md:col-span-5 md:col-start-8 flex flex-col gap-8">
            {data.stats.map((stat, i) => (
              <div key={stat.label} className="border-t border-white/20 pt-4">
                <div className="text-6xl md:text-8xl font-medium tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs uppercase font-mono tracking-wide opacity-70 mt-2">
                  {stat.label}
                </div>
                {i < data.stats.length - 1 ? null : (
                  <div className="border-b border-white/20 pb-8 mt-4" />
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --- 3. SCROLL-LINKED ACCORDION --- */}
      <section className="px-6 md:px-12 max-sm:py-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative">
          <div className="col-span-1 md:col-span-5 relative">
            <div className="sticky max-sm:static top-[120px] flex flex-col w-full pr-8">
              {data.accordion.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    className="border-t border-white/20 flex flex-col py-4"
                  >
                    <div className="grid grid-cols-[30px_1fr] items-start text-xs md:text-sm uppercase font-mono tracking-wide cursor-pointer">
                      <span
                        className={
                          isActive ? 'opacity-100 font-bold' : 'opacity-50'
                        }
                      >
                        {item.id}
                      </span>
                      <span
                        className={
                          isActive ? 'opacity-100 font-bold' : 'opacity-50'
                        }
                      >
                        {item.shortTitle}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] max-sm:!h-auto ${
                        isActive ? 'mt-8 opacity-100' : 'max-sm:mt-4 max-sm:opacity-100 mt-0 opacity-0'
                      }`}
                      style={{ height: isActive ? 'auto' : '0px' }}
                    >
                      <h4 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                        {item.longTitle}
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed opacity-80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-white/20 w-full mt-0" />
            </div>
          </div>

          <div className="col-span-1 md:col-span-7 flex flex-col mt-12 md:mt-0">
            {data.accordion.map((item, index) => (
              <div
                key={`img-${item.id}`}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="w-full max-sm:min-h-[50vh] min-h-[90vh] flex flex-col items-center justify-center relative snap-start"
              >
                <div className="w-full bg-black/5 p-4 md:p-8">
                  <div className="relative w-full pt-[75%] bg-neutral-200 shadow-xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
