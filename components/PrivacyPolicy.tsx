import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
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
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {t('page.privacy.title')}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            {t('privacy.lastUpdated')}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              {t('privacy.intro.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('privacy.intro.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              {t('privacy.data.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-7 mb-6">
              {t('privacy.data.text')}
            </p>
            <ul className="space-y-3">
              {[t('privacy.data.list1'), t('privacy.data.list2'), t('privacy.data.list3')].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              {t('privacy.use.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('privacy.use.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              {t('privacy.security.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg">
              {t('privacy.security.text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              {t('privacy.contact.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-8 text-lg bg-zinc-50 dark:bg-white/5 p-6 rounded-xl border border-zinc-100 dark:border-white/5">
              {t('privacy.contact.text')} <br />
              <span className="block mt-2 font-medium text-primary">support@kenaistudio.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};