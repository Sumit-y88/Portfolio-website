import { skillCategories } from "../../data/skills";
import { SectionTitle } from "../ui/SectionTitle";
import { SkillBadge } from "../ui/SkillBadge";

export const SkillsSection = () => {
  return (
    <section id="skills" className="relative scroll-mt-28 overflow-hidden px-6 py-24">
      {/* Background Gradients */}
      <div data-parallax="-18" className="absolute right-0 top-28 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px] dark:bg-cyan-500/10" />
      <div data-parallax="12" className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/10" />
      
      {/* Subtle Grid Pattern for Aceternity feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDE1LCAyMywgNDIsIDAuMDUpIi8+Cjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+Cjwvc3ZnPg==')]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Toolkit"
          title="Skills I use to ship modern web apps."
          description="Technologies and tools I use to build responsive, modern, and scalable web applications."
        />

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:gap-14">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} data-skills-category>
              <div className="mb-5 flex items-center gap-3 md:mb-8 md:gap-4">
                <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl dark:text-white">
                  {category.title}
                </h3>
                <div data-category-line className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:gap-5">
                {category.skills.map((skill, idx) => (
                  <div key={`${skill.name}-${idx}`} data-skill-badge>
                    <SkillBadge skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
