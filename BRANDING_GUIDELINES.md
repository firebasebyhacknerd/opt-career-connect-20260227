# OPT Career Connect Brand Guide

## 1. Brand Core
- Brand name: OPT Career Connect
- Short name: OCC
- Tagline: Your Gateway to American Dreams
- Positioning: AI-powered career platform for international students on OPT, CPT, and F-1 pathways in the United States.

## 2. Visual Identity
### Color System
- Primary Blue: `#1d4ed8`
- Primary Teal: `#0f766e`
- Primary Orange: `#ea580c`
- Dark Blue: `#0f172a`
- Dark Gray: `#1e293b`
- Medium Gray: `#475569`
- Light Border: `#e2e8f0`

### Gradient System
- Primary CTA gradient: `linear-gradient(130deg, #1d4ed8 0%, #0f766e 55%, #0ea5e9 100%)`
- Accent gradient: `linear-gradient(120deg, #0f766e 0%, #ea580c 100%)`
- Shell/background gradient: use soft blue/teal/orange radial fields on light base (`#f5f9fc`).

### Typography
- Display font: Sora
- UI/body font: Manrope
- Rule: headlines use display font, body and controls use Manrope.

### Iconography
- Primary icon family: Lucide
- Brand symbol: graduation cap inside blue-teal rounded square or circle
- Use clean line icons, medium stroke, minimal decorative icon clutter.

## 3. Voice and Messaging
### Tone
- Clear, practical, and confident
- Supportive but not fluffy
- Student-first and action-oriented

### Core Messages
- Visa-aware job search
- AI resume optimization for real roles
- Fast iteration without cost barriers
- Practical actions over generic advice

### Copy Rules
- Keep sentence length short to medium.
- Avoid hype words like "revolutionary".
- Prefer measurable claims only when backed by data.
- Use "OPT/CPT/F-1" context where relevant.

## 4. Product-Wide Branding Standards
### Navigation
- Sticky glass-style top nav
- Active route state highlighted
- Brand name + tagline always visible on desktop

### Buttons
- Primary actions: gradient filled button
- Secondary actions: translucent white with subtle border
- Hover: slight lift + stronger shadow

### Cards and Panels
- Rounded corners (`xl` to `3xl`)
- Soft glass background (`white/85+`) with light border
- Subtle depth using low-contrast shadow

### Section Composition
- One dominant headline per section
- Small uppercase context badge above section title
- Use atmospheric gradient blobs for depth, not noisy backgrounds

## 5. SEO and Metadata Branding
- Metadata title format: `%s | OPT Career Connect`
- Default app title: `OPT Career Connect | AI Job Platform for OPT & CPT Students`
- Consistent brand description in root metadata and JSON-LD
- Organization schema name must always be `OPT Career Connect`
- Use canonical URLs for all indexable pages

## 6. Implementation Source of Truth
Use these code files as brand sources:
- `src/lib/brand.ts`: brand name, tagline, support email, social links, website
- `src/app/globals.css`: brand visual tokens, global atmosphere, button/card behavior
- `src/components/SiteHeader.tsx`: logo + top-level brand navigation
- `src/components/Footer.tsx`: branded footer, support identity, product framing
- `src/app/layout.tsx`: global metadata and SEO brand alignment

## 7. Do / Do Not
### Do
- Keep branding consistent across home, jobs, resume, demo, register, and admin pages.
- Reuse brand constants from `src/lib/brand.ts`.
- Keep visual language consistent: gradients, glass cards, rounded geometry.

### Do Not
- Introduce alternate brand names or slogans.
- Mix unrelated color themes per page.
- Use default/plain component styling when branded components exist.
- Add dead links in footer or top nav.

## 8. Release Checklist (Branding)
- [ ] Header and footer appear consistent on all user-facing pages
- [ ] Metadata title/description and OG/Twitter content uses brand framing
- [ ] All key pages use shared button and card styling
- [ ] No unbranded placeholders or inconsistent tone
- [ ] Mobile layout keeps logo, navigation, and CTA clarity
