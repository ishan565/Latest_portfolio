import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../../data/constants';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 25, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function SkillCategory({ category, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleMouseMove = useCallback((e) => {
    const badge = e.currentTarget;
    const rect = badge.getBoundingClientRect();
    badge.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    badge.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={ref}>
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-3"
      >
        <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
        {category.title}
      </motion.h3>

      <motion.div variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-wrap gap-3">
        {category.skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              variants={item}
              className="skill-badge group"
              onMouseMove={handleMouseMove}
            >
              <Icon className="text-xl transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg" style={{ color: skill.color }} />
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium relative z-10">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef} className="section-padding grid-bg relative overflow-hidden">
      <div className="glow-orb glow-orb-1 top-[10%] right-[-5%]" />
      <div className="glow-orb glow-orb-2 bottom-[5%] left-[-10%]" />
      <div className="glow-orb glow-orb-3 top-[50%] left-[30%]" />
      <div className="section-number">03</div>

      <div className="w-full max-w-[100rem] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-violet-400 tracking-wider mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            03 . EXPERTISE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-base md:text-lg">
            The tools and technologies I use to bring ideas to life, from frontend frameworks to machine learning libraries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {skillCategories.map((category, i) => (
            <SkillCategory key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
