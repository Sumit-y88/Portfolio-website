import React from "react";

const HamBurgerIcon = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative w-10 h-10 flex items-center justify-center md:hidden"
      aria-label="Menu"
    >
      {/* Top line */}
      <span
        className={`absolute h-0.5 w-6 bg-white transition-all duration-300
          ${open ? "rotate-45" : "-translate-y-2"}
        `}
      />

      {/* Middle line */}
      <span
        className={`absolute h-0.5 w-6 bg-white transition-all duration-300
          ${open ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* Bottom line */}
      <span
        className={`absolute h-0.5 w-6 bg-white transition-all duration-300
          ${open ? "-rotate-45" : "translate-y-2"}
        `}
      />
    </button>
  );
};

export default HamBurgerIcon;
