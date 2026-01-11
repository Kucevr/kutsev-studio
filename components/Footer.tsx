import React, { useEffect, useState, memo } from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, ArrowUp, Globe } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../LanguageContext';
import { TextReveal } from './TextReveal';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = memo(({ onContactClick }) => {
  const { t } = useLanguage();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Moscow' 
      });
      setTime(timeString);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black pt-20 pb-16 sm:pb-24 relative overflow-hidden">
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent mb-20"></div>

      {/* Background Blobs for Footer */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-brand-accent/10 blur-[100px] rounded-full animate-blob" />
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-brand-purple/10 blur-[100px] rounded-full animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-32">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-fluid-large font-display font-bold leading-[0.9] tracking-tighter mb-8">
              <TextReveal>{t('footer.idea')}</TextReveal>
              <span className="text-gray-500">
                <TextReveal delay={300}>{t('footer.tellUs')}</TextReveal>
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Magnetic strength={0.4}>
                  <button 
                    onClick={onContactClick}
                    className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-base md:text-lg overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                      {t('footer.start')} <ArrowUpRight size={20} />
                    </span>
                  </button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a 
                    href="mailto:kucevr@gmail.com"
                    className="group w-full sm:w-auto px-8 py-4 border border-white/20 rounded-full font-bold text-sm md:text-lg text-white hover:bg-white transition-all duration-300 inline-block text-center break-all"
                  >
                    <span className="group-hover:text-black transition-colors duration-300">
                      kucevr@gmail.com
                    </span>
                  </a>
                </Magnetic>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 text-sm font-mono text-gray-400">
             <div className="flex flex-col gap-4">
                <span className="text-white uppercase tracking-wider mb-2">{t('footer.socials')}</span>
                {[
                  { name: 'Instagram', icon: Instagram },
                  { name: 'Twitter', icon: Twitter },
                  { name: 'LinkedIn', icon: Linkedin },
                  { name: 'GitHub', icon: Github }
                ].map((social) => (
                  <Magnetic key={social.name} strength={0.2} className="block w-fit">
                    <a href="#" aria-label={social.name} className="hover:text-brand-accent transition-colors flex items-center gap-2 py-2">
                      <social.icon size={14}/> {social.name}
                    </a>
                  </Magnetic>
                ))}
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-white uppercase tracking-wider mb-2">{t('footer.sitemap')}</span>
                <button onClick={() => scrollTo('work')} className="text-left hover:text-white transition-colors py-2">{t('nav.work')}</button>
                <button onClick={() => scrollTo('services')} className="text-left hover:text-white transition-colors py-2">{t('nav.services')}</button>
                <button onClick={() => scrollTo('stack')} className="text-left hover:text-white transition-colors py-2">{t('nav.stack')}</button>
                <button onClick={() => scrollTo('capabilities')} className="text-left hover:text-white transition-colors py-2">{t('nav.capabilities')}</button>
             </div>
             <div className="flex flex-col justify-end">
                <Magnetic strength={0.5}>
                  <button onClick={scrollToTop} aria-label="Scroll to top" className="w-14 h-14 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <ArrowUp size={20} />
                  </button>
                </Magnetic>
             </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 pt-10 pb-4">
           <div className="hidden sm:block text-[20vw] leading-[0.75] font-display font-bold text-center tracking-tighter select-none text-transparent bg-clip-text bg-linear-to-b from-white/80 to-white/20 pointer-events-none">
             KUTSEV
           </div>
           <div className="block sm:hidden text-[18vw] leading-[0.85] font-display font-bold text-center tracking-tighter select-none text-transparent bg-clip-text bg-linear-to-b from-white/70 to-white/15 pointer-events-none">
             KUTSEV
           </div>
           <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left text-xs text-gray-500 font-mono mt-4 uppercase tracking-widest gap-4 md:gap-0">
              <span>© 2026 Kutsev Studio Inc.</span>
              <span className="hidden md:flex items-center gap-4">
                <span>Minsk • Moscow</span>
                <span className="flex items-center gap-2 text-white/50">
                  <Globe size={12} />
                  {time} MSK
                </span>
              </span>
              <span>{t('footer.rights')}</span>
           </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";