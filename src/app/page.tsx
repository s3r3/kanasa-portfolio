import ProjectSlider from '@/components/ui/ProjectSlider';
import WorkSection from '@/components/ui/WorkSection';
import ServicesSection from '@/components/ui/ServicesSection';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[#efeee8] text-black">
      {/* --- HERO --- */}
      <section className="relative min-h-screen">
        <div className="mx-auto max-w-[1800px] px-8 md:px-12 lg:px-16">
          <div className="h-52 md:h-64" />

          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-5" />

            <div className="col-span-12 lg:col-span-7 flex flex-col justify-end">
              <p className="text-[17px] md:text-[22px] leading-[1.35] tracking-[-0.02em] max-w-xl mb-24 md:mb-36 text-black/90">
                Some say move fast, break things. REF is a digital agency
                <br className="hidden md:block" />
                that believes we&rsquo;ve broken enough things already.
              </p>

              <h1 className="text-[72px] md:text-[120px] lg:text-[170px] xl:text-[190px] leading-[0.86] tracking-[-0.06em] font-medium text-black">
                Move fast, build to last.
              </h1>
            </div>
          </div>

          <div className="h-28" />
        </div>
      </section>

      {/* --- PROJECT SLIDER --- */}
      <ProjectSlider />

      {/* --- WORK --- */}
      <WorkSection />

      {/* --- ABOUT (link to /about) --- */}
      <section
        id="about"
        className="relative w-full px-6 py-32 md:py-40 border-t border-black/10 bg-[#efeee8]"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col gap-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">■ About REF</span>
            <h2 className="text-4xl md:text-[4rem] font-medium tracking-tight leading-[1.05]">
              We help businesses navigate the digital-first
              economy with quick wins and long games.
            </h2>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-black/70 max-w-xl">
              Because it&rsquo;s by doing good that we do well.
            </p>
            <div className="pt-4">
              <a
                href="/about"
                className="inline-block border border-black px-8 py-3 text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-[#efeee8] transition-colors"
              >
                See what REF is all about &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <ServicesSection />

      {/* --- FOOTER --- */}
      <Footer />
    </main>
  );
}
