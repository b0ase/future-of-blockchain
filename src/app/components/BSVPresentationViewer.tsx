'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Cylinder, Cone, Torus } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

// Define the slide content based on the PDF
const slides = [
  {
    id: 1,
    title: "Why build on Bitcoin SV?",
    content: "",
    background: "#0B4394"
  },
  {
    id: 2,
    title: "No blockchains scale",
    content: "The crypto-currency industry is a scam\nThey don't work.\nAs asset prices increase, fees increase",
    icons: ["ETH", "BTC", "SOL"],
    background: "#0B4394"
  },
  {
    id: 3,
    title: "BSV Scales",
    content: "Fee: $0.00000001\nAs Block size increases, Fees Decrease\nMiners compete to bring bigger blocks to market for a lower price",
    background: "#0B4394"
  },
  {
    id: 4,
    title: "Every kind of data",
    content: "Fiat Money Data (CBDCs)\n£ data, $ data, € data\nAudio, Video, Picture, Game Data\nBig data, Traffic Data, Social media Data\nAI algorithms, Search algorithms",
    background: "#0B4394"
  },
  {
    id: 5,
    title: "Smart Contracts",
    content: "Every kind of smart contract can be created on the BSV blockchain",
    code: true,
    background: "#0B4394"
  },
  {
    id: 6,
    title: "CBDCs on BSV",
    content: "Central Bank Digital Currencies are just tokens on BSV",
    background: "#0B4394"
  },
  {
    id: 7,
    title: "Why CBDCs?",
    content: "Can do micropayments\nBrings down costs and replaces credit cards & paywalls\nAre more private and more secure than credit cards and PayPal",
    background: "#0B4394"
  },
  {
    id: 8,
    title: "Direct Payments",
    content: "Producers of content can get paid directly by consumers\nCreates an alternative to ad-based revenue models and subscription models",
    icons: ["Netflix", "Spotify", "YouTube"],
    background: "#0B4394"
  },
  {
    id: 9,
    title: "Alternative to Surveillance Capitalism",
    content: "Digital Cash creates an alternative to the 'surveillance capitalism' ad-driven model of Google, Facebook, and Twitter",
    icons: ["Google", "Facebook", "Twitter"],
    background: "#0B4394"
  },
  {
    id: 10,
    title: "$100 Trillion",
    content: "The token economy for Central Bank Digital Currencies is estimated to be worth $100Trn",
    highlight: true,
    background: "#0B4394"
  },
  {
    id: 11,
    title: "Trillion Micropayments",
    content: "BSV will do a trillion streaming micropayments with tokens per second, for a millionth of a penny each",
    background: "#0B4394"
  },
  {
    id: 12,
    title: "All Industry Verticals",
    content: "Micropayments in smart contracts affect ALL Industry Verticals:\nBanking, Finance, Education, Real-Estate, Manufacturing, Media, Transport, Telecoms, Healthcare, Insurance, E-Commerce, Entertainment, Government",
    background: "#0B4394"
  },
  {
    id: 13,
    title: "Market Size",
    content: "How big is the market for smart contracts and computation with micropayments and tokens?",
    background: "#0B4394"
  },
  {
    id: 14,
    title: "Markets",
    content: "The bond market is worth $120 Trillion\nThe stock market is worth $50 Trillion",
    highlight: true,
    background: "#0B4394"
  },
  {
    id: 15,
    title: "Parallel Distributed Computation",
    content: "BSV creates a competitive market for computation\nUser offers search contract → Contractors compete → Results returned",
    background: "#0B4394"
  },
  {
    id: 16,
    title: "Peer Sharing Music",
    content: "Artist creates music → User 1 buys and hosts → User 2 buys from Artist and pays host\nArtists are paid in CBDCs\nConversion is automatic on Bitcoin",
    background: "#0B4394"
  },
  {
    id: 17,
    title: "Music Smart Contracts",
    content: "User streams music → Creators get paid automatically in their own currencies instantly\nThis is Peer to Peer Electronic Cash\nThis is 'Bitcoin'",
    background: "#0B4394"
  },
  {
    id: 18,
    title: "Products on BSV",
    content: "Currencies: digital notes and coins issued by banks and governments\nSecurities: stocks, shares, bonds, derivatives, & other equities",
    background: "#0B4394"
  },
  {
    id: 19,
    title: "NFTs (1)",
    content: "Identity Documents: Passports, Driving Licences, University Certificates, Title Deeds, Medical Records\nDigital Collectibles, Artwork, Photos\nAll work product: articles, spreadsheets, documents, data sets",
    background: "#0B4394"
  },
  {
    id: 20,
    title: "NFTs (2)",
    content: "Tickets: Bus, train, cinema, concert, plane tickets\nAccess tokens for Apps and DApps, passwords\nContracts: Insurance, Mortgages, Wills, Futures, Options, Receipts, invoices",
    background: "#0B4394"
  },
  {
    id: 21,
    title: "Games/Gaming",
    content: "Interactive, competitive, multiplayer eSports tournaments\nGaming and gambling apps",
    background: "#0B4394"
  },
  {
    id: 22,
    title: "Wallets, Apps & DApps",
    content: "Decentralised Exchanges\nSocial Media Apps\nMarketplaces\nVideo Sharing",
    background: "#0B4394"
  },
  {
    id: 23,
    title: "More Apps",
    content: "OAuth, Marketing Apps\nDerivative Exchanges\nPhoto Sharing with Micropayments",
    background: "#0B4394"
  },
  {
    id: 24,
    title: "Developer Support",
    content: "BSV supports developers & smart contracts\nGoLang ✓ Javascript ✓ Python ✓ C++ ✓ Smart Contracts ✓",
    background: "#0B4394"
  },
  {
    id: 25,
    title: "Efficiency",
    content: "BSV is an 'efficiency engine'\nBTC is an 'energy hog'",
    highlight: true,
    background: "#0B4394"
  },
  {
    id: 26,
    title: "The BSV Virtuous Cycle",
    content: "Micropayments increase efficiency across ALL industry verticals\nBSV monetizes industry data\nThe larger the blocks, the smaller the fees\nThe smaller the fees, the more efficient the industry\nThe larger BSV grows, the more efficient it becomes\nEconomies of scale bring costs down globally",
    background: "#0B4394"
  },
  {
    id: 27,
    title: "Hash Migration",
    content: "Hash migrates over to BSV\nBTC → BSV\n2021 → 2022 (?)",
    background: "#0B4394"
  },
  {
    id: 28,
    title: "Mining Profitability",
    content: "Mining returns profit to miners\nThe bigger the market, the more data on chain and the more profitable the miners",
    background: "#0B4394"
  },
  {
    id: 29,
    title: "BSV Efficiency",
    content: "BSV is more efficient than BTC, so it returns more profit to miners in satoshis (the smallest unit of Bitcoin)",
    background: "#0B4394"
  },
  {
    id: 30,
    title: "Mining Switch",
    content: "When BSV becomes more profitable in USD, miners switch over to BSV, and stop mining BTC",
    background: "#0B4394"
  },
  {
    id: 31,
    title: "Large Nodes",
    content: "4 or 5 large nodes will dominate\nBitcoin SV now → Bitcoin SV In future",
    background: "#0B4394"
  },
  {
    id: 32,
    title: "Eco-Friendly",
    content: "BitcoinSV is Eco-Friendly\n✓ Stops BTC mining\n✓ Replaces wasteful banking servers and internet infrastructure\n✓ Makes everything more efficient",
    background: "#0B4394"
  },
  {
    id: 33,
    title: "Commodity Not Security",
    content: "BitcoinSV IS A COMMODITY, NOT A SECURITY\nBSV ✓\nEthereum, XRP, Solana etc. are all SECURITIES ✗",
    highlight: true,
    background: "#0B4394"
  }
]

