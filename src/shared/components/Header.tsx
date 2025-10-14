import { useState, useEffect } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from '../../i18n/useTranslations';
import './Header.scss';

export const Header: React.FC = () => {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: t.hero.title.split(' ')[0] }, // "We" or first word
    { id: 'services', label: t.services.title },
    { id: 'why-us', label: t.whyUs.title },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={() => scrollToSection('hero')}>
        <span className="header__logo-text">SR</span>
      </div>

      <nav className="header__nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`header__nav-link ${activeSection === section.id ? 'header__nav-link--active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className="header__controls">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
};
