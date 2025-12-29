import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), isMobile ? 50 : 100);
          observer.disconnect();
        }
      },
      { threshold: isMobile ? 0.05 : 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}> 
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block py-1 -my-1">
          <span
            className={`inline-block mr-[0.25em] transform transition-all duration-[800ms] md:duration-[1000ms] ease-[0.16,1,0.3,1] will-change-transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
            }`}
            style={{ transitionDelay: `${delay + i * (window.innerWidth < 768 ? 15 : 30)}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};