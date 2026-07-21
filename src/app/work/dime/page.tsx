'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Modernizing an iconic streetwear brand for the digital age',
    metadata: [
      { label: 'CLIENT', value: 'DIME' },
      { label: 'INDUSTRY', value: 'Retail & Consumer Goods' },
      { label: 'CATEGORY', value: 'E-Commerce' },
      { label: 'KAN', value: 'PDM-1025' },
    ],
    image: '/images/dime-hero.jpg',
  },
  brief: {
    text: 'DIME needed more than a refresh. They needed a platform that matched their influence in streetwear — fast, bold, and uncompromising. We rebuilt the DIME online store from the ground up with a focus on mobile-first performance, immersive product storytelling, and a checkout flow that converts.',
    solution:
      'The result is a digital flagship that feels as considered as their drops. We engineered a headless Shopify architecture paired with a custom front-end that delivers sub-second page loads, seamless inventory sync, and a shopping experience that captures the energy of each limited drop.',
  },
  stats: [
    { value: '$2.4M', label: 'Revenue Lift in First Quarter' },
    { value: '180%', label: 'Mobile Conversion Rate Increase' },
    { value: '4.8s', label: 'Average Page Load Time' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'MOBILE-FIRST, CULTURE-FIRST PERFORMANCE',
      longTitle: 'Speed as a brand value',
      description:
        'Streetwear drops are won in milliseconds. We optimized every byte — from font loading to image delivery — ensuring DIME\'s mobile experience outpaces competitors. The result: a store that feels instant even on congested cellular networks during peak drop moments.',
      image: '/images/dime-mockup-1.jpg',
    },
    {
      id: '02',
      shortTitle: 'PRODUCT STORYTELLING THAT CONVERTS',
      longTitle: 'Narrative-driven commerce',
      description:
        'Each DIME collection tells a story. We designed dynamic product pages that blend editorial content with commerce, using cinematic hero treatments, lookbooks, and size guides that feel native to the brand rather than bolted-on e-commerce conventions.',
      image: '/images/dime-green.jpg',
    },
    {
      id: '03',
      shortTitle: 'CHECKOUT OPTIMIZED FOR THE DROP',
      longTitle: 'From cart to confirmation in seconds',
      description:
        'During limited drops, every second of friction costs revenue. We stripped the checkout to its essentials — guest checkout, saved payment profiles, one-tap purchase — cutting the average transaction time by more than half while maintaining full fraud protection.',
      image: '/images/dime-mockup-2.jpg',
    },
    {
      id: '04',
      shortTitle: 'HEADLESS ARCHITECTURE, SEAMLESS SCALE',
      longTitle: 'Enterprise backbone, brand-front soul',
      description:
        'We decoupled Shopify\'s commerce engine from a custom Next.js front-end, giving DIME full creative control over their brand expression without sacrificing the operational power of Shopify\'s fulfillment, inventory, and CMS ecosystems.',
      image: '/images/dime-mockup-3.jpg',
    },
  ],
  startBg: '#0f1a0f',
};

export default function DimeDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
