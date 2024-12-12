import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Upload } from 'lucide-react'

interface PhotoUploaderProps {
  onClose: () => void
  onPhotoAdd: (photoUrl: string) => void
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onClose, onPhotoAdd }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onPhotoAdd(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      await video.play()

      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)

      const photoUrl = canvas.toDataURL('image/jpeg')
      onPhotoAdd(photoUrl)

      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Photo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload Photo
          </Button>
          <Button onClick={handleCameraCapture}>
            <Camera className="mr-2 h-4 w-4" /> Take Photo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

