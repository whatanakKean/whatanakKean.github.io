'use client'

import React from 'react'
import ReactECharts from 'echarts-for-react'

// Define types for ECharts
type EChartsTooltipParams = {
  name: string
  value: number
  seriesName: string
  dataIndex: number
}

type BarItemStyleParams = {
  dataIndex: number
}

export default function Dashboard() {
  // Fake data for charts
  const ticketsChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Created', 'Resolved'],
      textStyle: {
        color: '#6b7280', // gray-500
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb', // gray-200
        },
      },
      axisLabel: {
        color: '#6b7280', // gray-500
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb', // gray-200
        },
      },
      axisLabel: {
        color: '#6b7280', // gray-500
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6', // gray-100
        },
      },
    },
    series: [
      {
        name: 'Created',
        type: 'bar',
        data: [3200, 3600, 3800, 4200, 3900, 3500, 4000],
        itemStyle: {
          color: '#60C2FB',
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: 'Resolved',
        type: 'bar',
        data: [2000, 2200, 2300, 2500, 2100, 1900, 2400],
        itemStyle: {
          color: '#3161F8',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  }

  const conversionsChartOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#111827',
      },
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: '#6b7280', // gray-500
      },
      padding: [20, 0, 0, 0], // Add padding to prevent overlap
    },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '55%'], // Adjust center to account for legend
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            color: '#111827',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Direct' },
          { value: 735, name: 'Email' },
          { value: 580, name: 'Ads' },
          { value: 484, name: 'Referral' },
          { value: 300, name: 'Social' },
        ],
      },
    ],
    color: ['#60C2FB', '#3161F8', '#5fb67a', '#f5c36e', '#da6d67'],
  }

  // Improved Tickets by Channel chart
  const channelsChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: EChartsTooltipParams[]) => {
        return `<div class="p-2 bg-white border border-gray-200 rounded shadow-sm">
          <div class="font-semibold text-gray-900">${params[0].name}</div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-gray-500">Tickets:</span>
            <span class="font-medium">${params[0].value}</span>
          </div>
        </div>`
      },
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#111827',
      },
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: ['Email', 'Chat', 'Phone', 'Social', 'Portal'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 12,
        margin: 8,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: 'Tickets',
        type: 'bar',
        data: [1200, 2000, 1500, 800, 700],
        itemStyle: {
          color: (params: BarItemStyleParams) => {
            const colors = ['#60C2FB', '#3161F8', '#5fb67a', '#f5c36e', '#da6d67']
            return colors[params.dataIndex]
          },
          borderRadius: [0, 4, 4, 0],
          opacity: 0.9,
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}',
          color: '#6b7280',
          fontSize: 12,
          fontWeight: 'normal',
        },
        barWidth: '40%',
        emphasis: {
          itemStyle: {
            opacity: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
    ],
  }

  return (
    <div className="flex-grow overflow-auto bg-gray-50">
      <div className="mx-auto flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Cambodia Tourism Intelligence
        </h1>
      </div>

      <main className="mx-auto space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* Top Stats Row - 4 cards in a row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="International Tourist Arrival"
            value="24,208"
            change="-5%"
            changeType="negative"
            description="vs last month"
          />
          <StatCard
            title="Average Length of Stays"
            value="45,640"
            change="+2%"
            changeType="positive"
            description="vs last month"
          />
          <StatCard
            title="Hotel Occupancy"
            value="18,208"
            change="+8%"
            changeType="positive"
            description="vs last month"
          />
          <StatCard
            title="International Tourism Receipts"
            value="18,208"
            change="+8%"
            changeType="positive"
            description="vs last month"
          />
        </div>

        {/* Middle Charts Row - 2/3 and 1/3 split */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Average Tickets Chart - takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <ChartSection
              title="Arrival By Country"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" x2="18" y1="20" y2="10" />
                  <line x1="12" x2="12" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="14" />
                </svg>
              }
              dateRange="Dec 18, 2023 - Dec 24, 2023"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="my-4 flex w-full flex-col justify-center gap-6 lg:w-52 lg:shrink-0">
                  <MetricWithColor title="Avg. Tickets Created" value="3,817" color="#60C2FB" />
                  <MetricWithColor title="Avg. Tickets Resolved" value="2,176" color="#3161F8" />
                </div>
                <div className="relative h-64 min-w-0 flex-1 sm:h-80">
                  <ReactECharts
                    option={ticketsChartOption}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'svg' }}
                  />
                </div>
              </div>
            </ChartSection>
          </div>

          {/* Conversions Chart - takes 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <ChartSection
              title="International Tourist Arrivals"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              }
            >
              <div className="relative h-64 w-full sm:h-80">
                <ReactECharts
                  option={channelsChartOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </ChartSection>
          </div>
        </div>

        {/* Bottom Charts Row - 50/50 split */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Tickets by Channel */}
          <div>
            <ChartSection
              title="Inbound Tourism"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              }
            >
              <div className="relative h-64 w-full sm:h-80">
                <ReactECharts
                  option={channelsChartOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </ChartSection>
          </div>

          {/* Customer Satisfaction */}
          <div>
            <ChartSection
              title="Outbound Tourism"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              }
            >
              <div className="relative h-64 w-full sm:h-80">
                <ReactECharts
                  option={channelsChartOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </ChartSection>
          </div>
        </div>
      </main>
    </div>
  )
}

