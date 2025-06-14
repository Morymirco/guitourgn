"use client"

import { useState } from "react"
import { useTheme } from "../theme/theme-provider"
import { getThemeColors } from "../app-colors"

interface PieChartData {
  category: string
  value: number
  color: string
}

interface BrandedPieChartProps {
  data: PieChartData[]
}

export function BrandedPieChart({ data }: BrandedPieChartProps) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const centerX = 120
  const centerY = 120
  const radius = 80
  const hoverRadius = 85

  let currentAngle = -90 // Start from top

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    const isHovered = hoveredSegment === index
    const currentRadius = isHovered ? hoverRadius : radius

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const x1 = centerX + currentRadius * Math.cos(startAngleRad)
    const y1 = centerY + currentRadius * Math.sin(startAngleRad)
    const x2 = centerX + currentRadius * Math.cos(endAngleRad)
    const y2 = centerY + currentRadius * Math.sin(endAngleRad)

    const largeArcFlag = angle > 180 ? 1 : 0

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ")

    currentAngle += angle

    return {
      pathData,
      color: item.color,
      category: item.category,
      value: item.value,
      percentage: percentage.toFixed(1),
      index,
    }
  })

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <svg width="240" height="240" viewBox="0 0 240 240">
          {segments.map((segment) => (
            <path
              key={segment.index}
              d={segment.pathData}
              fill={segment.color}
              stroke={colors.surface}
              strokeWidth="2"
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                filter: hoveredSegment === segment.index ? "brightness(1.1)" : "none",
              }}
              onMouseEnter={() => setHoveredSegment(segment.index)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          ))}

          {/* Center circle for donut effect */}
          <circle cx={centerX} cy={centerY} r="30" fill={colors.surface} stroke={colors.border} strokeWidth="1" />

          {/* Center text */}
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={colors.textPrimary}
          >
            {total}
          </text>
          <text x={centerX} y={centerY + 10} textAnchor="middle" fontSize="10" fill={colors.textSecondary}>
            Sites
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors"
            style={{
              backgroundColor: hoveredSegment === index ? colors.surface : "transparent",
            }}
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: colors.textPrimary }}>
                {item.category}
              </div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>
                {item.value} ({((item.value / total) * 100).toFixed(1)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
