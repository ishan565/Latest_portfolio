import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Create trail dots
    const trailCount = 5;
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      dot.style.width = `${6 - i}px`;
      dot.style.height = `${6 - i}px`;
      dot.style.opacity = `${0.4 - i * 0.07}`;
      document.body.appendChild(dot);
      trails.push({ el: dot, x: 0, y: 0 });
    }
    trailsRef.current = trails;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      trails.forEach((t) => t.el.classList.add('visible'));
    };

    const onMouseEnterInteractive = () => cursor.classList.add('hover');
    const onMouseLeaveInteractive = () => cursor.classList.remove('hover');

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = `${cursorX - 12}px`;
      cursor.style.top = `${cursorY - 12}px`;

      // Trail animation with increasing lag
      let prevX = cursorX;
      let prevY = cursorY;
      trails.forEach((trail, i) => {
        const speed = 0.08 - i * 0.012;
        trail.x += (prevX - trail.x) * speed;
        trail.y += (prevY - trail.y) * speed;
        trail.el.style.left = `${trail.x - 3}px`;
        trail.el.style.top = `${trail.y - 3}px`;
        prevX = trail.x;
        prevY = trail.y;
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      trails.forEach((t) => t.el.remove());
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
