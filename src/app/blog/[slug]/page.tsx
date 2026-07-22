'use client';

import { useParams } from 'next/navigation';
import BlogDetailTemplate from '@/components/ui/BlogDetailTemplate';

// Data artikel — TODO: pindah ke shared lib kalau dipake >2 file
const ALL_ARTICLES = [
  {
    id: '022', slug: 'ecommerce-global-shopping-trends',     title: 'How e-commerce is redefining global shopping trends',     author: 'Emily Johnson',    readTime: '7 min read', image: '/images/recent-1.jpg',      category: 'Tech',       summary: 'Smart tools and routines to help freelancers stay organized, inspired and productive.',
  },
  {
    id: '021', slug: 'minimalist-living-beginners-perspective', title: 'Exploring minimalist living: a beginner\'s perspective', author: 'Jacob Anderson', readTime: '6 min read', image: '/images/recent-2.jpg', category: 'Lifestyle',  summary: 'Discover how minimalism can transform your space and mindset.',
  },
  {
    id: '020', slug: 'underrated-destinations-holiday',        title: 'Five underrated destinations for your next holiday',   author: 'Sophia Harris',    readTime: '5 min read', image: '/images/recent-3.jpg',  category: 'Travel',     summary: 'Escape the crowds with these hidden gems around the world.',
  },
  {
    id: '019', slug: 'best-productivity-hacks-freelancers',    title: 'Best productivity hacks for creative freelancers today', author: 'Michael Smith',   readTime: '7 min read', image: '/images/featured-blog.jpg', category: 'Tech',      summary: 'Smart tools and routines to help freelancers stay organized, inspired and productive.',
  },
  {
    id: '018', slug: 'remote-work-reshaping-modern-lifestyles', title: 'How remote work is reshaping modern lifestyles',       author: 'Benjamin Scott',   readTime: '7 min read', image: '/images/editors-choice.jpg', category: 'Lifestyle', summary: 'The impact of remote work on daily routines, mental health, and career growth.',
  },
  {
    id: '017', slug: 'ten-easy-recipes-weeknight-cooking',     title: 'Ten easy recipes for busy weeknight cooking',          author: 'Ethan Miller',     readTime: '6 min read', image: '/images/recent-4.jpg',     category: 'Food',      summary: 'Quick and delicious meals for hectic weeknights.',
  },
  {
    id: '016', slug: 'quick-fitness-routines-anywhere',        title: 'Quick fitness routines you can do anywhere',           author: 'William Parker',   readTime: '6 min read', image: '/images/watch-featured.jpg', category: 'Health',   summary: 'Stay fit on the go with these simple no-equipment workouts.',
  },
  {
    id: '015', slug: 'future-electric-cars-explained',         title: 'The future of electric cars explained simply',          author: 'Jacob Anderson',   readTime: '6 min read', image: '/images/watch-1.jpg',     category: 'Tech',      summary: 'Everything you need to know about the electric vehicle revolution.',
  },
  {
    id: '014', slug: 'healthy-habits-improve-sleep',           title: 'Healthy habits that actually improve your sleep',       author: 'Emily Johnson',    readTime: '6 min read', image: '/images/recent-5.jpg',     category: 'UI/UX',     summary: 'Proven nightly routines for deeper, more restful sleep.',
  },
  {
    id: '013', slug: 'strategies-improve-daily-focus',         title: 'Simple strategies to improve your daily focus',         author: 'Jacob Anderson',   readTime: '5 min read', image: '/images/recent-6.jpg',     category: 'Business',  summary: 'Boost concentration and get more done with these focus techniques.',
  },
  {
    id: '010', slug: 'guide-personal-finances',                title: 'A guide to building stronger personal finances',        author: 'Benjamin Scott',   readTime: '4 min read', image: '/images/story-1.jpg',      category: 'Finance',   summary: 'Practical steps to take control of your money and build wealth.',
  },
  {
    id: '009', slug: 'meaningful-careers-digital-age',         title: 'Building meaningful careers in the digital age',        author: 'Sophia Harris',    readTime: '4 min read', image: '/images/story-2.jpg',      category: 'Business',  summary: 'How to find purpose and growth in today\'s evolving job market.',
  },
  {
    id: '008', slug: 'technology-and-wellness',                title: 'Exploring the intersection of technology and wellness', author: 'Michael Smith',    readTime: '4 min read', image: '/images/story-large.jpg',   category: 'Business',  summary: 'How tech can support — not sabotage — your wellbeing.',
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ALL_ARTICLES.find((a) => a.slug === slug);

  if (!article) return null;

  return (
    <BlogDetailTemplate
      title={article.title}
      author={article.author}
      readTime={article.readTime}
      image={article.image}
      category={article.category}
      summary={article.summary}
    />
  );
}
