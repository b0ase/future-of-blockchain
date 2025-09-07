import DataChart from '../components/ui/DataChart'

export default function BusinessCase() {
  // Business-focused data
  const enterpriseCostComparison = [
    { label: 'BSV', value: 0.0001 },
    { label: 'BTC', value: 15.50 },
    { label: 'ETH', value: 45.00 },
    { label: 'SOL', value: 12.00 },
  ]

  const scalabilityForBusiness = [
    { label: 'BSV', value: 100000 },
    { label: 'BTC', value: 7 },
    { label: 'ETH', value: 15 },
    { label: 'SOL', value: 65000 },
  ]

  const enterpriseReadiness = [
    { label: 'BSV', value: 95 },
    { label: 'SOL', value: 75 },
    { label: 'ETH', value: 65 },
    { label: 'BTC', value: 25 },
  ]

  const regulatoryCompliance = [
    { label: 'BSV (Commodity)', value: 100 },
    { label: 'BTC (Commodity)', value: 90 },
    { label: 'ETH (Uncertain)', value: 45 },
    { label: 'SOL (Uncertain)', value: 35 },
  ]

  const btcFeeTrend = [
    { label: '2020', value: 0.50 },
    { label: '2021', value: 2.50 },
    { label: '2022', value: 5.00 },
    { label: '2023', value: 10.00 },
    { label: '2024', value: 15.50 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                The Business Case for<br />
                <span className="text-orange-600">Bitcoin SV</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Evidence-based analysis demonstrating why Bitcoin SV represents the optimal choice 
                for enterprises building the future of blockchain solutions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#analysis" 
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                View Business Analysis
              </a>
              <a 
                href="/" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Research
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Executive Summary</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="metric-highlight bg-orange-600">
              <div className="text-2xl font-bold">155,000x</div>
              <div className="text-sm opacity-90">Lower Transaction Costs</div>
            </div>
            <div className="metric-highlight bg-orange-600">
              <div className="text-2xl font-bold">14,285x</div>
              <div className="text-sm opacity-90">Higher Throughput</div>
            </div>
            <div className="metric-highlight bg-orange-600">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Regulatory Compliance</div>
            </div>
            <div className="metric-highlight bg-orange-600">
              <div className="text-2xl font-bold">$0.0001</div>
              <div className="text-sm opacity-90">Average Transaction Fee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Thesis */}
      <section id="analysis" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Business Thesis</h2>
            
            <div className="research-section">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">The Enterprise Blockchain Imperative</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Based on our comprehensive research analysis, Bitcoin SV (BSV) emerges as the superior 
                blockchain platform for enterprise applications. While Bitcoin Core (BTC) excels as a 
                store of value, its technical limitations make it unsuitable for high-volume business operations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="data-card border-red-200 bg-red-50">
                  <h4 className="font-semibold text-red-600 mb-3">Bitcoin Core (BTC) Business Limitations</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 1MB block size limit (7 TPS)</li>
                    <li>• $15+ average transaction fees</li>
                    <li>• 10+ minute confirmation times</li>
                    <li>• No enterprise data applications</li>
                    <li>• Limited scripting capabilities</li>
                  </ul>
                </div>
                
                <div className="data-card border-green-200 bg-green-50">
                  <h4 className="font-semibold text-green-600 mb-3">Bitcoin SV (BSV) Business Advantages</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Unlimited block size (100,000+ TPS)</li>
                    <li>• $0.0001 average transaction fees</li>
                    <li>• Instant transaction confirmations</li>
                    <li>• Enterprise data storage capabilities</li>
                    <li>• Full Bitcoin Script implementation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Business Impact Analysis</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <DataChart
              title="Enterprise Transaction Costs (USD)"
              data={enterpriseCostComparison}
              type="bar"
              description="Cost comparison for high-volume business transactions"
            />
            
            <DataChart
              title="Business Scalability (TPS)"
              data={scalabilityForBusiness}
              type="bar"
              description="Transaction throughput for enterprise applications"
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <DataChart
              title="Enterprise Readiness Score (%)"
              data={enterpriseReadiness}
              type="bar"
              description="Assessment of enterprise deployment readiness"
            />
            
            <DataChart
              title="Regulatory Compliance Score (%)"
              data={regulatoryCompliance}
              type="bar"
              description="Legal and regulatory compliance for enterprise use"
            />
          </div>
        </div>
      </section>

      {/* Use Case Analysis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Enterprise Use Case Analysis</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Payments</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>BSV Cost:</span>
                    <span className="font-medium text-green-600">$0.0001</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC Cost:</span>
                    <span className="font-medium text-red-600">$15.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BSV Speed:</span>
                    <span className="font-medium text-green-600">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC Speed:</span>
                    <span className="font-medium text-red-600">10+ minutes</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Business Impact:</strong> BSV enables micro-payments and high-volume transactions impossible on BTC.
                  </p>
                </div>
              </div>
              
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Storage</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>BSV Capacity:</span>
                    <span className="font-medium text-green-600">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC Capacity:</span>
                    <span className="font-medium text-red-600">1MB blocks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BSV Cost:</span>
                    <span className="font-medium text-green-600">$0.0001/KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC Cost:</span>
                    <span className="font-medium text-red-600">$15+/KB</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Business Impact:</strong> BSV enables enterprise data applications impossible on BTC.
                  </p>
                </div>
              </div>
              
              <div className="data-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Contracts</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>BSV Script:</span>
                    <span className="font-medium text-green-600">Full Bitcoin Script</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC Script:</span>
                    <span className="font-medium text-red-600">Limited by SegWit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BSV Execution:</span>
                    <span className="font-medium text-green-600">On-chain</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC Execution:</span>
                    <span className="font-medium text-red-600">Lightning Network</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Business Impact:</strong> BSV provides true on-chain smart contracts as Satoshi intended.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Analysis */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bitcoin Core Cost Escalation</h2>
            <p className="text-gray-600 mb-8 text-center">
              Bitcoin Core's rising transaction costs make it increasingly unsuitable for enterprise applications.
            </p>
            
            <DataChart
              title="BTC Average Transaction Fee (USD)"
              data={btcFeeTrend}
              type="line"
              description="Rising transaction costs impact Bitcoin's business utility"
            />
            
            <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Business Impact Analysis</h3>
              <p className="text-red-700 text-sm">
                Bitcoin Core's average transaction fee has increased from $0.50 in 2020 to over $15 in 2024, 
                representing a 3,000% increase. This makes BTC completely unsuitable for enterprise applications 
                requiring high transaction volumes or micro-payments, while BSV maintains consistent sub-cent fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Recommendation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Investment Recommendation</h2>
            <p className="text-xl text-gray-600 mb-8">
              Based on our comprehensive analysis, <strong>Bitcoin SV (BSV)</strong> represents the superior 
              blockchain platform for enterprise applications and long-term business investment.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Superiority</h3>
                <p className="text-sm text-gray-600">Unlimited scalability and micro-transaction capabilities</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Economic Efficiency</h3>
                <p className="text-sm text-gray-600">155,000x lower transaction costs than BTC</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regulatory Clarity</h3>
                <p className="text-sm text-gray-600">Clear commodity classification for enterprise adoption</p>
              </div>
            </div>
            
            <div className="bg-orange-600 text-white p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Business Conclusion</h3>
              <p className="text-lg mb-6">
                For enterprises seeking to build the future of blockchain solutions, 
                <strong> Bitcoin SV offers the only viable path forward</strong>.
              </p>
              <a 
                href="#contact" 
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Request Enterprise Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Enterprise Consultation</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Ready to explore Bitcoin SV for your enterprise blockchain needs? 
              Our research team can provide detailed analysis and implementation guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:enterprise@futureofblockchain.website" 
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Contact Enterprise Team
              </a>
              <a 
                href="/" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Full Research
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
