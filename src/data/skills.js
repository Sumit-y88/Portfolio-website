import { FaCss3Alt, FaGithub, FaHtml5, FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import { SiC, SiExpress, SiJavascript, SiMongodb, SiMysql, SiTailwindcss, SiCloudinary, SiRedis, SiVercel, SiRender } from "react-icons/si";

export const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "Java", icon: FaJava, color: "text-red-400" },
      { name: "C", icon: SiC, color: "text-blue-300" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: FaReact, color: "text-sky-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Express.js", icon: SiExpress, color: "text-zinc-900 dark:text-zinc-200" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
      { name: "Redis", icon: SiRedis, color: "text-red-500" },
    ],
  },
  {
    title: "Tools & Deployment",
    skills: [
      { name: "GitHub", icon: FaGithub, color: "text-zinc-900 dark:text-white" },
      { name: "Cloudinary", icon: SiCloudinary, color: "text-blue-500" },
      { name: "Vercel", icon: SiVercel, color: "text-zinc-900 dark:text-white" },
      { name: "Render", icon: SiRender, color: "text-teal-400" },
    ],
  },
];

// Flat export for backward compatibility if needed elsewhere
export const skills = skillCategories.flatMap(c => c.skills);
