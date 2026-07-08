import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/ThemeToggle";
import { Button } from "../ui/Button";
import { navigationLinks } from "../../data/navigation";
import { handleEmailClick } from "../../utils/contact";
import { scrollToSection } from "../../utils/scrollToSection";

const NavLinks = ({ onClick, className = "" }) => (
  <div className={`items-center gap-2 ${className}`}>
    {navigationLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        onClick={(event) => {
          scrollToSection(event, link.href);
          onClick?.();
        }}
        className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-950 hover:text-white dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-950"
      >
        {link.label}
      </a>
    ))}
  </div>
);

export const Navbar = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 z-[60] w-[calc(100%-1rem)] max-w-[1120px] -translate-x-1/2 rounded-full border border-white/50 px-2 py-2 transition-all duration-300 sm:w-[calc(100%-1.5rem)] sm:px-3 ${
        isScrolled 
          ? "top-3 bg-white/65 shadow-md backdrop-blur-md dark:border-white/5 dark:bg-slate-950/65" 
          : "top-4 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
      }`}
    >
      <nav className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
        <Logo />

        <NavLinks className="hidden md:flex" />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="hidden md:block">
            <Button onClick={handleEmailClick}>
              Contact Me
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/80 text-slate-900 md:hidden sm:h-11 sm:w-11 dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+12px)] overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/95 p-4 shadow-2xl backdrop-blur transition-all duration-300 md:hidden dark:border-white/10 dark:bg-slate-950/98 ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <NavLinks onClick={() => setMenuOpen(false)} className="flex flex-col w-full text-center" />
          <Button onClick={() => { handleEmailClick(); setMenuOpen(false); }} className="mt-2 w-full">
            Contact Me
          </Button>
        </div>
      </div>
    </header>
  );
};
