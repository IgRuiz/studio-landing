import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from '../../i18n/useTranslations';
import './Quote1.scss';

gsap.registerPlugin(ScrollTrigger);

export const Quote1: React.FC = () => {
  const t = useTranslations();
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!quoteRef.current || !authorRef.current) return;

    const quote = quoteRef.current;
    const author = authorRef.current;

    // Split text into characters for animation
    const quoteText = quote.textContent || '';
    quote.innerHTML = quoteText
      .split('')
      .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = quote.querySelectorAll('.char');

    // Animate characters on scroll
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: quote,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Fade in author
    gsap.fromTo(
      author,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: author,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === quote || trigger.trigger === author) {
          trigger.kill();
        }
      });
    };
  }, [t]);

  return (
    <section className="quote-section quote-section--1">
      <div className="container">
        <div className="quote-section__content">
          <blockquote ref={quoteRef} className="quote-section__quote">
            "{t.quote1.quote}"
          </blockquote>
          <cite ref={authorRef} className="quote-section__author">
            {t.quote1.author}
          </cite>
        </div>
      </div>
    </section>
  );
};
