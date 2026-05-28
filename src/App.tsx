import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Database,
  Facebook,
  Factory,
  FileText,
  Instagram,
  IndianRupee,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Search,
  ShieldCheck,
  Star,
  UploadCloud,
  UserCog,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const SITE_URL = 'https://msrcivilsolutions.com';
const DEFAULT_DESCRIPTION =
  'MSR Civil Solutions delivers residential, commercial, and structural civil engineering work in Bengaluru with disciplined execution and transparent communication.';

const services = [
  {
    title: 'Residential Construction',
    slug: 'residential-construction',
    description: 'Villas, row houses, apartments, and turnkey home construction.',
    detail:
      'Planning, foundation, RCC work, masonry, waterproofing, finishing, and final handover for homes that need disciplined execution from day one.',
    timeline: '6 to 14 months depending on built-up area and finish level',
    icon: Building2,
  },
  {
    title: 'Commercial Buildings',
    slug: 'commercial-buildings',
    description: 'Offices, shops, warehouses, and mixed-use commercial spaces.',
    detail:
      'Commercial shells, workspaces, shop units, warehouse structures, and practical site coordination for business-ready spaces.',
    timeline: '4 to 12 months depending on scope and approvals',
    icon: Factory,
  },
  {
    title: 'Structural Consultancy',
    slug: 'structural-consultancy',
    description: 'RCC, steel, foundation, and site-specific engineering guidance.',
    detail:
      'Structural planning support, foundation guidance, load-path review, RCC and steel consultation, and practical recommendations for site constraints.',
    timeline: '1 to 4 weeks for preliminary consultation and review',
    icon: Ruler,
  },
  {
    title: 'Renovation & Site Development',
    slug: 'renovation-site-development',
    description: 'Extensions, repairs, waterproofing, compounds, and upgrades.',
    detail:
      'Repair work, extensions, compound walls, waterproofing, access improvements, external development, and finishing upgrades.',
    timeline: '2 weeks to 6 months depending on complexity',
    icon: Wrench,
  },
];

const stats = [
  { title: '10+ Years', subtitle: 'Civil execution experience', icon: Award },
  { title: 'Licensed Team', subtitle: 'Engineers and supervisors', icon: ShieldCheck },
  { title: 'Fast Quotes', subtitle: 'Clear preliminary estimates', icon: Clock3 },
  { title: 'Site Discipline', subtitle: 'Tracked progress and safety', icon: ClipboardCheck },
];

const adminMetrics = [
  { label: 'Active Projects', value: '12', icon: BriefcaseBusiness },
  { label: 'Present Today', value: '28', icon: CalendarCheck },
  { label: 'Pending Quotes', value: '7', icon: FileText },
  { label: 'New Customers', value: '18', icon: Users },
];

const todayLabel = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date());

const adminModules = [
  {
    title: 'Rate Management',
    description: 'Edit base rates, zone multipliers, inclusions, and calculator test values.',
    icon: IndianRupee,
  },
  {
    title: 'Project Management',
    description: 'Create projects, upload drawings, assign employees, and track stage progress.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Employee Management',
    description: 'Add employees, reset passwords, review attendance, and approve leave requests.',
    icon: UserCog,
  },
  {
    title: 'Content Management',
    description: 'Manage portfolio projects, blog posts, services, testimonials, and team members.',
    icon: Database,
  },
];

const employeeMetrics = [
  { label: 'Today', value: todayLabel, icon: Clock3 },
  { label: 'Attendance', value: 'Not marked', icon: CalendarCheck },
  { label: 'Assigned Projects', value: '3', icon: BriefcaseBusiness },
  { label: 'Pending Reports', value: '2', icon: UploadCloud },
];

const employeeModules = [
  {
    title: 'Mark Attendance',
    description: 'Submit today’s attendance before the configured cutoff time.',
    icon: CalendarCheck,
  },
  {
    title: 'My Projects',
    description: 'View assigned project details, drawings, BOQ files, and scope notes.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Progress Reports',
    description: 'Upload site photos, work stage, notes, and percentage completion.',
    icon: UploadCloud,
  },
  {
    title: 'Leave Requests',
    description: 'Submit leave requests and track admin approval status.',
    icon: ClipboardCheck,
  },
];

const customerMetrics = [
  { label: 'Saved Quotes', value: '4', icon: FileText },
  { label: 'Formal Requests', value: '1', icon: ClipboardCheck },
  { label: 'Estimated Range', value: 'Ready', icon: Calculator },
  { label: 'Site Visits', value: '0', icon: CalendarCheck },
];

const customerModules = [
  {
    title: 'Estimate Calculator',
    description: 'Generate a preliminary construction cost range using site, floor, usage, and finish inputs.',
    icon: Calculator,
  },
  {
    title: 'My Quotes',
    description: 'Review previously generated quotes and track formal quotation request status.',
    icon: FileText,
  },
  {
    title: 'Request Formal Quote',
    description: 'Send calculator inputs to MSR for review, site inspection, and proposal preparation.',
    icon: ClipboardCheck,
  },
  {
    title: 'Profile',
    description: 'Manage customer contact details before requesting quotes or project updates.',
    icon: Users,
  },
];

