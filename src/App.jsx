import React from 'react'
import Navbar from './components/Navbar'
import Animation from './components/Animation'
import ContactMe from './components/ContactMe'
import MainSection from './components/MainSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'

const App = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Animation />
      <Navbar />
      <MainSection/>
      <AboutSection/>
      <SkillsSection/>
    </div>
  )
}

export default App
