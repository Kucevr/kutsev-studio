import React, { useState } from 'react';
import { ArrowRight, Plus, Zap, Layers, ShoppingCart, Globe, Search, Image, Smartphone, RefreshCw, FileText, Clock, Box, Star, Crown, CreditCard, Edit3, ShieldCheck } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../LanguageContext';

interface PricingProps {
  onContactClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onContactClick }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'main' | 'packages' | 'addons' | 'details'>('main');

  const mainSolutions = [
    {
      title: t('pricing.solutions.landing.title'),
      desc: t('pricing.solutions.landing.desc'),
      price: `${t('pricing.from')} 800 BYN`,
      duration: `7-14 ${t('pricing.days')}`,
      icon: <Zap size={20} />,
      features: [t('pricing.features.design'), t('pricing.features.resp'), t('pricing.features.forms'), t('pricing.features.seo')]
    },
    {
      title: t('pricing.solutions.business.title'),
      desc: t('pricing.solutions.business.desc'),
      price: `${t('pricing.from')} 1200 BYN`,
      duration: `14-21 ${t('pricing.days')}`,
      icon: <Box size={20} />,
      features: [t('pricing.features.grid'), t('pricing.features.copy'), t('pricing.features.inter')]
    },
    {
      title: t('pricing.solutions.corp.title'),
      desc: t('pricing.solutions.corp.desc'),
      price: `${t('pricing.from')} 3500 BYN`,
      duration: `21-45 ${t('pricing.days')}`,
      icon: <Layers size={20} />,
      features: [t('pricing.features.sys'), t('pricing.features.cms'), t('pricing.features.anim'), t('pricing.features.crm')]
    },
    {
      title: t('pricing.solutions.shop.title'),
      desc: t('pricing.solutions.shop.desc'),
      price: `${t('pricing.from')} 5000 BYN`,
      duration: `30-60 ${t('pricing.days')}`,
      icon: <ShoppingCart size={20} />,
      features: [t('pricing.features.catalog'), t('pricing.features.pay'), t('pricing.features.account'), t('pricing.features.filters')]
    }
  ];

  const packages = [
    {
      title: t('pricing.packages_data.starter.title'),
      price: '1200-1800 BYN',
      icon: <Star size={24} />,
      desc: t('pricing.packages_data.starter.desc'),
      features: [t('pricing.features.landing'), t('pricing.features.hosting'), t('pricing.features.training')]
    },
    {
      title: t('pricing.packages_data.business.title'),
      price: '3500-5500 BYN',
      icon: <Crown size={24} />,
      desc: t('pricing.packages_data.business.desc'),
      features: [t('pricing.features.corp'), t('pricing.features.compSeo'), t('pricing.features.support3'), t('pricing.features.crm')]
    },
    {
      title: t('pricing.packages_data.premium.title'),
      price: '7000-12000 BYN',
      icon: <Star size={24} />,
      desc: t('pricing.packages_data.premium.desc'),
      features: [t('pricing.features.shop'), t('pricing.features.webgl'), t('pricing.features.support6'), t('pricing.features.app')]
    }
  ];

  const addons = [
    { title: t('pricing.addons_data.copy'), price: '30-60 BYN', unit: t('pricing.units.chars'), icon: <FileText size={16} /> },
    { title: t('pricing.addons_data.multi'), price: '100-300 BYN', unit: t('pricing.units.lang'), icon: <Globe size={16} /> },
    { title: t('pricing.addons_data.seo'), price: '400-800 BYN', unit: t('pricing.units.base'), icon: <Search size={16} /> },
    { title: t('pricing.addons_data.photo'), price: '80-150 BYN', unit: t('pricing.units.pcs'), icon: <Image size={16} /> },
    { title: t('pricing.addons_data.page'), price: '150-300 BYN', unit: t('pricing.units.page'), icon: <Plus size={16} /> },
    { title: t('pricing.addons_data.redesign'), price: `${t('pricing.from')} 1200 BYN`, unit: t('pricing.units.project'), icon: <RefreshCw size={16} /> },
    { title: t('pricing.addons_data.mobile'), price: '300-600 BYN', unit: t('pricing.units.project'), icon: <Smartphone size={16} /> },
    { title: t('pricing.addons_data.changes'), price: '50-80 BYN', unit: t('pricing.units.hour'), icon: <Clock size={16} /> },
    { title: t('pricing.addons_data.support'), price: `150-300 BYN/${t('pricing.units.month')}`, unit: t('pricing.units.month'), icon: <Layers size={16} /> },
  ];

  return (
    <section className="py-24 md:py-40 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <h2 className="text-sm font-mono text-brand-accent uppercase tracking-[0.3em] mb-6 animate-fade-in">
            {t('pricing.tag')}
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-semibold leading-tight mb-8 animate-fade-in-up">
            {t('pricing.title1')} <br /> 
            <span className="text-white/40">{t('pricing.title2')}</span>
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-16 border-b border-white/10">
          {[
            { id: 'main', label: t('pricing.tabs.main') },
            { id: 'packages', label: t('pricing.tabs.packages') },
            { id: 'addons', label: t('pricing.tabs.addons') },
            { id: 'details', label: t('pricing.tabs.details') }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs font-mono uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent" />}
            </button>
          ))}
        </div>

        <div className="min-h-[600px]">
          {activeTab === 'main' && (
            <div className="space-y-4 animate-fade-in">
              <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_0.8fr_0.8fr_auto] gap-8 px-8 py-4 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                <div>{t('pricing.table.type')}</div>
                <div>{t('pricing.table.features')}</div>
                <div>{t('pricing.table.duration')}</div>
                <div>{t('pricing.table.price')}</div>
                <div className="w-[140px]"></div>
              </div>

              {mainSolutions.map((item, index) => (
                <div 
                  key={index}
                  className="group relative grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr_0.8fr_0.8fr_auto] gap-4 md:gap-8 items-center px-6 md:px-8 py-8 md:py-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold">{item.title}</h4>
                      <p className="text-[10px] text-white/30 mt-1 hidden md:block">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((f, i) => (
                      <span key={i} className="text-[9px] font-mono uppercase tracking-tighter px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-mono text-white/40">
                    <Clock size={14} className="text-brand-accent/50" />
                    {item.duration}
                  </div>

                  <div className="text-2xl font-display font-bold text-brand-accent">
                    {item.price}
                  </div>

                  <div className="md:w-[160px]">
                    <Magnetic strength={0.15}>
                      <button 
                        onClick={onContactClick}
                        className="group/btn relative w-full py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(55,88,249,0.3)]"
                      >
                        <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-expo" />
                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-black">
                          {t('pricing.order')}
                          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </Magnetic>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
              {packages.map((item, index) => (
                <div 
                  key={index}
                  className="relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col"
                >
                  <div className="mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 text-brand-accent">
                      {item.icon}
                    </div>
                    <h4 className="text-3xl font-display font-bold mb-2">{item.title}</h4>
                    <p className="text-white/40 text-sm font-light">{item.desc}</p>
                  </div>

                  <div className="text-4xl font-display font-bold text-white mb-8">
                    {item.price}
                  </div>

                  <ul className="space-y-4 mb-12 flex-grow">
                    {item.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/60 text-sm font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Magnetic strength={0.2}>
                    <button 
                      onClick={onContactClick}
                      className="w-full py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all bg-white/5 text-white hover:bg-white hover:text-black border border-white/10"
                    >
                      {t('pricing.select')}
                    </button>
                  </Magnetic>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'addons' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {addons.map((item, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-brand-accent/20 transition-all duration-500 group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/40 group-hover:text-brand-accent group-hover:bg-brand-accent/10 transition-all duration-500 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-brand-accent/5 border border-brand-accent/10 text-[10px] font-mono text-brand-accent uppercase tracking-wider">
                      {item.unit}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h5 className="text-lg font-display font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h5>
                    <div className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors duration-500">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-12 animate-fade-in">
              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'payment', icon: <CreditCard size={20} /> },
                  { key: 'urgency', icon: <Zap size={20} /> },
                  { key: 'revisions', icon: <Edit3 size={20} /> },
                  { key: 'warranty', icon: <ShieldCheck size={20} /> }
                ].map((item) => (
                  <div key={item.key} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex gap-6 items-start hover:bg-white/[0.04] transition-colors duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold mb-2">{t(`pricing.notes.${item.key}.title`)}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{t(`pricing.notes.${item.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Details */}
              <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
                <h4 className="text-2xl font-display font-bold mb-8 px-2">{t('pricing.tabs.addons')} — {t('pricing.tabs.details')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  {[
                    'copy', 'multi', 'seo', 'photo', 'page', 'redesign', 'mobile', 'changes', 'support'
                  ].map((key) => (
                    <div key={key} className="group">
                      <h5 className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-brand-accent" />
                        {t(`pricing.addons_data.${key}`)}
                      </h5>
                      <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                        {t(`pricing.details_data.${key}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-white/30 text-[10px] font-mono uppercase tracking-[0.2em]">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            {t('pricing.footerNote')}
          </div>
          <div className="flex gap-8">
            {['React 19', 'WebGL', 'Tailwind 4', 'Figma'].map(tech => (
              <span key={tech} className="text-[10px] font-mono text-white/10 uppercase tracking-[0.3em]">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
