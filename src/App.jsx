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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500) // slightly longer for typing animation

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      <Animation />
      <Navbar />
      <MainSection />
      <AboutSection />
      <SkillsSection />
      <Footer />
    </div>
  )
}

export default App

