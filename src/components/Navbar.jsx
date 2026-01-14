import React from 'react'
import Logo from './Logo'
import Links from './Links'
import ContactMe from './ContactMe'
import HamBurgerIcon from './HamBurgerIcon'
import { useState } from 'react'
import MobileMenu from './MobileMenu'

const Navbar = () => {
const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-8xl h-16 px-6 z-50
      bg-white/15 backdrop-blur-md border border-white/10 rounded-full
      flex items-center">

      {/* Left */}
      <div className="flex">
        <Logo />
      </div>

      {/* Center (Desktop only) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <Links />
      </div>

      {/* Right */}
      <div className="flex-1 flex justify-end items-center gap-4">
        {/* Desktop only */}
        <div className="hidden md:block">
          <ContactMe />
        </div>

        {/* Mobile only */}
        <div className="md:hidden">
          <HamBurgerIcon open={menuOpen} setOpen={setMenuOpen} />
        </div>
      </div>
      <MobileMenu open={menuOpen} setOpen={setMenuOpen}/>
    </nav>
    
    </>
  )
}

export default Navbar
