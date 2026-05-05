import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";

export const ProjectsSection = () => (
  <section id="project" className="relative scroll-mt-28 px-6 py-24">
    <div data-parallax="-12" className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-400/5 blur-[120px] dark:bg-blue-500/10" />
    
    <div className="relative mx-auto max-w-6xl">
      <SectionTitle
        eyebrow="Selected work"
        title="Projects with real product thinking."
        description="A few projects I have built to practice full-stack development, real-time features, and modern UI design."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, idx) => (
          <div key={project.title} data-project-card>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
