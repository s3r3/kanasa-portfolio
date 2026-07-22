# Blog CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static blog & podcast system into a fullstack CMS with Supabase database, admin auth, SEO, and dynamic content management.

**Architecture:** Prisma ORM → Supabase PostgreSQL → Next.js Route Handlers → Server Components. Blog pages become Server Components for SEO. Dashboard remains Client Component with auth guard. Data seeded via prisma seed script.

**Tech Stack:** Next.js 16, Prisma ORM, Supabase PostgreSQL, iron-session, bcryptjs, TypeScript

## Global Constraints
- All blog pages must be Server Components (remove `'use client'`) to allow `generateMetadata` for SEO
- `BlogDetailTemplate` and `PodcastDetailTemplate` remain Client Components (they have scroll/state logic) — they get data via props from parent server component
- Admin username: `rafa`, password: `f4R!d12332` — hashed with bcrypt
- Blog-dashboard routes (`/blog-dashboard/*`) stay Client Components with auth guard
- No image upload — all images from external URLs (Unsplash, YouTube)
- Content stored as JSON string in DB (not rich text editor)
- Prisma schema stored in `prisma/schema.prisma`
- All API routes in `src/app/api/` check session for mutations
- Existing UI styling and design language must remain unchanged

---

### Task 1: Install Dependencies & Setup Prisma

**Files:**
- Modify: `package.json`
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `.env`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: Prisma client, DB schema, seed data, env vars

- [ ] **Step 1: Install dependencies**

```bash
npm install @prisma/client @supabase/supabase-js iron-session bcryptjs
npm install -D prisma @types/bcryptjs
```

- [ ] **Step 2: Create `.env` file**

```bash
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:YOUR_SUPABASE_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
SUPABASE_ANON_KEY="YOUR_ANON_KEY"
SESSION_SECRET="your-secret-key-at-least-32-chars-long-here"
EOF
```

Note: User will fill in actual Supabase values during setup.

- [ ] **Step 3: Initialize Prisma and pull schema**

```bash
npx prisma init
```

- [ ] **Step 4: Create Prisma schema**

Write `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  createdAt DateTime @default(now())
}

model Blog {
  id        String    @id @default(cuid())
  title     String
  slug      String    @unique
  category  String
  author    String
  readTime  String
  image     String
  excerpt   String    @db.Text
  content   String    @db.Text
  tags      String?
  seoTitle  String?
  seoDesc   String?   @db.Text
  youtubeUrl String?
  published Boolean   @default(true)
  featured  Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Podcast {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  episodeNo   Int
  duration    String
  author      String
  image       String
  youtubeId   String
  description String   @db.Text
  content     String   @db.Text
  tags        String?
  seoTitle    String?
  seoDesc     String?  @db.Text
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- [ ] **Step 5: Push schema to Supabase**

```bash
npx prisma db push
```

- [ ] **Step 6: Generate Prisma client**

```bash
npx prisma generate
```

- [ ] **Step 7: Create prisma/seed.ts**

```typescript
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
```

- [ ] **Step 8: Add seed script to package.json**

Edit `package.json` — add to `"scripts"`:
```json
"prisma:seed": "tsx prisma/seed.ts",
"postinstall": "prisma generate"
```

And add to root:
```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

- [ ] **Step 9: Install tsx for seed script**

```bash
npm install -D tsx
```

- [ ] **Step 10: Run seed**

```bash
npx prisma db seed
```

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: setup prisma, supabase schema, and seed data"
```

---

### Task 2: Create Prisma Client & Auth Library

**Files:**
- Create: `src/lib/prisma.ts`
- Create: `src/lib/auth.ts`

**Interfaces:**
- Consumes: Prisma client from Task 1
- Produces: `prisma` singleton, `getSession()`/`login()`/`logout()` helpers

- [ ] **Step 1: Create `src/lib/prisma.ts`**

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

- [ ] **Step 2: Create `src/lib/auth.ts`**

```typescript
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import bcrypt from 'bcryptjs';
import prisma from './prisma';

