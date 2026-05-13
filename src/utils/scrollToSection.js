export const scrollToSection = (event, href) => {
  if (!href?.startsWith("#")) return;

  const target = document.querySelector(href);
  if (!target) return;

  event?.preventDefault();

  const offset = -96;
  const top = target.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });

  window.history.pushState(null, "", href);
};
