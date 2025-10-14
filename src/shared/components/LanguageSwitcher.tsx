import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSwitcher.scss';

const languages = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'es', label: 'ES', fullName: 'Español' },
] as const;

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: 'en' | 'de' | 'es') => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-switcher__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        title="Select language"
      >
        <span className="language-switcher__label">{currentLanguage?.label}</span>
        <span className={`language-switcher__arrow ${isOpen ? 'language-switcher__arrow--open' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="language-switcher__dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-switcher__option ${
                lang.code === language ? 'language-switcher__option--active' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-switcher__option-label">{lang.label}</span>
              <span className="language-switcher__option-name">{lang.fullName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
