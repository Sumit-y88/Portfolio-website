export const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-[2rem] border border-slate-200/80 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] ${className}`}
    {...props}
  >
    {children}
  </div>
);
