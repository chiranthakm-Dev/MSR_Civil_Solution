import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Facebook,
  Factory,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Search,
  ShieldCheck,
  Star,
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
