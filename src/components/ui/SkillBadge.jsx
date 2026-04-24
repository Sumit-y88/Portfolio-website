export const SkillBadge = ({ skill }) => {
  const Icon = skill.icon;

  return (
    <div className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 px-5 py-3.5 text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/50 hover:bg-white/90 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:bg-white/[0.08] dark:hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)]">
      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:from-cyan-400/10" />
      <Icon className={`relative z-10 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor] ${skill.color}`} />
      <span className="relative z-10 whitespace-nowrap text-sm font-semibold tracking-wide md:text-base">{skill.name}</span>
    </div>
  );
};
