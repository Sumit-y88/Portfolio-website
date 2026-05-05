import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    let tween;

    const initProgress = () => {
      const container = document.querySelector("[data-scroll-container]");
      if (!container) return;

      tween = gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          scroller: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });
    };

    if (window.__locomotiveScroll) {
      initProgress();
    } else {
      window.addEventListener("locomotiveProxyReady", initProgress, { once: true });
    }

    return () => {
      if (tween) tween.scrollTrigger?.kill();
      window.removeEventListener("locomotiveProxyReady", initProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-transparent">
      <div
        ref={progressRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-cyan-300 to-emerald-300"
      />
    </div>
  );
};