function Slide3D({ slide, isActive }: { slide: any; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    // Animate elements based on slide
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.015
    }
  })
  
  // Full 3D scene for each slide
  const renderScene = () => {
    if (slide.id === 1) {
      // Title slide - "Why build on Bitcoin SV?"
      return (
        <group>
          <Text
            position={[0, 5, 0]}
            fontSize={3}
            color="#00FF88"
            anchorX="center"
            anchorY="middle"
            maxWidth={30}
          >
            Why build on
            <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.3} />
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={5}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            maxWidth={30}
          >
            Bitcoin SV?
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.2} />
          </Text>
          {/* Floating BSV logo */}
          <Sphere args={[3, 32, 32]} position={[0, -8, 0]}>
            <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
          </Sphere>
        </group>
      )
    }
    
    if (slide.id === 2) {
      // "No blockchains scale" - broken chains
      return (
        <group>
          <Text position={[0, 10, 0]} fontSize={2.5} color="#FF4444" anchorX="center">
            No blockchains scale
            <meshStandardMaterial color="#FF4444" emissive="#FF0000" emissiveIntensity={0.2} />
          </Text>
          {['ETH', 'BTC', 'SOL'].map((chain, i) => (
            <group key={chain} position={[(i - 1) * 12, 0, 0]}>
              {/* Broken chain visualization */}
              <Box args={[6, 6, 1]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#333333" emissive="#FF0000" emissiveIntensity={0.1} />
              </Box>
              <Text position={[0, 0, 1]} fontSize={2} color="#FFFFFF" anchorX="center">
                {chain}
              </Text>
              {/* Red X overlay */}
              <Text position={[0, 0, 2]} fontSize={4} color="#FF0000" anchorX="center">
                ✗
                <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
              </Text>
              {/* Fee indicator */}
              <Text position={[0, -4, 0]} fontSize={0.8} color="#FF6666" anchorX="center">
                High Fees ↑
              </Text>
            </group>
          ))}
          <Text position={[0, -10, 0]} fontSize={1.2} color="#FFFFFF" anchorX="center" maxWidth={35}>
            As asset prices increase, fees increase
          </Text>
        </group>
      )
    }
    
    if (slide.id === 3) {
      // BSV Scales - growing blocks
      return (
        <group>
          <Text position={[0, 12, 0]} fontSize={3} color="#00FF88" anchorX="center">
            BSV Scales
            <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.4} />
          </Text>
          {/* Growing blocks visualization */}
          <group position={[0, 2, 0]}>
            {[1, 1.5, 2, 2.5, 3].map((scale, i) => (
              <Box key={i} args={[3 * scale, 3 * scale, 3]} position={[(i - 2) * 7, 0, 0]}>
                <meshStandardMaterial color="#00FF88" emissive="#00FF44" emissiveIntensity={0.3} metalness={0.5} roughness={0.3} />
              </Box>
            ))}
          </group>
          <Text position={[0, -6, 0]} fontSize={1.5} color="#FFFFFF" anchorX="center">
            Fee: $0.00000001
          </Text>
          <Text position={[0, -9, 0]} fontSize={1} color="#00FF88" anchorX="center" maxWidth={35}>
            As Block size increases, Fees Decrease
          </Text>
          <Text position={[0, -11, 0]} fontSize={0.9} color="#FFFFFF" anchorX="center" maxWidth={35}>
            Miners compete to bring bigger blocks to market for a lower price
          </Text>
        </group>
      )
    }
    
    if (slide.id === 10) {
      // $100 Trillion market
      return (
        <group>
          <Text position={[0, 10, 0]} fontSize={6} color="#FFD700" anchorX="center">
            $100 Trillion
            <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.4} metalness={0.8} />
          </Text>
          <Torus args={[8, 3, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
          </Torus>
          <Text position={[0, 0, 0]} fontSize={3} color="#FFFFFF" anchorX="center">
            $
          </Text>
          <Text position={[0, -10, 0]} fontSize={1.5} color="#FFFFFF" anchorX="center" maxWidth={40}>
            The token economy for Central Bank Digital Currencies
          </Text>
        </group>
      )
    }
    
    if (slide.id === 25) {
      // Efficiency engine
      return (
        <group>
          <Text position={[0, 12, 0]} fontSize={2.5} color="#00FF88" anchorX="center">
            BSV is an 'efficiency engine'
            <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.3} />
          </Text>
          {/* Animated gears */}
          <group position={[0, 2, 0]}>
            <Cylinder args={[5, 5, 2, 24]} position={[-8, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#00FF88" emissive="#00FF44" emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[3.5, 3.5, 2, 18]} position={[5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#00FF88" emissive="#00FF44" emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[2.5, 2.5, 2, 12]} position={[0, -6, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#00FF88" emissive="#00FF44" emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
            </Cylinder>
          </group>
          <Text position={[0, -10, 0]} fontSize={2} color="#FF4444" anchorX="center">
            BTC is an 'energy hog'
            <meshStandardMaterial color="#FF4444" emissive="#FF0000" emissiveIntensity={0.2} />
          </Text>
        </group>
      )
    }
    
    if (slide.id === 32) {
      // Eco-Friendly visualization
      return (
        <group>
          <Text position={[0, 12, 0]} fontSize={3} color="#00FF88" anchorX="center">
            BitcoinSV is Eco-Friendly
            <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.3} />
          </Text>
          <Sphere args={[6, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#00AA44" emissive="#00FF44" emissiveIntensity={0.2} />
          </Sphere>
          <Text position={[0, 0, 6.5]} fontSize={3} color="#FFFFFF" anchorX="center">
            🌱
          </Text>
          <group position={[0, -10, 0]}>
            <Text position={[0, 0, 0]} fontSize={1.2} color="#00FF88" anchorX="center">✓ Stops BTC mining</Text>
            <Text position={[0, -2, 0]} fontSize={1.2} color="#00FF88" anchorX="center">✓ Replaces wasteful banking servers</Text>
            <Text position={[0, -4, 0]} fontSize={1.2} color="#00FF88" anchorX="center">✓ Makes everything more efficient</Text>
          </group>
        </group>
      )
    }
    
    if (slide.id === 33) {
      // Commodity not security
      return (
        <group>
          <Text position={[0, 10, 0]} fontSize={2.5} color="#FFD700" anchorX="center">
            COMMODITY, NOT A SECURITY
            <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.3} />
          </Text>
          <group position={[0, 2, 0]}>
            <Box args={[8, 8, 2]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#00FF88" emissive="#00FF44" emissiveIntensity={0.3} />
            </Box>
            <Text position={[0, 0, 1.5]} fontSize={2} color="#FFFFFF" anchorX="center">BSV ✓</Text>
          </group>
          <group position={[0, -8, 0]}>
            <Text position={[0, 0, 0]} fontSize={1.5} color="#FF4444" anchorX="center">
              Ethereum, XRP, Solana are SECURITIES ✗
              <meshStandardMaterial color="#FF4444" emissive="#FF0000" emissiveIntensity={0.2} />
            </Text>
          </group>
        </group>
      )
    }
    
    // Default scene for other slides
    return (
      <group>
        <Text position={[0, 5, 0]} fontSize={2} color="#00FF88" anchorX="center" maxWidth={35}>
          {slide.title}
          <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.3} />
        </Text>
        {slide.content && (
          <Text position={[0, -2, 0]} fontSize={1} color="#FFFFFF" anchorX="center" textAlign="center" maxWidth={40} lineHeight={1.5}>
            {slide.content}
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.1} />
          </Text>
        )}
      </group>
    )
  }
  
  return (
    <group ref={meshRef}>
      {/* Pure 3D scene without slide background */}
      {renderScene()}
    </group>
  )
}

