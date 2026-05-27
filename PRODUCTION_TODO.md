# MSR Civil Solutions — Production To-Do List

## Build Strategy

This project should be built in phases so the public website can launch quickly, while the calculator, portals, and admin tools are added without rebuilding the foundation.

Primary goal for the first release: a secure, fast, mobile-friendly business website that builds trust and captures enquiries.

Future phases can extend the same codebase into the quote calculator, customer portal, employee portal, and admin panel described in the PRD.

---

## Phase 0 — Project Foundation

### App Setup

- [x] Create React + Vite + TypeScript project
- [x] Enable TypeScript strict mode
- [ ] Install and configure TailwindCSS
- [x] Add React Router
- [ ] Add React Hook Form
- [ ] Add Zod for validation
- [ ] Add TanStack Query only when dynamic data is introduced
- [ ] Add Zustand only if shared UI/application state becomes necessary
- [x] Add ESLint
- [ ] Add Prettier
- [x] Create `.env.example`
- [ ] Create production-safe folder structure

### Suggested Folder Structure

- [ ] `src/app` — router and app shell
- [ ] `src/pages` — public website pages
- [ ] `src/components` — reusable UI components
- [ ] `src/components/layout` — navbar, footer, page wrappers
- [ ] `src/components/sections` — homepage and marketing sections
- [ ] `src/components/forms` — enquiry/contact forms
- [ ] `src/lib` — utilities, constants, validation helpers
- [ ] `src/styles` — global styles and design tokens
- [ ] `src/assets` — local static assets if needed
- [ ] `src/data` — temporary static content before CMS/database

### Design System Foundation

- [x] Add MSR dark industrial color tokens
- [x] Add Barlow font family imports
- [x] Add base typography styles
- [x] Add reusable button styles
- [x] Add section spacing utilities
- [x] Add responsive container utility
- [x] Add card, grid, and image treatment patterns
- [x] Add accessible focus states

---

## Phase 1 — Public Website MVP

### Global Website Features

- [x] Fixed responsive navigation bar
- [x] Desktop navigation links
- [x] Mobile hamburger menu
- [x] Scroll-aware navbar background
- [x] Footer with company details
- [x] WhatsApp click-to-chat link
- [x] Phone and email quick actions
- [x] Smooth section/page navigation
- [x] Responsive layout for mobile, tablet, and desktop
- [x] 404 page
- [ ] Basic loading and empty states where needed

### Home Page

- [x] Full-screen hero section with construction photography
- [x] Hero headline and supporting text
- [x] Primary CTA: Get a Free Quote
- [x] Secondary CTA: View Our Projects
- [x] Services preview section
- [x] Why Choose MSR section
- [x] Featured projects section
- [x] Client testimonials section
- [x] Bottom CTA strip
- [x] Footer

### About Page

- [x] Company overview
- [x] Mission and vision section
- [x] Core values section
- [ ] Company history/timeline
- [ ] Team section placeholder
- [ ] Certifications and licenses placeholder
- [x] CTA to contact MSR

### Services Page

- [x] Residential construction service
- [x] Commercial buildings service
- [x] Structural consultancy service
- [x] Site development service
- [x] Renovation service
- [x] Service detail cards with descriptions
- [x] Typical timeline/content area per service
- [x] CTA to request quote/contact

### Projects Page

- [x] Projects grid
- [x] Project category display
- [x] Project year/location display
- [x] Project image cards
- [x] Category filter UI
- [ ] Year filter UI
- [ ] Empty state for no matching projects

### Project Detail Page

- [x] Project title and category
- [ ] Photo gallery
- [x] Project description
- [x] Scope of work
- [ ] Optional client name
- [x] Key stats: area, floors, duration, value
- [ ] Related projects section

### Blog Page

- [x] Blog listing page
- [x] Blog card component
- [x] Tag display
- [ ] Tag filter UI
- [x] Blog search placeholder or basic search

### Blog Detail Page

- [x] Article title
- [x] Published date
- [x] Tags
- [x] Rich article content layout
- [ ] Related posts section

### Contact Page

- [x] Enquiry form
- [x] Name field
- [x] Email field
- [x] Phone field
- [x] Project type field
- [x] Message field
- [x] Optional file attachment UI
- [x] Business hours
- [x] Address section
- [ ] Google Maps embed
- [x] WhatsApp link
- [x] Success and error states

---

## Phase 2 — Website Production Hardening

### Performance

- [ ] Optimize all images
- [ ] Use WebP where possible
- [ ] Lazy load below-the-fold images
- [ ] Add width and height/aspect-ratio to images
- [ ] Keep public pages fast on mobile
- [ ] Check Core Web Vitals
- [ ] Minimize unused CSS and JS
- [ ] Split heavy routes if needed

### SEO

