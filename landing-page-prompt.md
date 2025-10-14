# Prompt: Build a professional landing page for a Web Animation Studio

## 🔧 Tech Stack

- **Framework**: ReactJS with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Styling**: Sass (SCSS syntax) using BEM methodology for class naming
- **No external CSS libraries** (Tailwind, Bootstrap, etc.)
- **Structure**: Clean Code architecture — each section is its own folder under `sections`, each with possible `components/` and a `data.ts` for the content (for easy multi-language adaptation).

---

## 🌐 Project Goal

Build a **landing page** for a **Web Animation Studio** focused on:

> **"Generating content that generates more content."**

The studio produces **animated digital content using web technologies**, emphasizing:

- Trackability of interaction
- Growth-driven design
- Scalable automation through AI

---

## 🧱 Page Structure

Split the landing page into **7 key sections**, each to be self-contained and modular:

1. **Hero Section**

   - Eye-catching headline + subheadline
   - CTA button
   - Background animation or dynamic visual

2. **Quote Section #1**

   - Short, impactful quote or statement
   - Style as a visual break

3. **Studio Overview Slider**

   - Horizontally scrollable or auto-advancing slider
   - Showcase studio capabilities, tech, and previous work (placeholder)

4. **Quote Section #2 (The Problem)**

   - Brief, bold statement about the problem space being solved
   - Possibly animated text or emphasis on pain points

5. **Services Section**

   - List of core offerings with iconography:
     - High-Performance Landing Pages
     - Performance Growth Strategy
     - From Idea to Product
     - Conceptualization
     - AI-Powered Automation

6. **Why Us Section**

   - Bullet points or cards with reasons:
     - Fast, custom animation with Web Tech
     - SEO and analytics ready by design
     - AI-enhanced content production
     - Scalable and growth-driven approach

7. **Bottom Hook CTA Section**
   - Strong final call to action
   - Email input + Button
   - Trust signals or "next step" guidance

---

## 🧩 Component Guidelines

- Each `Section` folder contains:
  - `index.tsx` (entry point)
  - `components/` (sub-elements if needed)
  - `data.ts` (JSON-like export with content)
  - `SectionName.module.scss` (BEM naming inside)
- Shared components like `Button`, `Slider`, `SectionTitle`, etc. in `shared/` folder

---

## 📝 Suggested Placeholder Content

### Hero Section (data.ts)

```ts
export const heroContent = {
  title: "We Animate Your Ideas Into Growth Engines",
  subtitle:
    "Web-native animated content designed to drive interaction, convert faster, and scale with AI.",
  ctaLabel: "Start Your Project",
};
```
