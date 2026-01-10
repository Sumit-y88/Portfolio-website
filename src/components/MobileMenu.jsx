import React from "react";
import ContactMe from "./ContactMe";
import { handleEmailClick } from "../utils/Contact";

const tabs = [
  { label: "About me", path: "#aboutme" },
  { label: "Skills", path: "#skills" },
  { label: "Projects", path: "#projects" },
];

const MobileMenu = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 w-[90%]
        bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl
        transition-all duration-300 z-40 md:hidden
        ${open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
        }
      `}
    >
      <div className="flex flex-col items-center gap-6 py-6">
        {tabs.map((tab, index) => (
          <div key={index} className="group relative w-max">
            <a
              href={tab.path}
              className="text-gray-300 hover:text-white
                transition-colors duration-200 font-medium text-lg"
              onClick={() => setOpen(false)}
            >
              {tab.label}
            </a>

            {/* Animated underline */}
            <span
              className="absolute -bottom-1 left-0 w-0 h-0.5
                bg-linear-to-r from-orange-400 via-pink-500 to-purple-600
                transition-all duration-300 group-hover:w-full"
            />
          </div>
        ))}

        <div className="w-full h-px bgwhite/10 my-6 flex items-center justify-center">
          <button
            onClick={() => {
              setOpen(false);
              handleEmailClick();
            }}
            className="bg-blue-700 px-3 py-2 rounded-full hover:bg-blue-800"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