const projects = [
  {
    title: 'Premium Villa Structure',
    slug: 'premium-villa-structure',
    category: 'Residential',
    location: 'Pune',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    summary: 'RCC framed villa construction with premium external finishing.',
    scope: 'Foundation, RCC frame, masonry, plastering, waterproofing, and exterior development.',
    stats: ['4,800 sq.ft.', 'G+1', '9 months', 'Premium finish'],
  },
  {
    title: 'Commercial Building Shell',
    slug: 'commercial-building-shell',
    category: 'Commercial',
    location: 'PCMC',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    summary: 'Commercial RCC shell planned for flexible shop and office usage.',
    scope: 'Structural work, staircase core, masonry, waterproofing, and site coordination.',
    stats: ['12,000 sq.ft.', 'G+3', '11 months', 'Commercial shell'],
  },
  {
    title: 'Site Development Works',
    slug: 'site-development-works',
    category: 'Infrastructure',
    location: 'Maval',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    summary: 'Site grading, access preparation, compound work, and utility coordination.',
    scope: 'Earthwork, drainage alignment, internal road preparation, compound wall, and gate.',
    stats: ['2.5 acres', 'Site works', '4 months', 'Infrastructure'],
  },
  {
    title: 'RCC Frame Construction',
    slug: 'rcc-frame-construction',
    category: 'Structural',
    location: 'Baner',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    summary: 'Multi-floor RCC frame construction with strict stage-wise supervision.',
    scope: 'Footing, columns, beams, slab casting, curing coordination, and quality checks.',
    stats: ['8,400 sq.ft.', 'G+2', '7 months', 'RCC structure'],
  },
];

const testimonials = [
  {
    name: 'Rahul Patil',
    role: 'Villa Owner',
    quote:
      'The team kept the work moving with clear updates, practical suggestions, and strong site supervision.',
  },
  {
    name: 'Anita Deshmukh',
    role: 'Commercial Client',
    quote:
      'MSR handled our commercial structure with discipline. Timelines, quality, and communication were reliable.',
  },
  {
    name: 'Vikram Jadhav',
    role: 'Developer',
    quote:
      'Their estimate and execution planning made decisions easier before construction started.',
  },
];

const posts = [
  {
    title: 'How preliminary construction estimates should be read',
    slug: 'preliminary-construction-estimates',
    date: 'May 12, 2026',
    tag: 'Estimation',
    excerpt:
      'A practical guide to understanding cost ranges, inclusions, exclusions, and why site inspection still matters.',
  },
  {
    title: 'What affects foundation cost on a new site',
    slug: 'foundation-cost-factors',
    date: 'April 28, 2026',
    tag: 'Foundations',
    excerpt:
      'Soil type, access, water table, loading, and design choices all shape the real cost of foundation work.',
  },
  {
    title: 'Choosing between economy, standard, and premium finishes',
    slug: 'construction-finish-grades',
    date: 'April 5, 2026',
    tag: 'Materials',
    excerpt:
      'Finish grade changes more than tiles and paint. It affects planning, procurement, labour, and timeline.',
  },
];

const attachmentTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const maxAttachmentBytes = 5 * 1024 * 1024;

const contactSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name.').max(80, 'Name is too long.'),
    email: z.string().trim().email('Enter a valid email address.'),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d\s()-]{8,18}$/, 'Enter a valid phone number.'),
    projectType: z.enum([
      'Residential',
      'Commercial',
      'Structural Consultancy',
      'Renovation',
    ]),
    message: z
      .string()
      .trim()
      .min(20, 'Share at least 20 characters about your requirement.')
      .max(1000, 'Message must stay under 1000 characters.'),
    attachment: z.custom<FileList>().optional(),
    company: z.string().optional(),
  })
  .superRefine((values, context) => {
    if (values.company) {
      context.addIssue({
        code: 'custom',
        message: 'Spam submission blocked.',
        path: ['company'],
      });
    }

    const file = values.attachment?.item(0);

    if (!file) {
      return;
    }

    if (!attachmentTypes.includes(file.type)) {
      context.addIssue({
        code: 'custom',
        message: 'Upload a PDF, JPG, PNG, or WebP file.',
        path: ['attachment'],
      });
    }

    if (file.size > maxAttachmentBytes) {
      context.addIssue({
        code: 'custom',
        message: 'Attachment must be 5 MB or smaller.',
        path: ['attachment'],
      });
    }
  });

