'use client'

import { useEffect, useState } from 'react'

export default function WebGLStatusAlert() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'error' | 'warning' | 'info'>('error')

  useEffect(() => {
    // Check for WebGL context loss
    const handleWebGLError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('context')) {
        setAlertMessage('WebGL context lost. The 3D visualization may not work properly.')
        setAlertType('error')
        setShowAlert(true)

        // Auto-hide after 10 seconds
        setTimeout(() => setShowAlert(false), 10000)
      }
    }

    // Listen for WebGL context events on canvas elements
    const handleContextLoss = () => {
      setAlertMessage('WebGL context lost. Try refreshing the page or closing other tabs.')
      setAlertType('warning')
      setShowAlert(true)

      setTimeout(() => setShowAlert(false), 15000)
    }

    const handleContextRestore = () => {
      setAlertMessage('WebGL context restored. 3D visualizations are working again!')
      setAlertType('info')
      setShowAlert(true)

      setTimeout(() => setShowAlert(false), 5000)
    }

    // Add event listeners
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

    return () => {
      window.removeEventListener('error', handleWebGLError)
      document.removeEventListener('webglcontextlost', handleContextLoss)
      document.removeEventListener('webglcontextrestored', handleContextRestore)
      canvasObserver.disconnect()
    }
  }, [])

  if (!showAlert) return null

  const alertStyles = {
    error: 'bg-red-600 border-red-700 text-white',
    warning: 'bg-yellow-600 border-yellow-700 text-white',
    info: 'bg-blue-600 border-blue-700 text-white'
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm ${alertStyles[alertType]} border rounded-lg p-4 shadow-lg`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {alertType === 'error' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {alertType === 'warning' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {alertType === 'info' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{alertMessage}</p>
          {alertType === 'error' || alertType === 'warning' ? (
            <div className="mt-2 text-xs opacity-90">
              <p>Try: refreshing the page, closing other tabs, or restarting your browser.</p>
            </div>
          ) : null}
        </div>
        <button
          onClick={() => setShowAlert(false)}
          className="flex-shrink-0 ml-2 text-white/70 hover:text-white"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
