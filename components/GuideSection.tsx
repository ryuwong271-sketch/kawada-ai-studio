
import React, { useState } from 'react';
import { Wand2, Eraser, Sliders, Maximize, ScanEye, ChevronRight, Upload, Command, ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeatureDetailView = ({ activeCard, t, onUploadClick, onPresetClick }: { activeCard: any, t: any, onUploadClick?: () => void, onPresetClick?: (toolId: string, presetLabel: string) => void }) => (
  <div className="animate-fade-in bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden relative mt-4 lg:mt-0">
     <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activeCard.gradient} opacity-50`}></div>
    
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Workflow Column - Simplified & Stacked */}
        <div className="flex-1 flex flex-col gap-4 relative z-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Command className="w-5 h-5 text-slate-400" />
                {t('guide.workflow.title')}
            </h3>
            
            {/* Upload Card - Content Cleared */}
            <div 
                onClick={onUploadClick}
                className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-md transition-all shadow-sm cursor-pointer group/step1 border-dashed min-h-[100px] flex flex-col items-center justify-center opacity-70 hover:opacity-100"
            >
                <Upload className="w-8 h-8 text-primary mb-2" />
                <h4 className="text-slate-900 dark:text-slate-200 font-medium text-sm text-center opacity-50">{t('guide.workflow.step1.hint')}</h4>
            </div>

            {/* Visual Connector */}
            <div className="flex justify-center -my-2 z-0">
                <ArrowDown className="w-6 h-6 text-slate-300 dark:text-slate-600 animate-bounce" />
            </div>

            {/* Workspace Card - Dynamic Color & Animation */}
            <div className={`bg-white dark:bg-slate-900 rounded-lg p-6 border ${activeCard.theme.containerBorder || 'border-slate-200 dark:border-slate-800'} ${activeCard.theme.containerBg || ''} transition-colors shadow-sm`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className={`${activeCard.theme.iconColor} animate-pulse`}>{activeCard.icon}</div>
                    <h4 className="text-slate-900 dark:text-slate-200 font-medium">{t('guide.workflow.step2')}</h4>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('guide.workflow.step2.desc')}</p>
            </div>
        </div>

        {/* Presets Grid Column */}
        <div className="lg:w-2/3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <Sliders className={`w-5 h-5 ${activeCard.theme.iconColor}`} />
                {t('guide.presets.title')}
            </h3>
            {/* Dynamically styled dashed border container */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 border-2 border-dashed rounded-xl p-4 ${activeCard.theme.containerBorder} ${activeCard.theme.containerBg}`}>
                {activeCard.presets.map((preset: any, idx: number) => (
                    <div 
                        key={idx} 
                        onClick={() => onPresetClick && onPresetClick(activeCard.id, preset.label)}
                        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 ${activeCard.theme.hoverBorder} hover:shadow-md cursor-pointer transition-all group/preset`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-bold ${activeCard.theme.titleColor} group-hover/preset:opacity-80`}>
                                {t(preset.label)}
                            </span>
                            <ChevronRight className={`w-4 h-4 ${activeCard.theme.titleColor} opacity-0 group-hover/preset:opacity-100 transition-opacity`} />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {t(preset.desc)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  </div>
);

export interface GuideSectionProps {
    onUploadClick?: () => void;
    onPresetClick?: (toolId: string, presetLabel: string) => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ onUploadClick, onPresetClick }) => {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const cards = [
    {
      id: 'magic',
      icon: <Wand2 className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      titleKey: 'guide.magic.title',
      descKey: 'guide.magic.desc',
      gradient: 'from-purple-500/20 to-indigo-500/5',
      theme: {
        activeBorder: 'border-purple-500',
        activeShadow: 'shadow-[0_0_20px_rgba(168,85,247,0.25)]',
        activeIconBg: 'bg-purple-500/20 border-purple-500/20',
        containerBorder: 'border-purple-400/50 dark:border-purple-600/50',
        containerBg: 'bg-purple-50/50 dark:bg-purple-900/10',
        titleColor: 'text-purple-600 dark:text-purple-400',
        hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
        iconColor: 'text-purple-500',
        stepBadge: 'bg-purple-500'
      },
      presets: [
        { label: 'preset.bluesky', desc: 'preset.whiteBg.desc' }, 
        { label: 'preset.sunset', desc: 'preset.cinematic.desc' },
        { label: 'preset.winter', desc: 'preset.cyberpunk.desc' },
        { label: 'preset.suit', desc: 'preset.portrait.desc' }
      ]
    },
    {
      id: 'bg',
      icon: <Eraser className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
      titleKey: 'guide.bg.title',
      descKey: 'guide.bg.desc',
      gradient: 'from-pink-500/20 to-rose-500/5',
      theme: {
        activeBorder: 'border-pink-500',
        activeShadow: 'shadow-[0_0_20px_rgba(236,72,153,0.25)]',
        activeIconBg: 'bg-pink-500/20 border-pink-500/20',
        containerBorder: 'border-pink-400/50 dark:border-pink-600/50',
        containerBg: 'bg-pink-50/50 dark:bg-pink-900/10',
        titleColor: 'text-pink-600 dark:text-pink-400',
        hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
        iconColor: 'text-pink-500',
        stepBadge: 'bg-pink-500'
      },
      presets: [
        { label: 'preset.watermark', desc: 'preset.watermark.desc' },
        { label: 'preset.text', desc: 'preset.text.desc' },
        { label: 'preset.people', desc: 'preset.people.desc' },
        { label: 'preset.object', desc: 'preset.object.desc' }
      ]
    },
    {
      id: 'style',
      icon: <Sliders className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      titleKey: 'guide.style.title',
      descKey: 'guide.style.desc',
      gradient: 'from-blue-500/20 to-cyan-500/5',
      theme: {
        activeBorder: 'border-blue-500',
        activeShadow: 'shadow-[0_0_20px_rgba(59,130,246,0.25)]',
        activeIconBg: 'bg-blue-500/20 border-blue-500/20',
        containerBorder: 'border-blue-400/50 dark:border-blue-600/50',
        containerBg: 'bg-blue-50/50 dark:bg-blue-900/10',
        titleColor: 'text-blue-600 dark:text-blue-400',
        hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
        iconColor: 'text-blue-500',
        stepBadge: 'bg-blue-500'
      },
      presets: [
        { label: 'preset.vintage', desc: 'preset.fixLight.desc' },
        { label: 'preset.hdr', desc: 'preset.sharp.desc' },
        { label: 'preset.vibrant', desc: 'preset.vibrant.desc' },
        { label: 'preset.bw', desc: 'preset.bw.desc' }
      ]
    },
    {
      id: 'upscale',
      icon: <Maximize className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
      titleKey: 'guide.upscale.title',
      descKey: 'guide.upscale.desc',
      gradient: 'from-amber-500/20 to-orange-500/5',
      theme: {
        activeBorder: 'border-amber-500',
        activeShadow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
        activeIconBg: 'bg-amber-500/20 border-amber-500/20',
        containerBorder: 'border-amber-400/50 dark:border-amber-600/50',
        containerBg: 'bg-amber-50/50 dark:bg-amber-900/10',
        titleColor: 'text-amber-600 dark:text-amber-400',
        hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-600',
        iconColor: 'text-amber-500',
        stepBadge: 'bg-amber-500'
      },
      presets: [
        { label: 'preset.4k', desc: 'preset.4k.desc' },
        { label: 'preset.portrait', desc: 'preset.portrait.desc' },
        { label: 'preset.restore', desc: 'preset.restore.desc' },
        { label: 'preset.illus', desc: 'preset.illus.desc' }
      ]
    },
    {
      id: 'vision',
      icon: <ScanEye className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
      titleKey: 'guide.vision.title',
      descKey: 'guide.vision.desc',
      gradient: 'from-emerald-500/20 to-teal-500/5',
      theme: {
        activeBorder: 'border-emerald-500',
        activeShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
        activeIconBg: 'bg-emerald-500/20 border-emerald-500/20',
        containerBorder: 'border-emerald-400/50 dark:border-emerald-600/50',
        containerBg: 'bg-emerald-50/50 dark:bg-emerald-900/10',
        titleColor: 'text-emerald-600 dark:text-emerald-400',
        hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
        iconColor: 'text-emerald-500',
        stepBadge: 'bg-emerald-500'
      },
      presets: [
        { label: 'preset.analyze.general', desc: 'preset.analyze.general.desc' },
        { label: 'preset.analyze.objects', desc: 'preset.analyze.objects.desc' },
        { label: 'preset.analyze.text', desc: 'preset.analyze.text.desc' },
        { label: 'preset.analyze.marketing', desc: 'preset.analyze.marketing.desc' }
      ]
    }
  ];

  const activeCard = cards.find(c => c.id === activeFeature);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-24 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{t('guide.title')}</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{t('guide.subtitle')}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <React.Fragment key={card.id}>
            <div 
              onClick={() => setActiveFeature(activeFeature === card.id ? null : card.id)}
              className={`group relative bg-white dark:bg-surface/50 border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer
                ${activeFeature === card.id 
                  ? `${card.theme.activeBorder} ${card.theme.activeShadow} dark:bg-surface/80` 
                  : 'border-slate-200 dark:border-white/5 hover:border-primary/20 hover:shadow-lg'
                }
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border shadow-inner transition-colors
                  ${activeFeature === card.id ? card.theme.activeIconBg : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5'}
                `}>
                  {card.icon}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 transition-colors ${activeFeature === card.id ? card.theme.titleColor : 'text-slate-900 dark:text-white'}`}>
                  {t(card.titleKey)}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                  {t(card.descKey)}
                </p>
                
                <div className="flex items-center text-xs font-medium text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mt-auto">
                  <span className={`w-6 h-px mr-2 transition-all ${activeFeature === card.id ? `w-10 ${card.theme.stepBadge}` : 'bg-slate-300 dark:bg-white/20 group-hover:w-10'}`}></span>
                  <ChevronRight className={`w-3 h-3 transition-all ${activeFeature === card.id ? `opacity-100 translate-x-0 ${card.theme.titleColor}` : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Detail View */}
            {activeFeature === card.id && (
                <div className="lg:hidden animate-fade-in w-full">
                    <FeatureDetailView activeCard={card} t={t} onUploadClick={onUploadClick} onPresetClick={onPresetClick} />
                </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop Detail View */}
      {activeCard && (
        <div className="hidden lg:block">
            <FeatureDetailView activeCard={activeCard} t={t} onUploadClick={onUploadClick} onPresetClick={onPresetClick} />
        </div>
      )}
    </div>
  );
};
