export const scrollToSection = (event, href) => {
  if (!href?.startsWith("#")) return;

  const target = document.querySelector(href);
  if (!target) return;

  event?.preventDefault();

  const locoScroll = window.__locomotiveScroll;
  const offset = -96;

  if (locoScroll) {
    locoScroll.scrollTo(target, {
      duration: 800,
      offset,
      disableLerp: false,
    });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  window.history.pushState(null, "", href);
};
