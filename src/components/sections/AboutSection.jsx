import { SectionTitle } from "../ui/SectionTitle";
import { BookOpen, Code2, Sparkles } from "lucide-react";

const aboutHighlights = [
  {
    title: "Education",
    icon: BookOpen,
    text: "Computer Engineering student at TCET, Mumbai University, with an aggregate CGPA of 9.79 and a strong core engineering foundation.",
  },
  {
    title: "Frontend Focus",
    icon: Code2,
    text: "I build responsive, modern interfaces and enjoy turning complex technical ideas into polished, intuitive web experiences.",
  },
  {
    title: "Beyond the UI",
    icon: Sparkles,
    text: "I keep sharpening backend concepts and Data Structures and Algorithms in Java so my work stays practical end to end.",
  },
];

export const AboutSection = () => (
  <section id="aboutme" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
    <div data-parallax="-15" className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px] dark:bg-blue-600/10" />
    <div aria-hidden="true" className="about-aceternity-bg" />

    <div className="relative z-10">
      <SectionTitle
        eyebrow="About Me"
        title="Engineering with purpose."
        description="A glimpse into my background, education, and what drives me as a developer."
      />
    </div>

    <div className="reveal-on-scroll relative mt-16 grid gap-12 opacity-0 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="relative">
        <p className="max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
          I like building products where the interface feels calm, fast, and useful. My work sits at the intersection of{" "}
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 bg-clip-text font-bold text-transparent">
            clean frontend craft
          </span>
          , strong fundamentals, and the curiosity to understand how the full system fits together.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {["React", "Tailwind CSS", "Node.js", "Java DSA", "MySQL"].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200/70 bg-white/55 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="about-flow-panel relative overflow-hidden p-6">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.12),transparent_30%)]" />
        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-transparent via-blue-400/70 to-transparent dark:via-cyan-300/60" />

          <div className="space-y-8">
            {aboutHighlights.map(({ title, icon: Icon, text }) => (
              <div key={title} className="group relative grid grid-cols-[3rem_1fr] gap-5">
                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-[0_0_35px_rgba(37,99,235,0.18)] transition-colors duration-300 group-hover:border-cyan-300 group-hover:text-cyan-600 dark:border-white/10 dark:bg-slate-950 dark:text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="border-b border-slate-200/70 pb-8 last:border-b-0 last:pb-0 dark:border-white/10">
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
