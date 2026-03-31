import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { socialLinks } from '../../data/constants';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { HiMail, HiPaperAirplane } from 'react-icons/hi';
import emailjs from '@emailjs/browser';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const socials = [
  { icon: FaLinkedinIn, href: socialLinks.linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaGithub, href: socialLinks.github, label: 'GitHub', color: '#ffffff' },
  { icon: HiMail, href: `mailto:${socialLinks.email}`, label: 'Email', color: '#7c3aed' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        { from_name: form.name, from_email: form.email, message: form.message, to_name: 'Ishan' },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).catch(() => {});

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="glow-orb glow-orb-1 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb glow-orb-3 bottom-[10%] right-[10%]" />
      <div className="section-number">04</div>

      <div className="w-full max-w-[100rem] mx-auto relative">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-16">
          <p className="text-sm font-mono text-violet-400 tracking-wider mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            04 . GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-base md:text-lg">
            Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — socials */}
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={1} className="space-y-8">
            <div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Reach out directly</h3>
              <p className="text-slate-400">
                Have a freelance project, full-time opportunity, or just want to build something cool together? My inbox is always open.
              </p>
            </div>

            <a
              href={`mailto:${socialLinks.email}`}
              className="inline-block text-lg md:text-xl font-display gradient-text-animated border-b border-violet-500/30 hover:border-cyan-500 pb-1 transition-colors"
            >
              {socialLinks.email}
            </a>

            <div className="flex gap-4 pt-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>

            {/* Decorative lines */}
            <div className="hidden lg:block pt-8">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full"
                    style={{ background: `linear-gradient(90deg, #7c3aed, #06b6d4)`, width: `${60 - i * 10}px` }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label htmlFor={field.id} className={`block text-sm font-medium mb-2 transition-colors duration-300 ${focusedField === field.id ? 'text-violet-400' : 'text-slate-400'}`}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={form[field.id]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  required
                  autoComplete={field.autoComplete}
                  className="form-input"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${focusedField === 'message' ? 'text-violet-400' : 'text-slate-400'}`}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 hover:-translate-y-1 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' && (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              )}
              {status === 'sent' && '✓ Message Sent!'}
              {status === 'error' && 'Failed. Try Again'}
              {status === 'idle' && (
                <>
                  Send Message
                  <HiPaperAirplane className="text-lg group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
