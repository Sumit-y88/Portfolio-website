import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";

export const ProjectsSection = () => (
  <section id="project" className="section-blend relative scroll-mt-28 overflow-hidden px-6 py-24">
    {/* Removed heavy blur orb for performance */}
    
    <div className="relative z-10 mx-auto max-w-6xl">
      <SectionTitle
        eyebrow="Selected work"
        title="Projects with real product thinking."
        description="A few projects I have built to practice full-stack development, real-time features, and modern UI design."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.title} data-project-card>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
