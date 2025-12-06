
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Wand2, Eraser, Sliders, Maximize, ScanEye, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';

interface FeaturesProps {
  onNavigate: (page: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const tools = [
    {
      icon: <Wand2 className="w-8 h-8 text-purple-500" />,
      titleKey: 'nav.feat.magic',
      descKey: 'feat.card.magic.desc',
      color: 'bg-purple-500/10 border-purple-200 dark:border-purple-800'
    },
    {
      icon: <Eraser className="w-8 h-8 text-pink-500" />,
      titleKey: 'nav.feat.remove',
      descKey: 'feat.card.remove.desc',
      color: 'bg-pink-500/10 border-pink-200 dark:border-pink-800'
    },
    {
      icon: <Sliders className="w-8 h-8 text-blue-500" />,
      titleKey: 'nav.feat.style',
      descKey: 'feat.card.style.desc',
      color: 'bg-blue-500/10 border-blue-200 dark:border-blue-800'
    },
    {
      icon: <Maximize className="w-8 h-8 text-amber-500" />,
      titleKey: 'nav.feat.upscale',
      descKey: 'feat.card.upscale.desc',
      color: 'bg-amber-500/10 border-amber-200 dark:border-amber-800'
    },
    {
      icon: <ScanEye className="w-8 h-8 text-emerald-500" />,
      titleKey: 'nav.feat.vision',
      descKey: 'feat.card.vision.desc',
      color: 'bg-emerald-500/10 border-emerald-200 dark:border-emerald-800'
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-zinc-500 hover:text-primary mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('nav.back')}
      </button>

      {/* Hero Section */}
      <div className="text-center mb-16 sm:mb-24">
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
          {t('feat.hero.title')}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {t('feat.hero.subtitle')}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {tools.map((tool, idx) => (
          <div key={idx} className={`p-8 rounded-2xl border ${tool.color} bg-white dark:bg-zinc-900/50 hover:-translate-y-1 transition-transform shadow-sm`}>
            <div className="mb-6">{tool.icon}</div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{t(tool.titleKey)}</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed min-h-[3rem]">
              {t(tool.descKey)}
            </p>
            <button 
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              {t('feat.card.cta')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-lg mb-24">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5">
                <th className="p-6 font-bold text-zinc-900 dark:text-white min-w-[120px]">{t('feat.table.col.use')}</th>
                <th className="p-6 font-semibold text-zinc-700 dark:text-zinc-300 min-w-[150px]">{t('feat.table.col.magic')}</th>
                <th className="p-6 font-semibold text-zinc-700 dark:text-zinc-300 min-w-[150px]">{t('feat.table.col.remove')}</th>
                <th className="p-6 font-semibold text-zinc-700 dark:text-zinc-300 min-w-[150px]">{t('feat.table.col.style')}</th>
                <th className="p-6 font-semibold text-zinc-700 dark:text-zinc-300 min-w-[150px]">{t('feat.table.col.upscale')}</th>
                <th className="p-6 font-semibold text-zinc-700 dark:text-zinc-300 min-w-[150px]">{t('feat.table.col.vision')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
              <tr>
                <td className="p-6 font-bold text-zinc-900 dark:text-white bg-zinc-50/30 dark:bg-white/5">{t('feat.table.row.core')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.magic.core')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.remove.core')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.style.core')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.upscale.core')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.vision.core')}</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-zinc-900 dark:text-white bg-zinc-50/30 dark:bg-white/5">{t('feat.table.row.pain')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.magic.pain')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.remove.pain')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.style.pain')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.upscale.pain')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.vision.pain')}</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-zinc-900 dark:text-white bg-zinc-50/30 dark:bg-white/5">{t('feat.table.row.scene')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.magic.scene')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.remove.scene')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.style.scene')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.upscale.scene')}</td>
                <td className="p-6 text-zinc-600 dark:text-zinc-400">{t('feat.table.vision.scene')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-3xl p-12 md:p-20 border border-primary/20">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
          {t('feat.cta.title')}
        </h2>
        <Button 
            size="lg" 
            className="rounded-full px-12 py-4 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            onClick={() => onNavigate('home')}
        >
            {t('feat.cta.btn')}
        </Button>
        <p className="mt-6 text-zinc-500 dark:text-zinc-400 font-medium">
          {t('feat.cta.sub')}
        </p>
      </div>
    </div>
  );
};
