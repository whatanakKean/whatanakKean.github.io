"use client";

import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

type GDPItem = {
  country: string;
  value: number | null;
};

export default function Dashboard1() {
  const [gdpData, setGdpData] = useState<GDPItem[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    const fetchGDPData = async () => {
      try {
        const response = await fetch(
          "https://api.worldbank.org/v2/country/US;CN;IN;DE;JP/indicator/NY.GDP.MKTP.CD?format=json&date=2022"
        );
        const data = await response.json();

        if (data && data[1]) {
          const parsed = data[1].map((item: any) => ({
            country: item.country.value,
            value: item.value,
          }));
          setGdpData(parsed);
        } else {
          console.warn("Unexpected data format from World Bank API", data);
        }
      } catch (error) {
        console.error("Failed to fetch GDP data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGDPData();
  }, []);

  useEffect(() => {
    if (!loading && chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      const option: echarts.EChartsOption = {
        title: {
          text: "GDP (Current US$) by Country - 2022",
          left: "center",
          textStyle: { color: "#333" },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: function (params: any) {
            const item = params[0];
            return `${item.name}<br/>GDP: ${item.value?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }) ?? "N/A"}`;
          },
        },
        xAxis: {
          type: "category",
          data: gdpData.map((item) => item.country),
          axisLabel: {
            rotate: 30,
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
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
            type: "bar",
            itemStyle: {
              color: "#3b82f6",
            },
          },
        ],
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%",
        },
      };

      chartInstance.current.setOption(option);

      const resizeObserver = new ResizeObserver(() => {
        chartInstance.current?.resize();
      });

      resizeObserver.observe(chartRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [gdpData, loading]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">World Bank Dashboard</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        GDP (Current US$) for selected countries in 2022
      </p>

      {loading ? (
        <p className="p-4 text-gray-500">Loading data...</p>
      ) : (
        <>
          <div ref={chartRef} className="w-full h-[400px] max-w-full" />
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-8">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  GDP (US$)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {gdpData.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.value
                      ? item.value.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
