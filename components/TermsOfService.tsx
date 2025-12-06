import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate: (page: string) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-zinc-500 hover:text-primary mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('nav.back')}
      </button>

      <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-8 sm:p-12 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-white/5">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary-dark dark:text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {t('page.terms.title')}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            {t('terms.lastUpdated')}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {t('terms.agreement.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('terms.agreement.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {t('terms.ip.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('terms.ip.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {t('terms.accounts.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('terms.accounts.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {t('terms.limits.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('terms.limits.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {t('terms.termination.title')}
            </h2>
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-500/10">
              <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
                {t('terms.termination.text')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {t('terms.changes.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('terms.changes.text')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};