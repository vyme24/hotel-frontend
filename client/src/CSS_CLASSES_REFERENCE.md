# 🎨 CSS Classes Reference - Complete Index

## Quick Lookup Guide

This file contains all available CSS classes organized by category for quick reference.

---

## 🔘 Button Classes

### Variants
```
.btn-primary      - Main action buttons
.btn-secondary    - Alternative actions
.btn-accent       - High-priority actions (orange)
.btn-outline      - Bordered style
.btn-ghost        - Text only, no background
.btn-success      - Success actions (green)
.btn-error        - Danger actions (red)
```

### Sizes
```
.btn-xs           - Extra small (8px 12px)
.btn-sm           - Small (8px 16px)
.btn-md           - Medium (12px 24px) [default]
.btn-lg           - Large (16px 32px)
.btn-xl           - Extra large (20px 40px)
```

### Modifiers
```
.btn              - Base button class
.btn-block        - Full width
.btn:hover        - Lift effect
.btn:active       - Pressed effect
.btn:disabled     - Disabled state
```

---

## 🏷️ Badge Classes

### Colors
```
.badge-primary    - Blue background
.badge-secondary  - Gray background
.badge-success    - Green background
.badge-warning    - Yellow background
.badge-error      - Red background
.badge-accent     - Orange background
.badge-neutral    - Neutral background
```

### Default Class
```
.badge            - Base badge
```

---

## 📦 Card Classes

### Types
```
.card             - Standard elevated card
.card-sm          - Small card (less padding)
.card-lg          - Large card (more padding)
.card-bordered    - Border instead of shadow
.card-glass       - Glassmorphism effect
```

---

## ⚠️ Alert Classes

### Types
```
.alert-info       - Information alert (blue)
.alert-success    - Success alert (green)
.alert-warning    - Warning alert (yellow)
.alert-error      - Error alert (red)
```

### Default
```
.alert            - Base alert container
```

---

## 📝 Typography Classes

### Display Headings
```
.text-display-1   - 3.75rem (60px) - Hero titles
.text-display-2   - 3rem (48px)
.text-display-3   - 2.25rem (36px)
```

### Headings
```
.text-heading-1   - 1.875rem (30px)
.text-heading-2   - 1.5rem (24px)
.text-heading-3   - 1.25rem (20px)
```

### Body Text
```
.text-body-lg     - 1.125rem (18px) - Large content
.text-body-base   - 1rem (16px) - Standard content
.text-body-sm     - 0.875rem (14px) - Secondary content
.text-body-xs     - 0.75rem (12px) - Tertiary content
```

### Labels
```
.text-label-lg    - Base size, semibold, capitalized
.text-label-md    - Small, bold, uppercase
.text-label-sm    - Extra small, bold, uppercase
```

### Special
```
.text-caption     - Extra small, light color
.text-center      - Center aligned
.text-left        - Left aligned
.text-right       - Right aligned
.text-justify     - Justified text
```

### Font Weight
```
.font-light       - 300
.font-regular     - 400
.font-medium      - 500
.font-semibold    - 600
.font-bold        - 700
.font-extrabold   - 800
```

### Text Style
```
.italic           - Italic text
.underline        - Underlined text
.line-through     - Strikethrough
.truncate         - Single line ellipsis
.line-clamp-1     - Max 1 line
.line-clamp-2     - Max 2 lines
.line-clamp-3     - Max 3 lines
.line-clamp-4     - Max 4 lines
```

### Text Color
```
.text-primary     - Primary blue
.text-secondary   - Secondary gray
.text-success     - Success green
.text-warning     - Warning yellow
.text-error       - Error red
.text-info        - Info cyan
```

### Case
```
.uppercase        - UPPERCASE
.lowercase        - lowercase
.capitalize       - Capitalize
.normal-case      - Normal case
```

---

## 🎨 Color Variables

### Primary Blue
```
--primary-900     #0f172a - Darkest
--primary-800     #1e3a8a
--primary-700     #1e40af
--primary-600     #2563eb ⭐ (Main brand color)
--primary-500     #3b82f6
--primary-400     #60a5fa
--primary-300     #93c5fd
--primary-200     #bfdbfe
--primary-100     #dbeafe
--primary-50      #eff6ff - Lightest
```

### Accent Orange
```
--accent-900      #7c2d12 - Darkest
--accent-700      #ea580c
--accent-600      #f97316 ⭐ (Main accent)
--accent-500      #fb923c
--accent-400      #fdba74
--accent-100      #ffedd5
--accent-50       #fff7ed - Lightest
```

### Neutral
```
--neutral-900     #0f172a - Darkest
--neutral-800     #1e293b
--neutral-700     #334155
--neutral-600     #475569
--neutral-500     #64748b
--neutral-400     #94a3b8
--neutral-300     #cbd5e1
--neutral-200     #e2e8f0
--neutral-100     #f1f5f9
--neutral-50      #f8fafc - Lightest
```

