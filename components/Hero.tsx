import React, { useRef, useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../LanguageContext';
import { LottieAnimation } from './Animations';

const Typewriter = ({ words, delay = 3000 }: { words: string[], delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    const currentWord = words[index];

    if (subIndex === currentWord.length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="inline-block min-w-[5ch] text-left">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </span>
  );
};

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !contentRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(() => {
        if(contentRef.current) {
            contentRef.current.style.transform = `rotateX(${-yPct * 4}deg) rotateY(${xPct * 4}deg)`;
        }
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(() => {
        if(contentRef.current) {
            contentRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    });
  };

  useEffect(() => {
      return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000 bg-brand-black"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand-accent/10 blur-[150px] rounded-full mix-blend-screen animate-blob" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
        
        {/* Lottie Background Animation - Subtle abstract waves */}
        <div className="absolute inset-0 opacity-15 mix-blend-screen">
          <LottieAnimation 
            path="https://lottie.host/956e280c-05ad-4c29-ab3d-b1231415d288/85v6v6v6v6.json" 
            className="w-full h-full scale-150"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
        
        {/* Top Tagline */}
        <div className="mb-4 md:mb-8 opacity-0 animate-fade-in-up delay-200 flex flex-col items-center">
          <div className="h-10 w-px bg-linear-to-b from-transparent to-white/30 mb-4"></div>
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-gray-400">
            {t('hero.tagline')}
          </span>
        </div>

        {/* Main Title Block */}
        <div 
          ref={contentRef}
          className="relative flex flex-col items-center text-center will-change-transform transition-transform duration-300 ease-out mb-12 w-full max-w-[100vw] overflow-hidden px-4"
        >
          {/* Adjusted sizing for ABSOLUTE / АБСОЛЮТНОЕ */}
          <h1 className="text-[14vw] md:text-[13vw] leading-[0.85] font-display font-bold tracking-tighter mix-blend-exclusion text-white select-none relative z-10 whitespace-nowrap">
            <Typewriter words={Array.isArray(t('hero.typewriter')) ? t('hero.typewriter') : [t('hero.digital')]} />
          </h1>
          
          <div className="relative w-full flex justify-center items-center -my-2 md:-my-6 z-20">
             <div className="hidden md:flex items-center w-full absolute top-1/2 left-0 -translate-y-1/2 opacity-20">
                <div className="flex-1 h-px bg-white"></div>
                <div className="w-32"></div> 
                <div className="flex-1 h-px bg-white"></div>
             </div>

             <Magnetic strength={0.3}>
               <button 
                 className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center cursor-pointer group backdrop-blur-md rounded-full border border-white/10 bg-white/5 touch-none outline-none"
                 onPointerDown={(e) => {
                   e.stopPropagation();
                   onContactClick();
                 }}
                 onTouchStart={(e) => {
                   e.stopPropagation();
                   onContactClick();
                 }}
               >
                  <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-full h-full animate-spin-slow group-hover:pause p-1" viewBox="0 0 100 100">
                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                    <text className="text-[10px] fill-white/80 font-mono uppercase tracking-widest">
                      <textPath href="#curve" startOffset="0%">
                        {t('hero.badge')}
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-brand-accent/20">
                    <Play size={14} fill="white" className="ml-0.5" />
                  </div>
               </div>
             </Magnetic>
          </div>

          {/* Adjusted sizing for MASTERY / МАСТЕРСТВО */}
          <h1 className="text-[12vw] md:text-[12vw] leading-[0.85] font-display font-bold tracking-tighter select-none relative z-10 whitespace-nowrap">
            <span className="text-transparent bg-clip-text bg-linear-to-br from-white via-gray-300 to-white/50 animate-gradient-x bg-[length:200%_auto]">
               <TextReveal delay={500}>{t('hero.mastery')}</TextReveal>
            </span>
          </h1>
        </div>

        {/* Bottom Structure: Button & Mission */}
        <div className="w-full max-w-6xl mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center md:items-start opacity-0 animate-fade-in-up delay-800 relative z-30 border-t border-white/10 pt-8">
           <div className="flex justify-center md:justify-start">
              <Magnetic strength={0.4}>
                 <button 
                  onClick={scrollToWork}
                  className="group relative w-full sm:w-auto px-10 py-5 rounded-full font-bold text-sm overflow-hidden bg-white text-black hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                >
                  <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out will-change-transform" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                    {t('hero.viewWork')} <ArrowDown size={14} />
                  </span>
                </button>
              </Magnetic>
           </div>
           
           <div className="text-center md:text-right px-4">
              <p className="font-mono text-[10px] md:text-sm text-gray-400 leading-relaxed max-w-md md:ml-auto uppercase tracking-widest">
                 {t('hero.mission')}
              </p>
           </div>
        </div>

      </div>
    </section>
  );
};