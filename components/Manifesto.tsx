import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import { TextReveal } from './TextReveal';

const DataGrid = React.memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 font-mono text-[7px] overflow-hidden leading-none select-none">
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={i} className="whitespace-nowrap animate-marquee py-3 flex gap-12" style={{ animationDuration: `${40 + i * 15}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}>
        {Array.from({ length: 10 }).map((_, j) => (
          <div key={j} className="flex gap-8 items-center">
            <span className="text-brand-accent/40">[{new Date().getFullYear()}.0{i+1}.{j+1}]</span>
            <span className="text-white/10">KUTSEV_CORE_V4.0.1</span>
            <span className="text-brand-accent/20">STATUS: ACTIVE</span>
            <span className="text-white/5">0x{Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
            <span className="w-24 h-px bg-white/5" />
          </div>
        ))}
      </div>
    ))}
  </div>
));

const SplitText: React.FC<{ text: string, progress: number }> = ({ text, progress }) => {
  return (
    <span className="inline-block relative" data-text={text}>
      {text.split('').map((char, i) => {
        const charStart = i / text.length * 0.3;
        // Starts even later (0.25) to focus reveal in the active viewport area
        const charProgress = Math.max(0, Math.min(1, (progress - 0.25 - charStart) * 7));
        
        // Subtle technical jitter during reveal
        const jitter = charProgress > 0.2 && charProgress < 0.5 ? (Math.random() - 0.5) * 3 : 0;
        
        return (
          <span key={i} className="relative inline-block">
            {/* Base Layer: Ghostly Outline */}
            <span 
              className="inline-block transition-all duration-1000"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                color: 'transparent',
                opacity: 0.2 + charProgress * 0.8,
                transform: `translateY(${(1 - charProgress) * 15 + jitter}px) scale(${0.95 + charProgress * 0.05})`,
                filter: `blur(${(1 - charProgress) * 4}px)`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
            
            {/* Fill Layer: Liquid Reveal */}
            <span 
              className="absolute inset-0 inline-block pointer-events-none"
              style={{
                color: 'white',
                clipPath: `inset(${(1 - charProgress) * 100}% 0 0 0)`,
                opacity: charProgress,
                textShadow: charProgress > 0.8 ? '0 0 40px rgba(55,88,249,0.4)' : 'none',
                filter: charProgress > 0.5 ? 'none' : 'blur(8px)',
                transform: `translateX(${jitter * 0.5}px)`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>

            {/* Subtle Accent Glow at the fill edge */}
            {charProgress > 0.1 && charProgress < 0.9 && (
              <span 
                className="absolute left-0 right-0 h-[2px] bg-brand-accent/50 z-20 blur-[2px]"
                style={{ top: `${(1 - charProgress) * 100}%` }}
              />
            )}
          </span>
        );
      })}
    </span>
  );
};

const PrincipleItem: React.FC<{
  item: any;
  idx: number;
  isActive: boolean;
}> = ({ item, idx, isActive }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when bottom enters, 1 when top leaves
      // We want a more focused range for the reveal
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setLocalProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={itemRef}
      className="group relative principle-item py-20 md:py-32"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-8 overflow-hidden">
          <div className={`font-mono text-[10px] md:text-xs transition-all duration-1000 flex items-center gap-3 ${localProgress > 0.2 ? 'text-brand-accent' : 'text-gray-800'}`}>
            <span className="opacity-50">ID:</span>
            <span className="font-bold">0x0{idx + 1}</span>
            <span className={`w-2 h-2 rounded-full ${localProgress > 0.2 ? 'bg-brand-accent animate-pulse' : 'bg-gray-800'}`} />
          </div>
          <div 
            className="h-px grow bg-white/5 transition-all duration-1000 origin-left"
            style={{ transform: `scaleX(${Math.max(0, (localProgress - 0.1) * 2)})`, backgroundColor: localProgress > 0.3 ? 'rgba(55,88,249,0.3)' : 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <h3 className="text-[9vw] md:text-[10vw] font-display font-black leading-[0.8] tracking-tighter uppercase cursor-default select-none relative">
          <SplitText text={item.title} progress={localProgress} />
        </h3>
      </div>
      
      <div className="mt-20 max-w-4xl ml-auto md:mr-24 relative z-10">
        <div className="text-2xl md:text-5xl font-light leading-[1.05] tracking-tight relative text-gray-500">
          <p className="relative z-10">
            {item.desc.split(' ').map((word: string, i: number) => {
              // Description starts revealing after title
              const wordStart = i / item.desc.split(' ').length * 0.2;
              // Increased multiplier to 12 to ensure full reveal within the remaining scroll space
              const wordProgress = Math.max(0, Math.min(1, (localProgress - 0.6 - wordStart) * 12));
              
              return (
                <span 
                  key={i} 
                  className="inline-block mr-[0.25em] transition-all duration-700 ease-out will-change-transform"
                  style={{ 
                    transform: `translateY(${(1 - wordProgress) * 10}px)`,
                    opacity: 0.1 + wordProgress * 0.9,
                    // Blur disappears much faster to ensure clarity
                    filter: wordProgress > 0.7 ? 'none' : `blur(${(1 - wordProgress) * 8}px)`,
                    color: wordProgress > 0.5 ? 'white' : 'rgb(107, 114, 128)'
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
        
        <div 
          className="mt-20 flex items-center justify-end transition-all duration-1000"
          style={{ opacity: Math.max(0, (localProgress - 0.8) * 5), transform: `translateY(${(1 - Math.max(0, (localProgress - 0.8) * 5)) * 20}px)` }}
        >
          <div className="w-20 h-20 rounded-full border border-brand-accent/20 flex items-center justify-center overflow-hidden relative group/btn cursor-pointer">
            <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            <svg width="28" height="28" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-all duration-700 group-hover/btn:rotate-45 group-hover/btn:scale-110">
              <path d="M1.5 12.5L12.5 1.5M12.5 1.5H1.5M12.5 1.5V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Decorative index line */}
      <div className="absolute -top-24 -left-4 md:-left-12 flex flex-col items-center gap-6">
        <div 
          className="w-px transition-all duration-1000 ease-out"
          style={{ 
            height: `${localProgress * 240}px`, 
            backgroundColor: localProgress > 0.5 ? '#3758f9' : 'rgba(255,255,255,0.1)',
            boxShadow: localProgress > 0.5 ? '0 0 30px rgba(55,88,249,1)' : 'none'
          }}
        />
        <div className="relative">
          <span className={`text-[10px] font-mono transition-all duration-700 font-bold tracking-tighter ${localProgress > 0.2 ? 'text-brand-accent scale-125' : 'text-gray-800 opacity-50'}`}>
            P_{idx + 1}
          </span>
          {localProgress > 0.2 && (
            <span className="absolute -inset-2 border border-brand-accent/30 rounded-sm animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export const Manifesto: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Visibility tracking for optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Smooth scroll interpolation
  useEffect(() => {
    if (!isVisible) return;
    
    let rafId: number;
    const updateSmoothProgress = () => {
      setSmoothProgress(prev => {
        const diff = scrollProgress - prev;
        if (Math.abs(diff) < 0.0001) return scrollProgress;
        return prev + diff * 0.08; // Slightly slower for more "premium" feel
      });
      rafId = requestAnimationFrame(updateSmoothProgress);
    };
    rafId = requestAnimationFrame(updateSmoothProgress);
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgress, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);

      // Track active principle
      const principleElements = containerRef.current.querySelectorAll('.principle-item');
      principleElements.forEach((el, idx) => {
        const pRect = el.getBoundingClientRect();
        if (pRect.top < windowHeight / 2 && pRect.bottom > windowHeight / 2) {
          setActivePrinciple(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const principles = (t('manifesto.principles') as any) || [];
  const tech = ['React 19', 'TypeScript', 'Three.js', 'Tailwind 4', 'Framer', 'Vite'];

  const principleColors = [
    'rgba(55,88,249,0.15)', // Blue
    'rgba(124,58,237,0.15)', // Purple
    'rgba(6,182,212,0.15)',  // Cyan
    'rgba(99,102,241,0.15)', // Indigo
  ];

  return (
    <section 
      id="stack" 
      ref={containerRef} 
      className="py-32 bg-brand-black relative overflow-hidden border-t border-white/5"
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />

      {/* Ambient Glow & Data Stream */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(800px circle at 50% ${smoothProgress * 100}%, ${principleColors[activePrinciple] || principleColors[0]}, transparent 60%)`
        }}
      />
      
      {/* Ambient Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundSize: '200px'
        }}
      />
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #3758f9 1px, transparent 1px), linear-gradient(to bottom, #3758f9 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translateY(${smoothProgress * -50}px)`
        }} 
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
        style={{ 
          backgroundImage: `radial-gradient(#3758f9 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          transform: `translateY(${smoothProgress * -20}px)`
        }} 
      />

      <DataGrid />

      {/* Floating Particles Layer */}

      {/* Noise Overlay */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.03] z-10" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      {/* Background decorative elements with Parallax */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 blur-[120px] rounded-full animate-blob" 
          style={{ transform: `translateY(${smoothProgress * 150}px) scale(${1 + smoothProgress * 0.5})` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full animate-blob animation-delay-2000" 
          style={{ transform: `translateY(${-smoothProgress * 150}px) scale(${1.5 - smoothProgress * 0.5})` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 flex justify-between items-end">
          <div>
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
              {t('manifesto.subtitle')}
            </span>
            <h2 className="text-4xl md:text-fluid-huge font-display font-bold tracking-tighter uppercase leading-[0.8]">
              <TextReveal>{t('manifesto.title')}</TextReveal>
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 top-0 w-px h-full bg-white/5 hidden md:block">
            <div 
              className="absolute top-0 left-0 w-full bg-brand-accent transition-all duration-300 ease-out shadow-[0_0_15px_rgba(55,88,249,0.5)]"
              style={{ height: `${smoothProgress * 100}%` }}
            />
          </div>

          <div className="flex flex-col gap-32 md:gap-56 md:pl-12">
            {Array.isArray(principles) && principles.map((item: any, idx: number) => (
              <PrincipleItem 
                key={idx} 
                item={item} 
                idx={idx} 
                isActive={activePrinciple === idx}
              />
            ))}
          </div>
        </div>

        {/* Bottom Tech Elements */}
        <div className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden group/stack">
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-accent/50 to-transparent -translate-y-full group-hover/stack:animate-scan pointer-events-none" />
          
          <div className="flex flex-col gap-8 relative z-10 w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-6">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                {t('manifesto.techLabel')}
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-x-12 gap-y-6">
              {tech.map((item, i) => (
                <div key={item} className="group/tech relative">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[8px] font-mono text-brand-accent/30">0{i+1}</span>
                    <span className="text-sm md:text-base font-mono text-gray-400 group-hover/tech:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 left-0 w-0 h-px bg-brand-accent transition-all duration-500 group-hover/tech:w-full" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-right hidden md:block relative z-10">
            <p className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">
              © {new Date().getFullYear()} Kutsev Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
