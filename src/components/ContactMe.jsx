import React from 'react'
import { handleEmailClick } from '../utils/Contact';

const ContactMe = () => {
 
  return (
    <div>
  <button 
    onClick={handleEmailClick} 
    className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-extralight rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-300 hidden md:block'
  >
    Contact Me
  </button>
</div>
  )
}

export default ContactMe
