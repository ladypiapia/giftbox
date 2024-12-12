import React, { useRef, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eraser, Pencil } from 'lucide-react'

interface DoodleDrawerProps {
  onClose: () => void
  onDoodleAdd: (doodleUrl: string) => void
}

export const DoodleDrawer: React.FC<DoodleDrawerProps> = ({ onClose, onDoodleAdd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(5)
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.strokeStyle = isErasing ? '#ffffff' : color
    ctx.lineWidth = isErasing ? 20 : lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const saveDoodle = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const doodleUrl = canvas.toDataURL('image/png')
    onDoodleAdd(doodleUrl)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Draw a Doodle</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border border-gray-300 rounded-md cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <div className="flex gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10"
            />
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="w-32"
            />
            <Button
              variant={isErasing ? "secondary" : "outline"}
              size="icon"
              onClick={() => setIsErasing(!isErasing)}
            >
              {isErasing ? <Eraser className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            </Button>
            <Button onClick={clearCanvas} variant="outline">
              Clear
            </Button>
          </div>
          <Button onClick={saveDoodle}>Add Doodle</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

