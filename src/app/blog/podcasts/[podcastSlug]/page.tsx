import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PodcastDetailTemplate from '@/components/ui/PodcastDetailTemplate';

interface Props { params: Promise<{ podcastSlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { podcastSlug } = await params;
  const podcast = await prisma.podcast.findUnique({ where: { slug: podcastSlug } });
  if (!podcast) return {};
  return {
    title: podcast.seoTitle || podcast.title,
    description: podcast.seoDesc || podcast.description,
    openGraph: { title: podcast.title, description: podcast.description, images: [podcast.image] },
  };
}

export default async function PodcastDetailPage({ params }: Props) {
  const { podcastSlug } = await params;
  const podcast = await prisma.podcast.findUnique({ where: { slug: podcastSlug } });
  if (!podcast) notFound();

  return (
    <PodcastDetailTemplate
      title={podcast.title}
      author={podcast.author}
      duration={podcast.duration}
      image={podcast.image}
    />
  );
}
