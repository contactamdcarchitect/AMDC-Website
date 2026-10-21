import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer/Footer';
import styles from './About.module.scss';

const whyCards = [
  {
    icon: '✦',
    title: 'Bespoke Approach',
    desc: 'Every project is uniquely tailored to your lifestyle, preferences, and aspirations—never a template, always a masterpiece.',
  },
  {
    icon: '◆',
    title: 'End-to-End Service',
    desc: 'From concept to completion, we manage every detail so you experience a seamless, stress-free transformation.',
  },
  {
    icon: '●',
    title: 'Artisan Craftsmanship',
    desc: 'We partner with India\'s finest craftsmen and global luxury suppliers to source materials of exceptional quality.',
  },
  {
    icon: '▲',
    title: 'On-Time Delivery',
    desc: 'Our rigorous project management systems ensure your space is delivered on time and within agreed budgets.',
  },
  {
    icon: '◇',
    title: 'Sustainable Design',
    desc: 'We prioritise eco-conscious materials and energy-efficient design solutions without compromising on beauty.',
  },
  {
    icon: '★',
    title: '12+ Years Expertise',
    desc: 'Over a decade of crafting extraordinary spaces across India gives us unmatched depth of experience.',
  },
];

const principles = [
  {
    title: 'Less, but Better',
    desc: 'We believe in purposeful reduction—every element must earn its place in the composition.',
  },
  {
    title: 'Materials as Poetry',
    desc: 'Natural materials speak a timeless language. We let their inherent beauty lead the design.',
  },
  {
    title: 'Light as Architecture',
    desc: 'We choreograph natural and artificial light to sculpt space and evoke emotion throughout the day.',
  },
  {
    title: 'Function Elevated',
    desc: 'Beauty must serve life. We obsess over ergonomics, flow, and the lived experience of every space.',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About AMDC | Our Story & Design Philosophy</title>
        <meta
          name="description"
          content="Learn about AMDC Ashish Maan Design Company—our journey since 2014, design philosophy, mission, and why leading clients trust us to transform their spaces."
        />
        <meta property="og:title" content="About AMDC | Our Story & Design Philosophy" />
        <link rel="canonical" href="https://amdc.in/about" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="about-hero-title">
          <div className={styles.bg} aria-hidden="true">
            <img
              src="/images/amdcprojects/final website project images/Residential/terrace design sec 57 ggn/Residence terrace view 1 (4).jpg"
              alt="AMDC studio interior"
            />
          </div>
          <div className={styles.overlay} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Our Story</p>
            <h1 id="about-hero-title">
              Passion for <em>Beauty</em>
            </h1>
          </div>
        </section>

        {/* Company Story */}
        <section
          className={styles.section}
          aria-labelledby="story-title"
          style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)' }}
        >
          <div className={styles.story}>
            <div>
              <p className={styles.eyebrow}>Since 2014</p>
              <h2 className={styles.sectionTitle} id="story-title">
                Born from a <em>Belief</em><br />in Great Design
              </h2>
              <div className={styles.divider} aria-hidden="true" />
              <p className={styles.body}>
                AMDC Ashish Maan Design Company was founded in 2014 with a singular conviction:
                that every person deserves to live and work in a beautifully designed space.
                What began as a boutique studio has grown into one of India's
                most respected interior design firms.
              </p>
              <br />
              <p className={styles.body}>
                Over 12 years, we have had the privilege of transforming private residences,
                corporate headquarters, boutique hotels, and flagship retail environments.
                Each project has refined our craft and deepened our understanding of how
                design profoundly shapes human experience.
              </p>
              <br />
              <p className={styles.body}>
                Today, our team of architects, designers, and project managers brings together
                decades of collective expertise—united by an uncompromising commitment to
                quality, originality, and client satisfaction.
              </p>
            </div>
            <div className={styles.storyImage}>
              <img
                src="/images/amdcprojects/final website project images/Residential/Raghav ggn/Raghav drawing room (4).jpg"
                alt="AMDC design team at work"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <div className={styles.altBg}>
          <section
            aria-labelledby="founder-title"
            style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1400px', margin: '0 auto' }}
          >
            <p className={styles.eyebrow} style={{ textAlign: 'center' }}>The Visionary Behind AMDC</p>
            <h2
              className={styles.sectionTitle}
              id="founder-title"
              style={{ textAlign: 'center', margin: '0 auto 3.5rem', maxWidth: '40ch' }}
            >
              Meet Our <em>Founder</em>
            </h2>

            <div className={styles.founderLayout}>
              <div className={styles.founderImageWrap}>
                <img
                  src="/images/founder.jpg"
                  alt="Ashish Maan — Founder & Principal Designer, AMDC"
                  loading="lazy"
                  className={styles.founderPhoto}
                />
                <div className={styles.founderBadge}>
                  <span className={styles.badgeYear}>Est. 2014</span>
                  <span className={styles.badgeLabel}>12+ Years of Excellence</span>
                </div>
              </div>

              <div className={styles.founderContent}>
                <p className={styles.founderName}>Ashish Maan</p>
                <p className={styles.founderRole}>Founder &amp; Principal Designer</p>
                <div className={styles.divider} aria-hidden="true" />

                <p className={styles.body}>
                  Ashish Maan is the creative force and strategic mind behind AMDC. With a
                  distinguished career spanning over 15 years in luxury interior design,
                  Ashish has built a reputation for crafting spaces that are simultaneously
                  breathtaking and deeply livable.
                </p>
                <br />
                <p className={styles.body}>
                  Trained at one of India's premier design institutions, Ashish developed
                  his signature philosophy early on: that great design must be rooted in
                  the story of the person who inhabits the space. This belief has guided
                  every project AMDC has delivered—from intimate residences to landmark
                  commercial developments across Gurugram and beyond.
                </p>
                <br />
                <p className={styles.body}>
                  Under his leadership, AMDC has grown into a multidisciplinary studio
                  known for its seamless blend of heritage craftsmanship and contemporary
                  sensibility. Ashish continues to personally oversee each project, ensuring
                  that the AMDC standard of excellence is never compromised.
                </p>

                <div className={styles.founderStats}>
                  <div className={styles.founderStat}>
                    <span className={styles.statNum}>100+</span>
                    <span className={styles.statLabel}>Projects Delivered</span>
                  </div>
                  <div className={styles.founderStat}>
                    <span className={styles.statNum}>12+</span>
                    <span className={styles.statLabel}>Years of Expertise</span>
                  </div>
                  <div className={styles.founderStat}>
                    <span className={styles.statNum}>12+</span>
                    <span className={styles.statLabel}>Cities Served</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Design Philosophy */}
        <section
          aria-labelledby="philosophy-title"
          style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1400px', margin: '0 auto' }}
        >
          <div className={styles.philosophy}>
            <div>
              <p className={styles.eyebrow}>How We Think</p>
              <h2 className={styles.sectionTitle} id="philosophy-title">
                Our Design <em>Philosophy</em>
              </h2>
              <div className={styles.divider} aria-hidden="true" />
              <p className={styles.body}>
                Great interior design is not about filling rooms with expensive furniture.
                It is about understanding people—their rhythms, their stories, their dreams—and
                translating that understanding into spaces that feel inevitable.
              </p>

              <div className={styles.principles} aria-label="Design principles">
                {principles.map((p, i) => (
                  <div className={styles.principle} key={i}>
                    <span className={styles.num} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.prinContent}>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.philosophyImage}>
              <img
                src="/images/amdcprojects/final website project images/Commercial/honda plant walkway/Outdoor walkway 2 ps 1 (4).jpg"
                alt="Design philosophy in practice"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us — full-bleed dark section */}
        <div className={styles.whySection}>
          <div className={styles.whySectionInner}>
            <div className={styles.whyHeader}>
              <p className={styles.whyEyebrow}>Why AMDC</p>
              <h2 className={styles.whyTitle} id="why-title">
                What Sets Us <em>Apart</em>
              </h2>
              <p className={styles.whySubtitle}>
                Over a decade of designing spaces that matter — here's what makes every AMDC project exceptional.
              </p>
            </div>

            <div className={styles.whyGrid}>
              {whyCards.map((card, i) => (
                <div className={styles.whyCard} key={i}>
                  <span className={styles.whyNum}>0{i + 1}</span>
                  <div className={styles.whyCardInner}>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h2>
            Ready to Create<br />Something <em>Extraordinary</em>?
          </h2>
          <p>
            Let's start with a conversation about your vision.
            Our team is ready to listen, inspire, and deliver.
          </p>
          <Link to="/#contact" className={styles.ctaBtn} aria-label="Enquire about our services">
            Start Your Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
