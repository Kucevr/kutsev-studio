
import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowUpRight, Layers, Code, Calendar, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { PortfolioItem } from '../types';
import { useLanguage } from '../LanguageContext';
import { triggerHaptic } from '../utils/haptics';
import { TextReveal } from './TextReveal';
import { Magnetic } from './Magnetic';

interface ProjectDetailProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onNext, onPrev }) => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Swipe Distance Threshold
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onNext) {
      onNext();
    }
    if (isRightSwipe && onPrev) {
      onPrev();
    }
  };

  const handleClose = () => {
    triggerHaptic(5);
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      setMounted(true);
      const container = document.getElementById('project-detail-container');
      if (container) container.scrollTo(0, 0);
      triggerHaptic(5);
    } else {
      setTimeout(() => setMounted(false), 500);
    }
  }, [project]);

  if (!project && !mounted) return null;
  const isActive = !!project;
  const gallery = project?.gallery
    ? Array.isArray(project.gallery)
      ? project.gallery
      : [project.gallery]
    : [];

  return (
    <div className={`fixed inset-0 z-70 transition-all duration-500 ${isActive ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-brand-black/95 backdrop-blur-sm transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      <div 
        id="project-detail-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
        className={`relative w-full h-full overflow-y-auto transition-all duration-500 ease-[0.16,1,0.3,1] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div 
          className="min-h-screen flex items-center justify-center p-0 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full max-w-7xl bg-[#111] md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 min-h-screen md:min-h-0">
            <div className="absolute top-0 right-0 z-50 p-6 flex items-center gap-4">
              <Magnetic strength={0.4}>
                <button 
                  onClick={handleClose}
                  aria-label="Close Project Detail"
                  className="group flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform"/>
                </button>
              </Magnetic>
            </div>

            <div className="relative h-[50vh] md:h-[65vh] w-full group bg-black overflow-hidden">
              <img 
                src={project?.imageUrl} 
                alt={project?.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 block"
              />
              {/* Multi-layer overlays for maximum readability */}
              <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-transparent h-1/2" />
              <div className="absolute inset-0 bg-linear-to-t from-[#111] via-[#111]/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="animate-fade-in-up delay-100 max-w-4xl">
                    <span className="inline-block px-3 py-1 mb-4 border border-brand-accent text-brand-accent rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-accent/10 backdrop-blur-md">
                      {t('project.selected')}
                    </span>
                    <h2 className="text-fluid-large font-display font-bold text-white uppercase tracking-tighter leading-[0.85] mb-6 wrap-break-word">
                      {project?.title}
                    </h2>
                    <div className="text-base md:text-xl text-gray-300 font-medium leading-relaxed max-w-3xl">
                      <TextReveal delay={200}>{project?.headline || project?.description || `${t('project.desc')} ${project?.category}.`}</TextReveal>
                    </div>
                  </div>
                  
                  <div className="hidden md:block animate-fade-in-up delay-200">
                     <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center animate-spin-slow">
                        <ArrowRight size={24} />
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 p-8 md:p-16">
              <div className="md:col-span-4 space-y-10 md:border-r border-white/10 md:pr-12 animate-fade-in-up delay-300">
                 <div>
                   <div className="flex items-center gap-2 text-brand-accent mb-3 text-xs font-bold uppercase tracking-widest">
                     <Layers size={14} /> {t('project.category')}
                   </div>
                   <p className="text-2xl text-white font-display font-bold">{project?.category}</p>
                 </div>
                 
                 <div>
                   <div className="flex items-center gap-2 text-brand-accent mb-3 text-xs font-bold uppercase tracking-widest">
                     <Calendar size={14} /> {t('project.timeline')}
                   </div>
                   <p className="text-2xl text-white font-display font-bold">{project?.year || '2025'} • {project?.duration || 4} {t('project.weeks')}</p>
                 </div>
                 
                 <div>
                   <div className="flex items-center gap-2 text-brand-accent mb-3 text-xs font-bold uppercase tracking-widest">
                     <Code size={14} /> {t('project.tech')}
                   </div>
                   <div className="flex flex-wrap gap-2 mt-2">
                     {(project?.technologies || ['React', 'TypeScript', 'Tailwind CSS']).map(tech => (
                       <span key={tech} className="px-3 py-1.5 bg-white/5 rounded text-sm text-gray-300 border border-white/5 hover:border-white/20 transition-colors cursor-default">
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>
                 
                 <a 
                   href={project?.liveUrl || '#'} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="inline-flex w-full items-center justify-center gap-2 bg-white text-brand-black! py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-white! transition-all group mt-4"
                 >
                   <span>{t('project.seeLive')}</span>
                   <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </a>
              </div>

              <div className="md:col-span-8 space-y-12 animate-fade-in-up delay-300">
                 <div className="prose prose-invert max-w-none">
                   <h3 className="text-2xl md:text-4xl font-display font-bold leading-tight mb-8">
                     {project?.description || t('project.mainDesc.title')}
                   </h3>
                   <div className="text-gray-400 leading-relaxed text-lg font-light space-y-6">
                     <TextReveal delay={400}>{project?.fullDescription || t('project.mainDesc.p1')}</TextReveal>
                   </div>
                 </div>

                 {gallery.length > 0 && (
                   <div className="mt-10 border-t border-white/10 pt-8">
                     <div className="flex items-center justify-between mb-6">
                       <h4 className="text-2xl font-display font-bold uppercase tracking-wide">{t('project.gallery')}</h4>
                       <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t('project.swipe')}</span>
                     </div>
                     <div className="overflow-x-auto pb-4 custom-scrollbar">
                       <div className="flex gap-4 min-w-full snap-x snap-mandatory">
                         {gallery.map((src, idx) => (
                           <div 
                             key={src + idx} 
                             className="relative snap-start shrink-0 w-[320px] md:w-[520px] aspect-video bg-white/5 rounded-2xl overflow-hidden group/img"
                           >
                             <img 
                               src={src} 
                               alt={`${project?.title || 'Project'} photo ${idx + 1}`} 
                               className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" 
                               loading="lazy"
                               decoding="async"
                             />
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 )}

                 <div className="border-t border-white/10 pt-12 flex justify-between items-center">
                    <button onClick={onPrev} className="group flex items-center gap-4 hover:text-brand-accent transition-colors">
                       <ArrowLeft className="group-hover:-translate-x-2 transition-transform"/>
                       <span className="text-xs font-mono uppercase tracking-widest">{t('project.prev')}</span>
                    </button>
                    
                    <div className="flex flex-col items-center">
                       <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1 hidden md:block">{t('project.swipeClick')}</span>
                       <div className="flex gap-2">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                       </div>
                    </div>

                    <button onClick={onNext} className="group flex items-center gap-4 hover:text-brand-accent transition-colors">
                       <span className="text-xs font-mono uppercase tracking-widest">{t('project.next')}</span>
                       <ArrowRight className="group-hover:translate-x-2 transition-transform"/>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