- [ ] Add unique page titles
- [ ] Add meta descriptions
- [ ] Add Open Graph metadata
- [ ] Add canonical URLs
- [ ] Add sitemap
- [ ] Add robots.txt
- [ ] Add structured data for local business
- [ ] Add structured data for blog articles
- [ ] Use semantic headings
- [ ] Make project and blog URLs clean and readable

### Accessibility

- [ ] Keyboard accessible navigation
- [ ] Visible focus states
- [ ] Proper form labels
- [ ] Inline form errors
- [ ] Sufficient color contrast
- [ ] Alt text for all meaningful images
- [ ] ARIA labels for icon-only buttons
- [ ] Skip-to-content link

### Contact Form Security

- [ ] Validate form inputs with Zod
- [ ] Sanitize submitted text
- [ ] Add spam protection
- [ ] Add rate limiting through backend/form provider
- [ ] Restrict attachment file types
- [ ] Restrict attachment file size
- [ ] Prevent secrets from being exposed in frontend
- [ ] Add safe email sending flow
- [ ] Store enquiries only in trusted backend/database if storage is required

### Deployment

- [ ] Configure Vercel or Netlify
- [ ] Add environment variables
- [ ] Enable HTTPS
- [ ] Add custom domain
- [ ] Add deployment preview workflow
- [ ] Add production build check
- [ ] Add basic monitoring

---

## Phase 3 — Dynamic Content And CMS

### Backend Foundation

- [ ] Create Supabase project
- [ ] Configure Supabase environment variables
- [ ] Create public content tables
- [ ] Enable Row Level Security
- [ ] Add read policies for public published content
- [ ] Add admin-only write policies

### Content Tables

- [ ] `portfolio_projects`
- [ ] `blog_posts`
- [ ] `team_members`
- [ ] `testimonials`
- [ ] `services`
- [ ] `enquiries`

### Portfolio CMS

- [ ] Create portfolio project
- [ ] Edit portfolio project
- [ ] Delete portfolio project
- [ ] Upload project images
- [ ] Mark project as featured
- [ ] Add stats JSON
- [ ] Publish/unpublish project

### Blog CMS

- [ ] Create blog post
- [ ] Edit blog post
- [ ] Delete blog post
- [ ] Draft/published status
- [ ] Tags
- [ ] Rich text editor
- [ ] Slug generation

### Website Dynamic Data

- [ ] Load featured projects from database
- [ ] Load all projects from database
- [ ] Load testimonials from database
- [ ] Load services from database
- [ ] Load team members from database
- [ ] Load blog posts from database

---

## Phase 4 — Customer Quote Calculator

### Customer Authentication

- [ ] Customer registration
- [ ] Customer login
- [ ] Email verification or OTP
- [ ] Forgot password flow
- [ ] Customer profile page
- [ ] Protected customer routes

### Calculator Inputs

- [ ] Plot/site area
- [ ] Unit toggle: sq.ft. / sq.m.
- [ ] Plot shape
- [ ] Location/zone
- [ ] Soil type
- [ ] Site accessibility
- [ ] Number of floors
- [ ] Built-up area per floor
- [ ] Custom area per floor option
- [ ] Basement option and basement area
- [ ] Staircase type
- [ ] Construction type
- [ ] Foundation type
- [ ] Auto-suggest foundation based on soil type
- [ ] Usage type
- [ ] Usage sub-type
- [ ] Finishing grade
- [ ] Electrical inclusion
- [ ] Plumbing and sanitation inclusion
- [ ] Windows and doors inclusion
- [ ] Painting inclusion
- [ ] Flooring inclusion
- [ ] Waterproofing inclusion
- [ ] Compound wall and gate inclusion
- [ ] Staircase railing inclusion
- [ ] Water tank inclusion
- [ ] Septic tank inclusion
- [ ] Solar provision inclusion
- [ ] Lift provision inclusion

### Calculator Outputs

- [ ] Estimated construction cost range
- [ ] Cost per sq.ft.
- [ ] Foundation and substructure breakdown
- [ ] RCC/structure work breakdown
- [ ] Brickwork and masonry breakdown
- [ ] Plastering and waterproofing breakdown
- [ ] Electrical breakdown
- [ ] Plumbing breakdown
- [ ] Flooring breakdown
- [ ] Painting breakdown
- [ ] Doors and windows breakdown
- [ ] Miscellaneous and contingency breakdown
- [ ] Estimated timeline by phase
- [ ] Material quantity estimates
- [ ] Disclaimer
- [ ] Request Formal Quotation CTA

### Quote Storage

- [ ] Save generated quote
- [ ] My Quotes list
- [ ] Quote detail page
- [ ] Download quote PDF
- [ ] Formal quotation request
- [ ] Quote request status: Pending
- [ ] Quote request status: Reviewed
- [ ] Quote request status: Proposal Sent

