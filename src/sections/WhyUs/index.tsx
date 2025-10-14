import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '../../shared/components';
import { useTranslations } from '../../i18n/useTranslations';
import { whyUsContent } from './data';
import './WhyUs.scss';

gsap.registerPlugin(ScrollTrigger);

export const WhyUs: React.FC = () => {
  const t = useTranslations();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    items.forEach((item, index) => {
      // Fade in item with slide
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate icon
      const iconWrapper = item.querySelector('.why-us__icon-wrapper');
      if (iconWrapper) {
        gsap.fromTo(
          iconWrapper,
          {
            scale: 0,
            rotation: 180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate number
      const number = item.querySelector('.why-us__number');
      if (number) {
        gsap.fromTo(
          number,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.3,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate title
      const title = item.querySelector('.why-us__title');
      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate description
      const description = item.querySelector('.why-us__description');
      if (description) {
        gsap.fromTo(
          description,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (items.some((item) => trigger.trigger === item)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Combine icons from data with text from translations
  const reasonsWithTranslations = t.whyUs.items.map((item, index) => ({
    id: whyUsContent.reasons[index]?.id || index + 1,
    icon: whyUsContent.reasons[index]?.icon || "⚡",
    title: item.title,
    description: item.description,
  }));

  return (
    <section id="why-us" className="why-us">
      <div className="container">
        <SectionTitle subtitle={t.whyUs.subtitle}>
          {t.whyUs.title}
        </SectionTitle>

        <div className="why-us__list">
          {reasonsWithTranslations.map((reason, index) => (
            <div
              key={reason.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="why-us__item"
            >
              <div className="why-us__icon-wrapper">
                <span className="why-us__icon">{reason.icon}</span>
              </div>
              <div className="why-us__content">
                <h3 className="why-us__title">{reason.title}</h3>
                <p className="why-us__description">{reason.description}</p>
              </div>
              <div className="why-us__number">{String(index + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