type ContactFormValues = z.infer<typeof contactSchema>;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[data-jsonld="${id}"]`);

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.jsonld = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function MetaManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const project = projects.find((item) => pathname === `/projects/${item.slug}`);
    const post = posts.find((item) => pathname === `/blog/${item.slug}`);

    const routeMeta: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'MSR Civil Solutions | Civil Construction & Engineering Bengaluru',
        description: DEFAULT_DESCRIPTION,
      },
      '/about': {
        title: 'About MSR Civil Solutions | Civil Contractors in Bengaluru',
        description:
          'Learn about MSR Civil Solutions, a Bengaluru civil construction team focused on disciplined planning, site supervision, and transparent delivery.',
      },
      '/services': {
        title: 'Construction Services | MSR Civil Solutions',
        description:
          'Residential construction, commercial buildings, structural consultancy, renovation, and site development services from MSR Civil Solutions.',
      },
      '/projects': {
        title: 'Civil Construction Projects | MSR Civil Solutions',
        description:
          'Explore representative residential, commercial, structural, and site development projects from MSR Civil Solutions.',
      },
      '/blog': {
        title: 'Construction Blog | MSR Civil Solutions',
        description:
          'Practical construction notes, estimate explainers, material guidance, and civil planning advice from MSR Civil Solutions.',
      },
      '/contact': {
        title: 'Contact MSR Civil Solutions | Bengaluru Civil Contractor',
        description:
          'Contact MSR Civil Solutions in Bengaluru for construction enquiries, civil work discussions, and quote requests.',
      },
      '/admin/login': {
        title: 'Admin Login | MSR Civil Solutions',
        description:
          'Secure admin login for MSR Civil Solutions management tools, rate management, projects, and content operations.',
      },
      '/admin': {
        title: 'Admin Dashboard | MSR Civil Solutions',
        description:
          'MSR Civil Solutions admin dashboard preview for projects, rates, employees, quotes, and content management.',
      },
      '/employee/login': {
        title: 'Employee Login | MSR Civil Solutions',
        description:
          'Employee login for MSR Civil Solutions attendance, assigned projects, files, and progress reporting.',
      },
      '/employee': {
        title: 'Employee Dashboard | MSR Civil Solutions',
        description:
          'MSR Civil Solutions employee dashboard preview for attendance, projects, files, and progress reporting.',
      },
      '/customer/login': {
        title: 'Customer Login | MSR Civil Solutions',
        description:
          'Customer login for MSR Civil Solutions quote calculator access, saved quotes, and formal quotation requests.',
      },
      '/customer': {
        title: 'Customer Dashboard | MSR Civil Solutions',
        description:
          'MSR Civil Solutions customer dashboard preview for quotes, formal requests, and project communication.',
      },
      '/customer/quote': {
        title: 'Construction Estimate Calculator | MSR Civil Solutions',
        description:
          'Generate a preliminary residential or commercial construction estimate with MSR Civil Solutions.',
      },
    };

    const meta = project
      ? {
          title: `${project.title} | MSR Civil Solutions Projects`,
          description: project.summary,
        }
      : post
        ? {
            title: `${post.title} | MSR Civil Solutions Blog`,
            description: post.excerpt,
          }
        : routeMeta[pathname] ?? {
            title: 'Page Not Found | MSR Civil Solutions',
            description: 'The requested MSR Civil Solutions page could not be found.',
          };

    const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', post ? 'article' : 'website');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', 'MSR Civil Solutions');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta(
      'name',
      'robots',
      pathname.startsWith('/admin') || pathname.startsWith('/employee')
        || pathname.startsWith('/customer')
        ? 'noindex,nofollow'
        : 'index,follow',
    );
    upsertCanonical(canonical);

    upsertJsonLd('local-business', {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: 'MSR Civil Solutions',
      url: SITE_URL,
      telephone: '+91 96115 14928',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressCountry: 'IN',
      },
      areaServed: 'Bengaluru, India',
      serviceType: [
        'Residential Construction',
        'Commercial Buildings',
        'Structural Consultancy',
        'Renovation',
        'Site Development',
      ],
    });

    if (post) {
      upsertJsonLd('article', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Organization',
          name: 'MSR Civil Solutions',
        },
      });
    } else {
      document.head.querySelector('script[data-jsonld="article"]')?.remove();
    }
  }, [pathname]);

  return null;
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-title-block">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <span className="gold-bar" aria-hidden="true" />
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <Link className="brand" to="/" aria-label="MSR Civil Solutions home">
        <span>MSR</span> Civil Solutions
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Link className="nav-cta" to="/contact">
        Get Quote
      </Link>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isMenuOpen ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link className="mobile-quote" to="/contact" onClick={() => setIsMenuOpen(false)}>
            Get a Free Quote
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero" id="main-content">
        <div className="hero-content">
          <p className="eyebrow">Trusted civil engineers</p>
          <h1>
            Building strong foundations <span>for the future</span>
          </h1>
          <p>
            MSR Civil Solutions delivers residential, commercial, and structural
            construction work with disciplined planning, transparent estimates,
            and site-level accountability.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact">
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-secondary" to="/projects">
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
      <ServicesPreview />
      <WhyChoose />
      <ProjectsPreview />
      <Testimonials />
      <ContactCta />
    </>
  );
}

function ServicesPreview() {
  return (
    <section className="section section-dark">
      <div className="container">
        <SectionTitle
          eyebrow="Our services"
          title="Civil work with structure, speed, and supervision"
          subtitle="From early-stage consultation to construction delivery, every service is designed around clear scope, practical timelines, and quality control."
        />
        <ServiceGrid compact />
      </div>
    </section>
  );
}

function ServiceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid-services">
      {services.map(({ title, slug, description, detail, icon: Icon }) => (
        <article className="service-card" key={title}>
          <Icon className="service-icon" size={32} />
          <h3>{title}</h3>
          <span aria-hidden="true" />
          <p>{compact ? description : detail}</p>
          {!compact ? (
            <Link className="text-link" to="/contact">
              Discuss this service <ArrowRight size={15} />
            </Link>
          ) : (
            <Link className="text-link" to={`/services#${slug}`}>
              Learn more <ArrowRight size={15} />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

