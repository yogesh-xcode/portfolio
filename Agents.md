# AGENTS.md

This file guides AI coding agents working on a Next.js + shadcn/ui portfolio website. Keep changes fast and atomic.

---

## Core Commands

Run these exactly as written before every commit.

- **Dev server:** `pnpm dev` (http://localhost:3000)
- **Type check & lint:** `pnpm lint`
- **Auto-fix style:** `pnpm lint:fix`
- **Format code:** `pnpm format` (or `pnpm dlx prettier --write .`)
- **Run tests:** `pnpm test`
- **Build for production:** `pnpm build`
- **Start production build:** `pnpm start`
- **Full PR check:** `pnpm lint && pnpm test && pnpm build`

Do NOT commit without running the full PR check. Build failures block deployments.

---

## Project Overview

**Portfolio website** built with Next.js 14+, React 18, and shadcn/ui components. Showcases projects, skills, and contact information with modern design patterns.

**Tech stack:**

- **Framework:** Next.js 14+ (App Router)
- **UI Library:** shadcn/ui (Radix UI + Tailwind CSS)
- **Styling:** Tailwind CSS 3+ with shadcn token design system
- **Language:** TypeScript (strict mode)
- **Package manager:** pnpm (use `pnpm add`, not npm/yarn)
- **Deployment:** Vercel (auto-deploys from main branch)

**🎨 Critical:** `styles/globals.css` is the single source of truth for all theming and styling. All colors, typography, spacing, and visual effects flow from CSS custom properties defined here.

---

## Theme & Styling System (globals.css)

**`styles/globals.css` is the single source of truth for all design tokens and theming.** Every visual decision (colors, typography, spacing, effects) is defined here and consumed via Tailwind.

### CSS Custom Properties (Design Tokens)

All design tokens follow shadcn's variable naming convention:

```css
@layer base {
  :root {
    /* Semantic colors - light mode */
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;

    /* Primary brand color */
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;

    /* Secondary accent */
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;

    /* Destructive actions */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    /* Muted for disabled/secondary content */
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;

    /* Accent for highlights */
    --accent: 0 0% 9%;
    --accent-foreground: 0 0% 98%;

    /* Borders */
    --border: 0 0% 89.8%;

    /* Input fields */
    --input: 0 0% 89.8%;

    /* Rings (focus states) */
    --ring: 0 0% 3.6%;

    /* Card backgrounds */
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.6%;

    /* Popover */
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.6%;
  }

  .dark {
    /* Dark mode overrides */
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 98%;
    --accent-foreground: 0 0% 9%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --card: 0 0% 3.6%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.6%;
    --popover-foreground: 0 0% 98%;
  }
}
```

### Typography Tokens

```css
@layer base {
  /* Customize shadcn typography scale */
  h1 {
    @apply text-4xl font-bold tracking-tight;
  }

  h2 {
    @apply text-3xl font-bold tracking-tight;
  }

  h3 {
    @apply text-2xl font-semibold;
  }

  p {
    @apply text-base leading-7;
  }

  /* Small text for secondary content */
  .text-sm {
    @apply text-sm leading-6;
  }

  /* Monospace for code */
  code {
    @apply font-mono text-sm;
  }
}
```

### Global Styles

```css
@layer base {
  /* Root element */
  html {
    scroll-behavior: smooth;
  }

  /* Body defaults */
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rounding-mode" 0;
  }

  /* Links */
  a {
    @apply text-primary hover:text-primary/80 transition-colors;
    text-underline-offset: 4px;
  }

  /* Selection color */
  ::selection {
    @apply bg-primary text-primary-foreground;
  }
}
```

### Custom Utilities (if needed)

```css
/* Add custom utilities for portfolio-specific patterns */
@layer utilities {
  /* Fade in animation */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
  }

  /* Card hover lift effect */
  .card-hover {
    @apply transition-all duration-300 hover:shadow-lg hover:-translate-y-1;
  }
}
```

### How to Use Theme Tokens

**In Tailwind classes:**

```tsx
// ✓ Use semantic color names (not arbitrary colors)
<div className="bg-primary text-primary-foreground">Primary button</div>
<div className="border border-border">Bordered card</div>
<input className="bg-input border-input" />
<div className="bg-muted text-muted-foreground">Disabled state</div>

// ✗ Avoid arbitrary colors
<div className="bg-blue-500">Don't use arbitrary colors</div>
<div style={{ backgroundColor: "#3b82f6" }}>Don't use inline styles</div>
```

**Changing the theme:**

1. Edit only `styles/globals.css` custom properties
2. All components automatically inherit new colors
3. No need to touch component files
4. Light/dark mode switches via `.dark` class on `<html>`

### Color Palette Guidelines

Keep your portfolio's color system cohesive:

- **Primary:** Brand color (dominant, use sparingly)
- **Accent:** Highlight color (complement to primary)
- **Secondary:** Alternative background
- **Muted:** Disabled/subtle states
- **Destructive:** Error/delete actions only
- **Border/Input:** Form and card boundaries

**Example: Modern Dark Portfolio**

```css
:root {
  /* Deep charcoal + vibrant accent */
  --background: 0 0% 5%;
  --foreground: 0 0% 95%;
  --primary: 280 85% 65%; /* Purple */
  --primary-foreground: 0 0% 5%;
  --accent: 50 100% 50%; /* Bright yellow highlight */
  --border: 0 0% 20%;
}
```

---

```
portfolio/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout (theme, nav)
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── projects/page.tsx  # Projects showcase
│   ├── contact/page.tsx   # Contact form
│   └── api/               # API routes (if needed)
├── components/
│   ├── ui/                # shadcn/ui components (auto-generated)
│   ├── navbar.tsx         # Navigation header
│   ├── footer.tsx         # Footer
│   ├── project-card.tsx   # Reusable project card
│   └── sections/          # Page sections (Hero, About, etc.)
├── lib/
│   ├── utils.ts           # Utility functions (cn, etc.)
│   ├── data.ts            # Projects, skills, experience data
│   └── constants.ts       # Site-wide constants
├── public/                # Static assets (images, icons)
├── styles/
│   └── globals.css      # Tailwind directives + custom CSS
├── types
│   └── index.ts         # All the types truth source
├── package.json
├── tsconfig.json
├── tailwind.config.ts     # Tailwind configuration
└── next.config.js         # Next.js configuration
```

---

## Code Conventions & Style

**Copy these patterns exactly.** Agents should follow them for consistency.

### Next.js & React Patterns

```typescript
// ✓ Use functional components with TypeScript interfaces
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export function ProjectCard({ title, description, tags, href }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex gap-2 mt-4">
          {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </CardContent>
      {href && (
        <CardFooter>
          <Link href={href} className={buttonVariants({ variant: "outline" })}>
            View Project →
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
```

```typescript
// ✓ Use Server Components by default in App Router
// Mark interactive components with 'use client' only when needed
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Handle submission
      setSubmitted(true);
    }}>
      {/* Form content */}
    </form>
  );
}
```

```typescript
// ✓ Organize page layouts with sections
export default function Page() {
  return (
    <main className="space-y-16">
      <Hero />
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <ProjectGrid />
        </div>
      </section>
      <SkillsSection />
      <CTASection />
    </main>
  );
}
```

### shadcn/ui & Tailwind

```typescript
// ✓ Use shadcn/ui components for consistency
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ✓ Use cn() utility for conditional classes
import { cn } from "@/lib/utils";

export function Component() {
  const isActive = true;
  return (
    <div className={cn(
      "px-4 py-2 rounded-md transition-colors",
      isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
    )}>
      Content
    </div>
  );
}
```

### Data Organization

```typescript
// ✓ Keep portfolio data in lib/data.ts
export const projects = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with Stripe payments",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    image: "/projects/ecommerce.png",
    href: "https://example.com",
    github: "https://github.com/user/project",
  },
  // ...
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Prisma"] },
  // ...
];
```

### Bad Patterns (Avoid)

- ✗ Use `<div>` for interactive elements (use `<button>`)
- ✗ Hardcode strings (put them in `lib/data.ts`)
- ✗ Mix 'use client' at the page level (keep it granular)
- ✗ Add custom CSS when Tailwind classes work
- ✗ Skip TypeScript types on component props
- ✗ Use inline styles instead of Tailwind classes
- ✗ Forget `alt` text on images (`<img alt="..." />`)

### Naming Conventions

- **Files:** `camelCase.tsx` for components, `snake_case.ts` for utils
- **Components:** `PascalCase` in filenames and exports
- **Props interfaces:** `ComponentNameProps`
- **Classes/ids:** `kebab-case` in className (Tailwind handles this)
- **Variables/functions:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`

---

## shadcn/ui Component Usage

**Install new components with:**

```bash
pnpm dlx shadcn-ui@latest add [component-name]
```

**Common components for portfolio:**

- `Button` – All clickable actions
- `Card` – Project cards, testimonials, feature boxes
- `Badge` – Technology tags, skill labels
- `Dialog` – Modals (project details, contact)
- `Form` – Contact form validation with react-hook-form
- `Input`, `Textarea` – Form fields
- `Separator` – Visual dividers between sections
- `Tooltip` – Hover hints on tech icons

**DO NOT** customize shadcn components directly. If you need variations:

1. Create a wrapper component in `components/`
2. Use Tailwind `className` prop to extend styling
3. Example:

```typescript
// ✓ Extend shadcn component
export function PrimaryButton(props: ButtonProps) {
  return <Button {...props} className={cn("bg-gradient-to-r from-blue-600 to-purple-600", props.className)} />;
}
```

---

## Tailwind CSS Best Practices

```typescript
// ✓ Use consistent spacing (4px grid)
className = "p-4 m-8 gap-6 space-y-4"; // Good

// ✓ Use responsive prefixes
className = "text-lg md:text-2xl lg:text-4xl";

// ✓ Semantic color usage
className = "text-primary bg-secondary border-muted";

// ✓ Use Tailwind's animation utilities
className = "animate-fade-in hover:animate-pulse";

// ✗ Avoid
className = "p-5 m-7"; // Not on 4px grid
```

---

## Development Workflow

### Adding a New Page

1. Create file in `app/[slug]/page.tsx`
2. Add TypeScript types for props
3. Use shadcn/ui components
4. Test locally: `pnpm dev`
5. Check types: `pnpm lint`

### Adding a New Component

1. Create in `components/`
2. Export as named export
3. Include TypeScript props interface
4. Add brief JSDoc comment
5. Use in pages/other components

### Updating Styles

1. Edit `styles/globals.css` for global changes
2. Use `className` props for component-level styling
3. Avoid creating new CSS files
4. Use Tailwind utilities first, custom CSS last resort

### Deploying Changes

1. Run full check: `pnpm lint && pnpm test && pnpm build`
2. All checks must pass
3. Push to `main` branch
4. Vercel auto-deploys (watch deployment at vercel.com)

---

## Testing Requirements

**Test critical interactive components.** Use Jest + React Testing Library.

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/project-card';

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    render(
      <ProjectCard
        title="My Project"
        description="A cool project"
        tags={["React"]}
      />
    );
    expect(screen.getByText('My Project')).toBeInTheDocument();
  });
});
```

- **Location:** Collocate tests (`component.test.tsx` next to `component.tsx`)
- **Coverage:** Aim for 70%+ on interactive components
- **Run:** `pnpm test` or `pnpm test -- --watch`

---

## Git Workflow

**Commit convention:**

```
feat(projects): add project filtering by technology
fix(navbar): resolve mobile menu closing issue
style(hero): improve spacing on mobile devices
docs(readme): update setup instructions
refactor(components): extract project card logic
```

**Before committing:**

1. Run `pnpm lint:fix` (auto-fixes style issues)
2. Run `pnpm test` (ensure tests pass)
3. Check visual changes in `pnpm dev`
4. Write clear commit message

**Before opening PR:**

1. Ensure `pnpm build` succeeds
2. Verify no TypeScript errors
3. Test on mobile (DevTools mobile view)
4. Self-review for accessibility (alt text, ARIA, keyboard nav)

---

## Performance & Accessibility

### Images & Media

```typescript
// ✓ Use Next.js Image component
import Image from 'next/image';

<Image
  src="/projects/my-project.png"
  alt="My Project preview showing dashboard"
  width={1200}
  height={600}
  className="rounded-lg"
/>

// ✗ Avoid
<img src="/projects/my-project.png" />
```

### Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Headings follow h1 → h2 → h3 hierarchy
- [ ] Interactive elements are buttons or links (not divs)
- [ ] Forms have associated labels
- [ ] Color contrast passes WCAG AA (use tools to check)
- [ ] Keyboard navigation works (Tab, Enter, Esc)

### Performance Tips

- Use `next/image` for all images (automatic optimization)
- Lazy-load project images with `loading="lazy"`
- Code-split large components with `dynamic()` if needed
- Keep bundle size small—check with `pnpm build`

---

## Domain Knowledge: Portfolio Best Practices

### Portfolio Sections

- **Hero:** Eye-catching intro with CTA button
- **About:** Brief background, skills overview
- **Projects:** 3-6 featured projects with links
- **Skills:** Categorized tech stack
- **Contact:** Form or email/social links
- **Footer:** Copyright, social links

### Project Card Should Include

- Eye-catching image/thumbnail
- Clear title and description
- Technology tags (use Badge component)
- Link to live demo and GitHub repo
- One-sentence outcome/impact

### Common Portfolio Mistakes (Avoid)

1. **Too much text** – Keep descriptions to 1-2 sentences
2. **Outdated projects** – Remove or update old work
3. **Missing links** – Always link to live demos and repos
4. **Poor mobile experience** – Test extensively on mobile
5. **No clear CTA** – Tell visitors what you want them to do
6. **Broken images** – Verify all image paths in production
7. **Stale contact info** – Keep email/social links current

### SEO Basics

- Add metadata in `layout.tsx` (title, description, Open Graph)
- Use semantic HTML (Headings, nav, main, footer)
- Include alt text on all images
- Create `robots.txt` and `sitemap.xml` in `public/`

---

## Allowed Without Asking

- Read and modify any file in the repository
- Run type check, lint, format, and test commands
- Create new components or pages
- Update `lib/data.ts` with portfolio content
- Edit Tailwind or shadcn/ui styling
- Add new shadcn/ui components with `pnpm dlx shadcn-ui@latest add`

## Must Ask First

- Install new pnpm packages
- Delete files or directories
- Modify `next.config.js` or `tsconfig.json`
- Push to git or deploy
- Add environment variables
- Integrate external APIs or services

---

## Useful Commands Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start                # Run production build

# Code quality
pnpm lint             # Check code
pnpm lint:fix         # Auto-fix issues
pnpm format           # Format with Prettier

# Testing
pnpm test                 # Run tests
pnpm test -- --watch     # Watch mode

# shadcn/ui
pnpm dlx shadcn-ui@latest add [name]    # Add component
pnpm dlx shadcn-ui@latest list          # List installed
```

---

## Links & References

- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui Docs:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Deployment:** https://vercel.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

---

## How This File Is Used

- Agents read this on every task
- User instructions override this file
- Update in the same PR when conventions change
- Keep it under 200 lines for optimal performance
