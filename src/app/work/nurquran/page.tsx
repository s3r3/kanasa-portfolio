'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';

const DATA = {
  hero: {
    headline:
      'Quran reader with prayer times, fasting calendar & audio — all offline',
    metadata: [
      { label: 'CLIENT', value: 'NurQuran' },
      { label: 'INDUSTRY', value: 'Islamic Technology' },
      { label: 'CATEGORY', value: 'Mobile App' },
      { label: 'CODE', value: 'KAN-NQA-0426' },
    ],
    image: '/images/nurquran.jpg',
  },
  brief: {
    text: 'NurQuran was built to provide a seamless Quran reading experience combined with practical Islamic tools — prayer times, fasting calendar, and full surah audio — all accessible offline. The challenge was delivering a rich, reliable experience on mobile without constant internet access.',
    solution:
      'We built a hybrid online/offline architecture using Expo & React Native, with SQLite background import from the Quran API. The app features surah listing with Indonesian & English translations, verse bookmarking with custom collections, location-based prayer times via AlAdhan API, and a full surah audio player with multiple Qari options.',
  },
  stats: [
    { value: '1+', label: 'GitHub Stars' },
    { value: '100+', label: 'Surahs Available' },
    { value: 'Offline', label: 'Full Quran Support' },
  ],
  accordion: [
    {
      id: '01',
      shortTitle: 'QURAN READER WITH TRANSLATIONS',
      longTitle: 'Read, share, bookmark',
      description:
        'The core reading experience features verse-by-verse display with Indonesian and English translations. Users can share verses, bookmark individual ayahs, organize them into collections, and search across the entire Quran.',
      image: '/images/nurquran.jpg',
    },
    {
      id: '02',
      shortTitle: 'PRAYER TIMES & FASTING CALENDAR',
      longTitle: 'Daily Islamic companion',
      description:
        'Prayer times are calculated based on location via the AlAdhan API with daily cache. The app includes a countdown to the next prayer, 15-minute pre-notification, and a full Islamic calendar with fasting events.',
      image: '/images/slide-2.jpg',
    },
    {
      id: '03',
      shortTitle: 'AUDIO WITH MULTIPLE QARI',
      longTitle: 'Full surah playback',
      description:
        'Multiple Qari options for verse-by-verse or full surah playback. The audio player includes mini-player controls, fallback across Qari sources, and full surah sequential mode.',
      image: '/images/slide-3.jpg',
    },
    {
      id: '04',
      shortTitle: 'OFFLINE-FIRST ARCHITECTURE',
      longTitle: 'Works without internet',
      description:
        'The entire Quran text and translations are imported into SQLite on first launch. After the initial download, all reading features work completely offline.',
      image: '/images/slide-4.jpg',
    },
  ],
  startBg: '#0d1b2a',
};

export default function NurQuranDetail() {
  return <WorkDetailTemplate data={DATA} />;
}
