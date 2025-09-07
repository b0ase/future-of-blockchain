'use client'

import React, { useEffect, useState } from 'react'
import BlockchainFallback from './BlockchainFallback'

interface WebGLDetectorProps {
  children: React.ReactNode
  className?: string
}

export default function WebGLDetector({ children, className }: WebGLDetectorProps) {
  const [webglSupported, setWebglSupported] = useState(true)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D canvas')
      setWebglSupported(false)
      return
    }

    // Listen for WebGL context loss
    const handleContextLoss = (event: Event) => {
      console.warn('WebGL context lost, switching to fallback')
      event.preventDefault()
      setContextLost(true)
    }

    // Add event listener to any existing canvas
    const existingCanvas = document.querySelector('canvas')
    if (existingCanvas) {
      existingCanvas.addEventListener('webglcontextlost', handleContextLoss)
    }

    // Also listen for global WebGL errors
    const handleWebGLError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('context')) {
        console.warn('WebGL error detected:', event.message)
        setContextLost(true)
      }
    }

    window.addEventListener('error', handleWebGLError)

    return () => {
      if (existingCanvas) {
        existingCanvas.removeEventListener('webglcontextlost', handleContextLoss)
      }
      window.removeEventListener('error', handleWebGLError)
    }
  }, [])

  // Show fallback if WebGL is not supported or context is lost
  if (!webglSupported || contextLost) {
    return (
      <div className={`relative ${className}`}>
        <BlockchainFallback className="w-full h-full" />
        <div className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded text-xs">
          {!webglSupported ? 'WebGL not supported' : 'WebGL context lost'}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
