import React from 'react';
import KPICard from '@/components/KPICard';

const KPIGrid = ({ kpiData, varianceSuffix = "LYV" }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          variance={kpi.variance}
          trend={kpi.trend}
          isPositive={kpi.isPositive}
          varianceSuffix={varianceSuffix}
        />
      ))}
    </div>
  );
};

export default KPIGrid;
