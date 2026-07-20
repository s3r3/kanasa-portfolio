'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Building trust to propel a new player in dental care',
    metadata: [
      { label: 'CLIENT', value: 'Halo Dental' },
      { label: 'INDUSTRY', value: 'Professional Services' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'REF', value: 'PHD-0524' },
    ],
    image: '/images/halo-monster.jpg',
  },
  brief: {
    text: 'Halo Dental entered a competitive market needing a digital-first brand that inspires confidence from the first click. As a new player in dentistry, their website had to do more than inform — it had to build trust, differentiate their patient experience, and drive appointment bookings.',
    solution:
      'We combined clean clinical aesthetics with warm, approachable design to humanize dental care. Patient journey maps informed every section, from the anxiety-aware booking flow to the educational content that positions Halo as a partner in oral health, not just a service provider.',
  },
  stats: [
    { value: '98%', label: 'Patient Satisfaction Score' },
    { value: '15', label: 'Locations Opened' },
    { value: '4.9★', label: 'Average Online Rating' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'A BRAND THAT PUTS PATIENTS AT EASE',
      longTitle: 'Designing for dental confidence',
      description:
        'We avoided clinical sterility in favor of warm neutrals, soft curves, and genuine photography. The visual language communicates professionalism without intimidation — a deliberate choice for an industry that often triggers anxiety.',
      image: '/images/halo.jpg',
    },
    {
      id: '02',
      shortTitle: 'BOOKING THAT DOESN\'T HURT',
      longTitle: 'Anxiety-aware appointment flow',
      description:
        'The booking experience was designed around patient psychology — clear procedure descriptions, transparent pricing, and the ability to select a provider by personality and specialization. No surprises, no friction.',
      image: '/images/websites.jpg',
    },
    {
      id: '03',
      shortTitle: 'EDUCATION AS A SERVICE',
      longTitle: 'Content that builds authority',
      description:
        'We created a dental health resource hub with video guides, procedure explainers, and post-care instructions — helping Halo become a trusted reference even for patients who aren\'t yet ready to book.',
      image: '/images/ecommerce.jpg',
    },
    {
      id: '04',
      shortTitle: 'SCALING WITHOUT SACRIFICING LOCAL',
      longTitle: 'One brand, many neighbourhoods',
      description:
        'As Halo expands, each location gets its own microsite within the platform — local team bios, community content, and localized SEO — while sharing the same brand system, booking engine, and CMS.',
      image: '/images/mobile.jpg',
    },
  ],
  startBg: '#0a1f2e',
};

export default function HaloDentalDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
