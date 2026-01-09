import React from 'react'
import Heading from './Heading'
import TypeEffect from './TypeEffect'
import AboutHeading from './AboutHeading'
import ResumeDownloadBtn from './ResumeDownloadBtn'
import ContactIcons from './ContactIcons'


const MainSection = () => {
  return (
    <main className=' absolute top-30 w-full flex flex-col lg:flex-row h-auto mx-auto px-15 md:px-10 mt-1'>
      <div className='mt-10 md:w-1/2 w-full h-full text-center md:text-start'>
      <Heading/>
      <TypeEffect/>
      <AboutHeading/>
      <div className='flex gap-5 flex-col items-center md:items-start'>
        <ResumeDownloadBtn/>
        <ContactIcons/>
      </div>
      
      </div>
      <div className='relative md:w-1/2 group w-full h-full mt-4 p-5'>
      <img src="mainSectionImg2.png" alt="avatar" className='hero-img transition-all duration-150 ease-in hover:scale-105 animate-[float_5s_ease-in-out_infinite]'/>
      </div>
    </main>
  )
}

export default MainSection
