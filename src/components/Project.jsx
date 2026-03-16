import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    title: "Chat Application",
    description:
      "A real-time chat website with authentication, rooms, messaging, and file sharing using Socket.IO.",
    image:
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=1000&q=80",
    link: "https://infra-chat-sudo1.vercel.app/",
  },
  {
    title: "Inventory Management System",
    description:
      "A web app to manage products, stock, and shop records with a clean dashboard and secure login.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=80",
    link: "https://github.com/Sumit-y88/Inventory-system",
  },
  {
    title: "Password Manager",
    description:
      "A secure password manager project built for storing and managing saved credentials safely.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1000&q=80",
    link: "https://password-manager-mern-bkri.vercel.app/",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with React and Tailwind CSS to showcase skills and projects.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=80",
    link: "https://sumity88.in",
  },
];

export default function ProjectsSection() {
  return (
    <section id="project" className="relative w-full bg-black text-white mt-12 mb-24 py-12 px-6 md:px-12 overflow-hidden">
        
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My Projects
        </h2>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          A few projects I have built to practice full-stack development, real-time
          features, and modern UI design.
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-14"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:border-indigo-500/50">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-6">
                      {project.description}
                    </p>

                    <div className="mt-4">
                      <span className="inline-block text-sm font-medium text-indigo-400">
                        View Project →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}