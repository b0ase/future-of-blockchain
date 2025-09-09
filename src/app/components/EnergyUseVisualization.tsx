'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

interface DataPoint {
  name: string
  yearCost: number // in billions USD
  energyGJ: number // in GJ
  txVolume: number // transaction volume in trillions
  color: string
}

function Bar3D({ data, index, maxValue, isHovered, onHover, animationProgress }: { 
  data: DataPoint
  index: number
  maxValue: number
  isHovered: boolean
  onHover: (hover: boolean) => void
  animationProgress: number
}) {
  const [localHover, setLocalHover] = useState(false)
  
  // Base heights
  const baseCostHeight = (data.yearCost / 2000) * 40
  const baseEnergyHeight = (data.energyGJ / 2500) * 40
  const baseTxHeight = (data.txVolume / 2500) * 40 // scale for 2500T max transaction volume
  
  // Apply animation changes
  let costHeight = baseCostHeight
  let energyHeight = baseEnergyHeight
  let txHeight = baseTxHeight
  let displayTxVolume = data.txVolume
  let displayCost = data.yearCost
  let displayEnergy = data.energyGJ
  
  if (animationProgress > 0) {
    if (data.name === 'Bitcoin Mining') {
      // Costs grow moderately to reflect increased mining activity (3x increase)
      const costGrowthFactor = 1 + (2.0 * animationProgress)
      costHeight = baseCostHeight * costGrowthFactor
      displayCost = data.yearCost * costGrowthFactor
      // Energy grows slower (2x increase)
      const energyGrowthFactor = 1 + (1.0 * animationProgress)
      energyHeight = baseEnergyHeight * energyGrowthFactor
      displayEnergy = data.energyGJ * energyGrowthFactor
      // Transaction volume grows rapidly to 2500T mark
      // Aggressive exponential growth - reaches 2500T at 30% animation progress
      const bankingLoss = 0.6 * animationProgress
      // Exponential curve - reaches 5000x growth (0.5T to 2500T)
      const txGrowthFactor = animationProgress > 0.3 
        ? 5000 // Max out at 2500T after 30% progress
        : Math.pow(5000, animationProgress / 0.3) // Exponential growth to 5000x in first 30%
      // Calculate the actual new transaction volume for height
      const newTxVolume = data.txVolume * txGrowthFactor // Goes from 0.5T to 2500T
      txHeight = (newTxVolume / 2500) * 40 // Recalculate height based on 2500T scale
      // Update displayed transaction volume to reach 2500T
      displayTxVolume = newTxVolume // Show actual growth up to 2500T
    } else if (data.name === 'Banking System') {
      // Banking decreases by 75% - same rate as transaction volume
      const shrinkFactor = 1 - (0.75 * animationProgress)
      costHeight = baseCostHeight * shrinkFactor
      energyHeight = baseEnergyHeight * shrinkFactor
      // Transaction volume DECREASES from 1875T down as transactions move to Bitcoin
      // Decrease by 75% (from 1875T to ~470T) to show migration to Bitcoin
      const txShrinkFactor = 1 - (0.75 * animationProgress)
      const newBankingTxVolume = data.txVolume * txShrinkFactor
      txHeight = (newBankingTxVolume / 2500) * 40 // Recalculate height based on 2500T scale
      // Update displayed transaction volume
      displayTxVolume = newBankingTxVolume
      // Update displayed cost and energy values to match the shrinkage
      displayCost = data.yearCost * shrinkFactor
      displayEnergy = data.energyGJ * shrinkFactor
    }
  }
  
  return (
    <group position={[index * 30 - 15, 0, 0]}>
      {/* Yearly Cost Bar (Blue/Purple) */}
      <mesh 
        position={[-8, costHeight / 2, 0]}
        onPointerOver={() => {
          setLocalHover(true)
          onHover(true)
        }}
        onPointerOut={() => {
          setLocalHover(false)
          onHover(false)
        }}
      >
        <boxGeometry args={[6, costHeight, 6]} />
        <meshStandardMaterial 
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={localHover ? 0.3 : 0.1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Energy Expenditure Bar (Orange-Yellow) */}
      <mesh 
        position={[0, energyHeight / 2, 0]}
        onPointerOver={() => {
          setLocalHover(true)
          onHover(true)
        }}
        onPointerOut={() => {
          setLocalHover(false)
          onHover(false)
        }}
      >
        <boxGeometry args={[6, energyHeight, 6]} />
        <meshStandardMaterial 
          color="#FFA500"
          emissive="#FF8C00"
          emissiveIntensity={localHover ? 0.3 : 0.15}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      
      {/* Transaction Volume Bar (Green) */}
      <mesh 
        position={[8, txHeight / 2, 0]}
        onPointerOver={() => {
          setLocalHover(true)
          onHover(true)
        }}
        onPointerOut={() => {
          setLocalHover(false)
          onHover(false)
        }}
      >
        <boxGeometry args={[6, txHeight, 6]} />
        <meshStandardMaterial 
          color="#00FF88"
          emissive="#00FF44"
          emissiveIntensity={localHover ? 0.3 : 0.15}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, -3, 0]}
        fontSize={2}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
      >
        {data.name}
      </Text>
      
      {/* Cost Value */}
      <Text
        position={[-8, costHeight + 2, 0]}
        fontSize={1.5}
        color="#7C3AED"
        anchorX="center"
        anchorY="middle"
        visible={isHovered}
      >
        ${displayCost.toFixed(0)}B
      </Text>
      
      {/* Energy Value */}
      <Text
        position={[0, energyHeight + 2, 0]}
        fontSize={1.5}
        color="#FFA500"
        anchorX="center"
        anchorY="middle"
        visible={isHovered}
      >
        {displayEnergy.toFixed(0)} GJ
      </Text>
      
      {/* Transaction Volume Value */}
      <Text
        position={[8, txHeight + 2, 0]}
        fontSize={1.5}
        color="#00FF88"
        anchorX="center"
        anchorY="middle"
        visible={isHovered}
      >
        {displayTxVolume.toFixed(1)}T tx
      </Text>
    </group>
  )
}

