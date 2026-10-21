import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar/Navbar';
import Loader from '@/components/Loader/Loader';
import Home from '@/pages/Home/Home';
import { useLenis } from '@/hooks/useLenis';
import '@/styles/global.scss';

// Lazy-load secondary pages — reduces initial JS bundle
const About    = lazy(() => import('@/pages/About/About'));
const Projects = lazy(() => import('@/pages/Projects/Projects'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function AppInner() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppInner />
        {!loaded && <Loader onComplete={handleLoaderComplete} />}
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
