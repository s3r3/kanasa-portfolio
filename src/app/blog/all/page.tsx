'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

// Topik untuk Marquee (sama seperti blog/page.tsx)
const TOPICS = [
  'UI/UX DESIGN',
  'TECH & DEVELOPMENT',
  'BUSINESS STRATEGY',
  'STARTUPS',
  'CODING TUTORIALS',
  'AGENCY LIFE',
  'FREELANCE',
];
const MARQUEE_ITEMS = [...TOPICS, ...TOPICS, ...TOPICS, ...TOPICS];

// Daftar Kategori
const CATEGORIES = ['ALL', 'FINANCE', 'HEALTH', 'BUSINESS', 'FOOD', 'TRAVEL', 'LIFESTYLE', 'TECH'];

interface BlogItem {
  id: string; category: string; author: string; readTime: string;
  title: string; image: string; slug: string;
}

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [articles, setArticles] = useState<BlogItem[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then((data: { id: string; category: string; author: string; readTime: string; title: string; image: string; slug: string }[]) => setArticles(data.map(b => ({
        id: b.id.slice(0, 3), category: b.category, author: b.author,
        readTime: b.readTime, title: b.title, image: b.image, slug: b.slug,
      }))))
      .catch(() => {});
  }, []);

  // Filter artikel berdasarkan kategori yang diklik
  const filteredArticles = selectedCategory === 'ALL'
    ? articles
    : articles.filter(article => article.category.toUpperCase() === selectedCategory);

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Spacer untuk Navbar */}
      <div className="pt-24 md:pt-60" />

      {/* ========================================== */}
      {/* 1. INFINITE MARQUEE (Topik Blog)             */}
      {/* ========================================== */}
      <div className="w-full bg-black text-white overflow-hidden py-3 border-y border-black">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
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
      {/* HEADER & FILTER KATEGORI                   */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 pb-16 max-w-[1800px] mx-auto flex flex-col items-center">
        
        {/* Judul Halaman */}
        <h1 className="text-6xl md:text-8xl font-serif tracking-tight font-medium mb-10 text-center">
          Blog
        </h1>

        {/* Tombol-tombol Filter Kategori (Gaya Tombol Majalah Hitam-Putih) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 max-w-4xl">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 border border-black ${
                  isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-white/60 text-black hover:bg-black hover:text-white'
                }`}
              >
                <span>{isActive ? '■' : '♡'}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

      </section>

      {/* ========================================== */}
      {/* GRID POSTINGAN BLOG                        */}
      {/* ========================================== */}
      <section className="px-6 md:px-12 pb-20 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Jika artikel kosong */}
        {filteredArticles.length === 0 && (
          <div className="py-20 text-center font-mono uppercase text-sm text-black/50">
            No articles found in this category.
          </div>
        )}

        {/* Tombol LOAD MORE */}
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => alert('Load more clicked!')}
            className="bg-black text-white px-8 py-3.5 text-xs font-mono uppercase tracking-widest font-bold hover:bg-black/80 transition-colors shadow-lg"
          >
            LOAD MORE
          </button>
        </div>

      </section>

      <Footer />
    </main>
  );
}