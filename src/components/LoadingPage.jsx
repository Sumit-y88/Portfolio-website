import { useEffect, useState } from 'react'

const message = "My Portfolio"

const LoadingPage = () => {
    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < message.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + message[index])
                setIndex(index + 1)
            }, 120)
            return () => clearTimeout(timeout)
        }
    }, [index])

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50
      transition-transform duration-1000 ease-in-out">

            <div className='flex flex-row items-center justify-center gap-4'>
                <h2 className='text-xl md:text-3xl text-gray-300  mb-4'>Loading</h2>
                <div className="relative w-8 h-8 md:w-12 md:h-12 mb-4 flex flex-row ">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-500"></div>
                    <div className="absolute inset-0 rounded-full border-4 text-indigo-700 border-t-transparent animate-spin"></div>
                </div>
            </div>

            <h1 className="text-3xl md:text-6xl font-sans font-bold text-indigo-700 tracking-widest">
                {text}
                <span className="animate-pulse">|</span>
            </h1>
        </div>
    )
}

export default LoadingPage
