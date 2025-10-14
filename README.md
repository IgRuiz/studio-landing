# Web Animation Studio Landing Page

A professional, high-performance landing page for a Web Animation Studio focused on generating content that generates more content.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Package Manager**: pnpm
- **Styling**: Sass (SCSS) with BEM methodology
- **Architecture**: Clean Code - modular sections with dedicated data files

## Features

- Fully animated hero section with gradient orbs
- Interactive slider showcasing studio capabilities
- Services section with hover animations
- Why Us section with numbered items
- Bottom CTA with email form
- Fully responsive design
- SEO-ready markup
- No external CSS frameworks

## Project Structure

```
src/
├── sections/                  # All page sections
│   ├── Hero/                 # Hero section with animations
│   ├── Quote1/               # First quote section
│   ├── StudioSlider/         # Interactive slider
│   ├── Quote2/               # Second quote (The Problem)
│   ├── Services/             # Services grid
│   ├── WhyUs/                # Why choose us section
│   └── BottomCTA/            # Bottom CTA with form
├── shared/                    # Shared components
│   └── components/
│       ├── Button.tsx        # Reusable button component
│       └── SectionTitle.tsx  # Section title component
├── styles/                    # Global styles
│   ├── _variables.scss       # SCSS variables
│   ├── _mixins.scss          # SCSS mixins
│   └── global.scss           # Global styles
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point

```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start dev server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
pnpm build
```

### Preview

```bash
# Preview production build
pnpm preview
```

## Section Overview

### 1. Hero Section
Eye-catching hero with animated gradient orbs and floating boxes. Features main headline, subtitle, and CTA button.

### 2. Quote Section #1
Visual break with an impactful quote about the studio's philosophy.

### 3. Studio Slider
Auto-advancing horizontal slider showcasing studio capabilities, technologies, and approach. Features manual navigation controls.

### 4. Quote Section #2 (The Problem)
Bold statement about the problem space with animated gradient text and pattern background.

### 5. Services Section
Grid layout showcasing five core services with icons, hover animations, and detailed descriptions.

### 6. Why Us Section
Numbered list of four key differentiators with icons and animations on scroll.

### 7. Bottom CTA
Final call-to-action with email form, trust signals, and gradient background.

## Customization

### Content
Each section has a `data.ts` file for easy content updates and multi-language adaptation:

```typescript
// Example: src/sections/Hero/data.ts
export const heroContent = {
  title: "We Animate Your Ideas Into Growth Engines",
  subtitle: "Web-native animated content designed to drive interaction...",
  ctaLabel: "Start Your Project",
};
```

### Styling
Global design tokens are in `src/styles/_variables.scss`:
- Colors
- Typography
- Spacing
- Breakpoints
- Shadows
- Transitions

### BEM Methodology
All components use BEM (Block Element Modifier) naming:

```scss
.section-title {           // Block
  &__heading { }          // Element
  &__subtitle { }         // Element
  &--center { }           // Modifier
}
```

## Performance

- No external CSS libraries
- Optimized animations using CSS transforms
- Lazy-loaded components ready
- Production build is minified and optimized
- Total bundle size: ~64KB (gzipped)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
