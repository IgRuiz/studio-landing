import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SectionTitle.scss";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  align = "center",
  className = "",
}) => {
  const titleClass =
    `section-title section-title--${align} ${className}`.trim();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const heading = headingRef.current;

    // Split heading into words
    const headingText = heading.textContent || "";
    heading.innerHTML = headingText
      .split(" ")
      .map(
        (word) =>
          `<span class="word-wrapper"><span class="word">${word}</span></span>`
      )
      .join(" ");

    const words = heading.querySelectorAll(".word");

    // Animate heading words
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate subtitle if it exists
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === heading ||
          (subtitleRef.current && trigger.trigger === subtitleRef.current)
        ) {
          trigger.kill();
        }
      });
    };
  }, [children, subtitle]);

  return (
    <div className={titleClass}>
      <h2 ref={headingRef} className="section-title__heading">
        {children}
      </h2>
      {subtitle && (
        <p ref={subtitleRef} className="section-title__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};
