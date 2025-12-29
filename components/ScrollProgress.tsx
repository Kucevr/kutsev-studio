import React, { useEffect, useRef } from 'react';

export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${scrollPercent})`;
      }
      
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-100 pointer-events-none mix-blend-difference">
      <div 
        ref={barRef} 
        className="h-full bg-brand-accent origin-left transform scale-x-0 transition-transform duration-100 ease-out"
      />
    </div>
  );
};
