'use client';

import { useParams } from 'next/navigation';
import PodcastDetailTemplate from '@/components/ui/PodcastDetailTemplate';

const PODCASTS = [
  {
    slug: 'podcast-design-digital-age',
    title: 'How design is changing in the digital age',
    author: 'William Parker',
    duration: '1hr 25min',
    image: '/images/podcast-1.jpg',
  },
  {
    slug: 'podcast-remote-revolution',
    title: 'The remote revolution &ndash; rethinking work and culture',
    author: 'William Parker',
    duration: '3hr 06min',
    image: '/images/podcast-2.jpg',
  },
  {
    slug: 'remote-revolution',
    title: 'The remote revolution &ndash; rethinking work and culture',
    author: 'William Parker',
    duration: '3hr 06min',
    image: '/images/podcast-featured.jpg',
  },
  {
    slug: 'education-connected-world',
    title: 'Education in a connected world',
    author: 'Emily Johnson',
    duration: '2hr 23min',
    image: '/images/podcast-2.jpg',
  },
];

export default function PodcastDetailPage() {
  const params = useParams();
  const slug = params?.podcastSlug as string;
  const podcast = PODCASTS.find((p) => p.slug === slug);

  if (!podcast) return null;

  return (
    <PodcastDetailTemplate
      title={podcast.title}
      author={podcast.author}
      duration={podcast.duration}
      image={podcast.image}
    />
  );
}
