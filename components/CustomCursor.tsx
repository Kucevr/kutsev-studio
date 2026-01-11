import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const magneticPos = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const animate = () => {
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      // Apply magnetic pull if target exists
      if (magneticPos.current) {
        // Blend mouse position with magnetic center (30% pull)
        targetX = targetX + (magneticPos.current.x - targetX) * 0.35;
        targetY = targetY + (magneticPos.current.y - targetY) * 0.35;
      }

      // Smooth interpolation for outline
      currentPos.current.x += (targetX - currentPos.current.x) * 0.15;
      currentPos.current.y += (targetY - currentPos.current.y) * 0.15;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for magnetic elements
      const magneticTarget = target.closest('[data-magnetic="true"]');
      if (magneticTarget) {
        // Cache rect calculation to avoid forced reflow in animation loop
        requestAnimationFrame(() => {
          const rect = magneticTarget.getBoundingClientRect();
          magneticPos.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        });
      } else {
        magneticPos.current = null;
      }

      // Check for clickable elements
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
      
      // Check for contextual cursor data attribute
      const cursorTarget = target.closest('[data-cursor-text]');

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor-text');
        if (textRef.current && text) textRef.current.innerText = text;
        document.body.classList.add('cursor-text-mode');
      } else {
        document.body.classList.remove('cursor-text-mode');
      }

      if (isClickable || cursorTarget) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none z-100">
      <div 
        ref={dotRef} 
        className="cursor-dot w-2 h-2 rounded-full bg-white mix-blend-difference fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
      ></div>
      <div 
        ref={outlineRef} 
        className="cursor-outline w-10 h-10 rounded-full border border-white mix-blend-difference fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform"
      >
        <span ref={textRef} className="cursor-text text-[10px] font-bold tracking-widest text-white"></span>
      </div>
    </div>
  );
};
