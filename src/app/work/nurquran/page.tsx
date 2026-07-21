'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';
import { useI18nStore } from '@/store/useI18n';

export default function NurQuranDetail() {
  const { t } = useI18nStore();
  const DATA = {
    hero: {
      headline: t('workDetail.nurquran.headline'),
      metadata: [
        { label: t('workDetail.client'), value: 'NurQuran' },
        { label: t('workDetail.industry'), value: t('work.industry.islamic') },
        { label: t('workDetail.category'), value: t('work.category.mobile') },
        { label: t('workDetail.code'), value: 'KAN-NQA-0426' },
      ],
      image: '/images/nurquran.jpg',
    },
    brief: {
      text: t('workDetail.nurquran.brief'),
      solution: t('workDetail.nurquran.solution'),
    },
    stats: [
      { value: t('workDetail.nurquran.stat.0.value'), label: t('workDetail.nurquran.stat.0.label') },
      { value: t('workDetail.nurquran.stat.1.value'), label: t('workDetail.nurquran.stat.1.label') },
      { value: t('workDetail.nurquran.stat.2.value'), label: t('workDetail.nurquran.stat.2.label') },
    ],
    accordion: [
      { id: '01', shortTitle: t('workDetail.nurquran.acc.01.short'), longTitle: t('workDetail.nurquran.acc.01.long'), description: t('workDetail.nurquran.acc.01.desc'), image: '/images/nurquran.jpg' },
      { id: '02', shortTitle: t('workDetail.nurquran.acc.02.short'), longTitle: t('workDetail.nurquran.acc.02.long'), description: t('workDetail.nurquran.acc.02.desc'), image: '/images/slide-2.jpg' },
      { id: '03', shortTitle: t('workDetail.nurquran.acc.03.short'), longTitle: t('workDetail.nurquran.acc.03.long'), description: t('workDetail.nurquran.acc.03.desc'), image: '/images/slide-3.jpg' },
      { id: '04', shortTitle: t('workDetail.nurquran.acc.04.short'), longTitle: t('workDetail.nurquran.acc.04.long'), description: t('workDetail.nurquran.acc.04.desc'), image: '/images/slide-4.jpg' },
    ],
    startBg: '#0d1b2a',
  };
  return <WorkDetailTemplate data={DATA} />;
}