export default function BSVPresentationViewer() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const controlsRef = useRef<OrbitControlsType>(null!)
  
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.object.position.set(0, 0, 50)
      controlsRef.current.update()
    }
  }
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
  
  return (
    <div className="w-full h-screen bg-[#0B4394] relative">
      {/* Top Page Navigation Tabs */}
      <div className="absolute top-0 left-0 right-0 bg-black z-50">
        <div className="flex">
          <a href="/visualization" className="px-6 py-3 text-white hover:bg-[#00ff88]/20 transition-colors border-r border-gray-700">
            Visualization
          </a>
          <a href="/build" className="px-6 py-3 bg-[#00ff88]/30 text-[#00ff88] border-r border-gray-700">
            BSV Presentation
          </a>
          <a href="/" className="px-6 py-3 text-white hover:bg-[#00ff88]/20 transition-colors border-r border-gray-700">
            Research
          </a>
          <a href="/business-case" className="px-6 py-3 text-white hover:bg-[#00ff88]/20 transition-colors">
            Business Case
          </a>
        </div>
      </div>
      
      {/* Slide Navigation */}
      <div className="absolute top-14 left-4 right-4 bg-black/80 backdrop-blur p-2 rounded-lg border border-[#00ff88]/30 overflow-x-auto z-40">
        <div className="flex gap-1 min-w-max">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`px-3 py-2 rounded text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                currentSlide === index
                  ? 'bg-[#00ff88]/30 text-[#00ff88] border border-[#00ff88]/50'
                  : 'text-gray-400 border border-gray-600/30 hover:bg-gray-700/30 hover:text-white'
              }`}
              title={slide.title}
            >
              {slide.id}. {slide.title.length > 15 ? slide.title.substring(0, 15) + '...' : slide.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
        <color attach="background" args={['#0B4394']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 15, 10]} intensity={0.8} color="#00FF88" />
        
        <Slide3D slide={slides[currentSlide]} isActive={true} />
        
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI * 0.85}
          minDistance={30}
          maxDistance={100}
        />
        
        <fog attach="fog" args={['#0B4394', 100, 200]} />
      </Canvas>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur p-2 rounded-lg border border-[#00ff88]/30 flex gap-2">
        <button
          onClick={prevSlide}
          className="px-4 py-2 rounded text-[#00ff88] font-mono text-sm border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50 transition-all cursor-pointer"
        >
          ← Previous
        </button>
        
        <div className="px-4 py-2 text-[#00ff88] font-mono text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
        
        <button
          onClick={nextSlide}
          className="px-4 py-2 rounded text-[#00ff88] font-mono text-sm border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50 transition-all cursor-pointer"
        >
          Next →
        </button>
      </div>
      
      {/* View Controls */}
      <div className="absolute bottom-20 right-4 bg-black/80 backdrop-blur p-2 rounded-lg border border-[#00ff88]/30 space-y-2">
        <button
          onClick={resetView}
          className="w-full px-3 py-2 rounded text-[#00ff88] font-mono text-xs border border-[#00ff88]/30 hover:bg-[#00ff88]/20 hover:border-[#00ff88]/50 transition-all cursor-pointer"
        >
          🏠 Reset View
        </button>
      </div>
      
      {/* Keyboard Instructions */}
      <div className="absolute bottom-4 left-4 text-gray-400 text-xs font-mono">
        Use ← → arrow keys or click tabs to navigate
      </div>
    </div>
  )
}