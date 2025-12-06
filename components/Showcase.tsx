
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Wand2, Eraser, Sliders, Maximize } from 'lucide-react';
import { Button } from './ui/Button';

interface ShowcaseProps {
  onNavigate: (page: string) => void;
}

// Placeholder images since no backend
const SAMPLE_IMAGES = [
  { id: 1, type: 'portrait', tool: 'magic', before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fit=crop&sepia=1', label: 'Cinematic Portrait' },
  { id: 2, type: 'product', tool: 'bg', before: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', after: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&bg=white', label: 'E-commerce White BG' },
  { id: 3, type: 'landscape', tool: 'style', before: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', after: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&sat=100', label: 'Vibrant Nature' },
  { id: 4, type: 'creative', tool: 'magic', before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&blur=5', label: 'Cyberpunk Edits' },
  { id: 5, type: 'product', tool: 'upscale', before: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', after: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', label: '4K Upscale' },
  { id: 6, type: 'portrait', tool: 'remove', before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', after: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', label: 'Remove People' },
  { id: 7, type: 'creative', tool: 'style', before: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400', after: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400', label: 'Anime Style' },
  { id: 8, type: 'landscape', tool: 'magic', before: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', after: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', label: 'Sunset Filter' },
];

export const Showcase: React.FC<ShowcaseProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? SAMPLE_IMAGES 
    : SAMPLE_IMAGES.filter(img => img.type === filter);

  const categories = [
    { id: 'all', label: t('showcase.filter.all') },
    { id: 'portrait', label: t('showcase.filter.portrait') },
    { id: 'product', label: t('showcase.filter.product') },
    { id: 'landscape', label: t('showcase.filter.landscape') },
    { id: 'creative', label: t('showcase.filter.creative') },
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

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
          {t('showcase.hero.title')}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {t('showcase.hero.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat.id 
                ? 'bg-primary text-slate-900 shadow-lg shadow-primary/25 scale-105' 
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img) => (
          <div key={img.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900">
            <img src={img.after} alt={img.label} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{img.tool}</span>
                <h3 className="text-white font-bold text-lg mb-2">{img.label}</h3>
                <div className="flex items-center gap-2">
                    <Button size="sm" className="w-full" onClick={() => onNavigate('home')}>
                        {t('showcase.card.try')}
                    </Button>
                </div>
            </div>
            
            {/* Compare Badge */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {t('showcase.card.after')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
