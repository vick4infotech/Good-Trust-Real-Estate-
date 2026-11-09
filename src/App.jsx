import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight,
  Building2, Check, ChevronDown, Compass, ExternalLink, Instagram,
  KeyRound, Mail, MapPin, Menu, MessageCircle, MoveUpRight,
  Phone, Search, ShieldCheck, Sparkles, X,
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SITE, createWhatsAppLink, properties } from './data';

const A = '/assets/';
const ease = [0.22, 1, 0.36, 1];
const asset = (file) => `${A}${file}`;

function Reveal({ children, delay = 0, className = '', as = 'div', distance = 48 }) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.78, delay, ease }}
    >
      {children}
    </Component>
  );
}

function Eyebrow({ children, light = false, className = '' }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''} ${className}`}><span className="eyebrow-line" />{children}</span>;
}

function ButtonLink({ to, href, children, light = false, outline = false, className = '', external = false }) {
  const classNames = `button-link ${light ? 'button-light' : ''} ${outline ? 'button-outline' : ''} ${className}`;
  const content = <>{children}<span className="button-icon"><ArrowUpRight size={17} strokeWidth={1.75} /></span></>;
  if (href) return <a className={classNames} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a>;
  return <Link className={classNames} to={to}>{content}</Link>;
}

function Brand({ inverse = false, compact = false }) {
  return (
    <Link to="/" className={`brand ${inverse ? 'brand-inverse' : ''} ${compact ? 'brand-compact' : ''}`} aria-label="Good Trust Real Estate, home">
      <img src={asset('brand-mark.png')} width="53" height="52" alt="" className="brand-icon" />
      <span className="brand-wordmark"><strong>GOOD TRUST</strong><small>REAL ESTATE</small></span>
    </Link>
  );
}

function Loader({ visible }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="site-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Good Trust Real Estate"
          initial={{ opacity: 1 }}
          exit={{ y: reduce ? 0 : '-100%', opacity: reduce ? 0 : 1 }}
          transition={{ duration: reduce ? 0.15 : 1.05, ease }}
        >
          <span className="loader-corner loader-corner-a" /><span className="loader-corner loader-corner-b" />
          <motion.div className="loader-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, ease }}>
            <img src={asset('brand-full.webp')} alt="Good Trust Estate Management Ltd. logo" className="loader-logo" />
            <div className="loader-caption">AN ADDRESS FOR YOUR AMBITIONS</div>
            <div className="loader-bar"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} /></div>
          </motion.div>
          <span className="loader-side-note">GOOD TRUST · EST. IN TRUST</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 35, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    document.body.classList.toggle('menu-locked', menuOpen);
    return () => document.body.classList.remove('menu-locked');
  }, [menuOpen]);
  const isLight = scrolled || location.pathname !== '/';
  const links = [{ to: '/', label: 'Home', end: true }, { to: '/listings', label: 'Current Listings' }, { to: '/about', label: 'About Us' }];
  return (
    <>
      <header className={`site-header ${isLight ? 'site-header-solid' : 'site-header-clear'} ${menuOpen ? 'site-header-open' : ''}`}>
        <div className="header-inner">
          <Brand inverse={!isLight || menuOpen} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}>{label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <a className="header-phone" href={`tel:${SITE.phone}`}><Phone size={15} /> <span>{SITE.phoneDisplay}</span></a>
            <a className="header-cta" href={createWhatsAppLink('Hello Good Trust, I would like to speak with your property team.')} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={16} /></a>
          </div>
          <button className={`menu-toggle ${menuOpen ? 'menu-toggle-active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu">
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" id="mobile-menu" initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }} transition={{ duration: .32 }}>
            <div className="mobile-menu-top"><span>EXPLORE GOOD TRUST</span><span>01 / 03</span></div>
            {links.map(({ to, label }, i) => <motion.div key={to} initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .09 * i }}><Link to={to} onClick={() => setMenuOpen(false)} className="mobile-menu-link"><span>0{i + 1}</span>{label}<ArrowUpRight size={24} /></Link></motion.div>)}
            <div className="mobile-menu-bottom"><a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a><a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer">Start a conversation <ArrowUpRight size={16} /></a></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ContactStrip() {
  return (
    <div className="contact-strip">
      <span>BEAUTIFUL SPACES. MEANINGFUL FUTURES.</span>
      <span className="contact-strip-center">PROPERTIES · POSSIBILITIES · PEOPLE</span>
      <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer">CONNECT WITH US <ArrowUpRight size={14} /></a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <Brand inverse />
          <p>Trusted real estate guidance for the places you live, the spaces you own, and the opportunities you pursue.</p>
          <div className="footer-socials">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Good Trust on Instagram"><Instagram size={19} /></a>
            <a href={SITE.linktree} target="_blank" rel="noopener noreferrer" aria-label="Good Trust links"><ExternalLink size={19} /></a>
            <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="Good Trust on WhatsApp"><MessageCircle size={19} /></a>
          </div>
        </div>
        <div className="footer-col"><span className="footer-heading">EXPLORE</span><Link to="/">Home</Link><Link to="/listings">Current Listings</Link><Link to="/about">About Good Trust</Link><Link to="/about#ceo-message">A Message From Our CEO</Link></div>
        <div className="footer-col"><span className="footer-heading">OUR EXPERTISE</span><a href={createWhatsAppLink('Hello Good Trust, I want to discuss buying a property.')} target="_blank" rel="noopener noreferrer">Property Sales</a><a href={createWhatsAppLink('Hello Good Trust, I want to discuss rental options.')} target="_blank" rel="noopener noreferrer">Rentals & Leasing</a><a href={createWhatsAppLink('Hello Good Trust, I want to discuss property management.')} target="_blank" rel="noopener noreferrer">Property Management</a><a href={createWhatsAppLink('Hello Good Trust, I would like to discuss real estate investments.')} target="_blank" rel="noopener noreferrer">Investment Enquiries</a></div>
        <div className="footer-col footer-contact"><span className="footer-heading">COME FIND US</span><a href="https://www.google.com/maps/search/?api=1&query=18+Osuku+Plaza+Lokoja+Nigeria" target="_blank" rel="noopener noreferrer">{SITE.address}</a><a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Good Trust Real Estate. All rights reserved.</span><span>BUILT ON TRUST. DESIGNED FOR TOMORROW.</span><Link to="/">BACK TO HOME <ArrowUpRight size={13} /></Link></div>
      <div className="footer-oversized" aria-hidden="true">GOOD TRUST</div>
    </footer>
  );
}

