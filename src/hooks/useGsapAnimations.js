import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = (isReady) => {
  useEffect(() => {
    if (!isReady) return undefined;

    // Refresh ScrollTrigger to ensure correct height calculations, fixing the Skills section loading issue
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);
    window.addEventListener("load", () => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {

      gsap.from("[data-hero-reveal]", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.from("[data-hero-image]", {
        scale: 0.92,
        rotate: -4,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.4)",
        delay: 0.22,
      });

      // Elements have been migrated to pure CSS animation for reliability

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: Number(element.dataset.parallax) || -18,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      gsap.utils.toArray("[data-zoom-scroll]").forEach((element) => {
        gsap.fromTo(
          element,
          { scale: 0.96 },
          {
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      // Navbar scroll class handled via React state in Navbar.jsx
    });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", () => ScrollTrigger.refresh());
      ctx.revert();
    };
  }, [isReady]);
};
