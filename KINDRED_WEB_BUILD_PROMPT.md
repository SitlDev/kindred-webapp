# 🌱 KINDRED: Complete Web App Build Prompt

**A trust-first mentoring community. Find your people. Learn together. Stay rooted.**

---

## TABLE OF CONTENTS

1. [Product Overview](#product-overview)
2. [Design System](#design-system)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [API Specification](#api-specification)
6. [Web-Specific Implementation](#web-specific-implementation)
7. [Page-by-Page Specification](#page-by-page-specification)
8. [Code Patterns & Examples](#code-patterns--examples)
9. [Responsive Design Strategy](#responsive-design-strategy)
10. [Testing Strategy](#testing-strategy)
11. [Deployment & Launch](#deployment--launch)

---

## PRODUCT OVERVIEW

### What We're Building

Kindred is a **trust-first mentoring community** where professionals and students find values-aligned mentors, build real relationships, and show up consistently.

### Core Mechanics

```
1. VERIFY YOURSELF
   ├─ Email + Password (required)
   ├─ Legal name + Phone (required)
   ├─ Address (optional, for recovery)
   ├─ 2FA via SMS (mandatory on all logins)
   └─ Work/School email domain (optional, builds trust)

2. BUILD YOUR PROFILE
   ├─ Profile photo (clear, recent, verified)
   ├─ Display name (can differ from legal name)
   ├─ Skills (3-5 you can teach)
   ├─ Values (3-5 that matter most)
   └─ Location (city level, not exact)

3. FIND YOUR PEOPLE
   ├─ Search mentors by skill
   ├─ Filter by values alignment
   ├─ See verified background (domain, reviews, trust score)
   ├─ Request mentoring (async or video)
   └─ Build relationships (long-term, not transactional)

4. SHOW UP LOCALLY
   ├─ Check in at a location (café, library, park)
   ├─ Set visibility (mentors only, visible to all, private)
   ├─ See who else is checked in (only if you're also checked in)
   ├─ Meet mentors in person when possible
   └─ Attend local events & gatherings

5. GROW GLOBALLY
   ├─ Video mentoring with experts anywhere
   ├─ Async conversations (Slack-like messages)
   ├─ Review each other (build community trust)
   ├─ Join global events & workshops
   └─ Connect with mentors visiting your city

6. EARN TRUST
   ├─ Trust score is behavior-based (reviews, help-swaps, consistency)
   ├─ Check-in streaks show reliability (🔥 emoji = "you're showing up")
   ├─ Verified badges build credibility (domain, reviews)
   ├─ Founding Circle members get lifetime benefits
   └─ More trust = better matches & more visibility
```

### NOT What We're Building

```
❌ A skill marketplace (transactional)
❌ A course platform (content-driven)
❌ A gig economy (freelance work)
❌ A social media clone (followers)
❌ An invasive ID verification system (privacy-respecting instead)
```

### Core Constraints (Don't Break These)

```
✅ Domain verification only (google.com, stanford.edu)
✅ No SSN, government ID, or invasive PII collection
✅ Email + phone + legal name + optional address only
✅ 2FA required on all logins (SMS primary)
✅ Trust score is behavior-based & always visible
✅ Values alignment is as important as skill matching
✅ Check-in reciprocity is non-negotiable (no surveillance)
✅ Founding Circle stays under 500 members (hard cap)
✅ Desktop/web version supports all features (mobile feature parity)
✅ Calm UX (no FOMO, no artificial urgency except Founding Circle)
```

---

## DESIGN SYSTEM

### Color Palette

```
Primary: Deep Sage #3D5941
├─ Trust, growth, rootedness
├─ Primary actions, verified badges, active states
└─ Example: "Verify Email" button, Trust score, Active tabs

Secondary: Warm Clay #C4956D
├─ Human, approachable, mentoring warmth
├─ Accents, mentor avatars, secondary CTAs
└─ Example: Mentor card borders, Secondary buttons

Neutral: Soft Cream #FAF8F3
├─ Safety, clarity, breathing room
├─ Card backgrounds, screen backgrounds, dividers
└─ Example: Check-in card background, Empty states

Text: Charcoal #2C3E35
├─ Serious, deep, legible, accessible
├─ Body text, headlines, critical info
└─ Example: Profile names, Descriptions, Settings

Accent: Gold Ochre #D4A574
├─ Achievement, valued status, founding member
├─ Special badges, milestones, success states
└─ Example: Founding Circle badge, Trust score highlight

Background: White #FFFFFF
├─ Main page backgrounds
├─ High contrast for readability
└─ Accessible for all users
```

### Typography

```
Headlines (H1-H4): Georgia or Cambria
├─ Serif, wise, timeless, trustworthy
├─ Font sizes: H1=42px, H2=32px, H3=24px, H4=20px
└─ Weight: Regular (400), Bold (700) for emphasis
├─ Line height: 1.2 (tight, strong presence)

Body & UI: Inter or Outfit
├─ Clean, warm, accessible, modern
├─ Font sizes: Body=16px, Caption=14px, Small=12px
├─ Line height: 1.5-1.6 (comfortable reading)
└─ Weights: Regular (400), Medium (500), Bold (700)

Code/Skills: IBM Plex Mono
├─ Technical clarity
├─ Font size: 13px-14px
└─ Weight: Regular (400)

Links:
├─ Color: Deep Sage #3D5941
├─ Underline: Only on hover (not default)
├─ Cursor: pointer
└─ Transition: color 0.2s ease
```

### Spacing & Layout

```
Base unit: 4px (always multiples of 4)
├─ 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64...

MAX CONTENT WIDTH: 1200px
├─ Horizontal padding: 24px (each side)
├─ Full width on mobile/tablet
└─ Centered on desktop

SIDEBAR:
├─ Width: 280px (fixed on desktop)
├─ Collapses to drawer on tablet (<1024px)
├─ Hides on mobile (hamburger menu)
└─ Smooth transition: 0.3s

HEADER:
├─ Height: 64px (sticky on top)
├─ Logo area: 40px
└─ Padding: 12px 24px
```

---

## TECHNICAL ARCHITECTURE

### Tech Stack

```
Frontend:
├─ React 18+
├─ Vite (build tool, <2s dev server)
├─ TypeScript (full type safety)
├─ React Router v6 (routing)
├─ Zustand (state management)
├─ TanStack Query v4 (server state)
├─ Tailwind CSS (utility-first styling)
├─ Axios (HTTP client)
├─ React Hook Form (form state)
├─ Zod (schema validation)
├─ Lucide React (icons)
├─ Headless UI (accessible components)
├─ React Hot Toast (notifications)
├─ date-fns (date formatting)
└─ Stream Chat JS (messaging)

Backend (Shared with Mobile):
├─ Node.js 18+
├─ Express.js
├─ TypeScript
├─ PostgreSQL + Supabase
├─ Supabase Realtime
├─ Stream Chat SDK
├─ Bull + Redis
├─ Twilio (SMS)
├─ Stripe (payments)
└─ JWT (auth)

Infrastructure:
├─ Vercel (frontend hosting)
├─ Railway (backend hosting)
├─ Supabase (PostgreSQL + auth)
└─ GitHub (source control)
```

### Project Structure

```
kindred-web/
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── og-image.jpg
│
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Root component, providers
│   │
│   ├── pages/                      # Page components
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── VerifyEmailPage.tsx
│   │   │   ├── Verify2FAPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── DiscoverPage.tsx
│   │   │   ├── MessagesPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── SettingsPage.tsx
│   │   │
│   │   ├── user/
│   │   │   ├── UserProfilePage.tsx
│   │   │   └── MentorsPage.tsx
│   │   │
│   │   ├── events/
│   │   │   ├── EventsPage.tsx
│   │   │   ├── EventDetailPage.tsx
│   │   │   └── CreateEventPage.tsx
│   │   │
│   │   └── landing/
│   │       ├── LandingPage.tsx
│   │       └── NotFoundPage.tsx
│   │
│   ├── components/                 # Reusable components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   ├── mentors/
│   │   │   ├── MentorCard.tsx
│   │   │   ├── MentorGrid.tsx
│   │   │   └── MentorFilters.tsx
│   │   │
│   │   └── forms/
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── ProfileForm.tsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useMentors.ts
│   │   ├── useCheckIn.ts
│   │   ├── useEvents.ts
│   │   ├── useMessages.ts
│   │   ├── useLocalStorage.ts
│   │   └── useWindowSize.ts
│   │
│   ├── store/                      # Zustand stores
│   │   ├── authStore.ts
│   │   ├── checkInStore.ts
│   │   ├── discoveryStore.ts
│   │   └── uiStore.ts
│   │
│   ├── services/                   # API clients
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── mentorService.ts
│   │   ├── checkInService.ts
│   │   ├── eventService.ts
│   │   └── uploadService.ts
│   │
│   ├── utils/                      # Utilities
│   │   ├── api-config.ts
│   │   ├── distance.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   ├── types/                      # TypeScript types
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── mentor.ts
│   │   └── event.ts
│   │
│   ├── styles/                     # Global styles
│   │   ├── globals.css
│   │   └── animations.css
│   │
│   └── config/
│       └── env.ts
│
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## DATABASE SCHEMA

(Same as Mobile version - PostgreSQL with Supabase. See mobile build prompt.)

---

## API SPECIFICATION

(Same as Mobile version - shared backend. See mobile build prompt.)

---

## WEB-SPECIFIC IMPLEMENTATION

### Browser APIs & Features

```
LOCATION API:
├─ navigator.geolocation.getCurrentPosition()
├─ Fallback: Manual location entry (city autocomplete)
└─ Ask permission: "Kindred needs your location"

LOCAL STORAGE:
├─ Store: JWT token, preferences, filters
├─ Keys: kindred_token, kindred_theme, discover_filters
└─ Max: 5MB per domain

NOTIFICATIONS API:
├─ Show toasts (React Hot Toast)
├─ Not push notifications (use email)
└─ Request permission for future

CLIPBOARD API:
├─ navigator.clipboard.writeText(text)
├─ Copy referral code
└─ Show success toast

URL API:
├─ URLSearchParams for filter persistence
├─ Query params: ?skill=react&distance=25
└─ Restore filters on reload

PAGE VISIBILITY API:
├─ Pause Realtime when tab hidden
├─ Resume when tab visible
└─ Reduce API calls in background
```

### Responsive Design Breakpoints

```
Mobile (0px - 639px):
├─ Single column layout
├─ Hamburger menu for navigation
├─ Full width cards
└─ Touch-friendly buttons

Tablet (640px - 1023px):
├─ Sidebar drawer (collapsible)
├─ 2 columns for cards
└─ Balanced spacing

Desktop (1024px+):
├─ Fixed sidebar on left
├─ 3 columns for cards
├─ Hover states enabled
└─ Max width 1200px (centered)

TAILWIND BREAKPOINTS:
├─ sm: 640px
├─ md: 768px
├─ lg: 1024px
├─ xl: 1280px
└─ 2xl: 1536px
```

### Performance Optimization

```
CODE SPLITTING:
├─ Lazy load pages (React.lazy)
├─ Route-based splitting
└─ ~50KB initial JS

BUNDLE OPTIMIZATION:
├─ Vite minifies automatically
├─ Gzip compression (Vercel)
├─ Tailwind purges unused CSS
└─ Tree-shake unused exports

CACHING:
├─ HTTP cache headers
├─ TanStack Query caches API
├─ localStorage for UI state
└─ Service Worker (optional)

IMAGE OPTIMIZATION:
├─ WebP format with PNG fallback
├─ Lazy load images
├─ Responsive images (srcset)
└─ Host on CDN (Supabase)

METRICS:
├─ FCP: <2s
├─ LCP: <2.5s
├─ CLS: <0.1
├─ TTI: <3.5s
└─ TBT: <200ms
```

### Form Handling

```
LIBRARY: React Hook Form + Zod

KEY BENEFITS:
├─ Minimal re-renders
├─ Type-safe validation
├─ Great DX
├─ Good bundle size
└─ Handles complex forms
```

### Data Fetching & Caching

```
LIBRARY: TanStack Query (React Query)

KEY FEATURES:
├─ Automatic caching & sync
├─ Background refetching
├─ Optimistic updates
├─ Request deduplication
├─ Automatic retry
└─ DevTools for debugging
```

### State Management

```
LIBRARY: Zustand (lightweight, simple)

WHEN TO USE:
├─ Global UI state (logged in user)
├─ Filter preferences
├─ UI state (sidebar open, modal)
└─ NOT for server data (use TanStack Query)
```

### Real-Time Updates (Supabase Realtime)

```
BENEFITS:
├─ Real-time check-in updates
├─ Message notifications instantly
├─ Event RSVP counts update
├─ Review submissions appear immediately
└─ Low latency (<1s typically)
```

---

## PAGE-BY-PAGE SPECIFICATION

(See detailed layouts in the full markdown file - landing page, login, home, discover, profile, settings, messages, events)

---

## CODE PATTERNS & EXAMPLES

### useWindowSize Hook (Responsive)

```typescript
// hooks/useWindowSize.ts
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

### useLocalStorage Hook

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### Sidebar Component

```typescript
// components/layout/Sidebar.tsx
export function Sidebar() {
  const { width } = useWindowSize();
  const { user } = useAuthStore();
  const location = useLocation();
  const isMobile = width < 1024;

  if (isMobile) return null;

  const navItems = [
    { path: '/', label: '🏠 Home' },
    { path: '/discover', label: '🔍 Discover' },
    { path: '/messages', label: '💬 Messages' },
    { path: '/profile', label: '👤 Profile' },
    { path: '/settings', label: '⚙️ Settings' },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-cream border-r">
      <nav className="p-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              block px-4 py-3 rounded-lg transition
              ${location.pathname === item.path
                ? 'bg-sage text-white'
                : 'text-charcoal hover:bg-cream'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

### Responsive Grid Component

```typescript
// components/common/MentorGrid.tsx
export function MentorGrid({ mentors }: { mentors: Mentor[] }) {
  const { width } = useWindowSize();

  const colsClass = width < 768 ? 'grid-cols-1' : width < 1024 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`grid ${colsClass} gap-4`}>
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
}
```

---

## RESPONSIVE DESIGN STRATEGY

### Mobile-First Approach

```
1. Build for mobile FIRST (320px+)
2. Test on real devices
3. Add breakpoints (640px, 1024px)
4. Use Tailwind prefixes: sm:, md:, lg:, xl:

EXAMPLE:
<div className="
  w-full                  // Mobile: full width
  md:w-1/2                // Tablet: 50%
  lg:max-w-4xl            // Desktop: max 4xl
  mx-auto                 // Center
  px-4 md:px-8            // Padding
">
  Content
</div>
```

### Layout Patterns

```
SINGLE COLUMN (Mobile):
- Full width header
- Full width content
- Full width sidebar underneath

2-COLUMN (Tablet):
- Sidebar drawer
- Main content

3-COLUMN (Desktop):
- Sidebar fixed on left
- Main content
- Optional right sidebar
```

### Navigation Responsive

```
MOBILE (< 640px):
- Hamburger menu on top left
- Opens drawer sidebar

TABLET (640px - 1023px):
- Hamburger menu still available
- Sidebar drawer

DESKTOP (>= 1024px):
- Fixed sidebar on left
- Always visible
- No hamburger menu
```

---

## TESTING STRATEGY

### Component Tests

```typescript
// __tests__/components/MentorCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MentorCard } from '@/components/mentors/MentorCard';
import { BrowserRouter } from 'react-router-dom';

describe('MentorCard', () => {
  const mockMentor = {
    id: '1',
    displayName: 'Sarah Chen',
    company: 'Google',
    jobTitle: 'Senior Engineer',
    skills: ['React', 'TypeScript'],
    values: ['learning', 'growth'],
    averageRating: 4.8,
    totalReviews: 47,
  };

  it('should render mentor card with all details', () => {
    render(
      <BrowserRouter>
        <MentorCard mentor={mockMentor} />
      </BrowserRouter>
    );

    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer @ Google')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should handle request mentoring click', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <MentorCard mentor={mockMentor} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /request/i });
    await user.click(button);
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/discover.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Discover Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'TestPass123!');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('/');
  });

  test('should filter mentors by skill', async ({ page }) => {
    await page.goto('/discover');
    await page.click('text=React');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('[data-testid="mentor-card"]');
    expect(cards.count()).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/discover');

    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).not.toBeVisible();

    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await expect(hamburger).toBeVisible();
  });
});
```

---

## DEPLOYMENT & LAUNCH

### Pre-Launch Checklist (1 Week Before)

```
FRONTEND:
□ All pages responsive (1920x1080, 768px, 375px)
□ Accessibility: Keyboard nav, ARIA labels, 4.5:1 contrast
□ Dark mode tested (if implemented)
□ Loading states on all async operations
□ Error cases handled (network, 404, 500)
□ Empty states designed
□ Lighthouse score >90 (desktop), >80 (mobile)
□ No console errors or warnings
□ Images optimized (WebP, <100KB)
□ SEO basics: Meta tags, og: tags
□ Redirects working

BACKEND:
□ Rate limiting
□ CORS configured
□ Security headers
□ Password hashing
□ Secrets in .env
□ Database backups tested
□ Error handling
□ Structured logging
□ Load testing (100 concurrent users)
□ Database migrations tested

WEB-SPECIFIC:
□ HTTPS only (no HTTP fallback)
□ CSP headers set
□ X-Frame-Options: DENY
□ X-Content-Type-Options: nosniff
□ SameSite cookies: Strict
□ localStorage/sessionStorage working
□ Favicon set
□ Apple touch icon set
□ 404 page exists

TESTING:
□ Auth flow (login, register, 2FA, forgot password)
□ All major pages load without errors
□ Responsive design on real devices
□ Check-in flow
□ Mentoring request
□ Event RSVP
□ Messages working
□ Filters persist in URL
□ Browser back button works
□ Form validation
□ API error handling

ACCESSIBILITY:
□ Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
□ Screen reader tested
□ Color contrast 4.5:1
□ Focus visible on all interactive elements
□ Form labels properly associated
□ Images have alt text
□ No content hidden from keyboard users

DATA:
□ Verified domains list populated
□ Sample events created
□ Sample venues created
□ Sample mentors created
□ Database backups scheduled
□ GDPR consent working

MONITORING:
□ Uptime monitoring enabled
□ Error logging (Sentry)
□ Performance monitoring (Vercel)
□ User analytics (PostHog)
□ Alerts configured

DEVOPS:
□ Vercel project created
□ Environment variables set
□ CI/CD pipeline working
□ Linting passes
□ Type checking passes
□ Tests pass
```

### Launch Day

```
MORNING (2 hours before):
□ Final backup of database
□ Test login flow
□ Check critical pages load
□ Monitoring system active
□ Team notified and ready

LAUNCH (Go time):
□ Deploy backend to production
□ Deploy frontend to production (Vercel)
□ Verify all systems operational
□ Test real user signup
□ Monitor error rates (<0.1%)

FIRST HOUR:
□ Read error logs
□ Check support emails
□ Monitor Sentry
□ Monitor Vercel analytics
□ Share status in team Slack
□ Announce launch

FIRST DAY:
□ Fix critical bugs (2hr SLA)
□ Respond to support emails (same day)
□ Thank early users
□ Monitor metrics hourly
□ Share metrics with team

FIRST WEEK:
□ Daily standup
□ Daily metrics review
□ Fix normal bugs (24hr SLA)
□ Iterate based on feedback
□ Monitor founding circle signups
□ Optimize slow pages
```

### Post-Launch Monitoring

```
METRICS DASHBOARD:
├─ Page load times
├─ Error rate
├─ API response times
├─ Database performance
├─ User signups/day
├─ Daily/Monthly active users
├─ Founding Circle count
└─ User feedback score

WEEKLY REVIEWS:
├─ Analyze trends
├─ Review error logs
├─ Plan optimizations
└─ Share metrics with team

ONGOING:
├─ Monitor uptime (99.9% SLA)
├─ Fix bugs quickly
├─ Iterate on features
└─ Scale as needed
```

---

## FINAL NOTES

### Performance Targets

```
METRICS:
├─ First Contentful Paint (FCP): <2s
├─ Largest Contentful Paint (LCP): <2.5s
├─ Cumulative Layout Shift (CLS): <0.1
├─ Time to Interactive (TTI): <3.5s
├─ Total Blocking Time (TBT): <200ms
└─ Lighthouse Score: >90 (desktop), >80 (mobile)
```

### Accessibility Checklist

```
□ WCAG 2.1 AA compliance
├─ Keyboard navigation works
├─ Focus visible on all interactive elements
├─ Color contrast 4.5:1
├─ Form labels properly associated
├─ Images have alt text
├─ No timed interactions
└─ Screen reader friendly
```

### Security Best Practices

```
FRONTEND:
├─ No secrets in code
├─ Sanitize user input
├─ CSP headers set
├─ No eval() or innerHTML with user data
└─ Secure password requirements

BACKEND:
├─ HTTPS only
├─ Rate limiting
├─ SQL injection prevention
├─ Password hashing (bcrypt)
├─ Secrets in environment variables
└─ Error handling (no stack traces)

ONGOING:
├─ Monitor for vulnerabilities
├─ Keep dependencies updated
├─ Log security events
└─ Incident response plan
```

---

**Ship Kindred to the web. Fast, accessible, secure. Let's go.**

🌱
