import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

// ponytail: try/catch karena sitemap dipanggil di build time, DB belum tentu ready
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kanasacreative.com';
  const now = new Date();

  let blogs: { slug: string; updatedAt: Date }[] = [];
  let podcasts: { slug: string; updatedAt: Date }[] = [];

  try {
    [blogs, podcasts] = await Promise.all([
      prisma.blog.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.podcast.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);
  } catch {
    // DB not ready yet — just return static pages
  }

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/all`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog/podcast`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    ...blogs.map(b => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...podcasts.map(p => ({
      url: `${baseUrl}/blog/podcasts/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
