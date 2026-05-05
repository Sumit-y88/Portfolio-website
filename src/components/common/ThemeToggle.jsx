import { Moon, Sun } from "lucide-react";

export const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    type="button"
    onClick={toggleTheme}
    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/80 text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 sm:h-11 sm:w-11 dark:border-white/10 dark:bg-white/10 dark:text-white"
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
  </button>
);
