'use client';

import { useI18nStore } from '@/store/useI18n';

export default function LangToggle() {
  const { lang, toggleLang } = useI18nStore();

  return (
    <button
      onClick={toggleLang}
      className="border border-fg px-3 py-1.5 text-sm uppercase hover:bg-black hover:text-white transition-colors font-mono tracking-wider"
      aria-label={`Switch language to ${lang === 'en' ? 'Indonesian' : 'English'}`}
    >
      {lang === 'en' ? 'ID' : 'EN'}
    </button>
  );
}
