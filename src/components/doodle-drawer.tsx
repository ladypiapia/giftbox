import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eraser, Pencil } from 'lucide-react'

interface DoodleDrawerProps {
  onClose: () => void
  onDoodleAdd: (doodleUrl: string) => void
}

export const DoodleDrawer: React.FC<DoodleDrawerProps> = ({ onClose, onDoodleAdd }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(5)
  const [isErasing, setIsErasing] = useState(false)
  const [paths, setPaths] = useState<string[]>([])
  const [currentPath, setCurrentPath] = useState<string>('')
  const pointsRef = useRef<{ x: number; y: number }[]>([])

  const getCoordinates = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }

    const point = svg.createSVGPoint()
    point.x = e.clientX
    point.y = e.clientY
    const transformedPoint = point.matrixTransform(svg.getScreenCTM()?.inverse())
    
    return {
      x: transformedPoint.x,
      y: transformedPoint.y
    }
  }

  const startDrawing = (e: React.MouseEvent<SVGSVGElement>) => {
    const point = getCoordinates(e)
    pointsRef.current = [point]
    setCurrentPath(`M ${point.x} ${point.y}`)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return

    const point = getCoordinates(e)
    pointsRef.current.push(point)

    if (pointsRef.current.length > 3) {
      const points = pointsRef.current
      const lastPoint = points[points.length - 1]
      const controlPoint = points[points.length - 2]
      const endPoint = {
        x: (controlPoint.x + lastPoint.x) / 2,
        y: (controlPoint.y + lastPoint.y) / 2
      }

      setCurrentPath(prev => 
        `${prev} Q ${controlPoint.x} ${controlPoint.y}, ${endPoint.x} ${endPoint.y}`
      )
    }
  }

  const stopDrawing = () => {
    if (currentPath) {
      setPaths(prev => [...prev, currentPath])
      setCurrentPath('')
    }
    setIsDrawing(false)
    pointsRef.current = []
  }

  const clearCanvas = () => {
    setPaths([])
    setCurrentPath('')
  }

  const saveDoodle = () => {
    const svg = svgRef.current
    if (!svg) return

    // Create a temporary canvas to convert SVG to PNG
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    
    img.onload = () => {
      canvas.width = svg.clientWidth
      canvas.height = svg.clientHeight
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      const doodleUrl = canvas.toDataURL('image/png')
      onDoodleAdd(doodleUrl)
      onClose()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Draw a Doodle</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full aspect-[4/3] bg-white rounded-md border-2 border-stone-200">
            <svg
              ref={svgRef}
              className="w-full h-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            >
              {paths.map((path, i) => (
                <path
                  key={i}
                  d={path}
                  stroke={isErasing ? 'white' : color}
                  strokeWidth={lineWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {currentPath && (
                <path
                  d={currentPath}
                  stroke={isErasing ? 'white' : color}
                  strokeWidth={lineWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          <div className="flex gap-2">
            <div className="relative w-10 h-10">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-0 w-full h-full rounded-full cursor-pointer opacity-0"
              />
              <div 
                className="w-10 h-10 rounded-full border-2 border-stone-200"
                style={{ backgroundColor: color }}
              />
            </div>
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
              {isErasing ? <Pencil className="h-4 w-4" /> : <Eraser className="h-4 w-4" />}
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

