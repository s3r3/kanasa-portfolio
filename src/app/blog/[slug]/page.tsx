import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogDetailTemplate from '@/components/ui/BlogDetailTemplate';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return {};
  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDesc || blog.excerpt,
    openGraph: { title: blog.title, description: blog.excerpt, images: [blog.image] },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) notFound();

  return (
    <BlogDetailTemplate
      title={blog.title}
      author={blog.author}
      readTime={blog.readTime}
      image={blog.image}
      category={blog.category}
      summary={blog.excerpt}
    />
  );
}
