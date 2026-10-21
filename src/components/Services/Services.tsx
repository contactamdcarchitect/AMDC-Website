import { useRef, useEffect, useState } from 'react';
import styles from './Services.module.scss';

interface Service {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const BASE_IMG = '/images/amdcprojects/final website project images';

const SERVICES: Service[] = [
  {
    id: 1,
    image: `${BASE_IMG}/Residential/tarun/TARUN LIVING view  (1).jpg`,
    title: 'Residential Design',
    subtitle: 'Luxury Living Spaces',
    description:
      'From sprawling villas to intimate apartments, we craft residences that mirror your personality—balancing opulence with comfort in every detail.',
    tags: ['Villas', 'Apartments', 'Penthouses'],
  },
  {
    id: 2,
    image: `${BASE_IMG}/Commercial/honda office/honda meeting room 1 (1).jpg`,
    title: 'Commercial Design',
    subtitle: 'Inspiring Workplaces',
    description:
      'We design offices, showrooms, and retail spaces that elevate brand identity and boost productivity through purposeful, premium aesthetics.',
    tags: ['Offices', 'Showrooms', 'Retail'],
  },
  {
    id: 3,
    image: `${BASE_IMG}/Hospitality/radisson/Radisson view 1 (1).jpg`,
    title: 'Hospitality Design',
    subtitle: 'Memorable Experiences',
    description:
      'From boutique hotels to fine-dining restaurants, our hospitality interiors create lasting impressions and unforgettable guest experiences.',
    tags: ['Hotels', 'Restaurants', 'Spas'],
  },
  {
    id: 4,
    image: `${BASE_IMG}/cultural&institutional/Auditorium honda/Honda AuditoriumVIEW  1.jpg`,
    title: 'Cultural & Institutional',
    subtitle: 'Purpose-Built Spaces',
    description:
      'From auditoriums and museums to meditation centres and community halls, we design institutional spaces that inspire, educate, and bring people together.',
    tags: ['Auditoriums', 'Museums', 'Institutions'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      {/* Background accent */}
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Our Services</p>
          <h2 className={styles.sectionTitle} id="services-title">
            What We Do
          </h2>
          <p className={styles.subtitle}>
            A comprehensive suite of interior design disciplines—each delivered
            with the same obsessive attention to detail and creative excellence.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid} role="list">
          {SERVICES.map((service, idx) => (
            <article
              key={service.id}
              className={styles.card}
              role="listitem"
              style={{ '--delay': `${idx * 100}ms` } as React.CSSProperties}
              aria-label={service.title}
            >
              <div className={styles.cardInner}>
                {/* Image */}
                <div className={styles.imageWrap} aria-hidden="true">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay} />
                </div>

                {/* Content overlay */}
                <div className={styles.cardContent}>
                  <p className={styles.cardEyebrow}>{service.subtitle}</p>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>

                  <div className={styles.tags} aria-label="Service categories">
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardAccent} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Not sure which service fits your project?
          </p>
          <button
            className={styles.ctaBtn}
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            aria-label="Get a free consultation"
            id="services-cta-btn"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
