'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'The art of wine conservation, reimagined for the modern cellar',
    metadata: [
      { label: 'CLIENT', value: 'CellArt' },
      { label: 'INDUSTRY', value: 'Retail & Consumer Goods' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'REF', value: 'PCA-0325' },
    ],
    image: '/images/cellart.jpg',
  },
  brief: {
    text: 'CellArt needed a digital presence that reflected the precision and elegance of their wine conservation systems. Their existing site undersold the craftsmanship behind their technology — we were tasked with building a showcase that conveys technical authority and aesthetic sophistication in equal measure.',
    solution:
      'We created an immersive, content-rich website that pairs cinematic product photography with clear technical storytelling. A modular component library allows CellArt\'s team to launch new product lines and editorial features without engineering support.',
  },
  stats: [
    { value: '150+', label: 'Products Launched' },
    { value: '40+', label: 'Countries with Distributors' },
    { value: '99.8%', label: 'Client Satisfaction Rate' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'CRAFT MEETS TECHNOLOGY',
      longTitle: 'Precision in every pixel',
      description:
        'We drew visual inspiration from CellArt\'s own engineering — clean lines, brushed materials, and a restrained palette that lets the product photography lead. Every page feels like a tasting room visit.',
      image: '/images/slide-1.jpg',
    },
    {
      id: '02',
      shortTitle: 'PRODUCT STORYTELLING AT SCALE',
      longTitle: 'A catalogue that reads like editorial',
      description:
        'Rather than a flat product grid, we designed a browse experience organized by collection, material, and use case. Each product page layers specs, lifestyle imagery, and technical drawings into a scannable narrative.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'TAILORED TO A GLOBAL AUDIENCE',
      longTitle: 'Multi-region, multi-language, one brand',
      description:
        'With distributors in 40+ countries, the site needed to scale across languages and currencies without fragmenting the brand. We built a locale-aware CMS that keeps content consistent globally.',
      image: '/images/slide-3.jpg',
    },
    {
      id: '04',
      shortTitle: 'DESIGNED FOR THE LONG FINISH',
      longTitle: 'A platform that ages gracefully',
      description:
        'We chose a technology stack that prioritizes longevity and performance — static generation for marketing pages, dynamic queries for inventory — so the site stays fast and current for years, not months.',
      image: '/images/slide-4.jpg',
    },
  ],
  startBg: '#1a0a0a',
};

export default function CellartDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
