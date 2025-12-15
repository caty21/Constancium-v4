# Design Guidelines: Constancium Wealth Management

## Design Approach
**Reference-Based Approach** inspired by perlib.fr, Goldman Sachs, and BlackRock. Creates a sophisticated, trust-centered experience combining financial gravitas with modern digital elegance.

## Design Principles
1. **Premium Restraint**: Luxury through negative space and refined details
2. **Confident Authority**: Clear hierarchy establishing expertise
3. **Guided Trust**: Strategic placement of credentials and testimonials
4. **Effortless Engagement**: Smooth interactions that feel expensive

---

## Color System

**Primary Palette**:
- Midnight Deep: #0F1729 (backgrounds, headers)
- Midnight Mid: #1A2332 (sections, cards)
- Gold Primary: #D4AF37 (accents, CTAs, highlights)
- Gold Dark: #B8860B (hover states, borders)

**Supporting Colors**:
- White: #FFFFFF (text on dark, card backgrounds)
- Gray 100: #F8F9FA (light backgrounds)
- Gray 600: #6B7280 (secondary text)

**Usage Rules**:
- Primary background: #0F1729 for hero and footer
- Section alternation: #1A2332 and white
- Gold sparingly: CTAs, decorative lines, key highlights
- Text contrast: White on dark backgrounds, #0F1729 on light

---

## Typography System

**Font Families** (Google Fonts):
- Display: "Playfair Display" (serif) - Headlines, sophisticated elegance
- Body: "Inter" (sans-serif) - All content, modern clarity
- Accent: "Cormorant Garamond" (serif) - Subheadings, refined touch

**Hierarchy**:
- Hero Headline: text-5xl md:text-7xl, font-bold, Playfair Display
- Section Headers: text-4xl md:text-5xl, font-semibold, Playfair Display
- Module Titles: text-2xl md:text-3xl, font-semibold, Cormorant Garamond
- Body Text: text-base md:text-lg, Inter
- UI Labels: text-sm, font-medium, uppercase tracking-widest, Inter
- Fine Print: text-xs md:text-sm, Inter

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-8 to p-12
- Section spacing: py-20 md:py-32
- Module gaps: gap-8 md:gap-12
- Generous breathing room between sections

**Container Strategy**:
- Max width: max-w-7xl mx-auto px-6 md:px-8
- Content sections: max-w-6xl
- Full-bleed backgrounds with contained content

---

## Component Library

