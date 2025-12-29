
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';
import { TextReveal } from './TextReveal';
import { useLanguage } from '../LanguageContext';
import { showcaseProjects } from '../data';
import { triggerHaptic } from '../utils/haptics';

interface ShowcaseProps {
  onProjectClick: (project: PortfolioItem) => void;
  onOpenAllProjects: () => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({ onProjectClick, onOpenAllProjects }) => {
  const { t } = useLanguage();

  const handleProjectClick = (project: PortfolioItem) => {
    triggerHaptic(10);
    onProjectClick(project);
  };

  const handleOpenAll = () => {
    triggerHaptic(10);
    onOpenAllProjects();
  };

  return (
    <section id="work" className="py-24 bg-white text-brand-black overflow-hidden">
      
      <div className="w-full bg-brand-accent overflow-hidden py-4 rotate-[-2deg] scale-110 my-20 border-y border-black">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display font-bold text-black px-8 uppercase tracking-tighter">
              {t('showcase.marquee')}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="overflow-hidden max-w-full">
            <h2 className="text-5xl md:text-fluid-huge font-display font-bold tracking-tighter leading-[0.85] uppercase wrap-break-word">
              <TextReveal>{t('showcase.title')}</TextReveal>
            </h2>
          </div>
          <p className="text-lg md:text-2xl font-medium max-w-sm text-left md:text-right text-gray-600">
            {t('showcase.subtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {showcaseProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative flex flex-col md:flex-row gap-8 md:gap-16 items-center cursor-pointer ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              onClick={() => handleProjectClick(project)}
              data-cursor-text="VIEW"
            >
              <div className="w-full md:w-3/5 relative overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[16/9] shadow-2xl">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white font-bold tracking-widest uppercase text-xs md:text-sm shadow-2xl">
                      {t('showcase.open')}
                   </div>
                </div>
              </div>

              <div className="w-full md:w-2/5 flex flex-col justify-center px-2 md:px-0">
                <span className="text-[10px] font-bold border border-black/10 self-start px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-bold mb-2 uppercase group-hover:text-brand-accent transition-colors duration-300 leading-tight wrap-break-word">
                  {project.title}
                </h3>
                <p className="text-base md:text-lg text-gray-500 font-medium mb-6">{project.category}</p>
                <button className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all link-underline w-fit">
                  {t('showcase.viewCase')} <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <button 
            onClick={handleOpenAll} 
            className="group relative px-12 py-5 bg-brand-black text-white rounded-full font-bold text-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-3">
              {t('showcase.allProjects')} <ArrowUpRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
