# Product Requirements Document
## MSR Civil Solutions — Web Platform
**Version:** 1.0  
**Author:** Solo Developer  
**Status:** Draft  

---

## 1. Executive Summary

MSR Civil Solutions requires a multi-role web platform that serves three distinct audiences:
- **Public / Registered Customers** — company showcase, blog, and a gated estimation calculator
- **Employees / Field Workers** — attendance, project files, and progress reporting
- **Admins / Management** — full control panel for pricing, projects, staff, and customer data

The platform must be clean, mobile-friendly, and operable by non-technical staff.

---

## 2. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Reduce manual estimation time | Quote generated in < 2 minutes |
| Digitise employee attendance | Zero paper registers within 30 days of launch |
| Centralise project files | All drawings & photos accessible from one URL |
| Increase customer trust | Enquiry form submissions up 30% in 3 months |

---

## 3. User Roles & Access Matrix

| Feature | Public | Registered Customer | Employee | Admin |
|---|---|---|---|---|
| View public site / blog | ✅ | ✅ | ✅ | ✅ |
| Register / login | ✅ | ✅ | ✅ | ✅ |
| Estimation calculator | ❌ | ✅ | ❌ | ✅ |
| View own quotes | ❌ | ✅ | ❌ | ✅ |
| Mark attendance | ❌ | ❌ | ✅ | ✅ |
| View assigned project files | ❌ | ❌ | ✅ | ✅ |
| Upload progress photos | ❌ | ❌ | ✅ | ✅ |
| Update project status | ❌ | ❌ | ✅ | ✅ |
| Manage estimation pricing | ❌ | ❌ | ❌ | ✅ |
| Assign employees to projects | ❌ | ❌ | ❌ | ✅ |
| View all attendance records | ❌ | ❌ | ❌ | ✅ |
| View all customer profiles | ❌ | ❌ | ❌ | ✅ |
| Create / edit / delete projects | ❌ | ❌ | ❌ | ✅ |
| Upload project drawings | ❌ | ❌ | ❌ | ✅ |
| Manage blog / content | ❌ | ❌ | ❌ | ✅ |

---

## 4. Module Breakdown

---

### 4A. Public Website (No Login Required)

#### 4A.1 Home Page
- Hero section: company tagline, CTA buttons ("Get a Quote" → login/register, "Our Projects" → portfolio)
- Brief "Why MSR" section: 3–4 value proposition cards (speed, quality, licensed engineers, etc.)
- Featured projects carousel (pulled from project database, filtered to "showcase" flag)
- Client testimonials section
- Footer with address, phone, email, social links, copyright

#### 4A.2 About / Company Values Page
- Company history timeline
- Mission & vision statements
- Core values (integrity, quality, safety, etc.)
- Team section (names, roles, optional photos — populated by admin)
- Certifications and licenses section (uploaded PDFs/images by admin)

#### 4A.3 Projects Portfolio / Blog
- Grid of project cards: thumbnail, project name, category (residential/commercial/infrastructure), location, completion year
- Filterable by category and year
- Individual project detail page:
  - Photo gallery (admin-uploaded images)
  - Project description, scope of work, client name (optional)
  - Key stats: area built, floors, duration, value (if admin chooses to display)
  - Related projects suggestions
- Blog section (separate from projects):
  - Articles on civil topics, material guides, construction tips
  - Admin creates/edits posts via WYSIWYG editor (Quill.js or TipTap)
  - Tag-based filtering

#### 4A.4 Services Page
- Detailed breakdown of services offered (Residential Construction, Commercial Buildings, Structural Consultancy, Site Development, Renovation, etc.)
- Each service with description, typical timeline, and example project link

#### 4A.5 Contact Page
- Enquiry form: name, email, phone, project type, message, file attachment (optional)
- Form submissions stored in DB and email-notified to admin
- Google Maps embed of office location
- Business hours, direct phone/WhatsApp link

---

### 4B. Customer Portal (Login Required)

#### 4B.1 Customer Registration & Login
- Register with: name, email, password, phone, city
- Email verification via OTP (Supabase Auth)
- Login page (separate from admin/employee login URL for clarity)
- "Forgot password" flow
- Profile page: update personal details, change password

#### 4B.2 Estimation / Quotation Calculator

This is the core gated feature. The calculator collects civil construction parameters and returns a detailed cost estimate and project timeline.

**Input Parameters (all with sensible defaults and tooltips):**

*Site & Plot*
- Plot / site area (in sq.ft. or sq.m., with unit toggle)
- Plot shape: regular / irregular (if irregular, note that site visit may be needed)
- Location / zone (Urban, Semi-urban, Rural — affects material transport costs)
- Soil type (Hard rock, Soft rock, Murrum, Black cotton, Sandy — affects foundation cost)
- Site accessibility (Easy access / Narrow lane / Restricted — affects labour cost)

