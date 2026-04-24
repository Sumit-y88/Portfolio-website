import { createElement } from "react";
import { MapPin } from "lucide-react";
import { navigationLinks } from "../../data/navigation";
import { socialLinks } from "../../data/socialLinks";

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white/60 py-10 text-slate-600 backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
    <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.2fr_0.8fr_1fr]">
      <div>
        <h3 className="text-xl font-black text-slate-950 dark:text-white">Sumit Yadav</h3>
        <p className="mt-2 text-sm">Computer Engineering Student</p>
        <p className="text-sm">MERN Stack Developer</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-950 dark:text-white">Quick Links</h4>
        <nav className="mt-3 flex flex-wrap gap-3">
          {navigationLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm transition-colors hover:text-blue-600 dark:hover:text-cyan-300">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <h4 className="font-bold text-slate-950 dark:text-white">Get in Touch</h4>
        <a href="mailto:sumit.yadav.0287@gmail.com" className="mt-3 block break-all text-sm transition-colors hover:text-blue-600 dark:hover:text-cyan-300">
          sumit.yadav.0287@gmail.com
        </a>
        <p className="mt-2 flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          Mumbai, India
        </p>
      </div>
    </div>

    <div className="mx-auto mt-8 flex max-w-6xl flex-col-reverse items-center justify-between gap-5 border-t border-slate-200 px-6 pt-6 md:flex-row dark:border-white/10">
      <p className="text-center text-xs">Built with React, Tailwind CSS, and GSAP. © 2026 Sumit Yadav</p>
      <div className="flex items-center gap-4">
        {socialLinks.slice(0, 4).map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-all hover:-translate-y-1 hover:text-blue-600 dark:hover:text-cyan-300">
            {createElement(icon, { className: "h-5 w-5" })}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
