'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Personal branding & portfolio website',
    metadata: [
      { label: 'CLIENT', value: 'SethMilot' },
      { label: 'INDUSTRY', value: 'Creative Services' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'CODE', value: 'KAN-SMT-0126' },
    ],
    image: '/images/sethmilot.jpg',
  },
  brief: {
    text: 'SethMilot needed a personal brand website that showcases his work and personality. The goal was a clean, modern portfolio that stands out and leaves a lasting impression.',
    solution:
      'We built a responsive Next.js portfolio with a focus on typography, whitespace, and smooth interactions. The site features project showcases, skill highlights, and a contact flow.',
  },
  stats: [
    { value: '1', label: 'GitHub Stars' },
    { value: 'Clean', label: 'Design' },
    { value: 'Responsive', label: 'All Screens' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'PROJECT SHOWCASE',
      longTitle: 'Work that speaks',
      description:
        'Each project is presented with high-quality imagery, detailed case studies, and key outcomes — turning a simple portfolio into a compelling narrative.',
      image: '/images/sethmilot.jpg',
    },
    {
      id: '02',
      shortTitle: 'SKILL HIGHLIGHTS',
      longTitle: 'Expertise at a glance',
      description:
        'A clean, scannable skills section that communicates technical proficiency and creative capabilities immediately.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'CONTACT & CONNECT',
      longTitle: 'Get in touch',
      description:
        'A friction-free contact section with social links and a contact form, making it easy for potential clients to reach out.',
      image: '/images/slide-3.jpg',
    },
  ],
  startBg: '#0a0d1a',
};

export default function SethMilotDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
