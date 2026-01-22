import { useState, useEffect } from 'react'

// Simulated components for demo
// const Navbar = () => <nav className="p-4 bg-gray-900">Navbar</nav>
// const Animation = () => null
// const MainSection = () => <div className="h-screen flex items-center justify-center"><h2 className="text-4xl">Main Section</h2></div>
// const AboutSection = () => <div className="h-screen flex items-center justify-center bg-gray-900"><h2 className="text-4xl">About Section</h2></div>
// const SkillsSection = () => <div className="h-screen flex items-center justify-center"><h2 className="text-4xl">Skills Section</h2></div>
// const Footer = () => <footer className="p-4 bg-gray-900">Footer</footer>

const LoadingPage = ({ isExiting }) => {
  return (
    <div 
      className={`bg-black flex items-center justify-center w-full h-screen fixed inset-0 z-51 transition-transform duration-1000 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <h1 className="welcome blink text-7xl md:text-9xl text-indigo-500">WELCOME</h1>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}
export default LoadingPage;