*Building Specification*
- Number of floors (G / G+1 / G+2 / G+3 / G+4 and above)
- Built-up area per floor (sq.ft. — can differ per floor if user selects "custom per floor")
- Basement (Yes/No — if yes, sq.ft.)
- Staircase type: Internal, External, Both

*Structure Type*
- Construction type: RCC Framed Structure / Load-bearing / Steel Structure
- Foundation type: Isolated footing / Strip footing / Raft / Pile (auto-suggested based on soil type, but overridable)

*Usage Type*
- Residential / Commercial / Industrial
- Sub-type (for residential: Villa, Apartment, Row house; for commercial: Shop, Office, Warehouse)

*Finishing Grade*
- Economy (basic plastering, standard tiles, economy fittings)
- Standard (vitrified tiles, branded fittings, textured paint)
- Premium (marble/granite, premium fittings, false ceiling, feature walls)
- Luxury (imported materials, custom design, smart fittings)

*Inclusions (checkboxes)*
- Electrical work
- Plumbing & sanitation
- Windows & doors
- Painting (interior / exterior / both)
- Flooring
- Waterproofing (terrace / basement / bathroom)
- Compound wall & gate
- Staircase railing
- Overhead/underground water tank
- Septic tank
- Solar provision
- Lift provision (for G+3 and above)

**Output — Quotation Summary:**
- Estimated construction cost range (min–max, e.g. ₹X – ₹Y)
- Cost per sq.ft. (based on finishing grade and inclusions)
- Phase-wise cost breakdown:
  - Foundation & substructure
  - RCC/Structure work
  - Brickwork & masonry
  - Plastering & waterproofing
  - Electrical
  - Plumbing
  - Flooring
  - Painting
  - Doors & windows
  - Miscellaneous & contingency (typically 5–10%)
- Estimated project timeline (in weeks/months, by phase)
- Material quantity estimates (cement bags, steel MT, bricks, sand/aggregate in cu.ft.) — approximations
- **Disclaimer:** "This is a preliminary estimate. Final quotation subject to site inspection and detailed drawings."
- CTA: "Request Formal Quotation" → sends email to admin with the customer's calculator inputs + contact info

**Calculator Logic:**
- All rates (per sq.ft. by grade, per item) are pulled from the admin-managed rate table in the database — not hardcoded
- Rates are editable by admin at any time (see Admin module)
- Formula: Base rate × Built-up area × Zone multiplier × Soil multiplier × Accessibility multiplier + Sum of inclusion costs
- Timeline formula: Base weeks per floor × floors × complexity factor

#### 4B.3 My Quotes
- List of all quotations generated by the customer, with date and inputs summary
- Download quote as PDF (generated client-side or via backend with Puppeteer/jsPDF)
- Status of any formal quotation request: Pending / Reviewed / Proposal Sent

---

### 4C. Employee Portal

Employees log in via a separate route (`/employee/login`) using Employee ID and password (created by admin).

#### 4C.1 Employee Dashboard
- Today's date, attendance status (Present / Absent / Not marked yet)
- Assigned projects list with current status
- Pending tasks or admin notes (optional notification field)

#### 4C.2 Attendance
- Single "Mark Attendance" button visible only on the current day before a cutoff time (e.g. 10:00 AM, configurable by admin)
- Records: employee ID, date, timestamp, device IP (for basic audit)
- View personal attendance history: calendar view with Present/Absent/Leave indicators
- Leave request form: from date, to date, reason, type (CL/SL/EL) → goes to admin for approval

#### 4C.3 My Projects
- List of projects assigned by admin
- Per project view:
  - Project name, client name (first name only for privacy), location, start date, target completion
  - Admin-defined scope notes
  - Current overall progress percentage (set by employee, confirmed by admin)
  - Project files tab: drawings (DWG/PDF), specifications (PDF), BOQ sheets (XLS/PDF) — read-only, uploaded by admin
  - Progress report tab: employee-uploaded progress photos with date, description, and work stage tag (e.g. Foundation, Column casting, Brickwork, Finishing)
  - Admin notes/feedback visible to employee

#### 4C.4 Progress Reporting
- Upload up to 10 photos per submission
- Select work stage from dropdown (stages defined by admin)
- Add a text note (optional)
- Progress percentage slider (0–100%, in 5% increments)
- All submissions are time-stamped and stored immutably (employees cannot delete, only admin can)

---

### 4D. Admin Panel

Accessible at `/admin` with admin credentials only.

