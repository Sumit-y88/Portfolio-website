import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─────────────────────────────────────────────────────────────
   Locomotive Scroll proxy — fixed cleanup order + listener leak
   ───────────────────────────────────────────────────────────── */
const setupLocoProxy = (locoScroll) => {
  const scrollEl = locoScroll.el;
  const refreshLoco = () => locoScroll.update();

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollEl, {
    scrollTop(value) {
      if (arguments.length) {
        locoScroll.scrollTo(value, { duration: 0, disableLerp: true });
      }
      return locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: scrollEl.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", refreshLoco);
  ScrollTrigger.defaults({ scroller: scrollEl });
  ScrollTrigger.refresh();

  window.dispatchEvent(new CustomEvent("locomotiveProxyReady"));

  return () => {
    locoScroll.off("scroll", ScrollTrigger.update);
    ScrollTrigger.removeEventListener("refresh", refreshLoco);
  };
};

/* ─────────────────────────────────────────────────────────────
   Shared easing presets — used throughout for consistency
   ───────────────────────────────────────────────────────────── */
const EASE = {
  smooth: "power3.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
  sine: "sine.inOut",
};

const REVEAL_FROM = { y: 60, opacity: 0 };
const REVEAL_TO = (extra = {}) => ({
  y: 0,
  opacity: 1,
  duration: 1,
  ease: EASE.smooth,
  ...extra,
});

/* ─────────────────────────────────────────────────────────────
   Magnetic hover effect — elements subtly follow the cursor
   Attach to buttons, cards, icons for premium tactile feel
   ───────────────────────────────────────────────────────────── */
const initMagneticElements = () => {
  const magnetics = document.querySelectorAll("[data-magnetic]");
  const cleanups = [];

  magnetics.forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.3;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: EASE.smooth });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE.elastic });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { clearProps: "x,y" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
};

/* ─────────────────────────────────────────────────────────────
   Smooth cursor follower — premium custom cursor
   Add data-cursor="large" to elements for cursor expansion
   ───────────────────────────────────────────────────────────── */
const initCursorFollower = () => {
  const cursor = document.querySelector("[data-cursor-dot]");
  const cursorRing = document.querySelector("[data-cursor-ring]");
  if (!cursor || !cursorRing) return () => {};

  let mouseX = 0, mouseY = 0;

  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: "none" });
    gsap.to(cursorRing, { x: mouseX, y: mouseY, duration: 0.35, ease: EASE.smooth });
  };

  const onEnterLarge = () => {
    gsap.to(cursorRing, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: EASE.smooth });
    gsap.to(cursor, { scale: 0, duration: 0.2 });
  };

  const onLeaveLarge = () => {
    gsap.to(cursorRing, { scale: 1, opacity: 1, duration: 0.3, ease: EASE.smooth });
    gsap.to(cursor, { scale: 1, duration: 0.2 });
  };

  document.addEventListener("mousemove", onMove);

  const largeTargets = document.querySelectorAll("[data-cursor='large']");
  largeTargets.forEach((el) => {
    el.addEventListener("mouseenter", onEnterLarge);
    el.addEventListener("mouseleave", onLeaveLarge);
  });

  return () => {
    document.removeEventListener("mousemove", onMove);
    largeTargets.forEach((el) => {
      el.removeEventListener("mouseenter", onEnterLarge);
      el.removeEventListener("mouseleave", onLeaveLarge);
    });
  };
};

/* ─────────────────────────────────────────────────────────────
   Text split — char-by-char stagger for headings
   Usage: add data-split-text to any heading element
   ───────────────────────────────────────────────────────────── */
const splitAndAnimateText = (el, scrollTriggerConfig = null) => {
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.innerHTML = text
    .split("")
    .map((char) =>
      char === " "
        ? `<span style="display:inline-block;width:0.3em"> </span>`
        : `<span style="display:inline-block;will-change:transform,opacity">${char}</span>`
    )
    .join("");

  const chars = el.querySelectorAll("span");
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

  return chars;
};

