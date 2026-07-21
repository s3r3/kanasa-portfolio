'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Shaping the future of education for the next generation',
    metadata: [
      { label: 'CLIENT', value: 'Mission 2035' },
      { label: 'INDUSTRY', value: 'Health & Education' },
      { label: 'CATEGORY', value: 'Website' },
      { label: 'CODE', value: 'PHM-0524' },
    ],
    image: '/images/mission.jpg',
  },
  brief: {
    text: 'Mission 2035 is a bold initiative reimagining how we prepare young people for the challenges of tomorrow. They needed a digital platform that makes educational futures tangible for students, parents, and educators while housing rich research, interactive tools, and regional program data.',
    solution:
      'We designed a data-driven platform that translates complex research into clear, actionable pathways. Interactive program finders, regional impact dashboards, and student success stories make the future feel not just imaginable — but reachable.',
  },
  stats: [
    { value: '10,000+', label: 'Students Engaged' },
    { value: '250', label: 'Partner Schools' },
    { value: '89%', label: 'Program Growth YoY' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'MAKING RESEARCH ACTIONABLE',
      longTitle: 'From data to decisions',
      description:
        'We transformed dense research reports into interactive visual narratives — heat maps of opportunity gaps, timelines of program outcomes, and personalized pathway builders that let families explore what the future could look like for their child.',
      image: '/images/websites.jpg',
    },
    {
      id: '02',
      shortTitle: 'REGIONAL INSIGHT AT A GLANCE',
      longTitle: 'Dashboards that drive change',
      description:
        'Each region gets its own living dashboard — enrollment rates, funding allocations, program milestones — giving school boards and policymakers the tools they need to make informed decisions in real time.',
      image: '/images/slide-5.jpg',
    },
    {
      id: '03',
      shortTitle: 'STUDENT STORIES THAT INSPIRE',
      longTitle: 'Putting faces to the future',
      description:
        'We built a modular storytelling system that elevates student and educator voices through video, photography, and written narratives — turning abstract program goals into relatable human impact.',
      image: '/images/mobile.jpg',
    },
    {
      id: '04',
      shortTitle: 'DESIGNED FOR EQUITABLE ACCESS',
      longTitle: 'Low-bandwidth, high-impact',
      description:
        'Accessibility was non-negotiable. The platform is fully WCAG compliant, optimized for low-bandwidth regions, and available in multiple languages — ensuring no community is left behind in the mission.',
      image: '/images/ecommerce.jpg',
    },
  ],
  startBg: '#001529',
};

export default function Mission2035Detail() {
  return <WorkDetailTemplate data={DATA} />;
}