// Enhanced StatCard component (without icon)
function StatCard({
  title,
  value,
  change,
  changeType,
  description,
}: {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  description: string
}) {
  const changeClasses = {
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-red-100 text-red-800',
  }

  const iconColors = {
    positive: 'text-green-500',
    negative: 'text-red-500',
  }

  const arrowIcon =
    changeType === 'positive' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`ml-1 inline-block h-3 w-3 ${iconColors[changeType]}`}
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`ml-1 inline-block h-3 w-3 ${iconColors[changeType]}`}
      >
        <path d="M5 12h14"></path>
        <path d="m12 19 7-7-7-7"></path>
      </svg>
    )

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
      <div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900 sm:text-2xl">{value}</span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${changeClasses[changeType]}`}
          >
            {change}
            {arrowIcon}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>
    </section>
  )
}

// Enhanced ChartSection component
function ChartSection({
  title,
  icon,
  children,
  dateRange,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  dateRange?: string
}) {
  return (
    <section className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-900">
          <span className="mr-2 text-blue-500">{icon}</span>
          {title}
        </h2>
        {dateRange && <div className="text-sm text-gray-500">{dateRange}</div>}
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </section>
  )
}

// MetricWithColor component
function MetricWithColor({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <section className="flex flex-col">
      <div className="mb-1 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }}></div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      </div>
      <div className="pl-5 text-lg font-semibold text-gray-900 sm:text-xl">{value}</div>
    </section>
  )
}

// Enhanced SatisfactionMetric component
function SatisfactionMetric({
  type,
  percentage,
}: {
  type: 'positive' | 'neutral' | 'negative'
  percentage: string
}) {
  const config = {
    positive: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#5fb67a"
          stroke="#5fb67a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 10v12"></path>
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
        </svg>
      ),
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      progressColor: 'bg-green-500',
    },
    neutral: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#f5c36e"
          stroke="#f5c36e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14"></path>
        </svg>
      ),
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      progressColor: 'bg-yellow-500',
    },
    negative: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#da6d67"
          stroke="#da6d67"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 14V2"></path>
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path>
        </svg>
      ),
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      progressColor: 'bg-red-500',
    },
  }

  const { icon, bgColor, textColor, progressColor } = config[type]
  const title = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div>
      <div className="mb-2 flex items-center gap-x-2">
        <div className={`rounded-full p-2 ${bgColor}`}>{icon}</div>
        <div>
          <div className={`text-xs font-medium ${textColor}`}>{title}</div>
          <div className="text-lg font-semibold text-gray-900 sm:text-xl">{percentage}</div>
        </div>
      </div>
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${progressColor}`}
          style={{ width: percentage }}
        ></div>
      </div>
    </div>
  )
}
