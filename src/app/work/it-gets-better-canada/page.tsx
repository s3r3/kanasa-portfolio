'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Empowering LGBTQ+ youth through connection and community',
    metadata: [
      { label: 'CLIENT', value: 'It Gets Better Canada' },
      { label: 'INDUSTRY', value: 'Health & Education' },
      { label: 'CATEGORY', value: 'Mobile App' },
      { label: 'CODE', value: 'PGL-0925' },
    ],
    image: '/images/igbc.jpg',
  },
  brief: {
    text: 'It Gets Better Canada needed a digital safe space that connects LGBTQ+ youth with resources, mentors, and peer support — wherever they are. The challenge was to design an app that feels welcoming, private, and empowering while navigating the sensitive safety requirements of a youth-facing platform.',
    solution:
      'We designed a mobile-first experience centered around private community spaces, curated resource directories, and anonymous peer matching. Every interaction was built with trauma-informed design principles, ensuring the app feels gentle, affirming, and safe from the first tap.',
  },
  stats: [
    { value: '50,000+', label: 'Youth Reached in Year 1' },
    { value: '92%', label: 'User Satisfaction Score' },
    { value: '500+', label: 'Community Resources Listed' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'A SAFE SPACE DESIGNED WITH CARE',
      longTitle: 'Trauma-informed from the ground up',
      description:
        'Every design decision — from the muted color palette to the non-intrusive onboarding flow — was guided by trauma-informed principles. Users control their visibility, notification preferences, and data at every step.',
      image: '/images/mobile.jpg',
    },
    {
      id: '02',
      shortTitle: 'PEER CONNECTION, PRIVATELY',
      longTitle: 'Matching that puts safety first',
      description:
        'The peer matching system uses interest-based pairing with optional anonymity, allowing youth to find community on their own terms. Moderated chat rooms and reporting tools keep the space welcoming.',
      image: '/images/kid-bike.jpg',
    },
    {
      id: '03',
      shortTitle: 'CURATED RESOURCES AT THEIR FINGERTIPS',
      longTitle: 'Help when it\'s needed most',
      description:
        'A searchable directory of vetted resources — from mental health support to local community centers — is organized by category and urgency, ensuring critical help is never more than three taps away.',
      image: '/images/julie.jpg',
    },
    {
      id: '04',
      shortTitle: 'BUILT FOR SCALE, RUN ON TRUST',
      longTitle: 'Sustainable impact architecture',
      description:
        'We built the platform on a scalable cloud infrastructure with end-to-end encryption, automated content moderation, and analytics that help IGBC understand community needs while protecting user privacy.',
      image: '/images/experiential.jpg',
    },
  ],
  startBg: '#2d0a4c',
};

export default function IgbcDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
