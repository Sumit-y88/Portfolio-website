import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { SiLeetcode } from "react-icons/si";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg md:text-xl font-bold mb-2">Sumit Yadav</h3>
            <p className="text-xs md:text-sm mb-2 md:mb-3">Computer Engineering Student</p>
            <p className="text-xs md:text-sm">Frontend Developer</p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-sm hover:text-white transition-colors">Home</a>
              <a href="#aboutme" className="text-sm hover:text-white transition-colors">About Me</a>
              <a href="#projects" className="text-sm hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-sm hover:text-white transition-colors">Skills</a>
              
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a href="mailto:sumit.yadav.0287@gmail.com" className="flex items-center justify-center sm:justify-start hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-xs md:text-sm break-all">sumit.yadav.0287@gmail.com</span>
              </a>
              <div className="flex items-center justify-center sm:justify-start">
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-xs md:text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Sumit-y88" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/sumit-yadav-ab538b321/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://leetcode.com/u/sumit_y8888/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-lg font-semibold hover:scale-110 transform"
              aria-label="LeetCode"
            >
              <SiLeetcode/>
            </a>
          </div>
          
          <div className="text-xs md:text-sm text-center md:text-right">
            <p className="mb-1">Built with React & Tailwind CSS</p>
            <p>© 2026 Sumit Yadav</p>
          </div>
        </div>
      </div>
    </footer>
  );
}