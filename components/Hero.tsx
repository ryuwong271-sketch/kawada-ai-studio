import React from 'react';
import { Zap, Wand2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative pt-32 pb-12 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full opacity-60 dark:opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md text-slate-600 dark:text-slate-300 text-xs font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {t('hero.poweredBy')}
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 animate-slide-up [animation-delay:100ms]">
          {t('hero.titleLine1')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-600 dark:to-sky-300">
             {t('hero.titleLine2')}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed animate-slide-up [animation-delay:200ms]">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 animate-slide-up [animation-delay:300ms]">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
             <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-white/5">
                <Zap className="w-3 h-3 text-sky-500" />
             </div>
             <span>{t('hero.fast')}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
             <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-white/5">
                <Wand2 className="w-3 h-3 text-indigo-500" />
             </div>
             <span>{t('hero.ai')}</span>
          </div>
           <div className="flex items-center gap-2 text-slate-500 text-sm">
             <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-white/5">
                <ImageIcon className="w-3 h-3 text-cyan-500" />
             </div>
             <span>{t('hero.vision')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};