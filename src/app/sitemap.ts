import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kanasacreative.com';

  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const podcasts = await prisma.podcast.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/all`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog/podcast`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
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
