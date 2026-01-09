import React from 'react'

const ContactMe = () => {
  const handleEmailClick = ()=>{
    window.location.href = "mailto:sumit.yadav.0287@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Sumit,%0A%0AI%20visited%20your%20portfolio.";
  }
  return (
    <div>
      <button onClick={handleEmailClick} className='px-4 py-3 bg-indigo-600 border hover:bg-indigo-700 transition-all ease-in-out duration-200 border-gray-500 hidden md:block rounded-full'>Contact Me</button>
    </div>
  )
}

export default ContactMe
