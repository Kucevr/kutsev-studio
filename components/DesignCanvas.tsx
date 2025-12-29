
import React, { useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const photo = (file: string) => new URL(`../sitephotos/${file}`, import.meta.url).href;

interface DesignCanvasProps {
  onOpenAllProjects?: () => void;
}

const CanvasItem: React.FC<{ 
  src: string; 
  title: string; 
  isCenter?: boolean;
  style?: React.CSSProperties;
  depth?: number;
}> = ({ src, title, isCenter = false, style, depth = 1 }) => (
  <div 
    className="will-change-transform flex items-center justify-center backface-hidden perspective-1000 group"
    style={{
      ...style,
      width: 'clamp(240px, 28vw, 440px)',
      height: 'clamp(200px, 26vh, 360px)',
    }}
  >
    <div 
      className={`
        relative w-full h-full bg-brand-dark overflow-hidden transition-all duration-700
        ${isCenter 
          ? 'shadow-[0_0_50px_rgba(255,255,255,0.15)] z-20 rounded-xl border border-white/20' 
          : 'shadow-lg rounded-lg z-10 hover:z-30 hover:scale-105 border border-white/5 hover:border-white/20'}
      `}
    >
      <div className={`absolute inset-0 bg-brand-gray/20 ${!isCenter && 'animate-pulse'}`} />
      <img 
        src={src} 
        alt={title} 
        loading={isCenter ? "eager" : "lazy"}
        fetchPriority={isCenter ? "high" : "auto"}
        decoding="async"
        className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4">
         <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
           {title}
         </span>
      </div>
    </div>
  </div>
);

const gridImages = [
  { src: photo('focusflow.avif'), title: 'Focusflow', depth: 1.2 },
  { src: photo('novabank.avif'), title: 'Novabank', depth: 0.8 },
  { src: photo('lumos.avif'), title: 'Lumos Architecture', depth: 1.5 },
  { src: photo('metal.avif'), title: 'Metal', depth: 0.9 },
  { src: photo('lumiereroasters.avif'), title: 'Lumière Roasters', depth: 1.3 },
  { src: photo('l-homme.avif'), title: "L'Homme", depth: 0.7 },
  { src: photo("lephemere.avif"), title: "L'Éphémère", depth: 1.1 },
  { src: photo('Эстетика.avif'), title: 'Эстетика', depth: 1.4 },
];

const gridSlots = [
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 1, row: 2 },
  { col: 3, row: 2 },
  { col: 1, row: 3 },
  { col: 2, row: 3 },
  { col: 3, row: 3 },
];

