import { skills } from "../../data/skills";
import { SectionTitle } from "../ui/SectionTitle";
import { SkillBadge } from "../ui/SkillBadge";

export const SkillsSection = () => (
  <section id="skills" className="relative scroll-mt-28 px-6 py-24">
    <div data-parallax="-18" className="absolute right-0 top-28 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px] dark:bg-cyan-500/10" />
    <div data-parallax="12" className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/10" />
    
    <div className="relative mx-auto max-w-6xl">
      <SectionTitle
        eyebrow="Toolkit"
        title="Skills I use to ship modern web apps."
        description="Technologies and tools I use to build responsive, modern, and scalable web applications."
      />

      <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-5">
        {skills.map((skill, idx) => (
          <div key={skill.name} className="reveal-on-scroll opacity-0" style={{ animationDelay: `${idx * 100}ms` }}>
            <SkillBadge skill={skill} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
