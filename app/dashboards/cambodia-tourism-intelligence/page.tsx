'use client'

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const fakeData = [
  { country: 'USA', value: 25_000_000_000_000 },
  { country: 'China', value: 17_700_000_000_000 },
  { country: 'India', value: 3_700_000_000_000 },
  { country: 'Germany', value: 4_200_000_000_000 },
  { country: 'Japan', value: 4_900_000_000_000 },
]

export default function Dashboard() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = echarts.init(chartRef.current)
    chart.setOption({
      title: { text: 'GDP by Country (Fake Data)', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'category', data: fakeData.map((d) => d.country) },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: (v: number) => (v / 1e12).toFixed(1) + 'T' },
      },
      series: [
        {
          type: 'bar',
          data: fakeData.map((d) => d.value),
          itemStyle: { color: '#3b82f6' },
        },
      ],
    })
    const resizeObserver = new ResizeObserver(() => chart.resize())
    resizeObserver.observe(chartRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  return <div className="h-[400px] w-full" ref={chartRef} />
}
