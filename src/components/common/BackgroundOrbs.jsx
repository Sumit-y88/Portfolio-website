export const BackgroundOrbs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
    {/* Architectural Background Grid */}
    <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" />

    {/* Animated Floating Blobs - Size and blur reduced for Chrome performance */}
    <div className="absolute -top-[10%] left-[-5%] h-[300px] w-[300px] animate-blob rounded-full bg-blue-500/10 blur-[60px] dark:bg-blue-600/10" />
    <div className="absolute right-[-5%] top-[5%] h-[250px] w-[250px] animate-blob rounded-full bg-cyan-400/10 blur-[60px] animation-delay-2000 dark:bg-indigo-600/10" />
    <div className="absolute -bottom-[10%] left-[10%] h-[350px] w-[350px] animate-blob rounded-full bg-emerald-400/10 blur-[60px] animation-delay-4000 dark:bg-sky-500/10" />
    
    {/* Additional subtle gradient overlays to tie it all together */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-slate-50/80 dark:from-slate-950/80 dark:to-slate-950/80" />
  </div>
);