function SectionHead({ eyebrow, title, text, action, light = false }) {
  return <div className={`section-head ${light ? 'section-head-light' : ''}`}><div><Eyebrow light={light}>{eyebrow}</Eyebrow><Reveal as="h2" className="section-title">{title}</Reveal></div>{text && <Reveal className="section-head-aside" delay={.13}><p>{text}</p>{action}</Reveal>}</div>;
}

function PropertyImage({ property, eager = false }) {
  return <img src={property.image} alt={property.name} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

function PropertyCard({ property, index = 0, variant = '' }) {
  return (
    <Reveal delay={Math.min(index * .07, .28)} className={`property-card ${variant}`}>
      <Link className="property-card-link" to={`/listings?property=${encodeURIComponent(property.id)}`} aria-label={`View details for ${property.name}`}>
        <div className="property-card-image"><PropertyImage property={property} /><span className="property-type">{property.label}</span><span className="property-card-arrow"><ArrowUpRight size={22} /></span></div>
        <div className="property-card-bottom"><div><span className="property-location"><MapPin size={13} />{property.location}</span><h3>{property.name}</h3><p>{property.subtitle}</p></div><span className="view-label">VIEW DETAILS <ArrowUpRight size={15} /></span></div>
      </Link>
    </Reveal>
  );
}

function HomeHero() {
  const reduce = useReducedMotion();
  return (
    <section className="home-hero" aria-label="Welcome to Good Trust">
      <motion.div className="hero-photo" initial={reduce ? false : { scale: 1.13 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }} />
      <div className="hero-shade" />
      <div className="hero-grain" />
      <div className="hero-frame"><span /><span /><span /><span /></div>
      <div className="container hero-content">
        <motion.div className="hero-inner" initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: 1.05, ease }}>
          <Eyebrow light>WELCOME TO GOOD TRUST REAL ESTATE</Eyebrow>
          <h1>Your place.<br /><em>Your purpose.</em><br />Your future.</h1>
          <p>Exceptional spaces. Thoughtful guidance. A trusted partner for property sales, rentals, and management in Nigeria and beyond.</p>
          <div className="hero-buttons"><ButtonLink to="/listings" light>Explore Our Properties</ButtonLink><Link className="hero-text-link" to="/about">Our Story <span><ArrowUpRight size={18} /></span></Link></div>
        </motion.div>
      </div>
      <div className="hero-rail"><span>LOKOJA, NIGERIA</span><i /><span>REAL ESTATE WITH PURPOSE</span></div>
      <div className="hero-bottom container"><a className="hero-scroll" href="#introduction"><span className="hero-scroll-icon"><ArrowDown size={19} /></span><span>SCROLL TO EXPLORE</span></a><div className="hero-bottom-right"><span>WHERE GREAT STORIES FIND A HOME</span><span className="hero-bottom-num">01 / 03</span></div></div>
      <div className="hero-side-line" />
    </section>
  );
}

