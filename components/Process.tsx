import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export const Process: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentX = useRef(0);
  const targetX = useRef(0);
  const rafId = useRef<number | null>(null);

  const steps = [
    { step: "01", title: t('process.steps.analysis.title'), desc: t('process.steps.analysis.desc') },
    { step: "02", title: t('process.steps.strategy.title'), desc: t('process.steps.strategy.desc') },
    { step: "03", title: t('process.steps.design.title'), desc: t('process.steps.design.desc') },
    { step: "04", title: t('process.steps.dev.title'), desc: t('process.steps.dev.desc') },
    { step: "05", title: t('process.steps.launch.title'), desc: t('process.steps.launch.desc') }
  ];

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let isVisible = false;
    let isAnimating = false;

    const animate = () => {
      if (!isVisible) {
        isAnimating = false;
        return;
      }
      
      // Плавная интерполяция к целевой позиции
      const diff = Math.abs(currentX.current - targetX.current);
      
      if (diff > 0.5) {
        currentX.current = lerp(currentX.current, targetX.current, 0.1);
        
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-currentX.current}px, 0, 0)`;
        }
      }
      
      rafId.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isAnimating && isVisible) {
        isAnimating = true;
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const calculateTarget = () => {
      if (!sectionRef.current || !trackRef.current) return;
      
      const section = sectionRef.current;
      const track = trackRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      
      const scrollDistance = Math.max(0, trackWidth - windowWidth + 48);
      const sectionHeight = section.offsetHeight;
      const scrollableHeight = sectionHeight - viewportHeight;
      
      if (scrollableHeight <= 0) return;
      
      let progress = -rect.top / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      targetX.current = progress * scrollDistance;
    };

    const handleScroll = () => {
      calculateTarget();
      startAnimation();
    };

    // IntersectionObserver для остановки анимации когда секция не видна
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          calculateTarget();
          startAnimation();
        } else if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          isAnimating = false;
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateTarget, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateTarget);
      observer.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white text-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        <div className="container mx-auto px-6 mb-12 flex-shrink-0">
          <span className="block text-sm font-mono font-bold uppercase tracking-widest text-gray-500 mb-2">{t('process.methodology')}</span>
          <h2 className="text-fluid-large font-display font-bold">{t('process.title')}</h2>
        </div>
        
        <div 
          ref={trackRef}
          className="flex gap-8 px-6 md:px-24 items-center"
          style={{ 
            width: 'max-content',
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        >
          {steps.map((item, idx) => (
            <div key={idx} className="w-[80vw] md:w-[600px] h-[50vh] bg-[#f5f5f7] p-8 md:p-12 rounded-3xl border border-gray-200 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group relative overflow-hidden">
               <span className="absolute -bottom-10 -right-10 text-[200px] font-display font-bold text-gray-200 group-hover:text-white/10 transition-colors pointer-events-none select-none leading-none">
                 {item.step}
               </span>
               <div className="flex justify-between items-start relative z-10">
                 <span className="text-xl font-mono border border-black/10 group-hover:border-white/20 px-3 py-1 rounded-full group-hover:bg-white/10 transition-colors">
                   {t('process.step')} {item.step}
                 </span>
                 <div className="w-12 h-12 rounded-full border border-black/10 group-hover:border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    →
                 </div>
               </div>
               <div className="relative z-10">
                 <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{item.title}</h3>
                 <p className="text-gray-600 group-hover:text-gray-300 text-lg md:text-xl leading-relaxed max-w-md">
                   {item.desc}
                 </p>
               </div>
            </div>
          ))}
          <div className="w-24 flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
};