import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";

export const HeroCodeSnippet = () => {
  return (
    <div className="relative mx-auto w-full max-w-[500px] perspective-1000">
      {/* Background Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/30 via-cyan-400/20 to-emerald-400/20 blur-2xl dark:from-blue-500/20 dark:via-cyan-400/10 dark:to-emerald-400/10" />

      {/* Floating Icons */}
      <div className="absolute -left-1 top-10 z-20 animate-float sm:-left-6" style={{ animationDelay: "0s" }}>
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/60 text-sky-500 shadow-xl backdrop-blur-md sm:h-12 sm:w-12 sm:rounded-2xl dark:border-white/10 dark:bg-slate-900/60">
          <FaReact className="h-5 w-5 animate-[spin_10s_linear_infinite] sm:h-7 sm:w-7" />
        </div>
      </div>

      <div className="absolute -right-1 top-32 z-20 animate-float sm:-right-8" style={{ animationDelay: "1.5s" }}>
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/60 text-cyan-500 shadow-xl backdrop-blur-md sm:h-14 sm:w-14 sm:rounded-2xl dark:border-white/10 dark:bg-slate-900/60">
          <SiTailwindcss className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
      </div>

      <div className="absolute -bottom-3 left-10 z-20 animate-float sm:-bottom-6 sm:left-16" style={{ animationDelay: "3s" }}>
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/60 text-green-500 shadow-xl backdrop-blur-md sm:h-12 sm:w-12 sm:rounded-2xl dark:border-white/10 dark:bg-slate-900/60">
          <FaNodeJs className="h-5 w-5 sm:h-7 sm:w-7" />
        </div>
      </div>

      {/* Main Code Editor Window */}
      <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
        
        {/* Editor Header */}
        <div className="flex items-center gap-2 border-b border-slate-200/50 bg-slate-100/50 px-4 py-3 dark:border-white/5 dark:bg-slate-800/50">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400 shadow-sm" />
            <div className="h-3 w-3 rounded-full bg-amber-400 shadow-sm" />
            <div className="h-3 w-3 rounded-full bg-green-400 shadow-sm" />
          </div>
          <div className="mx-auto flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <SiJavascript className="h-3.5 w-3.5 text-yellow-500" />
            developer.js
          </div>
        </div>

        {/* Editor Content */}
        <div className="overflow-x-auto p-4 text-xs font-mono leading-loose text-slate-600 sm:p-5 sm:text-base dark:text-slate-300">
          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">1</span>
            <span>
              <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">developer</span>{" "}
              <span className="text-purple-600 dark:text-purple-400">=</span> {"{"}
            </span>
          </div>
          
          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">2</span>
            <span className="pl-6">
              name<span className="text-purple-600 dark:text-purple-400">:</span>{" "}
              <span className="text-amber-600 dark:text-amber-300">"Sumit Yadav"</span>,
            </span>
          </div>

          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">3</span>
            <span className="pl-6">
              role<span className="text-purple-600 dark:text-purple-400">:</span>{" "}
              <span className="text-amber-600 dark:text-amber-300">"Full Stack Engineer"</span>,
            </span>
          </div>

          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">4</span>
            <span className="pl-6">
              skills<span className="text-purple-600 dark:text-purple-400">:</span> [
            </span>
          </div>

          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">5</span>
            <span className="pl-12 text-amber-600 dark:text-amber-300">
              "React", "Node.js", "ExpressJS", "Tailwind CSS", "JavaScript"
            </span>
          </div>

          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">6</span>
            <span className="pl-6">],</span>
          </div>

          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">7</span>
            <span className="pl-6">
              hardWorker<span className="text-purple-600 dark:text-purple-400">:</span>{" "}
              <span className="text-cyan-600 dark:text-cyan-400">true</span>
            </span>
          </div>

          <div className="flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">8</span>
            <span>{"}"};</span>
          </div>
          
          <div className="mt-2 flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">9</span>
            <span>
              <span className="text-purple-600 dark:text-purple-400">export default</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">developer</span>;
            </span>
          </div>
          
          <div className="mt-3 flex min-w-max">
            <span className="w-8 shrink-0 select-none text-slate-400 dark:text-slate-500">10</span>
            <span className="animate-pulse text-slate-400">|</span>
          </div>

        </div>
      </div>
    </div>
  );
};
