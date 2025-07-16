import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Demo revenue data for three years
const demoRevenueData = [
  { month: 'Jan', 2025: 42500, 2024: 41500, 2023: 40000 },
  { month: 'Feb', 2025: 44200, 2024: 43000, 2023: 42000 },
  { month: 'Mar', 2025: 46800, 2024: 44950, 2023: 43200 },
  { month: 'Apr', 2025: 47700, 2024: 46000, 2023: 44500 },
  { month: 'May', 2025: 48860, 2024: 47000, 2023: 44900 },
  { month: 'Jun', 2025: 49400, 2024: 47500, 2023: 45200 },
  { month: 'Jul', 2025: 51000, 2024: 49000, 2023: 46500 },
  { month: 'Aug', 2025: 52200, 2024: 50000, 2023: 47700 },
  { month: 'Sep', 2025: 48550, 2024: 48300, 2023: 45500 },
  { month: 'Oct', 2025: 48900, 2024: 48500, 2023: 46000 },
  { month: 'Nov', 2025: 47300, 2024: 47000, 2023: 44500 },
  { month: 'Dec', 2025: 50300, 2024: 49500, 2023: 47000 },
];

// Color config for the chart
const chartConfig = {
  2025: {
    label: "2025",
    color: "#2563eb", // blue
  },
  2024: {
    label: "2024", 
    color: "#7c3aed", // purple
  },
  2023: {
    label: "2023",
    color: "#dc2626", // red
  },
};

const legendOrder = ["2023", "2024", "2025"];

function RevenueComparison() {
  return (
    <Card className="rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Revenue Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Static Legend */}
        <div className="flex gap-6 items-center mb-2 justify-center">
          {legendOrder.map((year) => (
            <div key={year} className="flex items-center gap-2">
              <span 
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: chartConfig[year].color }}
                aria-label={`Color for ${year}`}
              />
              <span className="text-sm font-medium" style={{ color: chartConfig[year].color }}>
                {year}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full" style={{ height: '320px' }}>
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
                <XAxis 
                  dataKey="month" 
                  className="fill-gray-600 dark:fill-gray-300 text-xs"
                />
                <YAxis className="fill-gray-600 dark:fill-gray-300 text-xs" />
                <ChartTooltip 
                  content={<ChartTooltipContent className="dark:bg-gray-800 dark:border-gray-600" />} 
                />
                <Bar dataKey="2023" fill="var(--color-2023)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="2024" fill="var(--color-2024)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="2025" fill="var(--color-2025)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default RevenueComparison;
