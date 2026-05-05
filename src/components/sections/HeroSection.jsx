import { createElement } from "react";
import { Download, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { socialLinks } from "../../data/socialLinks";
import { HeroCodeSnippet } from "../ui/HeroCodeSnippet";

export const HeroSection = () => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Sumit Yadav SE.pdf";
    link.download = "Sumit Yadav SE.pdf";
    link.click();
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 sm:pt-32">
      <div data-hero-bg aria-hidden="true" className="hero-aceternity-bg">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-beams" />
        <div className="hero-vignette" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div data-hero-text className="z-10 min-w-0 text-center lg:text-left">
          <div
            data-hero-reveal
            className="mx-auto mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-blue-200/50 bg-white/60 px-3 py-2 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-md sm:px-4 sm:text-sm dark:border-cyan-300/20 dark:bg-white/[0.05] dark:text-cyan-200 lg:mx-0"
          >
            <Sparkles className="h-4 w-4" />
            Available for frontend and full-stack opportunities
          </div>

          <h1 data-hero-reveal className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-7xl md:tracking-[-0.06em] dark:text-white">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-sm pb-2 pr-4 inline-block">
              Sumit Yadav
            </span>
          </h1>

          <p data-hero-reveal className="mt-6 text-xl font-semibold text-slate-700 md:text-3xl dark:text-slate-200">
            Computer Engineering Student, Web Developer, and DSA Enthusiast.
          </p>

          <p data-hero-reveal className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300 lg:mx-0">
            I build responsive, polished web applications with React, Tailwind CSS, Node.js, and a strong problem-solving foundation in Java.
          </p>

          <div data-hero-reveal className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button onClick={handleResumeDownload}>
              <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </Button>
            <Button as="a" href="#project" variant="secondary">
              View Projects
            </Button>
          </div>

          <div data-hero-reveal className="mt-10 flex justify-center gap-4 lg:justify-start">
            {socialLinks.slice(0, 4).map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
              >
                {createElement(icon, { className: "h-5 w-5" })}
              </a>
            ))}
          </div>
        </div>

        <div data-hero-image className="relative mx-auto w-full min-w-0 max-w-full lg:ml-auto">
          <HeroCodeSnippet />
        </div>
      </div>
    </section>
  );
};
