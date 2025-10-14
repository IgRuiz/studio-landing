import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollGradient.scss';

gsap.registerPlugin(ScrollTrigger);

export const ScrollGradient: React.FC = () => {
  const gradient1Ref = useRef<HTMLDivElement>(null);
  const gradient2Ref = useRef<HTMLDivElement>(null);
  const gradient3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gradient1 = gradient1Ref.current;
    const gradient2 = gradient2Ref.current;
    const gradient3 = gradient3Ref.current;

    if (!gradient1 || !gradient2 || !gradient3) return;

    // Gradient 1 - Large gold orb that moves down
    gsap.to(gradient1, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: '100vh',
      x: '30vw',
      scale: 1.5,
      opacity: 0.7,
    });

    // Gradient 2 - Orange/Bronze orb moving diagonally
    gsap.to(gradient2, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
      y: '120vh',
      x: '-20vw',
      scale: 1.3,
      rotate: 180,
    });

    // Gradient 3 - Bright yellow accent moving up
    gsap.to(gradient3, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
      y: '-80vh',
      x: '10vw',
      scale: 1.8,
      opacity: 0.5,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="scroll-gradient">
      <div ref={gradient1Ref} className="scroll-gradient__orb scroll-gradient__orb--1"></div>
      <div ref={gradient2Ref} className="scroll-gradient__orb scroll-gradient__orb--2"></div>
      <div ref={gradient3Ref} className="scroll-gradient__orb scroll-gradient__orb--3"></div>
    </div>
  );
};
