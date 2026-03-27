# 🚀 Quick Start Guide - CSS Usage

## Import Styles

In your main React component or `main.jsx`:

```jsx
import './styles/index.css'; // Imports all design system files
```

---

## Common Patterns

### 1️⃣ Container with Max Width

```jsx
<div className="container">
  <h1>Page Title</h1>
  <p>Content goes here</p>
</div>
```

```css
.container {
  max-width: var(--container-max);  /* 1280px */
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

---

### 2️⃣ Hero Section

```jsx
<section className="hero">
  <div className="hero-content">
    <h1 className="text-display-2">Find Your Perfect Hotel</h1>
    <p className="text-lg text-secondary">Browse thousands of properties</p>
    <div className="search-box mt-8">
      {/* Search form */}
    </div>
  </div>
</section>
```

---

### 3️⃣ Card Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  {hotels.map(hotel => (
    <div key={hotel.id} className="card">
      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-heading-3 mt-4">{hotel.name}</h3>
      <p className="text-body-sm text-secondary">{hotel.location}</p>
      <button className="btn btn-primary mt-4 w-full">View Details</button>
    </div>
  ))}
</div>
```

---

### 4️⃣ Hotel Card with Amenities

```jsx
<div className="card">
  <div className="hotel-card-image">
    <img src={image} alt="Hotel" />
    <span className="hotel-card-badge">Best Deal</span>
  </div>
  
  <div className="hotel-card-content">
    <h4 className="hotel-card-title">{name}</h4>
    
    <div className="hotel-card-location">
      📍 {location}
    </div>
    
    <div className="hotel-card-rating">
      <div className="stars">⭐⭐⭐⭐⭐</div>
      <span className="rating-text">4.8</span>
      <span className="rating-count">(2,340)</span>
    </div>
    
    <div className="hotel-card-amenities">
      <span className="amenity-badge">🌊 Pool</span>
      <span className="amenity-badge">📶 WiFi</span>
      <span className="amenity-badge">🏋️ Gym</span>
    </div>
    
    <div className="hotel-card-price">
      <span className="price-amount">₹5,200</span>
      <span className="price-label">/night</span>
    </div>
    
    <div className="hotel-card-action">
      <button className="btn btn-outline">Details</button>
      <button className="btn btn-primary">Book</button>
    </div>
  </div>
</div>
```

---

### 5️⃣ Form Group

```jsx
<div className="form-group">
  <label className="form-label">
    Email Address
    <span className="required">*</span>
  </label>
  <input 
    type="email" 
    className="form-input" 
    placeholder="you@example.com"
    required
  />
  <span className="field-hint">We'll never share your email</span>
</div>
```

---

### 6️⃣ Checkout Form with Summary

```jsx
<div className="checkout-container">
  {/* Left: Form */}
  <div className="checkout-main">
    <div className="checkout-section">
      <div className="section-header">
        <span className="section-number">1</span>
        <h2 className="section-title">Guest Details</h2>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input className="form-input" placeholder="John" />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input className="form-input" placeholder="Doe" />
        </div>
      </div>
    </div>
  </div>
  
  {/* Right: Summary */}
  <div className="booking-summary">
    <h3 className="summary-heading">Booking Summary</h3>
    
    <div className="summary-item">
      <span className="label">Hotel</span>
      <span className="value">Luxury Resort</span>
    </div>
    
    <div className="summary-dates">
      <div className="date">
        <span className="label">Check-in</span>
        <span className="value">Mar 25, 2026</span>
      </div>
      <div className="date">
        <span className="label">Check-out</span>
        <span className="value">Mar 28, 2026</span>
      </div>
    </div>
    
    <div className="breakdown-divider"></div>
    
    <div className="breakdown-item">
      <span className="label">3 Nights × ₹5,200</span>
      <span className="value">₹15,600</span>
    </div>
    
    <div className="breakdown-item">
      <span className="label">Taxes & Fees</span>
      <span className="value">₹2,275</span>
    </div>
    
    <div className="breakdown-item discount">
      <span className="label">Discount (SAVE10)</span>
      <span className="value">-₹1,887</span>
    </div>
    
    <div className="summary-total">
      <span className="label">Total</span>
      <span className="value">₹15,988</span>
    </div>
    
    <button className="checkout-btn">Continue to Payment</button>
  </div>
</div>
```

---

### 7️⃣ Payment Methods

