import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Animation from './components/Animation'
import MainSection from './components/MainSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import Footer from './components/Footer'
import LoadingPage from './components/LoadingPage'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true) // Start the exit animation
      
      // Remove loading page after animation completes
      setTimeout(() => {
        setLoading(false)
      }, 1000) // Match this to the transition duration
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <LoadingPage isExiting={isExiting} />}
      
      <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
        <Animation />
        <Navbar />
        <MainSection />
        <AboutSection />
        <SkillsSection />
        <Footer />
      </div>
    </>
  )
}

export default App
