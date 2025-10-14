import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '../../shared/components';
import { studioSliderContent } from './data';
import './StudioSlider.scss';

gsap.registerPlugin(ScrollTrigger);

export const StudioSlider: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !slider || cards.length === 0) return;

    // Calculate total scroll width
    const cardWidth = cards[0]?.offsetWidth || 500;
    const gap = 32; // 2rem
    const totalWidth = (cardWidth + gap) * cards.length;

    // Create horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate cards horizontally
    tl.to(slider, {
      x: () => -(totalWidth - window.innerWidth + 200),
      ease: 'none',
    });

    // Animate each card individually on scroll
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0.5,
          scale: 0.9,
          rotateY: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          scrollTrigger: {
            trigger: card,
            start: 'left center',
            end: 'center center',
            containerAnimation: tl,
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="studio-slider">
      <div className="container studio-slider__header">
        <SectionTitle subtitle={studioSliderContent.subtitle}>
          {studioSliderContent.title}
        </SectionTitle>
      </div>

      <div ref={sliderRef} className="studio-slider__track">
        {studioSliderContent.slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="studio-slider__card"
          >
            <div className="studio-slider__visual">
              <img
                src={slide.image}
                alt={slide.title}
                className="studio-slider__image"
              />
              <div
                className="studio-slider__overlay"
                style={{ background: slide.gradient }}
              >
                <div className={`studio-slider__pattern studio-slider__pattern--${slide.pattern}`}></div>
              </div>
              <div className="studio-slider__shine"></div>
            </div>

            <div className="studio-slider__content">
              <span className="studio-slider__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="studio-slider__title">{slide.title}</h3>
              <p className="studio-slider__description">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="studio-slider__scroll-hint">
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};
