import { useEffect, useRef } from "react";
import gsap from "gsap";

export const LoadingScreen = ({ isExiting }) => {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow orbs
      gsap.from("[data-loader-orb]", {
        scale: 0.6,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Staggered text reveal
      gsap.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.2)",
      });

      // Progress bar fill
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.8, ease: "power2.inOut" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isExiting) return;

    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [isExiting]);

  const nameLetters = "SUMIT YADAV".split("");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.15),transparent_40%)]" />
      <div data-loader-orb className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px]" />
      <div data-loader-orb className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full">
        <div 
          ref={textRef} 
          className="flex flex-wrap justify-center gap-x-1 gap-y-2 text-3xl font-black tracking-widest sm:text-5xl md:text-6xl"
          style={{ perspective: "1000px" }}
        >
          {nameLetters.map((char, index) => (
            <span key={index} className={char === " " ? "w-2 md:w-4" : "inline-block origin-bottom text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400"}>
              {char}
            </span>
          ))}
          <span className="inline-block origin-bottom text-cyan-400">.</span>
        </div>
        
        <p className="mt-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500">
          Loading Experience
        </p>
        
        <div className="mt-8 h-1 w-48 sm:w-64 overflow-hidden rounded-full bg-white/5">
          <div ref={progressRef} className="h-full w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
        </div>
      </div>
    </div>
  );
};
