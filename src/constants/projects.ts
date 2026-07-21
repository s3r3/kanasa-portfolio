export interface SliderProject {
  title: string;
  code: string;
  images: string[];
  slides: { title: string; description: string }[];
}

export const SLIDER_PROJECT: SliderProject = {
  title: 'NurQuran',
  code: 'KAN • NQA • 0426',
  images: [
    '/images/slide-1.jpg',
    '/images/slide-2.jpg',
    '/images/slide-3.jpg',
    '/images/slide-4.jpg',
    '/images/slide-5.jpg',
  ],
  slides: [
    { title: 'NurQuran', description: 'Quran reader with prayer times, fasting calendar & audio' },
    { title: 'Foodie', description: 'Food delivery platform with seamless ordering' },
    { title: 'Qitchen', description: 'Restaurant management & reservation system' },
    { title: 'VRADA', description: 'E-commerce app with visual search' },
    { title: 'Kanasa', description: 'Design & technology studio' },
  ],
};