export interface SessionData {
  adminId?: string;
  username?: string;
  isLoggedIn?: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'kanasa_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}

export async function login(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return false;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return false;

  const session = await getSession();
  session.adminId = admin.id;
  session.username = admin.username;
  session.isLoggedIn = true;
  await session.save();
  return true;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error('Unauthorized');
  }
  return session;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/prisma.ts src/lib/auth.ts
git commit -m "feat: add prisma client singleton and auth helpers"
```

---

### Task 3: Create API Routes

**Files:**
- Create: `src/app/api/auth/login/route.ts`
- Create: `src/app/api/auth/logout/route.ts`
- Create: `src/app/api/auth/me/route.ts`
- Create: `src/app/api/blog/route.ts`
- Create: `src/app/api/blog/[id]/route.ts`
- Create: `src/app/api/podcast/route.ts`
- Create: `src/app/api/podcast/[id]/route.ts`

**Interfaces:**
- Consumes: `prisma`, `login()`, `logout()`, `requireAuth()`, `getSession()` from Task 2
- Produces: Full REST API consumed by dashboard and blog pages

- [ ] **Step 1: Create `src/app/api/auth/login/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const success = await login(username, password);
    if (!success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create `src/app/api/auth/logout/route.ts`**

```typescript
import { NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST() {
  await logout();
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Create `src/app/api/auth/me/route.ts`**

```typescript
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    username: session.username,
  });
}
```

- [ ] **Step 4: Create `src/app/api/blog/route.ts`**

```typescript
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
```

- [ ] **Step 5: Create `src/app/api/blog/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await req.json();
    const blog = await prisma.blog.update({ where: { id }, data });
    return NextResponse.json(blog);
  } catch (e: any) {
    if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 6: Create `src/app/api/podcast/route.ts`**

```typescript
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
```

- [ ] **Step 7: Create `src/app/api/podcast/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const podcast = await prisma.podcast.findUnique({ where: { id } });
  if (!podcast) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(podcast);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await req.json();
    const podcast = await prisma.podcast.update({ where: { id }, data });
    return NextResponse.json(podcast);
  } catch (e: any) {
    if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.podcast.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 8: Commit**

```bash
git add src/app/api/
git commit -m "feat: add REST API routes for auth, blog, and podcast"
```

---

### Task 4: Update Root Layout with SEO Metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update root layout metadata**

Replace the metadata export in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Kanasa Creative — Design & Technology",
    template: "%s — Kanasa Creative",
  },
  description: "Kanasa Creative — blending design and technology to build digital products that matter.",
  openGraph: {
    type: "website",
    siteName: "Kanasa Creative",
    title: "Kanasa Creative — Design & Technology",
    description: "Blending design and technology to build digital products that matter.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: enhance global SEO metadata with OG and twitter cards"
```

---

### Task 5: Convert Blog Pages to Server Components + DB Fetch

**Files:**
- Modify: `src/app/blog/page.tsx` — add `generateMetadata`, fetch from DB
- Modify: `src/app/blog/all/page.tsx` — remove `'use client'`, fetch from DB
- Modify: `src/app/blog/[slug]/page.tsx` — Server Component with `generateMetadata`
- Modify: `src/app/blog/podcast/page.tsx` — (note: `src/app/blog/podcasts/` already exists, but there's also `podcast/` — verify which to keep)
- Modify: `src/app/blog/podcasts/[podcastSlug]/page.tsx` — Server Component with `generateMetadata`

**Key changes per file:**

**`src/app/blog/[slug]/page.tsx`** — full rewrite as Server Component:
```typescript
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
```

**`src/app/blog/podcasts/[podcastSlug]/page.tsx`** — same pattern:
```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PodcastDetailTemplate from '@/components/ui/PodcastDetailTemplate';

interface Props { params: Promise<{ podcastSlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { podcastSlug } = await params;
  const podcast = await prisma.podcast.findUnique({ where: { slug: podcastSlug } });
  if (!podcast) return {};
  return {
    title: podcast.seoTitle || podcast.title,
    description: podcast.seoDesc || podcast.description,
    openGraph: { title: podcast.title, description: podcast.description, images: [podcast.image] },
  };
}

export default async function PodcastDetailPage({ params }: Props) {
  const { podcastSlug } = await params;
  const podcast = await prisma.podcast.findUnique({ where: { slug: podcastSlug } });
  if (!podcast) notFound();

  return (
    <PodcastDetailTemplate
      title={podcast.title}
      author={podcast.author}
      duration={podcast.duration}
      image={podcast.image}
    />
  );
}
```

**`src/app/blog/page.tsx`** — replace hardcoded arrays with DB fetch in the component. Keep the file as client component (it has Lenis, motion, etc.), but fetch data via API instead of hardcoded arrays. Since it's `'use client'`, use `useEffect` + `fetch('/api/blog')`.

**`src/app/blog/all/page.tsx`** — same approach: fetch from `/api/blog?category=X` on category change via `useEffect`.

**`src/app/blog/podcast/page.tsx`** — keep but ensure it fetches from DB.

- [ ] **Step 1: Rewrite `src/app/blog/[slug]/page.tsx`** as Server Component
- [ ] **Step 2: Rewrite `src/app/blog/podcasts/[podcastSlug]/page.tsx`** as Server Component
- [ ] **Step 3: Update `src/app/blog/page.tsx`** — replace hardcoded data with `fetch('/api/blog')` in useEffect
- [ ] **Step 4: Update `src/app/blog/all/page.tsx`** — replace hardcoded data with `fetch('/api/blog')`
- [ ] **Step 5: Update `src/app/blog/podcast/page.tsx`** — replace hardcoded data with `fetch('/api/podcast')`
- [ ] **Step 6: Commit**

```bash
git add src/app/blog/
git commit -m "feat: convert blog pages to dynamic DB-backed content with SEO metadata"
```

---

### Task 6: Add Blog to Navbar & Footer

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add BLOG to Navbar items**

Edit `src/components/layout/Navbar.tsx` line 13:
```typescript
const NAV_ITEMS = ['WORK', 'ABOUT', 'SERVICES', 'CAREERS', 'BLOG'] as const;
```

- [ ] **Step 2: Add Blog link to Footer**

Edit `src/components/layout/Footer.tsx` — add after the About link (around line 20):
```tsx
<li><Link href="/blog" className="hover:italic transition-all w-max">[ ] {t('nav.blog') || 'BLOG'}</Link></li>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add BLOG link to navbar and footer navigation"
```

---

### Task 7: Implement Admin Dashboard with Real CRUD

**Files:**
- Modify: `src/app/blog-dashboard/page.tsx` — replace dummy data with API calls + auth guard
- Modify: `src/app/blog-dashboard/create-blog/page.tsx` — POST to `/api/blog` on submit
- Modify: `src/app/blog-dashboard/create-podcast/page.tsx` — POST to `/api/podcast` on submit

**Auth Guard pattern for all dashboard pages:**
```typescript
// At top of component, add:
const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

useEffect(() => {
  fetch('/api/auth/me')
    .then(r => {
      if (!r.ok) throw new Error('Unauth');
      setIsAuthed(true);
    })
    .catch(() => { setIsAuthed(false); });
}, []);

if (isAuthed === null) return <div className="...">Loading...</div>;
if (!isAuthed) return <LoginForm onLogin={() => setIsAuthed(true)} />;
```

**LoginForm** component (inline in dashboard page.tsx):
```typescript
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) onLogin();
    else setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efeee8]">
      <form onSubmit={handleSubmit} className="border border-black p-8 bg-white max-w-sm w-full">
        <h1 className="text-2xl font-serif mb-6">Admin Login</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full border border-black/30 px-3 py-2 mb-3 text-sm" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border border-black/30 px-3 py-2 mb-3 text-sm" />
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
        <button type="submit" className="bg-black text-white px-4 py-2 text-xs font-mono uppercase w-full">Login</button>
      </form>
    </div>
  );
}
```

**Dashboard list** — replace dummy state with fetch:
```typescript
const [articles, setArticles] = useState<any[]>([]);
useEffect(() => {
  fetch('/api/blog').then(r => r.json()).then(setArticles);
}, []);
```

**Create blog submit** — replace alert with API call:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, slug, category, author, tags,
      readTime: `${Math.ceil(mainContent.split(' ').length / 200)} min read`,
      image: coverImage,
      excerpt,
      content: JSON.stringify([{ type: 'text', content: mainContent }]),
      seoTitle, seoDesc,
    }),
  });
  if (res.ok) window.location.href = '/blog-dashboard';
};
```

Same pattern for create-podcast → POST to `/api/podcast`.

- [ ] **Step 1: Add LoginForm and auth guard to dashboard page.tsx**
- [ ] **Step 2: Replace dummy articles/podcasts state with fetch calls**
- [ ] **Step 3: Add delete button functionality (DELETE via API)**
- [ ] **Step 4: Wire create-blog form submit to POST /api/blog**
- [ ] **Step 5: Wire create-podcast form submit to POST /api/podcast**
- [ ] **Step 6: Commit**

```bash
git add src/app/blog-dashboard/
git commit -m "feat: implement admin dashboard with auth, real CRUD via API"
```

---

### Task 8: Create Sitemap & Robots

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```typescript
import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kanasacreative.com';

  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const podcasts = await prisma.podcast.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog/all`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog/podcast`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...blogs.map(b => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...podcasts.map(p => ({
      url: `${baseUrl}/blog/podcasts/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add dynamic sitemap with blog and podcast entries"
```

---

### Task 9: Create Supabase Project & Connect

**Steps (user-guided):**
1. Go to https://supabase.com → Create new project
2. Copy connection string → paste into `.env` `DATABASE_URL`
3. Copy anon key → paste into `.env` `SUPABASE_ANON_KEY`
4. Run `npx prisma db push` to create tables
5. Run `npx prisma db seed` to seed data
6. Deploy to Vercel → add env vars in Vercel dashboard
7. Redeploy

---

### Verification Checklist

- [ ] `npm run dev` — app starts without errors
- [ ] `npx prisma db push` — tables created in Supabase
- [ ] `npx prisma db seed` — admin + 5 blogs + 2 podcasts seeded
- [ ] `curl localhost:3000/api/blog` — returns JSON array of blogs
- [ ] Visit `/blog` — shows real articles from DB
- [ ] Visit `/blog/all` — filter works, shows DB data
- [ ] Visit `/blog/ai-web-development-2026` — detail page with correct SEO meta tags in `<head>`
- [ ] Visit `/blog/podcasts/future-design-digital-age` — podcast detail page
- [ ] Visit `/blog-dashboard` — login form shows
- [ ] Login with rafa / f4R!d12332 — dashboard shows
- [ ] Create new blog via dashboard → appears on `/blog`
- [ ] Create new podcast via dashboard → appears on `/blog/podcast`
- [ ] BLOG link appears in Navbar
- [ ] Blog link appears in Footer
- [ ] Check `<head>` on blog detail — has `og:title`, `og:description`, `og:image`, `twitter:card`