function IntroSection() {
  return (
    <section className="intro-section section-space" id="introduction">
      <div className="container intro-grid">
        <div className="intro-main"><Eyebrow>THE GOOD TRUST DIFFERENCE</Eyebrow><Reveal as="h2" className="display-title">More than<br />a property.<br /><em>A possibility.</em></Reveal><Reveal className="intro-index"><span className="mini-flower">✳</span> GOOD PROPERTY IS JUST THE BEGINNING.</Reveal></div>
        <div className="intro-copy"><Reveal><p className="body-large">At Good Trust, we believe the right space can change everything.</p><p>Whether you are searching for a place to call home, looking to lease, or exploring an investment, our approach combines personal attention with a clear commitment to trust.</p></Reveal><Reveal delay={.15}><Link className="editorial-link" to="/about">GET TO KNOW US <span><ArrowUpRight size={18} /></span></Link></Reveal><Reveal className="intro-image-wrap" delay={.19}><img src={asset('bungalow-residence.webp')} loading="lazy" alt="Paved courtyard of a Good Trust residential property" /><span className="intro-image-note">01 <span /> SPACES TO BELONG</span></Reveal></div>
      </div>
    </section>
  );
}

function FeaturedSection() {
  const selected = [properties[0], properties[1], properties[3]];
  return (
    <section className="featured-section section-space" id="properties">
      <div className="container">
        <SectionHead eyebrow="EXPLORE OUR PORTFOLIO" title={<>Places with <em>potential.</em></>} text="Explore a curated visual showcase of residential and commercial spaces, then connect with our team for details, pricing, and current availability." action={<Link className="editorial-link" to="/listings">ALL PROPERTIES <span><ArrowUpRight size={18} /></span></Link>} />
        <div className="featured-grid"><PropertyCard property={selected[0]} variant="featured-large" /><div className="featured-stack"><PropertyCard property={selected[1]} index={1} variant="featured-small" /><PropertyCard property={selected[2]} index={2} variant="featured-small" /></div></div>
        <div className="portfolio-notice"><Sparkles size={15} /><p>Portfolio imagery is illustrative of properties and projects. Availability, specifications, ownership, and pricing are confirmed directly by our team.</p></div>
      </div>
    </section>
  );
}

