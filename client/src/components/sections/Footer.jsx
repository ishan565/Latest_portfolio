import { socialLinks } from '../../data/constants';
import { FaLinkedinIn, FaGithub, FaHeart } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="aurora-divider absolute top-0 left-0 right-0" />

      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-sm text-slate-500">
            Designed & Built by{' '}
            <span className="gradient-text-animated font-semibold">Ishan Gupta</span>
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            Made with <FaHeart className="text-violet-500 text-[10px]" /> using React, Three.js & Framer Motion
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: FaLinkedinIn, href: socialLinks.linkedin, label: 'LinkedIn' },
            { icon: FaGithub, href: socialLinks.github, label: 'GitHub' },
            { icon: HiMail, href: `mailto:${socialLinks.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="text-slate-600 hover:text-violet-400 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon className="text-lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
