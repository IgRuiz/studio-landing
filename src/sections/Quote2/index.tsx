import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { quote2Content } from "./data";
import "./Quote2.scss";

gsap.registerPlugin(ScrollTrigger);

export const Quote2: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !labelRef.current ||
      !quoteRef.current ||
      !descriptionRef.current
    )
      return;

    const section = sectionRef.current;
    const label = labelRef.current;
    const quote = quoteRef.current;
    const description = descriptionRef.current;
    const pattern = patternRef.current;
    const content = contentRef.current;

    // Split quote into words for animation
    const quoteText = quote.textContent || "";
    quote.innerHTML = quoteText
      .split(" ")
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");

    const words = quote.querySelectorAll(".word");

    // Animate label with slide and glow
    gsap.fromTo(
      label,
      {
        opacity: 0,
        x: -50,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: label,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate words with wave effect
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 50,
        rotateX: 90,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        stagger: {
          each: 0.05,
          from: "start",
        },
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Fade in description
    gsap.fromTo(
      description,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        scrollTrigger: {
          trigger: description,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect for content - moves slower than scroll
    if (content) {
      gsap.to(content, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Parallax effect for background pattern - moves faster
    if (pattern) {
      // gsap.to(pattern, {
      //   y: 200,
      //   rotation: 5,
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: section,
      //     start: 'top bottom',
      //     end: 'bottom top',
      //     scrub: 1.5,
      //   },
      // });
    }

    // Scale and fade out section as it scrolls up
    gsap.to(section, {
      scale: 0.95,
      opacity: 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "center top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === label ||
          trigger.trigger === quote ||
          trigger.trigger === description ||
          trigger.trigger === section
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="quote-section quote-section--2">
      <div className="container">
        <div ref={contentRef} className="quote-section__content">
          <span ref={labelRef} className="quote-section__label">
            {quote2Content.problem}
          </span>
          <blockquote
            ref={quoteRef}
            className="quote-section__quote quote-section__quote--large"
          >
            {quote2Content.quote}
          </blockquote>
          <p ref={descriptionRef} className="quote-section__description">
            {quote2Content.description}
          </p>
        </div>
      </div>

      <div ref={patternRef} className="quote-section__background-pattern"></div>
    </section>
  );
};
