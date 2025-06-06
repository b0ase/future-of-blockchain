export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Blockchain Convergence Research
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <a href="#thesis" className="hover:text-blue-400 transition-colors">Thesis</a>
            <a href="#analysis" className="hover:text-blue-400 transition-colors">Analysis</a>
            <a href="#scenarios" className="hover:text-blue-400 transition-colors">Scenarios</a>
            <a href="#questions" className="hover:text-blue-400 transition-colors">Open Questions</a>
            <a href="#data" className="hover:text-blue-400 transition-colors">Data</a>
            <a href="#discussion" className="hover:text-blue-400 transition-colors">Discussion</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          The Future of<br />Blockchain Architecture
        </h1>
        <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
          An open research initiative examining the fundamental economic and technical forces driving blockchain network evolution. 
          We explore the hypothesis that efficiency pressures may lead to architectural convergence, but invite critical analysis of all perspectives.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#analysis" className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
            Explore the Research
          </a>
          <a href="#discussion" className="border border-gray-400 px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
            Join the Discussion
          </a>
        </div>
      </section>

      {/* Thesis Section */}
      <section id="thesis" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">The Core Thesis</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">PoS = Corporate Shareholders</h3>
              <p className="text-gray-300 mb-6">
                Proof-of-Stake networks like Ethereum and Solana function as corporations where validators 
                are essentially shareholders collecting dividends from transaction fees. This creates 
                centralized decision-making and redundant computation.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Validators = Shareholders</li>
                <li>• Governance = Corporate Board</li>
                <li>• Staking Rewards = Dividends</li>
                <li>• Securities Classification</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-blue-800/30 to-purple-800/30 p-6 rounded-lg border border-blue-500/20">
              <h4 className="text-xl font-semibold mb-4 text-green-400">PoW = Competing Businesses</h4>
              <p className="text-gray-300 mb-4">
                Proof-of-Work systems create competitive business environments where miners must 
                constantly improve efficiency and reduce costs to stay profitable. This drives innovation 
                and scalability.
              </p>
              <div className="text-sm text-gray-300">
                <p>• Miners = Competing Companies</p>
                <p>• Hash Rate = Market Competition</p>
                <p>• Block Rewards = Business Revenue</p>
                <p>• Commodity Classification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Analysis */}
      <section id="analysis" className="bg-black/30 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Comprehensive Analysis</h2>
          <div className="max-w-6xl mx-auto">
            
            {/* Economic Modeling */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-blue-400">Economic Models: Incentive Structures</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-b from-blue-800/20 to-blue-900/20 p-6 rounded-lg border border-blue-500/20">
                  <h4 className="text-lg font-semibold mb-4 text-blue-300">Proof-of-Stake: Dividend Model</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong>Revenue Source:</strong> Transaction fee redistribution</li>
                    <li>• <strong>Stakeholder Role:</strong> Passive income generation</li>
                    <li>• <strong>Network Security:</strong> Economic penalties (slashing)</li>
                    <li>• <strong>Governance:</strong> Token-weighted voting systems</li>
                    <li>• <strong>Capital Requirements:</strong> Minimum staking thresholds</li>
                    <li>• <strong>Risk Profile:</strong> Principal at risk, predictable returns</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-b from-green-800/20 to-green-900/20 p-6 rounded-lg border border-green-500/20">
                  <h4 className="text-lg font-semibold mb-4 text-green-300">Proof-of-Work: Competition Model</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong>Revenue Source:</strong> Block rewards + transaction fees</li>
                    <li>• <strong>Participant Role:</strong> Active business operations</li>
                    <li>• <strong>Network Security:</strong> Computational cost (energy)</li>
                    <li>• <strong>Governance:</strong> Hash rate as economic voting</li>
                    <li>• <strong>Capital Requirements:</strong> Hardware + operational costs</li>
                    <li>• <strong>Risk Profile:</strong> Variable costs, uncertain returns</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-lg font-semibold mb-3 text-yellow-400">Critical Question: Efficiency vs. Decentralization</h4>
                <p className="text-gray-300 mb-4">
                  If redundant validation in PoS systems becomes economically inefficient, does this inevitably lead to consolidation? 
                  Or could new mechanisms emerge that maintain decentralization while reducing computational waste?
                </p>
                <div className="text-sm text-gray-400">
                  <p><strong>Consider:</strong> Layer 2 solutions, sharding, state channels, and other scaling approaches that might preserve the PoS model while addressing efficiency concerns.</p>
                </div>
              </div>
            </div>

            {/* Technical Architecture Deep Dive */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-purple-400">Technical Architecture Analysis</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-b from-red-800/20 to-red-900/20 p-6 rounded-lg border border-red-500/20">
                  <h4 className="font-semibold mb-3 text-red-300">State vs UTXO Models</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Ethereum's account-based state requires global consensus on every state transition. 
                    Bitcoin's UTXO model enables parallel validation of independent transactions.
                  </p>
                  <div className="text-xs text-gray-400">
                    <p><strong>Question:</strong> Could hybrid models combine the benefits of both approaches?</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-b from-purple-800/20 to-purple-900/20 p-6 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold mb-3 text-purple-300">Consensus Mechanisms</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    PoS optimizes for finality and energy efficiency. PoW optimizes for censorship resistance and proven security. 
                    Neither approach has definitively "won" the technical debate.
                  </p>
                  <div className="text-xs text-gray-400">
                    <p><strong>Question:</strong> Are there consensus mechanisms we haven't discovered yet?</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-b from-blue-800/20 to-blue-900/20 p-6 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-3 text-blue-300">Scaling Approaches</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Block size increases (BSV), sharding (Ethereum 2.0), and parallel processing (Solana) represent 
                    fundamentally different scaling philosophies.
                  </p>
                  <div className="text-xs text-gray-400">
                    <p><strong>Question:</strong> Which scaling approach will prove most sustainable long-term?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory Landscape */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-cyan-400">Regulatory Considerations</h3>
              
              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-8 rounded-lg border border-cyan-500/20 mb-6">
                <h4 className="text-lg font-semibold mb-4 text-cyan-300">The Securities vs. Commodities Distinction</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-yellow-400 mb-2">Howey Test Analysis for PoS</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>✓ Investment of money (staking)</li>
                      <li>✓ Common enterprise (network validation)</li>
                      <li>✓ Expectation of profit (staking rewards)</li>
                      <li>✓ Efforts of others (other validators)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-400 mb-2">Commodity Characteristics of PoW</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• No central issuer or promoter</li>
                      <li>• Miners provide active services</li>
                      <li>• Competitive market dynamics</li>
                      <li>• Utility-based value proposition</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-900/20 rounded border border-yellow-500/30">
                  <p className="text-gray-300 text-sm">
                    <strong>Open Question:</strong> If PoS tokens are classified as securities in major jurisdictions, 
                    how would this affect their adoption and utility? Could this regulatory pressure accelerate 
                    migration to PoW-based systems, or would it drive innovation in compliant PoS mechanisms?
                  </p>
                </div>
              </div>
            </div>

            {/* Network Effects Analysis */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-orange-400">Network Effects and Adoption Dynamics</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-b from-orange-800/20 to-red-800/20 p-6 rounded-lg border border-orange-500/20">
                  <h4 className="font-semibold mb-4 text-orange-300">The Bootstrap Problem</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    New blockchain networks face a chicken-and-egg problem: developers need users, users need applications, 
                    and applications need a secure, stable network. How do networks overcome this initial hurdle?
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Ethereum:</strong> First-mover advantage in smart contracts</li>
                    <li>• <strong>Solana:</strong> Performance marketing and venture backing</li>
                    <li>• <strong>BSV:</strong> Enterprise adoption and data applications</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-b from-green-800/20 to-teal-800/20 p-6 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-4 text-green-300">Platform Stickiness</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Once developers build on a platform, migration costs include rewriting code, retraining teams, 
                    and rebuilding user bases. This creates significant switching costs that may outweigh efficiency gains.
                  </p>
                  <div className="text-xs text-gray-400 mt-3">
                    <p><strong>Counter-argument:</strong> If cost differences become extreme enough, migration incentives could overcome platform stickiness.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Vision */}
      <section id="architecture" className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">The Convergence Thesis</h2>
        <div className="max-w-6xl mx-auto">
          
          {/* Current State */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Current State: Inefficient Redundancy</h3>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-red-400">Ethereum & Solana Today</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Thousands of validators doing identical work</li>
                    <li>• Serial transaction processing</li>
                    <li>• High costs due to redundant computation</li>
                    <li>• PoS = Corporate shareholder model</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-400">BitcoinSV Today</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Miners compete for transaction fees</li>
                    <li>• Unlimited block size scaling</li>
                    <li>• Commodity infrastructure model</li>
                    <li>• Legal compliance built-in</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-green-400">Future Vision: Efficient Convergence</h3>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-center mb-8">
                <h4 className="text-xl font-semibold mb-4">BSV as Commodity Infrastructure</h4>
                <div className="text-gray-300">Like TCP/IP for the internet, BSV becomes the base layer</div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-800/20 p-4 rounded border border-blue-500/20">
                  <h5 className="font-semibold mb-2 text-blue-400">Ethereum Processing Service</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Single optimized node on BSV</li>
                    <li>• Solidity → Bitcoin Script transpiler</li>
                    <li>• EVM state management</li>
                    <li>• Competing on efficiency, not consensus</li>
                  </ul>
                </div>
                <div className="bg-purple-800/20 p-4 rounded border border-purple-500/20">
                  <h5 className="font-semibold mb-2 text-purple-400">Solana Processing Service</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Competing optimized node on BSV</li>
                    <li>• Rust/Anchor → Bitcoin Script transpiler</li>
                    <li>• Account model emulation</li>
                    <li>• Better performance = more market share</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* The AOL Analogy */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-center">The AOL Analogy</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">BSV</h4>
                <p className="text-gray-300">= Internet Infrastructure (TCP/IP)</p>
                <p className="text-sm text-gray-400 mt-2">Commodity base layer</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Ethereum</h4>
                <p className="text-gray-300">= AOL</p>
                <p className="text-sm text-gray-400 mt-2">User-friendly but expensive</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Solana</h4>
                <p className="text-gray-300">= CompuServe</p>
                <p className="text-sm text-gray-400 mt-2">Faster but still proprietary</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implications */}
      <section id="implications" className="bg-black/30 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Real-World Implications</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">💼</div>
                <h3 className="text-xl font-semibold mb-4">Regulatory Clarity</h3>
                <p className="text-gray-300">PoS tokens may be classified as securities, while PoW represents commodity infrastructure</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">⚡</div>
                <h3 className="text-xl font-semibold mb-4">Economic Efficiency</h3>
                <p className="text-gray-300">Redundant validation will give way to optimized processing competition</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">🌐</div>
                <h3 className="text-xl font-semibold mb-4">Infrastructure Evolution</h3>
                <p className="text-gray-300">Applications will migrate to the most cost-effective and scalable base layer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theoretical Scenarios */}
      <section id="scenarios" className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">Theoretical Scenarios & "What If" Analysis</h2>
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Scenario 1 */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-lg border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">Scenario 1: The Great Efficiency Migration</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-400 mb-3">The Hypothesis</h4>
                <p className="text-gray-300 text-sm mb-4">
                  As transaction volumes increase exponentially, the cost of redundant validation in PoS systems becomes prohibitive. 
                  Economic pressure forces a migration to single-node processing on highly scalable base layers.
                </p>
                <h4 className="font-semibold text-green-400 mb-3">Timeline: 2027-2032</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Ethereum gas fees exceed $500 for complex transactions</li>
                  <li>• Enterprise applications migrate to cost-effective alternatives</li>
                  <li>• Transpilation tools enable seamless application porting</li>
                  <li>• Network effects begin favoring efficiency over familiarity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-3">Counter-Arguments</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Layer 2 Solutions:</strong> Rollups and state channels could solve cost issues without migration</li>
                  <li>• <strong>Developer Lock-in:</strong> Switching costs may exceed efficiency gains for many years</li>
                  <li>• <strong>Regulatory Comfort:</strong> Established PoS networks may benefit from regulatory clarity</li>
                  <li>• <strong>Innovation Pace:</strong> PoS systems continue rapid technological improvement</li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-900/20 rounded">
                                     <p className="text-yellow-300 text-xs"><strong>Key Question:</strong> At what cost differential does migration become inevitable regardless of switching costs?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 p-8 rounded-lg border border-green-500/20">
            <h3 className="text-2xl font-semibold mb-6 text-green-300">Scenario 2: Multi-Chain Equilibrium</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-400 mb-3">The Alternative Path</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Rather than convergence, blockchain networks develop specialized niches. Each chain optimizes for different use cases, 
                  with seamless interoperability bridging the ecosystem.
                </p>
                <h4 className="font-semibold text-blue-400 mb-3">Specialization Examples</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Ethereum:</strong> Complex DeFi and governance applications</li>
                  <li>• <strong>Solana:</strong> High-frequency trading and gaming</li>
                  <li>• <strong>BSV:</strong> Data storage and micropayments</li>
                  <li>• <strong>Others:</strong> Privacy, IoT, supply chain, identity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-400 mb-3">Supporting Evidence</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Internet Analogy:</strong> HTTP, SMTP, FTP coexist with different purposes</li>
                  <li>• <strong>Financial Markets:</strong> Multiple exchanges serve different needs</li>
                  <li>• <strong>Bridge Technology:</strong> Cross-chain protocols are rapidly improving</li>
                  <li>• <strong>User Preference:</strong> Different communities prefer different trade-offs</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/20 rounded">
                  <p className="text-blue-300 text-xs"><strong>Key Question:</strong> Can interoperability technology eliminate the need for a single dominant chain?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 p-8 rounded-lg border border-red-500/20">
            <h3 className="text-2xl font-semibold mb-6 text-red-300">Scenario 3: Regulatory Fragmentation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-400 mb-3">The Disruption</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Major jurisdictions implement conflicting regulations. Some ban PoS tokens as securities, others embrace them. 
                  PoW networks face environmental restrictions. The ecosystem fractures along regulatory lines.
                </p>
                <h4 className="font-semibold text-yellow-400 mb-3">Potential Outcomes</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Geographic blockchain preferences emerge</li>
                  <li>• Compliant vs. non-compliant network splits</li>
                  <li>• Innovation moves to crypto-friendly jurisdictions</li>
                  <li>• Traditional finance creates parallel systems</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-3">Wild Card Factors</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>CBDC Adoption:</strong> Central bank digital currencies could dominate</li>
                  <li>• <strong>Energy Crisis:</strong> PoW mining could face existential threats</li>
                  <li>• <strong>Quantum Computing:</strong> Current cryptography becomes obsolete</li>
                  <li>• <strong>Global Coordination:</strong> International blockchain standards emerge</li>
                </ul>
                <div className="mt-4 p-3 bg-purple-900/20 rounded">
                  <p className="text-purple-300 text-xs"><strong>Key Question:</strong> How would blockchain evolution change if governments actively compete to dominate the space?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Questions */}
      <section id="questions" className="bg-black/30 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Open Research Questions</h2>
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-8 rounded-lg border border-cyan-500/20 mb-8">
              <h3 className="text-xl font-semibold mb-6 text-cyan-300">Fundamental Questions We're Investigating</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Economic Sustainability</h4>
                  <p className="text-gray-300 text-sm">
                    Is there a mathematical limit to how much redundant computation a network can sustain as it scales? 
                    Can we model the breaking point where efficiency pressures overcome network effects?
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-400 mb-2">Technological Innovation</h4>
                  <p className="text-gray-300 text-sm">
                    Could breakthrough consensus mechanisms emerge that combine the security of PoW with the efficiency of PoS? 
                    What about quantum-resistant algorithms or AI-driven consensus?
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Social Coordination</h4>
                  <p className="text-gray-300 text-sm">
                    How do communities and developer ecosystems influence technical evolution? 
                    Can social factors override economic efficiency in blockchain adoption?
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-400 mb-2">Regulatory Evolution</h4>
                  <p className="text-gray-300 text-sm">
                    Will regulatory frameworks evolve to accommodate blockchain innovation, or will innovation adapt to regulatory constraints? 
                    How might international coordination affect blockchain development?
                  </p>
                </div>
                
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-pink-400 mb-2">Market Dynamics</h4>
                  <p className="text-gray-300 text-sm">
                    What role do venture capital, institutional adoption, and retail sentiment play in determining which networks succeed? 
                    Can economic fundamentals overcome market sentiment in the long term?
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">We Don't Have All the Answers</h3>
              <p className="text-gray-300 mb-6">
                This research is ongoing, and we invite perspectives that challenge our assumptions. 
                The future of blockchain architecture will likely be determined by factors we haven't fully considered yet.
              </p>
              <a href="#discussion" className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                Contribute Your Perspective
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Metrics */}
      <section id="data" className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center text-green-400">Data & Metrics Analysis</h2>
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-lg border border-green-500/20 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-green-300">Key Metrics We're Tracking</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-800/20 p-4 rounded">
                <h4 className="font-semibold text-blue-400 mb-2">Transaction Costs</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Average transaction fees over time</li>
                  <li>• Cost per computation unit</li>
                  <li>• Fee volatility and predictability</li>
                  <li>• Enterprise adoption thresholds</li>
                </ul>
              </div>
              
              <div className="bg-purple-800/20 p-4 rounded">
                <h4 className="font-semibold text-purple-400 mb-2">Network Efficiency</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Transactions per second achieved</li>
                  <li>• Energy consumption per transaction</li>
                  <li>• Validation redundancy ratios</li>
                  <li>• Infrastructure cost scaling</li>
                </ul>
              </div>
              
              <div className="bg-orange-800/20 p-4 rounded">
                <h4 className="font-semibold text-orange-400 mb-2">Developer Activity</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Active developers per network</li>
                  <li>• New project launches</li>
                  <li>• Cross-chain migration patterns</li>
                  <li>• Tool and infrastructure development</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 p-6 rounded border border-yellow-500/30">
              <h4 className="font-semibold text-yellow-400 mb-3">Data Limitations & Biases</h4>
              <p className="text-gray-300 text-sm mb-3">
                Current blockchain metrics may not capture the full picture. Transaction costs can be subsidized by foundations, 
                developer activity may not correlate with actual usage, and network effects are difficult to quantify.
              </p>
              <p className="text-gray-400 text-xs">
                <strong>Note:</strong> We're working to develop better methodologies for measuring blockchain network health and sustainability. 
                If you have expertise in network analysis or economic modeling, we'd love your input.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion & Community */}
      <section id="discussion" className="bg-black/30 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-400">Join the Discussion</h2>
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-8 rounded-lg border border-orange-500/20 mb-8">
              <h3 className="text-xl font-semibold mb-6 text-orange-300">We Need Your Expertise</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Researchers & Academics</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Economic modeling of network effects</li>
                    <li>• Game theory analysis of consensus mechanisms</li>
                    <li>• Historical precedents for technology convergence</li>
                    <li>• Regulatory framework analysis</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Practitioners & Developers</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Real-world scaling challenges and solutions</li>
                    <li>• Cross-chain development experiences</li>
                    <li>• Enterprise blockchain adoption patterns</li>
                    <li>• Technical implementation insights</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 mb-6">
                <h4 className="font-semibold text-blue-400 mb-2">Research Questions We're Prioritizing</h4>
                <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                  <li>Can we quantify the economic breaking point for redundant validation systems?</li>
                  <li>How do switching costs compare to efficiency gains in blockchain migration decisions?</li>
                  <li>What role does regulatory uncertainty play in blockchain adoption patterns?</li>
                  <li>Are there sustainable models for multi-chain interoperability?</li>
                  <li>How might breakthrough technologies (quantum, AI) affect the convergence thesis?</li>
                </ol>
              </div>
              
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  This research is stronger with diverse perspectives. Whether you agree or disagree with the convergence thesis, 
                  your insights help us build a more complete understanding of blockchain evolution.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com" className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    Contribute on GitHub
                  </a>
                  <a href="#" className="border border-gray-400 px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                    Join Research Forum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p className="mb-4">Open research exploring blockchain architectural evolution • Updated regularly as new data emerges</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" className="hover:text-white transition-colors">GitHub Repository</a>
            <a href="#" className="hover:text-white transition-colors">Research Papers</a>
            <a href="#" className="hover:text-white transition-colors">Discussion Forum</a>
            <a href="#" className="hover:text-white transition-colors">Data Dashboard</a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This research is provided for educational purposes. Views expressed do not constitute financial advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
