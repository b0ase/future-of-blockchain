'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

function AdvancedNetworkVisualization() {
  const mainGroupRef = useRef<THREE.Group>(null!)
  const frameCountRef = useRef(0)

  // Ultra-simple network data - just the basics
  const networks = [
    { name: 'BTC', color: '#F7931A', position: [-8, 0, 0] as [number, number, number] },
    { name: 'ETH', color: '#627EEA', position: [8, 0, 0] as [number, number, number] },
    { name: 'BSV', color: '#EAB300', position: [0, 0, 8] as [number, number, number] },
    { name: 'SOL', color: '#9945FF', position: [0, 0, -8] as [number, number, number] }
  ]

  // Minimal animation - just slow rotation
  useFrame((state) => {
    frameCountRef.current += 1

    // Aggressive throttling - only update every 8 frames
    if (frameCountRef.current % 8 !== 0) return

    if (mainGroupRef.current) {
      // Very gentle, very slow rotation
      mainGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.01) * 0.005
    }
  })

  return (
    <group ref={mainGroupRef}>
      {/* Simple title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        BLOCKCHAIN NETWORKS
      </Text>

      {/* Simple network cubes */}
      {networks.map((network, index) => (
        <group key={network.name} position={network.position}>
          {/* Simple colored cube */}
          <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color={network.color}
              emissive={network.color}
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Network name */}
          <Text
            position={[0, -2, 0]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {network.name}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default function BlockchainVisualizer() {
  return (
    <div className="w-full h-screen relative" style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #0f172a 100%)'
    }}>
      <Canvas
        camera={{ position: [15, 10, 15], fov: 60 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          stencil: false,
          depth: true
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.shadowMap.enabled = false

          const handleContextLoss = (event: Event) => {
            console.warn('WebGL Context Lost in visualization')
            event.preventDefault()
          }

          const handleContextRestore = () => {
            console.log('WebGL Context Restored in visualization')
          }

          gl.domElement.addEventListener('webglcontextlost', handleContextLoss)
          gl.domElement.addEventListener('webglcontextrestored', handleContextRestore)
        }}
      >
        <AdvancedNetworkVisualization />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxDistance={50}
          minDistance={10}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
        />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
      </Canvas>
    </div>
  )
}
