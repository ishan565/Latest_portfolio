import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/constants';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 200) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass shadow-lg shadow-black/20' : 'py-5 bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-display font-bold gradient-text-animated tracking-tight hover:scale-110 transition-transform duration-300"
        >
          IG
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              onClick={() => scrollTo(link.id)}
              className={`nav-link text-sm font-medium transition-colors ${
                activeSection === link.id ? 'text-white active' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-violet-500 font-mono text-xs mr-1">0{i + 1}.</span>
              {link.title}
            </motion.button>
          ))}

          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            href="/Ishan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-2xl text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-violet-500 font-mono text-xs">0{i + 1}.</span>
                  {link.title}
                </button>
              ))}
              <a
                href="/Ishan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-5 py-3 rounded-full text-center text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
