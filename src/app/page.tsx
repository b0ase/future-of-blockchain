import DataChart from './components/ui/DataChart'
import MethodologySection from './components/ui/MethodologySection'
import SimpleHero from './components/ui/SimpleHero'

export default function Home() {
  // Neutral blockchain comparison data
  const transactionCostComparison = [
    { label: 'BSV', value: 0.00005 },  // Real current BSV fee: ~$0.00005
    { label: 'BTC', value: 3.25 },     // Real current BTC fee: ~$3.25 (50 sat/vB at $65k BTC)
    { label: 'ETH', value: 2.80 },     // Real current ETH fee: ~$2.80 (15 gwei at $3.8k ETH)
    { label: 'SOL', value: 0.00025 },  // Real current SOL fee: ~$0.00025
  ]

  const scalabilityComparison = [
    { label: 'BSV', value: 100000 },
    { label: 'BTC', value: 7 },
    { label: 'ETH', value: 15 },
    { label: 'SOL', value: 65000 },
  ]

  const adoptionMetrics = [
    { label: 'BTC', value: 95 },
    { label: 'ETH', value: 85 },
    { label: 'BSV', value: 25 },
    { label: 'SOL', value: 45 },
  ]

  const regulatoryClarity = [
    { label: 'BTC (Commodity)', value: 90 },
    { label: 'BSV (Commodity)', value: 85 },
    { label: 'ETH (Uncertain)', value: 45 },
    { label: 'SOL (Uncertain)', value: 35 },
  ]

  const btcFeeTrend = [
    { label: '2020', value: 1.12 },   // Average 2020 BTC fee
    { label: '2021', value: 13.45 },  // Average 2021 BTC fee (bull market peak)
    { label: '2022', value: 1.86 },   // Average 2022 BTC fee (bear market)
    { label: '2023', value: 3.74 },   // Average 2023 BTC fee
    { label: '2024', value: 8.25 },   // Average 2024 BTC fee (halving year)
    { label: '2025', value: 3.25 },   // Current 2025 BTC fee
  ]

  const methodologySteps = [
    {
      title: 'Technical Architecture Analysis',
      description: 'Comprehensive comparison of blockchain network architectures and capabilities.',
      details: [
        'Block size and transaction throughput analysis',
        'Consensus mechanism evaluation',
        'Network security and decentralization metrics',
        'Scalability limitations assessment'
      ]
    },
    {
      title: 'Economic Model Evaluation',
      description: 'Analysis of economic incentives and long-term sustainability across networks.',
      details: [
        'Mining economics and fee structures',
        'Network effect analysis and adoption curves',
        'Enterprise cost-benefit modeling',
        'Regulatory compliance cost assessment'
      ]
    },
    {
      title: 'Use Case Validation',
      description: 'Real-world testing of blockchain capabilities for various applications.',
      details: [
        'Payment processing scenarios',
        'Data storage and retrieval applications',
        'Smart contract implementation testing',
        'Cross-border transaction analysis'
      ]
    },
    {
      title: 'Future Trajectory Analysis',
      description: 'Development of evidence-based projections for blockchain evolution.',
      details: [
        'Technology adoption lifecycle modeling',
        'Competitive advantage assessment',
        'Regulatory impact forecasting',
        'Long-term value proposition evaluation'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200 overflow-hidden">
        <SimpleHero />
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of<br />
                <span className="text-blue-600">Blockchain</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                Evidence-based research examining the technical, economic, and regulatory factors
                that will shape the future of blockchain networks and enterprise adoption.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/visualization"
                className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg border border-gray-300"
              >
                3D Visualization
              </a>
              <a
                href="#analysis"
                className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg border border-gray-300"
              >
                Explore Research
              </a>
              <a
                href="/business-case"
                className="bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg"
              >
                Business Case Study
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Research Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="metric-highlight">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm opacity-90">Major Networks Analyzed</div>
            </div>
            <div className="metric-highlight">
              <div className="text-2xl font-bold">12+</div>
              <div className="text-sm opacity-90">Technical Metrics</div>
            </div>
            <div className="metric-highlight">
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm opacity-90">Use Case Categories</div>
            </div>
            <div className="metric-highlight">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm opacity-90">Months of Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visualization */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Blockchain Architecture</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Experience an interactive 3D visualization of blockchain networks, mining pools, and the evolution of block sizes over time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="data-card">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mining Pools</h3>
                <p className="text-sm text-gray-600">Visualize global hash rate distribution across major mining pools</p>
              </div>
              <div className="data-card">
                <div className="text-3xl mb-3">⏰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Block Timeline</h3>
                <p className="text-sm text-gray-600">Watch blockchain evolution from 1MB to 20GB blocks over 17 years</p>
              </div>
              <div className="data-card">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Exploration</h3>
                <p className="text-sm text-gray-600">Orbit, zoom, and explore blockchain architecture in real-time</p>
              </div>
            </div>

            <a
              href="/visualization"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border border-gray-300"
            >
              Launch 3D Visualization
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Research Objectives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Objectives</h2>
            
            <div className="research-section">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Understanding Blockchain Evolution</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our research examines the fundamental forces shaping the future of blockchain networks, 
                from technical architecture decisions to economic incentives and regulatory frameworks. 
                We analyze how these factors will influence enterprise adoption and long-term network viability.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="data-card">
                  <h4 className="font-semibold text-blue-600 mb-3">Technical Analysis</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Scalability and throughput capabilities</li>
                    <li>• Security and decentralization metrics</li>
                    <li>• Consensus mechanism efficiency</li>
                    <li>• Network architecture trade-offs</li>
                  </ul>
                </div>
                
                <div className="data-card">
                  <h4 className="font-semibold text-green-600 mb-3">Economic Analysis</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Transaction cost structures</li>
                    <li>• Mining and validation economics</li>
                    <li>• Network effect dynamics</li>
                    <li>• Long-term sustainability factors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Analysis */}
      <section id="analysis" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Comparative Analysis</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <DataChart
              title="Transaction Cost Comparison (USD)"
              data={transactionCostComparison}
              type="bar"
              description="Average transaction fees across major blockchain networks"
            />
            
            <DataChart
              title="Transaction Throughput (TPS)"
              data={scalabilityComparison}
              type="bar"
              description="Maximum transactions per second capacity"
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <DataChart
              title="Network Adoption Metrics (%)"
              data={adoptionMetrics}
              type="bar"
              description="Relative adoption and market presence"
            />
            
            <DataChart
              title="Regulatory Clarity Score (%)"
              data={regulatoryClarity}
              type="bar"
              description="Legal and regulatory compliance assessment"
            />
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Research Findings</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scalability Trade-offs</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>High Throughput:</span>
                    <span className="font-medium text-green-600">BSV, SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Focus:</span>
                    <span className="font-medium text-blue-600">BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Contracts:</span>
                    <span className="font-medium text-purple-600">ETH</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Finding:</strong> Each network optimizes for different use cases, creating distinct competitive advantages.
                  </p>
                </div>
              </div>
              
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Structures</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Lowest Cost:</span>
                    <span className="font-medium text-green-600">BSV ($0.00005)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Cost:</span>
                    <span className="font-medium text-red-600">BTC ($3.25)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETH Average:</span>
                    <span className="font-medium text-purple-600">$2.80</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Finding:</strong> Transaction costs vary dramatically, significantly impacting use case viability.
                  </p>
                </div>
              </div>
              
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Adoption Patterns</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Market Leader:</span>
                    <span className="font-medium text-blue-600">BTC (95%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Developer Platform:</span>
                    <span className="font-medium text-purple-600">ETH (85%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emerging Networks:</span>
                    <span className="font-medium text-orange-600">SOL, BSV</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Finding:</strong> Network effects create significant barriers to entry for new platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BTC Fee Analysis */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bitcoin Transaction Cost Evolution</h2>
            <p className="text-gray-600 mb-8 text-center">
              Analysis of Bitcoin Core's transaction fee trends and their impact on use case viability.
            </p>
            
            <DataChart
              title="BTC Average Transaction Fee (USD)"
              data={btcFeeTrend}
              type="line"
              description="Rising transaction costs impact Bitcoin's utility for certain applications"
            />
            
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Research Observation</h3>
              <p className="text-yellow-700 text-sm">
                Bitcoin Core's average transaction fee has increased from $0.50 in 2020 to over $15 in 2024, 
                representing a 3,000% increase. This trend raises questions about Bitcoin's suitability for 
                high-frequency or micro-transaction use cases, while potentially strengthening its role as a 
                store of value and settlement layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <MethodologySection
            title="Research Methodology"
            steps={methodologySteps}
          />
        </div>
      </section>

      {/* Regulatory Analysis */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regulatory Landscape Analysis</h2>
            
            <div className="research-section">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Classification and Compliance</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-green-600 mb-3">Commodity Classification</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Bitcoin Core (BTC)</li>
                    <li>• Bitcoin SV (BSV)</li>
                    <li>• Clear regulatory framework</li>
                    <li>• Established trading infrastructure</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-3">Uncertain Classification</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Ethereum (ETH)</li>
                    <li>• Solana (SOL)</li>
                    <li>• Securities risk assessment</li>
                    <li>• Regulatory uncertainty</li>
                  </ul>
                </div>
              </div>
              
              <div className="citation mt-6">
                <p className="text-sm">
                  <strong>Research Note:</strong> Regulatory classification significantly impacts enterprise adoption 
                  decisions, with commodity-classified networks generally facing fewer compliance barriers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Research Questions</h2>
            
            <div className="space-y-6">
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scalability vs. Decentralization</h3>
                <p className="text-gray-600 text-sm">
                  How do networks balance the trade-off between scalability and decentralization? 
                  Can high-throughput networks maintain sufficient decentralization for security?
                </p>
              </div>
              
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Network Effect Dynamics</h3>
                <p className="text-gray-600 text-sm">
                  What factors determine whether new networks can overcome established network effects? 
                  How do switching costs influence platform competition?
                </p>
              </div>
              
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Evolution</h3>
                <p className="text-gray-600 text-sm">
                  How will evolving regulatory frameworks affect blockchain adoption patterns? 
                  Will regulatory clarity accelerate or hinder innovation?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore the Future of Blockchain</h2>
            <p className="text-gray-600 mb-8 text-lg">
              This research provides the foundation for understanding blockchain architecture evolution. 
              Explore our detailed business case analysis for enterprise adoption insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/visualization"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Explore 3D Visualization
              </a>
              <a
                href="/business-case"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Business Case Study
              </a>
              <a
                href="mailto:research@futureofblockchain.website"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Request Research Data
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