#### 4D.1 Admin Dashboard
- Summary cards: Active Projects, Employees Present Today, Pending Quote Requests, New Customer Registrations this week
- Recent activity feed: latest progress updates, new quotes, new customer signups
- Quick links to all admin sections

#### 4D.2 Estimation Rate Management
- Table of all rate parameters:
  - Base rate per sq.ft. by finishing grade (Economy / Standard / Premium / Luxury) × usage type (Residential / Commercial / Industrial)
  - Zone multipliers (Urban, Semi-urban, Rural — as percentage adjustments)
  - Soil type multipliers
  - Accessibility multipliers
  - Per-inclusion costs (electrical per sq.ft., plumbing per sq.ft., etc.)
  - Timeline base weeks per floor
- Inline editing with save confirmation
- Version history: every rate change logged with admin name, timestamp, and old/new values (for audit)
- "Test Calculator" button: run a sample quote with current rates to verify changes

#### 4D.3 Project Management
- Create new project: name, client (select from registered customers or enter manually), type, location, start date, target date, assigned employees (multi-select), scope notes
- Project status: Enquiry → Design → Approval → Under Construction → Finishing → Completed → On Hold
- Per project admin view:
  - All details editable
  - File upload: drawings, DWG, PDFs, BOQ, site reports — with version labels
  - Progress timeline: all employee-submitted progress reports visible (photos + notes + timestamps) in chronological order
  - Admin can add their own notes/instructions visible to employees
  - Mark stages complete
  - Change assigned employees
  - Export project report as PDF (all progress entries, files list, timeline)

#### 4D.4 Employee Management
- Add new employee: name, role (Site Engineer, Supervisor, Foreman, Labourer, etc.), phone, join date — system generates Employee ID and temporary password
- View employee profile: contact details, assigned projects, attendance summary (present days / absent days / leave days in current month)
- Deactivate / reactivate employee account
- Reset employee password
- Leave requests: list of pending requests with Approve / Reject action + optional comment

#### 4D.5 Attendance Management
- Daily attendance view: date picker → shows all employees with Present / Absent / Leave / Holiday status
- Mark attendance on behalf of employee (for corrections)
- Mark holidays / site shutdowns (affects attendance calculation)
- Monthly report per employee: exportable as Excel/CSV
- Export full attendance sheet for payroll (date range, employee filter)

#### 4D.6 Customer Management
- List of all registered customers with: name, email, phone, city, registration date, number of quotes generated
- View customer profile: personal details, all quotes they've generated (with inputs summary), any formal quotation requests
- Admin can add internal notes to a customer profile
- Export customer list as CSV

#### 4D.7 Quote / Enquiry Management
- List of formal quotation requests (submitted from calculator "Request Formal Quote" CTA)
- Each entry shows: customer name, contact, date, calculator inputs summary
- Admin actions: mark as Reviewed, add notes, mark as Proposal Sent
- Contact form enquiries (from public Contact page) listed here too

#### 4D.8 Content Management
- **Projects Portfolio:** Create / edit / delete showcase projects (title, description, category, photos, stats, completion year)
- **Blog:** Create / edit / delete blog posts with rich text editor (TipTap); publish / draft toggle; tag management
- **Team Members:** Add / edit / remove team members shown on the About page
- **Services:** Edit service descriptions
- **Testimonials:** Add / edit / remove client testimonials

---

## 5. Non-Functional Requirements

### 5.1 Security
- All routes server-side protected by JWT + role check (not just frontend guard)
- Row-level security on Supabase: employees can only query rows where `assigned_employee_id = auth.uid()`
- File storage: project files in a private bucket, accessed only via signed URLs generated per request (not public URLs)
- Rate limiting on login endpoints (max 5 attempts per 15 minutes)
- Admin and employee login at separate URLs to reduce surface area
- All form inputs sanitised; no raw SQL from user input (use parameterised queries via Supabase client)

### 5.2 Performance
- Core Web Vitals: LCP < 2.5s on 4G for public pages
- Calculator result generated client-side (instant, no network round-trip) — rates fetched once on login and cached in memory
- Images: WebP format, lazy loaded, Supabase Storage CDN URLs
- Blog/portfolio pages: consider static generation or ISR if using Next.js (or React + Vite with a light SSR approach for SEO)

### 5.3 Mobile Responsiveness
- All three portals fully usable on mobile (employee portal especially — workers use phones on-site)
- Attendance button large and thumb-friendly
- Photo upload works from phone camera
- Calculator form uses mobile-optimised number inputs

### 5.4 Accessibility
- WCAG 2.1 AA minimum: proper aria labels, keyboard navigation, sufficient colour contrast
- Form errors surfaced clearly with inline messages

### 5.5 Offline Consideration (Nice-to-have, Phase 2)
- Service Worker for employee portal: if site engineer is on-site with poor connectivity, attendance can be cached and synced when connection resumes

