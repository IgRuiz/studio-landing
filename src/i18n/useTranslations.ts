import { useLanguage } from '../contexts/LanguageContext';
import { translations } from './translations';

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};