// Linear interpolation function
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const DesignCanvas: React.FC<DesignCanvasProps> = ({ onOpenAllProjects }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  
  // Warmup counter to snap animation on first frames
  const warmupFramesRef = useRef(0);
  
  // Mobile detection and performance optimization
  const isMobileRef = useRef(false);
  const isLowPerfRef = useRef(false);
  
  useEffect(() => {
    // Detect mobile and low-performance devices
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    isLowPerfRef.current = isMobileRef.current || navigator.hardwareConcurrency <= 4;
  }, []);

  useEffect(() => {
    const loop = (time: number) => {
      // Allow a few frames of warmup even if not visible to prime the GPU
      if (!isVisibleRef.current && warmupFramesRef.current >= 60) {
        rafIdRef.current = null;
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = time;
      let deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      deltaTime = Math.min(deltaTime, 0.1);

      if (warmupFramesRef.current < 60) {
        progressRef.current = targetProgressRef.current;
        warmupFramesRef.current++;
      } else {
        const smoothFactor = 1 - Math.exp(-5.0 * deltaTime);
        progressRef.current = lerp(progressRef.current, targetProgressRef.current, smoothFactor);
      }

      if (Math.abs(progressRef.current - targetProgressRef.current) < 0.0001) {
        progressRef.current = targetProgressRef.current;
      }

      if (containerRef.current && overlayRef.current) {
        const p = progressRef.current;
        const ease = 1 - Math.pow(1 - p, 4);

        const startScale = 1.6;
        const endScale = 0.9;
        const currentScale = startScale - (ease * (startScale - endScale));

        // smooth tilt toward mouse position
        tiltRef.current = {
          x: lerp(tiltRef.current.x, targetTiltRef.current.x, 0.12),
          y: lerp(tiltRef.current.y, targetTiltRef.current.y, 0.12),
        };
        const tiltX = tiltRef.current.y * 6; // invert for natural feel
        const tiltY = tiltRef.current.x * 6;

        containerRef.current.style.transform = `scale3d(${currentScale}, ${currentScale}, 1) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0,0,0)`;
        containerRef.current.style.opacity = `${Math.min(1, 0.4 + ease * 1.6)}`;
        overlayRef.current.style.opacity = `${ease * 0.6}`;

        // Apply individual parallax and floating (simplified on mobile)
        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          const depth = i === 0 ? 1 : gridImages[i - 1].depth;
          
          // Reduce animation intensity on mobile for better performance
          const floatIntensity = isLowPerfRef.current ? 3 : 10;
          const parallaxIntensity = isMobileRef.current ? 0 : 40;
          
          const floatX = Math.sin(time * 0.001 + i) * floatIntensity * (1 - ease);
          const floatY = Math.cos(time * 0.0012 + i) * floatIntensity * (1 - ease);
          const parallaxX = tiltRef.current.x * parallaxIntensity * depth;
          const parallaxY = tiltRef.current.y * parallaxIntensity * depth;
          
          const itemTransform = `translate3d(${floatX + parallaxX}px, ${floatY + parallaxY}px, 0)`;
          const child = item.firstElementChild as HTMLElement;
          if (child) {
            child.style.transform = itemTransform;
          }
        });
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!rafIdRef.current && isVisibleRef.current) {
        lastTimeRef.current = 0;
        rafIdRef.current = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
      { threshold: 0 }
    );

    const handleScroll = () => {
      if (sectionRef.current && isVisibleRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalDist = rect.height - viewportHeight;
        let raw = -rect.top / totalDist;
        raw = Math.max(0, Math.min(1, raw));
        targetProgressRef.current = raw;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Disable tilt on mobile devices
      if (!containerRef.current || isMobileRef.current) return;
      // Since container is w-screen h-screen and sticky, we can use window dimensions
      // to avoid expensive getBoundingClientRect() calls on every mouse move
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetTiltRef.current = { x: x * 2, y: y * 2 };
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Start loop immediately for warmup
    rafIdRef.current = requestAnimationFrame(loop);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Only add mouse listener on non-mobile devices
    if (!isMobileRef.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh] md:h-[500vh] bg-brand-black z-20" style={{ height: isMobileRef.current ? '300vh' : '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-brand-black" style={{ perspective: isMobileRef.current ? 'none' : '1000px' }}>
        <div
          ref={overlayRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-100 pointer-events-none z-0"
          style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />

        {isMobileRef.current ? (
          // Mobile: Vertical flex layout
          <div 
            ref={containerRef}
            className="flex flex-col w-screen items-center justify-start gap-8 px-4 will-change-transform origin-center z-20"
            style={{ transform: 'translate3d(0,0,0)', padding: '40px 16px', minHeight: '100vh' }}
          >
            <div ref={el => { itemsRef.current[0] = el; }} className="w-full flex items-center justify-center" style={{ height: 'clamp(200px, 50vw, 360px)', maxWidth: '100%' }}>
              <CanvasItem 
                src={photo('nyc-atmosphere.avif')} 
                title="KUTSEV STUDIO" 
                isCenter={true}
                depth={1}
              />
            </div>
            {gridImages.map((img, i) => (
              <div key={i} ref={el => { itemsRef.current[i + 1] = el; }} className="w-full flex items-center justify-center" style={{ height: 'clamp(200px, 50vw, 360px)', maxWidth: '100%' }}>
                <CanvasItem 
                  src={img.src} 
                  title={img.title} 
                  depth={img.depth}
                />
              </div>
            ))}
            
            {/* Archive button positioned after items on mobile */}
            <div className="flex flex-col items-center gap-6 mt-12 w-full pb-12">
              {onOpenAllProjects && (
                <button 
                  onClick={onOpenAllProjects}
                  className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-105 active:scale-95"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">{t('showcase.archiveTitle')}</span>
                  <Maximize2 size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              )}
            </div>
          </div>
        ) : (
          // Desktop: 3x3 Grid layout
          <div 
            ref={containerRef}
            className="grid w-screen h-screen place-items-center grid-cols-3 grid-rows-3 gap-4 px-6 will-change-transform origin-center backface-hidden z-20"
            style={{ transform: 'scale3d(1.6, 1.6, 1) translate3d(0,0,0)' }}
          >
            <div ref={el => { itemsRef.current[0] = el; }} className="w-full h-full flex items-center justify-center" style={{ gridColumn: 2, gridRow: 2 }}>
              <CanvasItem 
                src={photo('nyc-atmosphere.avif')} 
                title="KUTSEV STUDIO" 
                isCenter={true}
                depth={1}
              />
            </div>
            {gridImages.map((img, i) => (
              <div key={i} ref={el => { itemsRef.current[i + 1] = el; }} className="w-full h-full flex items-center justify-center" style={{ gridColumn: gridSlots[i].col, gridRow: gridSlots[i].row }}>
                <CanvasItem 
                  src={img.src} 
                  title={img.title} 
                  depth={img.depth}
                />
              </div>
            ))}
          </div>
        )}

        {/* Desktop: Archive button at bottom */}
        {!isMobileRef.current && (
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6 z-50">
            {onOpenAllProjects && (
              <button 
                onClick={onOpenAllProjects}
                className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-105 active:scale-95"
              >
                <span className="text-xs font-bold uppercase tracking-widest">{t('showcase.archiveTitle')}</span>
                <Maximize2 size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
