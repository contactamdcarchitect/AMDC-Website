import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 28 + 18;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          setTimeout(onComplete, 300);
        }, 150);
      }
      setPercent(Math.floor(current));
    }, 45);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : ''}`} role="status" aria-label="Loading">
      <div className={styles.logo}>
        <img
          src="/images/logo transpranet.png"
          alt="AMDC"
          className={styles.logoImg}
        />
      </div>
      <div className={styles.bar} aria-hidden="true" />
      <span className={styles.percent}>{percent}%</span>
    </div>
  );
}
