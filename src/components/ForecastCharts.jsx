import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const chartConfig = {
  occupancy: {
    label: "Occupancy",
    color: "#2563eb",
  },
  adr: {
    label: "ADR",
    color: "#dc2626",
  },
  revenue: {
    label: "Revenue",
    color: "#059669",
  },
};

const ForecastCharts = ({ forecastData, forecastTab, setForecastTab }) => {
  return (
    <Card className="rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Next 30 Days Forecast</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">OTB Date: 05/30/2025</p>
      </CardHeader>
      <CardContent>
        <Tabs value={forecastTab} onValueChange={setForecastTab}>
          <TabsList className="grid w-full grid-cols-3 dark:bg-gray-700">
            <TabsTrigger value="otb-forecast" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white">OTB & Forecast</TabsTrigger>
            <TabsTrigger value="revenue" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white">Revenue</TabsTrigger>
            <TabsTrigger value="pickup" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white">Pickup</TabsTrigger>
          </TabsList>

          <TabsContent value="otb-forecast" className="mt-6">
            <div className="w-full" style={{ height: '320px' }}>
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
                    <XAxis 
                      dataKey="date" 
                      className="fill-gray-600 dark:fill-gray-300 text-xs"
                    />
                    <YAxis className="fill-gray-600 dark:fill-gray-300 text-xs" />
                    <ChartTooltip 
                      content={<ChartTooltipContent className="dark:bg-gray-800 dark:border-gray-600" />} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="occupancy" 
                      stroke="var(--color-occupancy)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-occupancy)", r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="adr" 
                      stroke="var(--color-adr)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-adr)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <div className="w-full" style={{ height: '320px' }}>
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
                    <XAxis 
                      dataKey="date" 
                      className="fill-gray-600 dark:fill-gray-300 text-xs"
                    />
                    <YAxis className="fill-gray-600 dark:fill-gray-300 text-xs" />
                    <ChartTooltip 
                      content={<ChartTooltipContent className="dark:bg-gray-800 dark:border-gray-600" />} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--color-revenue)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-revenue)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="pickup" className="mt-6">
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Pickup data visualization coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ForecastCharts;
