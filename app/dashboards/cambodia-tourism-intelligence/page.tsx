'use client'

import React from 'react'

export default function Dashboard() {
  return (
    <div className="flex-grow overflow-auto">
      <div className="max-w-8xl tablet:px-10 desktop:px-14 border-border mx-auto flex h-16 w-full items-center justify-between border-b px-6">
        <h1 className="text-2xl font-medium">Cambodia Tourism Intelligence</h1>
      </div>

      <main>
        <div>
          {/* Stats Cards */}
          <div className="max-w-8xl tablet:px-10 desktop:px-14 border-border phone:grid-cols-2 laptop:grid-cols-4 mx-auto grid w-full grid-cols-1 gap-y-6 border-b px-6 py-4">
            <StatCard
              title="Created Tickets"
              value="24,208"
              change="-5%"
              changeType="negative"
              description="Compare to last month"
            />
            <StatCard
              title="Unsolved Tickets"
              value="4,564"
              change="+2%"
              changeType="positive"
              description="Compare to last month"
            />
            <StatCard
              title="Resolved Tickets"
              value="18,208"
              change="+8%"
              changeType="positive"
              description="Compare to last month"
            />
            <StatCard
              title="Average First Time Reply"
              value="12:01 min"
              change="+8%"
              changeType="positive"
              description="Compare to last month"
            />
          </div>

          {/* Main Charts */}
          <div className="border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border grid grid-cols-1 divide-y border-b">
            {/* Average Tickets Chart */}
            <div className="max-w-8xl tablet:px-10 desktop:px-14 laptop:col-span-2 mx-auto w-full px-6 py-4">
              <ChartSection
                title="Average Tickets Created"
                icon="file-plus2"
                dateRange="Dec 18, 2023 - Dec 24, 2023"
              >
                <div className="flex flex-wrap">
                  <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
                    <MetricWithColor title="Avg. Tickets Created" value="3,817" color="#60C2FB" />
                    <MetricWithColor title="Avg. Tickets Resolved" value="2,176" color="#3161F8" />
                  </div>
                  <div className="relative h-96 min-w-[320px] flex-1">
                    {/* Chart would be rendered here */}
                    <div className="bg-muted/50 h-full w-full rounded-lg"></div>
                  </div>
                </div>
              </ChartSection>
            </div>

            {/* Conversions Chart */}
            <div className="max-w-8xl tablet:px-10 desktop:px-14 laptop:col-span-1 mx-auto w-full px-6 py-4">
              <ChartSection title="Conversions" icon="circle-percent">
                <div className="mt-3">
                  <span className="mr-1 text-2xl font-medium">17,220</span>
                  <span className="text-muted-foreground/60">Sales</span>
                </div>
                <div className="relative max-h-80 flex-grow">
                  {/* Chart would be rendered here */}
                  <div className="bg-muted/50 h-full w-full rounded-lg"></div>
                </div>
              </ChartSection>
            </div>
          </div>

          {/* Bottom Charts */}
          <div className="border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border grid grid-cols-1 divide-y border-b">
            {/* Tickets by Channel */}
            <div className="max-w-8xl tablet:px-10 desktop:px-14 laptop:col-span-1 mx-auto w-full px-6 py-4">
              <ChartSection title="Ticket By Channels" icon="rss">
                <div className="relative flex min-h-64 flex-grow flex-col justify-center">
                  {/* Chart would be rendered here */}
                  <div className="bg-muted/50 h-full w-full rounded-lg"></div>
                </div>
              </ChartSection>
            </div>

            {/* Customer Satisfaction */}
            <div className="max-w-8xl tablet:px-10 desktop:px-14 laptop:col-span-1 mx-auto w-full px-6 py-4">
              <ChartSection title="Customer Satisfication" icon="smile-plus">
                <div className="my-4 flex h-full items-center justify-between">
                  <div className="mx-auto grid w-full grid-cols-2 gap-6">
                    <div className="flex flex-col items-start justify-center">
                      <div className="text-muted-foreground text-xs">Responses Received</div>
                      <div className="text-2xl font-medium">156 Customers</div>
                    </div>

                    <SatisfactionMetric type="positive" percentage="80%" />
                    <SatisfactionMetric type="neutral" percentage="15%" />
                    <SatisfactionMetric type="negative" percentage="5%" />
                  </div>
                </div>
              </ChartSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Component for stat cards
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
    positive: 'bg-green-50 text-green-500 dark:bg-green-950',
    negative: 'bg-red-50 text-red-500 dark:bg-red-950',
  }

  const arrowIcon =
    changeType === 'positive' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-up-right ml-0.5 inline-block h-3 w-3"
      >
        <path d="M7 7h10v10"></path>
        <path d="M7 17 17 7"></path>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-down-right ml-0.5 inline-block h-3 w-3"
      >
        <path d="m7 7 10 10"></path>
        <path d="M17 7v10H7"></path>
      </svg>
    )

  return (
    <section className="flex flex-col">
      <h2 className="text-muted-foreground mb-1 text-sm">{title}</h2>
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium">{value}</span>
        <span
          className={`flex items-center rounded-sm px-1 py-0.5 text-xs ${changeClasses[changeType]}`}
        >
          {change}
          {arrowIcon}
        </span>
      </div>
      <div className="text-muted-foreground text-xs">{description}</div>
    </section>
  )
}

// Component for chart sections
function ChartSection({
  title,
  icon,
  children,
  dateRange,
}: {
  title: string
  icon: string
  children: React.ReactNode
  dateRange?: string
}) {
  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-default-foreground flex items-center text-base">
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
            className={`lucide lucide-${icon} text-primary mr-2 shrink-0`}
          >
            {/* Icon paths would be here */}
          </svg>
          {title}
        </h2>
        {dateRange && <div className="text-muted-foreground text-sm">{dateRange}</div>}
      </div>
      {children}
    </section>
  )
}

// Component for metrics with color indicator
function MetricWithColor({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <section className="flex flex-col">
      <div className="mb-1 flex items-center gap-2">
        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }}></div>
        <h2 className="text-muted-foreground text-sm">{title}</h2>
      </div>
      <div className="pl-4 text-xl font-medium">{value}</div>
    </section>
  )
}

// Component for satisfaction metrics
function SatisfactionMetric({
  type,
  percentage,
}: {
  type: 'positive' | 'neutral' | 'negative'
  percentage: string
}) {
  const config = {
    positive: {
      icon: 'thumbs-up',
      color: '#5fb67a',
      bgColor: 'bg-green-50 dark:bg-green-950',
      textColor: 'text-green-500',
    },
    neutral: {
      icon: 'thumbs-up',
      color: '#f5c36e',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      textColor: 'text-yellow-500',
    },
    negative: {
      icon: 'thumbs-down',
      color: '#da6d67',
      bgColor: 'bg-red-50 dark:bg-red-950',
      textColor: 'text-red-500',
    },
  }

  const { icon, color, bgColor, textColor } = config[type]
  const title = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div>
      <div className="mb-1 flex items-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={color}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-thumbs-up h-6 w-6"
        >
          {type === 'negative' ? (
            <>
              <path d="M17 14V2"></path>
              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path>
            </>
          ) : (
            <>
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
            </>
          )}
        </svg>
        <div>
          <div className="text-muted-foreground text-xs">{title}</div>
          <div className="text-xl font-medium">{percentage}</div>
        </div>
      </div>
      <div className="relative">
        {/* Progress bar would be here */}
        <div className={`h-2 w-full rounded-full ${bgColor}`}>
          <div className={`h-full rounded-full ${textColor}`} style={{ width: percentage }}></div>
        </div>
      </div>
    </div>
  )
}
