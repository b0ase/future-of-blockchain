interface MethodologyStep {
  title: string
  description: string
  details: string[]
  icon?: string
}

interface MethodologySectionProps {
  title: string
  steps: MethodologyStep[]
  className?: string
}

export default function MethodologySection({ title, steps, className = '' }: MethodologySectionProps) {
  return (
    <section className={`research-section ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{title}</h2>
      
      <div className="methodology-grid">
        {steps.map((step, index) => (
          <div key={index} className="methodology-step">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
            
            <ul className="space-y-2">
              {step.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
