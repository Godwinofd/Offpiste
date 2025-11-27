# OFFPISTE - Cinematic Ski Adventure Website

A world-class, scroll-driven cinematic ski adventure website built with Next.js 14, GSAP ScrollTrigger, and Spline 3D.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **3D**: Spline (@splinetool/react-spline)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 🎨 Features

### Completed
- ✅ Cinematic design system with custom color palette
- ✅ GSAP ScrollTrigger configuration with reduced-motion support
- ✅ Layout components (Header, Footer, ScrollProgress)
- ✅ Advanced snow particle system with cursor interaction
- ✅ Wind-based parallax effects
- ✅ Film grain overlay
- ✅ Scene 1: Hero Film Intro with logo reveal
- ✅ Scene 2: The Problem with staggered text animations
- ✅ Scene 3: The Vision with warm color transition
- ✅ Scene 12: Final CTA with magnetic button effect

### In Progress
- 🚧 Scenes 4-11 (Trip Types, Expedition Map, Gallery, Chalet, Equipment, Weather, Testimonials, Booking)
- 🚧 Spline 3D scene integration
- 🚧 Additional pages (Trips, About, Gallery, Contact)

## 📁 Project Structure

```
app/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx             # Homepage with all scenes
│   └── globals.css          # Global styles & design tokens
├── components/
│   ├── layout/              # Header, Footer, ScrollProgress
│   ├── scenes/              # 12 cinematic scroll scenes
│   ├── effects/             # SnowParticles, WindParallax, FilmGrain
│   ├── spline/              # Spline 3D scene wrappers
│   ├── ui/                  # Reusable UI components
│   ├── features/            # Advanced features (weather, mode toggle)
│   └── optimization/        # LazyLoad, VideoPlayer
├── lib/
│   ├── utils.ts             # Utility functions
│   └── gsap-config.ts       # GSAP configuration
└── hooks/                   # Custom React hooks
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎬 Cinematic Scenes

### Scene 1: Hero Film Intro
- Full-screen cinematic background
- GSAP character-by-character logo reveal
- Layered snow particles (3 depths)
- Spline 3D mountain silhouette (placeholder)
- Pulsing scroll indicator

### Scene 2: The Problem
- Dark, cold atmosphere
- Staggered word reveals
- Animated fog layers with parallax
- Fading previous lines

### Scene 3: The Vision
- Warm color transition (cold → warm gold)
- Rotating compass (Spline placeholder)
- Sequential text reveals
- Radial glow effect

### Scene 12: Final CTA
- GSAP timeline for text sequence
- Magnetic button effect
- Mountain landscape (Spline placeholder)
- Social proof stats

## 🎨 Design System

### Colors
- **Deep Blacks**: `#0a0a0a`, charcoal greys
- **Cold Blues**: `#1e3a8a` → `#3b82f6`
- **Snow Whites**: `#ffffff` → `#f1f3f5`
- **Warm Golds**: `#f59e0b` → `#fbbf24`

### Typography
- **Headings**: Oswald (400, 500, 600, 700)
- **Body**: Inter (300, 400, 500, 600, 700)

### Animations
- `snow-fall`: Particle falling animation
- `wind-sway`: Parallax sway effect
- `glow-pulse`: Pulsing glow effect
- `film-grain`: Subtle grain movement

## 🔧 Configuration

### Tailwind Config
Custom design tokens in `tailwind.config.ts`:
- Extended color palette
- Custom animations & keyframes
- Glassmorphism utilities
- Shadow effects (glow, inner-glow)

### GSAP Config
Global setup in `lib/gsap-config.ts`:
- ScrollTrigger registration
- Reduced-motion detection
- Custom easing curves
- Helper functions

## ♿ Accessibility

- Reduced-motion support (disables animations)
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High-contrast focus indicators

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Adaptive particle counts
- Touch-optimized interactions

## 🚀 Performance

- Lazy loading for heavy assets
- Intersection Observer for conditional rendering
- RequestAnimationFrame for smooth animations
- Optimized particle systems
- Code splitting

## 📝 Documentation

See additional documentation:
- `STORYBOARD.md` - Scene-by-scene visual descriptions
- `ANIMATION_ARCHITECTURE.md` - Complete GSAP animation docs
- `SPLINE_SPECIFICATIONS.md` - 3D scene specifications
- `COPY.md` - All website copy
- `MEDIA_REQUIREMENTS.md` - Asset requirements

## 🎯 Next Steps

1. Complete remaining scenes (4-11)
2. Create Spline 3D scenes in spline.design
3. Build additional pages (Trips, About, Gallery, Contact)
4. Implement booking flow
5. Add weather API integration
6. Performance optimization
7. Cross-browser testing

## 📄 License

© 2025 Offpiste Adventures. All rights reserved.

---

**Built with ❄️ by the Offpiste team**
