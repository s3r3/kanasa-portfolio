'use client';

import WorkDetailTemplate from '@/components/ui/WorkDetailTemplate';
import { useI18nStore } from '@/store/useI18n';

export default function VradaDetail() {
  const { t } = useI18nStore();
  const DATA = {
    hero: {
      headline: t('workDetail.vrada.headline'),
      metadata: [
        { label: t('workDetail.client'), value: 'Vrada' },
        { label: t('workDetail.industry'), value: t('work.industry.retail') },
        { label: t('workDetail.category'), value: t('work.category.mobile') },
        { label: t('workDetail.code'), value: 'KAN-VRD-0326' },
      ],
      image: '/images/vrada.jpg',
    },
    brief: {
      text: t('workDetail.vrada.brief'),
      solution: t('workDetail.vrada.solution'),
    },
    stats: [
      { value: t('workDetail.vrada.stat.0.value'), label: t('workDetail.vrada.stat.0.label') },
      { value: t('workDetail.vrada.stat.1.value'), label: t('workDetail.vrada.stat.1.label') },
      { value: t('workDetail.vrada.stat.2.value'), label: t('workDetail.vrada.stat.2.label') },
    ],
    accordion: [
      { id: '01', shortTitle: t('workDetail.vrada.acc.01.short'), longTitle: t('workDetail.vrada.acc.01.long'), description: t('workDetail.vrada.acc.01.desc'), image: '/images/vrada.jpg' },
      { id: '02', shortTitle: t('workDetail.vrada.acc.02.short'), longTitle: t('workDetail.vrada.acc.02.long'), description: t('workDetail.vrada.acc.02.desc'), image: '/images/slide-2.jpg' },
      { id: '03', shortTitle: t('workDetail.vrada.acc.03.short'), longTitle: t('workDetail.vrada.acc.03.long'), description: t('workDetail.vrada.acc.03.desc'), image: '/images/slide-3.jpg' },
    ],
    startBg: '#0a0a1a',
  };
  return <WorkDetailTemplate data={DATA} />;
}
