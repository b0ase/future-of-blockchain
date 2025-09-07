'use client'

import { useEffect, useState } from 'react'

interface WebGLFallbackOverlayProps {
  children: React.ReactNode
  className?: string
}

export default function WebGLFallbackOverlay({ children, className = '' }: WebGLFallbackOverlayProps) {
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    // Check if WebGL fallback should be active
    const checkWebGLStatus = () => {
      if (typeof window !== 'undefined' && window.webglFallbackActive) {
        setShowFallback(true)
      } else {
        setShowFallback(false)
      }
    }

    // Initial check
    checkWebGLStatus()

    // Listen for WebGL status changes
    const handleWebGLChange = () => {
      checkWebGLStatus()
    }

    // Custom event for WebGL status updates
    window.addEventListener('webglStatusChange', handleWebGLChange)

    // Also check periodically
    const interval = setInterval(checkWebGLStatus, 1000)

    return () => {
      window.removeEventListener('webglStatusChange', handleWebGLChange)
      clearInterval(interval)
    }
  }, [])

  if (showFallback) {
    return (
      <div className={`relative ${className}`}>
        {/* 2D Canvas Fallback */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white p-8 max-w-md">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">3D Visualization Unavailable</h3>
              <p className="text-gray-300 mb-4">
                The interactive 3D blockchain visualization is temporarily unavailable due to WebGL context limitations.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-yellow-400 mb-1">What happened?</p>
                <p className="text-gray-400">WebGL context was lost, possibly due to memory pressure or browser limitations.</p>
              </div>

              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-blue-400 mb-1">What can you do?</p>
                <ul className="text-gray-400 text-left space-y-1">
                  <li>• Try refreshing the page</li>
                  <li>• Close other browser tabs</li>
                  <li>• Restart your browser</li>
                  <li>• Try a different browser</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Refresh Page
            </button>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          WebGL Offline
        </div>
      </div>
    )
  }

  return <>{children}</>
}
