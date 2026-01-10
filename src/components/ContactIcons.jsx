import React from 'react'
import { Linkedin, Github, Instagram } from 'lucide-react';
const ContactIcons = () => {
    return (
        <div className='flex gap-5 justify-center md:justify-start px-2'>
            <a href="https://www.linkedin.com/in/sumit-yadav-ab538b321/" target='_blank' className="group">
            <Linkedin size={25} className="text-gray-400 transition-all duration-300 ease-in-out group-hover:text-white group-hover:rotate-10"/>
            </a>
            <a href="https://github.com/Sumit-y88" target='_blank' className="group">
            <Github size={25} className="text-gray-400 transition-all duration-30 ease-in-out group-hover:text-white group-hover:rotate-10"/>
            </a>
            <a href="https://www.instagram.com/sumit_y88/" target='_blank' className="group">
            <Instagram size={25} className="text-gray-400 transition-all duration-300 ease-in-out group-hover:text-white group-hover:rotate-10"/>
            </a>
        </div>
    )
}

export default ContactIcons
