export interface Project {
  id: string;
  title: string;
  description: string;
  code: string;
  image: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'NURQURAN',
    description: 'QURAN READER WITH PRAYER TIMES, FASTING CALENDAR & AUDIO',
    code: 'KAN-NQA-0426',
    image: '/images/nurquran.jpg',
  },
  {
    id: '2',
    title: 'FOODIE',
    description: 'FOOD DELIVERY PLATFORM WITH SEAMLESS ORDERING EXPERIENCE',
    code: 'KAN-FDE-0226',
    image: '/images/foodie.jpg',
  },
  {
    id: '3',
    title: 'QITCHEN',
    description: 'RESTAURANT MANAGEMENT & RESERVATION SYSTEM',
    code: 'KAN-QTC-0726',
    image: '/images/qitchen.jpg',
  },
];

export { WORK_CATEGORIES } from './work';
export type { WorkCategory } from './work';
export { MAIN_NODES, BG_LINES } from './services';
export type { ServiceNode } from './services';
export { SLIDER_PROJECT } from './projects';
export type { SliderProject } from './projects';
