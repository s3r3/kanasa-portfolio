'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) onLogin();
    else setError('Invalid credentials');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efeee8]">
      <form onSubmit={handleSubmit} className="border border-black p-8 bg-white max-w-sm w-full">
        <h1 className="text-2xl font-serif mb-6">Admin Login</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full border border-black/30 px-3 py-2 mb-3 text-sm font-mono" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border border-black/30 px-3 py-2 mb-3 text-sm font-mono" />
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
        <button type="submit" className="bg-black text-white px-4 py-2 text-xs font-mono uppercase w-full">Login</button>
      </form>
    </div>
  );
}

export default function BlogDashboardPage() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'podcasts'>('articles');

  const [articles, setArticles] = useState<any[]>([]);
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => { if (!r.ok) throw new Error(); setIsAuthed(true); })
      .catch(() => setIsAuthed(false));
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    fetch('/api/blog').then(r => r.json()).then(setArticles);
    fetch('/api/podcast').then(r => r.json()).then(setPodcasts);
  }, [isAuthed]);

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    setArticles(articles.filter(a => a.id !== id));
  };

  const handleDeletePodcast = async (id: string) => {
    if (!confirm('Delete this podcast?')) return;
    await fetch(`/api/podcast/${id}`, { method: 'DELETE' });
    setPodcasts(podcasts.filter(p => p.id !== id));
  };

  if (isAuthed === null) return <div className="min-h-screen flex items-center justify-center bg-[#efeee8] text-sm font-mono">Loading...</div>;
  if (!isAuthed) return <LoginForm onLogin={() => setIsAuthed(true)} />;

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
              <a
                href="/blog-dashboard/create-blog"
                className="bg-black text-white px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/80 transition-colors inline-block"
              >
                + Create New Article
              </a>
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
                      <td className="py-4 px-4 font-bold">[NO. {art.id.slice(0, 6)}]</td>
                      <td className="py-4 px-4 font-serif text-base">{art.title}</td>
                      <td className="py-4 px-4">{art.category}</td>
                      <td className="py-4 px-4 text-black/60">{new Date(art.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <a href={`/blog-dashboard/edit/${art.id}`} className="border border-black px-2.5 py-1 text-xs hover:bg-black hover:text-white transition-colors inline-block">Edit</a>
                        <button onClick={() => handleDeleteArticle(art.id)} className="border border-red-600 text-red-600 px-2.5 py-1 text-xs hover:bg-red-600 hover:text-white transition-colors">Delete</button>
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
              <a
                href="/blog-dashboard/create-podcast"
                className="bg-black text-white px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/80 transition-colors inline-block"
              >
                + Add Podcast Episode
              </a>
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
                      <td className="py-4 px-4 font-bold">[EP. {pod.id.slice(0, 6)}]</td>
                      <td className="py-4 px-4 font-serif text-base">{pod.title}</td>
                      <td className="py-4 px-4">{pod.duration}</td>
                      <td className="py-4 px-4 text-black/60">{pod.author}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <a href={`/blog-dashboard/edit-podcast/${pod.id}`} className="border border-black px-2.5 py-1 text-xs hover:bg-black hover:text-white transition-colors inline-block">Edit</a>
                        <button onClick={() => handleDeletePodcast(pod.id)} className="border border-red-600 text-red-600 px-2.5 py-1 text-xs hover:bg-red-600 hover:text-white transition-colors">Delete</button>
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
