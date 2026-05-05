export const BackgroundOrbs = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950" style={{ minHeight: '100%' }}>
    {/* Architectural Background Grid */}
    <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" />

    {/* Animated Floating Blobs – use will-change to promote to GPU layer */}
    <div className="absolute -top-[20%] left-[-10%] h-[600px] w-[600px] animate-blob rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-600/20" style={{ willChange: 'transform' }} />
    <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] animate-blob rounded-full bg-cyan-400/20 blur-[120px] animation-delay-2000 dark:bg-indigo-600/20" style={{ willChange: 'transform' }} />
    <div className="absolute -bottom-[20%] left-[20%] h-[700px] w-[700px] animate-blob rounded-full bg-emerald-400/15 blur-[120px] animation-delay-4000 dark:bg-sky-500/15" style={{ willChange: 'transform' }} />
    
    {/* Additional subtle gradient overlays to tie it all together */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-slate-50/80 dark:from-slate-950/80 dark:to-slate-950/80" />
  </div>
);
