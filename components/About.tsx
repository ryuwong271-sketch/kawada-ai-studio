
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Heart, Users, Globe, Lightbulb } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 mobile-landscape:pt-16 pb-20 px-4 max-w-4xl mx-auto min-h-screen relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-zinc-500 hover:text-primary mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('nav.back')}
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 drop-shadow-sm">
          {t('page.about.title')}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {t('about.desc')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-white/5 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{t('about.mission')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('about.mission.text')}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-white/5 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{t('about.community')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('about.community.text')}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-white/5 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{t('about.education')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('about.education.text')}</p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-12 text-center border border-indigo-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}></div>
        
        <div className="relative z-10">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse border border-amber-200 dark:border-amber-700/50">
              <Lightbulb className="w-8 h-8 text-amber-500 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{t('about.vision')}</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              {t('about.vision.text')}
            </p>
        </div>
      </div>
    </div>
  );
};