### Semantic
```
--success         #10b981 - Green
--warning         #f59e0b - Amber
--error           #ef4444 - Red
--info            #0ea5e9 - Cyan
```

---

## 🌈 Flex Utilities

### Direction
```
.flex-row         - Horizontal (default)
.flex-col         - Vertical
```

### Wrapping
```
.flex-wrap        - Wrap items
.flex-nowrap      - No wrapping
```

### Flex Values
```
.flex-1           - flex: 1 (equal share)
.flex-auto        - flex: auto
.flex-none        - flex: none
```

### Justify Content
```
.justify-start    - flex-start
.justify-end      - flex-end
.justify-center   - center
.justify-between  - space-between
.justify-around   - space-around
.justify-evenly   - space-evenly
```

### Align Items
```
.items-start      - flex-start
.items-end        - flex-end
.items-center     - center
.items-baseline   - baseline
.items-stretch    - stretch
```

### Gap (Spacing between flex items)
```
.gap-1 .gap-2 .gap-3 .gap-4 .gap-5 .gap-6 .gap-8 .gap-10 .gap-12
```

---

## 📊 Grid Classes

### Columns
```
.grid-cols-1      - 1 column
.grid-cols-2      - 2 columns
.grid-cols-3      - 3 columns
.grid-cols-4      - 4 columns
.grid-cols-6      - 6 columns
.grid-cols-12     - 12 columns
```

### Rows
```
.grid-rows-1      - 1 row height
.grid-rows-2      - 2 row heights
```

---

## 🛠️ Spacing Classes

### Padding All Sides
```
.p-1 .p-2 .p-3 .p-4 .p-5 .p-6 .p-8 .p-10 .p-12
```

### Padding Horizontal
```
.px-1 .px-2 .px-3 .px-4 .px-6 .px-8
```

### Padding Vertical
```
.py-1 .py-2 .py-3 .py-4 .py-6 .py-8
```

### Padding Individual
```
.pt-2 .pt-4 .pt-6 .pt-8  (top)
.pb-2 .pb-4 .pb-6 .pb-8  (bottom)
.pl-2 .pr-2 (left/right)
```

### Margin All Sides
```
.m-1 .m-2 .m-3 .m-4 .m-5 .m-6 .m-8
.m-auto            - auto margin
```

### Margin Horizontal
```
.mx-1 .mx-2 .mx-3 .mx-4 .mx-6
.mx-auto           - centered
```

### Margin Vertical
```
.my-1 .my-2 .my-3 .my-4 .my-6 .my-8
```

### Margin Individual
```
.mt-2 .mt-4 .mt-6 .mt-8  (top)
.mb-2 .mb-4 .mb-6 .mb-8  (bottom)
.ml-2 .ml-4 .ml-auto     (left)
.mr-2 .mr-4 .mr-auto     (right)
```

---

## 📏 Sizing Classes

### Width
```
.w-full           - 100%
.w-auto           - auto
.w-screen         - 100vw
.w-max            - max-content
.w-min            - min-content
```

### Height
```
.h-full           - 100%
.h-auto           - auto
.h-screen         - 100vh
.h-max            - max-content
.h-min            - min-content
```

### Minimum Height
```
.min-h-screen     - 100vh
```

### Maximum Width
```
.max-w-full       - 100%
.max-w-container  - 1280px
```

---

## 👁️ Display Classes

### Display Types
```
.block            - display: block
.inline-block     - display: inline-block
.inline           - display: inline
.flex             - display: flex
.inline-flex      - display: inline-flex
.grid             - display: grid
.hidden           - display: none
```

### Responsive Display
```
.md-hidden        - Hidden on tablet+
.md-block         - Block on tablet+
.md-flex          - Flex on tablet+
.md-grid          - Grid on tablet+
```

---

## 📍 Positioning Classes

### Position Type
```
.relative         - position: relative
.absolute         - position: absolute
.fixed            - position: fixed
.sticky           - position: sticky
```

### Position Values
```
.top-0            - top: 0
.right-0          - right: 0
.bottom-0         - bottom: 0
.left-0           - left: 0
.top-1/2          - top: 50%
.left-1/2         - left: 50%
```

---

## 🎭 Overflow Classes

### Overflow
```
.overflow-auto    - auto
.overflow-hidden  - hidden
.overflow-visible - visible
.overflow-scroll  - scroll
```

### Axis
```
.overflow-x-auto  - horizontal auto
.overflow-y-auto  - vertical auto
```

---

## 🖼️ Object Fit Classes

```
.object-cover     - cover (crop image)
.object-contain   - contain (show whole)
.object-fill      - fill (stretch)
.object-scale-down - scale-down
```

---

## 👁️ Visibility Classes

```
.visible          - visibility: visible
.invisible        - visibility: hidden
.opacity-0        - opacity: 0 (invisible but clickable)
.opacity-50       - opacity: 0.5
.opacity-75       - opacity: 0.75
.opacity-100      - opacity: 1
```

