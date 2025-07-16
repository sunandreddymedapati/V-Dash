import React from 'react';
import PortfolioSummaryHeader from '@/components/PortfolioSummaryHeader';
import TimeTabsSection from '@/components/TimeTabsSection';
import VarianceTabsSection from '@/components/VarianceTabsSection';
import { getCurrentKPIData } from '@/components/KPIDataService';

// Helper to determine the correct label
const getVarianceSuffix = (kpiVarianceTab) => {
  if (kpiVarianceTab === "last-year") return "LYV";
  if (kpiVarianceTab === "budget") return "BV";
  if (kpiVarianceTab === "year-before") return "YBY";
  return "";
};

const KPICardsSection = ({
  kpiTimeTab,
  setKpiTimeTab,
  kpiVarianceTab,
  setKpiVarianceTab,
  selectedDate,
  selectedSegment,
  segments
}) => {
  // Get current KPI data based on selected tabs
  const getKPIData = () => {
    return getCurrentKPIData(kpiTimeTab, kpiVarianceTab);
  };

  const varianceSuffix = getVarianceSuffix(kpiVarianceTab);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <PortfolioSummaryHeader
        selectedDate={selectedDate}
        selectedSegment={selectedSegment}
        segments={segments}
      />

      <TimeTabsSection
        kpiTimeTab={kpiTimeTab}
        setKpiTimeTab={setKpiTimeTab}
        getCurrentKPIData={getKPIData}
        varianceSuffix={varianceSuffix}
      />

      <VarianceTabsSection
        kpiVarianceTab={kpiVarianceTab}
        setKpiVarianceTab={setKpiVarianceTab}
      />
    </div>
  );
};

export default KPICardsSection;
