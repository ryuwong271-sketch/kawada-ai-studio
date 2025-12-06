
import React, { useState } from 'react';
import { Sun, Moon, ChevronDown, Coffee, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const KLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3H9V21H4V3Z" className="fill-primary" />
    <path d="M21 3H15L9 12H15L21 3Z" className="fill-primary" />
    <path d="M21 21H15L9 12H15L21 21Z" className="fill-primary" />
  </svg>
);

const NavDropdown = ({ label, items, onNavigate }: { label: string, items: { label: string, action: string }[], onNavigate: (page: string) => void }) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-2">
        {label}
        <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>
      <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
        <div className="bg-white/90 dark:bg-surface/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden p-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(item.action)}
              className="w-full text-left px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLangActiveStyle = (lang: Language) => {
    switch (lang) {
      case 'en': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/20';
      case 'zh': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 ring-1 ring-red-500/20';
      case 'ms': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/20';
      case 'hi': return 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 ring-1 ring-orange-500/20';
      default: return 'bg-zinc-200 dark:bg-zinc-600 text-zinc-900 dark:text-white';
    }
  };

  const LangBtn = ({ lang, label, fullName }: { lang: Language, label: string, fullName: string }) => {
    const isActive = language === lang;
    const activeStyle = getLangActiveStyle(lang);
    const inactiveStyle = 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5';

    return (
      <button
        onClick={() => setLanguage(lang)}
        aria-label={`Select language: ${fullName}`}
        aria-current={isActive ? 'true' : undefined}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 ${
          isActive ? `${activeStyle} shadow-sm` : inactiveStyle
        }`}
      >
        {label}
      </button>
    );
  };

  const MobileNavItem = ({ label, items, action }: { label: string, items?: { label: string, action: string }[], action?: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="border-b border-zinc-100 dark:border-white/5">
        {items ? (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between py-4 px-4 text-base font-semibold text-zinc-900 dark:text-white active:bg-zinc-50 dark:active:bg-white/5"
            >
              {label}
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
              <div className="bg-zinc-50 dark:bg-black/20 pb-2">
                {items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate(item.action);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => {
              if (action) onNavigate(action);
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-4 px-4 text-base font-semibold text-zinc-900 dark:text-white active:bg-zinc-50 dark:active:bg-white/5"
          >
            {label}
          </button>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-white/10 bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-1 group cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-lg rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
               <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 group-hover:border-primary/50 transition-colors">
                 <div className="p-1 w-full h-full flex items-center justify-center">
                    <KLogo />
                 </div>
               </div>
            </div>
            
            <div className="flex items-baseline select-none">
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-mono">
                    Kawada Ai Studio
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)] ml-2 self-center"></span>
            </div>
          </div>
          
          {/* Middle: Golden Navigation (Desktop - LG+ only) */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors">
              {t('nav.studio')}
            </button>
            
            <NavDropdown 
              label={t('nav.features')}
              onNavigate={onNavigate}
              items={[
                { label: t('nav.feat.magic'), action: 'features' },
                { label: t('nav.feat.remove'), action: 'features' },
                { label: t('nav.feat.style'), action: 'features' },
                { label: t('nav.feat.upscale'), action: 'features' },
                { label: t('nav.feat.vision'), action: 'features' },
              ]}
            />

            <NavDropdown 
              label={t('nav.tutorials')}
              onNavigate={onNavigate}
              items={[
                { label: t('nav.tut.start'), action: 'home' },
                { label: t('nav.tut.tool'), action: 'home' },
                { label: t('nav.tut.industry'), action: 'home' },
              ]}
            />

             <NavDropdown 
              label={t('nav.resources')}
              onNavigate={onNavigate}
              items={[
                { label: t('nav.res.prompt'), action: 'home' },
                { label: t('nav.res.showcase'), action: 'showcase' },
                { label: t('nav.res.blog'), action: 'home' },
              ]}
            />
            
            <button onClick={() => onNavigate('about')} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {t('nav.about')}
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex items-center bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-1 border border-zinc-200 dark:border-white/5 mr-1 sm:mr-2">
                <LangBtn lang="en" label="EN" fullName="English" />
                <LangBtn lang="zh" label="华语" fullName="Chinese (中文)" />
                <LangBtn lang="ms" label="BM" fullName="Malay (Bahasa Melayu)" />
                <LangBtn lang="hi" label="हि" fullName="Hindi (हिंदी)" />
            </div>

            {/* Support Button - Visible on Desktop LG+ */}
            <button
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
                onClick={() => window.open('https://buymeacoffee.com', '_blank')}
            >
                <Coffee className="w-4 h-4" />
                {t('nav.support')}
            </button>

            {/* Mobile Menu Toggle - Visible on Tablet/Mobile (LG down) */}
            <button 
                className="lg:hidden p-2 text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors ml-2 animate-pulse shadow-[0_0_10px_var(--primary)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open menu"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer - High Contrast & Visibility */}
      {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 shadow-2xl overflow-y-auto animate-fade-in z-[60]">
            <div className="flex flex-col pb-20">
               <MobileNavItem label={t('nav.studio')} action="home" />
               <MobileNavItem 
                  label={t('nav.features')}
                  items={[
                    { label: t('nav.feat.magic'), action: 'features' },
                    { label: t('nav.feat.remove'), action: 'features' },
                    { label: t('nav.feat.style'), action: 'features' },
                    { label: t('nav.feat.upscale'), action: 'features' },
                    { label: t('nav.feat.vision'), action: 'features' },
                  ]}
               />
               <MobileNavItem 
                  label={t('nav.tutorials')}
                  items={[
                    { label: t('nav.tut.start'), action: 'home' },
                    { label: t('nav.tut.tool'), action: 'home' },
                    { label: t('nav.tut.industry'), action: 'home' },
                  ]}
               />
               <MobileNavItem 
                  label={t('nav.resources')}
                  items={[
                    { label: t('nav.res.prompt'), action: 'home' },
                    { label: t('nav.res.showcase'), action: 'showcase' },
                    { label: t('nav.res.blog'), action: 'home' },
                  ]}
               />
               <MobileNavItem label={t('nav.about')} action="about" />
               
               <div className="p-6 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 mt-4 border-t border-zinc-100 dark:border-white/5">
                 <div>
                    <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Language / 语言 / Bahasa</p>
                    <div className="grid grid-cols-2 gap-3">
                        <LangBtn lang="en" label="English" fullName="English" />
                        <LangBtn lang="zh" label="华语 (Chinese)" fullName="Chinese" />
                        <LangBtn lang="ms" label="Bahasa Melayu" fullName="Malay" />
                        <LangBtn lang="hi" label="हिंदी (Hindi)" fullName="Hindi" />
                    </div>
                 </div>
                 
                 <Button 
                    className="w-full justify-center shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white border-0 animate-pulse py-4 text-base"
                    icon={<Coffee className="w-5 h-5" />}
                    onClick={() => window.open('https://buymeacoffee.com', '_blank')}
                 >
                    {t('nav.support')}
                 </Button>
               </div>
            </div>
          </div>
      )}
    </nav>
  );
};
