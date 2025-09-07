'use client'

import dynamic from 'next/dynamic'

// Dynamically import the BlockchainVisualizer to avoid SSR issues with Three.js
const BlockchainVisualizer = dynamic(
  () => import('../components/ui/BlockchainVisualizer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Visualization...</p>
        </div>
      </div>
    )
  }
)

export default function VisualizationPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Blockchain Network Analysis</h1>
              <p className="text-gray-300 text-sm">Multi-dimensional comparison of BTC, ETH, BSV, and SOL architectures</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/research"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                📊 Methodology
              </a>
              <a
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                ← Back to Research
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Visualization */}
      <BlockchainVisualizer />

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="grid md:grid-cols-2 gap-6 text-center text-gray-300 text-sm">
            <div>
              <p className="font-semibold text-[#00ff88] mb-2">Research Framework</p>
              <p>Evidence-based analysis examining technical, economic, and regulatory factors shaping blockchain evolution</p>
            </div>
            <div>
              <p className="font-semibold text-[#00ff88] mb-2">Interactive Controls</p>
              <p>Mouse orbit • Scroll zoom • Discover trade-offs between scalability, security, and efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
