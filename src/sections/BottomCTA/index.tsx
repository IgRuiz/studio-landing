import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../shared/components";
import { useTranslations } from "../../i18n/useTranslations";
import "./BottomCTA.scss";

gsap.registerPlugin(ScrollTrigger);

export const BottomCTA: React.FC = () => {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const trustSignalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !formRef.current
    )
      return;

    const section = sectionRef.current;
    const background = backgroundRef.current;
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const form = formRef.current;
    const trustSignals = trustSignalsRef.current;

    // Split title into words
    const titleText = title.textContent || "";
    title.innerHTML = titleText
      .split(" ")
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");

    const words = title.querySelectorAll(".word");

    // Animate title words
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 60,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Fade in subtitle
    gsap.fromTo(
      subtitle,
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
          trigger: subtitle,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Fade in form
    gsap.fromTo(
      form,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Fade in trust signals
    if (trustSignals) {
      const items = trustSignals.querySelectorAll(".bottom-cta__trust-item");
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 1.2,
          scrollTrigger: {
            trigger: trustSignals,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Parallax effect for content - moves up slower
    if (content) {
      gsap.to(content, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Parallax effect for gradient orbs - move in different directions
    if (orb1) {
      gsap.to(orb1, {
        y: -200,
        x: 100,
        rotation: 45,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    if (orb2) {
      gsap.to(orb2, {
        y: 150,
        x: -100,
        rotation: -30,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    // Parallax effect for background pattern
    if (background) {
      // gsap.to(background, {
      //   y: 100,
      //   // rotation: -10,
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: section,
      //     start: 'top bottom',
      //     end: 'bottom top',
      //     scrub: 1.2,
      //   },
      // });
    }

    // Scale up section slightly as it comes into view
    gsap.fromTo(
      section,
      {
        scale: 0.95,
      },
      {
        scale: 1,
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
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === title ||
          trigger.trigger === subtitle ||
          trigger.trigger === form ||
          trigger.trigger === trustSignals ||
          trigger.trigger === section
        ) {
          trigger.kill();
        }
      });
    };
  }, [t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bottom-cta">
      <div ref={backgroundRef} className="bottom-cta__background">
        <div
          ref={orb1Ref}
          className="bottom-cta__gradient-orb bottom-cta__gradient-orb--1"
        ></div>
        <div
          ref={orb2Ref}
          className="bottom-cta__gradient-orb bottom-cta__gradient-orb--2"
        ></div>
      </div>

      <div className="container">
        <div ref={contentRef} className="bottom-cta__content">
          <h2 ref={titleRef} className="bottom-cta__title">
            {t.bottomCTA.title}
          </h2>
          <p ref={subtitleRef} className="bottom-cta__subtitle">
            {t.bottomCTA.subtitle}
          </p>

          <form
            ref={formRef}
            className="bottom-cta__form"
            onSubmit={handleSubmit}
          >
            <div className="bottom-cta__input-wrapper">
              <input
                type="email"
                className="bottom-cta__input"
                placeholder={t.bottomCTA.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="large">
                {t.bottomCTA.ctaLabel}
              </Button>
            </div>

            {submitted && (
              <div className="bottom-cta__success">
                Thanks! We'll be in touch soon.
              </div>
            )}
          </form>

          <div ref={trustSignalsRef} className="bottom-cta__trust-signals">
            {t.bottomCTA.trustSignals.map((signal, index) => (
              <div key={index} className="bottom-cta__trust-item">
                <span className="bottom-cta__check">✓</span>
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
