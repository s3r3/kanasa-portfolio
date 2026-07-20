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
    title: 'DIME',
    description: 'MODERNIZING AN ICONIC STREETWEAR BRAND',
    code: 'PDM-1025',
    image: '/images/dime.jpg',
  },
  {
    id: '2',
    title: 'SOPFEU',
    description: 'HARNESSING REAL-TIME DATA TO CREATE THE ULTIMATE PREVENTION TOOL',
    code: 'PSF-0325',
    image: '/images/sopfeu.jpg',
  },
  {
    id: '3',
    title: 'HALO DENTAL',
    description: 'BUILDING TRUST TO PROPEL A NEW PLAYER IN DENTISTRY',
    code: 'PHD-0524',
    image: '/images/halo.jpg',
  },
];

export { WORK_CATEGORIES } from './work';
export type { WorkCategory } from './work';
export { MAIN_NODES, BG_LINES } from './services';
export type { ServiceNode } from './services';
export { SLIDER_PROJECT } from './projects';
export type { SliderProject } from './projects';
