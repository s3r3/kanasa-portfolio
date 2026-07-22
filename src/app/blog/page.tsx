'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

interface BlogItem {
  id: string; category: string; author: string; readTime: string;
  title: string; image: string; slug: string;
}
interface PodcastItem {
  id: string; title: string; author: string; duration: string; image: string; slug: string;
}

// Topik untuk Marquee
const TOPICS = [
  'UI/UX DESIGN',
  'TECH & DEVELOPMENT',
  'BUSINESS STRATEGY',
  'STARTUPS',
  'CODING TUTORIALS',
  'AGENCY LIFE',
  'FREELANCE',
];

// Menggandakan array beberapa kali untuk memastikan efek infinite scroll yang mulus
const MARQUEE_ITEMS = [...TOPICS, ...TOPICS, ...TOPICS, ...TOPICS];

/* ponytail: typewriter component for hero headline */
function TypewriterHeadline() {
  const text = 'A modern journal for curious minds';
  const [displayed, setDisplayed] = useState('');
  const iRef = useRef(0);
  useEffect(() => {
    iRef.current = 0;
    const timer = setInterval(() => {
      iRef.current++;
      setDisplayed(text.slice(0, iRef.current));
      if (iRef.current >= text.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);
  return <>{displayed}<span className="animate-cursor-blink">|</span></>;
}

/* ponytail: one generic parallax hook, reuse across sections */
function useParallax(speed: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);
  return { ref, y };
}

/* ponytail: parallax image wrapper — moves bg relative to scroll */
function ParallaxImg({ src, className }: { src: string; className?: string }) {
  const { ref, y } = useParallax();
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <motion.div className="absolute inset-0 bg-cover bg-center" style={{ y, backgroundImage: `url(${src})` }} />
    </div>
  );
}

/* ponytail: section entrance — fades in once on first scroll into view */
const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function BlogHomePage() {
  const [recentPosts, setRecentPosts] = useState<BlogItem[]>([]);
  const [watchPosts, setWatchPosts] = useState<BlogItem[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => {
        const blogs: BlogItem[] = data.map((b: { id: string; category: string; author: string; readTime: string; title: string; image: string; slug: string }) => ({
          id: b.id.slice(0, 3), category: b.category, author: b.author,
          readTime: b.readTime, title: b.title, image: b.image, slug: b.slug,
        }));
        setRecentPosts(blogs.slice(0, 6));
        setWatchPosts(blogs.filter(b => b.category === 'Health' || b.category === 'Tech').slice(0, 3));
      })
      .catch(() => {});
    fetch('/api/podcast')
      .then(r => r.json())
      .then((data: { episodeNo: number; title: string; author: string; duration: string; image: string; slug: string }[]) => setPodcasts(data.map(p => ({
        id: String(p.episodeNo), title: p.title, author: p.author,
        duration: p.duration, image: p.image, slug: p.slug,
      }))))
      .catch(() => {});
  }, []);

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Spacer untuk Navbar yang fixed */}
      <div className="pt-24 md:pt-60" />

      {/* ========================================== */}
      {/* 1. INFINITE MARQUEE (Topik Blog)             */}
      {/* ========================================== */}
      <div className="w-full bg-black text-white overflow-hidden py-3 border-y border-black">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 30, // Semakin besar angka, semakin lambat bergeraknya
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap items-center w-max"
        >
          {MARQUEE_ITEMS.map((topic, index) => (
            <div key={index} className="flex items-center text-xs md:text-sm font-mono uppercase tracking-widest">
              <span className="mx-6">★</span>
              <span>{topic}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ========================================== */}
      {/* 2. HERO SECTION                              */}
      {/* ========================================== */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 md:px-12 py-12 md:py-20 max-w-[1800px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* BAGIAN KIRI: Headline & Subscribe */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] mb-6 font-serif min-h-[1.2em]">
              <TypewriterHeadline />
            </h1>
            <p className="text-lg md:text-xl text-black/70 mb-12 leading-relaxed max-w-md">
              Dive into well-crafted stories, interviews, and guides designed to inform, inspire, and keep you updated with the latest in tech, design, and business.
            </p>

            {/* Newsletter Box (Dashed Border) */}
            <div className="border-[3px] border-dashed border-black p-6 md:p-8 relative max-w-md bg-white/50 backdrop-blur-sm">
              {/* Ornamen Stamp Kanan Atas */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-30 bg-contain bg-no-repeat bg-center mix-blend-multiply" style={{ backgroundImage: 'url(/images/stamp-placeholder.png)' }} />
              
              <h3 className="text-2xl font-bold tracking-tight mb-2">Don&rsquo;t miss a thing</h3>
              <p className="text-sm font-medium text-black/70 mb-6">Subscribe to get updates straight to your inbox.</p>
              
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 border border-black/30 px-4 py-3 bg-white outline-none focus:border-black transition-colors font-mono text-sm placeholder:text-black/40"
                  required
                />
                <button 
                  type="submit"
                  className="bg-black text-white px-6 py-3 font-bold uppercase text-xs tracking-wider hover:bg-black/80 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* BAGIAN KANAN: Featured Article (dinamis dari API) */}
          <div className="lg:col-span-7">
            {recentPosts[0] ? (
              <Link href={`/blog/${recentPosts[0].slug}`}>
                <div className="border border-black p-3 md:p-4 bg-white/40 hover:bg-white/80 transition-colors cursor-pointer group shadow-sm hover:shadow-xl duration-500">
                  <div className="flex justify-between items-center border-b border-black/20 pb-3 mb-3 text-[10px] md:text-xs font-mono uppercase text-black/60">
                    <span className="tracking-widest">○○○</span>
                    <span className="tracking-[0.3em] font-bold text-black border-x border-black/20 px-8">FEATURED</span>
                    <span className="tracking-widest">[NO. {recentPosts[0].id}]</span>
                  </div>
                  <div className="w-full aspect-4/3 md:aspect-16/10 bg-neutral-200 relative overflow-hidden border border-black/10">
                    <ParallaxImg src={recentPosts[0].image} />
                  </div>
                  <div className="flex justify-between items-center mt-6 text-xs font-mono uppercase text-black/60">
                    <span className="text-black font-bold">{recentPosts[0].category.toUpperCase()}</span>
                    <span>by {recentPosts[0].author} | {recentPosts[0].readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium leading-[1.15] mt-4 mb-2 tracking-tight">
                    <span className="bg-[#fbc02d] px-2 py-1 box-decoration-clone leading-relaxed group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      {recentPosts[0].title}
                    </span>
                  </h2>
                </div>
              </Link>
            ) : (
              <div className="border border-black p-3 md:p-4 bg-white/40 shadow-sm aspect-4/3 flex items-center justify-center text-sm font-mono text-black/40">Loading featured...</div>
            )}
          </div>

        </div>
      </motion.section>

      {/* ========================================== */}
      {/* 3. RECENT POSTS SECTION                      */}
      {/* ========================================== */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 md:px-12 py-16 border-t border-black/10 max-w-[1800px] mx-auto"
      >

        {/* Header Section: Judul & Tombol "View All Posts" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-medium">
            Recent posts
          </h2>
          <Link
            href="/blog/all"
            className="bg-black text-white px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-bold hover:bg-black/80 transition-colors w-max"
          >
            VIEW ALL POSTS
          </Link>
        </div>

        {/* Garis Dekoratif Pemisah ala Majalah */}
        <div className="relative flex items-center justify-between mb-12">
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="w-full border-t border-dashed border-black/40 mx-2" />
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>

        {/* Grid 3 Kolom untuk Recent Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="border border-black p-3 bg-white/40 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-full">

                {/* Header Jendela Kartu */}
                <div className="flex justify-between items-center border-b border-black/20 pb-2 mb-2 text-[10px] font-mono uppercase text-black/60">
                  <span>○○○</span>
                  <span className="tracking-widest font-bold">[NO. {post.id}]</span>
                </div>

                {/* Gambar Thumbnail */}
                <div className="w-full aspect-4/3 bg-neutral-200 relative overflow-hidden border border-black/10 mb-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>

                {/* Kategori & Metadata Penulis */}
                <div className="flex justify-between items-center text-[11px] font-mono uppercase text-black/60 mb-2">
                  <span className="text-black font-bold">{post.category}</span>
                  <span>by {post.author} | {post.readTime}</span>
                </div>

                {/* Judul Postingan */}
                <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug group-hover:italic transition-all">
                  {post.title}
                </h3>

              </div>
            </Link>
          ))}
        </div>

      </motion.section>

      {/* ========================================== */}
      {/* 4. EDITOR'S CHOICE SECTION                 */}
      {/* ========================================== */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 md:px-12 py-16 border-t border-black/10 max-w-[1800px] mx-auto"
      >

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-medium">
            Editor&rsquo;s choice
          </h2>
        </div>

        {/* Garis Pemisah Tipis */}
        <div className="w-full border-t border-black/40 mb-12" />

        {/* Banner Utama Editor's Choice (dinamis) */}
        {recentPosts[1] ? (
          <Link href={`/blog/${recentPosts[1].slug}`} className="block group">
            <div className="border border-black p-3 md:p-4 bg-white/40 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex justify-between items-center border-b border-black/20 pb-2 mb-3 text-[10px] md:text-xs font-mono uppercase text-black/60">
                <span>○○○</span>
                <span className="tracking-[0.3em] font-bold text-black border-x border-black/20 px-8 hidden sm:block">EDITOR&rsquo;S PICK</span>
                <span className="tracking-widest">[NO. {recentPosts[1].id}]</span>
              </div>
              <div className="w-full aspect-21/9 md:aspect-[2.4/1] relative overflow-hidden border border-black/10 flex items-center p-8 md:p-16">
                <ParallaxImg src={recentPosts[1].image} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 max-w-2xl flex flex-col items-start">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/80 mb-3 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                    {recentPosts[1].category}
                  </span>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] mb-4">
                    <span className="bg-white text-black px-3 py-1.5 box-decoration-clone leading-relaxed">
                      {recentPosts[1].title}
                    </span>
                  </h3>
                  <div className="text-xs font-mono uppercase text-white/90 tracking-wider">
                    by {recentPosts[1].author} | {recentPosts[1].readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="border border-black p-8 bg-white/40 text-center text-sm font-mono text-black/40">Loading editor&rsquo;s pick...</div>
        )}

      </motion.section>

      {/* ========================================== */}
      {/* 5. WATCH SECTION (Dark Theme)              */}
      {/* ========================================== */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-black text-white px-6 md:px-12 py-20 border-t border-white/10"
      >
        <div className="max-w-[1800px] mx-auto">

          {/* Header Section: Judul & Tombol "View All Videos" */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-medium text-white">
              Watch
            </h2>
            <Link
              href="/blog/videos"
              className="bg-white text-black px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-bold hover:bg-white/80 transition-colors w-max"
            >
              VIEW ALL VIDEOS
            </Link>
          </div>

          {/* Garis Pemisah Putih Putus-putus */}
          <div className="w-full border-t border-dashed border-white/30 mb-12" />

          {/* Featured Watch Article (Banner Besar di Atas) */}
          {watchPosts[0] ? (
            <Link href={`/blog/${watchPosts[0].slug}`} className="block group mb-10">
              <div className="border border-white/20 p-3 md:p-4 bg-neutral-900/40 hover:bg-neutral-900 transition-all duration-300 shadow-xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3 text-[10px] md:text-xs font-mono uppercase text-white/50">
                  <span>○○○</span>
                  <span className="tracking-widest">[NO. {watchPosts[0].id}]</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 w-full aspect-16/10 bg-neutral-800 relative overflow-hidden border border-white/10">
                    <ParallaxImg src={watchPosts[0].image} />
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-between py-4 pr-4">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-6 group-hover:italic transition-all">
                      {watchPosts[0].title}
                    </h3>
                    <div className="flex justify-between items-center text-xs font-mono uppercase text-white/60 border-t border-white/10 pt-4">
                      <span>{watchPosts[0].category}</span>
                      <span>by {watchPosts[0].author} | {watchPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="border border-white/20 p-8 bg-neutral-900/40 text-center text-sm font-mono text-white/40 mb-10">Loading watch...</div>
          )}

          {/* Grid 3 Kolom untuk Watch Lainnya di Bawah */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {watchPosts.map((video) => (
              <Link key={video.slug} href={`/blog/${video.slug}`} className="group">
                <div className="border border-white/20 p-3 bg-neutral-900/40 hover:bg-neutral-900 transition-all duration-300 shadow-md flex flex-col h-full">

                  {/* Header Jendela Kartu */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2 text-[10px] font-mono uppercase text-white/50">
                    <span>○○○</span>
                    <span className="tracking-widest font-bold">[NO. {video.id}]</span>
                  </div>

                  {/* Gambar Thumbnail */}
                  <div className="w-full aspect-16/10 bg-neutral-800 relative overflow-hidden border border-white/10 mb-4">
                    <div
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                      style={{ backgroundImage: `url(${video.image})` }}
                    />
                  </div>

                  {/* Kategori & Metadata Penulis */}
                  <div className="flex justify-between items-center text-[11px] font-mono uppercase text-white/50 mb-2">
                    <span className="text-white font-bold">{video.category}</span>
                    <span>by {video.author} | {video.readTime}</span>
                  </div>

                  {/* Judul Video */}
                  <h3 className="text-lg md:text-xl font-medium tracking-tight leading-snug group-hover:italic transition-all text-white">
                    {video.title}
                  </h3>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ========================================== */}
      {/* 6. EDITORIAL NOTE & BANNER SECTION         */}
      {/* ========================================== */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-[#efeee8] text-black px-6 md:px-12 py-24 border-t border-black/10"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Gambar Ilustrasi Berbingkai ala Majalah */}
          <div className="border border-black p-3 bg-white shadow-md mb-12 max-w-md w-full">
            <div className="flex justify-center items-center border-b border-dashed border-black/30 pb-2 mb-3 text-[10px] font-mono text-black/50">
              <span>○○○</span>
            </div>
            <div className="w-full aspect-square bg-neutral-200 relative overflow-hidden border border-black/10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/editor-portrait.jpg)' }}
              />
            </div>
          </div>

          {/* Teks Manifesto / Pernyataan */}
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-black/90 max-w-2xl mb-10">
            This platform was started with a simple idea: to share stories that spark curiosity and inspire conversations. Our team of writers and creators is dedicated to bringing thoughtful and diverse voices together. We hope you find value in every read.
          </p>

          {/* Garis Pemisah Kecil ala Editor */}
          <div className="flex items-center gap-3 mb-6 text-black/40">
            <div className="w-12 border-t border-dashed border-black/40" />
            <span className="text-[10px] font-mono">○○○</span>
            <div className="w-12 border-t border-dashed border-black/40" />
          </div>

          {/* Info Pembuat / Editor */}
          <div className="flex flex-col items-center mb-20">
            <h4 className="font-serif text-lg font-medium tracking-tight">Frances Guerrero</h4>
            <span className="text-xs font-mono uppercase tracking-widest text-black/60 mt-1">Founder &amp; Editor-in-Chief</span>
          </div>

          {/* Banner Iklan Horizontal (Advertisement) */}
          <div className="w-full relative border border-black/20 overflow-hidden shadow-lg group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center brightness-70 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: 'url(/images/ad-banner.jpg)' }}
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Label "ADVERTISEMENT" di Pojok Kanan Atas */}
            <div className="absolute top-4 right-4 bg-white/90 text-black px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm border border-black/20 z-10">
              ADVERTISEMENT
            </div>

            {/* Konten Teks Iklan di Tengah */}
            <div className="relative z-10 py-16 px-6 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl md:text-4xl font-serif tracking-tight font-medium mb-2">
                Save on premium membership
              </h3>
            </div>
          </div>

        </div>
      </motion.section>
      {/* ========================================== */}
      {/* 7. DISCOVER MORE STORIES SECTION           */}
      {/* ========================================== */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="bg-[#efeee8] text-black px-6 md:px-12 py-20 border-t border-black/10 max-w-[1800px] mx-auto"
      >

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-medium">
            Discover more stories
          </h2>
        </div>

        <div className="w-full border-t border-black/40 mb-12" />

        {/* Grid Layout Asimetris (3 Kolom: Kartu Kiri, Kartu Besar Tengah, List & Iklan Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">

          {/* KOLOM KIRI (2 Kartu Bertumpuk) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {recentPosts.slice(2, 4).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="border border-black p-3 bg-white/40 hover:bg-white/90 transition-all duration-300 shadow-sm">
                  <div className="flex justify-between items-center border-b border-black/20 pb-2 mb-2 text-[10px] font-mono uppercase text-black/50">
                    <span>○○○</span>
                    <span className="tracking-widest font-bold">[NO. {post.id}]</span>
                  </div>
                  <div className="w-full aspect-16/10 bg-neutral-200 relative overflow-hidden border border-black/10 mb-3">
                    <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url(${post.image})` }} />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight leading-snug group-hover:italic transition-all mb-1">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase text-black/60 pt-2 border-t border-black/10">
                    <span>{post.category}</span>
                    <span>by {post.author} | {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* KOLOM TENGAH (Featured Medium/Large Card) */}
          <div className="lg:col-span-6">
            {recentPosts[4] ? (
              <Link href={`/blog/${recentPosts[4].slug}`} className="group">
                <div className="border border-black p-3 md:p-4 bg-white/40 hover:bg-white/90 transition-all duration-300 shadow-sm h-full flex flex-col">
                  <div className="flex justify-between items-center border-b border-black/20 pb-2 mb-3 text-[10px] font-mono uppercase text-black/50">
                    <span>○○○</span>
                    <span className="tracking-widest font-bold">[NO. {recentPosts[4].id}]</span>
                  </div>
                  <div className="w-full aspect-4/3 bg-neutral-200 relative overflow-hidden border border-black/10 mb-4">
                    <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" style={{ backgroundImage: `url(${recentPosts[4].image})` }} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight leading-snug group-hover:italic transition-all mb-2">
                    {recentPosts[4].title}
                  </h3>
                  <div className="flex justify-between items-center text-xs font-mono uppercase text-black/60 pt-3 border-t border-black/10 mt-auto">
                    <span>{recentPosts[4].category}</span>
                    <span>by {recentPosts[4].author} | {recentPosts[4].readTime}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="border border-black p-8 bg-white/40 text-center text-sm font-mono text-black/40">Loading...</div>
            )}
          </div>

          {/* KOLOM KANAN (List Teks Artikel & Banner Iklan Kecil) */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* List Artikel Samping */}
            <div className="border border-black bg-white/40 p-5 flex flex-col gap-6 shadow-sm">
              {recentPosts.slice(0, 3).map((post, idx) => (
                <Link key={idx} href={`/blog/${post.slug}`} className="group pb-6 border-b border-black/10 last:border-0 last:pb-0">
                  <h4 className="text-sm font-medium tracking-tight leading-snug group-hover:italic transition-all mb-1">
                    {post.title}
                  </h4>
                  <div className="text-[10px] font-mono uppercase text-black/60">
                    by {post.author} | {post.readTime}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mini Banner Iklan Samping */}
            <div className="relative border border-black overflow-hidden shadow-sm group cursor-pointer aspect-video">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url(/images/small-ad.jpg)' }} />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-2 right-2 bg-white text-black px-2 py-0.5 text-[8px] font-mono uppercase border border-black/20">
                ADVERTISEMENT
              </div>
              <div className="absolute bottom-4 left-4 text-white font-serif text-lg font-medium drop-shadow-md">
                Save on premium membership
              </div>
            </div>

          </div>

        </div>

        {/* ========================================== */}
        {/* 8. PODCASTS SECTION                        */}
        {/* ========================================== */}
        <div className="pt-10 border-t border-black/10">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-medium">
              Podcasts
            </h2>
          </div>

          <div className="w-full border-t border-black/40 mb-12" />

          {/* Grid 2 Kolom untuk Podcast */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {podcasts.slice(0, 2).map((pod) => (
              <Link key={pod.slug} href={`/blog/podcasts/${pod.slug}`} className="border border-black p-3 md:p-4 bg-white/40 shadow-sm flex flex-col sm:flex-row gap-6 items-center group">

                {/* Gambar Cover Podcast */}
                <div className="w-full sm:w-1/2 aspect-square bg-neutral-200 relative overflow-hidden border border-black/10 shrink-0">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pod.image})` }} />
                  <div className="absolute top-2 left-2 text-[9px] font-mono uppercase bg-white/80 px-2 py-0.5 border border-black/20">
                    ○○○ [NO. {pod.id}]
                  </div>
                </div>

                {/* Konten Kanan Podcast */}
                <div className="w-full sm:w-1/2 flex flex-col justify-between h-full py-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug mb-2 font-serif">
                      {pod.title}
                    </h3>
                    <p className="text-xs font-mono uppercase text-black/60 mb-6">
                      by {pod.author} | {pod.duration}
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

              </Link>
            ))}
          </div>

        </div>

      </motion.section>

      <Footer />
    </main>
  );
}