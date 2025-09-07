'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ThreeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error Boundary caught an error:', error, errorInfo)

    // Check if it's a WebGL context error
    if (error.message.includes('WebGL') || error.message.includes('context')) {
      console.warn('WebGL context error detected. Attempting recovery...')
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center w-full h-screen bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Visualization Error</h2>
            <p className="text-gray-300 mb-4">
              The 3D visualization encountered an issue. This may be due to WebGL context limitations.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ThreeErrorBoundary
