import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Glass effect trigger
          setIsScrolled(scrollY > 20);

          // Smart Hide/Show logic
          if (scrollY > lastScrollY.current && scrollY > 100) {
             setIsHidden(true);
          } else {
             setIsHidden(false);
          }
          lastScrollY.current = scrollY;

          // Active section logic
          const sections = ['work', 'services', 'capabilities', 'stack'];
          let current = '';
          const viewportMiddle = window.innerHeight / 3;

          for (const id of sections) {
            const element = document.getElementById(id);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
                current = id;
                break;
              }
            }
          }
          if (current) setActiveSection(current);
          
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: t('nav.work'), id: 'work' },
    { name: t('nav.services'), id: 'services' },
    { name: t('nav.manifesto'), id: 'stack' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-700 ease-expo ${
          isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        } ${isScrolled ? 'pt-4 px-4' : 'pt-6 px-6'}`}
      >
        <div className={`
          flex items-center justify-between transition-all duration-700 ease-expo
          ${isScrolled 
            ? 'w-full max-w-5xl glass-panel rounded-full py-3 px-6 shadow-2xl shadow-brand-accent/5' 
            : 'w-full max-w-7xl bg-transparent py-4'}
        `}>
          {/* Logo */}
          <a 
            href="#" 
            aria-label="Homepage"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xl font-bold tracking-tight font-display flex items-center gap-2 z-50 mix-blend-difference text-white"
          >
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
            KUTSEV
          </a>

          {/* Desktop Nav - Centered Absolutely */}
          <nav className="hidden md:flex items-center gap-1 bg-black/20 rounded-full px-2 py-1 backdrop-blur-md border border-white/5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Magnetic key={link.id} strength={0.3}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all block relative ${
                    activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                     <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-accent rounded-full"></span>
                  )}
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <Magnetic strength={0.2}>
              <button 
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1 uppercase px-3 py-2"
              >
                <span className={language === 'ru' ? 'text-white' : ''}>RU</span>
                <span className="text-gray-600">|</span>
                <span className={language === 'en' ? 'text-white' : ''}>EN</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.5}>
              <button 
                onClick={onContactClick}
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-accent hover:text-white transition-colors flex items-center gap-2 group"
              >
                {t('nav.discuss')}
                <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 z-50 relative flex items-center gap-4"
            aria-label="Toggle Mobile Menu"
          >
             <span onClick={(e) => { e.stopPropagation(); toggleLanguage(); }} className="text-xs font-bold font-mono">{language.toUpperCase()}</span>
             <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-black/98 backdrop-blur-md md:backdrop-blur-2xl z-30 flex flex-col transition-all duration-700 ease-expo ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-32 pb-12 px-8 justify-between">
          <nav className="flex flex-col gap-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 mb-2">
              {t('nav.menu')}
            </span>
            {navLinks.map((link, i) => (
              <div 
                key={link.name}
                className={`transform transition-all duration-700 ease-expo ${
                  mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${100 + i * 100}ms` }}
              >
                <a 
                  href={`#${link.id}`}
                  className="text-5xl font-display font-bold text-white hover:text-brand-accent transition-colors block"
                  onClick={(e) => scrollToSection(e, link.id)}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </nav>
          
          <div className="flex flex-col gap-8">
            <div 
              className={`transform transition-all duration-700 ease-expo ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 block mb-4">
                {t('footer.contact')}
              </span>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }} 
                className="text-3xl text-left text-white font-display font-bold flex items-center gap-3 group"
              >
                {t('nav.discuss')}
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-active:scale-90 transition-transform">
                  <ArrowUpRight size={20}/>
                </div>
              </button>
            </div>

            <div 
              className={`flex items-center justify-between pt-8 border-t border-white/10 transform transition-all duration-700 ease-expo ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="flex gap-4">
                <a href="https://t.me/kutsev_studio" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-gray-400">TG</a>
                <a href="https://instagram.com/kutsev.studio" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-gray-400">IG</a>
                <a href="https://behance.net/kutsev" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-gray-400">BE</a>
              </div>
              <button onClick={toggleLanguage} className="text-sm font-mono font-bold text-white uppercase">
                {language === 'ru' ? 'English' : 'Русский'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};