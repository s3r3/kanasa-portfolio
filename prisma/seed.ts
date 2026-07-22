import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed admin
  const hashedPassword = await bcrypt.hash('f4R!d12332', 12);
  await prisma.admin.upsert({
    where: { username: 'rafa' },
    update: {},
    create: { username: 'rafa', password: hashedPassword },
  });

  // Seed 5 blogs
  const blogs = [
    {
      title: 'How AI is transforming web development in 2026',
      slug: 'ai-web-development-2026',
      category: 'Tech',
      author: 'Admin',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      excerpt: 'From AI-powered code generation to intelligent testing — explore how artificial intelligence is reshaping the way we build the web.',
      content: JSON.stringify([
        { type: 'heading', text: 'Introduction' },
        { type: 'paragraph', text: 'Artificial intelligence is no longer a futuristic concept — it is actively reshaping web development in 2026. Developers who embrace AI tools are building faster, writing cleaner code, and delivering better user experiences.' },
        { type: 'heading', text: 'AI-Powered Code Generation' },
        { type: 'paragraph', text: 'Tools like GitHub Copilot and Claude have evolved beyond simple autocomplete. They now understand project context, suggest entire functions, and even debug code in real-time. This dramatically reduces development time.' },
        { type: 'heading', text: 'Intelligent Testing' },
        { type: 'paragraph', text: 'AI-driven testing frameworks automatically generate test cases, detect edge cases, and run regression tests without manual intervention. This leads to more reliable applications.' },
        { type: 'heading', text: 'The Future' },
        { type: 'paragraph', text: 'As AI continues to evolve, the role of developers shifts from writing code to orchestrating AI agents and designing systems. The core skills of problem-solving and architecture remain essential.' },
      ]),
      tags: 'AI, web development, programming, future tech',
      seoTitle: 'How AI Is Transforming Web Development in 2026 | Kanasa Creative',
      seoDesc: 'Explore how artificial intelligence powered tools like code generation, intelligent testing, and automated deployment are reshaping web development in 2026.',
      featured: true,
    },
    {
      title: 'Digital minimalism: finding focus in a connected world',
      slug: 'digital-minimalism-focus',
      category: 'Lifestyle',
      author: 'Admin',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
      excerpt: 'In an age of constant notifications and endless scrolling, digital minimalism offers a path back to focus and intentional living.',
      content: JSON.stringify([
        { type: 'heading', text: 'Introduction' },
        { type: 'paragraph', text: 'We spend an average of 6 hours per day on digital devices. Digital minimalism is not about rejecting technology — it is about using it with intention.' },
        { type: 'heading', text: 'What is Digital Minimalism?' },
        { type: 'paragraph', text: 'Coined by Cal Newport, digital minimalism is a philosophy of technology use in which you focus your online time on a small number of carefully selected and optimized activities.' },
        { type: 'heading', text: 'Practical Steps' },
        { type: 'paragraph', text: 'Start with a 30-day digital declutter. Remove social media apps from your phone, turn off all non-essential notifications, and schedule specific times for email and messaging.' },
        { type: 'heading', text: 'The Benefits' },
        { type: 'paragraph', text: 'Practitioners report improved concentration, deeper relationships, better sleep, and a greater sense of control over their lives.' },
      ]),
      tags: 'digital minimalism, focus, productivity, wellness',
      seoTitle: 'Digital Minimalism: Finding Focus in a Connected World | Kanasa Creative',
      seoDesc: 'Learn how digital minimalism can help you reclaim focus, reduce distractions, and live more intentionally in an always-connected world.',
    },
    {
      title: 'The rise of slow travel: why less is more',
      slug: 'rise-of-slow-travel',
      category: 'Travel',
      author: 'Admin',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      excerpt: 'Slow travel is redefining how we explore the world — favoring depth over distance and connection over checklists.',
      content: JSON.stringify([
        { type: 'heading', text: 'Introduction' },
        { type: 'paragraph', text: 'In an era of budget airlines and packed itineraries, a growing movement encourages travelers to slow down and immerse themselves in destinations.' },
        { type: 'heading', text: 'What is Slow Travel?' },
        { type: 'paragraph', text: 'Slow travel means spending more time in fewer places, connecting with local cultures, and traveling overland instead of flying whenever possible.' },
        { type: 'heading', text: 'Why It Matters' },
        { type: 'paragraph', text: 'It reduces carbon footprint, supports local economies, and leads to more meaningful experiences. Instead of visiting 10 countries in 2 weeks, slow travelers might spend a month in one region.' },
        { type: 'heading', text: 'Getting Started' },
        { type: 'paragraph', text: 'Choose one destination and commit to at least a week. Rent a local apartment, shop at local markets, learn basic phrases, and say yes to spontaneous invitations.' },
      ]),
      tags: 'slow travel, sustainable tourism, mindful travel',
      seoTitle: 'The Rise of Slow Travel: Why Less Is More | Kanasa Creative',
      seoDesc: 'Discover why slow travel is the growing movement redefining how we explore the world — favoring depth, connection, and sustainability.',
    },
    {
      title: 'Smart investing strategies for creative professionals',
      slug: 'investing-strategies-creatives',
      category: 'Finance',
      author: 'Admin',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800',
      excerpt: 'Creative professionals face unique financial challenges — irregular income, project-based work, and limited employer benefits. Here is how to build wealth anyway.',
      content: JSON.stringify([
        { type: 'heading', text: 'Introduction' },
        { type: 'paragraph', text: 'Freelancers, artists, and creative entrepreneurs often prioritize their craft over financial planning. But smart investing is essential for long-term stability and freedom.' },
        { type: 'heading', text: 'Start with an Emergency Fund' },
        { type: 'paragraph', text: 'Aim for 6 months of living expenses in a high-yield savings account. This safety net allows you to take creative risks without financial ruin.' },
        { type: 'heading', text: 'Index Funds and ETFs' },
        { type: 'paragraph', text: 'For most creatives, low-cost index funds are the best investment vehicle. They offer diversification, low fees, and consistent returns over time.' },
        { type: 'heading', text: 'Diversify Your Income' },
        { type: 'paragraph', text: 'The best investment for creatives is often in their own skills. Courses, digital products, and passive income streams can supplement project-based earnings.' },
      ]),
      tags: 'investing, finance, freelancers, wealth building',
      seoTitle: 'Smart Investing Strategies for Creative Professionals | Kanasa Creative',
      seoDesc: 'Practical investing and wealth-building strategies for freelancers, artists, and creative entrepreneurs with irregular income.',
    },
    {
      title: 'Designing for accessibility: a practical guide',
      slug: 'designing-accessibility-guide',
      category: 'UI/UX',
      author: 'Admin',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800',
      excerpt: 'Accessibility is not an afterthought — it is a fundamental aspect of good design. This guide covers practical steps to make your digital products inclusive.',
      content: JSON.stringify([
        { type: 'heading', text: 'Introduction' },
        { type: 'paragraph', text: 'Over 1 billion people worldwide have some form of disability. Designing for accessibility ensures your products are usable by everyone, regardless of ability.' },
        { type: 'heading', text: 'Color and Contrast' },
        { type: 'paragraph', text: 'Ensure text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Use tools like WebAIM Contrast Checker to verify.' },
        { type: 'heading', text: 'Keyboard Navigation' },
        { type: 'paragraph', text: 'Every interactive element must be reachable and operable via keyboard alone. Test by tabbing through your interface without touching a mouse.' },
        { type: 'heading', text: 'Screen Reader Support' },
        { type: 'paragraph', text: 'Use semantic HTML elements, provide alt text for images, and use ARIA landmarks to help screen reader users navigate your content.' },
        { type: 'heading', text: 'Testing' },
        { type: 'paragraph', text: 'Automated tools catch about 30% of issues. Manual testing with real assistive technology users is essential for comprehensive accessibility.' },
      ]),
      tags: 'accessibility, a11y, inclusive design, UI/UX',
      seoTitle: 'Designing for Accessibility: A Practical Guide | Kanasa Creative',
      seoDesc: 'Practical steps to make your digital products accessible and inclusive — covering color contrast, keyboard navigation, screen readers, and testing.',
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    });
  }

  // Seed 2 podcasts
  const podcasts = [
    {
      title: 'Future of Design in the Digital Age',
      slug: 'future-design-digital-age',
      episodeNo: 1,
      duration: '1hr 25min',
      author: 'William Parker',
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'An exploration of how AI, AR/VR, and user-centered design are shaping the future of digital experiences.',
      content: JSON.stringify([
        { type: 'heading', text: 'Overview' },
        { type: 'paragraph', text: 'Design is evolving at an unprecedented pace. In this episode, we explore how digital transformation is redefining design principles, tools, and approaches.' },
      ]),
      tags: 'design, AI, UX, future tech',
      seoTitle: 'Future of Design in the Digital Age — Podcast | Kanasa Creative',
      seoDesc: 'Explore how AI, AR/VR, and user-centered design are shaping the future of digital experiences in this podcast episode.',
    },
    {
      title: 'The Remote Revolution: Rethinking Work and Culture',
      slug: 'remote-revolution-podcast',
      episodeNo: 2,
      duration: '3hr 06min',
      author: 'William Parker',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'How remote work is reshaping company culture, productivity, and the future of how we work.',
      content: JSON.stringify([
        { type: 'heading', text: 'Overview' },
        { type: 'paragraph', text: 'Remote work has transformed from a temporary solution to a permanent fixture. This episode examines the challenges and opportunities of distributed teams.' },
      ]),
      tags: 'remote work, culture, productivity',
      seoTitle: 'The Remote Revolution: Rethinking Work and Culture — Podcast | Kanasa Creative',
      seoDesc: 'How remote work is reshaping company culture, productivity, and the future of how we work — a podcast episode.',
    },
  ];

  for (const podcast of podcasts) {
    await prisma.podcast.upsert({
      where: { slug: podcast.slug },
      update: {},
      create: podcast,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
