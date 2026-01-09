import React from 'react'

const logo = () => {
    return (
        <div>
            <div className="w-12 h-12 overflow-hidden rounded-full border border-gray-200">
                <a href="/" aria-label="Go to homepage">
                    <img
                        className="w-15 h-15-cover"
                        src="/logo.png"
                        alt="Sumit Logo"
                    />
                </a>
            </div>
        </div>
    )
}

export default logo
