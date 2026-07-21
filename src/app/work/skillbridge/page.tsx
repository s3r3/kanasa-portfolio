'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Skill-based job matching platform',
    metadata: [
      { label: 'CLIENT', value: 'Skillbridge' },
      { label: 'INDUSTRY', value: 'Education & HR' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'CODE', value: 'KAN-SKB-0126' },
    ],
    image: '/images/skillbridge.jpg',
  },
  brief: {
    text: 'Skillbridge connects job seekers with opportunities based on their skills rather than job titles. The platform needed a clean, modern interface that makes the matching process intuitive and effective.',
    solution:
      'Built with Next.js, the platform features skill-based search and matching, user profiles with portfolio integration, and a responsive design that works across all devices.',
  },
  stats: [
    { value: '1', label: 'GitHub Stars' },
    { value: 'Smart', label: 'Matching' },
    { value: 'Modern', label: 'Stack' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'SKILL-BASED MATCHING',
      longTitle: 'Match by ability, not title',
      description:
        'Advanced matching algorithm that connects candidates to opportunities based on validated skills, experience, and career goals — not just job titles.',
      image: '/images/skillbridge.jpg',
    },
    {
      id: '02',
      shortTitle: 'USER PROFILES',
      longTitle: 'Showcase your skills',
      description:
        'Rich user profiles with skill endorsements, portfolio integration, and work history help candidates stand out to employers.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'MODERN DESIGN',
      longTitle: 'Clean and responsive',
      description:
        'Built with Next.js and Tailwind CSS for a fast, accessible experience on desktop and mobile.',
      image: '/images/slide-3.jpg',
    },
  ],
  startBg: '#0a1a0a',
};

export default function SkillbridgeDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
