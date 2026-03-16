import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiMysql,
  SiC,
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact className="text-sky-400" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-200" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "Java", icon: <FaJava className="text-red-400" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "C", icon: <SiC className="text-blue-300" /> },
  { name: "GitHub", icon: <FaGithub className="text-white" /> },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full bg-black text-white py-24 px-6 md:px-12">
      
      <div className="absolute top-1/2 right-[-80px] w-[200px] h-[200px] md:w-[320px] md:h-[320px] bg-indigo-500/30 rounded-full blur-[100px] -translate-y-1/2 z-0 animate-float2"></div>

      <div className="absolute top-1/2 right-[40px] w-[150px] h-[150px] md:w-[260px] md:h-[260px] bg-blue-500/25 rounded-full blur-[100px] -translate-y-1/3 z-0 animate-float1"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My Skills
        </h2>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
          Technologies and tools I use to build responsive, modern, and scalable web applications.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-gray-700 bg-zinc-900 hover:bg-zinc-800 hover:border-gray-500 transition-all duration-300 shadow-md"
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-sm md:text-base font-medium whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}