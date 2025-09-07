'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function SimpleHeroScene() {
  const groupRef = useRef<THREE.Group>(null!)
  const frameCountRef = useRef(0)

  useFrame((state) => {
    frameCountRef.current += 1

    // Very aggressive throttling - only update every 12 frames
    if (frameCountRef.current % 12 !== 0) return

    if (groupRef.current) {
      // Very gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.005) * 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Simple central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Simple cubes around it */}
      {[
        { pos: [4, 0, 0], color: '#F7931A' },
        { pos: [-4, 0, 0], color: '#627EEA' },
        { pos: [0, 0, 4], color: '#EAB300' },
        { pos: [0, 0, -4], color: '#9945FF' }
      ].map((item, index) => (
        <mesh key={index} position={item.pos as [number, number, number]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function SimpleHero() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60 }}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
        }}
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
            console.warn('WebGL Context Lost in hero')
            event.preventDefault()
          }

          const handleContextRestore = () => {
            console.log('WebGL Context Restored in hero')
          }

          gl.domElement.addEventListener('webglcontextlost', handleContextLoss)
          gl.domElement.addEventListener('webglcontextrestored', handleContextRestore)
        }}
      >
        <SimpleHeroScene />
        <OrbitControls
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.1}
          maxPolarAngle={Math.PI * 0.6}
          minPolarAngle={Math.PI * 0.4}
        />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
      </Canvas>
    </div>
  )
}
