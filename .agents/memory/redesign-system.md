---
name: Constancium Redesign System
description: Design decisions for the PCA Patrimoine-inspired editorial redesign.
---

# Design System

## Color palette (explicit, not CSS vars)
- Navy hero/dark sections: `bg-[#0F1729]`
- Light sections: `bg-white` or `bg-[#FAFAF8]`
- Gold accent: `#D4AF37` / `#C9A431` (hover)
- Text dark: `text-[#0F1729]`
- Text muted: `text-gray-500`

## Typography
- Headlines: `font-serif` (Playfair Display)
- Body: Inter (default)
- Section label: `text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em]` preceded by `h-px w-8 bg-[#D4AF37]`

## Page structure (every interior page)
- `pt-[109px]` offset for fixed header (36px info bar + 70px nav + ~3px border)
- Dark hero banner: `bg-[#0F1729]` with gold eyebrow + white serif headline + gold accent word
- Light content sections below with alternating white / `#FAFAF8` backgrounds

## App.tsx
- `className="dark"` was REMOVED — use explicit colors everywhere.

**Why:** Site is light-dominant editorial design. Dark sections use explicit `bg-[#0F1729]`. Keeping `dark` class caused shadcn components to render in dark mode even inside light sections.

## Header height reference
Total fixed header ≈ 109px: 36px top info bar + 70px main nav + ~3px border.
Use `pt-[109px]` on hero sections of interior pages (not Home, which has its own full-height hero).

## Uploaded hero image
The uploaded hero asset is a full-page screenshot, not a standalone skyline photo. When reused as a background, preserve its aspect ratio with one-axis sizing and crop to the skyline; never set independent width and height percentages.

**Why:** Independent background dimensions visibly stretch the buildings and make the hero look artificial.

**How to apply:** Use proportional scaling plus `background-position` to isolate the skyline, and apply the original navy veil only on the photo area.
