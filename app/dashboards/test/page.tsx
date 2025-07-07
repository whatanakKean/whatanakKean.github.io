"use client";

import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

export default function Dashboard1() {
  const [gdpData, setGdpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);

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

  // Initialize ECharts chart when data is loaded
  useEffect(() => {
    if (!loading && chartRef.current && gdpData.length > 0) {
      const chart = echarts.init(chartRef.current);

      const option = {
        title: {
          text: "GDP by Country (2022)",
        },
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            const val = params[0].value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            });
            return `${params[0].name}: ${val}`;
          },
        },
        xAxis: {
          type: "category",
          data: gdpData.map((item) => item.country),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: gdpData.map((item) => item.value),
            type: "bar",
            itemStyle: {
              color: "#3b82f6",
            },
          },
        ],
      };

      chart.setOption(option);

      // Resize chart on window resize
      const resize = () => chart.resize();
      window.addEventListener("resize", resize);

      return () => {
        chart.dispose();
        window.removeEventListener("resize", resize);
      };
    }
  }, [gdpData, loading]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">World Bank Dashboard</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        GDP (Current US$) for selected countries in 2022
      </p>

      {/* Chart container */}
      <div
        ref={chartRef}
        className="w-full h-96 mb-10 bg-white dark:bg-gray-900 rounded shadow"
      />

      {/* Table fallback for raw data */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-x-auto">
        {loading ? (
          <p className="p-4 text-gray-500">Loading data...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
        )}
      </div>
    </div>
  );
}
