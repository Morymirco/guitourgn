"use client"

import { useTheme } from "../theme/theme-provider"
import { getThemeColors } from "../app-colors"

interface LineChartData {
  month: string
  users: number
  active: number
}

interface BrandedLineChartProps {
  data: LineChartData[]
}

export function BrandedLineChart({ data }: BrandedLineChartProps) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  const maxValue = Math.max(...data.map((d) => Math.max(d.users, d.active)))
  const chartHeight = 200
  const chartWidth = 300
  const padding = 40

  const getX = (index: number) => padding + (index * (chartWidth - 2 * padding)) / (data.length - 1)
  const getY = (value: number) => chartHeight - padding - (value / maxValue) * (chartHeight - 2 * padding)

  const usersPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.users)}`).join(" ")
  const activePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.active)}`).join(" ")

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

        {/* Users line */}
        <path
          d={usersPath}
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active users line */}
        <path
          d={activePath}
          fill="none"
          stroke={colors.success}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points for users */}
        {data.map((d, i) => (
          <circle
            key={`users-${i}`}
            cx={getX(i)}
            cy={getY(d.users)}
            r="4"
            fill={colors.primary}
            stroke={colors.surface}
            strokeWidth="2"
          />
        ))}

        {/* Data points for active users */}
        {data.map((d, i) => (
          <circle
            key={`active-${i}`}
            cx={getX(i)}
            cy={getY(d.active)}
            r="4"
            fill={colors.success}
            stroke={colors.surface}
            strokeWidth="2"
          />
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={`label-${i}`}
            x={getX(i)}
            y={chartHeight - 10}
            textAnchor="middle"
            fontSize="12"
            fill={colors.textSecondary}
          >
            {d.month}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }} />
          <span className="text-sm" style={{ color: colors.textSecondary }}>
            Nouveaux utilisateurs
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.success }} />
          <span className="text-sm" style={{ color: colors.textSecondary }}>
            Utilisateurs actifs
          </span>
        </div>
      </div>
    </div>
  )
}
