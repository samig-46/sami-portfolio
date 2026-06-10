# Sami Ul Mubeen — Portfolio

Award-winning 3D interactive portfolio built with Next.js 15, Three.js, GSAP, and Framer Motion.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| 3D/WebGL | Three.js + React Three Fiber + Drei |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Email | Resend API |
| UI Primitives | Radix UI |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/contact/        # Contact form API route
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main page
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── common/             # LoadingScreen, CustomCursor, ScrollProgress
│   ├── layout/             # Header, Footer
│   ├── sections/           # 10 page sections
│   ├── three/              # Three.js scenes (GlobeScene, SkillSphere)
│   └── ui/                 # GlassCard, AnimatedButton, StatCounter, SectionHeader
├── data/                   # Content data (projects, services, skills, etc.)
├── hooks/                  # useLenis, useMousePosition, useScrollAnimation
├── lib/                    # utils.ts
└── types/                  # TypeScript interfaces
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your values:
```
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

### Personal Info
- Update `src/data/projects.ts` with your real projects
- Update `src/data/experience.ts` with your work history
- Update `src/data/testimonials.ts` with real client testimonials
- Update `src/data/blog.ts` with your blog posts
- Update `src/app/layout.tsx` metadata with your site URL

### Colors
Edit `tailwind.config.ts` — primary brand colors:
```
#6D1F2A  brand.primary
#8A2635  brand.secondary  
#111827  brand.dark
#F8FAFC  brand.light
```

### Contact
Update social links in `src/components/layout/Footer.tsx` and `src/components/sections/Contact.tsx`.

## Deployment on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Or via CLI:
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
```

### Performance Checklist
- [ ] Add real `public/og-image.jpg` (1200×630px)
- [ ] Add `public/favicon.ico` and icon variants
- [ ] Set all environment variables in Vercel
- [ ] Enable Vercel Analytics
- [ ] Configure custom domain
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: 95+)

## SEO Features

- Full Open Graph and Twitter Card metadata
- JSON-LD structured data (Person schema)
- Dynamic sitemap via `app/sitemap.ts`
- `robots.ts` configuration
- Web App Manifest
- Semantic HTML throughout
- Alt text on all images

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2 versions). WebGL required for 3D features; they degrade gracefully on unsupported browsers.
