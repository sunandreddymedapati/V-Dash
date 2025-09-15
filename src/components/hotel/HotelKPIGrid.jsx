import React from 'react';
import HotelKPICard from './HotelKPICard';

const HotelKPIGrid = ({ kpiData, varianceSuffix }) => {
  const items = Array.isArray(kpiData) ? kpiData : [];

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        No data exists.
      </div>
    );
  }

  // Responsive grid: 1 per row mobile, 2 per row tablet, 4 per row desktop
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((kpi, index) => (
        <HotelKPICard
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

export default HotelKPIGrid;
