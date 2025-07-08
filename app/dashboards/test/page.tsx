'use client'

import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts'

type GDPItem = {
  country: string
  value: number | null
}

export default function Dashboard1() {
  const [gdpData, setGdpData] = useState<GDPItem[]>([])
  const [loading, setLoading] = useState(true)
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.EChartsType | null>(null)

  useEffect(() => {
    const fetchGDPData = async () => {
      try {
        const response = await fetch(
          'https://api.worldbank.org/v2/country/US;CN;IN;DE;JP/indicator/NY.GDP.MKTP.CD?format=json&date=2022'
        )
        const data = await response.json()

        if (data && data[1]) {
          const parsed = data[1].map((item: { country: { value: string }; value: number }) => ({
            country: item.country.value,
            value: item.value,
          }))
          setGdpData(parsed)
        } else {
          console.warn('Unexpected data format from World Bank API', data)
        }
      } catch (error) {
        console.error('Failed to fetch GDP data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGDPData()
  }, [])

  useEffect(() => {
    if (!loading && chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current)
      }

      const option: echarts.EChartsOption = {
        title: {
          text: 'GDP (Current US$) by Country - 2022',
          left: 'center',
          textStyle: { color: '#333' },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (params: unknown) {
            const item = Array.isArray(params) ? params[0] : null
            if (!item || typeof item !== 'object' || !('name' in item) || !('value' in item)) {
              return ''
            }
            return `${item.name}<br/>GDP: ${
              typeof item.value === 'number'
                ? item.value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })
                : 'N/A'
            }`
          },
        },
        xAxis: {
          type: 'category',
          data: gdpData.map((item) => item.country),
          axisLabel: {
            rotate: 30,
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value: number) =>
              value >= 1e12
                ? `${value / 1e12}T`
                : value >= 1e9
                ? `${value / 1e9}B`
                : value >= 1e6
                ? `${value / 1e6}M`
                : `${value}`,
          },
        },
        series: [
          {
            data: gdpData.map((item) => item.value ?? 0),
            type: 'bar',
            itemStyle: {
              color: '#3b82f6',
            },
          },
        ],
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
        },
      }

      chartInstance.current.setOption(option)

      const resizeObserver = new ResizeObserver(() => {
        chartInstance.current?.resize()
      })

      resizeObserver.observe(chartRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [gdpData, loading])

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">World Bank Dashboard</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
        GDP (Current US$) for selected countries in 2022
      </p>

      {loading ? (
        <p className="p-4 text-gray-500">Loading data...</p>
      ) : (
        <>
          <div ref={chartRef} className="h-[400px] w-full max-w-full" />
          <table className="mt-8 min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  GDP (US$)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {gdpData.map((item, idx) => (
                <tr key={idx}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {item.country}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {item.value
                      ? item.value.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        })
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}