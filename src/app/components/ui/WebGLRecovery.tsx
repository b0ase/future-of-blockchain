'use client'

import React, { useEffect, useState } from 'react'

interface WebGLRecoveryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function WebGLRecovery({ children, fallback }: WebGLRecoveryProps) {
  const [contextLost, setContextLost] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [isRecovering, setIsRecovering] = useState(false)

  useEffect(() => {
    // Listen for WebGL context loss events
    const handleContextLoss = (event: Event) => {
      console.warn('WebGL Context Lost - attempting recovery...')
      event.preventDefault()
      setContextLost(true)
      setIsRecovering(true)
    }

    const handleContextRestore = () => {
      console.log('WebGL Context Restored')
      setContextLost(false)
      setIsRecovering(false)
      setRetryCount(0)
    }

    // Add global event listeners
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLoss)
      canvas.addEventListener('webglcontextrestored', handleContextRestore)
    }

    // Also listen for global WebGL errors
    const handleWebGLError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('context')) {
        console.warn('WebGL Error detected:', event.message)
        setContextLost(true)
      }
    }

    window.addEventListener('error', handleWebGLError)

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLoss)
        canvas.removeEventListener('webglcontextrestored', handleContextRestore)
      }
      window.removeEventListener('error', handleWebGLError)
    }
  }, [])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    setContextLost(false)
    setIsRecovering(false)

    // Force page reload after too many retries
    if (retryCount >= 3) {
      console.warn('Too many WebGL failures, reloading page...')
      window.location.reload()
    }
  }

  // Show fallback if context is lost and we have a fallback
  if (contextLost && fallback) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        {fallback}
        <button
          onClick={handleRetry}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {retryCount >= 3 ? 'Reload Page' : 'Try Again'}
        </button>
      </div>
    )
  }

  // Show simple fallback if no custom fallback provided
  if (contextLost) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-400">WebGL Context Lost</h2>
          <p className="text-gray-300 mb-4 max-w-md">
            The 3D visualization temporarily lost its graphics context.
            This can happen due to memory pressure or browser limitations.
          </p>
          {isRecovering ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <span>Attempting to recover...</span>
            </div>
          ) : (
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {retryCount >= 3 ? 'Reload Page' : `Try Again (${retryCount}/3)`}
            </button>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
