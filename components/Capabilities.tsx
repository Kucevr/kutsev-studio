import React from 'react';
import { Layers, Zap, Code, Palette, Smartphone, Share2 } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { useLanguage } from '../LanguageContext';

export const Capabilities: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    { icon: Palette, title: t('capabilities.items.brand.title'), desc: t('capabilities.items.brand.desc') },
    { icon: Code, title: t('capabilities.items.dev.title'), desc: t('capabilities.items.dev.desc') },
    { icon: Zap, title: t('capabilities.items.perf.title'), desc: t('capabilities.items.perf.desc') },
    { icon: Layers, title: t('capabilities.items.systems.title'), desc: t('capabilities.items.systems.desc') },
    { icon: Smartphone, title: t('capabilities.items.mobile.title'), desc: t('capabilities.items.mobile.desc') },
    { icon: Share2, title: t('capabilities.items.integrations.title'), desc: t('capabilities.items.integrations.desc') }
  ];

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-brand-black border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
            <div className="flex-1">
              <h2 className="text-5xl md:text-fluid-large font-display font-bold leading-[0.9] md:leading-tight">
                <div className="mb-2">{t('capabilities.headline_1')}</div>
                <div className="text-brand-accent">
                   <TextReveal>{t('capabilities.headline_2')}</TextReveal>
                </div>
              </h2>
            </div>
            <div className="flex flex-col justify-end flex-1">
               <div className="text-lg md:text-xl text-gray-400 font-light max-w-lg leading-relaxed border-l-2 border-brand-accent pl-6">
                 <TextReveal delay={300}>{t('capabilities.desc')}</TextReveal>
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="group relative bg-brand-black p-8 md:p-10 hover:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 -mt-16 pointer-events-none"></div>
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg shadow-black/50">
                    <cap.icon strokeWidth={1.5} size={24} />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold font-display mb-3 text-white group-hover:text-brand-accent transition-colors">{cap.title}</h3>
                 <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">{cap.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};