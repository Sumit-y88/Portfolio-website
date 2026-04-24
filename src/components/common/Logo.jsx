export const Logo = () => (
  <a href="#home" aria-label="Go to home" className="flex items-center gap-3">
    <span className="grid h-11 w-11 overflow-hidden rounded-full border border-white/40 bg-white shadow-lg dark:border-white/10 dark:bg-white/10">
      <img className="h-full w-full object-cover" src="/logo.png" alt="Sumit Yadav logo" />
    </span>
    <span className="hidden text-sm font-black leading-tight tracking-tight text-slate-950 sm:block dark:text-white">
      Sumit
      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Portfolio</span>
    </span>
  </a>
);
