import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './AboutPreview.module.scss';

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className={styles.section} ref={sectionRef} aria-labelledby="about-preview-title">
      <div className={styles.inner}>
        {/* Image */}
        <div className={styles.imageWrap}>
          <img
            src="/images/amdcprojects/final website project images/Residential/tarun/TARUN LIVING view  (1).jpg"
            alt="AMDC design studio workspace"
            loading="lazy"
          />
          <div className={styles.badge} aria-label="15 years of excellence">
            <span className={styles.number}>12+</span>
            <span className={styles.label}>Years of<br />Excellence</span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.eyebrow}>About AMDC</p>
          <h2 className={styles.title} id="about-preview-title">
            Crafting <em>Timeless</em><br />Interiors
          </h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.body}>
            AMDC Ashish Maan Design Company is a premier studio dedicated to creating extraordinary 
            living and commercial spaces. We believe that great design has the power to 
            transform how people experience their world—elevating mood, inspiring creativity, 
            and nurturing wellbeing.
          </p>
          <p className={styles.body}>
            Every project is a unique dialogue between our vision and your story. 
            We combine timeless principles of design with contemporary sensibilities 
            to deliver spaces that endure beautifully through time.
          </p>

          {/* Stats */}
          <div className={styles.stats} aria-label="Studio statistics">
            <div className={styles.stat}>
              <span className={styles.statNum}>17+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>12+</span>
              <span className={styles.statLabel}>Years</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>98%</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
          </div>

          <Link to="/about" className={styles.btn} aria-label="Read more about AMDC">
            Our Story
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
