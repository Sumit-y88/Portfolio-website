import { ExternalLink, Github } from "lucide-react";
import { Card } from "./Card";

export const ProjectCard = ({ project }) => (
  <Card className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/50 hover:bg-white/90 hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-cyan-400/50 dark:hover:bg-white/[0.08] dark:hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)]">
    
    <div className="mb-4 flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>

      <div className="flex gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            title="View Source Code"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-cyan-500/10 dark:text-cyan-400 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-300"
            title="Live Demo"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>

    <h3 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400">
      {project.title}
    </h3>
    <p className="mt-4 flex-grow text-base leading-relaxed text-slate-600 dark:text-slate-400">
      {project.description}
    </p>
    
    {project.techStack && (
      <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    )}
  </Card>
);
