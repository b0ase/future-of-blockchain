import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Research Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Future of Blockchain Research Initiative</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              Evidence-based research examining the technical, economic, and regulatory factors 
              that will shape the future of blockchain networks and enterprise adoption patterns. 
              Our analysis provides objective insights for understanding blockchain evolution.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:research@futureofblockchain.website"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Research Areas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Main Research
                </a>
              </li>
              <li>
                <a href="/business-case" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Business Case Study
                </a>
              </li>
              <li>
                <a href="/#analysis" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Comparative Analysis
                </a>
              </li>
              <li>
                <a href="/#methodology" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Research Methodology
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">
                <a href="mailto:research@futureofblockchain.website" className="hover:text-blue-600 transition-colors">
                  research@futureofblockchain.website
                </a>
              </li>
              <li className="text-gray-600">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Request Research Data
                </a>
              </li>
              <li className="text-gray-600">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Submit Research
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              <p>&copy; 2024 Future of Blockchain Research Initiative. All rights reserved.</p>
              <p className="mt-1">Objective research for understanding blockchain evolution.</p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Research Methodology
              </a>
            </div>
          </div>
        </div>

        {/* Research Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="text-sm font-semibold text-gray-900 mb-2">Research Disclaimer</h5>
          <p className="text-xs text-gray-600 leading-relaxed">
            This research represents objective analysis of blockchain architectures and should not be construed as financial advice. 
            The views expressed are based on evidence-based research and do not constitute investment recommendations. 
            All investment decisions should be made in consultation with qualified financial advisors.
          </p>
        </div>
      </div>
    </footer>
  )
}