function Chart3D({ animationProgress, controlsRef }: { animationProgress: number, controlsRef: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Camera movement only after banking sector has shrunk (after 50% progress)
  useEffect(() => {
    if (controlsRef?.current) {
      if (animationProgress > 0.5) {
        // Start panning up after banking has shrunk
        const panProgress = (animationProgress - 0.5) * 2 // Normalize to 0-1 for second half
        const cameraY = 20 + (panProgress * 15) // Pan from Y:20 to Y:35
        const targetY = 15 + (panProgress * 10) // Target from Y:15 to Y:25
        
        controlsRef.current.object.position.set(0, cameraY, 60)
        controlsRef.current.target.set(0, targetY, 0)
        controlsRef.current.update()
      } else {
        // Keep camera at default position until banking shrinks
        controlsRef.current.object.position.set(0, 20, 60)
        controlsRef.current.target.set(0, 15, 0)
        controlsRef.current.update()
      }
    }
  }, [animationProgress, controlsRef])
  
  const data: DataPoint[] = [
    { name: 'Bitcoin Mining', yearCost: 16, energyGJ: 180, txVolume: 0.5, color: '#7C3AED' },
    { name: 'Banking System', yearCost: 1870, energyGJ: 2340, txVolume: 1875, color: '#7C3AED' }  // Start at 1875T transaction volume
  ]
  
  const maxValue = Math.max(...data.map(d => Math.max(d.yearCost, d.energyGJ)))
  
  return (
    <group>
      {/* Grid floor - subtle without green lines */}
      <gridHelper args={[80, 20, '#222222', '#111111']} position={[0, 0, 0]} />
      
      {/* Axis lines */}
      <mesh position={[-30, 20, 0]}>
        <boxGeometry args={[0.2, 40, 0.2]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>
      
      {/* Y-axis labels */}
      <Text position={[-32, 40, 0]} fontSize={1.5} color="#00ff88">2500</Text>
      <Text position={[-32, 30, 0]} fontSize={1.5} color="#00ff88">1875</Text>
      <Text position={[-32, 20, 0]} fontSize={1.5} color="#00ff88">1250</Text>
      <Text position={[-32, 10, 0]} fontSize={1.5} color="#00ff88">625</Text>
      <Text position={[-32, 0, 0]} fontSize={1.5} color="#00ff88">0</Text>
      
      {/* Title - moved to background so bars can grow through it */}
      <Text
        position={[0, 50, -10]}
        fontSize={4}
        color="#00ff88"
        anchorX="center"
        fontWeight="bold"
      >
        Comparing Energy Expenditure
      </Text>
      
      <Text
        position={[0, 46, -10]}
        fontSize={3}
        color="#00ff88"
        anchorX="center"
      >
        Across Monetary and Banking Systems
      </Text>
      
      {/* Legend - moved back and adjusted for mobile */}
      <group position={[30, 25, -5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 0.5]} />
          <meshStandardMaterial color="#7C3AED" />
        </mesh>
        <Text position={[4, 0, 0]} fontSize={1.5} color="#7C3AED" anchorX="left">
          Yearly Cost (billions USD)
        </Text>
        
        <mesh position={[0, -4, 0]}>
          <boxGeometry args={[2, 2, 0.5]} />
          <meshStandardMaterial color="#FFA500" />
        </mesh>
        <Text position={[4, -4, 0]} fontSize={1.5} color="#FFA500" anchorX="left">
          Energy Expenditure (GJ)
        </Text>
        
        <mesh position={[0, -8, 0]}>
          <boxGeometry args={[2, 2, 0.5]} />
          <meshStandardMaterial color="#00FF88" />
        </mesh>
        <Text position={[4, -8, 0]} fontSize={1.5} color="#00FF88" anchorX="left">
          Transaction Volume (Trillions)
        </Text>
      </group>
      
      {/* Bars */}
      {data.map((d, i) => (
        <Bar3D 
          key={i} 
          data={d} 
          index={i} 
          maxValue={maxValue}
          isHovered={hoveredIndex === i}
          onHover={(hover) => setHoveredIndex(hover ? i : null)}
          animationProgress={animationProgress}
        />
      ))}
    </group>
  )
}


export default function EnergyUseVisualization() {
  const controlsRef = useRef<OrbitControlsType>(null!)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const hasStartedRef = useRef(false)
  const [isLegendOpen, setIsLegendOpen] = useState(false) // Collapsed by default
  
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 15, 0)
      controlsRef.current.object.position.set(0, 20, 60)
      controlsRef.current.update()
    }
  }
  
  const startAnimation = () => {
    console.log('Starting animation')
    setAnimationProgress(0)
    setIsAnimating(true)
  }
  
  const resetAnimation = () => {
    console.log('Resetting animation')
    setIsAnimating(false)
    setAnimationProgress(0)
  }
  
  useEffect(() => {
    if (isAnimating) {
      console.log('Animation started, setting up interval')
      const interval = setInterval(() => {
        setAnimationProgress(prev => {
          const newProgress = prev + 0.005  // Even slower for longer animation
          console.log('Animation progress:', newProgress)
          if (newProgress >= 1) {
            // Loop the animation
            setTimeout(() => {
              setAnimationProgress(0)
              setIsAnimating(true)
            }, 3000) // 3 second pause before restart
            setIsAnimating(false)
            return 1
          }
          return newProgress
        })
      }, 50)  // 10 second animation
      
      return () => clearInterval(interval)
    }
  }, [isAnimating])
  
  // Auto-start animation on component mount
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      setTimeout(() => {
        startAnimation()
      }, 1000) // Start after 1 second
    }
  }, [])
  
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 20, 60], fov: 75 }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[0, 20, 0]} intensity={1.0} />
        
        <Chart3D animationProgress={animationProgress} controlsRef={controlsRef} />
        
        <OrbitControls 
          ref={controlsRef}
          target={[0, 15, 0]}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI * 0.85}
          minDistance={30}
          maxDistance={150}
        />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 80, 200]} />
      </Canvas>
      
      {/* Control Buttons */}
      <div className="absolute bottom-20 right-4 bg-black/90 backdrop-blur-md p-2 rounded-lg border border-[#00ff88]/30 space-y-2">
        <button
          onClick={isAnimating ? resetAnimation : startAnimation}
          className={`w-full px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
            isAnimating 
              ? 'border-red-500/50 hover:bg-red-500/20 text-red-400'
              : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
          }`}
          title={isAnimating ? "Reset animation" : "Start future projection animation"}
        >
          {isAnimating ? '⏹️ Reset' : '▶️ Animate Future'}
        </button>
        
        <button
          onClick={() => {
            // Zoom out along z-axis
            if (controlsRef.current) {
              controlsRef.current.object.position.set(0, 30, 100)
              controlsRef.current.object.lookAt(0, 15, 0)
              controlsRef.current.update()
            }
          }}
          className="w-full px-3 py-2 rounded text-[#00ff88] font-mono text-xs border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50 transition-all cursor-pointer"
          title="Zoom out to see full scene"
        >
          🔍 Zoom Out
        </button>
        
        <button
          onClick={resetView}
          className="w-full px-3 py-2 rounded text-[#00ff88] font-mono text-xs border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50 transition-all cursor-pointer"
          title="Reset to default view"
        >
          🏠 Reset View
        </button>
      </div>
      
      {/* Legend Toggle Button - positioned below tabs on mobile */}
      <button
        onClick={() => setIsLegendOpen(!isLegendOpen)}
        className="absolute top-20 left-4 px-3 py-2 bg-black/90 backdrop-blur rounded-lg border border-[#00ff88]/30 text-[#00ff88] font-mono text-xs hover:bg-[#00ff88]/20 transition-all cursor-pointer flex items-center gap-2"
        title={isLegendOpen ? "Hide legend" : "Show legend"}
      >
        <span>{isLegendOpen ? '📖' : '📖'}</span>
        <span>{isLegendOpen ? 'Hide Info' : 'Show Info'}</span>
        <span>{isLegendOpen ? '▲' : '▼'}</span>
      </button>
      
      {/* Collapsible Info panel */}
      {isLegendOpen && (
        <div className="absolute top-32 left-4 bg-black/90 backdrop-blur p-4 rounded-lg border border-[#00ff88]/30 max-w-md animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-[#00ff88] font-mono text-sm mb-2">Energy Efficiency Evolution</h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            Current data shows the banking system consumes significantly more energy than Bitcoin mining. 
            As Bitcoin's blockchain evolves with larger block sizes, it becomes the rails for stablecoins 
            and financial infrastructure.
          </p>
          <p className="text-gray-300 text-xs mt-2 leading-relaxed">
            <span className="text-[#00ff88]">Network Effect:</span> As banks adopt Bitcoin's blockchain for settlements, 
            both systems become more efficient. Transaction costs decrease while volume increases exponentially, 
            creating a virtuous cycle reflected in Bitcoin's asset price.
          </p>
          {(isAnimating || animationProgress > 0) && (
            <p className={`text-yellow-400 text-xs mt-2 leading-relaxed ${isAnimating ? 'animate-pulse' : ''}`}>
              <span className="font-bold">Future Projection:</span> Bitcoin's energy triples (3x) as it absorbs banking functions, 
              but remains far below current banking levels. Banking energy drops 75% as infrastructure migrates 
              to blockchain rails. The net result: dramatically more efficient global finance with Bitcoin as the backbone.
            </p>
          )}
        </div>
      )}
    </div>
  )
}