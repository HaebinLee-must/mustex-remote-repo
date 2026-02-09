# Finora Design System Documentation

## Overview
This document outlines the design system for the **Finora** platform (formerly "Mongol CEX"). The system is built on **Tailwind CSS** and **Shadcn UI**, optimized for a high-performance, data-dense trading interface with a premium dark mode aesthetic.

---

## 1. Color Palette

The color system uses CSS variables with HSL values for maximum flexibility and theming support.

### Primary Colors
- **Primary**: `hsl(247 100% 62%)` (Vivid Violet/Blue)
  - Used for primary actions, branding, and key interactive elements.
- **Secondary**: `hsl(205 100% 35%)`
  - Used for secondary actions and supporting elements.
- **Accent**: `hsl(0 0% 10%)`
  - Used for accents and highlighting specific areas against the dark background.

### Feedback Colors
- **Success**: `hsl(160 84% 39%)` (Green)
  - Used for positive trends (price up), success states, and confirmations.
- **Destructive (Error)**: `hsl(0 84% 60%)` (Red)
  - Used for negative trends (price down), errors, and destructive actions.
- **Warning**: (Standard yellow/orange - check specific implementation if overridden)

### Neutral & Dark Mode
The interface is designed as "Dark Mode First".
- **Background**: `hsl(0 0% 0%)` (Pure Black for maximum contrast and OLED optimization)
- **Foreground (Text)**: `hsl(220 20% 92%)` (Off-white for readability without eye strain)
- **Card**: `hsl(0 0% 2%)` (Slightly lighter black for depth)
- **Muted**: `hsl(0 0% 7%)` (Deep gray for secondary backgrounds)
- **Border**: `hsl(0 0% 12%)` (Subtle borders)

---

## 2. Typography

The typography system is designed for clarity in data-heavy environments.

### Font Families
1.  **Primary (Body/Data)**: `Inter`, system-ui, sans-serif
    *   *Usage*: General UI text, labels, forms.
2.  **Display (Headings/Brand)**: `Poppins`, sans-serif
    *   *Usage*: Headings, marketing copy, brand elements.
3.  **Monospace (Code/Data)**: `JetBrains Mono`, monospace
    *   *Usage*: Code snippets, trading data (prices, volumes, order books).

### Font Sizes
| Token | Size | Line Height | CSS Value |
| :--- | :--- | :--- | :--- |
| `text-xs` | 0.75rem (12px) | 1rem | Usage: Micro copy, metadata |
| `text-sm` | 0.875rem (14px) | 1.25rem | Usage: Standard body text |
| `text-base` | 1rem (16px) | 1.5rem | Usage: Default text size |
| `text-lg` | 1.125rem (18px) | 1.75rem | Usage: Large body, subheadings |
| `text-xl` | 1.25rem (20px) | 1.75rem | Usage: Section headers |
| `text-2xl` | 1.5rem (24px) | 2rem | Usage: Page headers |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Usage: Major headings |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Usage: Display text |

### Typography Presets
- **Headings**: `h1` through `h6` with `scroll-m-20` and `tracking-tight`.
- **Trading Specific**:
    - `price`: Monospace, tabular nums, tracking-tight.
    - `priceUp`: Green color.
    - `priceDown`: Red color.
    - `volume`: Monospace, muted color.

---

## 3. Spacing & Radius

### Radius System
A consistent radius system softens the UI while maintaining a professional look.
- **None**: `0px`
- **Small (`sm`)**: `6px` (Tags, badges)
- **Default / Medium (`md`)**: `8px` (Standard inputs, buttons, cards)
- **Large (`lg`)**: `12px` (Larger interactive elements)
- **XL**: `16px` (Cards, panels)
- **2XL**: `20px` (Modals)
- **3XL**: `24px` (Hero sections)
- **Full**: `9999px` (Avatars, pills)

---

## 4. Components (Shadcn UI)
The project utilizes the **Shadcn UI** library, utilizing:
- **Radix UI** primitives for accessibility and functionality.
- **Tailwind CSS** for styling customization.
- **Clsx / Tailwind Merge** for class handling.

Base style is "default" (Slate-based, overridden by custom CSS variables).

## 5. Implementation Details
- **Configuration**: `tailwind.config.mjs`
- **CSS Variables**: `src/index.css`
- **Typography Definition**: `src/design-system/typography.ts`
