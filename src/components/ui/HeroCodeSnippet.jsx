import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";

export const HeroCodeSnippet = () => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto perspective-1000">
      {/* Background Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/30 via-cyan-400/20 to-emerald-400/20 blur-2xl dark:from-blue-500/20 dark:via-cyan-400/10 dark:to-emerald-400/10" />

      {/* Floating Icons */}
      <div className="absolute -left-6 top-10 animate-float z-20" style={{ animationDelay: "0s" }}>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/60 text-sky-500 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
          <FaReact className="h-7 w-7 animate-[spin_10s_linear_infinite]" />
        </div>
      </div>

      <div className="absolute -right-8 top-32 animate-float z-20" style={{ animationDelay: "1.5s" }}>
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/60 text-cyan-500 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
          <SiTailwindcss className="h-8 w-8" />
        </div>
      </div>

      <div className="absolute -bottom-6 left-16 animate-float z-20" style={{ animationDelay: "3s" }}>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/60 text-green-500 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
          <FaNodeJs className="h-7 w-7" />
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
        <div className="p-5 text-sm font-mono leading-loose text-slate-600 dark:text-slate-300 sm:text-base">
          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">1</span>
            <span>
              <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">developer</span>{" "}
              <span className="text-purple-600 dark:text-purple-400">=</span> {"{"}
            </span>
          </div>
          
          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">2</span>
            <span className="pl-6">
              name<span className="text-purple-600 dark:text-purple-400">:</span>{" "}
              <span className="text-amber-600 dark:text-amber-300">"Sumit Yadav"</span>,
            </span>
          </div>

          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">3</span>
            <span className="pl-6">
              role<span className="text-purple-600 dark:text-purple-400">:</span>{" "}
              <span className="text-amber-600 dark:text-amber-300">"Full Stack Engineer"</span>,
            </span>
          </div>

          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">4</span>
            <span className="pl-6">
              skills<span className="text-purple-600 dark:text-purple-400">:</span> [
            </span>
          </div>

          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">5</span>
            <span className="pl-12 text-amber-600 dark:text-amber-300">
              "React", "Node.js", "ExpressJS", "Tailwind CSS", "JavaScript"
            </span>
          </div>

          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">6</span>
            <span className="pl-6">],</span>
          </div>

          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">7</span>
            <span className="pl-6">
              hardWorker<span className="text-purple-600 dark:text-purple-400">:</span>{" "}
              <span className="text-cyan-600 dark:text-cyan-400">true</span>
            </span>
          </div>

          <div className="flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">8</span>
            <span>{"}"};</span>
          </div>
          
          <div className="flex mt-2">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">9</span>
            <span>
              <span className="text-purple-600 dark:text-purple-400">export default</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">developer</span>;
            </span>
          </div>
          
          <div className="mt-3 flex">
            <span className="w-8 select-none text-slate-400 dark:text-slate-500">10</span>
            <span className="animate-pulse text-slate-400">|</span>
          </div>

        </div>
      </div>
    </div>
  );
};
