'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';
import { useI18nStore } from '@/store/useI18n';

export default function QitchenDetail() {
  const { t } = useI18nStore();
  const DATA = {
    hero: {
      headline: t('workDetail.qitchen.headline'),
      metadata: [
        { label: t('workDetail.client'), value: 'Qitchen' },
        { label: t('workDetail.industry'), value: t('work.industry.fnb') },
        { label: t('workDetail.category'), value: t('work.category.website') },
        { label: t('workDetail.code'), value: 'KAN-QTC-0726' },
      ],
      image: '/images/qitchen.jpg',
    },
    brief: {
      text: t('workDetail.qitchen.brief'),
      solution: t('workDetail.qitchen.solution'),
    },
    stats: [
      { value: t('workDetail.qitchen.stat.0.value'), label: t('workDetail.qitchen.stat.0.label') },
      { value: t('workDetail.qitchen.stat.1.value'), label: t('workDetail.qitchen.stat.1.label') },
      { value: t('workDetail.qitchen.stat.2.value'), label: t('workDetail.qitchen.stat.2.label') },
    ],
    accordion: [
      { id: '01', shortTitle: t('workDetail.qitchen.acc.01.short'), longTitle: t('workDetail.qitchen.acc.01.long'), description: t('workDetail.qitchen.acc.01.desc'), image: '/images/qitchen.jpg' },
      { id: '02', shortTitle: t('workDetail.qitchen.acc.02.short'), longTitle: t('workDetail.qitchen.acc.02.long'), description: t('workDetail.qitchen.acc.02.desc'), image: '/images/slide-2.jpg' },
      { id: '03', shortTitle: t('workDetail.qitchen.acc.03.short'), longTitle: t('workDetail.qitchen.acc.03.long'), description: t('workDetail.qitchen.acc.03.desc'), image: '/images/slide-3.jpg' },
    ],
    startBg: '#1a0d0a',
  };
  return <WorkDetailTemplate data={DATA} />;
}
