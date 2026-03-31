import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Loader from './components/ui/Loader';
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/sections/Footer'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  // Buttery smooth scrolling with Lenis
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isLoading]);

  return (
    <div className="noise-overlay">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <div className="aurora-divider" />
            <Suspense fallback={null}>
              <About />
              <div className="aurora-divider" />
              <Projects />
              <div className="aurora-divider" />
              <Skills />
              <div className="aurora-divider" />
              <Contact />
              <Footer />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
}
