import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up a GSAP <-> Locomotive Scroll proxy so that ScrollTrigger-driven
 * animations (parallax, zoom-scroll, progress bar) keep working with
 * Locomotive's smooth virtual scroll.
 */
const setupLocoProxy = (locoScroll) => {
  const scrollEl = locoScroll.el;
  const refreshLoco = () => locoScroll.update();

  // Tell ScrollTrigger to use Locomotive's position instead of window.scrollY
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollEl, {
    scrollTop(value) {
      if (arguments.length) {
        locoScroll.scrollTo(value, { duration: 0, disableLerp: true });
      }
      return locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollEl.style.transform ? "transform" : "fixed",
  });

  // After ScrollTrigger recalculates, refresh Locomotive
  ScrollTrigger.addEventListener("refresh", refreshLoco);
  ScrollTrigger.defaults({ scroller: scrollEl });
  ScrollTrigger.refresh();

  window.dispatchEvent(new CustomEvent("locomotiveProxyReady"));

  return () => {
    ScrollTrigger.removeEventListener("refresh", refreshLoco);
  };
};

/* ─────────────────────────────────────────────────────────────
   Helper: standard "from" defaults used across section reveals
   ───────────────────────────────────────────────────────────── */
const REVEAL_FROM = { y: 60, opacity: 0 };
const REVEAL_TO = (extra = {}) => ({
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  ...extra,
});

export const useGsapAnimations = (isReady) => {
  useEffect(() => {
    if (!isReady) return undefined;

    // ───── HERO ENTRANCE (runs immediately, no scroll needed) ─────
    const heroCtx = gsap.context(() => {
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
    });

    // Wait for Locomotive Scroll to be ready for ScrollTrigger animations
    const locoScroll = window.__locomotiveScroll;

    const initScrollTrigger = (loco) => {
      const cleanupProxy = loco ? setupLocoProxy(loco) : undefined;

      // Refresh ScrollTrigger to ensure correct height calculations
      const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);

      const stCtx = gsap.context(() => {
        /* ═══════════════════════════════════════════════════════
           1. EXISTING — Parallax & Zoom-Scroll
           ═══════════════════════════════════════════════════════ */
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

        /* ═══════════════════════════════════════════════════════
           2. HERO — Scroll-Fade Parallax
           As the user scrolls past the hero, text fades out
           and moves up while the code snippet moves at a
           different rate, creating a parallax depth split.
           ═══════════════════════════════════════════════════════ */
        const heroSection = document.querySelector("#home");
        if (heroSection) {
          const heroText = heroSection.querySelector("[data-hero-text]");
          const heroSnippet = heroSection.querySelector("[data-hero-snippet]");
          const heroBg = heroSection.querySelector("[data-hero-bg]");

          if (heroText) {
            gsap.to(heroText, {
              yPercent: -30,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          }

          if (heroSnippet) {
            gsap.to(heroSnippet, {
              yPercent: -15,
              opacity: 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          if (heroBg) {
            gsap.to(heroBg, {
              opacity: 0.2,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "center center",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        }

        /* ═══════════════════════════════════════════════════════
           3. SECTION TITLES — Staggered Reveal
           Eyebrow slides down, heading slides up, description
           fades in — creates a nice cascade on every section.
           ═══════════════════════════════════════════════════════ */
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
              duration: 0.6,
              ease: "power2.out",
            });
          }

          if (heading) {
            tl.from(
              heading,
              {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              eyebrow ? "-=0.4" : 0,
            );
          }

          if (desc) {
            tl.from(
              desc,
              {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              "-=0.5",
            );
          }
        });

        /* ═══════════════════════════════════════════════════════
           4. ABOUT SECTION — Split Slide-In + Timeline Draw
           ═══════════════════════════════════════════════════════ */
        const aboutSection = document.querySelector("#aboutme");
        if (aboutSection) {
          // Left column slides from left
          const aboutLeft = aboutSection.querySelector("[data-about-left]");
          if (aboutLeft) {
            gsap.from(aboutLeft, {
              x: -80,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: aboutLeft,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          // Right column slides from right
          const aboutRight = aboutSection.querySelector("[data-about-right]");
          if (aboutRight) {
            gsap.from(aboutRight, {
              x: 80,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: aboutRight,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          // Timeline line draws itself downward
          const timeline = aboutSection.querySelector("[data-about-timeline]");
          if (timeline) {
            gsap.from(timeline, {
              scaleY: 0,
              transformOrigin: "top center",
              duration: 1.2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: timeline,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          // Highlight cards stagger in
          const highlights = aboutSection.querySelectorAll("[data-about-highlight]");
          if (highlights.length) {
            gsap.from(highlights, {
              y: 40,
              opacity: 0,
              scale: 0.95,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: highlights[0],
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }

          // Skill pills pop in
          const pills = aboutSection.querySelectorAll("[data-about-pill]");
          if (pills.length) {
            gsap.from(pills, {
              scale: 0,
              opacity: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: pills[0],
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          }
        }

        /* ═══════════════════════════════════════════════════════
           5. SKILLS SECTION — Category Wave Reveal
           ═══════════════════════════════════════════════════════ */
        const skillsSection = document.querySelector("#skills");
        if (skillsSection) {
          // Each category group slides up with stagger
          const categories = skillsSection.querySelectorAll("[data-skills-category]");
          categories.forEach((cat) => {
            gsap.from(cat, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cat,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });

            // Category divider line draws from left to right
            const line = cat.querySelector("[data-category-line]");
            if (line) {
              gsap.from(line, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: cat,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              });
            }

            // Skill badges within each category pop in with stagger
            const badges = cat.querySelectorAll("[data-skill-badge]");
            if (badges.length) {
              gsap.from(badges, {
                y: 30,
                opacity: 0,
                scale: 0.85,
                rotate: -3,
                duration: 0.5,
                stagger: 0.06,
                ease: "back.out(1.5)",
                scrollTrigger: {
                  trigger: cat,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              });
            }
          });
        }

        /* ═══════════════════════════════════════════════════════
           6. PROJECTS SECTION — Cascading Card Entrance
           Alternating left/right slide-ins for visual interest.
           ═══════════════════════════════════════════════════════ */
        const projectCards = document.querySelectorAll("[data-project-card]");
        projectCards.forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.from(card, {
            x: fromLeft ? -60 : 60,
            y: 40,
            opacity: 0,
            scale: 0.92,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ═══════════════════════════════════════════════════════
           7. FOOTER — Gentle Fade-Up
           ═══════════════════════════════════════════════════════ */
        const footer = document.querySelector("[data-footer]");
        if (footer) {
          gsap.from(footer, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      return () => {
        clearTimeout(timeout);
        cleanupProxy?.();
        stCtx.revert();
      };
    };

    let cleanupST;
    const onReady = () => {
      cleanupST = initScrollTrigger(window.__locomotiveScroll);
    };

    // If loco is already initialised, use it immediately
    if (locoScroll) {
      cleanupST = initScrollTrigger(locoScroll);
    } else {
      // Otherwise wait for the custom event
      window.addEventListener("locomotiveReady", onReady, { once: true });
    }

    return () => {
      heroCtx.revert();
      if (cleanupST) cleanupST();
      window.removeEventListener("locomotiveReady", onReady);
    };
  }, [isReady]);
};
