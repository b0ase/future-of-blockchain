
'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { getBSVMiningPools, fallbackBSVPools, type MiningPool } from '@/lib/bsv-mining-api'



function MiningPoolPieChart({ viewMode }: { viewMode: string }) {
  const chartRef = useRef<THREE.Group>(null!)
  const mainGroupRef = useRef<THREE.Group>(null!)
  const [bsvPools, setBsvPools] = useState<MiningPool[]>(fallbackBSVPools)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch real-time BSV mining pool data
  useEffect(() => {
    if (viewMode === 'single' || viewMode === 'single+') {
      setIsLoading(true)
      getBSVMiningPools()
        .then(pools => {
          setBsvPools(pools)
          console.log('BSV mining pools updated:', pools)
        })
        .catch(error => {
          console.error('Failed to fetch BSV pools:', error)
          setBsvPools(fallbackBSVPools)
        })
        .finally(() => setIsLoading(false))
    }
  }, [viewMode])

  // Use dynamic BSV data or static BTC data
  const bsvNodes = bsvPools

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

  // Use BSV nodes for 'single' and 'single+' views, BTC pools for others
  const miningPools = (viewMode === 'single' || viewMode === 'single+') ? bsvNodes : btcPools

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

            // Dynamic scaling based on current pool data
            const maxPercentage = Math.max(...miningPools.map(p => p.percentage));
            const minPercentage = Math.min(...miningPools.map(p => p.percentage));
            
            let ballSize;
            if (pool.percentage === maxPercentage) {
              // Largest pool: maximum size
              ballSize = maxSize;
            } else if (pool.percentage === minPercentage) {
              // Smallest pool: minimum size
              ballSize = minSize;
            } else {
              // Linear interpolation between max and min
              const ratio = (pool.percentage - minPercentage) / (maxPercentage - minPercentage);
              ballSize = minSize + ratio * (maxSize - minSize);
              ballSize = Math.max(minSize, Math.min(maxSize, ballSize)); // Clamp
            }

            // Position above corresponding pie slice - MATCH PIE CHART EXACTLY
            const startAngle = miningPools.slice(0, index).reduce((sum, p) => sum + p.percentage, 0) / 100 * Math.PI * 2;
            const poolAngle = (pool.percentage / 100) * Math.PI * 2;
            const centerAngle = startAngle + poolAngle / 2; // Center of this pool's slice
            
            // Position in a ring above the pie chart - smaller pools closer to blockchain
            const radius = 8 + (12 * (1 - index / miningPools.length)); // Smallest pools closest (radius 8), largest furthest (radius 20)
            // Largest pools (lower index) get highest position
            // Normalize height based on pool count to ensure consistent starting position
            const maxHeight = 32;
            const minHeight = 10;
            const heightRange = maxHeight - minHeight;
            const height = minHeight + (heightRange * (1 - index / Math.max(miningPools.length - 1, 1)))
            
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
  const [txPath, setTxPath] = useState<THREE.Vector3[]>([])
  
  // Define the grid parameters
  const gridSize = 25
  const spacing = 5
  const extent = (gridSize - 1) * spacing / 2
  const chainHeight = 25 * (0.25 + 0.1) + 0.3  // Height of chain (25 blocks * (size + gap) + base)
  
  // Create a grid-based path with 90-degree turns only
  // Transaction routes through adjacent nodes (one grid square at a time)
  useEffect(() => {
    const path: THREE.Vector3[] = []
    
    // Grid spacing is 5 units, so each hop is exactly 5 units
    // Start at Alice's chain (grid position: x=-30, z=0)
    const startX = -30
    const startZ = 0
    const endX = 30
    const endZ = 0
    
    // Build path with right-angle turns only
    let currentX = startX
    let currentZ = startZ
    
    // Add starting position (Alice)
    path.push(new THREE.Vector3(currentX, chainHeight, currentZ))
    
    // Move right one square at a time
    // First, we need to go around other chains, so go forward (negative Z)
    // Move forward 3 squares
    for (let i = 0; i < 3; i++) {
      currentZ -= spacing
      path.push(new THREE.Vector3(currentX, chainHeight, currentZ))
    }
    
    // Now turn right and move toward Bob (positive X direction)
    // Move right 12 squares (from -30 to 30 = 60 units / 5 = 12 squares)
    for (let i = 0; i < 12; i++) {
      currentX += spacing
      path.push(new THREE.Vector3(currentX, chainHeight, currentZ))
    }
    
    // Turn right again and move back toward center Z
    // Move back 3 squares to reach Bob's Z position
    for (let i = 0; i < 3; i++) {
      currentZ += spacing
      path.push(new THREE.Vector3(currentX, chainHeight, currentZ))
    }
    
    setTxPath(path)
  }, [chainHeight, spacing])
  
  // Animate transaction pulse along the complex path
  useFrame((state) => {
    if (txRef.current && txPath.length > 0) {
      // Calculate position along the entire path based on time
      const t = (Math.sin(state.clock.elapsedTime * 1.5) + 1) / 2 // Oscillates between 0 and 1
      
      // Determine which segment of the path we're on
      const numSegments = txPath.length - 1
      const segmentLength = 1 / numSegments
      const currentSegmentIndex = Math.floor(t / segmentLength)
      const segmentT = (t % segmentLength) / segmentLength
      
      if (currentSegmentIndex < numSegments) {
        const from = txPath[currentSegmentIndex]
        const to = txPath[Math.min(currentSegmentIndex + 1, txPath.length - 1)]
        
        // Interpolate position between current segment points
        txRef.current.position.x = from.x + (to.x - from.x) * segmentT
        txRef.current.position.y = from.y + (to.y - from.y) * segmentT
        txRef.current.position.z = from.z + (to.z - from.z) * segmentT
      }
      
      // Pulse the size
      const scale = 0.4 + Math.sin(state.clock.elapsedTime * 8) * 0.15
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
            // All nodes are black (no special white nodes needed)
            nodes.push(
              <mesh key={`node-${i}-${j}`} position={[x, 0, z]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
            );
          }
        }
        
        return [...lines, ...nodes];
      })()}
      
      {/* Grid-based transaction path with 90-degree turns */}
      {txPath.length > 1 && (
        <>
          {/* Draw straight lines between each grid hop */}
          {txPath.map((point, index) => {
            if (index < txPath.length - 1) {
              const nextPoint = txPath[index + 1]
              return (
                <Line
                  key={`path-${index}`}
                  points={[[point.x, point.y, point.z], [nextPoint.x, nextPoint.y, nextPoint.z]]}
                  color="#00ff88"
                  lineWidth={3}
                  dashed={false}
                />
              )
            }
            return null
          })}
          
          {/* Show grid nodes at each hop point (except start and end) */}
          {txPath.slice(1, -1).map((point, index) => (
            <group key={`hop-${index}`}>
              {/* Node indicator */}
              <mesh position={[point.x, point.y, point.z]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshBasicMaterial color="#00ffaa" />
              </mesh>
              {/* Vertical line connecting to chain below */}
              <Line
                points={[[point.x, point.y, point.z], [point.x, 0, point.z]]}
                color="#00ff8844"
                lineWidth={1}
              />
            </group>
          ))}
          
          {/* Corner indicators for the 90-degree turns */}
          <mesh position={[txPath[3].x, txPath[3].y, txPath[3].z]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial color="#ffff00" opacity={0.5} transparent />
          </mesh>
          <mesh position={[txPath[15].x, txPath[15].y, txPath[15].z]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial color="#ffff00" opacity={0.5} transparent />
          </mesh>
        </>
      )}
      
      {/* Alice label at start point */}
      {txPath.length > 0 && (
        <>
          <Text
            position={[txPath[0].x - 3, txPath[0].y + 2, txPath[0].z]}
            fontSize={1.8}
            color="#ff88ff"
            anchorX="right"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            Alice
          </Text>
          {/* Alice's node marker - larger */}
          <mesh position={[txPath[0].x, txPath[0].y, txPath[0].z]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color="#ff88ff" />
          </mesh>
        </>
      )}
      
      {/* Bob label at end point */}
      {txPath.length > 0 && (
        <>
          <Text
            position={[txPath[txPath.length - 1].x + 3, txPath[txPath.length - 1].y + 2, txPath[txPath.length - 1].z]}
            fontSize={1.8}
            color="#88ffff"
            anchorX="left"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            Bob
          </Text>
          {/* Bob's node marker - larger */}
          <mesh position={[txPath[txPath.length - 1].x, txPath[txPath.length - 1].y, txPath[txPath.length - 1].z]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color="#88ffff" />
          </mesh>
        </>
      )}
      
      {/* Animated transaction pulse */}
      <mesh ref={txRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={1.0} />
      </mesh>
      
      {/* Transaction label that follows the pulse */}
      <Text
        position={[0, chainHeight + 3, -20]}
        fontSize={0.6}
        color="#ffff00"
        anchorX="center"
        anchorY="middle"
      >
        P2P Transaction
      </Text>
    </group>
  );
}

function MultiChainBlocks() {
  return (
    <group position={[0, -24.5, 0]}> {/* Same position as mesh network */}
      {/* Chains emanating from mesh network nodes */}
      {(() => {
        const chains = [];
        const gridSize = 25; // Same as mesh network
        const spacing = 5; // Same spacing as mesh network
        const extent = (gridSize - 1) * spacing / 2;
        const blockSize = 0.25; // Smaller blocks since we have many more chains
        const blocksPerChain = 25; // Medium height chains
        const gap = 0.1; // Smaller gap
        
        // Pie chart outer radius is 34.5 units (from the cylinderGeometry)
        // With mesh spacing of 5 units, we want chains from nodes within this radius
        const pieRadius = 35;
        
        let chainIndex = 0;
        
        // Create chains from EVERY node that's above the pie chart
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            // Calculate exact node position on mesh (matching MeshNetwork component)
            const nodeX = -extent + i * spacing;
            const nodeZ = -extent + j * spacing;
            
            // Check if this node is above the pie chart (within pie radius)
            const distanceFromCenter = Math.sqrt(nodeX * nodeX + nodeZ * nodeZ);
            if (distanceFromCenter > pieRadius) {
              continue; // Skip nodes outside the pie chart area
            }
            
            const baseY = 0.3; // Start slightly above mesh node sphere
            
            // Create only 1 chain from each node
            const chain = [];
            
            // Add very slight random variation for organic look
            const angleVariation = (Math.random() - 0.5) * 0.05;
            
            for (let blockIndex = 0; blockIndex < blocksPerChain; blockIndex++) {
              // Chains go straight up with minimal drift
              const spread = blockIndex * 0.01 * angleVariation; // Very minimal spread
              const x = nodeX + spread;
              const z = nodeZ + spread * 0.5;
              const y = baseY + (blockIndex * (blockSize + gap)); // Direct vertical growth
              
              // Color based on height - rainbow gradient
              const colorProgress = blockIndex / (blocksPerChain - 1);
              
              chain.push(
                <group key={`block-${blockIndex}`}>
                  <mesh position={[x, y, z]}>
                    <boxGeometry args={[blockSize, blockSize, blockSize]} />
                    <meshBasicMaterial
                      color={`hsl(${120 + (colorProgress * 240)}, 100%, 60%)`}
                    />
                  </mesh>
                  {/* Subtle glow effect for first few blocks only */}
                  {blockIndex < 5 && (
                    <mesh position={[x, y, z]}>
                      <boxGeometry args={[blockSize * 1.1, blockSize * 1.1, blockSize * 1.1]} />
                      <meshBasicMaterial
                        color={`hsl(${120 + (colorProgress * 240)}, 100%, 70%)`}
                        transparent
                        opacity={0.15}
                      />
                    </mesh>
                  )}
                </group>
              );
            }
            
            chains.push(
              <group key={`chain-${chainIndex++}`}>
                {chain}
              </group>
            );
          }
        }
        
        return chains;
      })()}
    </group>
  );
}

function AnimatedCentralChain() {
  const blocksRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (blocksRef.current) {
      // Animate blocks moving down slowly through Earth's center
      blocksRef.current.position.y -= 0.1  // Much slower movement
      
      // Reset when blocks go too far down
      if (blocksRef.current.position.y < -200) {
        blocksRef.current.position.y = 0  // Reset to starting position
      }
    }
  })
  
  return (
    <group ref={blocksRef}>
      {/* Use the EXACT SAME chain as BSV tab - just animated */}
      {(() => {
        const blocks = [];
        const totalBlocks = 1000; // 10x more blocks
        const maxSize = 10000; // BSV: 10GB theoretical max
        
        // Only render first 50 blocks for visibility
        const visibleBlocks = 50;
        
        for (let i = 0; i < visibleBlocks; i++) {
          // Progress from 0 to 1 across visible blocks
          const progress = i / (visibleBlocks - 1);
          
          // BSV: exponential growth - start at 1MB, grow to massive sizes
          const size = Math.round(1 + Math.pow(progress * 10, 2.5) * 1000); // 1MB to 10GB+
          
          // Visual scaling - smaller blocks at start, massive at end
          const visualScale = 1 + progress * 20; // Scale from 1 to 21
          const clampedScale = Math.min(30.0, visualScale);

          // Calculate position with increasing gaps for larger blocks
          const baseGap = 1.5; // Base separation
          const gap = baseGap + (progress * 3); // Gaps increase with size
          let y = -25; // Start AT pie chart center
          
          for (let j = 0; j < i; j++) {
            const prevProgress = j / (visibleBlocks - 1);
            const prevVisualScale = 1 + prevProgress * 20;
            const prevClampedScale = Math.min(30.0, prevVisualScale);
            const prevGap = baseGap + (prevProgress * 3);
            y += prevClampedScale + prevGap;
          }
          
          // Color gradient - FORCE blue to red progression
          const hue = 240 - (progress * 240); // Blue (240) at start to Red (0) at end
          
          // Progressive transparency - more transparent as blocks get bigger
          const opacity = Math.max(0.1, 1 - (progress * 0.8)); // From 1.0 to 0.2
          
          blocks.push(
            <group key={`block-${i}`} position={[0, y, 0]}>
              <mesh>
                <boxGeometry args={[clampedScale, clampedScale, clampedScale]} />
                <meshStandardMaterial
                  color={`hsl(${hue}, 90%, 50%)`}
                  emissive={`hsl(${hue}, 100%, 40%)`}
                  emissiveIntensity={0.3 + progress * 0.5}
                  metalness={0.4}
                  roughness={0.1}
                  transparent={true}
                  opacity={opacity}
                />
              </mesh>
              {/* Size labels for every 10th block */}
              {(i % 10 === 0 || i === visibleBlocks - 1) && (
                <Text
                  position={[clampedScale + 2, 0, 0]}
                  fontSize={0.5 + progress * 0.5}
                  color={`hsl(${hue}, 90%, 70%)`}
                  anchorX="left"
                  transparent
                  opacity={Math.max(0.5, opacity + 0.3)}
                >
                  {size >= 1000 ? `${(size/1000).toFixed(1)}GB` : `${size}MB`}
                </Text>
              )}
            </group>
          );
        }
        
        return blocks
      })()}
    </group>
  )
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
  const [viewMode, setViewMode] = React.useState<'single' | 'multi' | 'play' | 'single+' | 'multi+' | 'play+'>('single')
  const [bsvMiningPools, setBsvMiningPools] = useState<MiningPool[]>(fallbackBSVPools)
  const [isLoadingPools, setIsLoadingPools] = useState(false)

  // Fetch BSV mining pool data when component mounts or viewMode changes
  useEffect(() => {
    if (viewMode === 'single' || viewMode === 'single+') {
      setIsLoadingPools(true)
      getBSVMiningPools()
        .then(pools => {
          setBsvMiningPools(pools)
          console.log('BSV mining pools data loaded:', pools)
        })
        .catch(error => {
          console.error('Error loading BSV pools:', error)
          setBsvMiningPools(fallbackBSVPools)
        })
        .finally(() => setIsLoadingPools(false))
    }
  }, [viewMode])

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
        camera={{ position: [0, 10, 70], fov: 50 }}
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
            <MultiChainBlocks />
            <MeshNetwork />
          </>
        )}
        {viewMode === 'single+' && <AnimatedCentralChain />}
        {viewMode === 'multi+' && <BlockchainBlocks viewMode={'multi'} />}
        {viewMode === 'play+' && (
          <>
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
      <div className="absolute top-0 left-0 w-96 h-full bg-black/95 backdrop-blur-md p-3 text-white font-mono text-xs border-r border-blue-500/30 overflow-y-auto">
        <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-sm">
          ⛏️ {viewMode === 'single' || viewMode === 'single+' ? 'BSV NODE NETWORK' : viewMode === 'play' || viewMode === 'play+' ? 'FANTASY NETWORK' : 'BTC MINING POOLS'}
        </h3>

        {/* Total Hash Rate */}
        <div className="mb-3 p-2 bg-blue-900/30 rounded border border-blue-500/20">
          <div className="text-cyan-400 font-bold text-sm">🌐 TOTAL NETWORK</div>
          <div className="text-yellow-400 text-lg font-bold">{viewMode === 'single' || viewMode === 'single+' ? '~0.6 EH/s' : viewMode === 'play' || viewMode === 'play+' ? 'DISTRIBUTED' : '~680 EH/s'}</div>
        </div>

        {/* All Pools - sized proportionally with harmonious colors */}
        <div className="space-y-1">
          {viewMode === 'single' || viewMode === 'single+' ? (
            <>
              {/* Dynamic BSV Pools */}
              {isLoadingPools && (
                <div className="text-center py-4 text-yellow-400">
                  Loading real-time data...
                </div>
              )}
              {bsvMiningPools.map((pool, index) => {
                // Determine sizing based on percentage
                const isLarge = pool.percentage > 30;
                const isMedium = pool.percentage > 10;
                const isSmall = pool.percentage < 3;
                
                const padding = isLarge ? 'p-3' : isMedium ? 'p-2.5' : isSmall ? 'p-1' : 'p-2';
                const fontSize = isLarge ? 'text-lg' : isMedium ? 'text-base' : isSmall ? 'text-xs' : 'text-sm';
                const borderWidth = isLarge ? '4px' : isMedium ? '4px' : isSmall ? '2px' : '3px';
                
                // Calculate estimated hash rate (0.6 EH/s total for BSV)
                const hashrate = pool.percentage * 6; // 600 PH/s total
                const hashrateStr = hashrate > 100 ? `~${Math.round(hashrate)} PH/s` : hashrate > 10 ? `~${Math.round(hashrate)} PH/s` : '';
                
                return (
                  <div 
                    key={pool.name}
                    className={`${padding} rounded`} 
                    style={{ 
                      backgroundColor: `${pool.color}33`, // 20% opacity
                      borderLeft: `${borderWidth} solid ${pool.color}` 
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${fontSize}`} style={{ color: pool.color }}>
                        {pool.name}
                      </span>
                      <span className={`text-white font-bold ${fontSize}`}>
                        {pool.percentage.toFixed(1)}%
                      </span>
                    </div>
                    {pool.percentage > 2 && (
                      <div className="text-gray-300 text-xs">{hashrateStr}</div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

      </div>

      {/* View Mode Toggle - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md p-2 rounded-lg border border-[#00ff88]/30 flex gap-1" style={{ maxWidth: '600px' }}>
        {/* BSV Group */}
        <div className="flex gap-1 pr-2 border-r border-[#00ff88]/20">
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
              viewMode === 'single' 
                ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
                : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
            }`}
            title="Bitcoin SV - Unbounded blocks"
          >
            BSV
          </button>
          <button
            onClick={() => setViewMode('single+')}
            className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
              viewMode === 'single+' 
                ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
                : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
            }`}
            title="BSV+ - Animated through Earth"
          >
            BSV+
          </button>
        </div>
        
        {/* BTC Group */}
        <div className="flex gap-1 px-2 border-r border-[#00ff88]/20">
          <button
            onClick={() => setViewMode('multi')}
            className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
              viewMode === 'multi' 
                ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
                : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
            }`}
            title="Bitcoin Core - Limited blocks"
          >
            BTC
          </button>
          <button
            onClick={() => setViewMode('multi+')}
            className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
              viewMode === 'multi+' 
                ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
                : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
            }`}
            title="BTC+ - Enhanced view"
          >
            BTC+
          </button>
        </div>
        
        {/* Fantasy Group */}
        <div className="flex gap-1 pl-2">
          <button
            onClick={() => setViewMode('play')}
            className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
              viewMode === 'play' 
                ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
                : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
            }`}
            title="Fantasy view"
          >
            Fantasy
          </button>
          <button
            onClick={() => setViewMode('play+')}
            className={`px-3 py-2 rounded text-[#00ff88] font-mono text-xs border transition-all cursor-pointer ${
              viewMode === 'play+' 
                ? 'bg-[#00ff88]/30 border-[#00ff88]/50' 
                : 'border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50'
            }`}
            title="Fantasy+ - Enhanced fantasy"
          >
            Fantasy+
          </button>
        </div>
      </div>

      {/* Reset Button - Moved higher */}
      <div className="absolute bottom-20 right-4 bg-black/90 backdrop-blur-md p-2 rounded-lg border border-[#00ff88]/30">
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
