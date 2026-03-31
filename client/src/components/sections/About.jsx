import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutContent } from '../../data/constants';
import { HiExternalLink } from 'react-icons/hi';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value) || 0;

  useEffect(() => {
    if (!isInView || numericValue === 0) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {numericValue > 0 ? count + suffix : value}
    </span>
  );
}

function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const EduIcon = aboutContent.education.icon;

  return (
    <section id="about" ref={sectionRef} className="section-padding grid-bg relative overflow-hidden">
      {/* Background orbs */}
      <div className="glow-orb glow-orb-1 top-[20%] right-[-10%]" />
      <div className="glow-orb glow-orb-3 bottom-[10%] left-[-5%]" />
      <div className="section-number">01</div>

      <div className="w-full max-w-[100rem] mx-auto relative">
        {/* Section heading */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-16">
          <p className="text-sm font-mono text-violet-400 tracking-wider mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            01 . WHO I AM
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Profile image with tilt */}
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={1} className="lg:col-span-2 flex flex-col items-center lg:items-start gap-8">
            <TiltCard>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-amber-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-80 h-[22rem] md:w-[22rem] md:h-[28rem] rounded-2xl overflow-hidden border border-white/10 group-hover:border-violet-500/40 transition-all duration-500">
                  <img
                    src="/profile.jpg"
                    alt="Ishan Gupta"
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050010]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Decorative corners */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-violet-500/30 rounded-xl -z-10" />
                <div className="absolute -top-3 -left-3 w-16 h-16 border border-cyan-500/30 rounded-xl -z-10" />
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-violet-500 rounded-full animate-pulse z-10" />
              </div>
            </TiltCard>

            {/* Education card */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={3} className="w-full max-w-sm glass rounded-xl p-5 border border-white/5 hover:border-violet-500/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <EduIcon className="text-xl text-violet-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{aboutContent.education.degree}</h4>
                  <p className="text-violet-400 text-sm">{aboutContent.education.institution}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{aboutContent.education.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={4} className="w-full max-w-sm space-y-3">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Certifications</h4>
              {aboutContent.certifications.map((cert, i) => {
                const CertIcon = cert.icon;
                return (
                  <a
                    key={i}
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass rounded-lg px-4 py-3 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group"
                  >
                    <CertIcon className="text-lg text-cyan-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{cert.title}</p>
                      <p className="text-slate-500 text-xs">{cert.issuer}</p>
                    </div>
                    <HiExternalLink className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right column — Bio + Stats + CP + Coursework */}
          <div className="lg:col-span-3 space-y-6">
            {aboutContent.bio.map((paragraph, i) => (
              <motion.p key={i} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={i + 2} className="text-slate-400 text-base md:text-lg leading-relaxed">
                {paragraph}
              </motion.p>
            ))}

            {/* Stats with animated counters */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={5} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {aboutContent.stats.map((stat, i) => (
                <div key={i} className="stat-card glass rounded-xl p-5 text-center hover:border-violet-500/30 transition-all duration-500 group hover:-translate-y-1">
                  <div className="relative z-10 text-2xl md:text-3xl font-display font-bold gradient-text mb-1 group-hover:scale-110 transition-transform duration-500">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.value.includes('+') ? '+' : ''}
                    />
                  </div>
                  <div className="relative z-10 text-xs md:text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Coding Profiles */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={6} className="pt-6">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Coding Profiles</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {aboutContent.codingProfiles.map((profile, i) => {
                  const Icon = profile.icon;
                  return (
                    <motion.a
                      key={profile.platform}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                      className="glass rounded-xl px-4 py-4 border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg flex items-center gap-3"
                      style={{ '--profile-color': profile.color }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${profile.color}15` }}
                      >
                        <Icon className="text-xl transition-colors duration-300" style={{ color: profile.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{profile.stat}</span>
                        </div>
                        <p className="text-slate-500 text-xs truncate">{profile.platform} · {profile.detail}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Coursework */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={7} className="pt-6">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {aboutContent.coursework.map((course, i) => (
                  <motion.span
                    key={course}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.06, duration: 0.4 }}
                    className="px-3 py-1.5 glass rounded-lg text-xs text-slate-400 border border-white/5 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-300 cursor-default"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
