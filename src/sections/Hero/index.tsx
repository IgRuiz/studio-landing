import { Button } from '../../shared/components';
import { heroContent } from './data';
import './Hero.scss';

export const Hero: React.FC = () => {
  const handleCTA = () => {
    // Scroll to bottom CTA section
    const ctaSection = document.querySelector('#bottom-cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">{heroContent.title}</h1>
          <p className="hero__subtitle">{heroContent.subtitle}</p>
          <div className="hero__cta">
            <Button size="large" onClick={handleCTA}>
              {heroContent.ctaLabel}
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__animation-box hero__animation-box--1"></div>
          <div className="hero__animation-box hero__animation-box--2"></div>
          <div className="hero__animation-box hero__animation-box--3"></div>
        </div>
      </div>
    </section>
  );
};
