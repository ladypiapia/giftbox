import React from 'react'

interface MicrophoneProps {
  onClick: () => void
}

export const Microphone: React.FC<MicrophoneProps> = ({ onClick }) => {
  return (
    <div className="group z-10 transform translate-y-10  transition-all duration-300 ease-in-out hover:-translate-y-1 hover:rotate-6">
      <div className="w-20 h-48 flex flex-col items-center transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:rotate-6">
        {/* Microphone Head */}
        <div className="w-20 h-20 relative z-10">
          {/* Gradient outline for microphone head */}
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-gray-400/30 via-gray-500/30 to-gray-400/30" />
          {/* Outer frame */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-300 to-gray-400">
            {/* Mesh pattern container */}
            <div className="absolute inset-[2px] rounded-full overflow-hidden">
              {/* Complex mesh pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_1px,_#silver_1px)] bg-[length:4px_4px]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_46%,_#9CA3AF_47%,_#9CA3AF_53%,_transparent_54%)] bg-[length:4px_4px]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(-45deg,_transparent_46%,_#9CA3AF_47%,_#9CA3AF_53%,_transparent_54%)] bg-[length:4px_4px]"></div>
            </div>
          </div>
          {/* Center band */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"></div>
        </div>
        {/* Microphone Body */}
        <div className="w-16 h-32 relative -mt-4">
          {/* Main body */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-32 bg-gradient-to-b from-[#1A1A1A] to-[#2C2C2C] clip-path-microphone">
            {/* Subtle highlights */}
            <div className="absolute inset-x-2 top-0 h-full bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-20"></div>
          </div>
        </div>
      </div>
      <button
        onClick={onClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Record voice"
      ></button>
      <style jsx>{`
        .clip-path-microphone {
          clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
        }
      `}</style>
    </div>
  )
}

