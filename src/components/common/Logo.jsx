export const Logo = () => (
  <a href="#home" aria-label="Go to home" className="flex min-w-0 items-center gap-2 sm:gap-3">
    <span className="grid h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/40 bg-white shadow-lg sm:h-11 sm:w-11 dark:border-white/10 dark:bg-white/10">
      <img className="h-full w-full object-cover" src="/logo.png" alt="Sumit Yadav logo" />
    </span>
    <span className="hidden text-sm font-black leading-tight tracking-tight text-slate-950 sm:block dark:text-white">
      Sumit
      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Portfolio</span>
    </span>
  </a>
);
