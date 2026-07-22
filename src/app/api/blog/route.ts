import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const where = category && category !== 'ALL'
    ? { published: true, category: { equals: category, mode: 'insensitive' as const } }
    : { published: true };

  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    const blog = await prisma.blog.create({ data });
    return NextResponse.json(blog, { status: 201 });
  } catch (e: any) {
    if (e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
