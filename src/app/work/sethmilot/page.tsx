'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';
import { useI18nStore } from '@/store/useI18n';

export default function SethMilotDetail() {
  const { t } = useI18nStore();
  const DATA = {
    hero: {
      headline: t('workDetail.sethmilot.headline'),
      metadata: [
        { label: t('workDetail.client'), value: 'SethMilot' },
        { label: t('workDetail.industry'), value: t('work.industry.creative') },
        { label: t('workDetail.category'), value: t('work.category.website') },
        { label: t('workDetail.code'), value: 'KAN-SMT-0126' },
      ],
      image: '/images/sethmilot.jpg',
    },
    brief: {
      text: t('workDetail.sethmilot.brief'),
      solution: t('workDetail.sethmilot.solution'),
    },
    stats: [
      { value: t('workDetail.sethmilot.stat.0.value'), label: t('workDetail.sethmilot.stat.0.label') },
      { value: t('workDetail.sethmilot.stat.1.value'), label: t('workDetail.sethmilot.stat.1.label') },
      { value: t('workDetail.sethmilot.stat.2.value'), label: t('workDetail.sethmilot.stat.2.label') },
    ],
    accordion: [
      { id: '01', shortTitle: t('workDetail.sethmilot.acc.01.short'), longTitle: t('workDetail.sethmilot.acc.01.long'), description: t('workDetail.sethmilot.acc.01.desc'), image: '/images/sethmilot.jpg' },
      { id: '02', shortTitle: t('workDetail.sethmilot.acc.02.short'), longTitle: t('workDetail.sethmilot.acc.02.long'), description: t('workDetail.sethmilot.acc.02.desc'), image: '/images/slide-2.jpg' },
      { id: '03', shortTitle: t('workDetail.sethmilot.acc.03.short'), longTitle: t('workDetail.sethmilot.acc.03.long'), description: t('workDetail.sethmilot.acc.03.desc'), image: '/images/slide-3.jpg' },
    ],
    startBg: '#0a0d1a',
  };
  return <WorkDetailTemplate data={DATA} />;
}
