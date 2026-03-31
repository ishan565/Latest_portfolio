import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/constants';
import { HiExternalLink, HiCode, HiX, HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ==================== PROJECT MODAL ==================== */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl shadow-2xl shadow-violet-500/10"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-violet-500/20 hover:border-violet-500/40 transition-all duration-300 group"
        >
          <HiX className="text-xl text-slate-400 group-hover:text-white transition-colors" />
        </button>

        {/* Hero Image */}
        <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent" />

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-16">
            <div className="flex items-center gap-3 mb-2">
              {project.featured && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <FaStar className="text-[8px]" /> Featured
                </span>
              )}
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Short description */}
          <p className="text-lg text-violet-300 font-medium leading-relaxed">
            {project.description}
          </p>

          {/* Long description */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono text-slate-500 tracking-wider uppercase">About this project</h4>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              {project.longDescription}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && (
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-slate-500 tracking-wider uppercase">Key Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                    <span className="text-sm text-slate-300">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono text-slate-500 tracking-wider uppercase">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300"
              >
                <HiCode className="text-lg text-violet-400" />
                <span className="text-sm font-medium text-white">View Source Code</span>
                <HiArrowRight className="text-sm text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300"
              >
                <HiExternalLink className="text-lg text-white" />
                <span className="text-sm font-medium text-white">Live Demo</span>
                <HiArrowRight className="text-sm text-white/60 group-hover:translate-x-1 transition-all" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ==================== PROJECT CARD ==================== */
function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = '';
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index % 4}
      className="shrink-0 w-[340px] md:w-[400px] lg:w-[420px] snap-center"
    >
      <div
        ref={cardRef}
        className="project-card group cursor-pointer h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(project)}
        style={{ transition: 'transform 0.3s ease-out, border-color 0.5s, box-shadow 0.5s' }}
      >
        {/* Image */}
        <div className="relative h-52 md:h-60 overflow-hidden bg-[#0a0a1a]">
          <img
            src={project.image}
            alt={project.title}
            className="project-image w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050010] via-[#050010]/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium flex items-center gap-2">
              View Details <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300 backdrop-blur-sm z-10">
              <FaStar className="text-[8px]" /> Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-6 z-10">
          <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 text-slate-500 border border-white/5">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== PROJECTS SECTION ==================== */
export default function Projects() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 440, behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="glow-orb glow-orb-2 top-[30%] left-[-10%]" />
      <div className="glow-orb glow-orb-1 bottom-[20%] right-[-5%]" />
      <div className="section-number">02</div>

      <div className="w-full max-w-[100rem] mx-auto relative">
        {/* Header + nav arrows */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <p className="text-sm font-mono text-violet-400 tracking-wider mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
              02 . MY WORK
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              The Developer's <span className="gradient-text">Canvas</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-base md:text-lg">
              Click any project to explore the full story.
            </p>
          </motion.div>

          {/* Scroll arrows */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs text-slate-500 font-mono mr-2 hidden md:block">scroll →</span>
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-violet-500/20 hover:border-violet-500/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            >
              <HiChevronLeft className="text-lg text-white" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-violet-500/20 hover:border-violet-500/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            >
              <HiChevronRight className="text-lg text-white" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal carousel */}
        <div className="relative">
          {/* Left fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050010] to-transparent z-10 pointer-events-none" />
          )}
          {/* Right fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050010] to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* Project counter */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="flex gap-1.5">
            {projects.map((_, i) => (
              <div key={i} className="w-8 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                />
              </div>
            ))}
          </div>
          <span className="text-xs font-mono text-slate-500">
            {projects.length} Projects
          </span>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
