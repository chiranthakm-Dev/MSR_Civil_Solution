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
  ShieldCheck,
  Star,
  Wrench,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = ['Home', 'Services', 'Projects', 'About', 'Contact'];

const services = [
  {
    title: 'Residential Construction',
    description: 'Villas, row houses, apartments, and turnkey home construction.',
    icon: Building2,
  },
  {
    title: 'Commercial Buildings',
    description: 'Offices, shops, warehouses, and mixed-use commercial spaces.',
    icon: Factory,
  },
  {
    title: 'Structural Consultancy',
    description: 'RCC, steel, foundation, and site-specific engineering guidance.',
    icon: Ruler,
  },
  {
    title: 'Renovation & Site Development',
    description: 'Extensions, repairs, waterproofing, compounds, and upgrades.',
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
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Commercial Building Shell',
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Site Development Works',
    category: 'Infrastructure',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'RCC Frame Construction',
    category: 'Structural',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
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
      <a className="brand" href="#home" aria-label="MSR Civil Solutions home">
        <span>MSR</span> Civil Solutions
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="#contact">
        Get Quote
      </a>

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
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a className="mobile-quote" href="#contact" onClick={() => setIsMenuOpen(false)}>
            Get a Free Quote
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">Trusted civil engineers</p>
        <h1>
          Building strong foundations <span>for the future</span>
        </h1>
        <p>
          MSR Civil Solutions delivers residential, commercial, and structural
          construction work with disciplined planning, transparent estimates, and
          site-level accountability.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            Get a Free Quote <ArrowRight size={18} />
          </a>
          <a className="btn btn-secondary" href="#projects">
            View Our Projects
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section section-dark" id="services">
      <div className="container">
        <SectionTitle
          eyebrow="Our services"
          title="Civil work with structure, speed, and supervision"
          subtitle="From early-stage consultation to construction delivery, every service is designed around clear scope, practical timelines, and quality control."
        />
        <div className="grid-services">
          {services.map(({ title, description, icon: Icon }) => (
            <article className="service-card" key={title}>
              <Icon className="service-icon" size={32} />
              <h3>{title}</h3>
              <span aria-hidden="true" />
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section section-darkest" id="about">
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

function Projects() {
  return (
    <section className="section section-dark" id="projects">
      <div className="container">
        <SectionTitle
          eyebrow="Our projects"
          title="Recent work across homes, sites, and structures"
          subtitle="A first look at the kind of construction outcomes MSR can plan, manage, and deliver."
        />
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <img src={project.image} alt={project.title} loading="lazy" />
            <div>
              <p>{project.category}</p>
              <h3>{project.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonial-title">
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

function Contact() {
  return (
    <section className="cta-strip" id="contact">
      <div className="container cta-content">
        <p className="eyebrow">Start with clarity</p>
        <h2>Need a reliable civil construction partner?</h2>
        <p>
          Share your project requirements and MSR Civil Solutions will help you
          understand the next practical step.
        </p>
        <div className="contact-actions">
          <a className="btn btn-primary" href="tel:+919876543210">
            <Phone size={18} /> Call Now
          </a>
          <a className="btn btn-secondary" href="mailto:hello@msrcivilsolutions.com">
            <Mail size={18} /> Email MSR
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <span>MSR</span> Civil Solutions
          </a>
          <p>
            Civil construction, structural guidance, and site execution for
            residential and commercial projects.
          </p>
          <div className="social-links">
            <a href="#home" aria-label="MSR Civil Solutions on Facebook">
              <Facebook size={18} />
            </a>
            <a href="#home" aria-label="MSR Civil Solutions on Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div>
          <h2>Quick links</h2>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
        </div>
        <div>
          <h2>Services</h2>
          <a href="#services">Residential Construction</a>
          <a href="#services">Commercial Buildings</a>
          <a href="#services">Structural Consultancy</a>
          <a href="#services">Renovation</a>
        </div>
        <div>
          <h2>Contact</h2>
          <p>
            <MapPin size={16} /> Pune, Maharashtra
          </p>
          <p>
            <Phone size={16} /> +91 98765 43210
          </p>
          <p>
            <Mail size={16} /> hello@msrcivilsolutions.com
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} MSR Civil Solutions. All rights reserved.</p>
        <div>
          <a href="#home">Privacy Policy</a>
          <ChevronRight size={14} />
          <a href="#home">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <a
        className="floating-whatsapp"
        href="https://wa.me/919876543210"
        aria-label="Contact MSR Civil Solutions on WhatsApp"
      >
        <CheckCircle2 size={18} /> WhatsApp
      </a>
    </>
  );
}
