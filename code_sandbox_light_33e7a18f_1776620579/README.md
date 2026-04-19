# Sparkling Facility Solutions — Complete B2B Website

**Florida's Premier Commercial Cleaning & Post-Construction Cleaning Specialists**

---

## 🎯 Project Overview

A complete, modern, futuristic B2B website for **Sparkling Facility Solutions LLC** — fully repositioned from residential cleaning to Florida's commercial market. The site targets general contractors, property managers, facility managers, operations managers, procurement leaders, and business owners across all Florida regions.

**Business Phone:** (305) 434-6070  
**Email:** info@sparklingfacilitysolutions.com  
**HQ:** Key West, FL 33040 — Serving All of Florida

---

## ✅ Completed Features

### 🌐 Website Pages (7 full pages)

| Page | File | Description |
|---|---|---|
| Homepage | `index.html` | Hero, services overview, industries, process, testimonials, FAQ, CTA |
| Services | `services.html` | Full service catalog with pricing guides and sidebar navigation |
| Industries | `industries.html` | Industry-specific pages for 6 B2B buyer types |
| Quote / AI Intake | `quote.html` | 5-step AI-guided quote form with file upload |
| About | `about.html` | Company story, values, credentials & insurance |
| Service Areas | `areas.html` | 8+ Florida market pages with local SEO |
| Contact | `contact.html` | Contact form, business hours, direct contact info |

### 🤖 AI-Powered Features

- **SPARK AI Chatbot Widget** — Floating AI assistant on every page:
  - 7-step guided intake conversation
  - Collects project type, facility type, square footage, region, timeline, contact info
  - Smart quick-reply option buttons
  - Typing indicator animation
  - Saves leads to `ai_leads` database table
  - Links to full quote form at completion

- **AI Quote Recommender** — On the quote page, when a service type is selected, an AI panel provides a contextual recommendation tailored to that service type

- **Smart Form Pre-Selection** — URL parameters (`?service=`, `?industry=`, `?region=`) pre-fill quote form selections from other pages

### 📋 5-Step Quote Form with File Upload

1. **Step 1 — Service Selection:** Visual option cards with AI recommendation panel
2. **Step 2 — Facility Details:** Full facility type, sq footage, frequency, region, timeline
3. **Step 3 — Document Upload:** Three drag-and-drop upload zones:
   - Floor Plans (PDF, DWG, DXF, CAD, PNG, JPG, TIF)
   - Scope of Work (PDF, DOC, DOCX, XLS, XLSX)
   - Site Photos (JPG, PNG, HEIC, WebP)
4. **Step 4 — Contact Information:** Name, company, role, email, phone, preferences
5. **Step 5 — Review & Submit:** Full intake summary, final notes, consent, submit

### 🎨 Design System

