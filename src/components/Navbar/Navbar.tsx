import { useEffect, useState, useCallback, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, LayoutGrid, Layers, Phone } from 'lucide-react';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const y = Math.max(0, window.scrollY);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // Scrolled glass background effect kicks in after 60px
    setScrolled(y > 60);

    // On mobile, keep menu bar permanently sticky (never hide on scroll)
    if (isMobile || menuOpen || y <= 80) {
      setHidden(false);
    } else if (y > lastScrollY.current + 5) {
      setHidden(true);   // Scrolling down -> hide on desktop
    } else if (y < lastScrollY.current - 5) {
      setHidden(false);  // Scrolling up -> show
    }

    lastScrollY.current = y;
  }, [menuOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Logo: scroll to top if on home, otherwise navigate home
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Scroll to section — navigate home first if needed, passing scrollTo state
  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Header bar ─────────────────────────── */}
      <header>
        <nav
          className={[
            styles.navbar,
            scrolled  ? styles.scrolled : '',
            hidden    ? styles.hidden   : '',
          ].join(' ')}
          aria-label="Main navigation"
        >
          <a
            href="/"
            className={styles.logo}
            aria-label="AMDC Home"
            onClick={handleLogoClick}
          >
            <img
              src="/images/logo transpranet.png"
              alt="AMDC – Ashish Maan Design Company"
              className={styles.logoImg}
            />
          </a>

          {/* Desktop nav */}
          <div className={styles.desktopNav} role="navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              About
            </NavLink>
            <button
              className={styles.navLink}
              onClick={() => scrollToSection('services')}
              aria-label="View our services"
            >
              Services
            </button>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Projects
            </NavLink>
            <button
              className={`${styles.navLink} ${styles.cta}`}
              onClick={() => scrollToSection('contact')}
              aria-label="Contact us"
            >
              Enquire
            </button>
          </div>

          {/* Mobile Right Controls: Quick Enquire CTA + Hamburger */}
          <div className={styles.mobileRightControls}>
            <button
              className={styles.mobileBarCta}
              onClick={() => scrollToSection('contact')}
              aria-label="Enquire with AMDC"
            >
              Enquire
            </button>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      {/*
       * Mobile overlay — MUST stay outside <header>.
       * backdrop-filter on the scrolled navbar creates a CSS containing block
       * that traps position:fixed children. Sibling placement avoids this.
       */}
      <div
        id="mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.active : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.active : ''}`
          }
        >
          About
        </NavLink>
        <button
          className={styles.mobileLink}
          onClick={() => scrollToSection('services')}
          aria-label="View our services"
        >
          Services
        </button>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.active : ''}`
          }
        >
          Projects
        </NavLink>
        <button
          className={`${styles.mobileLink} ${styles.mobileCta}`}
          onClick={() => scrollToSection('contact')}
          aria-label="Contact us"
        >
          Enquire
        </button>
      </div>

      {/* ── Sticky Bottom Menu Bar (Mobile) ───────────── */}
      <nav
        className={`${styles.bottomMenu} ${menuOpen ? styles.bottomMenuHidden : ''}`}
        aria-label="Mobile sticky navigation"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.bottomItem} ${isActive ? styles.active : ''}`
          }
          aria-label="Home"
        >
          <Home className={styles.bottomIcon} size={20} />
          <span className={styles.bottomLabel}>Home</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.bottomItem} ${isActive ? styles.active : ''}`
          }
          aria-label="About"
        >
          <User className={styles.bottomIcon} size={20} />
          <span className={styles.bottomLabel}>About</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${styles.bottomItem} ${isActive ? styles.active : ''}`
          }
          aria-label="Projects"
        >
          <LayoutGrid className={styles.bottomIcon} size={20} />
          <span className={styles.bottomLabel}>Projects</span>
        </NavLink>

        <button
          type="button"
          className={styles.bottomItem}
          onClick={() => scrollToSection('services')}
          aria-label="Services"
        >
          <Layers className={styles.bottomIcon} size={20} />
          <span className={styles.bottomLabel}>Services</span>
        </button>

        <button
          type="button"
          className={`${styles.bottomItem} ${styles.bottomEnquire}`}
          onClick={() => scrollToSection('contact')}
          aria-label="Enquire"
        >
          <Phone className={styles.bottomIcon} size={20} />
          <span className={styles.bottomLabel}>Enquire</span>
        </button>
      </nav>
    </>
  );
}
