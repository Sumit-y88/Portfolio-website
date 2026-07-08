import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* ─────────────────────────────────────────────────────────────
   Shared easing presets — used throughout for consistency
   ───────────────────────────────────────────────────────────── */
const EASE = {
  smooth: "power3.out",
  bounce: "back.out(1.7)",
  expo: "expo.out",
};

/* ─────────────────────────────────────────────────────────────
   Text split — char-by-char stagger for headings
   ───────────────────────────────────────────────────────────── */
const splitAndAnimateText = (el, scrollTriggerConfig = null) => {
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.innerHTML = text
    .split(" ")
    .map((word) => {
      const chars = word
        .split("")
        .map(
          (char) =>
            `<span data-char style="display:inline-block;will-change:transform,opacity">${char}</span>`
        )
        .join("");
      return `<span style="display:inline-block;white-space:nowrap">${chars}</span>`;
    })
    .join(" ");

  const chars = el.querySelectorAll("[data-char]");
  const animProps = {
    y: "120%",
    opacity: 0,
    rotateX: -90,
    transformOrigin: "top center",
    stagger: 0.025,
    duration: 0.7,
    ease: EASE.expo,
  };

  if (scrollTriggerConfig) {
    gsap.from(chars, { ...animProps, scrollTrigger: scrollTriggerConfig });
  } else {
    gsap.from(chars, animProps);
  }
};

/* ═══════════════════════════════════════════════════════════════
   MAIN HOOK
   ═══════════════════════════════════════════════════════════════ */
export const useGsapAnimations = (isReady) => {
  useEffect(() => {
    if (!isReady) return undefined;

    /* ── Hero entrance ── */
    const heroCtx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from("[data-hero-reveal]", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: EASE.expo,
      });

      tl.from(
        "[data-hero-image]",
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.08,
          opacity: 0,
          duration: 1.1,
          ease: EASE.expo,
        },
        "-=0.5"
      );

      // Subtle continuous parallax on hero background
      gsap.to("[data-hero-bg]", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-bg]",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    /* ── Scroll-triggered animations ── */
    const stCtx = gsap.context(() => {
      /* Parallax blobs */
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || -18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* ──────────────────────────────────────────
         Section Titles — split-text + stagger cascade
         ────────────────────────────────────────── */
      gsap.utils.toArray("[data-section-title]").forEach((titleBlock) => {
        const eyebrow = titleBlock.querySelector("[data-section-eyebrow]");
        const heading = titleBlock.querySelector("[data-section-heading]");
        const desc = titleBlock.querySelector("[data-section-desc]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleBlock,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        });

        if (eyebrow) {
          tl.from(eyebrow, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: EASE.smooth,
          });
        }

        if (heading) {
          splitAndAnimateText(heading, {
            trigger: titleBlock,
            start: "top 85%",
            toggleActions: "play none none none",
          });
        }

        if (desc) {
          tl.from(
            desc,
            {
              y: 60,
              opacity: 0,
              duration: 0.7,
              ease: EASE.smooth,
            },
            eyebrow ? "-=0.3" : 0
          );
        }
      });

      /* ──────────────────────────────────────────
         About Section
         ────────────────────────────────────────── */
      const aboutSection = document.querySelector("#aboutme");
      if (aboutSection) {
        const aboutLeft = aboutSection.querySelector("[data-about-left]");
        if (aboutLeft) {
          gsap.from(aboutLeft, {
            x: -70,
            opacity: 0,
            duration: 1.1,
            ease: EASE.expo,
            scrollTrigger: {
              trigger: aboutLeft,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        const aboutRight = aboutSection.querySelector("[data-about-right]");
        if (aboutRight) {
          gsap.from(aboutRight, {
            x: 70,
            opacity: 0,
            duration: 1.1,
            ease: EASE.expo,
            scrollTrigger: {
              trigger: aboutRight,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        const timelineEl = aboutSection.querySelector("[data-about-timeline]");
        if (timelineEl) {
          gsap.from(timelineEl, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: timelineEl,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        const highlights = aboutSection.querySelectorAll(
          "[data-about-highlight]"
        );
        if (highlights.length) {
          gsap.from(highlights, {
            y: 50,
            opacity: 0,
            scale: 0.93,
            duration: 0.75,
            stagger: { amount: 0.4, from: "start" },
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: highlights[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        const pills = aboutSection.querySelectorAll("[data-about-pill]");
        if (pills.length) {
          gsap.from(pills, {
            scale: 0,
            opacity: 0,
            rotation: gsap.utils.wrap([-6, 6]),
            duration: 0.55,
            stagger: { amount: 0.6, from: "random" },
            ease: "back.out(2.2)",
            scrollTrigger: {
              trigger: pills[0],
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      /* ──────────────────────────────────────────
         Skills Section
         ────────────────────────────────────────── */
      const skillsSection = document.querySelector("#skills");
      if (skillsSection) {
        skillsSection
          .querySelectorAll("[data-skills-category]")
          .forEach((cat) => {
            gsap.from(cat, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: EASE.smooth,
              scrollTrigger: {
                trigger: cat,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });

            const line = cat.querySelector("[data-category-line]");
            if (line) {
              gsap.from(line, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: EASE.expo,
                scrollTrigger: {
                  trigger: cat,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              });
            }

            const badges = cat.querySelectorAll("[data-skill-badge]");
            if (badges.length) {
              gsap.from(badges, {
                y: 30,
                opacity: 0,
                scale: 0.75,
                rotate: gsap.utils.wrap([-8, 8]),
                duration: 0.55,
                stagger: { amount: 0.5, from: "random" },
                ease: "back.out(1.8)",
                scrollTrigger: {
                  trigger: cat,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              });
            }
          });
      }

      /* ──────────────────────────────────────────
         Projects — card entrance
         ────────────────────────────────────────── */
      document.querySelectorAll("[data-project-card]").forEach((card, i) => {
        const fromLeft = i % 2 === 0;

        gsap.from(card, {
          x: fromLeft ? -50 : 50,
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.95,
          ease: EASE.expo,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ──────────────────────────────────────────
         Contact Section
         ────────────────────────────────────────── */
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        gsap.timeline({
          scrollTrigger: {
            trigger: contactSection,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }).from("[data-contact-field]", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: EASE.smooth,
        });
      }
    });

    /* ── Font-load refresh ── */
    let timeoutId;
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      timeoutId = setTimeout(() => ScrollTrigger.refresh(), 800);
    });

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      stCtx.revert();
      heroCtx.revert();
    };
  }, [isReady]);
};
