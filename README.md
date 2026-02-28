# Kundhave S — Systems Control Room Portfolio

A personal portfolio built as a live distributed systems control room. Industrial, engineered, intentional.

## Stack
- **Next.js 14** (App Router)
- **TailwindCSS**
- **Framer Motion**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the repo to Vercel dashboard — it auto-detects Next.js.

## Structure

```
app/
  layout.tsx       — Root layout + metadata
  page.tsx         — Main page
  globals.css      — Global styles, grain texture, animations

components/
  Nav.tsx          — Fixed nav with live clock
  Hero.tsx         — Identity + live terminal + metrics
  Systems.tsx      — Architecture principles + topology diagram
  Projects.tsx     — Active systems panels with module inspection
  Stack.tsx        — Skills by system layer with proficiency bars
  Contact.tsx      — Open channel + contact links
```

## Design Language
- **Background**: Off-black charcoal `#0f0f0d`
- **Accent 1**: Burnt amber `#e07b39`
- **Accent 2**: Steel blue `#4a7fa5`
- **Accent 3**: Industrial moss `#5a7a4a`
- **Text**: Warm cream `#e8e0d0`
- **Font**: JetBrains Mono (monospace-first), Bebas Neue (display)
- **Grain**: SVG noise texture overlay at 4% opacity