- **Dark futuristic theme** — Deep navy/charcoal with electric cyan (#00D4FF) and mint accent (#00FFB3)
- **Particle canvas animation** on homepage hero
- **Glassmorphism cards** with backdrop blur
- **Animated counters** on scroll (IntersectionObserver)
- **Scroll-triggered fade animations** on all sections
- **Floating elements** on hero feature panels
- **Scrolling marquee** (industry partners bar)
- **Mobile-first responsive** at 3 breakpoints (1100px, 900px, 640px)
- **Space Grotesk + Inter** typography pairing
- **CSS custom properties** for full design token system

### 🔍 SEO Implementation

- **Full meta tags** on every page (title, description, keywords, canonical, Open Graph, Twitter Card)
- **Schema.org structured data:**
  - `LocalBusiness` on homepage
  - `ItemList` of services on services page
  - `Service` schema on industries page
  - `ContactPage` on contact page
  - Per-city `LocalBusiness` areaServed on areas page
- **Geo meta tags** (geo.region, geo.placename, geo.position, ICBM)
- **Semantic HTML5** throughout (nav, main, section, article, aside, footer, header)
- **ARIA labels** on all interactive elements, landmark regions, and lists
- **Skip to main content** link for accessibility
- **Local landing pages** for Miami, Fort Lauderdale, West Palm, Tampa, Orlando, Jacksonville, Naples/Fort Myers, Key West, Statewide

### ⚡ Performance & Accessibility

- `defer` script loading on all JS files
- Font and icon preconnect hints
- Screen reader only `.sr-only` utility class
- Proper `aria-live` regions for dynamic content (AI chat, form feedback)
- Keyboard navigation support on option cards and upload zones
- `alt` text on all images
- Color contrast compliant (dark mode base)

---

## 📁 File Structure

```
index.html              — Homepage
services.html           — Services catalog
industries.html         — Industries served
quote.html              — AI intake & quote form
about.html              — Company about page
areas.html              — Florida service areas
contact.html            — Contact page
css/
  design-system.css     — Full CSS design system & component styles
js/
  main.js               — Core JS (animations, chatbot, forms, file upload)
  components.js         — Nav, footer, AI widget injection
README.md               — This file
```

---

## 🗄️ Database Tables (RESTful API)

### `quote_requests`
Stores all quote form submissions from `quote.html`.

**Key Fields:** service_type, facility_type, square_footage, service_region, timeline, first_name, last_name, company_name, job_title, email, phone, project_description, source, submitted_at, status

**API:** `GET/POST tables/quote_requests`

### `ai_leads`
Stores leads captured through the SPARK AI chatbot widget.

**Key Fields:** projectType, facilityType, squareFootage, location, timeline, contact, source, timestamp, status

**API:** `GET/POST tables/ai_leads`

### `contact_inquiries`
Stores contact form submissions from `contact.html`.

**Key Fields:** first_name, last_name, company, role, email, phone, subject, message, source, submitted_at, status

**API:** `GET/POST tables/contact_inquiries`

---

## 🔗 Key Page URLs & Parameters

| URL | Purpose |
|---|---|
| `/index.html` | Homepage |
| `/services.html` | All services |
| `/services.html#post-construction` | Jump to post-con section |
| `/services.html#janitorial` | Jump to janitorial section |
| `/services.html#floor-care` | Jump to floor care section |
| `/industries.html` | All industries |
| `/industries.html#contractors` | GC section |
| `/industries.html#property-managers` | PM section |
| `/quote.html` | Quote form (blank) |
| `/quote.html?service=post-construction` | Pre-selects post-construction |
| `/quote.html?service=janitorial` | Pre-selects janitorial |
| `/quote.html?industry=contractor` | Industry context |
| `/quote.html?region=miami` | Region context |
| `/about.html` | About page |
| `/areas.html` | Service areas |
| `/contact.html` | Contact page |

---

## 🚀 Services Covered

1. **Post-Construction Cleaning** — 3-phase (rough, final, touch-up)
2. **Facility Janitorial Programs** — Nightly/weekly recurring contracts
3. **Turnover / Move-In Ready** — Fast-mobilization property cleaning
4. **Floor Care & Polishing** — VCT strip/wax, carpet extraction, grout
5. **Day Porter Services** — On-site daytime facility staff
6. **Pressure Washing** — Commercial exterior surfaces
7. **Specialty / Emergency** — Disinfection, debris, window detail

---

## 🏢 Industries Targeted

1. General Contractors
2. Property Managers
3. Corporate Facilities / Office Buildings
4. Medical & Healthcare Administrative
5. Retail & Mixed-Use
6. Industrial & Warehouse

---

## 🗺️ Florida Markets

Miami · Fort Lauderdale / Broward · West Palm Beach / Palm Beach · Naples / Fort Myers / SWFL · Key West / Florida Keys · Tampa / St. Pete · Orlando / Central FL · Jacksonville / Northeast FL · Statewide / Multi-Location

---

## 📈 Recommended Next Steps

1. **Add company logo** — Replace the ✦ text logo with actual Sparkling Facility Solutions logo image
2. **Add real photography** — Replace placeholder icons with professional commercial cleaning photos
3. **Google Analytics / GTM** — Add tracking to `index.html` head for conversion tracking
4. **Google Business Profile** — Claim and optimize for each Florida market
5. **Calendly Integration** — Add scheduling widget to quote confirmation and contact page
6. **Email automation** — Connect form submissions to CRM (HubSpot, Pipedrive, or Jobber)
7. **Google Ads landing pages** — Create dedicated landing pages per market + service for PPC
8. **Review platform links** — Add links to Google Reviews, BBB, etc.
9. **Case studies** — Add real project photos and client testimonials with photos
10. **Blog / Resources** — Add SEO content pages (cleaning checklists, post-con guides, etc.)

---

## 🔧 To Integrate on Wix Studio

The HTML/CSS/JS code in this project can be embedded in Wix Studio using:

1. **Full Custom Code Mode** — Deploy as a standalone HTML site (recommended for full control)
2. **Wix HTML Embed Widgets** — Embed specific sections (forms, chatbot) using Wix's HTML iframe embed component
3. **Custom Code injection** — Use Wix's "Custom Code" in Site Settings > Custom Code to inject the CSS design tokens and JS

For maximum SEO and performance, we recommend deploying this as a standalone static website rather than embedding in Wix.

---

*© 2025 Sparkling Facility Solutions LLC — All Rights Reserved*
