'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Harnessing real-time data to create the ultimate prevention tool',
    metadata: [
      { label: 'CLIENT', value: 'Sopfeu' },
      { label: 'INDUSTRY', value: 'Public & Social Sector' },
      { label: 'CATEGORY', value: 'Mobile App, Website' },
      { label: 'CODE', value: 'PSF-0325' },
    ],
    image: '/images/sopfeu-hero.jpg',
  },
  brief: {
    text: 'With forest fires increasing in frequency and severity, SOPFEU needed to modernize its digital ecosystem to better inform, educate, and protect the population. We were tasked with completely redesigning their website and mobile app, creating a unified platform capable of handling extreme traffic spikes during crises.',
    solution:
      'We developed a robust, scalable architecture centered around a highly performant, real-time interactive map. By structuring complex telemetry data into intuitive visual layers, we transformed an informational portal into an essential survival tool.',
  },
  stats: [
    { value: '400,000+', label: 'App Downloads in Year 1' },
    { value: '80%', label: 'Faster Map Load Times' },
    { value: '10x', label: 'Traffic Capacity Improvement' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'TURNING TONS OF LIVE DATA INTO ONE INTUITIVE MAP',
      longTitle: 'Designing for the extreme',
      description:
        'Architecting a rapid-loading map of provincial fire activity was a significant technical feat, but visual clarity was the true challenge. We engineered a "worst-case scenario" UX to maintain legibility when multiple data layers (smoke, lightning, fire perimeters) overlap. Stress-testing these extremes led to a visual language of distinct patterns and icons that instantly communicate urgency on any screen size.',
      image: '/images/sopfeu-map.jpg',
    },
    {
      id: '02',
      shortTitle: 'STRUCTURED DATA FOR AUTOMATED COMMUNICATIONS',
      longTitle: 'Same data, different views',
      description:
        'By reusing the same structured data pipeline for both the map and the Current Situation Status Report, we ensured a "single source of truth" across the ecosystem. This allows us to transform complex telemetry into a highly readable, automated interface, drastically reducing the time it takes to deliver accurate information to the public, media, and partners.',
      image: '/images/sopfeu-dashboard.jpg',
    },
    {
      id: '03',
      shortTitle: 'FROM PASSIVE BROWSING TO PROACTIVE PROTECTION',
      longTitle: 'Empowering the public',
      description:
        'We shifted the paradigm from a purely informational tool to a proactive protection system. By integrating push notifications and location-based alerts directly into the mobile experience, citizens are no longer just browsing data; they are actively safeguarded by it.',
      image: '/images/sopfeu-mobile.jpg',
    },
    {
      id: '04',
      shortTitle: 'MEETING CITIZENS WHERE THEY ARE',
      longTitle: 'Accessible urgency',
      description:
        'Information is only as good as its accessibility. We designed the interface to be WCAG compliant and highly optimized for low-bandwidth scenarios, ensuring that critical fire data reaches citizens even in remote areas with poor connectivity.',
      image: '/images/sopfeu-widgets.jpg',
    },
  ],
  startBg: '#04142b',
};

export default function SopfeuDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