const services = [
  { number: '01', icon: KeyRound, name: 'Property Sales', description: 'Explore residential and commercial opportunities with guidance shaped around your goals.' },
  { number: '02', icon: Compass, name: 'Rentals & Leasing', description: 'Find spaces that fit your lifestyle, business needs, and the next chapter of your story.' },
  { number: '03', icon: ShieldCheck, name: 'Property Management', description: 'Thoughtful support for owners who want a reliable partner to help care for their properties.' },
];

function ServicesSection() {
  return (
    <section className="services-section section-space">
      <div className="container"><SectionHead eyebrow="WHAT WE DO" title={<>Expertise with <em>intention.</em></>} text="From your first enquiry to your next big decision, we aim to make the property journey feel clearer, more personal, and more rewarding." />
        <div className="service-grid">{services.map(({ number, icon: Icon, name, description }, i) => <Reveal key={number} delay={i * .1} className="service-card"><div className="service-card-top"><span>{number} / 03</span><Icon size={32} strokeWidth={1.2} /></div><div><h3>{name}</h3><p>{description}</p></div><a href={createWhatsAppLink(`Hello Good Trust, I would like to enquire about ${name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${name}`}><ArrowUpRight size={21} /></a></Reveal>)}</div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  return <div className="marquee-section" aria-label="Built on trust. Inspired by possibility."><div className="marquee-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>BUILT ON TRUST <b>✳</b> INSPIRED BY POSSIBILITY <b>✳</b></span>)}</div></div>;
}

function AboutTeaser() {
  return (
    <section className="teaser-section section-space">
      <div className="container teaser-grid"><Reveal className="teaser-image"><img src={asset('peter-suleiman.webp')} alt="Peter Suleiman, Chief Executive Officer of Good Trust Real Estate" loading="lazy" /><span className="teaser-image-label">THE PEOPLE BEHIND THE PROMISE</span></Reveal><div className="teaser-content"><Eyebrow>PERSONAL VISION. LASTING VALUE.</Eyebrow><Reveal as="h2" className="display-title teaser-heading">Trust is not<br />a tagline.<br /><em>It is our foundation.</em></Reveal><Reveal><p>Good Trust is led by a commitment to creating meaningful property relationships. Meet the people and the purpose behind the brand.</p></Reveal><Reveal delay={.1}><ButtonLink to="/about">Discover Our Story</ButtonLink></Reveal><div className="teaser-signature"><span>PETER SULEIMAN</span><small>CHIEF EXECUTIVE OFFICER</small></div></div></div>
    </section>
  );
}

function EnquirySection() {
  const [form, setForm] = useState({ name: '', interest: 'Buying a property', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const note = `Hello Good Trust Real Estate, my name is ${form.name.trim()}.\nI am interested in: ${form.interest}.\n${form.message.trim() ? `My message: ${form.message.trim()}` : 'Please contact me with more information.'}`;
    window.open(createWhatsAppLink(note), '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return (
    <section className="enquiry-section" id="contact">
      <div className="container enquiry-grid"><div className="enquiry-left"><Eyebrow light>LET'S MAKE IT HAPPEN</Eyebrow><Reveal as="h2" className="display-title">Your next chapter<br /><em>starts with a</em><br />conversation.</Reveal><Reveal><p>Have a property in mind, a question about investing, or a space you would like us to manage? We would love to hear from you.</p></Reveal><div className="enquiry-contact"><a href={`tel:${SITE.phone}`}><Phone size={17} /> {SITE.phoneDisplay}</a><a href={`mailto:${SITE.email}`}><Mail size={17} /> {SITE.email}</a></div><span className="enquiry-watermark">GOOD TRUST</span></div><Reveal className="enquiry-form-wrap" delay={.12}><div className="form-top"><span>MAKE AN ENQUIRY</span><ArrowUpRight size={24} /></div><form onSubmit={handleSubmit} className="enquiry-form"><label htmlFor="enquiry-name">YOUR NAME</label><input id="enquiry-name" type="text" placeholder="How should we address you?" required maxLength={80} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /><label htmlFor="enquiry-interest">I AM INTERESTED IN</label><div className="select-shell"><select id="enquiry-interest" value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}><option>Buying a property</option><option>Renting or leasing</option><option>Property management</option><option>Investment opportunities</option><option>Something else</option></select><ChevronDown size={18} /></div><label htmlFor="enquiry-message">YOUR MESSAGE <span>(OPTIONAL)</span></label><textarea id="enquiry-message" rows={3} maxLength={1500} placeholder="Tell us a little about what you need..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} /><button className="form-submit" type="submit">CONTINUE TO WHATSAPP <span><ArrowUpRight size={20} /></span></button><p className="form-fineprint">This opens WhatsApp with your message. We do not store enquiry details on this website.</p>{sent && <p className="form-success" role="status">Your WhatsApp message is ready. If a new window did not open, please use the WhatsApp link in the footer.</p>}</form></Reveal></div>
    </section>
  );
}

function HomePage() {
  useSeo('Good Trust Real Estate | Built on Trust', 'Discover Good Trust Real Estate, your trusted property partner for sales, rentals, management, and investment enquiries in Nigeria and beyond.');
  return <main><HomeHero /><IntroSection /><FeaturedSection /><ServicesSection /><BrandMarquee /><AboutTeaser /><EnquirySection /><ContactStrip /></main>;
}

function ListingsHero() {
  return <section className="interior-hero listings-hero"><div className="interior-hero-image" /><div className="interior-hero-overlay" /><div className="container interior-hero-content"><Eyebrow light>A SHOWCASE OF POSSIBILITIES</Eyebrow><motion.h1 initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease }}>Spaces worth<br /><em>exploring.</em></motion.h1><motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .75 }}>Every great investment, business, and home begins with an inspired first look.</motion.p><span className="interior-page-count">02 / 03 <span /> CURRENT LISTINGS</span></div></section>;
}

