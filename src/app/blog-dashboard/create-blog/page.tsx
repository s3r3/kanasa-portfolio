"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState(""); // Ringkasan untuk kartu preview

  // State untuk dynamic photo blocks (Tanpa batas maksimal)
  const [extraPhotos, setExtraPhotos] = useState<string[]>([]);

  const [mainContent, setMainContent] = useState("");

  // State untuk dynamic text/content blocks (Tanpa batas maksimal)
  const [extraSections, setExtraSections] = useState<string[]>([]);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  // Auto-generate slug dari judul
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  };

  // Fungsi Tambah Foto (Tanpa Batasan)
  const handleAddPhoto = () => {
    setExtraPhotos([...extraPhotos, ""]);
  };

  const handlePhotoChange = (index: number, value: string) => {
    const updated = [...extraPhotos];
    updated[index] = value;
    setExtraPhotos(updated);
  };

  const handleRemovePhoto = (index: number) => {
    setExtraPhotos(extraPhotos.filter((_, i) => i !== index));
  };

  // Fungsi Tambah Blok Konten Teks (Tanpa Batasan)
  const handleAddSection = () => {
    setExtraSections([...extraSections, ""]);
  };

  const handleSectionChange = (index: number, value: string) => {
    const updated = [...extraSections];
    updated[index] = value;
    setExtraSections(updated);
  };

  const handleRemoveSection = (index: number) => {
    setExtraSections(extraSections.filter((_, i) => i !== index));
  };

  const handleSubmit = (status: "draft" | "published") => {
    alert(
      `Artikel berhasil disimpan sebagai ${status === "draft" ? "Draft" : "Published"}!`,
    );
  };

  return (
    <main className="relative bg-[#efeee8] text-black min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      <div className="pt-32 md:pt-67" />

      <section className="px-6 md:px-12 max-w-4xl mx-auto pb-24">
        <div className="mb-8">
          <Link
            href="/blog-dashboard"
            className="text-xs font-mono uppercase tracking-widest text-black/50 hover:text-black"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight font-medium mt-2">
            Create New Article.
          </h1>
        </div>

        <div className="space-y-8">
          {/* 1. INFORMASI UTAMA & URL SLUG */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">
              1. General Information & Cover Photo
            </h2>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Article Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Best productivity hacks for creative freelancers"
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-serif text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                URL Slug
              </label>
              <div className="flex items-center border border-black/30 bg-white px-4 py-2 font-mono text-xs">
                <span className="text-black/40 mr-1">ref.digital/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs uppercase"
                >
                  <option value="Tech">Tech & Development</option>
                  <option value="Design">UI/UX Design</option>
                  <option value="Business">Business Strategy</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="react, tailwind, uiux"
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Main Cover Photo (URL)
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/blog-cover.jpg atau https://..."
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Excerpt / Short Summary (For Cards)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tulis ringkasan singkat yang akan muncul di kartu halaman utama..."
                className="w-full border border-black/30 p-3 bg-white outline-none focus:border-black font-serif text-sm"
              />
            </div>
          </div>

          {/* 2. KONTEN UTAMA & BLOK TANPA BATAS (UNLIMITED BLOCKS) */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">
              2. Content & Media Blocks (Unlimited)
            </h2>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Main Paragraph / Body
              </label>
              <textarea
                rows={6}
                value={mainContent}
                onChange={(e) => setMainContent(e.target.value)}
                placeholder="Write your main article content here..."
                className="w-full border border-black/30 p-4 bg-white outline-none focus:border-black font-serif text-base"
                required
              />
            </div>

            {/* DYNAMIC EXTRA PHOTO BLOCKS (Tanpa Batasan) */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Extra Photo Blocks ({extraPhotos.length} Added)
                </span>
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="border border-black px-3 py-1 text-xs font-mono uppercase bg-white hover:bg-black hover:text-white transition-colors"
                >
                  + Add Photo Block
                </button>
              </div>

              {extraPhotos.map((photoUrl, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => handlePhotoChange(idx, e.target.value)}
                    placeholder={`Extra Photo URL #${idx + 1}`}
                    className="flex-1 border border-black/30 p-3 bg-white outline-none focus:border-black font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="border border-red-600 text-red-600 px-3 py-2 text-xs font-mono uppercase hover:bg-red-600 hover:text-white transition-colors shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* DYNAMIC TEXT SECTIONS (Tanpa Batasan) */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Extra Content Paragraph Blocks ({extraSections.length} Added)
                </span>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="border border-black px-3 py-1 text-xs font-mono uppercase bg-white hover:bg-black hover:text-white transition-colors"
                >
                  + Add Section Block
                </button>
              </div>

              {extraSections.map((sec, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <textarea
                    rows={3}
                    value={sec}
                    onChange={(e) => handleSectionChange(idx, e.target.value)}
                    placeholder={`Extra paragraph block #${idx + 1}`}
                    className="flex-1 border border-black/30 p-3 bg-white outline-none focus:border-black font-serif text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(idx)}
                    className="border border-red-600 text-red-600 px-3 py-2 text-xs font-mono uppercase hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. EMBED YOUTUBE VIDEO */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">
              3. Media Embed (YouTube)
            </h2>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                YouTube Video URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=xxxxx"
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
              />
            </div>
          </div>

          {/* 4. SEO OPTIMIZATION */}
          <div className="border border-black p-6 md:p-8 bg-white/40 space-y-6">
            <h2 className="text-xl font-serif font-medium border-b border-black/20 pb-3">
              4. SEO & Metadata
            </h2>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                SEO Title (Meta Title)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Judul khusus untuk hasil pencarian Google"
                className="w-full border border-black/30 px-4 py-3 bg-white outline-none focus:border-black font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Ringkasan singkat artikel untuk Google..."
                className="w-full border border-black/30 p-3 bg-white outline-none focus:border-black font-mono text-xs"
              />
            </div>
          </div>

          {/* TOMBOL AKSI SUBMIT (DRAFT VS PUBLISH) */}
          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              className="border border-black bg-white text-black px-6 py-4 text-xs font-mono uppercase tracking-widest font-bold hover:bg-neutral-100 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("published")}
              className="bg-black text-white px-8 py-4 text-xs font-mono uppercase tracking-widest font-bold hover:bg-black/80 transition-colors shadow-lg"
            >
              Publish Article Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
