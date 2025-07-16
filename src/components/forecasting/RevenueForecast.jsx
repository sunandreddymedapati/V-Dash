import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import KPICards from './components/KPICards';
import DailyForecastTable from './components/DailyForecastTable';

const RevenueForecast = ({
  kpiData,
  comparisonData,
  dailyForecastData = [],
  loading = false,
  selectedMonthYear,
  selectedHotel
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tables Skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white rounded-xl shadow-sm">
              <CardContent>
                <div className="space-y-2">
                  {[...Array(6)].map((_, j) => (
                    <Skeleton key={j} className="h-8 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section 1: Forecast Summary KPI Cards */}
      <KPICards kpiData={kpiData} loading={loading} />

      {/* Section 2: Day-wise Forecast Detail */}
      <DailyForecastTable 
        selectedMonthYear={selectedMonthYear} 
        selectedHotel={selectedHotel}
      />
    </div>
  );
};

export default RevenueForecast;
