'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BlogDashboardPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'podcasts'>('articles');
  
  // State dummy untuk simulasi data CMS lokal
  const [articles, setArticles] = useState([
    { id: '022', title: 'How e-commerce is redefining global shopping trends', category: 'Tech', date: 'JUL 2026' },
    { id: '021', title: 'Exploring minimalist living: a beginner’s perspective', category: 'Lifestyle', date: 'JUN 2026' },
  ]);

  const [podcasts, setPodcasts] = useState([
    { id: '004', title: 'The remote revolution – rethinking work and culture', duration: '3hr 06min', host: 'William Parker' },
    { id: '003', title: 'How design is changing in the digital age', duration: '1hr 25min', host: 'William Parker' },
  ]);

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Spacer untuk Navbar */}
      <div className="pt-32 md:pt-65" />

      <section className="px-6 md:px-12 max-w-[1600px] mx-auto pb-24">
        
        {/* ================= HEADER DASHBOARD ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-black pb-8 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-black/50">[ADMIN SECURE PANEL]</span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight font-medium mt-1">
              Content Dashboard.
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase bg-black text-white px-3 py-1.5">
              Logged in: Admin
            </span>
            <button 
              onClick={() => alert('Logout action simulation')}
              className="border border-black px-4 py-1.5 text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ================= NAVIGATION TABS ================= */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold border border-black transition-all ${
              activeTab === 'articles' ? 'bg-black text-white shadow-md' : 'bg-white/60 text-black hover:bg-black hover:text-white'
            }`}
          >
            Manage Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('podcasts')}
            className={`px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold border border-black transition-all ${
              activeTab === 'podcasts' ? 'bg-black text-white shadow-md' : 'bg-white/60 text-black hover:bg-black hover:text-white'
            }`}
          >
            Manage Podcasts ({podcasts.length})
          </button>
        </div>

        {/* ================= TAB 1: ARTICLES CONTENT ================= */}
        {activeTab === 'articles' && (
          <div className="bg-white/40 border border-black p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/20">
              <h2 className="text-2xl font-serif font-medium">Articles Control Panel</h2>
              <button 
                onClick={() => alert('Trigger modal/form to create new article')}
                className="bg-black text-white px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/80 transition-colors"
              >
                + Create New Article
              </button>
            </div>

            {/* Tabel List Artikel */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/20 text-xs font-mono uppercase text-black/60">
                    <th className="py-3 px-4">ID / Slug</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 font-mono text-sm">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-white/60 transition-colors">
                      <td className="py-4 px-4 font-bold">[NO. {art.id}]</td>
                      <td className="py-4 px-4 font-serif text-base">{art.title}</td>
                      <td className="py-4 px-4">{art.category}</td>
                      <td className="py-4 px-4 text-black/60">{art.date}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button className="border border-black px-2.5 py-1 text-xs hover:bg-black hover:text-white transition-colors">Edit</button>
                        <button className="border border-red-600 text-red-600 px-2.5 py-1 text-xs hover:bg-red-600 hover:text-white transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PODCASTS CONTENT ================= */}
        {activeTab === 'podcasts' && (
          <div className="bg-white/40 border border-black p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/20">
              <h2 className="text-2xl font-serif font-medium">Podcasts Control Panel</h2>
              <button 
                onClick={() => alert('Trigger modal/form to add podcast episode')}
                className="bg-black text-white px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/80 transition-colors"
              >
                + Add Podcast Episode
              </button>
            </div>

            {/* Tabel List Podcast */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/20 text-xs font-mono uppercase text-black/60">
                    <th className="py-3 px-4">Episode ID</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Host</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 font-mono text-sm">
                  {podcasts.map((pod) => (
                    <tr key={pod.id} className="hover:bg-white/60 transition-colors">
                      <td className="py-4 px-4 font-bold">[EP. {pod.id}]</td>
                      <td className="py-4 px-4 font-serif text-base">{pod.title}</td>
                      <td className="py-4 px-4">{pod.duration}</td>
                      <td className="py-4 px-4 text-black/60">{pod.host}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button className="border border-black px-2.5 py-1 text-xs hover:bg-black hover:text-white transition-colors">Edit</button>
                        <button className="border border-red-600 text-red-600 px-2.5 py-1 text-xs hover:bg-red-600 hover:text-white transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}