/* ─────────────────────────────────────────────────────────────
   Noise / shimmer overlay on images — premium hover reveal
   Usage: add data-image-hover to any image wrapper
   ───────────────────────────────────────────────────────────── */
const initImageHovers = () => {
  const wrappers = document.querySelectorAll("[data-image-hover]");
  const cleanups = [];

  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (!img) return;

    const onEnter = () => {
      gsap.to(img, { scale: 1.06, duration: 0.6, ease: EASE.smooth });
    };
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: EASE.smooth });
    };

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      gsap.set(img, { clearProps: "scale" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
};

/* ─────────────────────────────────────────────────────────────
   Horizontal scroll section
   Usage: wrap items in [data-horizontal-scroll]
   ───────────────────────────────────────────────────────────── */
const initHorizontalScroll = (scroller) => {
  const sections = gsap.utils.toArray("[data-horizontal-scroll]");
  sections.forEach((section) => {
    const inner = section.querySelector("[data-horizontal-inner]");
    if (!inner) return;

    const totalWidth = inner.scrollWidth - window.innerWidth;

    gsap.to(inner, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        scroller,
      },
    });
  });
};

/* ─────────────────────────────────────────────────────────────
   Progress bar — reading indicator at top of viewport
   Usage: add [data-progress-bar] to a fixed top element
   ───────────────────────────────────────────────────────────── */
const initProgressBar = (scroller) => {
  const bar = document.querySelector("[data-progress-bar]");
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    transformOrigin: "left center",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      scroller,
    },
  });

  gsap.set(bar, { scaleX: 0 });
};

/* ─────────────────────────────────────────────────────────────
   Number counter — animates numeric values on scroll
   Usage: add data-counter="1234" to any element
   ───────────────────────────────────────────────────────────── */
const initCounters = () => {
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = parseFloat(el.dataset.counter);
    const decimals = el.dataset.counterDecimals ? parseInt(el.dataset.counterDecimals) : 0;
    const prefix = el.dataset.counterPrefix || "";
    const suffix = el.dataset.counterSuffix || "";
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: EASE.expo,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = prefix + obj.val.toFixed(decimals) + suffix;
      },
    });
  });
};

/* ─────────────────────────────────────────────────────────────
   Stagger grid reveal — for card grids, skill grids, etc.
   Usage: add data-stagger-grid to the parent container
   ───────────────────────────────────────────────────────────── */
