# User Management Application Design Guidelines

## Design Approach

**Selected Approach:** Hybrid (Material Design + Custom Purple Theme)

The application combines Material Design's clean interface patterns with a distinctive purple brand identity. This utility-focused admin panel prioritizes data clarity and efficient workflows while maintaining visual appeal through strategic use of color and modern UI components.

**Key Design Principles:**
- Clarity first: Information hierarchy supports quick scanning and data comprehension
- Purposeful color: Purple as primary brand color, used strategically to guide attention
- Efficient interactions: Minimal clicks to complete tasks, clear CTAs
- Professional polish: Clean, modern aesthetic suitable for enterprise environments

## Core Design Elements

### A. Color Palette

**Primary Colors (Dark Mode):**
- Primary Purple: 270 70% 60% (buttons, active states, key actions)
- Primary Purple Dark: 270 70% 50% (hover states)
- Primary Purple Light: 270 60% 70% (subtle backgrounds, badges)
- Primary Purple Subtle: 270 40% 95% (light mode backgrounds)

**Neutral Colors:**
- Background Dark: 240 8% 12% (main background)
- Surface Dark: 240 6% 16% (cards, modals, tables)
- Surface Elevated: 240 5% 20% (hover states, elevated cards)
- Border: 240 6% 24% (dividers, table borders)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%
- Text Muted: 0 0% 50%

**Semantic Colors:**
- Success: 142 76% 45%
- Error: 0 72% 55%
- Warning: 38 92% 50%

### B. Typography

**Font Families:**
- Primary: 'Inter', -apple-system, system-ui, sans-serif
- Monospace: 'JetBrains Mono', 'Courier New', monospace (for IDs, codes)

**Type Scale:**
- Display: 32px/40px, font-weight 700 (page titles)
- Heading 1: 24px/32px, font-weight 600 (section headers)
- Heading 2: 20px/28px, font-weight 600 (card titles)
- Heading 3: 16px/24px, font-weight 600 (subsection titles)
- Body Large: 16px/24px, font-weight 400 (primary content)
- Body: 14px/20px, font-weight 400 (default text)
- Body Small: 12px/16px, font-weight 400 (labels, captions)

### C. Layout System

**Spacing Scale:** Use Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16, 20
- Micro spacing: 1-2 (between related elements)
- Component padding: 4-6 (internal card/button padding)
- Section spacing: 8-12 (between major sections)
- Page margins: 16-20 (outer page containers)

**Container Widths:**
- Max content width: max-w-7xl (1280px)
- Form containers: max-w-2xl (672px)
- Modal width: max-w-3xl (768px)

**Grid System:**
- User list table: Full-width responsive table
- Profile layout: Sidebar (320px) + Main content (flex-1)
- Form fields: Single column mobile, 2-column desktop (grid-cols-2)

### D. Component Library

**Navigation:**
- Top bar: Fixed header with logo, search, user menu
- Page breadcrumbs: Text-sm with chevron separators
- Tab navigation: Underline style with purple active indicator

**Data Display:**
- User cards: Dark surface, rounded-lg, p-6, border, hover:border-purple
- Table rows: Alternating row backgrounds, hover states, border-b dividers
- Avatar: Circular, 48px default, 96px profile page, with border-2 border-purple
- Badges: Rounded-full, text-xs, px-3 py-1, purple/success/error variants
- Stats cards: Grid layout, large numbers, purple accents

**Forms:**
- Input fields: Dark background, border, rounded-md, focus:border-purple focus:ring-purple
- Labels: Text-sm font-medium mb-2
- Text areas: min-h-24, resize-y
- Select dropdowns: Custom styled to match inputs
- File upload: Dashed border, drag-drop zone, purple on active
- Form sections: Grouped with headings, mb-8 spacing

**Buttons:**
- Primary: bg-purple text-white, rounded-md px-4 py-2.5
- Secondary: border border-purple text-purple, bg-transparent
- Danger: bg-red text-white (delete actions)
- Icon buttons: p-2, hover:bg-surface-elevated
- Button groups: Flex gap-3

**Modals:**
- Backdrop: Semi-transparent dark overlay
- Modal container: max-w-3xl, rounded-lg, p-6
- Header: Title + close button, border-b, mb-6
- Footer: Flex justify-end, gap-3, pt-6, border-t

**Tables:**
- Header: bg-surface-elevated, font-semibold, text-left
- Cells: px-4 py-3, text-sm
- Actions column: Flex gap-2, justify-end
- Search bar: Above table, w-full md:w-96

**Tabs:**
- Container: border-b border-border
- Tab buttons: px-6 py-3, relative, hover:text-purple
- Active indicator: Absolute bottom-0, h-0.5, bg-purple, w-full
- Tab content: pt-6

**Profile Section:**
- Profile header: Centered avatar, name (text-2xl), contact info below
- Info grid: 2-column on desktop, labels text-secondary, values text-primary
- Section cards: mb-6, last:mb-0

### E. Interactions & States

**Hover States:**
- Cards: border-purple-subtle, slight scale transform
- Buttons: Slight darkening, cursor pointer
- Table rows: bg-surface-elevated
- Links: text-purple underline

**Focus States:**
- Form inputs: 2px purple ring, border-purple
- Buttons: 2px purple ring offset
- Interactive elements: Visible keyboard focus indicators

**Loading States:**
- Skeleton loaders: Animated gradient, rounded shapes matching content
- Spinner: Purple circular spinner for async actions
- Disabled states: Opacity-50, cursor-not-allowed

**Animations:**
- Use sparingly and purposefully
- Modal entrance: Fade in backdrop, scale from 95% to 100%
- Tab switching: Smooth content fade transition
- Hover effects: 150ms ease transitions
- No unnecessary scroll animations

### F. Responsive Behavior

**Breakpoints:**
- Mobile: <768px - Single column, stacked navigation, full-width modals
- Tablet: 768px-1024px - 2-column forms, simplified table views
- Desktop: >1024px - Full layout with sidebar, multi-column grids

**Mobile Optimizations:**
- Tables convert to card-style stacked views
- Modals slide from bottom on mobile
- Tab navigation scrolls horizontally
- Touch-friendly targets (min 44px)

## Images

**No hero images required.** This is a utility-focused admin application prioritizing functionality over marketing imagery.

**Avatar/Profile Images:**
- User avatars throughout (circular, various sizes)
- Placeholder: Initials on purple gradient background
- Profile page: Large centered avatar (128px)

**Icons:**
- Use Heroicons (outline style) via CDN
- Size: w-5 h-5 for inline icons, w-6 h-6 for buttons
- Color: Match text color, purple for primary actions