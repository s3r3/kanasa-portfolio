export interface WorkCategory {
  id: number;
  title: string;
  desc: string;
  image: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: 0,
    title: 'E-commerce',
    desc: 'DRIVE AND SUSTAIN GROWTH WITH PLATFORMS THAT MEAN BUSINESS.',
    image: '/images/ecommerce.jpg',
    position: 'top-left',
  },
  {
    id: 1,
    title: 'Mobile Apps',
    desc: 'BUILD PURPOSE-DRIVEN APPS THAT STICK.',
    image: '/images/mobile.jpg',
    position: 'top-right',
  },
  {
    id: 2,
    title: 'Websites',
    desc: 'BUILDING DIGITAL EXPERIENCES.',
    image: '/images/websites.jpg',
    position: 'bottom-left',
  },
  {
    id: 3,
    title: 'Experiential',
    desc: 'CREATING IMMERSIVE REALITIES.',
    image: '/images/experiential.jpg',
    position: 'bottom-right',
  },
];