const initStaggerGrids = () => {
  gsap.utils.toArray("[data-stagger-grid]").forEach((grid) => {
    const items = grid.querySelectorAll("[data-stagger-item]");
    if (!items.length) return;

    gsap.from(items, {
      y: 50,
      opacity: 0,
      scale: 0.94,
      duration: 0.65,
      stagger: {
        amount: 0.5,
        from: "start",
        grid: "auto",
      },
      ease: EASE.smooth,
      scrollTrigger: {
        trigger: grid,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
};

/* ─────────────────────────────────────────────────────────────
   Clip-path reveal — theatrical wipe-in for hero images / banners
   Usage: add data-clip-reveal to any element
   ───────────────────────────────────────────────────────────── */
const initClipReveals = () => {
  gsap.utils.toArray("[data-clip-reveal]").forEach((el) => {
    const direction = el.dataset.clipReveal || "bottom"; // top | bottom | left | right

    const clipMap = {
      bottom: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
      top: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
      left: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
      right: ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"],
    };

    const [from, to] = clipMap[direction] || clipMap.bottom;

    gsap.fromTo(
      el,
      { clipPath: from, willChange: "clip-path" },
      {
        clipPath: to,
        duration: 1.1,
        ease: EASE.expo,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onComplete: () => gsap.set(el, { clearProps: "willChange" }),
      }
    );
  });
};

/* ─────────────────────────────────────────────────────────────
   Line draw — SVG paths or hr elements animate their length
   Usage: add data-line-draw to <hr> or <svg path>
   ───────────────────────────────────────────────────────────── */
const initLineDraws = () => {
  gsap.utils.toArray("[data-line-draw]").forEach((el) => {
    if (el.tagName === "HR" || el.tagName === "DIV") {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: EASE.expo,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    } else if (el.tagName === "path" || el.tagName === "PATH") {
      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  });
};

/* ─────────────────────────────────────────────────────────────
   Tilt card — 3D perspective tilt on mouse move
   Usage: add data-tilt to any card element
   ───────────────────────────────────────────────────────────── */
const initTiltCards = () => {
  const cards = document.querySelectorAll("[data-tilt]");
  const cleanups = [];

  cards.forEach((card) => {
    const intensity = parseFloat(card.dataset.tilt) || 10;
    gsap.set(card, { transformPerspective: 800 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -intensity;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * intensity;
      gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.4, ease: EASE.smooth });
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: EASE.elastic });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      gsap.set(card, { clearProps: "rotateX,rotateY,transformPerspective" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
};

/* ─────────────────────────────────────────────────────────────
   Floating elements — subtle continuous bob / drift animation
   Usage: add data-float="[delay]" to icons, blobs, decorations
   ───────────────────────────────────────────────────────────── */
const initFloatingElements = () => {
  gsap.utils.toArray("[data-float]").forEach((el) => {
    const delay = parseFloat(el.dataset.float) || 0;
    gsap.to(el, {
      y: "-=12",
      duration: 2.2,
      ease: EASE.sine,
      yoyo: true,
      repeat: -1,
      delay,
    });
  });
};

/* ─────────────────────────────────────────────────────────────
   Scroll velocity skew — elements skew slightly as you scroll fast
   Usage: add data-skew to any section or element
   ───────────────────────────────────────────────────────────── */
const initScrollSkew = (locoScroll) => {
  if (!locoScroll) return;

  let currentSkew = 0;
  const maxSkew = 5; // degrees

  locoScroll.on("scroll", ({ delta }) => {
    const velocity = delta?.y ?? 0;
    const target = Math.max(-maxSkew, Math.min(maxSkew, velocity * 0.06));
    currentSkew += (target - currentSkew) * 0.1;

    gsap.utils.toArray("[data-skew]").forEach((el) => {
      gsap.set(el, { skewY: currentSkew });
    });
  });
};

/* ═══════════════════════════════════════════════════════════════
   MAIN HOOK
   ═══════════════════════════════════════════════════════════════ */
export const useGsapAnimations = (isReady, heroRef) => {
  useEffect(() => {
    if (!isReady) return undefined;

    /* ── Cursor & interaction effects (no scroll dependency) ── */
    const cleanupCursor = initCursorFollower();
    const cleanupMagnetic = initMagneticElements();
    const cleanupTilt = initTiltCards();
    const cleanupImageHovers = initImageHovers();
    initFloatingElements();

    /* ── Hero entrance — scoped to heroRef ── */
    const heroCtx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Split-text on hero heading if present
      const heroHeading = document.querySelector("[data-hero-heading]");
      if (heroHeading) {
        splitAndAnimateText(heroHeading);
      }

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

      // Hero decorative blobs / shapes drift in
      tl.from(
        "[data-hero-deco]",
        {
          scale: 0,
          opacity: 0,
          rotation: -15,
          duration: 1.2,
          stagger: 0.12,
          ease: EASE.elastic,
        },
        "-=0.8"
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
    }, heroRef);

    /* ── Wait for Locomotive Scroll ── */
    const locoScroll = window.__locomotiveScroll;

    const initScrollTrigger = (loco) => {
      const cleanupProxy = loco ? setupLocoProxy(loco) : undefined;
      const scroller = loco ? loco.el : window;

      // Init effects that need the scroller
      initHorizontalScroll(scroller);
      initProgressBar(scroller);
      initScrollSkew(loco);

      // Wait for fonts + give images time to load
      let timeoutId;
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
        timeoutId = setTimeout(() => ScrollTrigger.refresh(), 800);
      });

      const stCtx = gsap.context(() => {
        /* ──────────────────────────────────────────
           Parallax & Zoom Scroll
           ────────────────────────────────────────── */
        gsap.utils.toArray("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.parallax) || -18,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });

        gsap.utils.toArray("[data-zoom-scroll]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.94 },
            {
              scale: 1.04,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
            }
          );
        });

        /* ──────────────────────────────────────────
           Clip-path reveals, line draws, counters,
           stagger grids (self-initialising via data attrs)
           ────────────────────────────────────────── */
        initClipReveals();
        initLineDraws();
        initCounters();
        initStaggerGrids();

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
            // Use char-split for section headings for a premium feel
            splitAndAnimateText(heading, {
              trigger: titleBlock,
              start: "top 85%",
              toggleActions: "play none none none",
            });
          }

          if (desc) {
            tl.from(
              desc,
              REVEAL_TO({ ...REVEAL_FROM, duration: 0.7 }),
              eyebrow ? "-=0.3" : 0
            );
          }
        });

        /* ──────────────────────────────────────────
           About Section — enhanced with clip + skew
           ────────────────────────────────────────── */
        const aboutSection = document.querySelector("#aboutme");
        if (aboutSection) {
          const aboutLeft = aboutSection.querySelector("[data-about-left]");
          if (aboutLeft) {
            gsap.from(aboutLeft, {
              x: -70,
              opacity: 0,
              clipPath: "inset(0% 30% 0% 0%)",
              duration: 1.1,
              ease: EASE.expo,
              scrollTrigger: { trigger: aboutLeft, start: "top 80%", toggleActions: "play none none none" },
              onComplete: () => gsap.set(aboutLeft, { clearProps: "clipPath" }),
            });
          }

          const aboutRight = aboutSection.querySelector("[data-about-right]");
          if (aboutRight) {
            gsap.from(aboutRight, {
              x: 70,
              opacity: 0,
              clipPath: "inset(0% 0% 0% 30%)",
              duration: 1.1,
              ease: EASE.expo,
              scrollTrigger: { trigger: aboutRight, start: "top 80%", toggleActions: "play none none none" },
              onComplete: () => gsap.set(aboutRight, { clearProps: "clipPath" }),
            });
          }

          // Timeline line draws itself down with a pulse at the end
          const timelineEl = aboutSection.querySelector("[data-about-timeline]");
          if (timelineEl) {
            gsap.from(timelineEl, {
              scaleY: 0,
              transformOrigin: "top center",
              duration: 1.4,
              ease: "power2.inOut",
              scrollTrigger: { trigger: timelineEl, start: "top 80%", toggleActions: "play none none none" },
            });
          }

          // Timeline dots — pop in sequentially along the line
          const dots = aboutSection.querySelectorAll("[data-timeline-dot]");
          if (dots.length) {
            gsap.from(dots, {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              stagger: 0.18,
              ease: EASE.bounce,
              scrollTrigger: { trigger: dots[0], start: "top 80%", toggleActions: "play none none none" },
            });
          }

          const highlights = aboutSection.querySelectorAll("[data-about-highlight]");
          if (highlights.length) {
            gsap.from(highlights, {
              y: 50,
              opacity: 0,
              scale: 0.93,
              duration: 0.75,
              stagger: { amount: 0.4, from: "start" },
              ease: EASE.smooth,
              scrollTrigger: { trigger: highlights[0], start: "top 85%", toggleActions: "play none none none" },
            });
          }

          const pills = aboutSection.querySelectorAll("[data-about-pill]");
          if (pills.length) {
            gsap.from(pills, {
              scale: 0,
              opacity: 0,
              rotation: gsap.utils.wrap([-6, 6]),
              duration: 0.55,
              stagger: { amount: 0.6, from: "random" }, // random stagger order = more organic
              ease: "back.out(2.2)",
              scrollTrigger: { trigger: pills[0], start: "top 90%", toggleActions: "play none none none" },
            });
          }
        }

        /* ──────────────────────────────────────────
           Skills Section — wave + scatter reveal
           ────────────────────────────────────────── */
        const skillsSection = document.querySelector("#skills");
        if (skillsSection) {
          skillsSection.querySelectorAll("[data-skills-category]").forEach((cat) => {
            gsap.from(cat, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: EASE.smooth,
              scrollTrigger: { trigger: cat, start: "top 88%", toggleActions: "play none none none" },
            });

            const line = cat.querySelector("[data-category-line]");
            if (line) {
              gsap.from(line, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: EASE.expo,
                scrollTrigger: { trigger: cat, start: "top 85%", toggleActions: "play none none none" },
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
                scrollTrigger: { trigger: cat, start: "top 82%", toggleActions: "play none none none" },
              });

              // Subtle pulse on hover for each badge
              badges.forEach((badge) => {
                badge.addEventListener("mouseenter", () =>
                  gsap.to(badge, { scale: 1.1, duration: 0.2, ease: EASE.smooth })
                );
                badge.addEventListener("mouseleave", () =>
                  gsap.to(badge, { scale: 1, duration: 0.3, ease: EASE.elastic })
                );
              });
            }
          });
        }

        /* ──────────────────────────────────────────
           Projects — cinematic card entrance
           Even cards: clip from left. Odd: clip from right.
           ────────────────────────────────────────── */
        document.querySelectorAll("[data-project-card]").forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });

          tl.from(card, {
            x: fromLeft ? -50 : 50,
            y: 30,
            opacity: 0,
            clipPath: fromLeft
              ? "inset(0% 100% 0% 0%)"
              : "inset(0% 0% 0% 100%)",
            scale: 0.95,
            duration: 0.95,
            ease: EASE.expo,
            onComplete: () => gsap.set(card, { clearProps: "clipPath" }),
          });

          // Stagger in card internals after the card arrives
          const cardInner = card.querySelectorAll("[data-card-reveal]");
          if (cardInner.length) {
            tl.from(
              cardInner,
              {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: EASE.smooth,
              },
              "-=0.4"
            );
          }
        });

        /* ──────────────────────────────────────────
           Contact Section — special entrance
           ────────────────────────────────────────── */
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: contactSection,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          const contactHeading = contactSection.querySelector("[data-contact-heading]");
          if (contactHeading) splitAndAnimateText(contactHeading);

          tl.from("[data-contact-field]", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: EASE.smooth,
          });

        }

        /* ──────────────────────────────────────────
           Footer — elegant fade-up with stagger
           ────────────────────────────────────────── */
        const footer = document.querySelector("[data-footer]");
        if (footer) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });

          tl.from(footer.querySelectorAll("[data-footer-col]"), {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: EASE.smooth,
          });

          tl.from(
            footer.querySelector("[data-footer-bottom]"),
            { y: 20, opacity: 0, duration: 0.5, ease: EASE.smooth },
            "-=0.3"
          );
        }
      });

      return () => {
        clearTimeout(timeoutId);
        cleanupProxy?.();                              // proxy torn down FIRST
        ScrollTrigger.getAll().forEach((t) => t.kill()); // kill stray triggers
        stCtx.revert();
      };
    };

    let cleanupST;
    const onReady = () => {
      cleanupST = initScrollTrigger(window.__locomotiveScroll); // read fresh here
    };

    if (locoScroll) {
      cleanupST = initScrollTrigger(locoScroll);
    } else {
      window.addEventListener("locomotiveReady", onReady, { once: true });
    }

    return () => {
      cleanupCursor();
      cleanupMagnetic();
      cleanupTilt();
      cleanupImageHovers();
      heroCtx.revert();
      if (cleanupST) cleanupST();
      window.removeEventListener("locomotiveReady", onReady);
    };
  }, [heroRef, isReady]);
};
