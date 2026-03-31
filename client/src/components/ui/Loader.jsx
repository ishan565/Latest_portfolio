import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 2600;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-screen"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Floating orbs in background */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)' }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)', right: '30%', top: '20%' }}
        animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="loader-counter">{count}</div>

        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${count}%` }} />
        </div>

        <motion.p
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {count < 25 && 'Initializing...'}
          {count >= 25 && count < 50 && 'Loading 3D assets...'}
          {count >= 50 && count < 75 && 'Preparing shaders...'}
          {count >= 75 && count < 95 && 'Building experience...'}
          {count >= 95 && 'Ready.'}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