---

## 6. Database Schema (Key Tables)

```
users              — id, email, name, phone, role (customer/employee/admin), created_at
employee_profiles  — id, user_id, employee_code, role_title, join_date, is_active
attendance         — id, employee_id, date, marked_at, marked_by, type (present/leave/holiday)
leave_requests     — id, employee_id, from_date, to_date, reason, type, status, reviewed_by
projects           — id, name, client_id, type, location, status, start_date, target_date, created_by
project_assignments— project_id, employee_id, assigned_at, assigned_by
project_files      — id, project_id, file_name, file_url, file_type, version_label, uploaded_by
progress_reports   — id, project_id, employee_id, stage, notes, progress_pct, submitted_at
progress_photos    — id, report_id, photo_url, caption
rate_config        — id, parameter_key, parameter_value, updated_by, updated_at
rate_config_history— id, parameter_key, old_value, new_value, changed_by, changed_at
quotes             — id, customer_id, inputs_json, output_json, created_at
quote_requests     — id, quote_id, status, admin_notes, updated_at
enquiries          — id, name, email, phone, project_type, message, attachment_url, created_at
blog_posts         — id, title, slug, content, tags, status (draft/published), author_id, published_at
portfolio_projects — id, title, description, category, year, images[], stats_json, is_featured
team_members       — id, name, role, bio, photo_url, display_order
testimonials       — id, client_name, company, content, rating, is_visible
```

---

## 7. Suggested Additional Features (Civil Company Specific)

These are not in the original brief but would significantly add value for a civil company:

1. **Material Rate Tracker** — Admin can log current market rates for cement, steel, bricks, sand, aggregate per week. Calculator can flag when rates used in a quote are > 30 days old.

2. **Site Visit Scheduling** — Customer can request a site visit from the Contact page or after generating a quote. Admin sees a calendar of pending visits and can confirm date/time. Confirmation email sent to customer.

3. **Project Milestone Tracker** — Admin defines milestones per project (e.g. Foundation Complete, Slab 1 Cast, Roofing Done). Employee marks milestones complete with a photo. Customer portal could show a simple milestone progress bar for their project (if linked to a project).

4. **Subcontractor / Vendor Log** — Admin can log which subcontractors (plumber, electrician, tiler) are assigned to which project and their contact info. Useful internally.

5. **Safety Checklist** — Per project, admin or site engineer can fill a daily safety checklist (PPE compliance, scaffold check, etc.). Stored as a record. Useful for ISO/safety audits.

6. **WhatsApp Integration** — Use Twilio or WhatsApp Business API to send automated messages to customers: quote generated, site visit confirmed, project milestone reached.

7. **GST / Tax on Quotation** — Toggle to show GST (18% on services) on the quote output, with a final inclusive/exclusive amount. Necessary if the company is GST-registered.

8. **Referral Code System** — Customers who refer others get a small discount on future projects. Track referrals in the DB.

---

## 8. Phased Delivery Plan (Solo Dev Recommended)

### Phase 1 — Core (8–10 weeks)
- Public website (Home, About, Services, Contact)
- Customer auth + Estimation Calculator + My Quotes
- Employee portal (Attendance + My Projects view)
- Admin: Rate management, Project management, Employee management

### Phase 2 — Content & Reporting (4–6 weeks)
- Blog / Portfolio CMS
- Attendance export (Excel/CSV)
- Progress report PDF export
- Admin dashboard with charts (Recharts)
- Customer portal: Project milestone view

### Phase 3 — Enhancements (Ongoing)
- Site visit scheduling
- Material rate tracker
- WhatsApp notifications
- Offline attendance sync (PWA)
- GST toggle on quotes
- Safety checklist module

---

## 9. Tech Stack Summary

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Vite + TypeScript | Fast DX, good ecosystem, you prefer React |
| Styling | TailwindCSS + shadcn/ui | Production-grade components out of the box |
| State | TanStack Query + Zustand | Server state + UI state separation |
| Forms | React Hook Form + Zod | Type-safe validation |
| Backend / DB | Supabase (PostgreSQL) | Auth, storage, RLS, real-time — all in one |
| File Storage | Supabase Storage | Signed URLs, private buckets |
| Auth | Supabase Auth | JWT, email OTP, role management |
| PDF Export | jsPDF + html2canvas | Client-side quote PDF generation |
| Charts | Recharts | Lightweight, composable |
| Rich Text | TipTap | Blog editor |
| Email | Resend | Quote confirmations, enquiry notifications |
| Hosting | Vercel (FE) + Supabase (BE) | Free tiers sufficient for early stage |

---

*Document end. Version 1.0 — Subject to review and iteration.*
