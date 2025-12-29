import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { LottieAnimation } from './Animations';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1; 
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  if (progress > 100 && !isExiting) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-brand-black text-white px-8 py-12 transition-transform duration-[800ms] cubic-bezier(0.76, 0, 0.24, 1) will-change-transform ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="w-full flex justify-between items-start opacity-50 font-mono text-xs uppercase tracking-widest">
        <span>Kutsev Studio</span>
        <span>Est. 2025</span>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Abstract Tech Scanning Animation */}
        <div className="w-64 h-64 mb-8 opacity-60 mix-blend-screen">
          <LottieAnimation 
            path="https://lottie.host/54ae0339-714d-4064-bb50-425733c37af0/74v6v6v6v6.json" 
            className="w-full h-full"
          />
        </div>

        <span className="text-[12vw] md:text-[20vw] font-display font-bold leading-none tracking-tighter tabular-nums">
          {Math.min(progress, 100)}%
        </span>
        <div className="absolute -bottom-8 left-0 w-full h-px bg-white/20 overflow-hidden">
           <div 
             className="h-full bg-brand-accent transition-all duration-100 ease-out"
             style={{ width: `${Math.min(progress, 100)}%` }}
           />
        </div>
      </div>

      <div className="w-full flex justify-between items-end overflow-hidden">
         <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-gray-500 uppercase">{t('preloader.system')}</span>
            <span className="font-display text-xl">{progress < 100 ? t('preloader.init') : t('preloader.ready')}</span>
         </div>
         <div className="font-mono text-xs text-gray-500 uppercase text-right hidden md:block">
            {t('preloader.assets')} <br/>
            {t('preloader.opt')}
         </div>
      </div>
    </div>
  );
};