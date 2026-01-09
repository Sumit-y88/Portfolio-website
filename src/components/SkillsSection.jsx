import React from "react";

const skills = [
  {
    LogoImage: "html.png",
    CardHeading: "HTML",
    feature1: "Easy to learn and use",
    feature2: "Platform independent",
    feature3: "Supports multimedia elements",
    feature4: "Provides hyperlinking between pages",
    feature5: "Supported by all web browsers",
  },
  {
    LogoImage: "css.png",
    CardHeading: "CSS",
    feature1: "Controls layout and design",
    feature2: "Responsive web design support",
    feature3: "Supports animations and transitions",
    feature4: "Improves user interface",
    feature5: "Works with all modern browsers",
  },
  {
    LogoImage: "javascript.png",
    CardHeading: "JavaScript",
    feature1: "Adds interactivity to web pages",
    feature2: "Supports event handling",
    feature3: "Client-side and server-side usage",
    feature4: "Works with HTML and CSS",
    feature5: "Large ecosystem and community",
  },
  {
    LogoImage: "tailwind.png",
    CardHeading: "Tailwind CSS",
    feature1: "Utility-first CSS framework",
    feature2: "Highly customizable design system",
    feature3: "Responsive and mobile-first",
    feature4: "Faster UI development",
    feature5: "No need to write custom CSS",
  },
  {
    LogoImage: "react.png",
    CardHeading: "React",
    feature1: "Component-based architecture",
    feature2: "Reusable UI components",
    feature3: "Virtual DOM for better performance",
    feature4: "Strong ecosystem and libraries",
    feature5: "Used for single-page applications",
  },
  {
    LogoImage: "mysql.png",
    CardHeading: "MySQL",
    feature1: "Open-source relational database",
    feature2: "Uses SQL for data management",
    feature3: "Fast and reliable performance",
    feature4: "Secure and scalable",
    feature5: "Widely used in web applications",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills"
      className=" relative  w-full py-20 px-10 mt-20 overflow-hidden ">

      {/* Background Circle */}
      <div
        className="absolute top-20 -right-[200px]
    w-[400px] h-[400px]
    rounded-full bg-blue-600 blur-3xl opacity-30
    z-0 animate-[aboutFloat_8s_ease-in-out_infinite]"
      ></div>

      <div
        className="absolute top-100 -left-[200px]
    w-[422px] h-[451px]
    rounded-full bg-indigo-600 blur-xl opacity-50
    z-0 animate-[aboutFloat_8s_ease-in-out_infinite]"
      ></div>

      <div
        className="absolute -bottom-5 -right-30
    w-[450px] h-[350px]
    rounded-full bg-indigo-600 blur-2xl 
    z-0 animate-[float1_10s_ease-in-out_infinite]"
      ></div>
      <div
        className="absolute -bottom-10 right-40
    w-[300px] h-[300px]
    rounded-full bg-blue-500 blur-2xl
    z-0 animate-[float3_10s_ease-in-out_infinite]"
      ></div>


      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-5xl md:text-6xl font-bold text-indigo-400">
          My Skills
        </h2>
        <p className="text-gray-400 mt-2">
          Technologies I work with
        </p>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-start group">

        {skills.map((items, idx) => (
          <div
            key={idx}
            className="card z-15 bg-linear-to-br from-indigo-600 to-indigo-900 rounded-2xl flex flex-col gap-2 items-start pl w-full overflow-hidden cursor-pointer  transition-all duration-300 ease-out
  shadow-[0_15px_30px_rgba(99,102,241,0.25)]
  hover:shadow-[0_25px_60px_rgba(59,130,246,0.55)]
  hover:-translate-y-2"
          >
            {/* Logo */}
            <div className="logo flex items-center justify-center  w-full bg-indigo-950">
              <img
                className="w-50 h-50 object-cover"
                src={items.LogoImage}
                alt={items.CardHeading}
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="logoName text-start p-4">
              <h2 className="text-2xl font-semibold">
                {items.CardHeading}
              </h2>

              <ul className="text-[10px] my-2 text-gray-400 leading-loose">
                <li>• {items.feature1}</li>
                <li>• {items.feature2}</li>
                <li>• {items.feature3}</li>
                <li>• {items.feature4}</li>
                <li>• {items.feature5}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
