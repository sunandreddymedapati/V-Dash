import React from 'react';
import HotelTimeTabsSection from './HotelTimeTabsSection';
import HotelVarianceTabsSection from './HotelVarianceTabsSection';
import { getCurrentKPIData } from '@/components/KPIDataService';

const getVarianceSuffix = (kpiVarianceTab) => {
  if (kpiVarianceTab === "last-year") return "LYV";
  if (kpiVarianceTab === "budget") return "BV";
  if (kpiVarianceTab === "year-before") return "YBY";
  // fallback, could be extended if needed
  return "";
};

const HotelKPICardsSection = ({
  kpiTimeTab,
  setKpiTimeTab,
  kpiVarianceTab,
  setKpiVarianceTab,
  selectedDate,
}) => {
  // Get data based on selected tabs (from the data service)
  const getKPIData = () => getCurrentKPIData(kpiTimeTab, kpiVarianceTab);

  // Determine the suffix for the variance label
  const varianceSuffix = getVarianceSuffix(kpiVarianceTab);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Top time granularity tabs */}
      <HotelTimeTabsSection
        kpiTimeTab={kpiTimeTab}
        setKpiTimeTab={setKpiTimeTab}
        getCurrentKPIData={getKPIData}
        varianceSuffix={varianceSuffix}
      />
      {/* Bottom tabs for variance */}
      <HotelVarianceTabsSection
        kpiVarianceTab={kpiVarianceTab}
        setKpiVarianceTab={setKpiVarianceTab}
      />
    </div>
  );
};

export default HotelKPICardsSection;
