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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDE1LCAyMyLCA0MiwgMC4wNSkiLz4KPC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+Cjwvc3ZnPg==')]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Toolkit"
          title="Skills I use to ship modern web apps."
          description="Technologies and tools I use to build responsive, modern, and scalable web applications."
        />

        <div className="mt-16 flex flex-col gap-14">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} className="reveal-on-scroll" style={{ animationDelay: `${catIdx * 100}ms` }}>
              <div className="mb-8 flex items-center gap-4">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
              </div>
              <div className="flex flex-wrap gap-4 md:gap-5">
                {category.skills.map((skill, idx) => (
                  <SkillBadge key={`${skill.name}-${idx}`} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
