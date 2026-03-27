# 🚀 CSS Integration Guide - React Implementation

This guide explains how to integrate the CSS design system into your React application.

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Importing CSS](#importing-css)
3. [Component Integration](#component-integration)
4. [Using Utility Classes](#using-utility-classes)
5. [Responsive Design](#responsive-design)
6. [Dynamic Styling](#dynamic-styling)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### File Structure
```
hotel-frontend/client/src/
├── styles/
│   ├── variables.css        ← Design tokens
│   ├── globals.css          ← Reset & base
│   ├── typography.css       ← Text utilities
│   ├── animations.css       ← Keyframes
│   ├── layout.css           ← Layout helpers
│   ├── components.css       ← Component styles
│   ├── forms.css            ← Form inputs
│   └── index.css            ← Main import file
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css       ← Component styles
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   └── Hero/
│       ├── Hero.jsx
│       └── Hero.css
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── AllHotels/
│   │   ├── AllHotels.jsx
│   │   └── AllHotels.css
│   └── ... (other pages)
├── App.jsx
└── main.jsx
```

---

## Importing CSS

### Step 1: Import Main CSS in Application Entry Point

**File: `src/main.jsx`**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'  // ← Add this line (MUST be first import)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Why first?** It ensures all CSS variables and base styles load before any component styles, preventing cascade issues.

### Step 2: Import Component-Specific CSS

**File: `src/components/Header/Header.jsx`**
```javascript
import './Header.css'  // ← Import at top of component

export default function Header() {
  return (
    <header className="header">
      {/* Content */}
    </header>
  )
}
```

### Step 3: Pass CSS Classes via className

**File: `src/App.jsx`**
```javascript
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  )
}
```

---

## Component Integration

### Example 1: Button Component

**File: `src/components/Button/Button.jsx`**
```javascript
import './Button.css'  // Or share from components.css

export default function Button({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props 
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

**Usage:**
```jsx
<Button variant="primary" size="lg">Book Now</Button>
<Button variant="outline" size="sm">Learn More</Button>
<Button variant="error" disabled>Unavailable</Button>
```

### Example 2: Card Component

**File: `src/components/Card/Card.jsx`**
```javascript
import './Card.css'  // Or from components.css

export default function Card({ 
  variant = 'standard',
  children,
  className = '',
  ...props 
}) {
  return (
    <div
      className={`card card-${variant} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
```

**Usage:**
```jsx
<Card variant="elevated"> Premium Card </Card>
<Card variant="glass"> Glassmorphism </Card>
<Card variant="bordered"> Outlined Card </Card>
```

### Example 3: Page Component

**File: `src/pages/Home/Home.jsx`**
```javascript
import './Home.css'          // Page-specific styles
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Featured from './components/Featured'

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      
      {/* Featured Hotels Section */}
      <section className="featured-section">
        <div className="container mx-auto px-4">
          <h2 className="text-display-2 text-center mb-8">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured cards */}
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## Using Utility Classes

### Spacing Pattern
```jsx
{/* Padding - all sides */}
<div className="p-4">Padded div</div>
<div className="p-6">More padding</div>

{/* Padding - horizontal/vertical */}
<div className="px-4 py-6">Horizontal + vertical</div>
<div className="px-8">Horizontal only</div>

{/* Margin */}
<div className="m-4">Margin all</div>
<div className="mx-auto">Center horizontally</div>
<div className="mb-4">Margin bottom</div>
```

### Flexbox Pattern
```jsx
{/* Row (default, items in a line) */}
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

{/* Column (items stacked) */}
<div className="flex flex-col gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

{/* Space between (items pushed apart) */}
<div className="flex justify-between items-center px-6 py-4">
  <h1>Title</h1>
  <button>Action</button>
</div>

{/* Center items */}
<div className="flex justify-center items-center min-h-screen">
  <div>Centered content</div>
</div>
```

### Grid Pattern
```jsx
{/* 3-column grid */}
<div className="grid grid-cols-3 gap-6">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
  <div className="card">Item 3</div>
</div>

{/* 2-column on mobile, 3-column on desktop */}
<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
  {/* items */}
</div>
```

### Typography Pattern
```jsx
{/* Display heading */}
<h1 className="text-display-2 font-bold mb-6">
  Welcome to Our Hotel
</h1>

{/* Page title */}
<h2 className="text-heading-1 font-semibold mb-4">
  Featured Hotels
</h2>

{/* Body text */}
<p className="text-body-base text-neutral-700 leading-relaxed">
  Lorem ipsum dolor sit amet...
</p>

{/* Small text */}
<p className="text-body-sm text-neutral-500">
  Secondary information
</p>

{/* Label */}
<label className="text-label-md">Full Name</label>
```

---

## Responsive Design

### Mobile-First Approach

Always start with mobile styles, then add responsive prefixes:

```jsx
{/* 
  Mobile: 1 column
  Tablet (768px+): 2 columns
  Desktop (1024px+): 3 columns
*/}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* items */}
</div>
```

### Common Breakpoints

```javascript
// Mobile first (no prefix)
// Then add prefixes:
// md:  - 768px and up (tablets)
// lg:  - 1024px and up (desktop)
// xl:  - 1280px and up (large desktop)
// 2xl: - 1536px and up (extra large)
```

### Real-World Examples

**Navigation Header**
```jsx
<header className="flex justify-between items-center p-4 md:p-6 sticky top-0">
  <div className="logo">Logo</div>
  
  {/* Hidden on mobile, visible on tablet+ */}
  <nav className="hidden md:flex gap-6">
    <a>Home</a>
    <a>Hotels</a>
  </nav>
  
  {/* Hamburger menu - shown only on mobile */}
  <button className="md:hidden">☰</button>
</header>
```

**Sidebar + Content Layout**
```jsx
<div className="flex flex-col lg:flex-row gap-6 p-4">
  {/* Sidebar: full width on mobile, fixed width on desktop */}
  <aside className="w-full lg:w-64 flex-shrink-0">
    {/* Sidebar content */}
  </aside>
  
  {/* Main content: full width on mobile, flex remaining on desktop */}
  <main className="flex-1">
    {/* Main content */}
  </main>
</div>
```

**Grid Layout**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  {/* Each item uses all width on mobile, 2 cols on tablet, 4 cols on desktop */}
</div>
```

---

## Dynamic Styling

### Conditional Classes

```jsx
function BookingCard({ status, isHovered }) {
  return (
    <div
      className={`card transition-all ${
        isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'
      } ${
        status === 'confirmed' ? 'border-l-4 border-success' : ''
      } ${
        status === 'cancelled' ? 'opacity-60' : ''
      }`}
    >
      {/* Content */}
    </div>
  )
}
```

### Using State for Themes

```jsx
function ThemedContainer({ theme = 'light' }) {
  const bgClass = theme === 'dark' 
    ? 'bg-neutral-900 text-white' 
    : 'bg-white text-neutral-900'
  
  return (
    <div className={`p-6 rounded-lg ${bgClass}`}>
      {/* Content */}
    </div>
  )
}
```

### Dynamic Color System

Leverage CSS Variables in JavaScript:

```jsx
function RatingDisplay({ rating }) {
  const colorMap = {
    excellent: '--success',
    good: '--primary',
    average: '--warning',
    poor: '--error'
  }
  
  return (
    <div style={{
      color: `var(${colorMap[rating]})`
    }}>
      {rating.toUpperCase()}
    </div>
  )
}
```

### CSS Variable Access

```jsx
// Access design tokens programmatically
const getVariable = (name) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
}

// Usage
const primaryColor = getVariable('primary-600')  // #2563eb
const spacing = getVariable('spacing-4')          // 1rem
```

---

## Best Practices

### 1. Always Import CSS at Component Top
```javascript
// ✅ Good - import at top
import './MyComponent.css'
import React from 'react'

export default function MyComponent() { }

// ❌ Bad - import in middle
import React from 'react'
import './MyComponent.css'
```

### 2. Use Semantic HTML with Classes
```jsx
// ✅ Good - semantic + descriptive
<button className="btn btn-primary btn-lg">
  Book Now
</button>

// ❌ Bad - meaningless divs
<div 
  className="bg-blue-600 px-8 py-4 rounded"
  onClick={handleClick}
>
  Book Now
</div>
```

### 3. Combine Utility Classes Efficiently
```jsx
// ✅ Good - using predefined utilities
<div className="flex justify-between items-center p-6 shadow-lg">
  {/* content */}
</div>

// ❌ Bad - creating custom styles
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
}}>
  {/* content */}
</div>
```

### 4. Use Responsive Prefixes Instead of Media Queries
```jsx
// ✅ Good - responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* content */}
</div>

// ❌ Bad - custom media queries
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
}}>
  {/* content */}
</div>
```

### 5. Reuse Component Variants
```jsx
// ✅ Good - passing variant as prop
function MyComponent({ variant = 'primary' }) {
  return <div className={`card card-${variant}`} />
}

// Then use:
<MyComponent variant="glass" />
<MyComponent variant="bordered" />

// ❌ Bad - creating custom classes
function MyComponent({ isGlass }) {
  return (
    <div className={isGlass ? 'my-custom-glass-card' : 'my-custom-card'} />
  )
}
```

### 6. Leverage CSS Variables for Consistency
```jsx
// ✅ Good - using variables
<section 
  style={{ 
    backgroundColor: 'var(--primary-600)',
    color: 'white',
    padding: 'var(--spacing-8)'
  }}
>
  Featured
</section>

// ❌ Bad - hardcoded values
<section style={{
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '32px'
}}>
  Featured
</section>
```

---

## Troubleshooting

### Issue: Styles Not Applying

**Solution 1: CSS Import Order**
```javascript
// ✅ Correct order (main.jsx)
import './styles/index.css'  // Global styles FIRST
import React from 'react'
import App from './App.jsx'
```

**Solution 2: Component CSS Import**
```javascript
// ✅ Correct (at component top)
import './Header.css'
import React from 'react'

export default function Header() { }
```

**Solution 3: Class Name Match**
```jsx
// ✅ CSS file has this class
// Header.css: .header { ... }

// ✅ JSX uses matching class name
<header className="header"> {/* Matches! */}</header>

// ❌ Mismatched class name
<header className="Header"> {/* Doesn't match! */}</header>
```

### Issue: Styles Cascading Incorrectly

**Solution: Specificity**
```css
/* ✅ More specific - will override */
.card.card-glass {
  background: rgba(255, 255, 255, 0.1);
}

/* ❌ Less specific - might not override */
.card {
  background: white;
}
```

### Issue: Responsive Classes Not Working

**Solution: Mobile-First Order**
```jsx
{/* ✅ Correct - mobile first, then up */}
<div className="p-2 md:p-4 lg:p-6">
  {/* 2px padding on mobile, 4px on tablet, 6px on desktop */}
</div>

{/* ❌ Wrong - tablet prefix first */}
<div className="md:p-4 p-2 lg:p-6">
  {/* Unpredictable behavior */}
</div>
```

### Issue: Colors Look Different

**Solution: Check Color Context**
```jsx
// ✅ Good - on light background
<div className="bg-white">
  <p className="text-neutral-900">Dark text on light</p>
</div>

// ✅ Good - on dark background
<div className="bg-neutral-900">
  <p className="text-white">Light text on dark</p>
</div>
```

---

## CLI Integration (Optional)

If your project uses Vite with CSS processing:

### Build with CSS
```bash
npm run build
# Vite will bundle all imported CSS files
```

### Analyze CSS Output
```bash
# Check what CSS was generated
npm run build -- --prod
# Look in dist/assets/index-*.css
```

---

## Performance Optimization

### CSS Minification (Automatic)
```bash
npm run build
# Vite automatically minifies CSS in production
```

### Critical CSS
The main CSS is already optimized:
- All variables in `variables.css`
- Only used classes in component files
- No unused CSS bloat

### Lazy Loading Components
```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./Heavy.jsx'))

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

---

## Quick Reference

### Minimum Setup
```javascript
// src/main.jsx
import './styles/index.css'

// src/components/MyComponent.jsx
import './MyComponent.css'

export default function MyComponent() {
  return <div className="my-component">content</div>
}
```

### Most Common Classes
```
.container          - Max-width wrapper
.flex               - Flexbox row
.flex-col           - Flexbox column
.grid grid-cols-*   - Grid layout
.gap-*              - Gap between items
.p-* px-* py-*      - Padding
.m-* mx-* my-*      - Margin
.text-*             - Text size
.btn btn-*          - Button
.card               - Card container
.shadow-*           - Shadow effect
.rounded-*          - Border radius
.opacity-*          - Transparency
.hidden md:block     - Responsive
```

---

## Getting Help

1. **CSS not loading?** → Check `styles/index.css` imports
2. **Classes not working?** → Check `CSS_CLASSES_REFERENCE.md`
3. **Design questions?** → See `DESIGN_SYSTEM.md`
4. **Code examples?** → Check `QUICK_START.md`
5. **Filing issues?** → Include component name + class names used

---

**Last Updated:** March 25, 2026  
**Version:** 1.0  
**Status:** ✅ Ready for Implementation
