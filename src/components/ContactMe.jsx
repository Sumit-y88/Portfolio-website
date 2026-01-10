import React from 'react'
import { handleEmailClick } from '../utils/Contact';

const ContactMe = () => {
 
  return (
    <div>
      <button onClick={handleEmailClick} className='px-4 py-3 bg-indigo-600 border hover:bg-indigo-700 transition-all ease-in-out duration-200 border-gray-500 hidden md:block rounded-full'>Contact Me</button>
    </div>
  )
}

export default ContactMe
