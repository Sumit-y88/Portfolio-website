import React from 'react'

const animation = () => {
  return (
    <>
      <div className="containerhai relative w-full h-100 overflow-hidden">
  {/* Purple blob */}
  <div
    className="absolute -top-70 left-0
      w-200 h-100 rounded-full bg-blue-800 blur-3xl
      animate-[float1_8s_ease-in-out_infinite]"
  ></div>

  {/* Blue blob */}
  <div
    className="absolute -top-70 left-[35%]
      w-200 h-100 rounded-full bg-indigo-600 blur-3xl
      animate-[float2_10s_ease-in-out_infinite]"
  ></div>

  {/* Violet blob */}
  <div
    className="absolute -top-70 right-0
      w-100 h-100 rounded-full bg-sky-400 blur-3xl
      animate-[float3_12s_ease-in-out_infinite]"
  ></div>
</div>

    </>
  )
}

export default animation
