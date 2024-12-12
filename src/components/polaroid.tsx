import React from 'react'

interface PolaroidProps {
  onClick: () => void
}

export const Polaroid: React.FC<PolaroidProps> = ({ onClick }) => {
  return (
    <div className="group z-10 border-black overflow-hidden transform translate-y-2 transition-all shadow-md duration-300 ease-in-out hover:-translate-y-8 hover:shadow-2xl hover:rotate-3">
      <div className="w-32 h-40 bg-white p-2 rounded-md relative">
        {/* Photo area */}
        <div className="bg-gray-100 aspect-square overflow-hidden">
          <img
            src="/placeholder.svg?height=300&width=300"
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Bottom area */}
        <div className="left-0 right-0 h-14 flex items-center justify-center">
          <span className="text-sm text-gray-400 select-none">Add Photo</span>
        </div>
      </div>
      <button
        onClick={onClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Add photo"
      ></button>
    </div>
  )
}

