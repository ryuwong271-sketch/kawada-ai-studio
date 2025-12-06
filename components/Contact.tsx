import React, { useState } from 'react';
import { Mail, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-zinc-500 hover:text-primary mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('nav.back')}
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">{t('page.contact.title')}</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">{t('page.contact.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-zinc-900/50 rounded-2xl p-8 border border-zinc-200 dark:border-white/5 shadow-xl">
        {/* Contact Info */}
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">{t('contact.getInTouch')}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {t('contact.desc')}
                </p>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Mail className="w-5 h-5" />
                    </div>
                    <span>support@kenaistudio.com</span>
                </div>
                 <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <span>@kenaistudio</span>
                </div>
            </div>
        </div>

        {/* Form */}
        <div>
            {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-500/20">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                        <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">{t('contact.sent.title')}</h3>
                    <p className="text-green-600 dark:text-green-300">{t('contact.sent.desc')}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{t('contact.form.name')}</label>
                        <input type="text" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{t('contact.form.email')}</label>
                        <input type="email" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{t('contact.form.message')}</label>
                        <textarea required rows={4} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"></textarea>
                    </div>
                    <Button type="submit" className="w-full justify-center">
                        {t('contact.form.send')}
                    </Button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};