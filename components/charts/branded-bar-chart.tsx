"use client"

import { useState } from "react"
import { useTheme } from "../theme/theme-provider"
import { getThemeColors } from "../app-colors"

interface BarChartData {
  day: string
  visits: number
}

interface BrandedBarChartProps {
  data: BarChartData[]
}

export function BrandedBarChart({ data }: BrandedBarChartProps) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const maxValue = Math.max(...data.map((d) => d.visits))
  const chartHeight = 200
  const chartWidth = 300
  const padding = 40
  const barWidth = ((chartWidth - 2 * padding) / data.length) * 0.7

  return (
    <div className="w-full">
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + ratio * (chartHeight - 2 * padding)}
            x2={chartWidth - padding}
            y2={padding + ratio * (chartHeight - 2 * padding)}
            stroke={colors.border}
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <text
            key={i}
            x={padding - 10}
            y={padding + ratio * (chartHeight - 2 * padding) + 4}
            textAnchor="end"
            fontSize="10"
            fill={colors.textSecondary}
          >
            {Math.round(maxValue * (1 - ratio))}
          </text>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.visits / maxValue) * (chartHeight - 2 * padding)
          const x =
            padding +
            (i * (chartWidth - 2 * padding)) / data.length +
            ((chartWidth - 2 * padding) / data.length - barWidth) / 2
          const y = chartHeight - padding - barHeight
          const isHovered = hoveredBar === i

          return (
            <g key={i}>
              {/* Bar gradient definition */}
              <defs>
                <linearGradient id={`barGradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={colors.primary} stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={isHovered ? colors.primary : `url(#barGradient-${i})`}
                rx="4"
                ry="4"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  filter: isHovered ? "brightness(1.1)" : "none",
                }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              />

              {/* Value label on hover */}
              {isHovered && (
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={colors.textPrimary}
                >
                  {d.visits}
                </text>
              )}

              {/* Day label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="12"
                fill={colors.textSecondary}
              >
                {d.day}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Summary */}
      <div
        className="flex justify-between items-center mt-4 p-3 rounded transition-colors duration-300"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: colors.textPrimary }}>
            {Math.max(...data.map((d) => d.visits))}
          </div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Pic de la semaine
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: colors.textPrimary }}>
            {Math.round(data.reduce((sum, d) => sum + d.visits, 0) / data.length)}
          </div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Moyenne quotidienne
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: colors.textPrimary }}>
            {data.reduce((sum, d) => sum + d.visits, 0)}
          </div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Total hebdomadaire
          </div>
        </div>
      </div>
    </div>
  )
}
