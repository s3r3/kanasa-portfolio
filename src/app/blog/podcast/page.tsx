'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function PodcastsPage() {
  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Spacer untuk Navbar */}
      <div className="pt-32 md:pt-66" />

      {/* ========================================== */}
      {/* 1. HERO SECTION & FEATURED PODCAST         */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-[1800px] mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* KOLOM KIRI: Judul, Deskripsi, Listen On, & Form Subscribe */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif tracking-tight font-medium leading-[1.05] mb-6">
              Ref podcasts
            </h1>
            
            <p className="text-lg md:text-xl text-black/70 mb-8 leading-relaxed max-w-md">
              Conversations that uncover the ideas, struggles, and wins behind today&rsquo;s most inspiring creators and entrepreneurs.
            </p>

            {/* List Icon Listen On */}
            <div className="flex items-center gap-4 mb-12 text-xs font-mono uppercase tracking-wider text-black/70">
              <span>Listen on:</span>
              <div className="flex gap-2">
                <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs">🎙️</span>
                <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs">🎧</span>
                <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs">🎵</span>
                <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs">📻</span>
              </div>
            </div>

            {/* Newsletter Box (Dashed Border) */}
            <div className="border-[3px] border-dashed border-black p-6 md:p-8 relative max-w-md bg-white/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold tracking-tight mb-2">Be the first to explore new episodes</h3>
              <p className="text-sm font-medium text-black/70 mb-6">Your email for new episodes</p>
              
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email for new episodes" 
                  className="flex-1 border border-black/30 px-4 py-3 bg-white outline-none focus:border-black transition-colors font-mono text-sm placeholder:text-black/40"
                  required
                />
                <button 
                  type="submit"
                  className="bg-black text-white px-6 py-3 font-bold uppercase text-xs tracking-wider hover:bg-black/80 transition-colors shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

          </div>

          {/* KOLOM KANAN: Featured Episode Banner Besar */}
          <div className="lg:col-span-7">
            <Link href="/blog/podcasts/remote-revolution" className="group block">
              <div className="border border-black p-3 md:p-4 bg-white/40 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-xl">
                
                {/* Header Jendela Kartu */}
                <div className="flex justify-between items-center border-b border-black/20 pb-2 mb-4 text-[10px] md:text-xs font-mono uppercase text-black/60">
                  <span>○○○</span>
                  <span className="tracking-[0.3em] font-bold text-black border-x border-black/20 px-8">FEATURED</span>
                  <span className="tracking-widest">[EP. 004]</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Gambar Cover Podcast Featured di Kiri */}
                  <div className="md:col-span-6 w-full aspect-square bg-neutral-200 relative overflow-hidden border border-black/10">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: 'url(/images/podcast-featured.jpg)' }} // Ganti path gambar Anda
                    />
                  </div>

                  {/* Teks Deskripsi Featured di Kanan */}
                  <div className="md:col-span-6 flex flex-col justify-between py-2">
                    <h2 className="text-2xl md:text-4xl font-serif font-medium tracking-tight leading-snug mb-4 group-hover:italic transition-all">
                      The remote revolution – rethinking work and culture
                    </h2>
                    <div className="text-xs font-mono uppercase text-black/60 pt-4 border-t border-black/10">
                      by William Parker &nbsp;|&nbsp; 3hr 06min
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. RECENT EPISODES SECTION                 */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 py-16 border-t border-black/10 max-w-[1800px] mx-auto">
        
        {/* Header Recent Episodes */}
        <div className="mb-6">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-medium">
            Recent episodes
          </h2>
        </div>

        {/* Garis Pemisah Titik-titik */}
        <div className="relative flex items-center justify-between mb-12">
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="w-full border-t border-dashed border-black/40 mx-2" />
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>

        {/* Grid 2 Kolom untuk Episode Lainnya */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {[
            {
              id: '003',
              title: 'How design is changing in the digital age',
              author: 'William Parker',
              duration: '1hr 25min',
              image: '/images/podcast-1.jpg',
              slug: 'design-changing-digital-age'
            },
            {
              id: '002',
              title: 'Education in a connected world',
              author: 'Emily Johnson',
              duration: '2hr 23min',
              image: '/images/podcast-2.jpg',
              slug: 'education-connected-world'
            },
            {
              id: '002',
              title: 'The money mindset – simplifying modern finance',
              author: 'Emily Johnson',
              duration: '1hr 50min',
              image: '/images/podcast-3.jpg',
              slug: 'money-mindset-modern-finance'
            },
            {
              id: '001',
              title: 'Learning in a connected world',
              author: 'Michael Smith',
              duration: '2hr 10min',
              image: '/images/podcast-4.jpg',
              slug: 'learning-connected-world'
            },
          ].map((pod, index) => (
            <div key={index} className="border border-black p-3 md:p-4 bg-white/40 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              
              {/* Cover Podcast */}
              <div className="w-full sm:w-1/2 aspect-square bg-neutral-200 relative overflow-hidden border border-black/10 shrink-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pod.image})` }} />
                <div className="absolute top-2 left-2 text-[9px] font-mono uppercase bg-white/80 px-2 py-0.5 border border-black/20">
                  ○○○ [EP. 00{pod.id}]
                </div>
              </div>

              {/* Konten Kanan Podcast */}
              <div className="w-full sm:w-1/2 flex flex-col justify-between h-full py-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug mb-2 font-serif">
                    {pod.title}
                  </h3>
                  <p className="text-xs font-mono uppercase text-black/60 mb-6">
                    by {pod.author} &nbsp;|&nbsp; {pod.duration}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Tombol Play Episode */}
                  <button className="bg-black text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/80 transition-colors flex items-center justify-center gap-2 w-full">
                    <span>▶</span> PLAY EPISODE
                  </button>

                  {/* Ikon Platform Listen On */}
                  <div className="flex items-center gap-3 text-[11px] font-mono uppercase text-black/60 pt-2 border-t border-black/10">
                    <span>Listen on:</span>
                    <div className="flex gap-2">
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">🎙️</span>
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">🎧</span>
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">🎵</span>
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">📻</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      <Footer />
    </main>
  );
}