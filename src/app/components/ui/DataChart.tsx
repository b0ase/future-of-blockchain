'use client'

import { useState } from 'react'

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface ChartProps {
  title: string
  data: DataPoint[]
  type: 'bar' | 'line' | 'pie' | 'metric'
  description?: string
  className?: string
}

export default function DataChart({ title, data, type, description, className = '' }: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxValue = Math.max(...data.map(d => d.value))
  const colors = ['#3182ce', '#38a169', '#d69e2e', '#e53e3e', '#805ad5', '#dd6b20']

  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((point, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-24 text-sm text-gray-600 truncate">{point.label}</div>
          <div className="flex-1">
            <div className="relative">
              <div 
                className="h-8 bg-blue-100 rounded transition-all duration-300"
                style={{ 
                  width: `${(point.value / maxValue) * 100}%`,
                  backgroundColor: hoveredIndex === index ? colors[index % colors.length] : '#dbeafe'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <div className="absolute inset-0 flex items-center justify-end pr-2">
                <span className="text-sm font-medium text-gray-700">{point.value}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLineChart = () => (
    <div className="relative h-48">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3182ce" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3182ce" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y * 2}
            x2="400"
            y2={y * 2}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        
        {/* Data line */}
        <path
          d={data.map((point, index) => {
            const x = (index / (data.length - 1)) * 400
            const y = 200 - (point.value / maxValue) * 200
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')}
          stroke="#3182ce"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Area fill */}
        <path
          d={`${data.map((point, index) => {
            const x = (index / (data.length - 1)) * 400
            const y = 200 - (point.value / maxValue) * 200
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')} L 400 200 L 0 200 Z`}
          fill="url(#lineGradient)"
        />
        
        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 400
          const y = 200 - (point.value / maxValue) * 200
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#3182ce"
              className="cursor-pointer hover:r-6 transition-all"
            />
          )
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {data.map((point, index) => (
          <span key={index} className="text-center">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  )

  const renderPieChart = () => {
    const total = data.reduce((sum, point) => sum + point.value, 0)
    let currentAngle = 0
    
    return (
      <div className="flex items-center space-x-8">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {data.map((point, index) => {
              const percentage = (point.value / total) * 100
              const angle = (percentage / 100) * 360
              const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180)
              
              const largeArcFlag = angle > 180 ? 1 : 0
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ')
              
              currentAngle += angle
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              )
            })}
          </svg>
        </div>
        
        <div className="flex-1 space-y-2">
          {data.map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600">{point.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {((point.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMetric = () => (
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-600 mb-2">
        {data[0]?.value.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600">{data[0]?.label}</div>
    </div>
  )

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart()
      case 'line':
        return renderLineChart()
      case 'pie':
        return renderPieChart()
      case 'metric':
        return renderMetric()
      default:
        return null
    }
  }

  return (
    <div className={`chart-container ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      
      <div className="mt-6">
        {renderChart()}
      </div>
    </div>
  )
}
