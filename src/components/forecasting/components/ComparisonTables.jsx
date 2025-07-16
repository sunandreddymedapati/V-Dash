import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ComparisonTable from './ComparisonTable';

const ComparisonTables = ({ comparisonData, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-8 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const defaultData = {
    occupiedRooms: 0,
    occupancyPercent: 0,
    adr: 0,
    revpar: 0,
    roomRevenue: 0
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ComparisonTable
        title="Actual vs Forecast"
        actualData={comparisonData?.actual || defaultData}
        comparisonData={comparisonData?.forecast || defaultData}
        actualLabel="Actual"
        comparisonLabel="Forecast"
      />

      <ComparisonTable
        title="Projected EOM vs Budget"
        actualData={comparisonData?.projectedEOM || defaultData}
        comparisonData={comparisonData?.budget || defaultData}
        actualLabel="Projected"
        comparisonLabel="Budget"
      />

      <ComparisonTable
        title="Actual vs Budget"
        actualData={comparisonData?.actual || defaultData}
        comparisonData={comparisonData?.budget || defaultData}
        actualLabel="Actual"
        comparisonLabel="Budget"
      />
    </div>
  );
};

export default ComparisonTables;