### Calculator Quality

- [ ] Rates loaded from database
- [ ] No hardcoded production rates
- [ ] Calculation utility tests
- [ ] Min/max range logic
- [ ] Timeline formula
- [ ] Material estimate formula
- [ ] Clear warnings for approximate estimates

---

## Phase 5 — Admin Panel Core

### Admin Authentication

- [ ] Separate `/admin/login` route
- [ ] Admin-only route protection
- [ ] Admin role checks through database policies
- [ ] Unauthorized page
- [ ] Admin session handling

### Admin Dashboard

- [ ] Active projects summary
- [ ] Employees present today summary
- [ ] Pending quote requests summary
- [ ] New customer registrations summary
- [ ] Recent activity feed
- [ ] Quick links to admin sections

### Rate Management

- [ ] Base rate table by finishing grade and usage type
- [ ] Zone multiplier table
- [ ] Soil multiplier table
- [ ] Accessibility multiplier table
- [ ] Inclusion cost table
- [ ] Timeline base weeks table
- [ ] Inline editing
- [ ] Save confirmation
- [ ] Rate version history
- [ ] Test calculator tool
- [ ] Audit log for all rate changes

### Quote And Enquiry Management

- [ ] Formal quotation request list
- [ ] View calculator input summary
- [ ] View customer contact details
- [ ] Mark as Reviewed
- [ ] Add admin notes
- [ ] Mark as Proposal Sent
- [ ] Contact form enquiries list
- [ ] Enquiry status handling

### Customer Management

- [ ] Customer list
- [ ] Customer profile
- [ ] View customer quotes
- [ ] View formal quotation requests
- [ ] Add internal customer notes
- [ ] Export customer list as CSV

---

## Phase 6 — Project And Employee Operations

### Project Management

- [ ] Create project
- [ ] Select registered customer or manual client
- [ ] Project type
- [ ] Project location
- [ ] Start date
- [ ] Target date
- [ ] Assign employees
- [ ] Scope notes
- [ ] Project status workflow
- [ ] Edit project details
- [ ] Upload drawings
- [ ] Upload DWG files
- [ ] Upload PDFs
- [ ] Upload BOQ files
- [ ] Version labels for files
- [ ] Progress timeline
- [ ] Admin notes visible to employees
- [ ] Mark stages complete
- [ ] Change assigned employees
- [ ] Export project report as PDF

### Employee Management

- [ ] Add employee
- [ ] Generate employee ID
- [ ] Generate temporary password
- [ ] Employee role/title
- [ ] Phone number
- [ ] Join date
- [ ] Employee profile
- [ ] Assigned projects view
- [ ] Attendance summary
- [ ] Deactivate employee
- [ ] Reactivate employee
- [ ] Reset employee password

### Attendance Management

- [ ] Daily attendance view
- [ ] Date picker
- [ ] Present status
- [ ] Absent status
- [ ] Leave status
- [ ] Holiday status
- [ ] Admin correction flow
- [ ] Mark holidays/site shutdowns
- [ ] Monthly employee report
- [ ] Export attendance as CSV/Excel
- [ ] Payroll date range export

---

## Phase 7 — Employee Portal

### Employee Authentication

- [ ] Separate `/employee/login` route
- [ ] Employee ID and password login
- [ ] Employee-only route protection
- [ ] Employee account active/inactive checks

### Employee Dashboard

- [ ] Today date display
- [ ] Attendance status display
- [ ] Assigned project list
- [ ] Current project status display
- [ ] Pending tasks or admin notes

### Attendance

- [ ] Mark Attendance button
- [ ] Cutoff time enforcement
- [ ] Store timestamp
- [ ] Store device/IP audit information where possible
- [ ] Attendance history calendar
- [ ] Leave request form
- [ ] Leave request status

### My Projects

- [ ] Assigned project list
- [ ] Project detail page
- [ ] Client first name only
- [ ] Location
- [ ] Start date
- [ ] Target completion
- [ ] Scope notes
- [ ] Overall progress percentage
- [ ] Project files tab
- [ ] Read-only drawing/spec/BOQ files
- [ ] Progress reports tab
- [ ] Admin feedback/notes

### Progress Reporting

- [ ] Upload up to 10 photos
- [ ] Select work stage
- [ ] Add progress note
- [ ] Progress percentage slider
- [ ] Timestamp submission
- [ ] Immutable employee submissions
- [ ] Admin-only delete/moderation if required

---

## Phase 8 — Reporting And Exports

- [ ] Quote PDF export
- [ ] Project report PDF export
- [ ] Attendance CSV export
- [ ] Attendance Excel export
- [ ] Customer CSV export
- [ ] Admin dashboard charts
- [ ] Progress report summary views
- [ ] Quote conversion reporting
- [ ] Enquiry source tracking

