
import React, { useRef, useCallback } from 'react';
import { triggerHaptic } from '../utils/haptics';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0 to 1 (higher is stronger pull)
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePointerDown = useCallback(() => {
    triggerHaptic(5); 
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      ref.current.style.transform = `translate(${middleX * strength}px, ${middleY * strength}px)`;
    });
  }, [strength, isMobile]);

  const reset = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  }, []);

  if (isMobile) {
    return (
      <div className={className} onPointerDown={handlePointerDown}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onPointerDown={handlePointerDown}
      data-magnetic="true"
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
