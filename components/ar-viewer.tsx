"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import { Camera, Eye, Grid3X3, Home, Maximize2, Move3D, RotateCcw, RotateCw, Ruler, ScanLine, X, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

interface ARViewerProps {
  productName?: string
  productImage?: string
  productSize?: { width: number; length: number; height: number }
}

export function ARViewer({ 
  productName = "Marvel Mattress", 
  productImage = "/placeholder.jpg",
  productSize = { width: 60, length: 80, height: 12 }
}: ARViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState("bedroom")
  const [viewAngle, setViewAngle] = useState("front")
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [positionX, setPositionX] = useState(50)
  const [positionY, setPositionY] = useState(50)
  const [showGrid, setShowGrid] = useState(true)
  const [showMeasurements, setShowMeasurements] = useState(true)

  const roomTypes = [
    { 
      id: "bedroom", 
      name: "Bedroom", 
      image: "/rooms/bedroom.jpg",
      bgColor: "from-amber-100 to-orange-100"
    },
    { 
      id: "master", 
      name: "Master Suite", 
      image: "/rooms/master.jpg",
      bgColor: "from-purple-100 to-pink-100"
    },
    { 
      id: "guest", 
      name: "Guest Room", 
      image: "/rooms/guest.jpg",
      bgColor: "from-blue-100 to-cyan-100"
    },
    { 
      id: "modern", 
      name: "Modern Loft", 
      image: "/rooms/modern.jpg",
      bgColor: "from-gray-100 to-slate-100"
    },
  ]

  const viewAngles = [
    { id: "front", name: "Front View", icon: Eye },
    { id: "top", name: "Top View", icon: Grid3X3 },
    { id: "side", name: "Side View", icon: Ruler },
    { id: "3d", name: "3D View", icon: Move3D },
  ]

  const resetView = () => {
    setScale(1)
    setRotation(0)
    setPositionX(50)
    setPositionY(50)
  }

  // Get perspective transform based on view angle
  const getPerspective = () => {
    switch(viewAngle) {
      case "front":
        return "rotateX(0deg) rotateY(0deg)"
      case "top":
        return "rotateX(60deg) rotateY(0deg)"
      case "side":
        return "rotateX(0deg) rotateY(60deg)"
      case "3d":
        return `rotateX(20deg) rotateY(${rotation}deg)`
      default:
        return "rotateX(0deg) rotateY(0deg)"
    }
  }

  return (
    <>
      {/* AR Viewer Button */}
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="outline" 
        className="gap-2 hover:shadow-lg transition-all group"
      >
        <Camera className="h-4 w-4 group-hover:scale-110 transition-transform" />
        View in Your Room (AR)
      </Button>

      {/* Enhanced AR Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-7xl h-[90vh] overflow-hidden"
            >
              <Card className="h-full border-2">
                <CardHeader className="bg-gradient-to-r from-primary via-purple-600 to-secondary text-primary-foreground border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Camera className="h-6 w-6" />
                        AR Room Preview
                        <Badge variant="secondary" className="ml-2">
                          <ScanLine className="h-3 w-3 mr-1" />
                          Enhanced
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-primary-foreground/80 mt-1">
                        {productName} - Visualize in your space
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-primary-foreground hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0 h-[calc(100%-5rem)]">
                  <div className="flex h-full">
                    {/* AR Viewport - Main Area */}
                    <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                      {/* Room Background */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${roomTypes.find(r => r.id === selectedRoom)?.bgColor} opacity-40`}
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'brightness(0.7)'
                        }}
                      />

                      {/* Grid Overlay */}
                      {showGrid && (
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                          <svg className="w-full h-full">
                            <defs>
                              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                          </svg>
                        </div>
                      )}

                      {/* Mattress Preview */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <motion.div
                          animate={{ 
                            x: `${positionX - 50}%`,
                            y: `${positionY - 50}%`,
                          }}
                          className="relative"
                          style={{
                            perspective: "1000px",
                            transform: `scale(${scale})`,
                            transition: "transform 0.3s ease"
                          }}
                        >
                          <div
                            className="relative w-96 h-72 rounded-lg shadow-2xl"
                            style={{
                              transform: getPerspective(),
                              transformStyle: "preserve-3d",
                              transition: "transform 0.5s ease"
                            }}
                          >
                            {/* Mattress Image */}
                            <div className="absolute inset-0 bg-white rounded-lg overflow-hidden shadow-xl">
                              <img 
                                src={productImage} 
                                alt={productName}
                                className="w-full h-full object-cover"
                                style={{ 
                                  transform: `rotate(${rotation}deg)`,
                                  transition: "transform 0.3s ease"
                                }}
                              />
                              {/* Overlay shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Size Measurements */}
                            {showMeasurements && viewAngle !== "3d" && (
                              <>
                                {/* Width */}
                                <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center">
                                  <div className="bg-black/70 text-white px-3 py-1 rounded text-xs font-mono">
                                    {productSize.width}" W
                                  </div>
                                </div>
                                {/* Length */}
                                <div className="absolute top-0 bottom-0 -right-12 flex items-center justify-center">
                                  <div className="bg-black/70 text-white px-3 py-1 rounded text-xs font-mono transform rotate-90">
                                    {productSize.length}" L
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Shadow */}
                          <div 
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-8 bg-black/20 rounded-full blur-xl"
                            style={{ transform: `translateX(-50%) scale(${scale * 1.2})` }}
                          />
                        </motion.div>
                      </div>

                      {/* View Angle Selector */}
                      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <div className="text-xs font-medium mb-2 text-muted-foreground">View Angle</div>
                        <div className="grid grid-cols-2 gap-2">
                          {viewAngles.map((angle) => (
                            <Button
                              key={angle.id}
                              size="sm"
                              variant={viewAngle === angle.id ? "default" : "outline"}
                              onClick={() => setViewAngle(angle.id)}
                              className="gap-1"
                            >
                              <angle.icon className="h-3 w-3" />
                              {angle.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Control Panel - Bottom */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-4">
                          {/* Zoom Controls */}
                          <div className="flex items-center gap-2">
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                            >
                              <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-mono min-w-[4rem] text-center">
                              {(scale * 100).toFixed(0)}%
                            </span>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => setScale(Math.min(2, scale + 0.1))}
                            >
                              <ZoomIn className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="h-8 w-px bg-border" />

                          {/* Rotation Control */}
                          {viewAngle !== "3d" && (
                            <>
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  onClick={() => setRotation((rotation - 15) % 360)}
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-mono min-w-[4rem] text-center">
                                  {rotation}°
                                </span>
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  onClick={() => setRotation((rotation + 15) % 360)}
                                >
                                  <RotateCw className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="h-8 w-px bg-border" />
                            </>
                          )}

                          {/* Reset */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={resetView}
                            className="gap-1"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Reset
                          </Button>

                          {/* Toggle Options */}
                          <div className="h-8 w-px bg-border" />
                          
                          <Button 
                            size="sm" 
                            variant={showGrid ? "default" : "outline"}
                            onClick={() => setShowGrid(!showGrid)}
                            className="gap-1"
                          >
                            <Grid3X3 className="h-3 w-3" />
                            Grid
                          </Button>

                          <Button 
                            size="sm" 
                            variant={showMeasurements ? "default" : "outline"}
                            onClick={() => setShowMeasurements(!showMeasurements)}
                            className="gap-1"
                          >
                            <Ruler className="h-3 w-3" />
                            Size
                          </Button>
                        </div>
                      </div>

                      {/* Info Badge */}
                      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <Camera className="h-4 w-4 text-primary" />
                          AR Preview Tips
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          • Use zoom controls to adjust size<br/>
                          • Rotate to see different angles<br/>
                          • Try different room settings<br/>
                          • Compare with your space measurements
                        </p>
                      </div>
                    </div>

                    {/* Settings Panel - Right Sidebar */}
                    <div className="w-96 bg-muted/30 dark:bg-muted/20 p-6 overflow-y-auto border-l">
                      <Tabs defaultValue="rooms" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="rooms">
                            <Home className="h-4 w-4 mr-2" />
                            Rooms
                          </TabsTrigger>
                          <TabsTrigger value="position">
                            <Move3D className="h-4 w-4 mr-2" />
                            Position
                          </TabsTrigger>
                        </TabsList>

                        {/* Room Selection Tab */}
                        <TabsContent value="rooms" className="space-y-4 mt-4">
                          <div>
                            <h3 className="font-semibold mb-3">Choose Room Type</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {roomTypes.map((room) => (
                                <motion.div
                                  key={room.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Card
                                    className={`cursor-pointer transition-all hover:shadow-md ${
                                      selectedRoom === room.id ? "ring-2 ring-primary" : ""
                                    }`}
                                    onClick={() => setSelectedRoom(room.id)}
                                  >
                                    <CardContent className="p-3">
                                      <div className={`w-full h-20 rounded bg-gradient-to-br ${room.bgColor} mb-2`} />
                                      <h4 className="font-medium text-sm">{room.name}</h4>
                                      {selectedRoom === room.id && (
                                        <Badge variant="default" className="mt-2 text-xs">
                                          Active
                                        </Badge>
                                      )}
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <h4 className="font-semibold text-sm mb-3">Product Dimensions</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between p-2 bg-background rounded">
                                <span className="text-muted-foreground">Width:</span>
                                <span className="font-mono font-semibold">{productSize.width}"</span>
                              </div>
                              <div className="flex justify-between p-2 bg-background rounded">
                                <span className="text-muted-foreground">Length:</span>
                                <span className="font-mono font-semibold">{productSize.length}"</span>
                              </div>
                              <div className="flex justify-between p-2 bg-background rounded">
                                <span className="text-muted-foreground">Height:</span>
                                <span className="font-mono font-semibold">{productSize.height}"</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Position Control Tab */}
                        <TabsContent value="position" className="space-y-6 mt-4">
                          <div>
                            <h3 className="font-semibold mb-3">Horizontal Position</h3>
                            <Slider
                              value={[positionX]}
                              onValueChange={(value) => setPositionX(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Left</span>
                              <span className="font-mono">{positionX}%</span>
                              <span>Right</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Vertical Position</h3>
                            <Slider
                              value={[positionY]}
                              onValueChange={(value) => setPositionY(value[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Top</span>
                              <span className="font-mono">{positionY}%</span>
                              <span>Bottom</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Scale</h3>
                            <Slider
                              value={[scale]}
                              onValueChange={(value) => setScale(value[0])}
                              min={0.5}
                              max={2}
                              step={0.1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>50%</span>
                              <span className="font-mono">{(scale * 100).toFixed(0)}%</span>
                              <span>200%</span>
                            </div>
                          </div>

                          {viewAngle !== "3d" && (
                            <div>
                              <h3 className="font-semibold mb-3">Rotation</h3>
                              <Slider
                                value={[rotation]}
                                onValueChange={(value) => setRotation(value[0])}
                                min={0}
                                max={360}
                                step={15}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>0°</span>
                                <span className="font-mono">{rotation}°</span>
                                <span>360°</span>
                              </div>
                            </div>
                          )}

                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={resetView}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset All Settings
                          </Button>
                        </TabsContent>
                      </Tabs>

                      {/* AR Features Info */}
                      <div className="mt-6 p-4 bg-background rounded-lg border">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <Maximize2 className="h-4 w-4 text-primary" />
                          AR Features
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                            <span>Real-time room placement preview</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                            <span>Multiple viewing angles (Front, Top, Side, 3D)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                            <span>Accurate size visualization with measurements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                            <span>Adjustable positioning and scaling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                            <span>Grid overlay for precise placement</span>
                          </li>
                        </ul>
                      </div>

                      <Button className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
                        <Camera className="mr-2 h-4 w-4" />
                        Save This View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  )
}
