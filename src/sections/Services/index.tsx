import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "../../shared/components";
import { servicesContent } from "./data";
import "./Services.scss";

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !track || cards.length === 0) return;

    // Duplicate cards for seamless infinite loop
    const firstSetCards = cards.slice(0, servicesContent.services.length);
    const cardWidth = firstSetCards[0]?.offsetWidth || 400;
    const gap = 32;
    const totalWidth = (cardWidth + gap) * servicesContent.services.length;

    // Infinite horizontal loop animation
    const tl = gsap.timeline({
      repeat: -1,
      // defaults: { ease: "power1.inOut" },
      defaults: { ease: "expo.inOut" },
    });

    tl.to(track, {
      x: -totalWidth,
      duration: 10,
    });

    // Update card highlighting based on position
    const updateCardHighlight = () => {
      const centerX = window.innerWidth / 2;
      let closestCard: HTMLDivElement | null = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(centerX - cardCenterX);
        const maxDistance = window.innerWidth / 2;

        // Calculate highlight intensity (0 to 1, where 1 is center)
        const intensity = Math.max(0, 1 - distanceFromCenter / maxDistance);

        // Find closest card to center
        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestCard = card;
        }

        // Update border and scale based on distance from center
        const borderWidth = 1 + intensity * 2; // 1px to 3px
        const scale = 0.95 + intensity * 0.1; // 0.95 to 1.05
        const opacity = 0.6 + intensity * 0.4; // 0.6 to 1

        // Apply gradual transformations
        gsap.to(card, {
          scale,
          opacity,
          borderWidth: `${borderWidth}px`,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // Remove center class from all cards first
        card.classList.remove('is-center');
      });

      // Add center class to closest card
      if (closestCard && minDistance < 250) {
        closestCard.classList.add('is-center');
      }
    };

    // Run highlight update on animation frame
    const highlightInterval = setInterval(updateCardHighlight, 16);

    // Parallax effect - section slides in from below
    gsap.fromTo(
      section,
      {
        y: 100,
      },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      }
    );

    return () => {
      tl.kill();
      clearInterval(highlightInterval);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Double the services for seamless loop
  const doubledServices = [
    ...servicesContent.services,
    ...servicesContent.services,
  ];

  return (
    <section ref={sectionRef} className="services">
      <div className="container">
        <SectionTitle subtitle={servicesContent.subtitle}>
          {servicesContent.title}
        </SectionTitle>
      </div>

      <div className="services__carousel">
        <div ref={trackRef} className="services__track">
          {doubledServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="services__card"
            >
              <div className="services__icon-wrapper">
                <div className="services__icon-blur"></div>
                <div className="services__icon">{service.icon}</div>
              </div>
              <div className="services__content">
                <h3 className="services__title">{service.title}</h3>
                <p className="services__description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
