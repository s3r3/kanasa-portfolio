'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';
import { useI18nStore } from '@/store/useI18n';

export default function FoodieDetail() {
  const { t } = useI18nStore();
  const DATA = {
    hero: {
      headline: t('workDetail.foodie.headline'),
      metadata: [
        { label: t('workDetail.client'), value: 'Foodie' },
        { label: t('workDetail.industry'), value: t('work.industry.fnb') },
        { label: t('workDetail.category'), value: t('work.category.website') },
        { label: t('workDetail.code'), value: 'KAN-FDE-0226' },
      ],
      image: '/images/foodie.jpg',
    },
    brief: {
      text: t('workDetail.foodie.brief'),
      solution: t('workDetail.foodie.solution'),
    },
    stats: [
      { value: t('workDetail.foodie.stat.0.value'), label: t('workDetail.foodie.stat.0.label') },
      { value: t('workDetail.foodie.stat.1.value'), label: t('workDetail.foodie.stat.1.label') },
      { value: t('workDetail.foodie.stat.2.value'), label: t('workDetail.foodie.stat.2.label') },
    ],
    accordion: [
      { id: '01', shortTitle: t('workDetail.foodie.acc.01.short'), longTitle: t('workDetail.foodie.acc.01.long'), description: t('workDetail.foodie.acc.01.desc'), image: '/images/foodie.jpg' },
      { id: '02', shortTitle: t('workDetail.foodie.acc.02.short'), longTitle: t('workDetail.foodie.acc.02.long'), description: t('workDetail.foodie.acc.02.desc'), image: '/images/slide-2.jpg' },
      { id: '03', shortTitle: t('workDetail.foodie.acc.03.short'), longTitle: t('workDetail.foodie.acc.03.long'), description: t('workDetail.foodie.acc.03.desc'), image: '/images/slide-3.jpg' },
    ],
    startBg: '#1a1a0a',
  };
  return <WorkDetailTemplate data={DATA} />;
}
