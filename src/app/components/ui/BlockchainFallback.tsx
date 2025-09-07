'use client'

import React, { useEffect, useRef } from 'react'

interface BlockchainFallbackProps {
  className?: string
}

export default function BlockchainFallback({ className = '' }: BlockchainFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create blockchain-inspired 2D animation
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.8 + 0.2
      })
    }

    // Create network nodes
    const nodes: Array<{ x: number; y: number; connections: number[] }> = []
    for (let i = 0; i < 8; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: []
      })
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          )
          if (distance < 150 && !node.connections.includes(j)) {
            node.connections.push(j)
          }
        }
      })
    })

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.lineWidth = 1
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          const targetNode = nodes[j]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.stroke()
        })
      })

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = '#3b82f6'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw and update particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width / window.devicePixelRatio) {
          particle.vx *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height / window.devicePixelRatio) {
          particle.vy *= -1
        }

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      // Draw floating blockchain blocks
      const time = Date.now() * 0.001
      for (let i = 0; i < 6; i++) {
        const x = (canvas.width / window.devicePixelRatio) * (0.2 + (i * 0.15))
        const y = (canvas.height / window.devicePixelRatio) * (0.3 + Math.sin(time + i) * 0.1)

        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'
        ctx.fillRect(x - 20, y - 20, 40, 40)

        ctx.strokeStyle = 'rgba(147, 197, 253, 0.5)'
        ctx.lineWidth = 2
        ctx.strokeRect(x - 20, y - 20, 40, 40)

        // Add block label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.font = '10px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('BLOCK', x, y - 25)
        ctx.fillText(`${i + 1}`, x, y + 30)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #0f172a 100%)' }}
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/80">
          <h2 className="text-2xl font-bold mb-2 text-blue-400">Blockchain Network</h2>
          <p className="text-sm opacity-70">Interactive 2D Visualization</p>
        </div>
      </div>
    </div>
  )
}
