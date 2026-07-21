'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'E-commerce app with visual search capabilities',
    metadata: [
      { label: 'CLIENT', value: 'Vrada' },
      { label: 'INDUSTRY', value: 'Retail' },
      { label: 'CATEGORY', value: 'Mobile App' },
      { label: 'CODE', value: 'KAN-VRD-0326' },
    ],
    image: '/images/vrada.jpg',
  },
  brief: {
    text: 'VRADA is a React Native e-commerce application that uses visual search to help users find products by taking photos. The challenge was building a seamless shopping experience with AI-powered image recognition.',
    solution:
      'Built with Expo and React Native, featuring camera integration, image recognition for product search, social authentication, and a complete product browsing experience with NativeWind styling.',
  },
  stats: [
    { value: '1', label: 'Release' },
    { value: 'Visual', label: 'Search' },
    { value: 'Cross', label: 'Platform' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'VISUAL SEARCH',
      longTitle: 'Snap to find',
      description:
        'Take a photo of any item and VRADA finds similar products. Image recognition powered by camera integration makes shopping as simple as pointing your phone.',
      image: '/images/vrada.jpg',
    },
    {
      id: '02',
      shortTitle: 'PRODUCT BROWSING',
      longTitle: 'Browse with ease',
      description:
        'Full product catalog with categories, search, and detailed product views. Add to cart and checkout with a smooth, native-feeling interface.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'AUTHENTICATION',
      longTitle: 'Social login',
      description:
        'Multiple authentication options including social login make sign-up and sign-in effortless.',
      image: '/images/slide-3.jpg',
    },
  ],
  startBg: '#0a0a1a',
};

export default function VradaDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
