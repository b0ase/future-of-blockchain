'use client'

import React, { useEffect, useState, useRef } from 'react'
import BlockchainFallback from './BlockchainFallback'

interface WebGLFallbackRendererProps {
  children: React.ReactNode
  className?: string
  fallbackClassName?: string
}

export default function WebGLFallbackRenderer({
  children,
  className = '',
  fallbackClassName = ''
}: WebGLFallbackRendererProps) {
  const [webglFailed, setWebglFailed] = useState(false)
  const [contextLost, setContextLost] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Check if WebGL is supported
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (!gl) {
          console.warn('WebGL not supported, switching to fallback')
          setWebglFailed(true)
          return false
        }
        return true
      } catch (e) {
        console.warn('WebGL check failed, switching to fallback', e)
        setWebglFailed(true)
        return false
      }
    }

    if (!checkWebGLSupport()) {
      return
    }

    // Listen for WebGL context loss on the main canvas
    const handleGlobalContextLoss = (event: Event) => {
      console.warn('Global WebGL Context Lost detected')
      setContextLost(true)
    }

    const handleGlobalContextRestore = () => {
      console.log('Global WebGL Context Restored')
      setContextLost(false)
      setRetryCount(0)
    }

    // Listen for WebGL errors
    const handleWebGLError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('context')) {
        console.warn('WebGL Error detected:', event.message)
        setContextLost(true)
      }
    }

    // Add global listeners
    window.addEventListener('error', handleWebGLError)

    // Also listen on any canvas elements that might be created
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLCanvasElement) {
            node.addEventListener('webglcontextlost', handleGlobalContextLoss)
            node.addEventListener('webglcontextrestored', handleGlobalContextRestore)
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      window.removeEventListener('error', handleWebGLError)
      observer.disconnect()
    }
  }, [])

  // Auto-retry mechanism
  useEffect(() => {
    if (contextLost && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`Auto-retrying WebGL (${retryCount + 1}/3)`)
        setContextLost(false)
        setRetryCount(prev => prev + 1)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [contextLost, retryCount])

  const handleManualRetry = () => {
    setContextLost(false)
    setRetryCount(0)
  }

  // Show fallback if WebGL is not supported or context is lost
  if (webglFailed || contextLost) {
    return (
      <div className={`relative ${className}`}>
        <BlockchainFallback className={`w-full h-full ${fallbackClassName}`} />

        {/* Status indicator */}
        <div className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${webglFailed ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            <span className="font-semibold">
              {webglFailed ? 'WebGL Not Supported' : 'WebGL Context Lost'}
            </span>
          </div>
          <p className="text-xs opacity-80 mb-3">
            {webglFailed
              ? 'Your browser doesn\'t support WebGL. Using 2D fallback.'
              : '3D visualization temporarily unavailable. Using 2D fallback.'
            }
          </p>
          {!webglFailed && (
            <button
              onClick={handleManualRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
            >
              Retry 3D ({retryCount}/3)
            </button>
          )}
        </div>

        {/* Retry overlay for lost context */}
        {contextLost && retryCount < 3 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-black/90 text-white p-6 rounded-lg text-center max-w-sm">
              <h3 className="text-lg font-bold mb-3">Recovering 3D View</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                <span>Attempting to restore...</span>
              </div>
              <p className="text-sm opacity-70">
                This usually takes a few seconds. If it doesn't work, try refreshing the page.
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}
