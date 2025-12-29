
import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Filter, Grid, List } from 'lucide-react';
import { PortfolioItem } from '../types';
import { useLanguage } from '../LanguageContext';
import { allProjects } from '../data';
import { triggerHaptic } from '../utils/haptics';
import { Magnetic } from './Magnetic';

interface AllProjectsProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectSelect: (project: PortfolioItem) => void;
}

const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];

export const AllProjects: React.FC<AllProjectsProps> = ({ isOpen, onClose, onProjectSelect }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    triggerHaptic(5);
    onClose();
  };

  const handleProjectSelect = (project: PortfolioItem) => {
    triggerHaptic(10);
    onProjectSelect(project);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setVisible(false), 500);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory || p.category.includes(activeCategory));

  return (
    <div className={`fixed inset-0 z-60 bg-brand-black transition-all duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'}`}>
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12 bg-brand-black/95 backdrop-blur-md border-b border-white/5">
         <div className="flex items-center gap-6">
            <h2 className="text-3xl font-display font-bold">{t('showcase.archiveTitle')}</h2>
            <div className="hidden md:flex gap-1 bg-white/5 p-1 rounded-lg">
               <button onClick={() => setViewMode('grid')} aria-label="Grid View" className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}><Grid size={18} /></button>
               <button onClick={() => setViewMode('list')} aria-label="List View" className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}><List size={18} /></button>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-500 hidden md:block">
              {filteredProjects.length} {t('showcase.found')}
            </span>
            <Magnetic strength={0.4}>
              <button onClick={handleClose} aria-label="Close Archive" className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all group">
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300"/>
              </button>
            </Magnetic>
         </div>
      </div>

      <div className="h-[calc(100vh-96px)] overflow-y-auto pb-32 px-6 md:px-12 custom-scrollbar">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 py-8 mb-8">
           <div className="flex items-center gap-2 text-brand-accent mr-4">
             <Filter size={16} />
             <span className="text-xs font-bold uppercase tracking-widest">{t('showcase.filter')}</span>
           </div>
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => {
                 triggerHaptic(5);
                 setActiveCategory(cat);
               }}
               className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat ? 'bg-brand-accent text-white border-brand-accent' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'}`}
             >
               {cat === 'All' ? t('showcase.all') : cat}
             </button>
           ))}
        </div>

        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12' : 'flex flex-col gap-4'}`}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group cursor-pointer animate-fade-in-up ${viewMode === 'list' ? 'flex items-center gap-8 border-b border-white/5 pb-4 hover:bg-white/5 p-4 rounded-xl transition-colors' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleProjectSelect(project)}
              data-cursor-text="OPEN"
            >
              <div className={`relative overflow-hidden bg-gray-900 ${viewMode === 'grid' ? 'aspect-3/2 md:aspect-video rounded-lg mb-4' : 'w-28 md:w-48 aspect-3/2 rounded-lg shrink-0'}`}>
                 <div className={`absolute inset-0 bg-black/0 transition-all duration-500 z-10 ${viewMode === 'grid' ? 'group-hover:bg-black/20' : ''}`} />
                 <img src={project.imageUrl} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"/>
                 {viewMode === 'grid' && (
                   <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg"><ArrowUpRight size={20} /></div>
                   </div>
                 )}
              </div>
              <div className={`${viewMode === 'list' ? 'grow flex items-center justify-between' : 'flex justify-between items-start border-t border-white/10 pt-4'}`}>
                 <div>
                   <h3 className={`${viewMode === 'list' ? 'text-2xl md:text-4xl' : 'text-2xl'} font-display font-bold mb-1 group-hover:text-brand-accent transition-colors`}>{project.title}</h3>
                   <p className="text-gray-500 text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>{project.category}</p>
                 </div>
                 {viewMode === 'list' ? (
                    <div className="flex items-center gap-8">
                       <span className="font-mono text-gray-500 hidden md:block">{project.year || '2023'}</span>
                       <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><ArrowUpRight size={20} /></div>
                    </div>
                 ) : (
                    <span className="font-mono text-xs text-gray-600 border border-white/10 px-2 py-1 rounded group-hover:border-white/30 transition-colors">{project.year || '2023'}</span>
                 )}
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
             <p className="font-mono text-sm uppercase tracking-widest mb-2">{t('showcase.notFound')}</p>
             <button onClick={() => setActiveCategory('All')} className="text-white underline hover:text-brand-accent transition-colors">{t('showcase.clearFilters')}</button>
          </div>
        )}
      </div>
    </div>
  );
};
