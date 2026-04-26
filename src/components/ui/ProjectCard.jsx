import { ExternalLink, Github } from "lucide-react";
import { useRef, useState, useCallback } from "react";

export const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation in degrees
    const maxRotate = 6;
    
    // Calculate rotation values. Hover top -> rotateX positive. Hover bottom -> rotateX negative.
    const rotateX = ((y - centerY) / centerY) * -maxRotate;
    // Hover left -> rotateY negative. Hover right -> rotateY positive.
    const rotateY = ((x - centerX) / centerX) * maxRotate;

    setTransformStyle(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all ease-out dark:bg-slate-900/60 ${
        isHovered ? "duration-100" : "duration-500"
      }`}
    >
      {/* Base Border (Always visible) */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-slate-200/60 dark:border-white/10" />

      {/* Dynamic Hover Border Glow (Using Proper Masks for localized edge) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: "1.5px", // Thickness of the border glow
          background: isHovered 
            ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.8), rgba(59,130,246,0.4), transparent 50%)` 
            : "",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      
      {/* Inner Ambient Spotlight (Very soft, diffused light like Vercel/Linear) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.05), transparent 40%)` 
            : "",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner dark:bg-cyan-500/10 dark:text-cyan-400">
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:scale-110 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:scale-110 hover:bg-blue-100 hover:text-blue-700 dark:bg-cyan-500/10 dark:text-cyan-400 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-300"
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
          <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800/60">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800/80 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
