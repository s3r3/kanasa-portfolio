import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const podcasts = await prisma.podcast.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(podcasts);
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    const podcast = await prisma.podcast.create({ data });
    return NextResponse.json(podcast, { status: 201 });
  } catch (e: any) {
    if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
