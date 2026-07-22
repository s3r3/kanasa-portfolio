'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

type Props = {
  title?: string;
  author?: string;
  duration?: string;
  image?: string;
  slug?: string;
};

export default function PodcastDetailPage({
  title = 'How design is changing in the digital age',
  author = 'William Parker',
  duration = '1hr 25min',
  image = '/images/podcast-1.jpg',
}: Props) {
  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Spacer untuk Navbar */}
      <div className="pt-32 md:pt-65" />

      {/* ========================================== */}
      {/* 1. HEADER EPISODE                          */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-black/50 mb-4">
          Home / All podcasts
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-black/20 pb-8">
          <div className="w-20 h-20 bg-neutral-200 border border-black/10 shrink-0 relative overflow-hidden hidden sm:block">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-serif tracking-tight font-medium leading-tight mb-3">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase text-black/60">
              <span>Duration: {duration}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>Listen on:</span>
                <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[9px]">🎙️</span>
                <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[9px]">🎧</span>
                <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[9px]">🎵</span>
                <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[9px]">📻</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. MEDIA PLAYER / VIDEO BANNER             */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-16">
        <div className="border border-black p-3 bg-white shadow-xl">
          <div className="w-full aspect-video bg-black relative overflow-hidden border border-black/10 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(/images/podcast-video-bg.jpg)' }} />
            {/* Tombol Play Tengah */}
            <div className="relative z-10 w-16 h-16 bg-white/90 text-black rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <span className="text-xl ml-1">▶</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. KONTEN UTAMA & SIDEBAR (2 Kolom)        */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-[1500px] mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* KOLOM KIRI: Transkrip / Catatan Podcast (Kolom 1 - 8) */}
          <article className="lg:col-span-8 flex flex-col font-serif text-black/90 leading-relaxed text-lg space-y-10 pr-0 lg:pr-8">
            
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Overview</h2>
              <p>
                Design is evolving at an unprecedented pace, driven by advancements in technology, shifting user expectations, and the rise of digital-first experiences. In this episode, we explore how digital transformation is redefining the principles, tools, and approaches that designers use today. From interface design to immersive experiences, design is no longer just about aesthetics — it is about functionality, accessibility, and creating meaningful connections with users.
              </p>
            </div>

            {/* Key insights from the episode */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Key insights from the episode</h2>
              <p className="mb-4">
                The discussion highlights how designers are adapting to emerging trends, including AI-powered tools, responsive design, and data-driven decision-making. Samuel Bishop shares how modern UI/UX practices integrate user analytics and behavioral insights to create intuitive, personalized experiences. Lori Stannard emphasizes the importance of inclusivity and modularity in digital design, ensuring products are usable by a wide range of audiences.
              </p>
              <ul className="list-disc pl-6 space-y-2 font-mono text-sm">
                <li><strong>AI and automation:</strong> Tools are streamlining repetitive design tasks, enabling designers to focus on creativity and strategy.</li>
                <li><strong>User-centered design:</strong> Research and testing guided decisions, helping products meet real user needs.</li>
                <li><strong>Cross-platform consistency:</strong> Designers now prioritize cohesive experiences across web, mobile, and emerging platforms like AR/VR.</li>
              </ul>
            </div>

            {/* The changing role of designers */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">The changing role of designers</h2>
              <p>
                Designers are no longer isolated creators — they are collaborators, strategists, and problem solvers. The integration of design thinking into business processes has elevated design’s role, influencing product strategy, branding, and customer engagement. Our guests discuss how interdisciplinary teams — combining creativity with analytics, technology, and psychology — are becoming essential in the digital age.
              </p>
            </div>

            {/* Future trends */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Future trends</h2>
              <p className="mb-4">
                Looking ahead, the episode examines how new technologies, including AI, AR/VR, and immersive interfaces, are shaping the next generation of digital experiences. Designers must continually learn, adapt, and anticipate user expectations to remain relevant in an ever-changing landscape.
              </p>
            </div>

            {/* Why listen */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Why listen</h2>
              <p>
                This episode provides practical insights for designers, product managers, and anyone interested in how technology is reshaping coastal city. Whether you’re an seasoned professional or entering the design field, you’ll gain a clearer understanding of how digital innovation is influencing design strategies today.
              </p>
            </div>

            {/* Takeaway */}
            <div className="border-t border-black/20 pt-8 mt-12">
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Takeaway</h2>
              <p>
                Digital design is no longer just about creating visually appealing interfaces; it’s about solving problems and managing experiences, and connecting with users in meaningful ways. By embracing technological advancements, prioritizing accessibility, and staying user-focused, designers can thrive in the digital age.
              </p>
            </div>

          </article>

          {/* KOLOM KANAN: Sidebar (Host, Guest, Share, Subscribe) (Kolom 9 - 12) */}
          <aside className="lg:col-span-4 flex flex-col gap-10 sticky top-36">
            
            {/* Hosted By */}
            <div className="border border-black p-6 bg-white/40 flex flex-col gap-4">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold">Hosted by</h4>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-neutral-300 bg-cover bg-center shrink-0 border border-black" style={{ backgroundImage: 'url(/images/julie.jpg)' }} />
                <div>
                  <h5 className="font-serif font-bold text-base">William Parker</h5>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-black/60">Business/Pandas analyst</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs font-mono pt-2 border-t border-black/10">
                <a href="#" className="hover:italic">LinkedIn</a> • 
                <a href="#" className="hover:italic">Twitter</a> •
                <a href="#" className="hover:italic">Website</a>
              </div>
            </div>

            {/* Guest Appearance */}
            <div className="border border-black p-6 bg-white/40 flex flex-col gap-4">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold">Guest appearance</h4>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-300 bg-cover bg-center shrink-0 border border-black rounded-full" style={{ backgroundImage: 'url(/images/guest-1.jpg)' }} />
                <div>
                  <h6 className="font-serif font-bold text-sm">Samuel Bishop</h6>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-black/10">
                <div className="w-10 h-10 bg-neutral-300 bg-cover bg-center shrink-0 border border-black rounded-full" style={{ backgroundImage: 'url(/images/guest-2.jpg)' }} />
                <div>
                  <h6 className="font-serif font-bold text-sm">Lori Stannard</h6>
                </div>
              </div>
            </div>

            {/* Share Episode */}
            <div className="border border-black p-6 bg-white/40">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold mb-4">Share episode</h4>
              <div className="flex gap-4 text-sm font-mono">
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">🔗</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">f</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">𝕏</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">in</button>
              </div>
            </div>

            {/* Stay Tuned Box */}
            <div className="border border-black p-6 bg-white/40">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold mb-2">Stay tuned for every episode</h4>
              <p className="text-xs text-black/70 mb-4 font-mono">Get updates straight to your inbox.</p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email for new episodes" 
                  className="border border-black/30 px-3 py-2 bg-white outline-none focus:border-black font-mono text-xs"
                  required
                />
                <button 
                  type="submit"
                  className="bg-black text-white py-2 text-xs font-mono uppercase font-bold tracking-wider hover:bg-black/80 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

          </aside>

        </div>
      </section>

      {/* ========================================== */}
      {/* 4. RECENT EPISODES SECTION                 */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 py-16 border-t border-black/10 max-w-[1800px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight font-medium">
            Recent episodes
          </h2>
          <Link href="/blog/podcasts" className="bg-black text-white px-4 py-2 text-xs font-mono uppercase font-bold tracking-widest hover:bg-black/80 transition-colors">
            VIEW ALL VIDEOS
          </Link>
        </div>

        <div className="w-full border-t border-dashed border-black/40 mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {[
            {
              id: '004',
              title: 'The remote revolution – rethinking work and culture',
              author: 'William Parker',
              duration: '3hr 06min',
              image: '/images/podcast-featured.jpg',
              slug: 'remote-revolution'
            },
            {
              id: '003',
              title: 'Education in a connected world',
              author: 'Emily Johnson',
              duration: '2hr 23min',
              image: '/images/podcast-2.jpg',
              slug: 'education-connected-world'
            },
          ].map((pod, index) => (
            <div key={index} className="border border-black p-3 md:p-4 bg-white/40 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-1/2 aspect-square bg-neutral-200 relative overflow-hidden border border-black/10 shrink-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pod.image})` }} />
                <div className="absolute top-2 left-2 text-[9px] font-mono uppercase bg-white/80 px-2 py-0.5 border border-black/20">
                  ○○○ [EP. {pod.id}]
                </div>
              </div>
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
                  <Link href={`/blog/podcasts/${pod.slug}`} className="bg-black text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/80 transition-colors flex items-center justify-center gap-2 w-full text-center">
                    <span>▶</span> PLAYER EPISODE
                  </Link>
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