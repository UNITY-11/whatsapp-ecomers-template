# Calira Couture — Storefront

A modern ladies' dress e-commerce site built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, Zustand, Sanity CMS (optional), and WhatsApp ordering.

## Features

- Product catalog with filters, sorting, grid/list view, and quick view
- Dress variants (size & colour), cart, wishlist, and WhatsApp checkout
- Customer accounts, contact page, and floating WhatsApp/call buttons
- SEO: metadata, sitemap, robots.txt, JSON-LD

## Getting Started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login (mock mode)

Use any customer email from mock data with password `password123`.

## Sanity CMS (optional)

1. Create a project at [sanity.io](https://sanity.io)
2. Set in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token
   ```

Without Sanity, the app uses mock data.

## Vercel deployment

| Setting | Value |
|--------|--------|
| Root Directory | `.` |
| Install Command | `pnpm install` |
| Build Command | `pnpm build` |

## Environment variables

See `.env.example`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |

## Project structure

```
src/
├── app/           # Pages and routes
├── components/    # UI and layout
├── features/      # Product detail, etc.
├── lib/           # Utils, Sanity, mock data
├── services/      # Data layer
└── store/         # Zustand stores

sanity/schemas/    # CMS schemas
```
