import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { heroContent } from '../../data/constants';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import HeroScene from '../canvas/HeroScene';
import HeroShowcase from '../canvas/HeroShowcase';

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2200) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(isDeleting ? currentWord.substring(0, text.length - 1) : currentWord.substring(0, text.length + 1)),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

function useMouseParallax(strength = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * strength;
      const y = (e.clientY - window.innerHeight / 2) * strength;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [strength]);

  return offset;
}

export default function Hero() {
  const typedText = useTypewriter(heroContent.taglines);
  const parallax = useMouseParallax(0.015);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="canvas-container">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050010]/95 via-[#050010]/70 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050010] via-transparent to-transparent" />

      {/* Floating glow orbs */}
      <div className="glow-orb glow-orb-1 top-[10%] left-[5%] z-[1]" />
      <div className="glow-orb glow-orb-2 bottom-[20%] right-[10%] z-[1]" />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm md:text-base font-mono text-violet-400 mb-4 tracking-wider flex items-center gap-3"
          >
            <span className="w-12 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            {heroContent.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-6"
          >
            <span className="gradient-text-animated">{heroContent.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-8 md:h-10 mb-6"
          >
            <span className="text-lg md:text-2xl font-display text-slate-300">
              {typedText}
              <span className="inline-block w-[3px] h-6 md:h-7 bg-violet-500 ml-1 animate-pulse" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-base md:text-lg text-slate-400 max-w-lg mb-10 leading-relaxed"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={heroContent.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 hover:-translate-y-1 hover:scale-105"
            >
              <HiDownload className="text-lg group-hover:animate-bounce" />
              Download Resume
            </a>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 rounded-full text-sm font-semibold border border-white/10 text-slate-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1"
            >
              Let's Talk
            </button>
          </motion.div>
        </div>

          {/* Right column — 3D Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block h-[500px] xl:h-[600px] relative"
          >
            <div className="absolute inset-0 rounded-full bg-violet-500/5 blur-3xl" />
            <HeroShowcase />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 hover:text-violet-400 transition-colors"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <HiArrowDown className="text-lg" />
        </motion.div>
      </motion.button>
    </section>
  );
}