function PropertyDialog({ property, close }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const focusId = window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => { window.removeEventListener('keydown', onKey); window.cancelAnimationFrame(focusId); document.body.style.overflow = ''; };
  }, [close]);
  return <motion.div className="dialog-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) close(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .23 }}>
    <motion.div className="property-dialog" role="dialog" aria-modal="true" aria-label={`Property details: ${property.name}`} initial={{ y: 35, scale: .975, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 25, opacity: 0 }} transition={{ duration: .4, ease }}>
      <button ref={closeRef} className="dialog-close" onClick={close} aria-label="Close property details"><X size={22} /></button>
      <div className="dialog-image"><img src={property.image} alt={property.name} /><span>{property.label}</span></div>
      <div className="dialog-content"><Eyebrow>THE GOOD TRUST PORTFOLIO</Eyebrow><h2>{property.name}</h2><p className="dialog-location"><MapPin size={16} /> {property.location}</p><p className="dialog-description">{property.description}</p><div className="dialog-features">{property.details.map(d => <span key={d}><Check size={14} /> {d}</span>)}</div><div className="dialog-notice"><ShieldCheck size={19} /><p>Price, availability, accurate location, specifications, and property documentation must be confirmed with our team before any transaction.</p></div><a className="dialog-enquire" href={createWhatsAppLink(`Hello Good Trust Real Estate, I would like details about ${property.name}. Please confirm its availability, price, exact location, and documentation.`)} target="_blank" rel="noopener noreferrer">ENQUIRE ABOUT THIS PROPERTY <ArrowUpRight size={19} /></a></div>
    </motion.div>
  </motion.div>;
}

