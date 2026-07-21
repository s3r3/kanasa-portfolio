'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Restaurant management & reservation system',
    metadata: [
      { label: 'CLIENT', value: 'Qitchen' },
      { label: 'INDUSTRY', value: 'Food & Beverage' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'CODE', value: 'KAN-QTC-0726' },
    ],
    image: '/images/qitchen.jpg',
  },
  brief: {
    text: 'Qitchen aims to streamline restaurant operations with a modern web application for table reservations, menu management, and customer engagement.',
    solution:
      'We developed a Next.js application with an interactive reservation system, menu builder, and customer management tools — all wrapped in a warm, inviting design.',
  },
  stats: [
    { value: '0', label: 'GitHub Stars' },
    { value: 'Clean', label: 'UI Design' },
    { value: 'Fast', label: 'Performance' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'TABLE RESERVATIONS',
      longTitle: 'Book with ease',
      description:
        'Interactive reservation system with real-time table availability. Customers can browse time slots and book instantly.',
      image: '/images/qitchen.jpg',
    },
    {
      id: '02',
      shortTitle: 'MENU MANAGEMENT',
      longTitle: 'Digital menu builder',
      description:
        'Easily manage menu items, categories, pricing, and specials. Changes reflect instantly on the customer-facing menu.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'CUSTOMER ENGAGEMENT',
      longTitle: 'Build relationships',
      description:
        'Customer profiles, visit history, and preference tracking help restaurants deliver personalized experiences.',
      image: '/images/slide-3.jpg',
    },
  ],
  startBg: '#1a0d0a',
};

export default function QitchenDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
