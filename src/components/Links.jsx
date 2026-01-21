import { useState } from "react";

const tabs = [
  { text: "Home", rot: "#home" },
  { text: "About me", rot: "#aboutme" },
  { text: "Skills", rot: "#skills" },
  { text: "Project", rot: "#project" },
];

const Links = () => {
  const [active, setActive] = useState("#home");

  return (
    <div className="flex flex-row items-center gap-8">
      {tabs.map((tabLink, idx) => (
        <div key={idx} className="group relative w-max hidden md:block">
          <a
            href={tabLink.rot}
            onClick={() => setActive(tabLink.rot)}
            className={`text-lg text-balance transition-colors duration-200 ${
              active === tabLink.rot ? "text-white" : "text-gray-300"
            } hover:text-white`}
          >
            {tabLink.text}
          </a>

          {/* Animated underline */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
        </div>
      ))}
    </div>
  );
};

export default Links;
