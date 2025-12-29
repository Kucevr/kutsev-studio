import React, { useRef, useState } from 'react';
import { Layout, Smartphone, Globe, Box, Cpu, PenTool, ArrowUpRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { useLanguage } from '../LanguageContext';

const IconMap: Record<string, React.FC<any>> = {
  layout: Layout,
  globe: Globe,
  smartphone: Smartphone,
  box: Box,
  pentool: PenTool,
  cpu: Cpu,
};

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden bg-brand-gray border border-white/5 rounded-3xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.08), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

export const Services: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current || !spotlightRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.transform = `translate(${x - 400}px, ${y - 400}px)`;
  };

  // Generate services from translations
  const services = [
    { id: '1', title: t('services.items.web.title'), description: t('services.items.web.desc'), icon: 'globe' },
    { id: '2', title: t('services.items.code.title'), description: t('services.items.code.desc'), icon: 'layout' },
    { id: '3', title: t('services.items.app.title'), description: t('services.items.app.desc'), icon: 'smartphone' },
    { id: '4', title: t('services.items.viz.title'), description: t('services.items.viz.desc'), icon: 'box' },
  ];
  
  const mainService = {
     title: t('services.items.uiux.title'),
     desc: t('services.items.uiux.desc')
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-32 bg-brand-black relative z-10 overflow-hidden group"
    >
      <div 
        ref={spotlightRef}
        className="absolute w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none will-change-transform"
        style={{ left: 0, top: 0 }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-fluid-huge font-display font-bold tracking-tighter text-white mb-6">
              <TextReveal>{t('services.title')}</TextReveal>
            </h2>
            <div className="h-px w-full md:w-[600px] bg-linear-to-r from-white/30 to-transparent"></div>
          </div>
          <div className="max-w-xs text-gray-400 font-mono text-sm leading-relaxed">
            <TextReveal delay={400}>{t('services.manifest')}</TextReveal>
            <div className="h-2"></div>
            <TextReveal delay={600}>{t('services.subtitle')}</TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          <SpotlightCard className="md:col-span-2 row-span-2 p-8 md:p-12 group">
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 blur-[100px] rounded-full group-hover:bg-brand-accent/30 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Layout size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl md:text-6xl font-display font-bold mb-4">{mainService.title}</h3>
                <p className="text-gray-400 text-lg md:text-xl max-w-md font-light leading-relaxed">
                  {mainService.desc}
                </p>
              </div>
              <div className="flex justify-end mt-8">
                 <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={28} />
                 </button>
              </div>
            </div>
          </SpotlightCard>

          {services.map((service, index) => {
             const Icon = IconMap[service.icon];
             return (
              <SpotlightCard 
                key={service.id} 
                className={`group p-8 flex flex-col justify-between hover:border-brand-accent/30 transition-colors duration-500 ${index === 1 ? 'md:row-span-2' : ''}`}
              >
                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-2xl text-white group-hover:text-brand-accent transition-colors duration-500 border border-white/5">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gray-400" />
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold font-display mb-3 text-white">{service.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                    {service.description}
                  </p>
                </div>
              </SpotlightCard>
             )
          })}
        </div>
      </div>
    </section>
  );
};