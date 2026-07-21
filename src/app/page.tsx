import ProjectSlider from '@/components/ui/ProjectSlider';
import WorkSection from '@/components/ui/WorkSection';
import ServicesSection from '@/components/ui/ServicesSection';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';

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
              <Reveal stagger delay={0.2}>
                <p className="text-[17px] md:text-[22px] leading-[1.35] tracking-[-0.02em] max-w-xl mb-24 md:mb-36 text-black/90">
                  Kanasa Creative is a design and technology studio
                  <br className="hidden md:block" />
                  building digital products that matter.
                </p>
                <Typewriter
                  text="Design meets technology."
                  speed={60}
                  className="text-[48px] md:text-[80px] lg:text-[110px] xl:text-[130px] leading-[0.86] tracking-[-0.06em] font-medium text-black"
                />
              </Reveal>
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
          <Reveal stagger className="flex flex-col gap-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">■ About Kanasa</span>
            <h2 className="text-4xl md:text-[4rem] font-medium tracking-tight leading-[1.05]">
              We blend design and technology to create
              digital products that people love.
            </h2>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-black/70 max-w-xl">
              From concept to launch, we help businesses navigate the digital-first world.
            </p>
            <div className="pt-4">
              <a
                href="/about"
                className="inline-block border border-black px-8 py-3 text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-[#efeee8] transition-colors"
              >
                See what Kanasa is all about &rarr;
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
