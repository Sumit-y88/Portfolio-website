import React from 'react'

const tabs = ['Home','About me', 'Projects', 'Skills']

const Links = () => {
  
  return (
    // Added flex, gap, and items-center to align them horizontally
    <div className="flex flex-row items-center gap-8 ">
      {tabs.map((tabLink, idx) => {
        return (
          /* Added a unique key for React's reconciliation */
          <div key={idx} className="group relative w-max hidden md:block">
            <a 
              href={`#${tabLink.toLowerCase().replace(/\s+/g, '')}`} 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-lg text-balance"
            >
              {tabLink}
            </a>
            
            {/* The animated underline */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-700 via-blue-700 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
          </div>
        )
      })}
    </div>
  )
}

export default Links