---

## Phase 9 — Advanced Civil Company Features

### Material Rate Tracker

- [ ] Cement rate log
- [ ] Steel rate log
- [ ] Bricks rate log
- [ ] Sand rate log
- [ ] Aggregate rate log
- [ ] Weekly market rate updates
- [ ] Warn when quote rates are older than 30 days

### Site Visit Scheduling

- [ ] Customer site visit request
- [ ] Admin calendar
- [ ] Confirm date/time
- [ ] Confirmation email
- [ ] Visit status tracking

### Project Milestone Tracker

- [ ] Admin-defined milestones
- [ ] Employee milestone update
- [ ] Photo proof per milestone
- [ ] Customer-facing milestone progress bar if customer portal is enabled

### Subcontractor / Vendor Log

- [ ] Vendor profiles
- [ ] Subcontractor contact details
- [ ] Assign vendors to projects
- [ ] Internal notes

### Safety Checklist

- [ ] Daily safety checklist
- [ ] PPE compliance checks
- [ ] Scaffold/site safety checks
- [ ] Stored safety history
- [ ] Exportable safety records

### WhatsApp Integration

- [ ] Quote generated notification
- [ ] Site visit confirmation notification
- [ ] Project milestone notification
- [ ] Admin-controlled message templates

### GST / Tax On Quotation

- [ ] GST toggle
- [ ] Inclusive/exclusive amount display
- [ ] Tax line item in quote PDF

### Referral System

- [ ] Referral code generation
- [ ] Referral tracking
- [ ] Discount tracking
- [ ] Admin referral report

---

## Phase 10 — Security Hardening

### Application Security

- [ ] Validate all forms with Zod
- [ ] Sanitize all rich text content
- [ ] Add rate limiting for auth and forms
- [ ] Protect admin, customer, and employee routes
- [ ] Never expose service role keys
- [ ] Use environment variables for secrets
- [ ] Add Content Security Policy
- [ ] Add secure response headers
- [ ] Add CSRF strategy if using cookie-based auth
- [ ] Add dependency vulnerability checks

### Supabase Security

- [ ] Enable RLS on all sensitive tables
- [ ] Customers can only read their own quotes
- [ ] Employees can only read assigned projects
- [ ] Employees can only create their own progress reports
- [ ] Employees cannot delete progress reports
- [ ] Admins can manage operational data
- [ ] Public users can only read published public content
- [ ] Project files stored in private buckets
- [ ] Signed URLs for private files
- [ ] File upload type restrictions
- [ ] File upload size restrictions

### Audit Logs

- [ ] Rate change audit logs
- [ ] Project update audit logs
- [ ] Employee account change audit logs
- [ ] Quote status change audit logs
- [ ] Admin notes audit logs
- [ ] File upload audit logs

---

## Phase 11 — Testing And Quality Assurance

### Unit Tests

- [ ] Calculator formulas
- [ ] Timeline formulas
- [ ] Material estimate formulas
- [ ] Zod validation schemas
- [ ] Formatting utilities

### Integration Tests

- [ ] Customer quote save flow
- [ ] Formal quote request flow
- [ ] Admin rate update flow
- [ ] Employee attendance flow
- [ ] Progress report submission flow
- [ ] Role-based access checks

### End-To-End Tests

- [ ] Public enquiry form
- [ ] Customer registration/login
- [ ] Customer calculator flow
- [ ] Admin quote review flow
- [ ] Employee attendance flow
- [ ] Employee progress upload flow

### Manual QA

- [ ] Mobile navigation
- [ ] Contact form behavior
- [ ] Quote calculator on mobile
- [ ] Employee portal on mobile
- [ ] Admin tables on desktop
- [ ] Keyboard navigation
- [ ] Screen reader spot checks
- [ ] Cross-browser checks

---

## Phase 12 — Launch Checklist

- [ ] Production build passes
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Environment variables configured
- [ ] Domain connected
- [ ] HTTPS active
- [ ] Sitemap submitted
- [ ] Robots.txt verified
- [ ] Analytics configured if needed
- [ ] Error monitoring configured
- [ ] Database backups enabled
- [ ] Supabase RLS policies reviewed
- [ ] Contact form tested
- [ ] Email notifications tested
- [ ] Mobile performance checked
- [ ] Admin account secured
- [ ] Test users removed or locked
- [ ] Final content proofread

---

## Recommended First Sprint

- [ ] Scaffold React + Vite + TypeScript app
- [ ] Configure TailwindCSS
- [ ] Add MSR design tokens
- [ ] Build navbar and footer
- [ ] Build homepage hero
- [ ] Build services preview
- [ ] Build why choose MSR section
- [ ] Build featured projects section with static data
- [ ] Build testimonials section
- [ ] Build contact CTA strip
- [ ] Verify responsive layout
