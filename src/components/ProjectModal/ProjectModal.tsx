import { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { Project } from '@/types/project';
import styles from './ProjectModal.module.scss';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project gallery`}
      onClick={handleBackdropClick}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.meta}>
            <p className={styles.category}>
              {project.category}
            </p>
            <h2 className={styles.title}>
              {project.title}
            </h2>
          </div>

          <div className={styles.controls}>
            <span className={styles.counter} aria-live="polite">
              {activeIndex + 1} / {project.images.length}
            </span>

            <button
              className={styles.close}
              onClick={onClose}
              aria-label="Close gallery"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Swiper Gallery */}
        <div className={styles.swiperWrap}>
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: '100%', height: '100%' }}
          >
            {project.images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className={styles.slide}>
                  <img
                    src={src}
                    alt={`${project.title} — image ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={styles.slideImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
        </div>
      </div>
    </div>
  );
}