function ListingsPage() {
  useSeo('Current Listings | Good Trust Real Estate', 'Explore the Good Trust property showcase, including residences, commercial buildings, and architectural concepts. Enquire for verified availability and pricing.');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Properties');
  const [params] = useSearchParams();
  const active = properties.find(p => p.id === params.get('property'));
  const navigate = useNavigate();
  const categories = ['All Properties', 'Residential', 'Commercial', 'Design Concepts'];
  const filtered = properties.filter(p => (category === 'All Properties' || category === p.category) && `${p.name} ${p.subtitle} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase().trim()));
  const close = () => {
    const newParams = new URLSearchParams(params); newParams.delete('property');
    navigate({ pathname: '/listings', search: newParams.toString() ? `?${newParams}` : '' }, { replace: true, preventScrollReset: true });
  };
  return <main><ListingsHero /><section className="listings-main section-space"><div className="container"><div className="listings-heading"><Eyebrow>THE PROPERTY COLLECTION</Eyebrow><Reveal as="h2" className="display-title">Find what <em>moves you.</em></Reveal><p>Browse our property and project imagery. Every enquiry receives individual attention from our team.</p></div><div className="listing-controls"><div className="filter-tabs" role="group" aria-label="Filter property types">{categories.map(cat => <button key={cat} className={`filter-tab ${category === cat ? 'filter-active' : ''}`} onClick={() => setCategory(cat)} aria-pressed={category === cat}>{cat}</button>)}</div><label className="listing-search"><Search size={18} /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search properties" aria-label="Search properties" /></label></div><div className="listings-result-line"><span>SHOWING {filtered.length.toString().padStart(2, '0')} OF {properties.length.toString().padStart(2, '0')} SHOWCASES</span><span>REACH OUT FOR AVAILABILITY & PRICING</span></div><div className="listing-grid"><AnimatePresence mode="popLayout">{filtered.map((property, i) => <motion.div layout key={property.id} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }} transition={{ duration: .3 }} className="listing-grid-item"><Link className="listing-item-link" to={`/listings?property=${property.id}`}><div className="listing-item-image"><PropertyImage property={property} /><span className="listing-badge">{property.label}</span><span className="listing-hover"><ArrowUpRight size={24} /></span></div><div className="listing-item-content"><div className="listing-item-index">{String(i + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</div><h3>{property.name}</h3><p>{property.subtitle}</p><div className="listing-item-footer"><span><MapPin size={14} /> {property.location}</span><span>ENQUIRE <ArrowUpRight size={15} /></span></div></div></Link></motion.div>)}</AnimatePresence></div>{filtered.length === 0 && <div className="empty-state"><Building2 size={34} /><h3>No matches just yet.</h3><p>Try a different search or switch to all properties.</p><button onClick={() => { setQuery(''); setCategory('All Properties'); }}>SHOW ALL PROPERTIES <ArrowRight size={16} /></button></div>}<div className="listing-disclaimer"><ShieldCheck size={26} /><p><strong>A note on the collection.</strong> These images were supplied as a property showcase with descriptive working titles. They are not a guarantee of live inventory or an offer for sale. Property details, ownership, documentation, prices, and availability are provided upon verification with the Good Trust team.</p></div></div></section><section className="listing-end-cta"><div className="container listing-end-grid"><Eyebrow light>WE ARE HERE TO HELP</Eyebrow><div><h2>Have something<br /><em>particular in mind?</em></h2><p>Tell us what you are looking for. We will help you explore the right next step.</p></div><ButtonLink href={createWhatsAppLink('Hello Good Trust, I am looking for a property and would like personalised assistance.')} external light>Talk to Our Team</ButtonLink></div></section><ContactStrip /><AnimatePresence>{active && <PropertyDialog key={active.id} property={active} close={close} />}</AnimatePresence></main>;
}

const values = [
  { n: '01', title: 'People before property', text: 'We listen before we recommend. Your needs, circumstances, and goals guide the conversation.' },
  { n: '02', title: 'Clarity in every step', text: 'We believe informed decisions begin with straightforward communication and careful questions.' },
  { n: '03', title: 'A long-term perspective', text: 'We aim to build relationships that last longer than a transaction and create value beyond a single deal.' },
];

const faqs = [
  { q: 'What kind of properties can I enquire about?', a: 'You can contact our team about residential property, commercial spaces, rentals, and property management. Our showcase is a starting point, and we will confirm specific options with you.' },
  { q: 'Can I ask about investment opportunities?', a: 'Yes. Let us know your preferred market, investment goals, and budget range. Our team can discuss potential opportunities and which property documents you should review. No return on investment is guaranteed.' },
  { q: 'How do I confirm a listing is available?', a: 'Reach out through WhatsApp, telephone, or email. Our team can confirm the current status, location, pricing, and relevant property documentation before you make any commitment.' },
  { q: 'Where is Good Trust Real Estate located?', a: 'Our listed office address is 18 Osuku Plaza, 1st 200 Housing Unit Junction, Lokoja, Nigeria. Please contact us before visiting to arrange a suitable meeting.' },
];

function AboutPage() {
  useSeo('About Us | Good Trust Real Estate', 'Meet Good Trust Real Estate and CEO Peter Suleiman. Learn about our philosophy, services, and message to future homeowners and property investors.');
  const [openFaq, setOpenFaq] = useState(0);
  return <main>
    <section className="about-hero"><div className="about-hero-grid container"><div className="about-hero-content"><Eyebrow>GET TO KNOW GOOD TRUST</Eyebrow><motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease }}>Rooted in<br /><em>trust.</em><br />Driven by<br />possibility.</motion.h1><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .17 }}>Real estate is about so much more than buildings. It is about people, purpose, and the future we are building together.</motion.p><a href="#our-story" className="about-hero-discover">DISCOVER OUR STORY <ArrowDownRight size={19} /></a></div><div className="about-hero-portrait"><motion.img initial={{ scale: 1.12, opacity: .7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease }} src={asset('peter-suleiman.webp')} alt="Peter Suleiman seated at the Good Trust Real Estate office" /><div className="portrait-caption"><span>PETER SULEIMAN</span><small>CHIEF EXECUTIVE OFFICER</small></div><div className="portrait-outline" /></div></div><span className="about-hero-large" aria-hidden="true">TRUST</span></section>
    <section className="story-section section-space" id="our-story"><div className="container story-grid"><div><Eyebrow>THE STORY BEHIND THE NAME</Eyebrow><Reveal as="h2" className="display-title">A name that<br /><em>means something.</em></Reveal></div><div className="story-copy"><Reveal><p className="body-large">Good Trust was built around a simple belief: property relationships should begin with confidence and grow through care.</p><p>We support individuals, families, and businesses as they navigate property sales, rentals, and property management. From our office in Lokoja, our outlook extends to real estate opportunities in Nigeria and abroad.</p><p>We want every conversation to be thoughtful, every recommendation to be purposeful, and every next step to feel a little clearer.</p></Reveal><Reveal delay={.1}><ButtonLink to="/listings">Explore the Collection</ButtonLink></Reveal></div></div></section>
    <section className="beliefs-section section-space"><div className="container"><SectionHead eyebrow="WHAT MATTERS TO US" title={<>Our principles. <em>Your confidence.</em></>} /><div className="belief-grid">{values.map((v, i) => <Reveal className="belief-card" key={v.n} delay={i * .1}><div className="belief-card-top"><span>{v.n}</span><span>✳</span></div><h3>{v.title}</h3><p>{v.text}</p></Reveal>)}</div></div></section>
    <section className="ceo-section section-space" id="ceo-message"><div className="container ceo-grid"><Reveal className="ceo-image"><img src={asset('peter-suleiman.webp')} loading="lazy" alt="Good Trust CEO Peter Suleiman in his office" /><span>THE VISION BEHIND GOOD TRUST</span></Reveal><div className="ceo-message"><Eyebrow>A MESSAGE TO OUR FUTURE INVESTORS</Eyebrow><Reveal as="h2" className="display-title">Building value.<br /><em>Earning trust.</em></Reveal><Reveal><div className="ceo-quote-mark">“</div><p className="ceo-opening">To every prospective client, homeowner, and investor, welcome to Good Trust Real Estate.</p><p>We understand that a property decision is rarely just about bricks and land. It can represent years of hard work, a dream for your family, or a thoughtful step toward the future you envision.</p><p>Our ambition is to make your experience personal, informed, and grounded in trust. We want you to ask questions, explore possibilities, understand the details, and feel confident about each decision you make.</p><p>Whether you are considering your first home, a business property, or your next investment, we welcome the opportunity to begin that conversation with you.</p><p>Thank you for considering Good Trust. We look forward to earning your confidence through the way we serve you.</p></Reveal><Reveal className="ceo-signoff" delay={.2}><span>Peter Suleiman</span><small>CHIEF EXECUTIVE OFFICER<br />GOOD TRUST REAL ESTATE</small></Reveal></div></div></section>
    <section className="about-reach section-space"><div className="container about-reach-grid"><div><Eyebrow light>FROM LOKOJA, WITH VISION</Eyebrow><Reveal as="h2" className="display-title">Local connection.<br /><em>Broader horizons.</em></Reveal><Reveal><p>Our contact office is based in Lokoja, Nigeria. Our service outlook includes enquiries about property opportunities in Nigeria and abroad.</p></Reveal><ButtonLink href={createWhatsAppLink('Hello Good Trust, I would like to discuss property opportunities in Nigeria or abroad.')} external light>Start a Conversation</ButtonLink></div><Reveal className="reach-photo"><img src={asset('grand-residence.webp')} loading="lazy" alt="An elegant residence from the Good Trust property showcase" /><div className="reach-photo-note"><MapPin size={20} /><span>LOKOJA, NIGERIA<br /><small>OUR CONTACT OFFICE</small></span></div></Reveal></div></section>
    <section className="faq-section section-space"><div className="container faq-grid"><div><Eyebrow>GOOD TO KNOW</Eyebrow><Reveal as="h2" className="display-title">Questions worth<br /><em>asking.</em></Reveal><p>Great property decisions start with good questions. Here are a few places to begin.</p></div><div className="faq-list">{faqs.map(({ q, a }, i) => <div className={`faq-item ${openFaq === i ? 'faq-item-open' : ''}`} key={q}><button type="button" aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{q}</strong><span className="faq-icon">{openFaq === i ? <X size={18} /> : <ArrowDown size={18} />}</span></button><AnimatePresence initial={false}>{openFaq === i && <motion.div id={`faq-answer-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="faq-answer"><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>
    <section className="about-cta"><div className="container about-cta-inner"><Eyebrow light>THE NEXT STEP IS YOURS</Eyebrow><Reveal as="h2" className="display-title">Let's create something <em>meaningful.</em></Reveal><ButtonLink href={createWhatsAppLink('Hello Good Trust Real Estate, I have read about your company and would like to make an enquiry.')} light external>Talk to Good Trust</ButtonLink></div></section><ContactStrip />
  </main>;
}

function useSeo(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [title, description]);
}

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    if (location.search.includes('property=')) return;
    if (location.hash) {
      const id = window.setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 100);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);
  return null;
}

function NotFound() {
  useSeo('Page Not Found | Good Trust Real Estate', 'Return to Good Trust Real Estate.');
  return <main className="not-found"><Eyebrow>LOST YOUR WAY?</Eyebrow><h1>404</h1><p>This address isn't part of our collection.</p><ButtonLink to="/">Back to Home</ButtonLink></main>;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();
  const location = useLocation();
  useEffect(() => { const id = setTimeout(() => setLoading(false), reduce ? 200 : 1450); return () => clearTimeout(id); }, [reduce]);
  useEffect(() => { document.body.style.overflow = loading ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [loading]);
  return <><a href="#page-content" className="skip-link">Skip to main content</a><ScrollProgress /><Loader visible={loading} /><Header /><RouteEffects /><div id="page-content"><AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .28 }}><Routes location={location}><Route path="/" element={<HomePage />} /><Route path="/listings" element={<ListingsPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFound />} /></Routes></motion.div></AnimatePresence></div><Footer /><Analytics /></>;
}
