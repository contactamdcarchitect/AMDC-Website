import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import type { Project } from '@/types/project';
import styles from './ProjectModal.module.scss';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);

  // Close on Escape; if zoomed, zoom out first
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (swiperRef.current?.zoom && swiperRef.current.zoom.scale > 1) {
          swiperRef.current.zoom.out();
          setIsZoomed(false);
          setZoomScale(1);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Close on backdrop click (prevent closing while zoomed and panning)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !isZoomed) onClose();
    },
    [onClose, isZoomed]
  );

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperRef.current?.zoom) {
      swiperRef.current.zoom.in();
    }
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperRef.current?.zoom) {
      swiperRef.current.zoom.out();
    }
  };

  const handleZoomReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperRef.current?.zoom) {
      swiperRef.current.zoom.out();
      setIsZoomed(false);
      setZoomScale(1);
    }
  };

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
            {/* Zoom Controls */}
            <div className={styles.zoomGroup} aria-label="Image zoom controls">
              <button
                type="button"
                className={styles.zoomBtn}
                onClick={handleZoomOut}
                aria-label="Zoom out image"
                title="Zoom out"
                disabled={zoomScale <= 1.05}
              >
                <ZoomOut size={16} />
              </button>

              <span className={styles.zoomPercentage} aria-live="polite">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                type="button"
                className={styles.zoomBtn}
                onClick={handleZoomIn}
                aria-label="Zoom in image"
                title="Zoom in"
                disabled={zoomScale >= 4}
              >
                <ZoomIn size={16} />
              </button>

              {isZoomed && (
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleZoomReset}
                  aria-label="Reset zoom to 100%"
                  title="Reset zoom"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>

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

        {/* Swiper */}
        <div className={styles.swiperWrap}>
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Zoom]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            zoom={{
              maxRatio: 4,
              minRatio: 1,
              toggle: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setIsZoomed(false);
              setZoomScale(1);
              if (swiper.zoom) {
                swiper.zoom.out();
              }
            }}
            onZoomChange={(_swiper, scale) => {
              setZoomScale(scale);
              setIsZoomed(scale > 1.05);
            }}
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: '100%', height: '100%' }}
          >
            {project.images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className={`swiper-zoom-container ${styles.slide}`}>
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
