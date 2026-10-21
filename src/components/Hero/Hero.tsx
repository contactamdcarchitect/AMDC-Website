import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Hero.module.scss';

// Compressed WebP hero images for ultra-fast loading
const HERO_IMAGES = [
  '/images/amdc hero images/optimised/A7R02100-HDR.webp',
  '/images/amdc hero images/optimised/DSC07991.webp',
  '/images/amdc hero images/optimised/Residence Langaleswar (1).webp',
  '/images/amdc hero images/optimised/Gupta Residence.webp',
  '/images/amdc hero images/optimised/Container exterior (1).webp',
  '/images/amdc hero images/optimised/Meditation centre view 1 (9).webp',
  '/images/amdc hero images/optimised/Netaji museum1 (3).webp',
  '/images/amdc hero images/optimised/Netaji museum1 (7).webp',
  '/images/amdc hero images/optimised/Outdoor.webp',
  '/images/amdc hero images/optimised/PS 3.webp',
  '/images/amdc hero images/optimised/ELEVATION 10 (2).webp',
];

const INTERVAL_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload next image in background to eliminate transition lag
  useEffect(() => {
    const nextIdx = (current + 1) % HERO_IMAGES.length;
    const img = new Image();
    img.src = HERO_IMAGES[nextIdx];
  }, [current]);

  // Entrance animation for buttons
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setIsTransitioning(false);
    }, 900);
  }, [current, isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_IMAGES.length);
  }, [current, goTo]);

  const goBack = useCallback(() => {
    goTo((current - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL_MS);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const handlePrev = () => { goBack(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot  = (i: number) => { if (i !== current) { goTo(i); resetTimer(); } };

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Slider background */}
      <div className={styles.slider} aria-hidden="true">
        {prev !== null && (
          <div key={`prev-${prev}`} className={`${styles.slide} ${styles.slideOut}`}>
            <img src={HERO_IMAGES[prev]} alt="" className={styles.slideImg} loading="lazy" />
          </div>
        )}
        <div key={`curr-${current}`} className={`${styles.slide} ${styles.slideIn}`}>
          <img
            src={HERO_IMAGES[current]}
            srcSet={
              current === 0
                ? '/images/amdc hero images/optimised/A7R02100-HDR-m.webp 768w, /images/amdc hero images/optimised/A7R02100-HDR.webp 1600w'
                : undefined
            }
            sizes="100vw"
            alt={`Hero image ${current + 1}`}
            className={styles.slideImg}
            fetchPriority={current === 0 ? 'high' : 'auto'}
            loading={current === 0 ? 'eager' : 'lazy'}
            decoding={current === 0 ? 'sync' : 'async'}
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* CTA Buttons + headline */}
      <div className={styles.content}>
        <p className={`${styles.eyebrow} ${animate ? styles.animate : ''}`}>
          Interior Design Studio · Gurgaon
        </p>
        <h1 className={`${styles.title} ${animate ? styles.animate : ''}`}>
          Where Space<br />Becomes <em>Art</em>
        </h1>
        <div className={`${styles.actions} ${animate ? styles.animate : ''}`}>
          <button
            className={styles.btnPrimary}
            onClick={scrollToProjects}
            aria-label="View our projects"
          >
            View Projects
          </button>
          <button
            className={styles.btnSecondary}
            onClick={scrollToContact}
            aria-label="Start a project with us"
          >
            Start a Project
          </button>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={handlePrev}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={handleNext}
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className={`${styles.dots} ${animate ? styles.animate : ''}`} role="tablist" aria-label="Slide indicators">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => handleDot(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scroll} ${animate ? styles.animate : ''}`} aria-hidden="true">
        <span>Scroll</span>
      </div>
    </section>
  );
}