```jsx
<div className="payment-methods-section">
  <h2 className="methods-title">Select Payment Method</h2>
  
  <div className="methods-grid">
    <label className="method-card active">
      <input type="radio" name="payment" value="card" defaultChecked />
      <div className="method-icon">💳</div>
      <div className="method-label">Debit/Credit Card</div>
      <div className="method-desc">Visa, Mastercard</div>
    </label>
    
    <label className="method-card">
      <input type="radio" name="payment" value="upi" />
      <div className="method-icon">📱</div>
      <div className="method-label">UPI</div>
      <div className="method-desc">Google Pay, Paytm</div>
    </label>
    
    <label className="method-card">
      <input type="radio" name="payment" value="netbanking" />
      <div className="method-icon">🏦</div>
      <div className="method-label">Net Banking</div>
      <div className="method-desc">All Banks</div>
    </label>
  </div>
</div>
```

---

### 8️⃣ Dashboard Sidebar

```jsx
<div className="dashboard-page">
  {/* Sidebar */}
  <div className="dashboard-sidebar">
    <div className="sidebar-header">
      <div className="sidebar-avatar">JD</div>
      <div className="sidebar-info">
        <div className="name">John Doe</div>
        <div className="status">Premium Member</div>
      </div>
    </div>
    
    <nav className="sidebar-nav">
      <a href="/bookings" className="nav-item active">
        <span className="icon">📅</span>
        My Bookings
      </a>
      <a href="/reviews" className="nav-item">
        <span className="icon">⭐</span>
        My Reviews
      </a>
      <a href="/notifications" className="nav-item">
        <span className="icon">🔔</span>
        Notifications
      </a>
      <a href="/profile" className="nav-item">
        <span className="icon">⚙️</span>
        Settings
      </a>
    </nav>
    
    <div className="sidebar-divider"></div>
    
    <div className="sidebar-action">
      <button>Logout</button>
    </div>
  </div>
  
  {/* Main Content */}
  <div className="dashboard-main">
    {/* Your content */}
  </div>
</div>
```

---

## Utility Classes

### Spacing
```jsx
<div className="mt-4">Top margin</div>
<div className="mb-6">Bottom margin</div>
<div className="p-6">Padding on all sides</div>
<div className="px-4 py-6">Horizontal padding & vertical padding</div>
```

### Layout
```jsx
<div className="flex items-center justify-between gap-4">Flex with spacing</div>
<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">Responsive grid</div>
<div className="w-full">Full width</div>
<div className="max-w-container mx-auto">Centered container</div>
```

### Text
```jsx
<p className="text-body-base">Standard text</p>
<p className="text-heading-3">Heading style</p>
<p className="text-secondary">Secondary text color</p>
<p className="capitalize">Capitalize text</p>
<p className="truncate">Truncate long text...</p>
<p className="line-clamp-2">Limit to 2 lines</p>
```

### Display
```jsx
<div className="hidden md:block">Hidden on mobile</div>
<div className="md-hidden">Hidden on desktop</div>
<div className="invisible">Invisible but takes space</div>
```

### Shadows
```jsx
<div className="shadow-md">Standard shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-elevation-2">Elevation shadow</div>
```

---

## Color Variables

### Text Colors
```jsx
<p className="text-primary">Primary blue</p>
<p className="text-secondary">Secondary gray</p>
<p className="text-success">Success green</p>
<p className="text-error">Error red</p>
```

### Background Colors
```jsx
<div style={{ backgroundColor: 'var(--bg-primary)' }}>Primary bg</div>
<div style={{ backgroundColor: 'var(--neutral-100)' }}>Light bg</div>
```

---

## Animations

### Adding Animation to Elements
```jsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-in-up">Slide in from bottom</div>
<div className="transition-all hover:shadow-lg">Hover effect</div>
<div className="animate-pulse">Pulsing effect</div>
```

### Custom Duration
```css
.custom-animation {
  animation: slideInUp var(--transition-slow); /* Slower */
  animation: fadeIn var(--transition-fast);    /* Faster */
}
```

---

## Responsive Tips

### Mobile-First Approach
```jsx
// Default (mobile)
<div className="grid grid-cols-1 gap-4">
  
// Tablet and up
  // md:grid-cols-2
  
// Desktop and up
  // lg:grid-cols-3
</div>
```

### Common Breakpoints
- Mobile: Base styles
- Tablet (768px+): `md:`
- Desktop (1024px+): `lg:`
- Large Desktop (1280px+): `xl:`

---

## Best Practices Checklist

- ✅ Import all CSS from `styles/index.css`
- ✅ Use CSS variables for colors/spacing
- ✅ Follow mobile-first responsive approach
- ✅ Always include fallback fonts
- ✅ Test keyboard navigation
- ✅ Use semantic HTML
- ✅ Add ARIA labels where needed
- ✅ Keep animations under 350ms
- ✅ Use box-shadow for elevation, not borders
- ✅ Properly organize CSS in separate files

---

## Getting Help

1. Check `DESIGN_SYSTEM.md` for detailed documentation
2. Look for similar components in existing pages
3. Refer to CSS comments for specific behaviors
4. Test in browser DevTools
5. Verify responsive on all breakpoints

**Happy Coding! 🎉**