---

## 🎀 Border Classes

### Border
```
.border           - 1px solid border
.border-2         - 2px solid border
.border-t         - Top border only
.border-b         - Bottom border only
.border-l         - Left border only
.border-r         - Right border only
```

### Border Radius
```
.rounded          - 8px radius
.rounded-md       - 6px radius
.rounded-lg       - 8px radius
.rounded-xl       - 12px radius
.rounded-2xl      - 16px radius
.rounded-full     - 9999px (circle)
```

---

## 🌟 Shadow Classes

### Standard Shadows
```
.shadow-none      - No shadow
.shadow-sm        - Small shadow
.shadow           - Medium shadow (default)
.shadow-lg        - Large shadow
.shadow-xl        - Extra large shadow
.shadow-2xl       - Double extra large shadow
```

### Elevation Shadows (Premium)
```
.shadow-elevation-1  - Level 1
.shadow-elevation-2  - Level 2 (hover)
.shadow-elevation-3  - Level 3
.shadow-elevation-4  - Level 4 (prominent)
```

---

## 🎬 Animation Classes

### Entrance
```
.animate-fade-in      - Fade in from transparent
.animate-slide-in-up  - Slide in from bottom
.animate-slide-in-down - Slide in from top
.animate-slide-in-left - Slide in from left
.animate-slide-in-right - Slide in from right
.animate-scale-in     - Scale up from center
```

### Continuous
```
.animate-pulse     - Pulse opacity
.animate-spin      - Rotate 360°
.animate-bounce    - Vertical bounce
.animate-float     - Gentle floating
.animate-glow      - Shadow glow
```

### Transitions
```
.transition-all          - All properties
.transition-colors       - Colors only
.transition-transform    - Transform only
.transition-opacity      - Opacity only
.transition-shadow       - Shadow only
.transition-fast         - 150ms
.transition-slow         - 350ms
.transition-slower       - 500ms
```

### Delays
```
.delay-100 .delay-200 .delay-300 .delay-500 .delay-700 .delay-1000
```

---

## 🔻 Z-Index Classes

```
.z-hide           - -1 (behind)
.z-auto           - auto
.z-dropdown       - 10
.z-sticky         - 20 (sticky header)
.z-fixed          - 30 (fixed elements)
.z-modal          - 50 (modals)
.z-tooltip        - 70 (tooltips)
```

---

## 🧩 Special Component Classes

### Form Components
```
.form-group       - Form field wrapper
.form-input       - Input field
.form-select      - Dropdown
.form-textarea    - Text area
.field-label      - Input label
.field-error      - Error message
.field-hint       - Helper text
```

### Component Base
```
.container        - Max-width container
.card             - Card container
.badge            - Badge element
.alert            - Alert container
.btn              - Button base
```

### Special States
```
.sr-only          - Screen reader only
.visually-hidden  - Visually hidden
.disabled         - Disabled state
.focus-visible    - Focus outline
```

---

## 📱 Responsive Prefixes

All spacing, sizing, and display utilities support responsive prefixes:

```
md:     - Tablet and up (768px+)
lg:     - Desktop and up (1024px+)
xl:     - Large desktop (1280px+)
2xl:    - Extra large (1536px+)
```

### Examples
```
.md:grid-cols-2         - 2 columns on tablet+
.lg:flex-row            - Flex row on desktop+
.md:hidden              - Hidden on tablet+
.lg:p-8                 - Padding on desktop+
.xl:max-w-container     - Max width on large+
```

---

## 🎓 Usage Patterns

### Common Layouts

**Centered Container**
```html
<div class="container mx-auto px-4">Content</div>
```

**Responsive Grid**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
```

**Flex Between**
```html
<div class="flex justify-between items-center gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

**Card Stack**
```html
<div class="flex flex-col gap-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
</div>
```

### Button Combinations
```html
<!-- Primary CTA -->
<button class="btn btn-primary btn-lg">Click Me</button>

<!-- Secondary Action -->
<button class="btn btn-secondary">Cancel</button>

<!-- Outline Variant -->
<button class="btn btn-outline btn-sm">Learn More</button>

<!-- Full Width -->
<button class="btn btn-primary btn-block">Continue</button>
```

---

## ⚡ Performance Tips

1. **Reuse classes** instead of writing inline styles
2. **Combine utilities** instead of creating new classes
3. **Use CSS variables** for dynamic values
4. **Leverage specificity** to keep override simple
5. **Organize imports** for clean output

---

## 📖 Need Help?

1. Check `DESIGN_SYSTEM.md` for detailed guidelines
2. See `QUICK_START.md` for code examples
3. Review component files for implementations
4. Use browser DevTools to inspect element classes

---

**Last Updated:** March 25, 2026  
**Version:** 1.0  
**Status:** ✅ Complete Reference
