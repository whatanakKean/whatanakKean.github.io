'use client'

import React from 'react'
import ReactECharts from 'echarts-for-react'

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
    },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        radius: ['40%', '70%'],
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

  const channelsChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
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
    yAxis: {
      type: 'category',
      data: ['Email', 'Chat', 'Phone', 'Social', 'Portal'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb', // gray-200
        },
      },
      axisLabel: {
        color: '#6b7280', // gray-500
      },
    },
    series: [
      {
        name: 'Tickets',
        type: 'bar',
        data: [1200, 2000, 1500, 800, 700],
        itemStyle: {
          color: function (params: { dataIndex: number }) {
            const colors = ['#60C2FB', '#3161F8', '#5fb67a', '#f5c36e', '#da6d67']
            return colors[params.dataIndex]
          },
          borderRadius: [0, 4, 4, 0],
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
            title="Created Tickets"
            value="24,208"
            change="-5%"
            changeType="negative"
            description="vs last month"
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
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
            }
          />
          <StatCard
            title="Unsolved Tickets"
            value="4,564"
            change="+2%"
            changeType="positive"
            description="vs last month"
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            }
          />
          <StatCard
            title="Resolved Tickets"
            value="18,208"
            change="+8%"
            changeType="positive"
            description="vs last month"
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
          />
          <StatCard
            title="Avg. First Reply"
            value="12:01 min"
            change="+8%"
            changeType="positive"
            description="vs last month"
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
        </div>

        {/* Middle Charts Row - 2/3 and 1/3 split */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Average Tickets Chart - takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <ChartSection
              title="Average Tickets Created"
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
              title="Conversions"
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              }
            >
              <div className="mt-3">
                <span className="mr-1 text-2xl font-semibold text-gray-900">17,220</span>
                <span className="text-gray-500">Sales</span>
              </div>
              <div className="relative h-64 flex-grow sm:h-72">
                <ReactECharts
                  option={conversionsChartOption}
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
              title="Ticket By Channels"
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
              <div className="relative flex min-h-64 flex-grow flex-col justify-center">
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
              title="Customer Satisfaction"
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              }
            >
              <div className="my-4 flex h-full items-center justify-between">
                <div className="mx-auto grid w-full grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-xs text-gray-500">Responses Received</div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-2xl">
                      156 Customers
                    </div>
                  </div>

                  <SatisfactionMetric type="positive" percentage="80%" />
                  <SatisfactionMetric type="neutral" percentage="15%" />
                  <SatisfactionMetric type="negative" percentage="5%" />
                </div>
              </div>
            </ChartSection>
          </div>
        </div>
      </main>
    </div>
  )
}

// Enhanced StatCard component
function StatCard({
  title,
  value,
  change,
  changeType,
  description,
  icon,
}: {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  description: string
  icon: React.ReactNode
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
      <div className="flex items-center justify-between">
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
        <div className="rounded-lg bg-gray-100 p-2 sm:p-3">{icon}</div>
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
