import React from 'react';
import LaborForecastTable from './LaborForecastTable';
import { sampleLaborForecastData } from './LaborForecastData';

const LaborForecast = ({ data, loading = false }) => {
  const actualData = data || sampleLaborForecastData;

  return (
    <div className="space-y-6">
      <LaborForecastTable data={actualData} loading={loading} />
    </div>
  );
};

export default LaborForecast;
