
'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'



function MiningPoolPieChart({ viewMode }: { viewMode: string }) {
  const chartRef = useRef<THREE.Group>(null!)
  const mainGroupRef = useRef<THREE.Group>(null!)

  // BSV Node implementations - Actual BSV ecosystem
  const bsvNodes = [
    { name: 'TAAL', percentage: 25.0, color: '#FF0000' },           // Red - Major BSV miner
    { name: 'GorillaPool', percentage: 20.0, color: '#FF3300' },    // Red-Orange
    { name: 'SVPool', percentage: 15.0, color: '#FF6600' },         // Orange
    { name: 'WhatsOnChain', percentage: 8.0, color: '#FF9900' },    // Orange-Yellow - Node service
    { name: 'ViaBTC BSV', percentage: 7.0, color: '#FFCC00' },      // Yellow-Orange
    { name: 'Mempool', percentage: 5.0, color: '#FFFF00' },         // Yellow
    { name: 'MARAPool', percentage: 4.5, color: '#CCFF00' },        // Yellow-Green
    { name: 'SBI Mining', percentage: 3.5, color: '#99FF00' },      // Light Green
    { name: 'Unknown', percentage: 3.0, color: '#66FF00' },         // Green
    { name: 'Solo Miners', percentage: 2.5, color: '#33FF00' },     // Green
    { name: 'BSV Pool', percentage: 2.0, color: '#00FF00' },        // Pure Green
    { name: 'Other Nodes', percentage: 4.5, color: '#00FF33' }      // Green-Cyan
  ]

  // BTC Mining Pool data - Rainbow gradient palette
  const btcPools = [
    { name: 'AntPool', percentage: 18.5, color: '#FF0000' },        // Red
    { name: 'Poolin', percentage: 15.2, color: '#FF3300' },         // Red-Orange
    { name: 'BTC.com', percentage: 12.8, color: '#FF6600' },        // Orange
    { name: 'F2Pool', percentage: 10.3, color: '#FF9900' },         // Orange-Yellow
    { name: 'Binance', percentage: 8.9, color: '#FFCC00' },         // Yellow-Orange
    { name: 'Foundry USA', percentage: 6.0, color: '#FFFF00' },     // Yellow
    { name: 'ViaBTC', percentage: 4.5, color: '#CCFF00' },          // Yellow-Green
    { name: 'Braiins', percentage: 3.5, color: '#99FF00' },         // Light Green
    { name: 'Luxor', percentage: 2.8, color: '#66FF00' },           // Green
    { name: 'SBI Crypto', percentage: 2.2, color: '#33FF00' },      // Green
    { name: 'BitFury', percentage: 2.5, color: '#00FF00' },         // Pure Green
    { name: 'Kano CKPool', percentage: 2.0, color: '#00FF33' },     // Green-Cyan
    { name: 'SpiderPool', percentage: 1.8, color: '#00FF66' },      // Cyan-Green
    { name: 'Huobi Pool', percentage: 1.5, color: '#00FF99' },      // Cyan
    { name: 'OKEx Pool', percentage: 1.3, color: '#00FFCC' },       // Cyan
    { name: 'BTC.TOP', percentage: 1.2, color: '#00FFFF' },         // Pure Cyan
    { name: '58COIN', percentage: 1.0, color: '#00CCFF' },          // Cyan-Blue
    { name: 'YourPool', percentage: 0.8, color: '#0099FF' },        // Light Blue
    { name: 'BitClub', percentage: 0.7, color: '#0066FF' },         // Blue
    { name: 'BTCC', percentage: 0.6, color: '#0033FF' },            // Blue
    { name: 'HashNest', percentage: 0.5, color: '#0000FF' },        // Pure Blue
    { name: 'Tiny Pools', percentage: 1.4, color: '#3300FF' }       // Blue-Violet
  ]

  // Use BSV nodes for 'single' view, BTC pools for 'multi' view
  const miningPools = viewMode === 'single' ? bsvNodes : btcPools

  useFrame((state) => {
    // Gently rotate the entire visualization
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y -= 0.002 // Slow continuous rotation (reversed)
    }
    
    // Keep the subtle wobble on the pie chart
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })


  return (
    <group ref={mainGroupRef}>
      {/* Earth hemisphere underneath everything */}
      <group position={[0, -28, 0]}>
        {/* Outer atmosphere glow */}
        <mesh rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[38, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color="#4A90E2"
            opacity={0.15}
            transparent
            emissive="#4A90E2"
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Main Earth hemisphere */}
        <mesh rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color="#1E3A8A"
            emissive="#1E3A8A"
            emissiveIntensity={0.05}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        
        {/* Inner core glow */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[35, 35, 0.1, 64]} />
          <meshBasicMaterial 
            color="#FF6B00"
            opacity={0.3}
            transparent
          />
        </mesh>
      </group>

      <group ref={chartRef} position={[0, -25, 0]}>
        {/* Generate outer pie slices - bigger and brighter, representing distributed nodes */}
        {miningPools.map((pool, index) => {
          const startAngle = miningPools.slice(0, index).reduce((sum, p) => sum + p.percentage, 0) / 100 * Math.PI * 2
          const angle = (pool.percentage / 100) * Math.PI * 2

          return (
            <mesh key={`outer-${pool.name}`} position={[0, -0.15, 0]}>
              <cylinderGeometry args={[34.5, 34.5, 0.12, 32, 1, false, startAngle, angle]} />
              <meshBasicMaterial 
                color={pool.color} 
                opacity={0.6}
                transparent
              />
            </mesh>
          )
        })}

        {/* Generate inner pie slices - original */}
        {miningPools.map((pool, index) => {
          const startAngle = miningPools.slice(0, index).reduce((sum, p) => sum + p.percentage, 0) / 100 * Math.PI * 2
          const angle = (pool.percentage / 100) * Math.PI * 2

          return (
            <mesh key={pool.name} position={[0, 0.1, 0]}>
              <cylinderGeometry args={[7, 7, 0.1, 32, 1, false, startAngle, angle]} />
              <meshStandardMaterial color={pool.color} />
            </mesh>
          )
        })}


        {/* Title - moved to background */}
        <group position={[0, 3, -1]}>
          <Text
            fontSize={0.3}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            {viewMode === 'single' ? 'BSV Node Network' : 'BTC Mining Pools'}
          </Text>
        </group>

        {/* Subtitle with total - moved to background */}
        <group position={[0, 2, -1]}>
          <Text
            fontSize={0.2}
            color="#555555"
            anchorX="center"
            anchorY="middle"
          >
            Global Hash Rate Distribution
          </Text>
        </group>

        {/* MINING POOL BALLS - Positioned above their pie slices */}
        {(() => {
          return miningPools.map((pool, index) => {
            // Scale ball size proportionally to pie slice percentages - MAXIMUM DRAMATIC
            const minSize = 0.1; // Really small minimum ball size
            const maxSize = 3.0; // Reasonable maximum ball size

            // SIMPLE EXACT SCALING: AntPool exactly 18x larger than Tiny Pools
            let ballSize;
            if (pool.percentage === 18.5) {
              // AntPool: maximum size
              ballSize = maxSize;
            } else if (pool.percentage === 1.4) {
              // Tiny Pools: exactly 18x smaller than AntPool
              ballSize = maxSize / 18.0; // 3.0 / 18 = 0.167
            } else {
              // Linear interpolation between AntPool (18.5%) and Tiny Pools (1.4%) extremes
              const antPoolPercent = 18.5;
              const tinyPoolsPercent = 1.4;
              const antPoolSize = maxSize;
              const tinyPoolsSize = maxSize / 18.0;

              // Calculate position between the two extremes
              const ratio = (pool.percentage - tinyPoolsPercent) / (antPoolPercent - tinyPoolsPercent);
              ballSize = tinyPoolsSize + ratio * (antPoolSize - tinyPoolsSize);
              ballSize = Math.max(minSize, Math.min(maxSize, ballSize)); // Clamp
            }

            // Position above corresponding pie slice - MATCH PIE CHART EXACTLY
            const startAngle = miningPools.slice(0, index).reduce((sum, p) => sum + p.percentage, 0) / 100 * Math.PI * 2;
            const poolAngle = (pool.percentage / 100) * Math.PI * 2;
            const centerAngle = startAngle + poolAngle / 2; // Center of this pool's slice
            
            // Position in a ring above the pie chart - smaller pools closer to blockchain
            const radius = 8 + (12 * (1 - index / miningPools.length)); // Smallest pools closest (radius 8), largest furthest (radius 20)
            // Largest pools (lower index) get highest position
            const height = 10 + (22 - index * 1.0); // Heights from 32 down to about 10
            
            // The cylinderGeometry creates slices, but we need to reverse the direction
            // and rotate 180 degrees more (add PI)
            const reversedAngle = -centerAngle - Math.PI / 2 + Math.PI; // Reverse, rotate 90 clockwise, then 180 more
            const x = Math.cos(reversedAngle) * radius;
            const z = Math.sin(reversedAngle) * radius;
            const spiralY = height;

          return (
            <group key={`miner-${pool.name}-${index}`} position={[x, spiralY, z]}>
              {/* Mining pool ball - sized by pool percentage */}
              <mesh>
                <sphereGeometry args={[ballSize, 16, 16]} />
                <meshStandardMaterial
                  color={pool.color}
                  emissive={pool.color}
                  emissiveIntensity={0.15 + (ballSize / maxSize) * 0.35} // More emissive for larger balls
                  metalness={0.3}
                  roughness={0.2}
                />
              </mesh>

              {/* Glow effect scaled to ball size */}
              <mesh>
                <sphereGeometry args={[ballSize * 1.3, 16, 16]} />
                <meshBasicMaterial
                  color={pool.color}
                  transparent
                  opacity={0.06 + (ballSize / maxSize) * 0.12} // More glow for larger balls
                />
              </mesh>

              {/* Pool name label - positioned to the right and higher */}
              <Text
                position={[ballSize + 2.5, ballSize + 1, 0]}
                fontSize={0.8 + (ballSize / maxSize) * 0.6} // Much larger text
                color="#ffffff"
                anchorX="left"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#000000"
              >
                {pool.name}
              </Text>

              {/* Percentage label - positioned below but higher than before */}
              <Text
                position={[0, -ballSize - 0.5, 0]}
                fontSize={0.6 + (ballSize / maxSize) * 0.5} // Much larger text
                color={pool.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#000000"
              >
                {pool.percentage}%
              </Text>
            </group>
          );
        });
        })()}
      </group>
    </group>
  )
}

