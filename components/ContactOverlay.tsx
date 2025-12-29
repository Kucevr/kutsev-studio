import React, { useState, useEffect } from 'react';
import { X, Send, Check } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../LanguageContext';
import { LottieAnimation } from './Animations';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputField = ({ label, type = "text", placeholder, value, onChange }: any) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2 relative group">
      <label className={`text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${focused ? 'text-brand-accent' : 'text-gray-400'}`}>
        {label}
      </label>
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            rows={4}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl font-light text-white focus:outline-none placeholder:text-white/10 resize-none transition-colors"
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-4xl font-display text-white focus:outline-none placeholder:text-white/10 transition-colors"
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}
        <div className={`absolute bottom-0 left-0 h-[2px] bg-brand-accent transition-all duration-500 ease-out ${focused || value.length > 0 ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
      </div>
    </div>
  );
};

export const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', budget: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSending(false);
        setFormState({ name: '', email: '', budget: '', message: '' });
      }, 500);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div 
        className="absolute inset-0 bg-brand-black transition-opacity duration-500" 
        onClick={onClose}
      />

      <div className="relative w-full h-full md:w-[95%] md:h-[95%] bg-[#0a0a0a] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up border border-white/5">
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-40">
          <button 
            onPointerDown={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close Contact Form"
            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:text-black md:transition-all md:duration-300 border border-white/10 touch-none outline-none active:scale-90 transition-transform will-change-transform"
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-full md:w-[35%] bg-brand-accent/10 p-8 md:p-16 text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5 shrink-0">
           <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none animate-pulse-slow"></div>
           
           <div className="relative z-10">
             <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-8">
               {t('contact.startJourney')}
             </div>
             <h2 className="text-2xl md:text-5xl font-display font-bold leading-[0.9] mb-4 md:mb-8">
               {t('contact.buildFuture')}
             </h2>
             <p className="text-white/70 font-light text-sm md:text-lg max-w-xs leading-relaxed">
               {t('contact.desc')}
             </p>
           </div>

           <div className="hidden md:block space-y-8 relative z-10">
             <div>
               <h4 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">{t('contact.contacts')}</h4>
               <a href="mailto:hello@kutsev.studio" className="text-xl font-display hover:text-brand-accent transition-colors block">hello@kutsev.studio</a>
               <a href="tel:+79000000000" className="text-xl font-display hover:text-brand-accent transition-colors block mt-1">+7 (900) 000-00-00</a>
             </div>
             <div>
               <h4 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">{t('contact.office')}</h4>
               <p className="text-lg text-white/90">Minsk • Moscow</p>
             </div>
           </div>
        </div>

        <div className="w-full md:w-[65%] relative bg-[#050505] flex-grow overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
          
          <div className="relative h-full overflow-y-auto p-6 md:p-24 custom-scrollbar flex flex-col">
            
            {!isSubmitted ? (
              <form className="max-w-2xl mx-auto space-y-8 md:space-y-12 w-full" onSubmit={handleSubmit}>
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <InputField 
                    label={t('contact.form.name')} 
                    placeholder={t('contact.form.namePh')}
                    value={formState.name}
                    onChange={(e: any) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <InputField 
                    label={t('contact.form.email')}
                    type="email"
                    placeholder={t('contact.form.emailPh')}
                    value={formState.email}
                    onChange={(e: any) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <label className="text-[10px] md:text-sm font-mono text-gray-400 uppercase tracking-wider block mb-4">{t('contact.form.budget')}</label>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {['< 1000 BYN', '1000 - 3000 BYN', '3000 - 7000 BYN', '> 7000 BYN'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormState({...formState, budget: opt})}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-full border text-xs md:text-base transition-all duration-300 ${
                          formState.budget === opt 
                            ? 'bg-white text-black border-white scale-105 shadow-lg shadow-white/10' 
                            : 'border-white/10 text-gray-500 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <InputField 
                    label={t('contact.form.message')}
                    type="textarea"
                    placeholder={t('contact.form.messagePh')}
                    value={formState.message}
                    onChange={(e: any) => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <div className="pt-4 md:pt-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                  <Magnetic strength={0.4} className="inline-block w-full md:w-auto">
                    <button 
                      type="submit"
                      disabled={isSending}
                      className="group relative w-full md:w-auto px-10 py-5 md:px-12 md:py-6 bg-white text-black rounded-full font-bold text-lg md:text-xl overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                          {isSending ? t('contact.form.sending') : t('contact.form.send')} 
                          {!isSending && <Send size={20} />}
                        </span>
                    </button>
                  </Magnetic>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in-up">
                <div className="relative mb-8 w-48 h-48">
                  {/* Lottie Success Animation - Minimalist Checkmark */}
                  <LottieAnimation 
                    path="https://lottie.host/8533361b-0060-4432-b10a-099742969591/as79v6v6v6.json"
                    className="w-full h-full"
                    loop={false}
                  />
                  <div className="absolute inset-0 bg-brand-accent/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
                </div>
                
                <h3 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('contact.success.title')}</h3>
                <p className="text-gray-400 text-xl max-w-md font-light leading-relaxed mb-12">
                  {t('contact.success.desc')} <span className="text-white">{formState.name}</span>. <br/>
                  {t('contact.success.desc2')}
                </p>

                <Magnetic strength={0.4}>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-bold"
                  >
                    {t('contact.success.back')}
                  </button>
                </Magnetic>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};