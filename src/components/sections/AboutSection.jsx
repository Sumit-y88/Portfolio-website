import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import { BookOpen, Code2, Sparkles } from "lucide-react";

export const AboutSection = () => (
  <section id="aboutme" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
    <div data-parallax="-15" className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px] dark:bg-blue-600/10" />

    <SectionTitle
      eyebrow="About Me"
      title="Engineering with purpose."
      description="A glimpse into my background, education, and what drives me as a developer."
    />
    
    <div className="relative mt-16 grid gap-6 md:grid-cols-3">
      {/* Education Card */}
      <Card className="reveal-on-scroll opacity-0 flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-white/[0.02]">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <BookOpen className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Education</h3>
        <p className="flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Currently pursuing Computer Engineering at TCET, Mumbai University. I've built a strong foundation in core engineering principles, maintaining an aggregate CGPA of 9.79.
        </p>
      </Card>

      {/* Frontend Passion Card */}
      <Card className="reveal-on-scroll opacity-0 flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-white/[0.02]" style={{ animationDelay: "150ms" }}>
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
          <Code2 className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Frontend Focus</h3>
        <p className="flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Passionate about building responsive, modern, and user-friendly applications. I love turning complex technical problems into elegant, intuitive interfaces.
        </p>
      </Card>

      {/* Beyond Frontend Card */}
      <Card className="reveal-on-scroll opacity-0 flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-white/[0.02]" style={{ animationDelay: "300ms" }}>
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Beyond the UI</h3>
        <p className="flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Constantly exploring backend technologies and strengthening my problem-solving skills with Data Structures and Algorithms in Java.
        </p>
      </Card>
    </div>
  </section>
);
