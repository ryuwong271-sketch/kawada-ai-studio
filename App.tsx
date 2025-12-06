
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImageEditor } from './components/ImageEditor';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Features } from './components/Features';
import { Showcase } from './components/Showcase';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy onNavigate={setCurrentPage} />;
      case 'terms':
        return <TermsOfService onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'features':
        return <Features onNavigate={setCurrentPage} />;
      case 'showcase':
        return <Showcase onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <ImageEditor />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-zinc-900 dark:text-slate-50 selection:bg-primary/30 selection:text-zinc-900 flex flex-col">
      <Navbar onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#020617] pt-16 pb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-mono flex items-center gap-2 mb-4">
                      Kawada Ai Studio
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        {t('hero.subtitle').split('.')[0]}.
                    </p>
                </div>
                
                <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.product')}</h3>
                    <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('tool.magic')}</button></li>
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('tool.removeBg')}</button></li>
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('tool.style')}</button></li>
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('tool.upscale')}</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.learn')}</h3>
                    <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('nav.tutorials')}</button></li>
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('nav.res.prompt')}</button></li>
                        <li><button onClick={() => setCurrentPage('showcase')} className="hover:text-primary transition-colors text-left">{t('nav.res.showcase')}</button></li>
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors text-left">{t('nav.res.blog')}</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.company')}</h3>
                    <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors text-left">{t('nav.about')}</button></li>
                        <li><button onClick={() => setCurrentPage('contact')} className="hover:text-primary transition-colors text-left">{t('footer.contact')}</button></li>
                        <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-primary transition-colors text-left">{t('footer.privacy')}</button></li>
                        <li><button onClick={() => setCurrentPage('terms')} className="hover:text-primary transition-colors text-left">{t('footer.terms')}</button></li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-zinc-500 text-sm">
                    {t('footer.rights')}
                </div>
                <div className="flex gap-4">
                    {/* Social icons placeholder */}
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
