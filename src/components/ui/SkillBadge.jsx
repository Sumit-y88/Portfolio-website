import { useRef, useState } from "react";

export const SkillBadge = ({ skill }) => {
  const Icon = skill.icon;
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-slate-200/50 bg-white/50 px-3 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 md:w-48 dark:border-white/10 dark:bg-slate-900/40"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.15), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 dark:block"
        style={{
          opacity,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100/60 shadow-inner sm:h-12 sm:w-12 sm:rounded-xl dark:bg-slate-800/60">
        <Icon className={`text-lg transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_currentColor] sm:text-2xl ${skill.color}`} />
      </div>
      <span className="relative z-10 text-sm font-medium tracking-wide text-slate-800 transition-colors group-hover:text-blue-600 sm:text-base sm:truncate sm:whitespace-nowrap dark:text-slate-200 dark:group-hover:text-cyan-400">
        {skill.name}
      </span>
    </div>
  );
};