function MeshNetwork() {
  const txRef = useRef<THREE.Mesh>(null)
  
  // Define the two specific node positions from the grid
  const gridSize = 25
  const spacing = 5
  const extent = (gridSize - 1) * spacing / 2
  
  // Pick two specific grid positions for our transaction nodes
  const node1Pos: [number, number, number] = [-extent + 5 * spacing, 0, -extent + 8 * spacing] // Grid position [5, 8]
  const node2Pos: [number, number, number] = [-extent + 18 * spacing, 0, -extent + 16 * spacing] // Grid position [18, 16]
  
  // Animate transaction pulse along the line
  useFrame((state) => {
    if (txRef.current) {
      // Calculate position along the line based on time
      const t = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2 // Oscillates between 0 and 1
      
      // Interpolate position between the two nodes
      txRef.current.position.x = node1Pos[0] + (node2Pos[0] - node1Pos[0]) * t
      txRef.current.position.y = node1Pos[1] + (node2Pos[1] - node1Pos[1]) * t
      txRef.current.position.z = node1Pos[2] + (node2Pos[2] - node1Pos[2]) * t
      
      // Pulse the size
      const scale = 0.3 + Math.sin(state.clock.elapsedTime * 8) * 0.1
      txRef.current.scale.set(scale, scale, scale)
    }
  })
  
  return (
    <group position={[0, -24.5, 0]}> {/* Position just above the pie chart */}
      
      {/* Create a simple mesh network grid */}
      {(() => {
        const lines = [];
        const nodes = [];
        const gridSize = 25; // Larger grid
        const spacing = 5; // Larger spacing
        const extent = (gridSize - 1) * spacing / 2; // Half the total grid size
        
        // Create horizontal lines
        for (let i = 0; i < gridSize; i++) {
          const z = -extent + i * spacing;
          const points = [];
          for (let j = 0; j < gridSize; j++) {
            const x = -extent + j * spacing;
            points.push(new THREE.Vector3(x, 0, z));
          }
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          lines.push(
            <line key={`h-line-${i}`}>
              <primitive object={geometry} />
              <lineBasicMaterial color="#000000" opacity={0.8} transparent />
            </line>
          );
        }
        
        // Create vertical lines
        for (let i = 0; i < gridSize; i++) {
          const x = -extent + i * spacing;
          const points = [];
          for (let j = 0; j < gridSize; j++) {
            const z = -extent + j * spacing;
            points.push(new THREE.Vector3(x, 0, z));
          }
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          lines.push(
            <line key={`v-line-${i}`}>
              <primitive object={geometry} />
              <lineBasicMaterial color="#000000" opacity={0.8} transparent />
            </line>
          );
        }
        
        // Create nodes at intersections
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const x = -extent + i * spacing;
            const z = -extent + j * spacing;
            // Make two specific nodes white for transaction visualization
            const isSpecialNode = (i === 5 && j === 8) || (i === 18 && j === 16);
            nodes.push(
              <mesh key={`node-${i}-${j}`} position={[x, 0, z]}>
                <sphereGeometry args={[isSpecialNode ? 0.5 : 0.2, 8, 8]} />
                <meshBasicMaterial color={isSpecialNode ? "#ffffff" : "#000000"} />
              </mesh>
            );
          }
        }
        
        return [...lines, ...nodes];
      })()}
      
      {/* Transaction line between the two white nodes */}
      <Line
        points={[node1Pos, node2Pos]}
        color="#00ff00"
        lineWidth={2}
        dashed={false}
      />
      
      {/* Animated transaction pulse */}
      <mesh ref={txRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function MultiChainBlocks() {
  return (
    <group>
      {/* 50 mini chains starting from center and splaying outward */}
      {(() => {
        const chains = [];
        const numChains = 50;
        const blockSize = 0.6; // Bigger block size for visibility
        const blocksPerChain = 30; // Reduced back to shorter chains
        const gap = 0.3; // Slightly bigger gap for more spread
        
        for (let chainIndex = 0; chainIndex < numChains; chainIndex++) {
          // Each chain starts at center and goes outward at an angle
          const angle = (chainIndex / numChains) * Math.PI * 2;
          const baseY = -23; // Start just above pie chart
          
          // Create a chain of blocks going outward and upward from center
          const chain = [];
          for (let blockIndex = 0; blockIndex < blocksPerChain; blockIndex++) {
            // Start from center (0,0) and move outward - faster spread
            const distance = blockIndex * (blockSize + gap) * 1.5; // 1.5x multiplier for wider spread
            const x = Math.cos(angle) * distance;
            const z = Math.sin(angle) * distance;
            const y = baseY + (blockIndex * 0.8); // Much steeper upward angle
            
            // Color based on distance from center - rainbow gradient
            const colorProgress = blockIndex / (blocksPerChain - 1);
            
            chain.push(
              <group key={`block-${blockIndex}`}>
                <mesh position={[x, y, z]}>
                  <boxGeometry args={[blockSize, blockSize, blockSize]} />
                  <meshBasicMaterial
                    color={`hsl(${240 - (colorProgress * 240)}, 100%, 60%)`}
                  />
                </mesh>
                {/* Glow effect */}
                <mesh position={[x, y, z]}>
                  <boxGeometry args={[blockSize * 1.1, blockSize * 1.1, blockSize * 1.1]} />
                  <meshBasicMaterial
                    color={`hsl(${240 - (colorProgress * 240)}, 100%, 70%)`}
                    transparent
                    opacity={0.3}
                  />
                </mesh>
              </group>
            );
          }
          
          chains.push(
            <group key={`chain-${chainIndex}`}>
              {chain}
            </group>
          );
        }
        
        return chains;
      })()}
    </group>
  );
}

function BlockchainBlocks({ viewMode }: { viewMode: string }) {
  return (
    <group>
      {/* ONE CHAIN of blocks - BTC: all 1MB, BSV: getting bigger every 10 minutes! */}
      {(() => {
        const blocks = [];
        const totalBlocks = 100; // 100 blocks
        const maxSize = viewMode === 'multi' ? 1 : 2000; // BTC: 1MB max, BSV: 2GB max

        for (let i = 0; i < totalBlocks; i++) {
          const progress = i / (totalBlocks - 1);
          
          // BTC: constant 1MB, BSV: exponential growth to reach 2GB
          const size = viewMode === 'multi' 
            ? 1 // BTC always 1MB
            : Math.round(1 + (maxSize - 1) * Math.pow(progress, 2));

          // Skip blocks above 250MB for BSV
          if (viewMode !== 'multi' && size > 250) continue;

          // Linear proportional scaling - blocks are directly proportional to their size
          const baseScale = viewMode === 'multi' ? 1 : 0.01; // BTC: full size for 1MB, BSV: scale for larger sizes
          const visualScale = size * baseScale;
          const clampedScale = Math.max(0.5, Math.min(20.0, visualScale));

          // Calculate position with small gaps and first block above pie chart at bottom
          const gap = 0.5; // Visible gap between blocks
          let y = -23; // Start just above pie chart (which is at Y=-25)

          for (let j = 0; j < i; j++) {
            const prevProgress = j / (totalBlocks - 1);
            const prevSize = Math.round(1 + (maxSize - 1) * Math.pow(prevProgress, 2));
            if (prevSize > 250) continue; // Skip blocks that were filtered out
            const prevVisualScale = prevSize * baseScale;
            const prevClampedScale = Math.max(0.5, Math.min(20.0, prevVisualScale));
            y += prevClampedScale + gap; // Add height + small gap for each previous block
          }

          // Recalculate progress based on 250MB max for proper color gradient
          const colorProgress = Math.min(size / 250, 1); // 0 to 1 based on 250MB max
          
          // Add pulsing for the biggest blocks
          const isBigBlock = size >= 80; // Pulse for 80MB+ blocks

            blocks.push(
              <group key={`block-${i}`} position={[0, y, 0]}>
              {/* Main block - rainbow gradient from dark blue to red based on 250MB scale */}
              <mesh>
                <boxGeometry args={[clampedScale, clampedScale, clampedScale]} />
                <meshStandardMaterial
                  color={`hsl(${240 - (colorProgress * 240)}, 90%, 50%)`} // Dark blue (240) to red (0)
                  emissive={`hsl(${240 - (colorProgress * 240)}, 80%, 30%)`}
                  emissiveIntensity={0.3 + colorProgress * 0.7}
                  metalness={0.4}
                  roughness={0.1}
                />
              </mesh>

              {/* Pulsing glow for massive blocks */}
              {isBigBlock && (
                <mesh>
                  <boxGeometry args={[clampedScale * 1.3, clampedScale * 1.3, clampedScale * 1.3]} />
                  <meshBasicMaterial
                    color={`hsl(${240 - (colorProgress * 240)}, 100%, 70%)`}
                    transparent
                    opacity={0.15}
                  />
                </mesh>
              )}

              {/* Size label - moved to right side */}
              <Text
                position={[clampedScale + 0.8, 0, 0]}
                fontSize={0.25}
                color="#00ff88"
                anchorX="left"
                anchorY="middle"
              >
                {size < 1000 ? `${size}MB` : `${(size/1000).toFixed(1)}GB`}
              </Text>
            </group>
          );
        }

        return blocks;
      })()}

      {/* Timeline that follows the actual block positions with gaps */}
      {(() => {
        const timelinePoints = [0, -23, 0]; // Start above pie chart at bottom
        const gap = 0.5; // Same gap as blocks
        let currentY = -23; // Start from first block position
        const totalBlocks = 100;
        const maxSize = 2000;
        const baseScale = 0.01;

        for (let i = 1; i <= totalBlocks; i++) { // All blocks for accurate line
          const progress = (i - 1) / (totalBlocks - 1);
          const size = Math.round(1 + (maxSize - 1) * Math.pow(progress, 2));
          
          // Stop timeline at 250MB
          if (size > 250) break;
          
          const visualScale = size * baseScale;
          const clampedScale = Math.max(0.5, Math.min(20.0, visualScale));
          currentY += clampedScale + gap;
          timelinePoints.push(0, currentY, 0);
        }

        return (
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(timelinePoints), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ff88" linewidth={4} />
          </line>
        );
      })()}

      {/* Final massive block marker */}
      {(() => {
        const gap = 0.5; // Same gap as blocks
        let totalHeight = -23; // Start from first block position
        const totalBlocks = 100;
        const maxSize = 2000;
        const baseScale = 0.01;
        
        for (let i = 0; i < totalBlocks; i++) {
          const progress = i / (totalBlocks - 1);
          const size = Math.round(1 + (maxSize - 1) * Math.pow(progress, 2));
          
          // Stop at 250MB
          if (size > 250) break;
          const visualScale = size * baseScale;
          const clampedScale = Math.max(0.5, Math.min(20.0, visualScale));
          totalHeight += clampedScale + gap;
        }

        return (
          <Text
            position={[15, totalHeight / 2, 0]}  // Position to the right, at mid-height
            fontSize={2}
            color="#ff4444"
            anchorX="left"
            anchorY="middle"
            rotation={[0, 0, 0]}  // Keep text facing forward
          >
            {viewMode === 'multi' ? '1MB BLOCKS' : 'Variable Blocksize'}
          </Text>
        );
      })()}
    </group>
  )
}

export default function BlockchainVisualizer() {
  const controlsRef = useRef<OrbitControlsType | null>(null)
  const [viewMode, setViewMode] = React.useState<'single' | 'multi' | 'play'>('single')

  const resetView = () => {
    if (controlsRef.current) {
      // Reset to base view with pie chart at bottom center
      controlsRef.current.target.set(0, -10, 0)  // Look slightly above the pie chart
      controlsRef.current.object.position.set(0, 10, 80)  // Camera positioned higher and back
      controlsRef.current.update()
    }
  }

  return (
    <div className="w-full h-screen relative pl-96" style={{ background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)' }}>

      <Canvas
        camera={{ position: [0, 10, 80], fov: 55 }}
        onCreated={({ gl }) => {
          // Ensure canvas doesn't capture keyboard events
          gl.domElement.tabIndex = -1;
        }}
      >
        <MiningPoolPieChart viewMode={viewMode} />
        {viewMode === 'single' && <BlockchainBlocks viewMode={viewMode} />}
        {viewMode === 'multi' && <BlockchainBlocks viewMode={viewMode} />}
        {viewMode === 'play' && (
          <>
            <BlockchainBlocks viewMode={viewMode} />
            <MultiChainBlocks />
            <MeshNetwork />
          </>
        )}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.1}
          enablePan={false}     // Disable panning for simpler controls
          enableRotate={true}
          enableZoom={true}
          zoomToCursor={false}  // Standard zoom behavior
          target={[0, -10, 0]}  // Start focused on base
          minDistance={20}      // Minimum zoom distance
          maxDistance={2000}    // Much larger max distance to see entire chain
          maxPolarAngle={Math.PI / 2} // Prevent going below ground
          rotateSpeed={0.5}     // Slower rotation for better control
          zoomSpeed={1.0}       // Standard zoom speed
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={0.3} />

      </Canvas>

      {/* FULL LEFT SIDE Mining Pool Information Panel */}
      <div className="absolute top-0 left-0 w-96 h-full bg-black/95 backdrop-blur-md p-4 text-white font-mono text-xs border-r border-blue-500/30 overflow-y-auto">
        <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-sm">
          ⛏️ {viewMode === 'single' ? 'BSV NODE NETWORK' : 'BTC MINING POOLS'}
        </h3>

        {/* Total Hash Rate */}
        <div className="mb-3 p-2 bg-blue-900/30 rounded border border-blue-500/20">
          <div className="text-cyan-400 font-bold text-sm">🌐 TOTAL NETWORK</div>
          <div className="text-yellow-400 text-lg font-bold">~680 EH/s</div>
        </div>

        {/* All Pools - sized proportionally with harmonious colors */}
        <div className="space-y-1">
          {/* AntPool - Largest */}
          <div className="p-3 rounded" style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', borderLeft: '4px solid #FF0000' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg" style={{ color: '#FF0000' }}>AntPool</span>
              <span className="text-white font-bold text-lg">18.5%</span>
            </div>
            <div className="text-gray-300 text-xs">~126 EH/s</div>
          </div>

          {/* Poolin */}
          <div className="p-2.5 rounded" style={{ backgroundColor: 'rgba(255, 51, 0, 0.2)', borderLeft: '4px solid #FF3300' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-base" style={{ color: '#FF3300' }}>Poolin</span>
              <span className="text-white font-bold text-base">15.2%</span>
            </div>
            <div className="text-gray-300 text-xs">~103 EH/s</div>
          </div>

          {/* BTC.com */}
          <div className="p-2.5 rounded" style={{ backgroundColor: 'rgba(255, 102, 0, 0.2)', borderLeft: '4px solid #FF6600' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-base" style={{ color: '#FF6600' }}>BTC.com</span>
              <span className="text-white font-bold text-base">12.8%</span>
            </div>
            <div className="text-gray-300 text-xs">~87 EH/s</div>
          </div>

          {/* F2Pool */}
          <div className="p-2 rounded" style={{ backgroundColor: 'rgba(255, 153, 0, 0.2)', borderLeft: '4px solid #FF9900' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold" style={{ color: '#FF9900' }}>F2Pool</span>
              <span className="text-white font-bold">10.3%</span>
            </div>
            <div className="text-gray-300 text-xs">~70 EH/s</div>
          </div>

          {/* Binance */}
          <div className="p-2 rounded" style={{ backgroundColor: 'rgba(255, 204, 0, 0.2)', borderLeft: '4px solid #FFCC00' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold" style={{ color: '#FFCC00' }}>Binance</span>
              <span className="text-white font-bold">8.9%</span>
            </div>
            <div className="text-gray-300 text-xs">~61 EH/s</div>
          </div>

          {/* Foundry USA */}
          <div className="p-1.5 rounded" style={{ backgroundColor: 'rgba(255, 255, 0, 0.2)', borderLeft: '4px solid #FFFF00' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm" style={{ color: '#FFFF00' }}>Foundry USA</span>
              <span className="text-white font-bold text-sm">6.0%</span>
            </div>
            <div className="text-gray-300 text-xs">~41 EH/s</div>
          </div>

          {/* ViaBTC */}
          <div className="p-1.5 rounded" style={{ backgroundColor: 'rgba(204, 255, 0, 0.2)', borderLeft: '4px solid #CCFF00' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm" style={{ color: '#CCFF00' }}>ViaBTC</span>
              <span className="text-white font-bold text-sm">4.5%</span>
            </div>
            <div className="text-gray-300 text-xs">~31 EH/s</div>
          </div>

          {/* Braiins */}
          <div className="p-1.5 rounded" style={{ backgroundColor: 'rgba(153, 255, 0, 0.2)', borderLeft: '4px solid #99FF00' }}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm" style={{ color: '#99FF00' }}>Braiins</span>
              <span className="text-white font-bold text-sm">3.5%</span>
            </div>
            <div className="text-gray-300 text-xs">~24 EH/s</div>
          </div>

          {/* Luxor */}
          <div className="p-1 rounded" style={{ backgroundColor: 'rgba(102, 255, 0, 0.2)', borderLeft: '3px solid #66FF00' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#66FF00' }}>Luxor</span>
              <span className="text-white text-sm">2.8%</span>
            </div>
          </div>

          {/* BitFury */}
          <div className="p-1 rounded" style={{ backgroundColor: 'rgba(0, 255, 0, 0.2)', borderLeft: '3px solid #00FF00' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#00FF00' }}>BitFury</span>
              <span className="text-white text-sm">2.5%</span>
            </div>
          </div>

          {/* SBI Crypto */}
          <div className="p-1 rounded" style={{ backgroundColor: 'rgba(51, 255, 0, 0.2)', borderLeft: '3px solid #33FF00' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#33FF00' }}>SBI Crypto</span>
              <span className="text-white text-sm">2.2%</span>
            </div>
          </div>

          {/* Kano CKPool */}
          <div className="p-1 rounded" style={{ backgroundColor: 'rgba(0, 255, 51, 0.2)', borderLeft: '3px solid #00FF33' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#00FF33' }}>Kano CKPool</span>
              <span className="text-white text-sm">2.0%</span>
            </div>
          </div>

          {/* SpiderPool */}
          <div className="p-1 rounded" style={{ backgroundColor: 'rgba(0, 255, 102, 0.2)', borderLeft: '2px solid #00FF66' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: '#00FF66' }}>SpiderPool</span>
              <span className="text-white text-xs">1.8%</span>
            </div>
          </div>

          {/* Huobi Pool */}
          <div className="p-1 rounded" style={{ backgroundColor: 'rgba(0, 255, 153, 0.2)', borderLeft: '2px solid #00FF99' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: '#00FF99' }}>Huobi Pool</span>
              <span className="text-white text-xs">1.5%</span>
            </div>
          </div>

          {/* Remaining small pools */}
          <div className="p-0.5 rounded" style={{ backgroundColor: 'rgba(51, 0, 255, 0.1)', borderLeft: '2px solid #3300FF' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: '#3300FF' }}>Others (7 pools)</span>
              <span className="text-white text-xs">6.5%</span>
            </div>
          </div>
        </div>

      </div>

      {/* View Mode Toggle - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md p-2 rounded-lg border border-[#00ff88]/30 flex gap-2">
        <button
          onClick={() => setViewMode('single')}
          className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
            viewMode === 'single' 
              ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
              : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
          }`}
          title="Bitcoin SV - Unbounded blocks"
        >
          ⛓️ BSV
        </button>
        <button
          onClick={() => setViewMode('multi')}
          className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
            viewMode === 'multi' 
              ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
              : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
          }`}
          title="Bitcoin Core - Limited blocks"
        >
          🔗 BTC
        </button>
        <button
          onClick={() => setViewMode('play')}
          className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
            viewMode === 'play' 
              ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
              : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
          }`}
          title="Fantasy view"
        >
          🎮 Fantasy
        </button>
      </div>

      {/* Reset Button - Bottom Right */}
      <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-md p-2 rounded-lg border border-[#00ff88]/30">
        <button
          onClick={resetView}
          className="px-3 py-2 rounded text-[#00ff88] font-mono text-xs border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50 transition-all cursor-pointer"
          title="Reset view"
        >
          🔄 Reset
        </button>
      </div>

      {/* Simple Controls Info - Top Right */}
      <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md px-3 py-2 rounded-lg text-[#00ff88] font-mono text-xs border border-[#00ff88]/30">
        <div className="space-y-1">
          <div>🖱️ Drag: Rotate</div>
          <div>⚙️ Scroll: Zoom</div>
        </div>
      </div>

    </div>
  )

}
