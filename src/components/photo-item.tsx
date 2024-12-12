import React from 'react'
import { Input } from "@/components/ui/input"

interface PhotoItemProps {
  url: string
  caption: string
  onCaptionChange: (caption: string) => void
}

export const PhotoItem: React.FC<PhotoItemProps> = ({ url, caption, onCaptionChange }) => {
  return (
    <div className="bg-white p-2 shadow-md rounded-sm w-48 relative z-10">
      <img 
        src={url} 
        alt="User uploaded image" 
        className="w-full h-auto pointer-events-none"
        draggable="false"
      />
      <div className="mt-2">
        <Input
          type="text"
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Add a caption..."
          className="w-full text-sm text-center"
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

