'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';
import { useI18nStore } from '@/store/useI18n';

export default function SkillbridgeDetail() {
  const { t } = useI18nStore();
  const DATA = {
    hero: {
      headline: t('workDetail.skillbridge.headline'),
      metadata: [
        { label: t('workDetail.client'), value: 'Skillbridge' },
        { label: t('workDetail.industry'), value: t('work.industry.education') },
        { label: t('workDetail.category'), value: t('work.category.website') },
        { label: t('workDetail.code'), value: 'KAN-SKB-0126' },
      ],
      image: '/images/skillbridge.jpg',
    },
    brief: {
      text: t('workDetail.skillbridge.brief'),
      solution: t('workDetail.skillbridge.solution'),
    },
    stats: [
      { value: t('workDetail.skillbridge.stat.0.value'), label: t('workDetail.skillbridge.stat.0.label') },
      { value: t('workDetail.skillbridge.stat.1.value'), label: t('workDetail.skillbridge.stat.1.label') },
      { value: t('workDetail.skillbridge.stat.2.value'), label: t('workDetail.skillbridge.stat.2.label') },
    ],
    accordion: [
      { id: '01', shortTitle: t('workDetail.skillbridge.acc.01.short'), longTitle: t('workDetail.skillbridge.acc.01.long'), description: t('workDetail.skillbridge.acc.01.desc'), image: '/images/skillbridge.jpg' },
      { id: '02', shortTitle: t('workDetail.skillbridge.acc.02.short'), longTitle: t('workDetail.skillbridge.acc.02.long'), description: t('workDetail.skillbridge.acc.02.desc'), image: '/images/slide-2.jpg' },
      { id: '03', shortTitle: t('workDetail.skillbridge.acc.03.short'), longTitle: t('workDetail.skillbridge.acc.03.long'), description: t('workDetail.skillbridge.acc.03.desc'), image: '/images/slide-3.jpg' },
    ],
    startBg: '#0a1a0a',
  };
  return <WorkDetailTemplate data={DATA} />;
}
