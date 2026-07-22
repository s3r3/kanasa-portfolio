'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

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

function extractYoutubeId(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : url;
}

export default function EditPodcastPage() {
  const params = useParams();
  const id = params?.id as string;

  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [episodeNo, setEpisodeNo] = useState('001');
  const [duration, setDuration] = useState('1hr 20min');
  const [hostName, setHostName] = useState('William Parker');
  const [hostRole, setHostRole] = useState('Business & Tech Analyst');
  const [coverImage, setCoverImage] = useState('');

  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [applePodcastsUrl, setApplePodcastsUrl] = useState('');

  const [guests, setGuests] = useState<{ name: string; avatar: string }[]>([]);

  const [overview, setOverview] = useState('');
  const [keyInsights, setKeyInsights] = useState('');
  const [takeaway, setTakeaway] = useState('');

  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => { if (!r.ok) throw new Error(); setIsAuthed(true); })
      .catch(() => setIsAuthed(false));
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/podcast/${id}`)
      .then(r => r.json())
      .then(data => {
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setEpisodeNo(String(data.episodeNo || '001'));
        setDuration(data.duration || '');
        setHostName(data.author || 'William Parker');
        setCoverImage(data.image || '');
        setOverview(data.description || '');
        setSeoTitle(data.seoTitle || '');
        setSeoDesc(data.seoDesc || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
    setSlug(generatedSlug);
  };

  const handleAddGuest = () => {
    setGuests([...guests, { name: '', avatar: '' }]);
  };

  const handleGuestChange = (index: number, field: 'name' | 'avatar', value: string) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const handleRemoveGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    const youtubeId = extractYoutubeId(youtubeUrl);
    const res = await fetch(`/api/podcast/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        episodeNo: parseInt(episodeNo, 10) || 0,
        duration,
        author: hostName,
        image: coverImage,
        youtubeId,
        description: overview,
        content: JSON.stringify([{ type: 'text', content: overview }]),
        seoTitle: seoTitle || undefined,
        seoDesc: seoDesc || undefined,
        published: status === 'published',
      }),
    });
    if (res.ok) window.location.href = '/blog-dashboard';
  };

  if (isAuthed === null) return <div className="min-h-screen flex items-center justify-center bg-[#efeee8] text-sm font-mono">Loading...</div>;
  if (!isAuthed) return <LoginForm onLogin={() => setIsAuthed(true)} />;

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      <div className="pt-32 md:pt-63" />

      <section className="px-6 md:px-12 max-w-4xl mx-auto pb-24">

        {/* Header Dashboard */}
        <div className="mb-8">
          <Link href="/blog-dashboard" className="text-xs font-mono uppercase tracking-widest text-black/50 hover:text-black">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight font-medium mt-2">
            Edit Podcast Episode.
          </h1>
          {loading && <p className="text-xs font-mono text-black/50 mt-2">Loading podcast data...</p>}
        </div>

        <div className="space-y-8">

          {/* 1. EPISODE GENERAL INFO */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">1. Episode & Host Details</h2>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Episode Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. How design is changing in the digital age"
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-serif text-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">URL Slug</label>
              <div className="flex items-center border border-black/30 bg-white px-4 py-2 font-mono text-xs">
                <span className="text-black/40 mr-1">ref.digital/blog/podcasts/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full outline-none bg-transparent"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Episode Number</label>
                <input
                  type="text"
                  value={episodeNo}
                  onChange={(e) => setEpisodeNo(e.target.value)}
                  placeholder="001"
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="1hr 25min"
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Host Name</label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Podcast Cover Image (URL)</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/podcast-cover.jpg atau https://..."
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* 2. YOUTUBE EMBED & PLATFORM LINKS */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">2. YouTube Video & Audio Links</h2>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">YouTube Video URL (Main Player)</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=xxxxx"
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                required
                disabled={loading}
              />
              <p className="text-[10px] font-mono text-black/50 mt-1">Video YouTube ini akan ditampilkan sebagai pemutar utama di halaman detail episode.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Spotify Link (Optional)</label>
                <input
                  type="url"
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  placeholder="https://open.spotify.com/episode/..."
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Apple Podcasts Link (Optional)</label>
                <input
                  type="url"
                  value={applePodcastsUrl}
                  onChange={(e) => setApplePodcastsUrl(e.target.value)}
                  placeholder="https://podcasts.apple.com/..."
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* 3. GUEST APPEARANCE */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <div className="flex justify-between items-center border-b border-black/20 pb-3">
              <h2 className="text-xl font-serif font-medium">3. Guest Appearances ({guests.length})</h2>
              <button
                type="button"
                onClick={handleAddGuest}
                className="border border-black px-3 py-1 text-xs font-mono uppercase bg-white hover:bg-black hover:text-white transition-colors"
                disabled={loading}
              >
                + Add Guest
              </button>
            </div>

            {guests.map((guest, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 items-center bg-white/60 p-4 border border-black/20">
                <input
                  type="text"
                  value={guest.name}
                  onChange={(e) => handleGuestChange(idx, 'name', e.target.value)}
                  placeholder={`Guest #${idx + 1} Name (e.g. Samuel Bishop)`}
                  className="flex-1 border border-black/30 p-2.5 bg-white outline-none font-serif text-sm w-full"
                />
                <input
                  type="text"
                  value={guest.avatar}
                  onChange={(e) => handleGuestChange(idx, 'avatar', e.target.value)}
                  placeholder="Avatar URL (/images/guest.jpg)"
                  className="flex-1 border border-black/30 p-2.5 bg-white outline-none font-mono text-xs w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGuest(idx)}
                  className="border border-red-600 text-red-600 px-3 py-2 text-xs font-mono uppercase hover:bg-red-600 hover:text-white transition-colors shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 4. SHOW NOTES & TRANSCRIPT */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">4. Episode Content & Show Notes</h2>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Overview / Summary</label>
              <textarea
                rows={4}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Write a brief overview of what this episode covers..."
                className="w-full border border-black/30 p-4 bg-white outline-none focus:border-black font-serif text-base"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Key Insights from Episode</label>
              <textarea
                rows={5}
                value={keyInsights}
                onChange={(e) => setKeyInsights(e.target.value)}
                placeholder="Bullet points or key discussion takeaways..."
                className="w-full border border-black/30 p-4 bg-white outline-none focus:border-black font-serif text-sm"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Final Takeaway</label>
              <textarea
                rows={3}
                value={takeaway}
                onChange={(e) => setTakeaway(e.target.value)}
                placeholder="Closing thought or conclusion of the podcast..."
                className="w-full border border-black/30 p-4 bg-white outline-none focus:border-black font-serif text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* 5. SEO OPTIMIZATION */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">5. SEO & Metadata</h2>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Judul podcast khusus hasil pencarian Google"
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Meta Description</label>
              <textarea
                rows={2}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Ringkasan singkat episode untuk mesin pencari..."
                className="w-full border border-black/30 p-3 bg-white outline-none focus:border-black font-mono text-xs"
                disabled={loading}
              />
            </div>
          </div>

          {/* TOMBOL ACTION (DRAFT VS PUBLISH) */}
          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              className="border border-black bg-white text-black px-6 py-4 text-xs font-mono uppercase tracking-widest font-bold hover:bg-neutral-100 transition-colors"
              disabled={loading}
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('published')}
              className="bg-black text-white px-8 py-4 text-xs font-mono uppercase tracking-widest font-bold hover:bg-black/80 transition-colors shadow-lg"
              disabled={loading}
            >
              Publish Podcast Now
            </button>
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}
