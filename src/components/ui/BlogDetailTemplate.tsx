'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

type Props = {
  title?: string;
  author?: string;
  readTime?: string;
  image?: string;
  category?: string;
  summary?: string;
};

export default function BlogDetailPage({
  title = 'Best productivity hacks for creative freelancers today',
  author = 'Michael Smith',
  readTime = '5 min read',
  image = '/images/featured-blog.jpg',
  category = 'Tech',
  summary = 'Smart tools and routines to help freelancers stay organized, inspired and productive.',
}: Props) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? Math.round((currentScroll / totalHeight) * 100) : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Spacer untuk Navbar */}
      <div className="pt-32 md:pt-70" />

      {/* ========================================== */}
      {/* 1. FLOATING READING PROGRESS WIDGET        */}
      {/* ========================================== */}
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-30 bg-black text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-4 text-xs font-mono uppercase tracking-wider backdrop-blur-md bg-black/90 border border-white/10">
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-white/20"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-white"
              fill="none"
              strokeDasharray={62.8}
              strokeDashoffset={62.8 - (62.8 * readingProgress) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="font-bold tracking-widest">EXPLORE TOPICS ⌄</span>
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">{readingProgress}%</span>
      </div>

      {/* ========================================== */}
      {/* 2. HEADER ARTIKEL                          */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-12">
        <div className="text-xs font-mono uppercase tracking-widest text-black/50 mb-4">
          Home / All Blogs
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-black/50 mb-2">
          {category}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-serif tracking-tight font-medium leading-[1.1] mb-6">
          {title}
        </h1>
        <p className="text-base text-black/70 max-w-xl mx-auto mb-6">
          {summary}
        </p>
        <div className="text-xs font-mono uppercase text-black/60 tracking-wider">
          by {author} &nbsp;|&nbsp; {readTime}
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. GAMBAR UTAMA / COVER                    */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-16">
        <div className="border border-black p-3 bg-white shadow-xl">
          <div className="w-full aspect-21/9 bg-neutral-200 relative overflow-hidden border border-black/10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. KONTEN UTAMA & SIDEBAR (2 Kolom)        */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 max-w-[1500px] mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* KOLOM KIRI: Isi Artikel (Kolom 1 - 8) */}
          <article className="lg:col-span-8 flex flex-col font-serif text-black/95 leading-relaxed text-lg space-y-10 pr-0 lg:pr-8">
            
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Introduction</h2>
              <p className="mb-4">
                Creative freelancers face constant pressure to deliver high-quality work while managing deadlines, communication, and personal time. Productivity plays a major role in staying consistent and competitive in this growing industry.
              </p>
              <p className="mb-4">
                The ability to focus, organize projects, and manage energy levels can directly impact earnings and professional reputation. When workflows are structured, creativity becomes more enjoyable and sustainable.
              </p>
              <p>
                Freelancers who adopt smart systems are able to finish tasks faster, take on more opportunities, and maintain a healthier balance between work and life.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Why smart routines improve efficiency</h2>
              <p className="mb-4">
                Freelancers need flexibility, but structure is what keeps projects moving. Creating a daily routine helps avoid distractions and improves concentration.
              </p>
              <p>
                Planning tasks in advance and setting priorities keeps workload under control. This leads to a more focused mindset and better results in less time.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Tools that enhance creativity and workflow</h2>
              <p className="mb-4">
                Digital tools make it easier for freelancers to stay organized and productive. Simple systems for tracking work, storing ideas, and scheduling tasks remove confusion and reduce stress.
              </p>
              <p>
                With the right tools, freelancers can simplify complex work, collaborate smoothly, and protect their creative energy for what matters most.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Staying focused while working independently</h2>
              <p className="mb-4">
                Working alone can make it tough to stay motivated. Creating a dedicated workspace, setting time blocks, and reducing digital interruptions help build stronger focus.
              </p>
              <p>
                Freelancers gain more control when they decide how and when to check messages or social notifications. This increases workflow and keeps attention on important tasks.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">A balance of work and well being</h2>
              <p className="mb-4">
                A good productivity strategy also includes habits that support mental and physical health. Breaks, proper sleep, and time away from screens help maintain energy and creativity for long-term success.
              </p>
              <p className="mb-2 font-mono text-sm uppercase tracking-wider font-bold">Here is how healthier routines improve productivity:</p>
              <ul className="list-disc pl-6 space-y-1 font-mono text-sm">
                <li>More energy throughout the day</li>
                <li>Better clarity and idea generation</li>
                <li>Reduced burnout and stress</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Boosting confidence through consistent progress</h2>
              <p className="mb-4">
                Productive freelancers finish tasks on time and communicate clearly with clients. This builds trust and leads to repeat work and positive referrals.
              </p>
              <p>
                Small improvements every day lead to stronger confidence and better performance across all projects.
              </p>
            </div>

            <div className="border-t border-black/20 pt-8 mt-12">
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-black font-serif">Conclusion</h2>
              <p className="mb-4">
                Productivity is essential for creative freelancers who want to grow in a competitive market. Smart routines, helpful tools, and healthy habits make work more organized and enjoyable.
              </p>
              <p>
                By improving focus and structure, freelancers can unlock their best outcomes and take on new opportunities with confidence. Productivity is not just about doing more; it is about working smarter and creating a sustainable path for long-term success.
              </p>
            </div>

            {/* Navigasi Previous / Next Blog */}
            <div className="grid grid-cols-2 gap-4 pt-12 border-t border-black/20 font-mono text-xs uppercase">
              <Link href="/blog/previous-slug" className="border border-black p-4 bg-white/40 hover:bg-black hover:text-white transition-colors flex items-center justify-between group">
                <span>&larr; Previous blog</span>
              </Link>
              <Link href="/blog/next-slug" className="border border-black p-4 bg-white/40 hover:bg-black hover:text-white transition-colors flex items-center justify-between group text-right">
                <span>Next blog &rarr;</span>
              </Link>
            </div>

          </article>

          {/* KOLOM KANAN: Sidebar (Kolom 9 - 12) */}
          <aside className="lg:col-span-4 flex flex-col gap-10 sticky top-36">
            
            {/* Share Post */}
            <div className="border border-black p-6 bg-white/40">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold mb-4">Share post</h4>
              <div className="flex gap-4 text-sm font-mono">
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">🔗</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">f</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">𝕏</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">in</button>
                <button className="w-8 h-8 border border-black rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">💬</button>
              </div>
            </div>

            {/* Author Info */}
            <div className="border border-black p-6 bg-white/40 flex flex-col gap-4">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold">Author info</h4>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-neutral-300 bg-cover bg-center shrink-0 border border-black" style={{ backgroundImage: 'url(/images/julie.jpg)' }} />
                <div>
                  <h5 className="font-serif font-bold text-base">Michael Smith</h5>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-black/60">Founder & Editor-in-Chief</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs font-mono pt-2 border-t border-black/10">
                <a href="#" className="hover:italic">LinkedIn</a> • 
                <a href="#" className="hover:italic">Twitter</a>
              </div>
            </div>

            {/* Editor's Choice Widget */}
            <div className="border border-black p-6 bg-white/40">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold mb-4">Editor&rsquo;s choice</h4>
              <Link href="/blog/remote-work" className="group block">
                <div className="w-full aspect-video bg-neutral-200 mb-3 border border-black/10 overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: 'url(/images/editors-choice.jpg)' }} />
                </div>
                <h5 className="font-serif font-medium text-base group-hover:italic transition-all mb-1 leading-snug">
                  How remote work is reshaping modern lifestyles
                </h5>
                <span className="text-[10px] font-mono uppercase text-black/60">by Benjamin Scott | 7 min read</span>
              </Link>
            </div>

            {/* Recent Posts Widget */}
            <div className="border border-black p-6 bg-white/40">
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold mb-4">Recent posts</h4>
              <div className="flex flex-col gap-4">
                <Link href="/blog/ecommerce" className="group">
                  <h5 className="font-serif text-sm font-medium group-hover:italic transition-all leading-snug mb-1">
                    How e-commerce is redefining global shopping trends
                  </h5>
                  <span className="text-[10px] font-mono uppercase text-black/60">by Emily Johnson | 7 min read</span>
                </Link>
                <div className="border-t border-black/10 pt-4">
                  <Link href="/blog/minimalist" className="group">
                    <h5 className="font-serif text-sm font-medium group-hover:italic transition-all leading-snug mb-1">
                      Exploring minimalist living: a beginner&rsquo;s perspective
                    </h5>
                    <span className="text-[10px] font-mono uppercase text-black/60">by Jacob Anderson | 6 min read</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar Ad Banner */}
            <div className="relative border border-black overflow-hidden shadow-sm group cursor-pointer aspect-4/3">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: 'url(/images/small-ad.jpg)' }} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-2 right-2 bg-white text-black px-2 py-0.5 text-[8px] font-mono uppercase border border-black/20">
                ADVERTISEMENT
              </div>
              <div className="absolute bottom-6 left-6 text-white font-serif text-xl font-medium">
                Save on premium membership
              </div>
            </div>

          </aside>

        </div>
      </section>

      <Footer />
    </main>
  );
}