### Navigation
**Fixed Header** (backdrop-blur, semi-transparent #0F1729/95):
- Logo left (white/gold combination mark)
- Center nav: Services | About | Team | Insights | Contact
- Right: "Schedule Consultation" button (gold, blurred background)
- Transforms to solid on scroll with sliding gold underline

### Hero Section
**Full-Width, 90vh**:
- Large background image: Sophisticated city skyline or elegant interior
- Dark gradient overlay (0F1729/60 to 0F1729/90)
- Center-aligned content with maximum breathing room
- Headline + refined subheadline (Cormorant Garamond)
- Dual blurred-background buttons: "Our Services" + "Book Appointment"
- Subtle animated gold line below headline (slides in on load)
- Trust indicators: "Managing $2.5B+" | "25+ Years" | "ISO Certified"

### Service Modules
**Grid: 1-column mobile, 2-column tablet, 3-column desktop**

**Module Card Design**:
- White background with subtle shadow
- 60px top border (starts transparent)
- Gold line slides down from top on hover (transforms border)
- Icon: 48px gold circular outline, centered
- Title: text-2xl, Cormorant Garamond
- Description: 2-3 lines, Gray 600
- "Learn More" link with gold arrow (transforms on hover)
- Entire card lifts slightly on hover (translate-y-1 shadow-2xl)
- Padding: p-12

**Service Categories**:
- Wealth Planning
- Investment Management
- Estate Planning
- Tax Optimization
- Risk Management
- Legacy Succession

### Client Testimonials
**3-Column Grid** (stacks to 1-column mobile):
- Dark background section (#1A2332)
- Each testimonial card: Semi-transparent white background (white/5)
- Client photo: Circular, 80px, gold border (2px)
- Quote text: text-lg, italic, Cormorant Garamond
- Client name + title below
- 5-star rating (gold stars)
- Subtle stagger animation on scroll-into-view

### Team Section
**Asymmetric Layout**:
- Section headline: "Meet Our Advisors"
- Grid alternates: 2-column (image + bio) then 3-column cards
- Team photos: Professional, desaturated with gold overlay on hover
- Name + credentials prominent
- "Schedule With [Name]" button per profile
- LinkedIn icon link (subtle gold)

### Calendly Integration
**Embedded Section**:
- Full-width dark background (#0F1729)
- Headline: "Start Your Wealth Journey"
- Inline Calendly widget (white background, rounded-2xl)
- Side panel: Benefits of consultation (bullet points with gold checkmarks)
- "Prefer to call? (555) 123-4567" alternative

### Statistics Banner
**Full-Width Section** (between hero and services):
- 4-column grid: Assets Under Management | Years Experience | Client Families | Average Portfolio Growth
- Large numbers: text-5xl, Playfair Display, gold
- Labels below: uppercase, tracking-wide, gray
- Animated count-up on scroll-into-view

### Insights/Blog Preview
**2-Column Article Cards**:
- Featured image with gold overlay gradient on hover
- Category tag (small, gold background)
- Article title: text-xl, Playfair Display
- Excerpt: 2 lines
- "Read More" link with animated gold underline
- Publication date

### Footer
**Multi-Column Layout** (dark #0F1729):
- 4 columns: Services | Company | Resources | Contact
- Newsletter signup: Email input + gold button
- Social icons (LinkedIn, Twitter) - gold on hover
- Compliance text: Small, gray
- Gold decorative line separator at top

---

## Animations & Interactions

**Micro-Interactions**:
- Gold sliding lines on module hover (CSS transform origin top)
- Card lift on hover (translate-y-1)
- Button background blur always present, scale on hover (scale-105)
- Link underlines: Expand from left (transform-origin left)
- Smooth page transitions (0.3s ease-in-out)

**Scroll Animations**:
- Staggered fade-in for grids
- Statistics count-up trigger
- Parallax on hero image (subtle, 0.5 speed)

---

## Images

**Hero Section**: 
Large, professional photograph - options include:
- Panoramic city skyline at dusk (sophisticated, aspirational)
- Elegant modern office interior with natural light
- Abstract architectural lines (luxury building detail)

**Team Section**:
- Professional headshots, consistent lighting
- Neutral backgrounds
- High resolution, warm color grading

**Insights Section**:
- Financial imagery (charts, elegant office settings)
- Lifestyle photos (retirement, family wealth)

**Trust Elements**:
- Client success story imagery (lifestyle, aspirational)
- Certification badges and awards
- Office location photos

---

## Page Structure

1. **Hero** (90vh): Image background, headline, CTAs, trust indicators
2. **Statistics Banner**: 4-column metrics with animated numbers
3. **Services Modules**: 3-column grid with hover animations (6 modules)
4. **About Section**: 2-column (image + story) with timeline
5. **Client Testimonials**: 3-column cards on dark background
6. **Team Section**: Featured advisors with Calendly links
7. **Calendly Integration**: Full embedded scheduling widget
8. **Insights Preview**: 2-column latest articles
9. **Newsletter Signup**: Inline with value proposition
10. **Footer**: Multi-column with compliance, contact, social

---

## Accessibility
- WCAG AAA contrast ratios (white on #0F1729, gold for accents only)
- Focus states: Gold outline (2px, rounded)
- Keyboard navigation throughout
- ARIA labels for all icon buttons
- Form labels explicitly associated