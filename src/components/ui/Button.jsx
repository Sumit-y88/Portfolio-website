import { createElement } from "react";

const variants = {
  primary:
    "bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(37,99,235,0.28)] dark:bg-white dark:text-slate-950",
  secondary:
    "border border-slate-300/80 bg-white/60 text-slate-900 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
};

export const Button = ({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) =>
  createElement(
    as,
    {
      className: `group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${variants[variant]} ${className}`,
      ...props,
    },
    children,
  );
