import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import RevenueForecast from '@/components/forecasting/RevenueForecast';
import LaborForecast from '@/components/forecasting/LaborForecast';
import LaborReviewForecast from '@/components/forecasting/LaborReviewForecast';
import PLReviewForecast from '@/components/forecasting/PLReviewForecast';

const ForecastingTabs = ({
  activeTab,
  onTabChange,
  sampleKPIData,
  sampleComparisonData,
  sampleDailyForecastData
}) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-t-xl p-1">
          <TabsTrigger 
            value="revenue" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium"
          >
            Revenue Forecast
          </TabsTrigger>
          <TabsTrigger 
            value="labor" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium"
          >
            Labor Forecast
          </TabsTrigger>
          <TabsTrigger 
            value="labor-review" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium"
          >
            Labor Review
          </TabsTrigger>
          <TabsTrigger 
            value="pl" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium"
          >
            P&L Forecast
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="revenue" className="mt-0">
            <RevenueForecast 
              kpiData={sampleKPIData}
              comparisonData={sampleComparisonData}
              dailyForecastData={sampleDailyForecastData}
            />
          </TabsContent>

          <TabsContent value="labor" className="mt-0">
            <LaborForecast />
          </TabsContent>

          <TabsContent value="labor-review" className="mt-0">
            <LaborReviewForecast />
          </TabsContent>

          <TabsContent value="pl" className="mt-0">
            <PLReviewForecast />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ForecastingTabs;
