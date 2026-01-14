import React from 'react'
import useInView from "./useInView";
import AboutSectionText from './AboutSectionText'
import AboutMeHeading from './AboutMeHeading'

const AboutSection = () => {

  const [imageRef, imageVisible] = useInView();
  const [textRef, textVisible] = useInView();

  return (
    <div
      id="aboutme"
      className="relative flex flex-col md:flex-row px-15 w-full h-fit
           mt-155 md:mt-100 mb-10
           scroll-mt-24"
    >
      {/* Circle */}
      <div
        className="absolute -top-20 -left-50 
    w-150 h-100 rounded-full bg-blue-600 blur-2xl
    z-10 animate-[aboutFloat_8s_ease-in-out_infinite]"
      ></div>


      {/* About Me Card */}
      <div
      ref={imageRef}
        className={`aboutMePhoto w-full h-full md:w-2/5 
    bg-zinc-900 rounded-2xl md:mr-43
    relative z-10
    transition-all duration-300 ease-in-out
    ${imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <AboutMeHeading />
      </div>

      {/* Text */}
      <div 
      ref={textRef} className={`aboutMeText flex flex-col justify-center text-justify text-gray-400 md:mx-5 md:w-3/5 h-full mt-11
      ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
        <AboutSectionText />
      </div>
    </div>


  )
}

export default AboutSection
