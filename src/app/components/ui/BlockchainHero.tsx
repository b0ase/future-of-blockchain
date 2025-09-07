'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function BlockchainChain() {
  const chainRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (chainRef.current) {
      chainRef.current.rotation.y = state.clock.elapsedTime * 0.2
      chainRef.current.children.forEach((block, index) => {
        block.position.y = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.3
        block.rotation.x = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.2
      })
    }
  })

  return (
    <group ref={chainRef}>
      {/* Create a blockchain chain with multiple blocks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <group key={`block-${i}`} position={[x, 0, z]}>
            {/* Block cube */}
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial
                color={`hsl(${200 + i * 30}, 70%, 50%)`}
                transparent
                opacity={0.8}
                emissive={`hsl(${200 + i * 30}, 70%, 30%)`}
                emissiveIntensity={0.2}
              />
            </mesh>
            {/* Block highlight */}
            <mesh position={[0, 0, 0.41]}>
              <planeGeometry args={[0.6, 0.6]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.3}
              />
            </mesh>
            {/* Connecting chain links */}
            {i < 11 && (
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array([
                      0, 0, 0.4,
                      Math.cos((i + 1) / 12 * Math.PI * 2) * radius - x,
                      0,
                      Math.sin((i + 1) / 12 * Math.PI * 2) * radius - z
                    ]), 3]}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#60a5fa" transparent opacity={0.6} linewidth={2} />
              </line>
            )}
          </group>
        )
      })}
    </group>
  )
}

function DataFlowParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  const frameCountRef = useRef(0)

  const particleData = useMemo(() => {
    const count = 300 // Reduced from 800 for stability
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Create flowing data streams
      const stream = Math.floor(Math.random() * 6) // Reduced streams
      const progress = Math.random()
      const angle = (stream / 6) * Math.PI * 2
      const radius = 6 + progress * 8
      const height = (progress - 0.5) * 10

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      // Color based on stream
      colors[i * 3] = 0.2 + (stream % 3) * 0.3     // R
      colors[i * 3 + 1] = 0.4 + (stream % 2) * 0.4 // G
      colors[i * 3 + 2] = 0.8 - (stream % 4) * 0.2 // B

      sizes[i] = Math.random() * 0.03 + 0.01
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((state) => {
    frameCountRef.current += 1

    // Throttle particle updates for stability
    if (frameCountRef.current % 3 !== 0) return

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < 300; i++) { // Updated for reduced count
        const i3 = i * 3
        // Move particles along their streams (reduced movement)
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 1.5 + i * 0.01) * 0.015
        positions[i3] += Math.cos(state.clock.elapsedTime * 1.2 + i * 0.01) * 0.008
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particleData.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={0.08}
      />
    </points>
  )
}

function EnergyPulses() {
  const pulsesRef = useRef<THREE.Group>(null!)
  const frameCountRef = useRef(0)

  useFrame((state) => {
    frameCountRef.current += 1

    // Throttle pulse updates for stability
    if (frameCountRef.current % 4 !== 0) return

    if (pulsesRef.current) {
      pulsesRef.current.children.forEach((pulse, index) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index * 3) * 0.3
        pulse.scale.setScalar(scale)
        const mesh = pulse as THREE.Mesh
        if (mesh.material && mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.opacity = (1 - scale * 0.4) * 0.3
        }
      })
    }
  })

  return (
    <group ref={pulsesRef}>
      {Array.from({ length: 4 }, (_, i) => { // Reduced from 6 to 4
        const angle = (i / 4) * Math.PI * 2
        return (
          <mesh key={`pulse-${i}`} position={[Math.cos(angle) * 10, 0, Math.sin(angle) * 10]}>
            <ringGeometry args={[0.4, 0.8, 12]} />
            <meshBasicMaterial
              color="#00ff88"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function GeometricCrystal() {
  const crystalRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.x = state.clock.elapsedTime * 0.3
      crystalRef.current.rotation.y = state.clock.elapsedTime * 0.2
      crystalRef.current.rotation.z = state.clock.elapsedTime * 0.1

      // Animate individual faces
      crystalRef.current.children.forEach((face, index) => {
        face.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      })
    }
  })

  return (
    <group ref={crystalRef} position={[0, 2, 0]}>
      {/* Central crystal core */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00ff88"
          transparent
          opacity={0.6}
          emissive="#00ff88"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Outer crystal faces */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2
        return (
          <mesh key={`face-${i}`} position={[
            Math.cos(angle) * radius,
            Math.sin(angle * 0.5) * radius * 0.5,
            Math.sin(angle) * radius
          ]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshStandardMaterial
              color={`hsl(${120 + i * 45}, 70%, 60%)`}
              transparent
              opacity={0.4}
              emissive={`hsl(${120 + i * 45}, 70%, 30%)`}
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function HolographicGrid() {
  const gridRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.1
      gridRef.current.children.forEach((line, index) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial
        material.opacity = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.3 + 0.4
      })
    }
  })

  return (
    <group ref={gridRef}>
      {/* Create a holographic grid pattern */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const radius = 15
        return (
          <line key={`grid-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  Math.cos(angle) * radius, -8, Math.sin(angle) * radius,
                  Math.cos(angle) * radius, 8, Math.sin(angle) * radius
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.2}
              linewidth={1}
            />
          </line>
        )
      })}
    </group>
  )
}

export default function BlockchainHero() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 25], fov: 60 }}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
        }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Handle WebGL context loss
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
        {/* Core blockchain visualizations */}
        <BlockchainChain />
        <DataFlowParticles />
        <EnergyPulses />
        <GeometricCrystal />
        <HolographicGrid />

        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, 10, 10]} intensity={0.6} color="#60a5fa" />
        <pointLight position={[10, -10, -10]} intensity={0.4} color="#00ff88" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={0.1}
          intensity={0.5}
          color="#a855f7"
          castShadow
        />

        {/* Subtle fog effect */}
        <fog attach="fog" args={['#1e293b', 20, 50]} />

        {/* Auto-rotating camera for dynamic view */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI * 0.6}
          minPolarAngle={Math.PI * 0.4}
        />
      </Canvas>
    </div>
  )
}
