'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    webglContextLost: boolean
    webglContextRestored: boolean
    webglFallbackActive: boolean
  }
}

export function useWebGLMonitor() {
  const [contextLost, setContextLost] = useState(false)
  const [contextRestored, setContextRestored] = useState(false)

  useEffect(() => {
    // Initialize global WebGL monitoring
    if (typeof window !== 'undefined') {
      window.webglContextLost = false
      window.webglContextRestored = false
      window.webglFallbackActive = false

      // Global WebGL error handler
      const handleWebGLError = (event: ErrorEvent) => {
        if (event.message.includes('WebGL') || event.message.includes('context')) {
          console.warn('WebGL Error detected globally:', event.message)
          window.webglContextLost = true
          setContextLost(true)
          window.webglFallbackActive = true
        }
      }

      // Listen for global WebGL context events
      const handleContextLoss = () => {
        console.warn('WebGL Context Lost - activating fallback')
        window.webglContextLost = true
        setContextLost(true)
        window.webglFallbackActive = true
      }

      const handleContextRestore = () => {
        console.log('WebGL Context Restored - deactivating fallback')
        window.webglContextRestored = true
        window.webglContextLost = false
        setContextLost(false)
        setContextRestored(true)
        window.webglFallbackActive = false

        // Reset restored flag after a delay
        setTimeout(() => {
          setContextRestored(false)
          window.webglContextRestored = false
        }, 1000)
      }

      // Add global event listeners
      window.addEventListener('error', handleWebGLError)
      document.addEventListener('webglcontextlost', handleContextLoss)
      document.addEventListener('webglcontextrestored', handleContextRestore)

      // Monitor canvas elements for WebGL context events
      const canvasObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLCanvasElement) {
              node.addEventListener('webglcontextlost', handleContextLoss)
              node.addEventListener('webglcontextrestored', handleContextRestore)
            }
          })
        })
      })

      canvasObserver.observe(document.body, {
        childList: true,
        subtree: true
      })

      // Cleanup
      return () => {
        window.removeEventListener('error', handleWebGLError)
        document.removeEventListener('webglcontextlost', handleContextLoss)
        document.removeEventListener('webglcontextrestored', handleContextRestore)
        canvasObserver.disconnect()
      }
    }
  }, [])

  return { contextLost, contextRestored }
}

export default function WebGLContextMonitor() {
  useWebGLMonitor()
  return null // This component just provides monitoring
}
