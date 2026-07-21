'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Food delivery platform with seamless ordering experience',
    metadata: [
      { label: 'CLIENT', value: 'Foodie' },
      { label: 'INDUSTRY', value: 'Food & Beverage' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'CODE', value: 'KAN-FDE-0226' },
    ],
    image: '/images/foodie.jpg',
  },
  brief: {
    text: 'Foodie needed a modern food delivery platform that connects customers with their favorite local restaurants. The goal was a fast, intuitive ordering experience that works seamlessly across devices.',
    solution:
      'We built a Next.js platform with a clean, card-based interface for browsing restaurants and menu items. Real-time order tracking, restaurant dashboards, and a streamlined checkout flow make ordering as easy as a few taps.',
  },
  stats: [
    { value: '1', label: 'GitHub Stars' },
    { value: 'Fast', label: 'Page Load' },
    { value: 'Responsive', label: 'All Devices' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'BROWSE & DISCOVER',
      longTitle: 'Find your next meal',
      description:
        'Restaurant listing with categories, search, and filter options. Each restaurant page features menu browsing, item customization, and easy add-to-cart functionality.',
      image: '/images/foodie.jpg',
    },
    {
      id: '02',
      shortTitle: 'SEAMLESS ORDERING',
      longTitle: 'From cart to delivery',
      description:
        'Real-time cart management, order placement, and delivery tracking. The checkout flow is optimized for speed with address autocomplete and multiple payment options.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'RESTAURANT DASHBOARD',
      longTitle: 'Manage your menu',
      description:
        'Restaurant partners get a dedicated dashboard to manage their menu, view orders, and update availability in real-time.',
      image: '/images/slide-3.jpg',
    },
  ],
  startBg: '#1a1a0a',
};

export default function FoodieDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
