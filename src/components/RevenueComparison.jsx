// Top-level imports
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { api } from '@/store/api';
import GraphSkeleton from '@/components/ui/GraphSkeleton';
import { usePropertyStore } from '@/store/propertyStore';
import { getPropertyIdByName } from '@/utils/propertyUtils';


// Color config for the chart
// Replace hardcoded years with a reusable palette.
// We'll generate chartConfig dynamically inside the component using this palette.
const chartColors = ['#2563eb', '#7c3aed', '#dc2626', '#059669', '#d97706', '#0ea5e9', '#f97316', '#16a34a'];



function RevenueComparison() {
  const [chartData, setChartData] = useState(null);

  const selectedHotel = usePropertyStore((s) => s.selectedHotel);
  const properties = usePropertyStore((s) => s.properties);
  const propertyId = useMemo(
    () => getPropertyIdByName(properties, selectedHotel),
    [properties, selectedHotel]
  );

  // Derive the available year keys from API data (exclude 'month')
  const yearKeys = useMemo(() => {
    if (!Array.isArray(chartData) || chartData.length === 0) return [];
    return Object.keys(chartData[0]).filter((k) => k !== 'month').sort();
  }, [chartData]);

  // Build chartConfig dynamically for ChartContainer so we can use var(--color-<year>) in Bars
  const chartConfig = useMemo(() => {
    const cfg = {};
    yearKeys.forEach((year, idx) => {
      cfg[year] = { label: String(year), color: chartColors[idx % chartColors.length] };
    });
    return cfg;
  }, [yearKeys]);

  useEffect(() => {
    let active = true;
    if (!propertyId) return () => { active = false; };

    setChartData(null);
    (async () => {
      try {
        const res = await api.get('reports/revenue/comparison', {
          params: { property_id: propertyId, max_years: 3 },
        });
        const data = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
        if (active) setChartData(data);
      } catch (e) {
        console.error('Revenue comparison fetch failed:', e);
        if (active) setChartData([]);
      }
    })();

    return () => { active = false; };
  }, [propertyId]);

  // Add a custom tooltip formatter to ensure a clear gap between year and amount
  const tooltipItemFormatter = useCallback((value, name, item, index, payload) => {
    const indicatorColor = item?.color || payload?.fill;
    return (
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-[2px]"
            style={{ backgroundColor: indicatorColor, borderColor: indicatorColor }}
          />
          <span className="text-muted-foreground">{name}</span>
        </div>
        <span className="font-mono font-medium tabular-nums text-foreground">
          {(value ?? 0).toLocaleString()}
        </span>
      </div>
    );
  }, []);

  return (
    <Card className="rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-6">
      <CardHeader>
        <CardTitle className="dark:text-white">Revenue Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dynamic Legend based on available years */}
        <div className="flex gap-6 items-center mb-2 justify-center">
          {yearKeys.map((year) => (
            <div key={year} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: chartConfig[year]?.color }}
                aria-label={`Color for ${year}`}
              />
              <span className="text-sm font-medium" style={{ color: chartConfig[year]?.color }}>
                {year}
              </span>
            </div>
          ))}
        </div>

        {chartData === null ? (
          <GraphSkeleton />
        ) : chartData.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border border-dashed border-gray-300 dark:border-gray-700/70 rounded-lg">
            No data exists.
          </div>
        ) : (
          <div className="w-full" style={{ height: '320px' }}>
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
                  <XAxis dataKey="month" className="fill-gray-600 dark:fill-gray-300 text-xs" />
                  <YAxis className="fill-gray-600 dark:fill-gray-300 text-xs" />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="dark:bg-gray-800 dark:border-gray-600"
                        formatter={tooltipItemFormatter}
                      />
                    }
                  />
                  {/* Automate bar rendering for all discovered years */}
                  {yearKeys.map((year) => (
                    <Bar
                      key={year}
                      dataKey={year}
                      fill={`var(--color-${year})`}
                      radius={[2, 2, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RevenueComparison;
