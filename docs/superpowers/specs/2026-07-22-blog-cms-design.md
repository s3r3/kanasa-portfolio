# Blog CMS — Fullstack Design Spec

**Date:** 2026-07-22
**Status:** Draft

## 1. Purpose

Transform the existing static/dummy blog & podcast system into a real database-backed CMS with admin authentication, SEO metadata, and dynamic content management — without changing the existing UI templates and design language.

## 2. Architecture

### Stack
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Auth:** bcrypt + iron-session (httpOnly cookie)
- **API:** Next.js Route Handlers (`/api/*`)
- **Frontend:** Server Components untuk blog pages (SEO), Client Components untuk dashboard
- **Deployment:** Vercel (existing)

### Data Flow
```
Dashboard Form → POST /api/blog → Prisma → Supabase PostgreSQL
Client browser → GET /blog/[slug] → Server Component → Prisma → Supabase → Render
```

## 3. Database Schema

```prisma
model Admin {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String   // bcrypt hash — seeded on first deploy
}

model Blog {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  category    String
  author      String
  readTime    String
  image       String
  excerpt     String    @db.Text
  content     String    @db.Text  // JSON — rich text blocks
  tags        String?   // comma-separated
  seoTitle    String?
  seoDesc     String?   @db.Text
  youtubeUrl  String?
  published   Boolean   @default(true)
  featured    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Podcast {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  episodeNo   Int
  duration    String
  author      String
  image       String
  youtubeId   String    // YouTube embed ID (e.g., "dQw4w9WgXcQ")
  description String    @db.Text
  content     String    @db.Text  // JSON — transcript/summary blocks
  tags        String?
  seoTitle    String?
  seoDesc     String?   @db.Text
  published   Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## 4. Route Handlers (API)

### `/api/auth/login` POST
- Accept `{ username, password }`
- Verify bcrypt hash
- Set iron-session cookie
- Return `{ success: true }`

### `/api/auth/logout` POST
- Destroy session
- Return `{ success: true }`

### `/api/auth/me` GET
- Return current admin user or 401

### `/api/blog` GET
- Return all published blogs (filter by `?category=` optional)
- Order by `createdAt DESC`

### `/api/blog` POST
- Validate session (admin only)
- Create blog entry
- Return created blog

### `/api/blog/[id]` PUT
- Update blog entry
- Validate session

### `/api/blog/[id]` DELETE
- Delete blog entry
- Validate session

### `/api/podcast` GET / POST
- Same pattern as blog

### `/api/podcast/[id]` PUT / DELETE
- Same pattern as blog

## 5. Page Changes

### Navbar
- Add "BLOG" to `NAV_ITEMS` → href `/blog`

### Footer
- Add "Blog" link in navigation section

### Blog Home (`/blog`)
- Stay Server Component
- Fetch from DB instead of hardcoded arrays

### Blog All (`/blog/all`)
- Stay Server Component
- Fetch from DB, server-side category filter

### Blog Detail (`/blog/[slug]`)
- **Server Component with `generateMetadata`** — reads `seoTitle`/`seoDesc` from DB
- Falls back to `BlogDetailTemplate` component for render
- `<head>` includes: `og:title`, `og:description`, `og:image`, `twitter:card`

### Podcast Detail (`/blog/podcasts/[podcastSlug]`)
- Same pattern — Server Component + `generateMetadata`
- Falls back to `PodcastDetailTemplate`

### Blog Dashboard (`/blog-dashboard/*`)
- Client Components with auth guard
- Fetch + display data from API
- Create/Edit forms POST to API then redirect

## 6. SEO Strategy

### `layout.tsx` Global
```ts
export const metadata = {
  title: { default: "Kanasa Creative", template: "%s — Kanasa Creative" },
  description: "Blending design and technology...",
  openGraph: {
    type: "website",
    siteName: "Kanasa Creative",
    title: "Kanasa Creative",
    description: "Blending design and technology...",
  },
  twitter: { card: "summary_large_image" },
}
```

### Per-page (`/blog/[slug]`)
```ts
export async function generateMetadata({ params }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } })
  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDesc || blog.excerpt,
    openGraph: { title: blog.title, description: blog.excerpt, images: [blog.image] },
  }
}
```

### Sitemap (`/app/sitemap.ts`)
- Fetch all blog slugs + podcast slugs
- Generate XML sitemap

## 7. 5 Blog Articles (Seed Data)

1. **Tech** — "How AI is transforming web development in 2026" (`ai-web-development-2026`)
2. **Lifestyle** — "Digital minimalism: finding focus in a connected world" (`digital-minimalism-focus`)
3. **Travel** — "The rise of slow travel: why less is more" (`rise-of-slow-travel`)
4. **Finance** — "Smart investing strategies for creative professionals" (`investing-strategies-creatives`)
5. **UI/UX** — "Designing for accessibility: a practical guide" (`designing-accessibility-guide`)

Each with original image from Unsplash, 600-800 words content, proper SEO fields.

## 8. 2 Podcast Episodes (Seed Data)

1. **"Future of Design in the Digital Age"** — `future-design-digital-age` — 1hr 25min
2. **"The Remote Revolution"** — `remote-revolution-podcast` — 3hr 06min

Both with YouTube embed ID, host/guest info, transcript content.

## 9. Auth

- Username: `rafa`
- Password: `f4R!d12332`
- Stored as bcrypt hash in `Admin` table
- Login page at `/blog-dashboard` (simple form, no special UI)
- Session: iron-session with 7-day TTL
- All `/api/blog` and `/api/podcast` mutations check session

## 10. Files to Create/Modify

### New Files
```
prisma/schema.prisma
src/app/api/auth/login/route.ts
src/app/api/auth/logout/route.ts
src/app/api/auth/me/route.ts
src/app/api/blog/route.ts
src/app/api/blog/[id]/route.ts
src/app/api/podcast/route.ts
src/app/api/podcast/[id]/route.ts
src/lib/prisma.ts
src/lib/auth.ts
src/app/sitemap.ts
prisma/seed.ts
```

### Modified Files
```
src/app/layout.tsx                    — add OG, twitter metadata
src/app/blog/page.tsx                 — fetch from DB
src/app/blog/all/page.tsx             — fetch from DB, keep filter UI
src/app/blog/[slug]/page.tsx          — fetch from DB, generateMetadata
src/app/blog/podcasts/page.tsx        — fetch from DB
src/app/blog/podcasts/[podcastSlug]/page.tsx  — fetch from DB, generateMetadata
src/components/layout/Navbar.tsx      — add BLOG link
src/components/layout/Footer.tsx      — add Blog link
src/app/blog-dashboard/page.tsx       — real CRUD via API
src/app/blog-dashboard/create-blog/page.tsx  — real POST via API
src/app/blog-dashboard/create-podcast/page.tsx  — real POST via API
```

## 11. Non-Goals (Explicitly Skipped)
- No image upload — semua image dari URL eksternal (Unsplash/YouTube)
- No rich text editor — content sebagai JSON yang diinput manual
- No comments/disqus
- No tags filtering di frontend (tapi tags disimpan di DB)

## 12. Verification

1. `npm run dev` — app starts
2. `npx prisma db push` — tables created
3. `npx prisma db seed` — admin + 5 blogs + 2 podcasts seeded
4. Visit `/blog` — shows real articles from DB
5. Visit `/blog/all` — filter works, shows DB data
6. Visit `/blog/[slug]` — detail page with SEO meta in `<head>`
7. Visit `/blog-dashboard` — login works
8. Create new blog via dashboard → appears on `/blog`
9. Create new podcast via dashboard → appears on `/blog/podcasts`
10. Check `<head>` for OG tags on blog detail page