function WhyChoose() {
  return (
    <section className="section section-darkest">
      <div className="container grid-why">
        <div className="why-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80"
            alt="Civil engineer reviewing construction plans on site"
            loading="lazy"
          />
        </div>
        <div>
          <SectionTitle
            eyebrow="Why choose MSR"
            title="Built for clients who need confidence before concrete"
            subtitle="A reliable construction partner should give you clarity before work begins, discipline while it is underway, and accountability after handover."
          />
          <div className="grid-stats">
            {stats.map(({ title, subtitle, icon: Icon }) => (
              <article className="stat-card" key={title}>
                <span>
                  <Icon size={22} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGrid({ filteredProjects = projects }: { filteredProjects?: typeof projects }) {
  if (filteredProjects.length === 0) {
    return (
      <div className="container">
        <p className="empty-state">No projects match this filter yet.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {filteredProjects.map((project) => (
        <Link className="project-card" key={project.title} to={`/projects/${project.slug}`}>
          <img src={project.image} alt={project.title} loading="lazy" />
          <div>
            <p>{project.category}</p>
            <h3>{project.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProjectsPreview() {
  return (
    <section className="section section-dark">
      <div className="container">
        <SectionTitle
          eyebrow="Our projects"
          title="Recent work across homes, sites, and structures"
          subtitle="A first look at the kind of construction outcomes MSR can plan, manage, and deliver."
        />
      </div>
      <ProjectGrid />
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials" aria-label="Client testimonials">
      <div className="container">
        <SectionTitle
          eyebrow="Client testimonials"
          title="Trusted by people who care about the details"
          subtitle="Clear communication and dependable site execution matter as much as the final finish."
        />
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div className="testimonial-header">
                <div className="avatar" aria-hidden="true">
                  {testimonial.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <blockquote>{testimonial.quote}</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="cta-strip">
      <div className="container cta-content">
        <p className="eyebrow">Start with clarity</p>
        <h2>Need a reliable civil construction partner?</h2>
        <p>
          Share your project requirements and MSR Civil Solutions will help you
          understand the next practical step.
        </p>
        <div className="contact-actions">
          <a className="btn btn-primary" href="tel:+919611514928">
            <Phone size={18} /> Call Now
          </a>
          <Link className="btn btn-secondary" to="/contact">
            Send Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MSR"
        title="Civil work guided by discipline, clarity, and accountability"
        subtitle="MSR Civil Solutions helps clients move from idea to site execution with practical planning, strong supervision, and transparent communication."
      />
      <section className="section section-dark" id="main-content">
        <div className="container split-content">
          <div>
            <SectionTitle
              title="Our mission"
              subtitle="To deliver dependable civil construction services that make quality, cost, and progress visible to every client."
            />
          </div>
          <div className="content-stack">
            <article>
              <h3>Vision</h3>
              <p>
                Become a trusted regional civil construction partner known for
                site discipline, engineering sense, and long-term client
                confidence.
              </p>
            </article>
            <article>
              <h3>Values</h3>
              <p>
                Integrity, safety, quality, practical timelines, and clear
                documentation guide every engagement.
              </p>
            </article>
          </div>
        </div>
      </section>
      <WhyChoose />
      <ContactCta />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Construction services from estimate to execution"
        subtitle="Detailed civil construction support for residential, commercial, structural, and renovation requirements."
      />
      <section className="section section-dark" id="main-content">
        <div className="container">
          <ServiceGrid />
        </div>
      </section>
      <section className="section section-darkest">
        <div className="container detail-list">
          {services.map((service) => (
            <article id={service.slug} key={service.slug}>
              <h2>{service.title}</h2>
              <p>{service.detail}</p>
              <strong>Typical timeline: {service.timeline}</strong>
            </article>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}

function ProjectsPage() {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const filteredProjects = useMemo(
    () =>
      category === 'All'
        ? projects
        : projects.filter((project) => project.category === category),
    [category],
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Built work across homes, commercial sites, and civil structures"
        subtitle="Browse representative project types. These static entries will later connect to the admin-managed project portfolio."
      />
      <section className="section section-dark" id="main-content">
        <div className="container">
          <div className="filter-row" aria-label="Project category filter">
            {categories.map((item) => (
              <button
                className={category === item ? 'active' : ''}
                aria-pressed={category === item}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <ProjectGrid filteredProjects={filteredProjects} />
      </section>
    </>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        subtitle={`${project.location} · ${project.year} · ${project.summary}`}
      />
      <section className="section section-dark" id="main-content">
        <div className="container project-detail">
          <img src={project.image} alt={project.title} />
          <div>
            <SectionTitle title="Scope of work" subtitle={project.scope} />
            <div className="metric-grid">
              {project.stats.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <Link className="btn btn-primary" to="/contact">
              Discuss a similar project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function BlogPage() {
  const [query, setQuery] = useState('');
  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.tag} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical notes for better construction decisions"
        subtitle="Civil topics, material guidance, estimate explainers, and construction planning advice."
      />
      <section className="section section-dark" id="main-content">
        <div className="container">
          <label className="search-box">
            <span className="sr-only">Search articles</span>
            <Search size={18} />
            <input
              type="search"
              placeholder="Search articles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
                  <p>{post.tag}</p>
                  <h2>{post.title}</h2>
                  <span>{post.date}</span>
                  <strong>{post.excerpt}</strong>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty-state">No articles match your search yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

function BlogDetailPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHero eyebrow={post.tag} title={post.title} subtitle={post.excerpt} />
      <section className="section section-dark" id="main-content">
        <article className="container article-body">
          <p className="article-date">{post.date}</p>
          <p>
            Every estimate should be treated as a decision tool, not as a final
            contract number. Site access, soil conditions, finish selection,
            labour availability, and drawing maturity all influence the final
            quotation.
          </p>
          <p>
            MSR Civil Solutions uses structured inputs and admin-managed rates
            so clients can understand the broad cost direction before committing
            to a formal site inspection and detailed proposal.
          </p>
          <Link className="btn btn-primary" to="/contact">
            Ask MSR about this topic <ArrowRight size={18} />
          </Link>
        </article>
      </section>
    </>
  );
}

function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: 'Residential',
      message: '',
      company: '',
    },
  });

  function onSubmit() {
    setIsSubmitted(true);
    reset({
      name: '',
      email: '',
      phone: '',
      projectType: 'Residential',
      message: '',
      company: '',
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your construction requirement"
        subtitle="Share the basics and the MSR team will help you understand the next practical step."
      />
      <section className="section section-dark" id="main-content">
        <div className="container contact-layout">
          <form className="contact-form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <label>
              Name
              <input
                aria-invalid={errors.name ? 'true' : 'false'}
                autoComplete="name"
                placeholder="Your name"
                {...register('name')}
              />
              {errors.name ? <span className="field-error">{errors.name.message}</span> : null}
            </label>
            <label>
              Email
              <input
                aria-invalid={errors.email ? 'true' : 'false'}
                autoComplete="email"
                placeholder="you@example.com"
                type="email"
                {...register('email')}
              />
              {errors.email ? <span className="field-error">{errors.email.message}</span> : null}
            </label>
            <label>
              Phone
              <input
                aria-invalid={errors.phone ? 'true' : 'false'}
                autoComplete="tel"
                placeholder="+91"
                type="tel"
                {...register('phone')}
              />
              {errors.phone ? <span className="field-error">{errors.phone.message}</span> : null}
            </label>
            <label>
              Project type
              <select {...register('projectType')}>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Structural Consultancy</option>
                <option>Renovation</option>
              </select>
            </label>
            <label className="full-field">
              Message
              <textarea
                aria-invalid={errors.message ? 'true' : 'false'}
                placeholder="Tell us about site, area, location, and timeline"
                rows={5}
                {...register('message')}
              />
              {errors.message ? <span className="field-error">{errors.message.message}</span> : null}
            </label>
            <label className="full-field">
              Attachment
              <input
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                aria-invalid={errors.attachment ? 'true' : 'false'}
                type="file"
                {...register('attachment')}
              />
              {errors.attachment ? (
                <span className="field-error">{errors.attachment.message}</span>
              ) : (
                <span className="field-hint">Optional. PDF, JPG, PNG, or WebP up to 5 MB.</span>
              )}
            </label>
            <label className="honeypot" aria-hidden="true">
              Company
              <input tabIndex={-1} autoComplete="off" {...register('company')} />
            </label>
            {isSubmitted ? (
              <p className="form-success full-field">
                Enquiry captured for this prototype. Backend delivery will be connected in the secure form phase.
              </p>
            ) : null}
            <button className="btn btn-primary full-field" type="submit">
              Send Enquiry <ArrowRight size={18} />
            </button>
          </form>
          <aside className="contact-panel">
            <h2>Direct contact</h2>
            <p>
              <MapPin size={18} /> Bengaluru, India
            </p>
            <a href="tel:+919611514928">
              <Phone size={18} /> +91 96115 14928
            </a>
            <a href="mailto:hello@msrcivilsolutions.com">
              <Mail size={18} /> hello@msrcivilsolutions.com
            </a>
            <p>
              <Clock3 size={18} /> Mon to Sat, 9:30 AM to 6:30 PM
            </p>
            <div
              className="map-placeholder"
              role="img"
              aria-label="Map placeholder for MSR Civil Solutions in Bengaluru"
            >
              Google Maps embed area
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function PortalLoginPage({
  type,
  title,
  subtitle,
  codeLabel,
  dashboardPath,
}: {
  type: 'Admin' | 'Employee' | 'Customer';
  title: string;
  subtitle: string;
  codeLabel: string;
  dashboardPath: string;
}) {
  return (
    <>
      <PageHero eyebrow={`${type} portal`} title={title} subtitle={subtitle} />
      <section className="section section-dark" id="main-content">
        <div className="container portal-login-layout">
          <form className="portal-form">
            <label>
              {codeLabel}
              <input
                autoComplete="username"
                placeholder={
                  type === 'Admin'
                    ? 'admin@msr'
                    : type === 'Employee'
                      ? 'EMP-001'
                      : 'you@example.com'
                }
              />
            </label>
            <label>
              Password
              <input autoComplete="current-password" placeholder="Enter password" type="password" />
            </label>
            <Link className="btn btn-primary full-field" to={dashboardPath}>
              Continue to dashboard <LogIn size={18} />
            </Link>
            <p className="field-hint full-field">
              Prototype route. Real login, session checks, and role permissions will be connected during the auth phase.
            </p>
          </form>
          <aside className="portal-note">
            <ShieldCheck size={34} />
            <h2>Separate access, same website</h2>
            <p>
              This portal lives inside the same MSR website, but it will use its own protected route,
              role checks, and database policies before production release.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

function PortalDashboard({
  eyebrow,
  title,
  subtitle,
  metrics,
  modules,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: typeof adminMetrics;
  modules: typeof adminModules;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <section className="section section-dark" id="main-content">
        <div className="container">
          <div className="portal-metric-grid">
            {metrics.map(({ label, value, icon: Icon }) => (
              <article className="portal-metric-card" key={label}>
                <span>
                  <Icon size={22} />
                </span>
                <div>
                  <p>{label}</p>
                  <strong>{value}</strong>
                </div>
              </article>
            ))}
          </div>
          <div className="portal-module-grid">
            {modules.map(({ title: moduleTitle, description, icon: Icon }) => (
              <article className="portal-module-card" key={moduleTitle}>
                <Icon className="service-icon" size={30} />
                <h2>{moduleTitle}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AdminLoginPage() {
  return (
    <PortalLoginPage
      type="Admin"
      title="Management access for MSR operations"
      subtitle="Admin tools for rates, projects, employees, quotes, customers, and website content."
      codeLabel="Admin email"
      dashboardPath="/admin"
    />
  );
}

function EmployeeLoginPage() {
  return (
    <PortalLoginPage
      type="Employee"
      title="Field team access for daily site work"
      subtitle="Employee tools for attendance, assigned projects, project files, and progress reporting."
      codeLabel="Employee ID"
      dashboardPath="/employee"
    />
  );
}

function AdminDashboardPage() {
  return (
    <PortalDashboard
      eyebrow="Admin dashboard"
      title="Control panel for projects, rates, people, and content"
      subtitle="This dashboard preview maps the PRD modules into one management surface. Auth, database writes, and audit logs come next."
      metrics={adminMetrics}
      modules={adminModules}
    />
  );
}

function EmployeeDashboardPage() {
  return (
    <PortalDashboard
      eyebrow="Employee dashboard"
      title="Daily site workflow for field employees"
      subtitle="Attendance, assigned projects, file access, and progress reporting stay in the same website with employee-only access."
      metrics={employeeMetrics}
      modules={employeeModules}
    />
  );
}

function CustomerLoginPage() {
  return (
    <PortalLoginPage
      type="Customer"
      title="Customer access for quotes and project communication"
      subtitle="Customers can generate preliminary estimates, save quotes, and request a formal quotation from MSR."
      codeLabel="Customer email"
      dashboardPath="/customer"
    />
  );
}

function CustomerDashboardPage() {
  return (
    <>
      <PortalDashboard
        eyebrow="Customer dashboard"
        title="Quote tools and project communication in one place"
        subtitle="This customer portal preview covers the calculator, saved quotes, formal quote requests, and profile details."
        metrics={customerMetrics}
        modules={customerModules}
      />
      <section className="section section-darkest">
        <div className="container">
          <Link className="btn btn-primary" to="/customer/quote">
            Open estimate calculator <Calculator size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

function CustomerQuotePage() {
  const [area, setArea] = useState(1200);
  const [floors, setFloors] = useState(1);
  const [finish, setFinish] = useState<'Economy' | 'Standard' | 'Premium' | 'Luxury'>('Standard');
  const [usage, setUsage] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [zone, setZone] = useState<'Urban' | 'Semi-urban' | 'Rural'>('Urban');
  const [soil, setSoil] = useState<'Hard rock' | 'Soft rock' | 'Murrum' | 'Black cotton' | 'Sandy'>('Murrum');
  const [access, setAccess] = useState<'Easy access' | 'Narrow lane' | 'Restricted'>('Easy access');
  const [inclusions, setInclusions] = useState({
    electrical: true,
    plumbing: true,
    doorsWindows: true,
    painting: true,
    flooring: true,
    waterproofing: true,
    compound: false,
    railing: false,
    waterTank: true,
    septicTank: false,
    solar: false,
    lift: false,
  });

  const baseRates = {
    Economy: 1700,
    Standard: 2200,
    Premium: 3100,
    Luxury: 4200,
  };
  const usageMultiplier = {
    Residential: 1,
    Commercial: 1.12,
    Industrial: 1.2,
  };
  const zoneMultiplier = {
    Urban: 1.08,
    'Semi-urban': 1,
    Rural: 0.96,
  };
  const soilMultiplier = {
    'Hard rock': 1.12,
    'Soft rock': 1.04,
    Murrum: 1,
    'Black cotton': 1.15,
    Sandy: 1.08,
  };
  const accessMultiplier = {
    'Easy access': 1,
    'Narrow lane': 1.06,
    Restricted: 1.12,
  };
  const inclusionRates = {
    electrical: 160,
    plumbing: 145,
    doorsWindows: 220,
    painting: 95,
    flooring: 180,
    waterproofing: 65,
    compound: 90,
    railing: 55,
    waterTank: 45,
    septicTank: 65,
    solar: 70,
    lift: 180,
  };
  const inclusionLabels = {
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    doorsWindows: 'Doors & windows',
    painting: 'Painting',
    flooring: 'Flooring',
    waterproofing: 'Waterproofing',
    compound: 'Compound wall',
    railing: 'Staircase railing',
    waterTank: 'Water tank',
    septicTank: 'Septic tank',
    solar: 'Solar provision',
    lift: 'Lift provision',
  };
  const builtUpArea = area * floors;
  const baseEstimate =
    builtUpArea *
    baseRates[finish] *
    usageMultiplier[usage] *
    zoneMultiplier[zone] *
    soilMultiplier[soil] *
    accessMultiplier[access];
  const inclusionTotal = Object.entries(inclusions).reduce((total, [key, enabled]) => {
    if (!enabled) {
      return total;
    }

    return total + builtUpArea * inclusionRates[key as keyof typeof inclusionRates];
  }, 0);
  const estimate = baseEstimate + inclusionTotal;
  const lowEstimate = estimate * 0.92;
  const highEstimate = estimate * 1.12;
  const selectedInclusions = Object.entries(inclusions)
    .filter(([, enabled]) => enabled)
    .map(([key]) => inclusionLabels[key as keyof typeof inclusionLabels]);
  const phaseBreakdownSource: [string, number][] = [
    ['Foundation & substructure', 0.16],
    ['RCC / structure work', 0.28],
    ['Brickwork & masonry', 0.12],
    ['Plastering & waterproofing', 0.1],
    ['Electrical', inclusions.electrical ? 0.07 : 0],
    ['Plumbing', inclusions.plumbing ? 0.07 : 0],
    ['Flooring', inclusions.flooring ? 0.08 : 0],
    ['Painting', inclusions.painting ? 0.05 : 0],
    ['Doors & windows', inclusions.doorsWindows ? 0.05 : 0],
    ['Miscellaneous & contingency', 0.09],
  ];
  const phaseBreakdown = phaseBreakdownSource.filter(([, ratio]) => ratio > 0);
  const timelineMonths = Math.max(3, Math.round((floors * 2.5 + builtUpArea / 2800) * 10) / 10);
  const materialEstimates = [
    ['Cement', `${Math.round(builtUpArea * 0.42).toLocaleString('en-IN')} bags`],
    ['Steel', `${Math.max(1, Math.round(builtUpArea * 0.0038 * 10) / 10)} MT`],
    ['Bricks/blocks', `${Math.round(builtUpArea * 8.5).toLocaleString('en-IN')} units`],
    ['Sand & aggregate', `${Math.round(builtUpArea * 1.25).toLocaleString('en-IN')} cu.ft.`],
  ];
  const currency = new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  });
  const toggleInclusion = (key: keyof typeof inclusions) => {
    setInclusions((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <>
      <PageHero
        eyebrow="Customer calculator"
        title="Generate a preliminary construction estimate"
        subtitle="This first calculator uses static sample rates. In production, all rates will come from the admin-managed rate table."
      />
      <section className="section section-dark" id="main-content">
        <div className="container quote-layout">
          <form className="quote-form">
            <label>
              Site / built-up area per floor
              <input
                min={100}
                step={50}
                type="number"
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
              />
            </label>
            <label>
              Number of floors
              <input
                min={1}
                max={6}
                type="number"
                value={floors}
                onChange={(event) => setFloors(Number(event.target.value))}
              />
            </label>
            <label>
              Usage type
              <select value={usage} onChange={(event) => setUsage(event.target.value as typeof usage)}>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </label>
            <label>
              Finishing grade
              <select value={finish} onChange={(event) => setFinish(event.target.value as typeof finish)}>
                <option>Economy</option>
                <option>Standard</option>
                <option>Premium</option>
                <option>Luxury</option>
              </select>
            </label>
            <label>
              Location / zone
              <select value={zone} onChange={(event) => setZone(event.target.value as typeof zone)}>
                <option>Urban</option>
                <option>Semi-urban</option>
                <option>Rural</option>
              </select>
            </label>
            <label>
              Soil type
              <select value={soil} onChange={(event) => setSoil(event.target.value as typeof soil)}>
                <option>Hard rock</option>
                <option>Soft rock</option>
                <option>Murrum</option>
                <option>Black cotton</option>
                <option>Sandy</option>
              </select>
            </label>
            <label>
              Site accessibility
              <select value={access} onChange={(event) => setAccess(event.target.value as typeof access)}>
                <option>Easy access</option>
                <option>Narrow lane</option>
                <option>Restricted</option>
              </select>
            </label>
            <fieldset className="quote-inclusions full-field">
              <legend>Inclusions</legend>
              {Object.entries(inclusionLabels).map(([key, label]) => (
                <label key={key}>
                  <input
                    checked={inclusions[key as keyof typeof inclusions]}
                    type="checkbox"
                    onChange={() => toggleInclusion(key as keyof typeof inclusions)}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
          </form>
          <aside className="quote-summary">
            <p className="eyebrow">Preliminary range</p>
            <h2>
              {currency.format(lowEstimate)} - {currency.format(highEstimate)}
            </h2>
            <div className="metric-grid">
              <span>{builtUpArea.toLocaleString('en-IN')} sq.ft.</span>
              <span>{currency.format(baseRates[finish])} / sq.ft.</span>
              <span>{finish} finish</span>
              <span>{usage} use</span>
              <span>{timelineMonths} months</span>
              <span>{selectedInclusions.length} inclusions</span>
            </div>
            <div className="quote-breakdown">
              <h3>Phase-wise estimate</h3>
              {phaseBreakdown.map(([label, ratio]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{currency.format(estimate * ratio)}</strong>
                </div>
              ))}
            </div>
            <div className="quote-breakdown">
              <h3>Material approximation</h3>
              {materialEstimates.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p>
              This is a planning estimate only. Final quotation is subject to
              site inspection, drawings, soil condition, inclusions, and current
              material rates.
            </p>
            <Link className="btn btn-primary" to="/contact">
              Request formal quotation <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page is not on site"
        subtitle="The link may be old, or the page may be part of a future phase."
      />
      <section className="section section-dark" id="main-content">
        <div className="container">
          <Link className="btn btn-primary" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/">
            <span>MSR</span> Civil Solutions
          </Link>
          <p>
            Civil construction, structural guidance, and site execution for
            residential and commercial projects.
          </p>
          <div className="social-links">
            <a
              href="https://www.facebook.com"
              aria-label="MSR Civil Solutions on Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com"
              aria-label="MSR Civil Solutions on Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div>
          <h2>Quick links</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
        </div>
        <div>
          <h2>Services</h2>
          {services.map((service) => (
            <Link key={service.slug} to="/services">
              {service.title}
            </Link>
          ))}
          <h2 className="footer-subhead">Portals</h2>
          <Link to="/customer/login">Customer Login</Link>
          <Link to="/employee/login">Employee Login</Link>
          <Link to="/admin/login">Admin Login</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <p>
            <MapPin size={16} /> Bengaluru, India
          </p>
          <p>
            <Phone size={16} /> +91 96115 14928
          </p>
          <p>
            <Mail size={16} /> hello@msrcivilsolutions.com
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} MSR Civil Solutions. All rights reserved.</p>
        <div>
          <Link to="/">Privacy Policy</Link>
          <ChevronRight size={14} />
          <Link to="/">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

function AppShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/customer/login" element={<CustomerLoginPage />} />
          <Route path="/customer" element={<CustomerDashboardPage />} />
          <Route path="/customer/quote" element={<CustomerQuotePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/employee/login" element={<EmployeeLoginPage />} />
          <Route path="/employee" element={<EmployeeDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <a
        className="floating-whatsapp"
        href="https://wa.me/919611514928"
        aria-label="Contact MSR Civil Solutions on WhatsApp"
      >
        <CheckCircle2 size={18} /> WhatsApp
      </a>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <MetaManager />
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}
